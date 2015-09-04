// var jsdom = require('jsdom');

// window = jsdom.jsdom('<html><head></head><body></body></html>').createWindow();

// if(Object.keys(window).length === 0) {
//     // this happens if contextify, one of jsdom's dependencies doesn't install correctly
//     // (it installs different code depending on the OS, so it cannot get checked in.);
//     throw 'jsdom failed to create a usable environment, try uninstalling and reinstalling it';
// }

// global.window = window;

// global.document = window.document;

// var R = global.R = require('../build/test-build.js');