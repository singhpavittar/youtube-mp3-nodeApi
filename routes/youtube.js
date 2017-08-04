var express = require('express');
var path = require('path');
var router = express.Router();
const fs = require('fs');
const ytdl = require('ytdl-core');
var youtubeStream = require('youtube-audio-stream-2');
const ffmpeg = require('fluent-ffmpeg');
const youtubeSearch = require('youtube-search');
const CONST = require('../api/constants/constants');

const getStream = (url) => youtubeStream(url);

router.get('/', function(req, res) {
  // var filePath = path.join(__dirname, '..', 'video.mp4');
  // console.log(filePath);

  // const video =
  // console.log(req.body);
  // getStream(req.query.url).pipe(res).on('error', () => console.log(arguments));
  // res.send(req.query.url);
  // console.log(stream);
  // ffmpeg({source: stream}).audioBitrate(128).audioCodec('libmp3lame').toFormat('mp3').output(res).run();
  // console.log(ffmpegCommand);
  // res.send("done");
  // .pipe(res);
  // var proc = new ffmpeg({source: stream});
  //
  // //currently have ffmpeg stored directly on the server, and ffmpegLocation is the path to its location... perhaps not ideal, but what I'm currently settled on. And then sending output directly to response.
  // proc.setFfmpegPath(ffmpegLocation);
  // proc.withAudioCodec('libmp3lame').toFormat('mp3').output(res).run();
  // proc.on('end', function() {
  //   console.log('finished');
  // });

  // function errhandler(err) {
  //   if (!err) {
  //     console.log('conversion complete');
  //     // res.send('success');
  //   } else {
  //     console.log('conversion failed');
  //     // res.send('fail');
  //   }
  // }

  // const fileConversion = (input) => {
  //   ffmpeg(input).toFormat('mp3').on('end', function() {
  //     console.log('conversion ended');
  //     errhandler(null);
  //   }).on('error', function(err) {
  //     console.log('error: ', err.code, err.msg);
  //     errhandler(err);
  //   }).pipe(res, {end: true});
  //   // .run();
  // };

  // fileConversion(ytdl(req.query.url));
  // res.send('err');
  // fileConversion(ytdl(req.query.url), res, function(err) {
  //   if (!err) {
  //     console.log('conversion complete');
  //     // res.send('success');
  //   } else {
  //     console.log('conversion failed');
  //     // res.send('fail');
  //   }
  // });
  const audio = ytdl(req.query.url, {
    filter: 'audioonly',
    quality: '141'
  });
  ffmpeg(audio).audioCodec('libmp3lame').audioBitrate(128).toFormat('mp3').on('error', (err) => console.error(err)).on('end', () => console.log('Finished!')).pipe(res, {end: true});
});

router.get('/convert', (req, res) => {
  console.log(path.join(__dirname, '..', 'routes', 'xyz.mp4'));
  // res.send('path');
  fileConversion(fs.createReadStream(path.join(__dirname, '..', 'routes', 'xyz.mp4')), './output.mp3', function(err) {
    if (!err) {
      console.log('conversion complete');
      res.send('success');
    } else {
      console.log('conversion failed');
      res.send('fail');
    }
  });
});

/* REMOVE THE KEY WHILE PUSHING INTO THE GIT */

router.post('/info', (req, res, next) => {
  getStream(req.body.url).on('info', function(data) {
    res.send(data);
  });
});

router.get('/search/:search', (req, res) => {
  // res.send("tagId is set to " + req.params.tagId);
  youtubeSearch(req.params.search, CONST.youtube_option, function(err, results) {
    if (err) {
      console.log(err);
      res.send([]);
    } else {
      res.send(results);
    }
  });
  // res.send("search")
});

module.exports = router;
