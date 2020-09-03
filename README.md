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

## Why you should use this tool

2 reasons:
- You have an archive of all collages without any human interaction from the moment the function is deployed onwards
- You can use a hardlinked url that will dynamically update once a week/once a month in the form of the `current_week` image
  
  For example: the url for my "current week" image can be found here: https://tomnieuwland-public.s3-ap-southeast-2.amazonaws.com/tapmusic-archiver/current_week.jpg
  
  If I hardlink this into the readme below...
  ![Current Week](https://tomnieuwland-public.s3-ap-southeast-2.amazonaws.com/tapmusic-archiver/current_week.jpg)
  
  This will ALWAYS show what I've been listening to in the past week!

## Support

Don't support me, support the guys over at [TapMusic](https://www.tapmusic.net/)
