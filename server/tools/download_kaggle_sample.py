""""""

Download the Kaggle Job Description dataset and extract a small CSV sample (first 100 rows).Download the Kaggle Job Description dataset and extract a small CSV sample (first 100 rows).



Requirements:Requirements:

- Install kaggle CLI (pip install kaggle)- Install kaggle CLI (pip install kaggle)

- Place your kaggle.json credentials file in ~/.kaggle/kaggle.json- Place your kaggle.json credentials file in ~/.kaggle/kaggle.json



Usage (from repo root):Usage (from repo root):

python server/tools/download_kaggle_sample.py --dataset ravindrasinghrana/job-description-dataset --out-dir server/uploads --sample-rows 100python server/tools/download_kaggle_sample.py --dataset ravindrasinghrana/job-description-dataset --out-dir server/uploads --sample-rows 100



This script will:This script will:

- call `kaggle datasets download -d ...` to download the dataset zip- call `kaggle datasets download -d ...` to download the dataset zip

- extract the CSV file (attempt to detect the CSV name)- extract the CSV file (attempt to detect the CSV name)

- read first N rows and write a sample CSV to `<out-dir>/kaggle_jobs_full.csv`- read first N rows and write a sample CSV to `<out-dir>/kaggle_jobs_full.csv`



Note: This requires network access and proper Kaggle credentials.Note: This requires network access and proper Kaggle credentials.

""""""



import argparseimport argparse

import osimport os

import subprocessimport subprocess

import zipfileimport zipfile

import pandas as pdimport pandas as pd





def run_cmd(cmd):def run_cmd(cmd):

    print('Running:', ' '.join(cmd))    print('Running:', ' '.join(cmd))

    res = subprocess.run(cmd, capture_output=True, text=True)    res = subprocess.run(cmd, capture_output=True, text=True)

    if res.returncode != 0:    if res.returncode != 0:

        print('Command failed:')        print('Command failed:')

        print(res.stdout)        print(res.stdout)

        print(res.stderr)        print(res.stderr)

        raise SystemExit(res.returncode)        raise SystemExit(res.returncode)

    return res.stdout    return res.stdout





