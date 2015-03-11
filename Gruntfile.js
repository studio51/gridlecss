module.exports = function(grunt) {

  var appConfig = {
    host: 'localhost',
    port: 1337,
    appDir: 'dist'
  };

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    appConfig: appConfig,

    connect: {
      options: {
        port: appConfig.port,
        livereload: true,
      },
      dist: {
        options: {
          base: appConfig.appDir
        }
      }
    },

    open: {
      server: {
        path: 'http://<%= appConfig.host %>:<%= appConfig.port %>'
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/css/grid.css': 'grid/*.scss'
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer-core')({
            browsers: 'last 5 version'
          }).postcss
        ]
      },
      dist: {
        src: 'dist/css/*.css'
      }
    },

    clean: {
      options: {
        dot: true
      },
      dist: {
        src: ['dist/css', '!dist/index.html']
      }
    },

    watch: {
      options: {
        livereload: true
      },
      grunt: {
        files: 'Gruntfile.js'
      },
      sass: {
        files: 'grid/*.scss',
        tasks: ['sass', 'postcss']
      },
      html: {
        files: 'dist/*.html'
      }
    }
  });

  grunt.registerTask('serve', [
    'clean',
    'sass',
    'connect',
    'open',
    'watch'
  ]);

  grunt.registerTask('default', ['serve']);
}
