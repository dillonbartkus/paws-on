"use strict";

var express = require('express');

var app = express();
var port = process.env.HTTP_PORT || 8080;

var cors = require('cors');

var parser = require('body-parser');

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({
  extended: false
}));
app.get('/', function (req, res) {
  res.send("server");
});

var routes = require('./routes');

app.use('/', routes);
app.listen(port, function () {
  console.log("Listening on ".concat(port));
});
