# server/tools

This folder contains utility scripts for working with the Kaggle job descriptions dataset and precomputing embeddings.

- `convert_kaggle_to_jobs.js` - streaming CSV -> normalized JSON converter (Node.js). Use for large CSV files.
- `download_kaggle_sample.py` - helper to download a Kaggle dataset sample using the Kaggle CLI (requires `kaggle.json`).
- `wrap_and_post_precompute.js` - small Node helper to POST a local JSON file to the server precompute endpoint.

Usage examples:

Node converter (streaming):
```
node server/tools/convert_kaggle_to_jobs.js server/uploads/job_descriptions.csv server/uploads/kaggle_jobs.json
```

Download sample with Kaggle CLI (requires credentials):
```
python server/tools/download_kaggle_sample.py --dataset ravindrasinghrana/job-description-dataset --out-dir server/uploads --sample-rows 100
```

If you need to POST a large JSON file to the server for precompute, see `wrap_and_post_precompute.js`.
Kaggle helper scripts

- `download_kaggle_sample.py` - uses `kaggle` CLI to download a dataset zip and extract the CSV candidates. It writes a small sample CSV (default 100 rows) to `server/uploads/`.

Usage example (after installing `kaggle` and placing your credentials at `~/.kaggle/kaggle.json`):

```
python server/tools/download_kaggle_sample.py --dataset ravindrasinghrana/job-description-dataset --out-dir server/uploads --sample-rows 100
```

Note: This script is not executed automatically by the project. Run it locally where you have network access and valid Kaggle credentials.