def main():def main():

    parser = argparse.ArgumentParser()    parser = argparse.ArgumentParser()

    parser.add_argument('--dataset', required=True, help='Kaggle dataset slug, e.g. owner/dataset-name')    parser.add_argument('--dataset', required=True, help='Kaggle dataset slug, e.g. owner/dataset-name')

    parser.add_argument('--out-dir', default='server/uploads', help='Directory to write the CSVs')    parser.add_argument('--out-dir', default='server/uploads', help='Directory to write the CSVs')

    parser.add_argument('--sample-rows', type=int, default=100, help='How many rows to include in the sample')    parser.add_argument('--sample-rows', type=int, default=100, help='How many rows to include in the sample')

    args = parser.parse_args()    args = parser.parse_args()



    os.makedirs(args.out_dir, exist_ok=True)    os.makedirs(args.out_dir, exist_ok=True)

    zip_name = f"{args.dataset.split('/')[-1]}.zip"    zip_name = f"{args.dataset.split('/')[-1]}.zip"



    # 1) download the dataset zip via kaggle CLI    # 1) download the dataset zip via kaggle CLI

    run_cmd(['kaggle', 'datasets', 'download', '-d', args.dataset, '-f', 'Job_Descriptions.csv', '-p', args.out_dir, '--force'])    run_cmd(['kaggle', 'datasets', 'download', '-d', args.dataset, '-f', 'Job_Descriptions.csv', '-p', args.out_dir, '--force'])



    zip_path = os.path.join(args.out_dir, zip_name)    zip_path = os.path.join(args.out_dir, zip_name)

    # Some datasets download as name.zip; others may download a zip with different name    # Some datasets download as name.zip; others may download a zip with different name

    # Try to find any zip file in outdir matching the dataset base name    # Try to find any zip file in outdir matching the dataset base name

    if not os.path.exists(zip_path):    if not os.path.exists(zip_path):

        # search for any zip in outdir        # search for any zip in outdir

        candidates = [f for f in os.listdir(args.out_dir) if f.endswith('.zip')]        candidates = [f for f in os.listdir(args.out_dir) if f.endswith('.zip')]

        if not candidates:        if not candidates:

            raise SystemExit('No zip file found in ' + args.out_dir)            raise SystemExit('No zip file found in ' + args.out_dir)

        zip_path = os.path.join(args.out_dir, candidates[0])        zip_path = os.path.join(args.out_dir, candidates[0])



    print('Found zip at', zip_path)    print('Found zip at', zip_path)



    # 2) inspect and extract CSV    # 2) inspect and extract CSV

    with zipfile.ZipFile(zip_path, 'r') as z:    with zipfile.ZipFile(zip_path, 'r') as z:

        namelist = z.namelist()        namelist = z.namelist()

        print('Zip contents:', namelist)        print('Zip contents:', namelist)

        # Try to find the CSV named Job_Descriptions.csv or similar        # Try to find the CSV named Job_Descriptions.csv or similar

        csv_candidates = [n for n in namelist if n.lower().endswith('.csv') and 'job' in n.lower()]        csv_candidates = [n for n in namelist if n.lower().endswith('.csv') and 'job' in n.lower()]

        if not csv_candidates:        if not csv_candidates:

            csv_candidates = [n for n in namelist if n.lower().endswith('.csv')]            csv_candidates = [n for n in namelist if n.lower().endswith('.csv')]

        if not csv_candidates:        if not csv_candidates:

            raise SystemExit('No CSV found in the zip file')            raise SystemExit('No CSV found in the zip file')

        csv_name = csv_candidates[0]        csv_name = csv_candidates[0]

        print('Using CSV:', csv_name)        print('Using CSV:', csv_name)

        extract_path = os.path.join(args.out_dir, os.path.basename(csv_name))        extract_path = os.path.join(args.out_dir, os.path.basename(csv_name))

        z.extract(csv_name, args.out_dir)        z.extract(csv_name, args.out_dir)

        # If the CSV was inside a folder, move it to out_dir root        # If the CSV was inside a folder, move it to out_dir root

        if os.path.exists(extract_path) == False:        if os.path.exists(extract_path) == False:

            # try to find the extracted file            # try to find the extracted file

            for root, dirs, files in os.walk(args.out_dir):            for root, dirs, files in os.walk(args.out_dir):

                for f in files:                for f in files:

                    if f == os.path.basename(csv_name):                    if f == os.path.basename(csv_name):

                        extract_path = os.path.join(root, f)                        extract_path = os.path.join(root, f)

                        break                        break



    print('Reading CSV from', extract_path)    print('Reading CSV from', extract_path)

    # 3) read first N rows and write full kaggle_jobs_full.csv and a sample    # 3) read first N rows and write full kaggle_jobs_full.csv and a sample

    df = pd.read_csv(extract_path, nrows=args.sample_rows)    df = pd.read_csv(extract_path, nrows=args.sample_rows)

    full_out = os.path.join(args.out_dir, 'kaggle_jobs_full.csv')    full_out = os.path.join(args.out_dir, 'kaggle_jobs_full.csv')

    sample_out = os.path.join(args.out_dir, 'kaggle_jobs_sample.csv')    sample_out = os.path.join(args.out_dir, 'kaggle_jobs_sample.csv')



    # If dataset is small, write whatever is present    # If dataset is small, write whatever is present

    df.to_csv(sample_out, index=False)    df.to_csv(sample_out, index=False)

    print('Wrote sample CSV to', sample_out)    print('Wrote sample CSV to', sample_out)



    # Optionally write the full CSV (not downloaded fully here), but keep sample as our source    # Optionally write the full CSV (not downloaded fully here), but keep sample as our source

    print('Done')    print('Done')





if __name__ == '__main__':if __name__ == '__main__':

    main()    main()

