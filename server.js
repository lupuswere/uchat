//Basic settings
var express = require("express");
var path = require("path");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var methodOverride = require("method-override");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");

//Set up log level
io.set("log level", 1);

//Listen to Web Socket Connection
