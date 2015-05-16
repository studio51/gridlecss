module.exports = function(grunt) {

  var appConfig = {
    host: 'localhost',
    port: 1337
  };

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

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
          base: 'dist/'
        }
      }
    },

    open: {
      server: {
        path: "http://<%= appConfig.host %>:<%= appConfig.port %>"
      }
    },

    clean: {
      options: {
        dot: true
      },

      dist: {
        src: ['dist/']
      }
    },

    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },

      dist: {
        files: {
          'dist/css/theme.css': 'css/**/*.scss'
        }
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer-core')({
            browsers: ['last 5 versions', '> 15%', 'IE 10']
          }).postcss
        ]
      },

      dist: {
        src: ['dist/css/theme.css']
      }
    },

    cssnext: {
      options: {
        sourcemap: false
      },

      dist: {
        files: {
          'dist/css/theme.css': 'dist/css/theme.css'
        }
      }
    },

    cssbeautifier : {
      files : ['dist/css/theme.css'],
      options : {
        indent: '  ',
        openbrace: 'end-of-line',
        autosemicolon: true
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },

      target: {
        files: {
          'dist/css/theme.min.css': ['dist/css/theme.css'],
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/js/main.min.js': ['js/**/*.js']
        }
      }
    },

    jade: {
      html: {
        files: {
          'dist/': ['*.jade']
        },

        options: {
          client: false,
          pretty: true
        }
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
        files: ['css/**/*.scss'],
        tasks: ['sass', 'postcss', 'cssnext']
      },
      uglify: {
        files: ['js/**/*.js'],
        tasks: ['uglify']
      },
      jade: {
        files: ['**/*.jade'],
        tasks: ['jade']
      }
    }
  });

  grunt.registerTask('compile-css', [
    'sass',
    'postcss',
    'cssnext'
  ]);

  grunt.registerTask('compile-js', [
    'uglify'
  ]);

  grunt.registerTask('compile-html', [
    'jade'
  ]);

  grunt.registerTask('compile-theme', ['compile-css', 'compile-js', 'compile-html']);

  grunt.registerTask('prettify', [
    'cssbeautifier',
    'cssmin'
  ]);

  grunt.registerTask('preview', [
    'compile-theme',
    'connect',
    'open',
    'watch'
  ]);

  grunt.registerTask('default', ['clean', 'preview']);
  grunt.registerTask('compile', ['clean', 'compile-theme']);
  grunt.registerTask('ship', ['clean', 'compile', 'prettify']);
}
