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
  getStream(req.body.url).pipe(res);
});

/* REMOVE THE KEY WHILE PUSHING INTO THE GIT */

router.get('/info', (req, res, next) => {
  let info = CONST.info;
  info.uri += req.query.id;
  rp(info).then(function(repos) {
    res.send(repos);
  }).catch(function(err) {
    res.send(err);
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
