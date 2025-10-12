#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

if (process.argv.length < 3) {
  console.error('Usage: node sample_kaggle_normalized.js <file> [count]');
  process.exit(1);
}

const file = path.resolve(process.argv[2]);
const count = parseInt(process.argv[3] || '20', 10);
if (!fs.existsSync(file)) { console.error('File not found:', file); process.exit(2); }

const raw = fs.readFileSync(file, 'utf8');
let arr;
try { arr = JSON.parse(raw); } catch (err) { console.error('Parse failed:', err && err.message); process.exit(3); }

for (let i = 0; i < Math.min(count, arr.length); i++) {
  const j = arr[i];
  console.log('--- RECORD', i+1, '---');
  console.log('id:', j.id);
  console.log('title:', j.title);
  console.log('company:', j.company);
  console.log('location:', j.location);
  console.log('type:', j.type, 'experience:', j.experience, 'salary:', j.salary);
  console.log('requirements:', Array.isArray(j.requirements) ? j.requirements.slice(0,6) : j.requirements);
  console.log('description snippet:', (j.description || '').slice(0,200).replace(/\n/g,' '));
  console.log('\n');
}

console.log('Sampled', Math.min(count, arr.length), 'records from', file);
