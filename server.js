var express = require("express");
var socket = require("socket.io");
var app = express();

var port = 3214;

var server = app.listen(port, () => {
    console.log(`server running at ${port} - http://localhost:${port}`);
});
