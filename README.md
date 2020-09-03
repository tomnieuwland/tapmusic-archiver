# TapMusic Collage Archiver

Two AWS Lambda functions that will automatically fetch your TapMusic collage once a week, and at the start of each month. The collages are then stored in an Amazon S3 bucket.

## Requirements

- Node.js
- Serverless
- AWS S3 Bucket you have permission to access
- AWS Credentials you have permission to deploy lambda functions with

## Installation

- `npm i`

## Deployment

`sls deploy --bucket <s3 bucket name> --lastfmuser <lastfm username>`

Optional flags:
- `--stage` Deployment stage for the function (defaults to `prod`)
- `--region` Region to deploy AWS Lambda function (defaults to `ap-southeast-2`)
- `--aws-profile` AWS Profile (defined in credentials file) to use

## Accessing archives

Archives will be stored under the root level of the given bucket, in a directory called `tapmusic-archiver`