var express = require('express');
var router = express.Router();
var Utils = require('../utils');
var colors = require('colors');
var request = require('request');

var utils = new Utils();

router.get('/*', function(req, res) {
  var url = req.originalUrl;
  if(!/^http/.test(url)){
    url = "http://223.252.199.7" + url;
  }
  var options = {
    url: url,
    headers: req.headers,
    method: 'get'
  };
  request(options)
    .on('error', function(err) {
      console.error(err.red)
    })
    .pipe(res);
});

router.post('/*', function(req, res, next) {
  if (/mp3$|flac$/.test(req.originalUrl)) {
    return request.get(req.originalUrl).pipe(res);
  }
  utils.defaultPost(req.headers, req.body, req.originalUrl, function(err, headers, body) {
    if (err) {
      console.error(err.red);
      res.status = 500;
      return res.send('Bad request');
    } else {
      // console.log(body);
      // console.log(utils);
      next();
    }
  });
});

router.post('/eapi/v3/song/detail', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/v3/playlist/detail', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/v1/album/*', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/batch', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/cloudsearch/pc', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/v1/artist', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/batch', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/v1/search/get', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/song/enhance/privilege', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/v1/discovery/new/songs', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});
router.post('/eapi/v1/play/record', function(req, res, next) {
  utils.modifyDetailApi();
  next();
});

router.post('/eapi/song/enhance/player/url', function(req, res, next) {
  if (utils.getPlaybackReturnCode() != 200 || utils.getPlaybackBitrate() < 320000) {
    utils.modifyPlayerApi(function(err) {
      if (err) {
        console.error(err.red);
        res.status = 500;
        return res.send('Bad request');
      } else {
        next();
      }
    });
  } else {
    console.log('Playback bitrate is not changed. The song URL is '.green + utils.getPlaybackUrl().green);
    next();
  }
});

router.post('/eapi/song/enhance/download/url', function(req, res, next) {
  if (utils.getDownloadReturnCode() != 200 || utils.getDownloadBitrate() < 320000) {
    utils.modifyDownloadApi(function(err) {
      if (err) {
        console.error(err.red);
        res.status = 500;
        return res.send('Bad request');
      } else {
        next();
      }
    });
  } else {
    console.log('Download bitrate is not changed. The song URL is '.green + utils.getPlaybackUrl().green);
    next();
  }
});

router.all('/*', function(req, res, next) {
  // console.log(utils.headers);
  // console.log(utils.body);
  res.set(utils.headers);
  res.send(utils.body);
});

module.exports = router;
