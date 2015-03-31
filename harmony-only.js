'use strict';

var fs = require('fs');
var visitors = require('react-tools/vendor/fbtransform/visitors');
var jstransform = require('jstransform');

var visitorList = visitors.getVisitorsBySet(['harmony']);

// perform es6 anforms on all files and simultaneously copy them to the jsx folder
var files = fs.readdirSync('js');
for (var i = 0; i < files.length; i++) {
    var src = 'js/' + files[i];
    var dest = 'jsx/'+ files[i];

    var js = fs.readFileSync(src, {encoding: 'utf8'});
    var transformed = jstransform.transform(visitorList, js).code;
    // transformed = transformed.replace('.jsx', '.js');
    transformed = '/** @jsx React.DOM */\n\n' + transformed;
    fs.writeFileSync(dest, transformed);
}
