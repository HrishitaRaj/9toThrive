#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd());
const samplePath = path.join(root, 'server', 'uploads', 'kaggle_jobs.cleaned.normalized.sample5000.json');

if (!fs.existsSync(samplePath)) {
  console.error('Sample file not found:', samplePath);
  process.exit(2);
}

const raw = fs.readFileSync(samplePath, 'utf8');
let arr;
try { arr = JSON.parse(raw); } catch (err) { console.error('Parse failed:', err && err.message); process.exit(3); }

const titleInfer = (title = '') => {
  const t = String(title).toLowerCase();
  if (/intern|trainee/.test(t)) return { experience: '0-1 years', salary: '$18k-$30k' };
  if (/junior|jr\b|entry|associate/.test(t)) return { experience: '0-2 years', salary: '$35k-$55k' };
  if (/senior|sr\b/.test(t)) return { experience: '5+ years', salary: '$120k-$160k' };
  if (/lead|principal|head/.test(t)) return { experience: '7+ years', salary: '$150k-$220k' };
  if (/manager/.test(t)) return { experience: '6+ years', salary: '$110k-$170k' };
  if (/qa|quality assurance|test/.test(t)) return { experience: '2-5 years', salary: '$50k-$85k' };
  if (/data engineer|data scientist|ml|machine learning|nlp|ai/.test(t)) return { experience: '3-6 years', salary: '$110k-$150k' };
  if (/backend|server|api|devops|site reliability|sre/.test(t)) return { experience: '3-6 years', salary: '$95k-$140k' };
  if (/frontend|ui|ux|react|angular|vue/.test(t)) return { experience: '2-5 years', salary: '$75k-$120k' };
  if (/full stack|full-stack|fullstack/.test(t)) return { experience: '3-6 years', salary: '$90k-$140k' };
  if (/database|sql|nosql/.test(t)) return { experience: '3-6 years', salary: '$80k-$130k' };
  // default
  return { experience: '2-4 years', salary: '$60k-$100k' };
};

let expUpdated = 0;
let salUpdated = 0;

for (let i = 0; i < arr.length; i++) {
  const job = arr[i];
  const title = job.title || job.job_title || '';
  const inferred = titleInfer(title);

  // normalize existing experience text
  const exp = (job.experience || '').toString().trim();
  if (!exp || /not\s*specified/i.test(exp) || exp === '-') {
    job.experience = inferred.experience;
    expUpdated++;
  }

  const sal = (job.salary || job.compensation || '').toString().trim();
  if (!sal || /not\s*specified/i.test(sal) || sal === '-') {
    job.salary = inferred.salary;
    salUpdated++;
  }
}

fs.writeFileSync(samplePath, JSON.stringify(arr, null, 2), 'utf8');
console.log('Updated sample file:', samplePath);
console.log('Experience fields updated:', expUpdated);
console.log('Salary fields updated:', salUpdated);
console.log('Total records:', arr.length);
console.log('Preview (first 5):');
for (let i = 0; i < Math.min(5, arr.length); i++) {
  const j = arr[i];
  console.log(i+1, { id: j.id, title: j.title, company: j.company, experience: j.experience, salary: j.salary });
}
