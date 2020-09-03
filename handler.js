'use strict';

const fetch = require('node-fetch');
const AWS = require('aws-sdk');

function generateTapMusicURL(lastfmUser, tapMusicType, tapMusicSize){
  return `https://www.tapmusic.net/collage.php?user=${lastfmUser}&type=${tapMusicType}&size=${tapMusicSize}&caption=true`;
}

async function getTapMusicCollage(lastfmUser, tapMusicType, tapMusicSize){
  const url = generateTapMusicURL(lastfmUser, tapMusicType, tapMusicSize);
  const response = await fetch(url);

  if (response.headers.get('content-type') !== 'image/jpeg') {
    throw new Error(`TapMusic did not return a collage (url=${url})`);
  }

  const buffer = await response.buffer();
  return buffer;
}

async function uploadBufferToS3(bucket, path, buffer){
  const s3 = new AWS.S3();
  const params = {
    Bucket: bucket,
    Key: path,
    Body: buffer,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };

  s3.putObject(params, (err, data) => {
    if (err) {
      throw new Error(`Error uploading to S3 (error=${err}`);
    } else {
      return Promise.resolve(1);
    }
  });
}

async function copyS3Object(bucket, srcpath, destpath){
  const s3 = new AWS.S3();
  var params = {
    Bucket: bucket, 
    CopySource: `/{${bucket}/${srcpath}`, 
    Key: destpath
   };
   s3.copyObject(params, function(err, data) {
     if (err) {
      throw new Error(`Error copying object on S3 (error=${err}`);
     } else {
      return Promise.resolve(1);
     }
   });
}

module.exports.weekly = async event => {
  const S3_BUCKET = process.env.S3_BUCKET;
  const LASTFM_USER = process.env.LASTFM_USER;
  const date = new Date();

  const buffer = await getTapMusicCollage(LASTFM_USER, '7day', '3x3');
  uploadBufferToS3(S3_BUCKET, 'tapmusic-archiver/current_week.jpg', buffer).then(()=> {
    copyS3Object(S3_BUCKET, 'tapmusic-archiver/current_week.jpg', `tapmusic-archiver/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}.jpg`);
  });
};


module.exports.monthly = async event => {
  const S3_BUCKET = process.env.S3_BUCKET;
  const LASTFM_USER = process.env.LASTFM_USER;
  const date = new Date();

  const buffer = await getTapMusicCollage(LASTFM_USER, '1month', '5x5');
  uploadBufferToS3(S3_BUCKET, 'tapmusic-archiver/current_month.jpg', buffer).then(()=> {
    copyS3Object(S3_BUCKET, 'tapmusic-archiver/current_month.jpg', `tapmusic-archiver/${date.getFullYear()}/${date.getMonth() + 1}/month.jpg`);
  })
};