module.exports = function(grunt) {

  var appConfig = {
    host: 'localhost',
    port: 1337,
    appDir: 'web'
  };

  var grid_dir        = 'grid/',
      theme_dir       = 'web/',
      grid_build_dir  = 'dist/',
      theme_build_dir = theme_dir + 'dist/';
      theme_css_dir   = theme_dir + 'dist/css';
      theme_js_dir    = theme_dir + 'dist/js';

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
          base: [theme_build_dir]
        }
      }
    },

    open: {
      server: {
        path: "http://<%= appConfig.host %>:<%= appConfig.port %>"
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          "dist/gridle.css": "grid/gridlecss.scss",
          "web/dist/css/theme.css": "web/css/theme.scss"
        }
      }
    },

    cssnext: {
      options: {
        sourcemap: false
      },
      dist: {
        files: {
          'dist/gridle.css': 'dist/gridle.css',
          'web/dist/css/theme.css': 'web/dist/css/theme.css'
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
        src: ['dist/gridle.css', 'web/dist/css/theme.css']
      }
    },

    cssbeautifier : {
      files : ['dist/gridle.css', 'web/dist/css/theme.css'],
      options : {
        indent: ' ',
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
          'dist/gridle.min.css': ['dist/gridle.css'],
          'web/dist/css/theme.min.css': ['web/dist/css/theme.css'],
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'web/dist/js/main.min.js': ['web/js/**/*.js']
        }
      }
    },

    svgmin: {
      options: {
        plugins: [
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false }
        ]
      },

      dist: {
        files: {
          'web/dist/images/menu.svg': ['web/images/*.svg']
        }
      }
    },

    jade: {
      html: {
        files: {
          'web/dist/': ['web/*.jade']
        },

        options: {
          client: false,
          pretty: true
        }
      }
    },

    clean: {
      options: {
        dot: true
      },
      dist: {
        src: ['web/dist/']
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
        files: ['grid/**/*.scss', 'web/css/**/*.scss'],
        tasks: ['sass', 'postcss', 'cssnext']
      },
      uglify: {
        files: ['web/js/**/*.js'],
        tasks: ['uglify']
      },
      // svgmin: {
      //   files: ['web/images/**/*.svg'],
      //   tasks: ['svgmin']
      // },
      jade: {
        files: ['web/**/*.jade'],
        tasks: ['jade']
      }
    }
  });

  grunt.registerTask('serve', [
    'connect',
    'open',
    'watch'
  ]);

  // Clean the web/dist folder which is only for viewing the grid in action
  // locally
  //
  grunt.registerTask('clean', [
    'clean'
  ]);

  grunt.registerTask('default', ['serve']);
}
