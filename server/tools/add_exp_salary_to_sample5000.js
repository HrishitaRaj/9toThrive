#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const uploads = path.join(root, 'server', 'uploads');
const sample = path.join(uploads, 'kaggle_jobs.cleaned.normalized.sample5000.json');
const backup = path.join(uploads, 'kaggle_jobs.cleaned.normalized.sample5000.json.bak');

if (!fs.existsSync(sample)) {
  console.error('Sample file not found:', sample);
  process.exit(2);
}

console.log('Reading', sample);
const raw = fs.readFileSync(sample, 'utf8');
let arr;
try { arr = JSON.parse(raw); } catch (err) { console.error('Parse failed:', err && err.message); process.exit(3); }

const extractExperience = (job) => {
  if (job.experience) return String(job.experience).trim();
  if (job.years) return String(job.years).trim();
  const txt = (job.description || '') + ' ' + (job.title || '');
  const m = txt.match(/(\b\d+\+?\s*(?:years|yrs|year|y)\b)/i);
  if (m) return m[0];
  // look for senior/entry/junior hints
  if (/senior|sr\b/i.test(txt)) return 'Senior';
  if (/junior|jr\b/i.test(txt)) return 'Junior';
  if (/mid[- ]level/i.test(txt)) return 'Mid';
  return 'Not specified';
};

const extractSalary = (job) => {
  if (job.salary) return String(job.salary).trim();
  if (job.compensation) return String(job.compensation).trim();
  const txt = (job.description || '') + ' ' + (job.title || '');
  // simple patterns: e.g., 50k, $50000, 10-15 Lacs, 8-12 LPA
  const m = txt.match(/\$?\b\d{1,3}(?:[,\d]{0,})\s*(?:k|K|KWD|USD|EUR)?\b/);
  if (m) return m[0];
  const m2 = txt.match(/\b\d+\s*[-–]\s*\d+\s*(?:lacs|lac|LPA|lpa|Lacs)\b/i);
  if (m2) return m2[0];
  const m3 = txt.match(/\b\d+(?:\.\d+)?\s*(?:LPA|lpa|lacs|lac)\b/i);
  if (m3) return m3[0];
  return 'Not specified';
};

let updated = 0;
for (let i = 0; i < arr.length; i++) {
  const job = arr[i];
  const beforeExp = job.experience || job.years || null;
  const beforeSal = job.salary || job.compensation || null;
  const exp = extractExperience(job);
  const sal = extractSalary(job);
  job.experience = exp;
  job.salary = sal;
  if (!job.requirements) job.requirements = job.skills || [];
  if (beforeExp === null || beforeSal === null) updated++;
}

// backup original
fs.copyFileSync(sample, backup);
fs.writeFileSync(sample, JSON.stringify(arr, null, 2), 'utf8');
console.log('Wrote', arr.length, 'records to', sample);
console.log('Updated', updated, 'records (had missing exp/salary) -- backup at', backup);

// print preview of first 5
for (let i = 0; i < Math.min(5, arr.length); i++) {
  const j = arr[i];
  console.log('---', i+1, j.id || '', j.title || '');
  console.log('  experience:', j.experience, ' salary:', j.salary);
}
