// Small helper to POST a local JSON file to the server's precompute endpoint in streaming chunks.
// Usage: node wrap_and_post_precompute.js <file.json> <serverUrl>

import fs from 'fs';
import http from 'http';
import https from 'https';
import url from 'url';

const [,, file, serverUrl] = process.argv;
if (!file || !serverUrl) {
  console.error('Usage: node wrap_and_post_precompute.js <file.json> <serverUrl>');
  process.exit(1);
}

const parsed = url.parse(serverUrl);
const client = parsed.protocol === 'https:' ? https : http;

const stat = fs.statSync(file);
const req = client.request({
  hostname: parsed.hostname,
  port: parsed.port,
  path: parsed.path || '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': stat.size
  }
}, (res) => {
  console.log('Server status:', res.statusCode);
  res.on('data', (d) => process.stdout.write(d));
});

req.on('error', (err) => {
  console.error('Request error', err);
});

const stream = fs.createReadStream(file);
stream.pipe(req);

stream.on('end', () => {
  req.end();
  console.log('Upload finished');
});
