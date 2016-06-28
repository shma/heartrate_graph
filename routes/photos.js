var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res) {
  fs.readdir(path.join(__dirname, '../public') + '/img/' + req.query['date'], function(err, files){
    if (err) throw err;
    var fileList = [];
    files.forEach(function (file) {
        fileList.push(file);
    });
//    console.log(fileList);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(fileList));
  });

//  res.send('respond with a resource');
});

module.exports = router;
