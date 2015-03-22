module.exports = function(grunt) {
  'use strict';
  
  var _ = grunt.util._,
      async = grunt.util.async,
      squirrel = require('../lib/squirrel')(grunt);

  grunt.registerMultiTask('squirrel-releasify', 'Squirrel Releasify - Prepare NuGet packages for release via Squirrel', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async(),
        params = this.options();

    async.forEach(
      this.files,
      function(file, callback) {
        var dest = file.dest || '';

        async.forEach(
          file.src,
          function(src, complete) {
            squirrel.releasify(src, _.extend(params, { releaseDir: dest}), complete);
          },
          callback
        );
      },
      function(err) {
        if (err) {
          grunt.log.error().error(err);
          done(false);
          return;
        }

        done();
      }
    );
  });

};
