"use strict";

const express = require('express');
const cors = require('cors');
const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB0');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const NEUTRAL = 120;

let command = null;

function move(pin, pos) {
    var b = [255, pin, pos];
    port.write(b);
};

function timedMove(pin, pos, timeout) {
    move(pin, pos);
    setTimeout(function () {
        move(pin, NEUTRAL);
    }, timeout);
};

function nav(left, right) {
    move(0, left);
    move(1, right);
};

function timedNav(left, right, timeout) {
    nav(left, right);
    setTimeout(function () {
        nav(NEUTRAL, NEUTRAL);
    }, timeout);
};

// express app
var app = express();
var httpPort = 8080;


app.use(cors()); // cors
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('combined')); // logging

// routes
app.get('/fwd/:ms?', function (req, res) {
    var ms = req.params.ms || 0;
    if (ms > 0 && ms <= 10000) {
        timedNav(85, 90, ms);
    } else {
        nav(85,90);
    }
    res.json({ success: 'moved forward for ' + ms + 'ms' });
});
app.get('/rev/:ms?', function (req, res) {
    var ms = req.params.ms || 0;
    if (ms > 0 && ms <= 10000) {
        timedNav(155, 155, ms);
    } else {
        nav(155,155);
    }
    res.json({ success: 'moved reverse for ' + ms + 'ms' });
});
app.get('/rgt/:ms?', function (req, res) {
    var ms = req.params.ms || 0;
    if (ms > 0 && ms <= 10000) {
        timedNav(85, 155, ms);
    } else {
        nav(85,155);
    }
    res.json({ success: 'moved right for ' + ms + 'ms' });
});
app.get('/lft/:ms?', function (req, res) {
    var ms = req.params.ms || 0;
    if (ms > 0 && ms <= 10000) {
        timedNav(155, 90, ms);
    } else {
        nav(155,90);
    }
    res.json({ success: 'moved left for ' + ms + 'ms' });
});

app.get('/stop', function (req, res) {
    nav(NEUTRAL,NEUTRAL);
    res.json({ success: 'stopped' });
});

app.use('/public', express.static('public'));


function log(s) {
    console.log(new Date() + " -- " + s);
}

app.listen(httpPort);
console.log('serial ssc server started on port:  ' + httpPort);