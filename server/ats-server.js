(async () => {
	try {
		const express = await import('express');
		const fs = await import('fs');
		const path = await import('path');
			const cors = await import('cors');
			let multer = null;
			try {
				multer = await import('multer');
			} catch (e) {
				multer = null;
				console.warn('multer not installed; upload endpoints will be no-op');
			}

		const app = express.default();
		app.use(cors.default());
		app.use(express.json());

		const upload = (multer && multer.default) ? multer.default().single('file') : (req, res, next) => next();

			const uploadsDir = path.join(process.cwd(), 'server', 'uploads');
			const preferredFiles = ['kaggle_jobs.cleaned.normalized.json', 'kaggle_jobs.cleaned.json', 'kaggle_jobs.fixed.json', 'kaggle_jobs.json'];
			let kaggleJobs = null;
			try {
				for (const fname of preferredFiles) {
					const p = path.join(uploadsDir, fname);
					if (fs.existsSync && fs.existsSync(p)) {
						try {
							const raw = fs.readFileSync(p, 'utf-8');
							kaggleJobs = JSON.parse(raw);
							console.log('Loaded', fname + ',', (kaggleJobs && kaggleJobs.length) || 0, 'jobs');
							break;
						} catch (err) {
							console.warn('Found', fname, 'but failed to parse JSON:', err && err.message);
							// continue to next candidate
						}
					}
				}
				if (!kaggleJobs) {
					console.warn('No valid kaggle jobs JSON found in server/uploads. Recommendations endpoint will return empty results and frontend will fall back to local matching.');
				}
			} catch (err) {
				console.warn('Error while attempting to load kaggle jobs:', err && err.message);
				kaggleJobs = null;
			}

		app.get('/health', (req, res) => res.json({ ok: true }));

		// Simple recommendation endpoint: expects { skills: string[] }
		app.post('/api/recommend-by-resume', (req, res) => {
			const skills = (req.body && req.body.skills) || [];
			if (!Array.isArray(skills)) return res.status(400).json({ error: 'skills must be an array' });

			if (!kaggleJobs) {
				// no dataset: return empty array so frontend falls back
				return res.json([]);
			}

					const lowerSkills = skills.map(s => (s || '').toString().toLowerCase());

					// helper tokenizers
					const tokenize = (text) => {
						if (!text) return [];
						return String(text).toLowerCase().match(/\b[a-z0-9+.#-]+\b/g) || [];
					};

					const jaccard = (a, b) => {
						const A = new Set(a);
						const B = new Set(b);
						const inter = [...A].filter(x => B.has(x)).length;
						const uni = new Set([...A, ...B]).size || 1;
						return inter / uni;
					};

					// Compute a combined score for each job
					const scoredMap = new Map(); // dedupe by title+company+location

							for (const job of kaggleJobs) {
						const reqs = (job.requirements || job.skills || []).map(r => String(r).toLowerCase());

						// skill match: fraction of requirements covered by resume skills
						const commonSkills = reqs.filter(r => lowerSkills.includes(r));
						const skillScore = reqs.length ? (commonSkills.length / reqs.length) : 0;

						// title similarity: overlap between title tokens and skills/tokens
						const titleTokens = tokenize(job.title || '');
						const titleScore = jaccard(titleTokens, lowerSkills);

						// description similarity: overlap between description tokens and skills
						const descTokens = tokenize(job.description || '');
						const descScore = jaccard(descTokens, lowerSkills);

						// weighted score (tunable)
					const combined = (skillScore * 0.7) + (titleScore * 0.2) + (descScore * 0.1);
					const match = Math.round(combined * 100);
					// tiny tie-breaker to vary ordering among equals
					const tieBreaker = Math.random() * 0.0001;

						// dedupe key
								const key = `${(job.title||'').trim().toLowerCase()}||${(job.company||'').trim().toLowerCase()}||${(job.location||'').trim().toLowerCase()}`;
								const existing = scoredMap.get(key);
								const outJob = {
									id: job.id || job.job_id || (`kaggle_${Math.floor(Math.random()*1e9)}`),
									title: job.title || job.job_title || 'Untitled',
									company: job.company || job.employer || 'Various',
									location: job.location || job.city || 'Remote',
									type: job.type || job.employment_type || 'Fulltime',
									experience: job.experience || job.years || 'Not specified',
									salary: job.salary || job.compensation || 'Not specified',
									description: job.description || job.job_description || '',
									requirements: Array.isArray(job.requirements) ? job.requirements : (job.skills || []),
									postedDate: job.postedDate || job.posted || '',
									match,
									_score: combined + tieBreaker
								};
								if (!existing || (outJob.match > (existing.match || 0) || (outJob.match === existing.match && outJob._score > (existing._score || 0)))) {
									scoredMap.set(key, outJob);
								}
					}

									const scored = Array.from(scoredMap.values()).sort((a, b) => (b.match - a.match) || ((b._score || 0) - (a._score || 0)));

									// Diversity: prefer unique companies and locations to surface varied results
									const picked = [];
									const seenCompanies = new Set();
									const seenLocations = new Set();

									for (const job of scored) {
										const comp = (job.company || '').toString().toLowerCase();
										const loc = (job.location || '').toString().toLowerCase();
										if (!seenCompanies.has(comp) || !seenLocations.has(loc)) {
											picked.push(job);
											seenCompanies.add(comp);
											seenLocations.add(loc);
										}
										if (picked.length >= 15) break;
									}

									// fill up with top remaining if we still have slots
									if (picked.length < 15) {
										for (const job of scored) {
											if (picked.findIndex(j => j.id === job.id) === -1) {
												picked.push(job);
											}
											if (picked.length >= 15) break;
										}
									}

									const result = picked.slice(0, 15).map(({ _score, ...rest }) => rest);
									res.json(result);
		});

		// PDF / DOCX parse endpoints (stubs): accept multipart/form-data and return plain text
		app.post('/api/parse-pdf', upload, (req, res) => {
			// server may implement proper parsing; for now return empty or simple message
			res.status(501).send('PDF parsing endpoint not implemented on server.');
		});

		app.post('/api/parse-docx', upload, (req, res) => {
			res.status(501).send('DOCX parsing endpoint not implemented on server.');
		});

		const port = process.env.PORT || 4000;
		app.listen(port, () => console.log(`ATS server listening on http://localhost:${port}`));
	} catch (err) {
		console.error('Server failed to start', err);
		process.exit(1);
	}
})();

