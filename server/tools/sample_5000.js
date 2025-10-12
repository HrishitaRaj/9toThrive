#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd());
const src = path.join(root, 'server', 'uploads', 'kaggle_jobs.cleaned.normalized.json');
const out = path.join(root, 'server', 'uploads', 'kaggle_jobs.cleaned.normalized.sample5000.json');
const COUNT = 5000;

if (!fs.existsSync(src)) {
  console.error('Source file not found:', src);
  process.exit(2);
}

console.log('Reading', src);
const raw = fs.readFileSync(src, 'utf8');
let arr;
try { arr = JSON.parse(raw); } catch (err) { console.error('Parse failed:', err && err.message); process.exit(3); }

const take = arr.slice(0, Math.min(COUNT, arr.length));
fs.writeFileSync(out, JSON.stringify(take, null, 2), 'utf8');
console.log('Wrote', take.length, 'records to', out);
