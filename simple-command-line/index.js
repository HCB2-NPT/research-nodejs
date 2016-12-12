#!/usr/bin/env node

/**
 * filesearch ahihi
 * [ 'C:\\Program Files\\nodejs\\node.exe',
 * 'C:\\Users\\namvh\\AppData\\Roaming\\npm\\node_modules\\simple-command-line\\index.js',
 * 'ahihi' ]
 */
var args = process.argv.slice(2);
var searchPattern = args[0];

var exec = require('child_process').exec;
var child = exec('ls -a | grep ' + searchPattern, (err, stdout, stderr) => {
    console.log(stdout);
});
