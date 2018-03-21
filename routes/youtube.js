var express = require('express');
var path = require('path');
var router = express.Router();
const fs = require('fs');
const ytdl = require('ytdl-core');
var youtubeStream = require('youtube-audio-stream-2');
const ffmpeg = require('fluent-ffmpeg');
const youtubeSearch = require('youtube-search');
var mp3 = require('youtube-mp3');
var rp = require('request-promise');

const CONST = require('../api/constants/constants');

const getStream = (url) => youtubeStream(url);

router.post('/', function(req, res) {
  // var filePath = path.join(__dirname, '..', 'video.mp4');
  // console.log(filePath);

  // const video =
  // console.log(req.body);
  // ytdl(req.body.url).pipe(res);
  getStream(req.body.url).pipe(res);
  // console.log(stream);
  // ffmpeg({source: stream}).audioBitrate(128).audioCodec('libmp3lame').toFormat('mp3').output(res).run();
  // console.log(ffmpegCommand);
  // res.send("done");
  // .pipe(res);
  // var proc = new ffmpeg({source: stream});
  //
  // currently have ffmpeg stored directly on the server, and ffmpegLocation is the path to its location... perhaps not ideal, but what I'm currently settled on. And then sending output directly to response.
  // proc.setFfmpegPath(ffmpegLocation);
  // proc.withAudioCodec('libmp3lame').toFormat('mp3').output(res).run();
  // proc.on('end', function() {
  //   console.log('finished');
  // });
});

/* REMOVE THE KEY WHILE PUSHING INTO THE GIT */

router.post('/info', (req, res, next) => {
  getStream(req.body.url).on('info', function(data) {
    res.send(data);
  });
});

router.get('/trending', (req, res) => {
  rp(CONST.trending_option).then(function(repos) {
    res.send(repos);
  }).catch(function(err) {
    res.send(err);
  });
});

router.get('/search', (req, res) => {
  // res.send("tagId is set to " + req.params.tagId);
  youtubeSearch(req.query.q, CONST.youtube_option, function(err, results) {
    if (err) {
      console.log(err);
      res.send([]);
    } else {
      res.send(results);
    }
  });
  // res.send("search")
});

router.get('/mp3', (req, res) => {
  mp3.download('https://www.youtube.com/watch?v=wnJ6LuUFpMo', 'LXJS 2013 Keynote').pipe(res);
});

router.get('/related', (req, res) => {
  let related = CONST.related_option;
  related.uri += req.query.id;
  rp(CONST.related_option).then(function(repos) {
    res.send(repos);
  }).catch(function(err) {
    res.send(err);
  });
});

module.exports = router;
