/*
* grunt-squirrel
* https://github.com/mattdwen/grunt-squirrel
*
* Copyright (c) 2015 Matt Dwen
* Licensed under the MIT license.
*/

'use strict';

var path = require('path');
var squirrelPath = path.join(__dirname, 'Squirrel.exe');

module.exports = function(grunt) {

  var executable = squirrelPath,

  createArguments = function(command, path, args) {
    var result = [];

    if (command[0] != '-') {
      command = '-' + command;
    }

    result.push(command);
    result.push(path);

    for(var key in args) {
      var argKey = '--' + key;
      result.push(argKey);

      if (args[key] && args[key] !== true) {
        result.push(args[key]);
      }
    }

    return result
  },

  createSpawnCallback = function(path, args, callback) {
    return function(error, result, code) {
      if (error) {
        var _error = 'Error while trying to execute Squirrel on file ' + path + '\n' + error;
        callback(_error);
      } else {
        if ('verbose' in args) {
          grunt.log.writeln(result);
        }

        grunt.log.ok('Created Squirrel release');
        callback();
      }
    }
  },

  isPackageFile = function(file) {
    return path.extname(file) === ".nupkg";
  },

  releasify = function(path, args, callback) {
    if (!isPackageFile(path)) {
      callback('File path ' + path + ' is not a NuGet package file!');
      return;
    }

    grunt.log.writeln('Trying to create Squirrel package from ' + path + '.');

    grunt.util.spawn(
      {
        cmd: executable,
        args: createArguments('releasify', path, args)
      },
      createSpawnCallback(path, args, callback)
    );
  };

  return {
    releasify: releasify
  };
};
