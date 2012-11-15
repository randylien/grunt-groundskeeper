/*jshint node:true*/

/*
 * grunt-groundskeeper
 * https://github.com/couto/grunt-groundskeeper
 *
 * Copyright (c) 2012 Couto
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

  'use strict';

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('groundskeeper', 'Remove logging statements, debuggers and pragmas', function () {

    // Depedencies
    var fs = require('fs'),
        path = require('path'),
        groundskeeper = require('groundskeeper'),
        helpers = require('grunt-lib-contrib').init(grunt),
        filePaths = [],
        sourceFile = '',
        source = '',
        cleaner = {};

    this.options = helpers.options(this);

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    this.files.forEach(function (file) {

      grunt.file
        .expandFiles(file.src)
        .forEach(function (sourceFile) {
          source = grunt.file.read(sourceFile),
          cleaner = groundskeeper(this.options);

          cleaner.write(source);
          grunt.file.write(file.dest, cleaner.toString());

      });
    });


    console.log(this.options);
    console.log(this.files);

  });

};
