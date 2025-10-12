// Streaming CSV -> normalized JSON converter for large Kaggle job datasets// Streaming CSV -> normalized JSON converter for large Kaggle job datasets

// Usage: node convert_kaggle_to_jobs.js <input.csv> <output.json>// Usage: node convert_kaggle_to_jobs.js <input.csv> <output.json>



import fs from 'fs';import fs from 'fs';

import path from 'path';import path from 'path';

import readline from 'readline';import readline from 'readline';



function csvParseLine(line) {function csvParseLine(line) {

  // Minimal CSV parser that handles quoted fields and commas; processes a single line  // Minimal CSV parser that handles quoted fields and commas; processes a single line

  const values = [];  const values = [];

  let curr = '';  let curr = '';

  let inQuotes = false;  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {  for (let i = 0; i < line.length; i++) {

    const ch = line[i];    const ch = line[i];

    if (ch === '"') {    if (ch === '"') {

      if (inQuotes && line[i+1] === '"') {      if (inQuotes && line[i+1] === '"') {

        curr += '"';        curr += '"';

        i++; // escaped quote        i++; // escaped quote

      } else {      } else {

        inQuotes = !inQuotes;        inQuotes = !inQuotes;

      }      }

      continue;      continue;

    }    }

    if (ch === ',' && !inQuotes) {    if (ch === ',' && !inQuotes) {

      values.push(curr);      values.push(curr);

      curr = '';      curr = '';

      continue;      continue;

    }    }

    curr += ch;    curr += ch;

  }  }

  values.push(curr);  values.push(curr);

  return values;  return values;

}}



function normalizeRecord(headers, values) {function normalizeRecord(headers, values) {

  const rec = {};  const rec = {};

  for (let i = 0; i < headers.length; i++) {  for (let i = 0; i < headers.length; i++) {

    rec[headers[i]] = values[i] || '';    rec[headers[i]] = values[i] || '';

  }  }



  const title = rec.title || rec.Title || rec.job_title || rec.JobTitle || rec['Job Title'] || rec['job_title'] || '';  const title = rec.title || rec.Title || rec.job_title || rec.JobTitle || rec['Job Title'] || rec['job_title'] || '';

  const description = rec.description || rec.Description || rec.full_description || rec['Job Description'] || rec['description'] || '';  const description = rec.description || rec.Description || rec.full_description || rec['Job Description'] || rec['description'] || '';

  const skills = rec.skills || rec.Skills || rec.requirements || rec.Requirements || rec['skills'] || '';  const skills = rec.skills || rec.Skills || rec.requirements || rec.Requirements || rec['skills'] || '';

  const company = rec.company || rec.Company || rec.posted_by || rec['company'] || '';  const company = rec.company || rec.Company || rec.posted_by || rec['company'] || '';

  const location = rec.location || rec.Location || rec['location'] || '';  const location = rec.location || rec.Location || rec['location'] || '';



  const requirements = String(skills).split(/[;|,\n]/).map(s => s.trim()).filter(Boolean);  const requirements = String(skills).split(/[;|,\n]/).map(s => s.trim()).filter(Boolean);



  return {  return {

    id: rec.id || rec.job_id || rec['job_id'] || `kaggle_${Math.floor(Math.random()*100000)}`,    id: rec.id || rec.job_id || rec['job_id'] || `kaggle_${Math.floor(Math.random()*100000)}`,

    title: title || 'Unknown Title',    title: title || 'Unknown Title',

    company: company || 'Various',    company: company || 'Various',

    location: location || 'Remote',    location: location || 'Remote',

    type: rec.type || 'Fulltime',    type: rec.type || 'Fulltime',

    experience: rec.experience || 'Not specified',    experience: rec.experience || 'Not specified',

    salary: rec.salary || 'Not specified',    salary: rec.salary || 'Not specified',

    description: description,    description: description,

    requirements: requirements,    requirements: requirements,

    postedDate: rec.postedDate || rec.posted_at || rec.posted || ''    postedDate: rec.postedDate || rec.posted_at || rec.posted || ''

  };  };

}}



async function convertStream(input, output) {async function convertStream(input, output) {

  const inPath = path.resolve(input);  const inPath = path.resolve(input);

  const outPath = path.resolve(output);  const outPath = path.resolve(output);



  if (!fs.existsSync(inPath)) {  if (!fs.existsSync(inPath)) {

    console.error('Input CSV not found:', inPath);    console.error('Input CSV not found:', inPath);

    process.exit(1);    process.exit(1);

  }  }



  const readStream = fs.createReadStream(inPath, { encoding: 'utf8' });  const readStream = fs.createReadStream(inPath, { encoding: 'utf8' });

  const rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });  const rl = readline.createInterface({ input: readStream, crlfDelay: Infinity });



  let headers = null;  let headers = null;

  let count = 0;  let count = 0;

  const outStream = fs.createWriteStream(outPath, { encoding: 'utf8' });  const outStream = fs.createWriteStream(outPath, { encoding: 'utf8' });

  outStream.write('[');  outStream.write('[');

  let first = true;  let first = true;



  for await (const rawLine of rl) {  for await (const rawLine of rl) {

    const line = rawLine.replace(/\r?\n$/, '');    const line = rawLine.replace(/\r?\n$/, '');

    if (!line.trim()) continue;    if (!line.trim()) continue;

    if (!headers) {    if (!headers) {

      headers = csvParseLine(line).map(h => h.trim());      headers = csvParseLine(line).map(h => h.trim());

      continue;      continue;

    }    }



    const values = csvParseLine(line);    const values = csvParseLine(line);

    const rec = normalizeRecord(headers, values);    const rec = normalizeRecord(headers, values);



    const json = JSON.stringify(rec);    const json = JSON.stringify(rec);

    if (!first) outStream.write(',\n');    if (!first) outStream.write(',\n');

    outStream.write(json);    outStream.write(json);

    first = false;    first = false;

    count++;    count++;

  }  }



  outStream.write('\n]\n');  outStream.write('\n]\n');

  outStream.end();  outStream.end();

  console.log('Wrote', count, 'records to', outPath);  console.log('Wrote', count, 'records to', outPath);

}}



if (process.argv.length < 4) {if (process.argv.length < 4) {

  console.error('Usage: node convert_kaggle_to_jobs.js <input.csv> <output.json>');  console.error('Usage: node convert_kaggle_to_jobs.js <input.csv> <output.json>');

  process.exit(1);  process.exit(1);

}}



convertStream(process.argv[2], process.argv[3]).catch(err => { console.error(err); process.exit(1); });convertStream(process.argv[2], process.argv[3]).catch(err => { console.error(err); process.exit(1); });

