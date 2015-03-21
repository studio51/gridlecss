module.exports = function(grunt) {

  var appConfig = {
    host: 'localhost',
    port: 1337,
    appDir: 'web'
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
          base: ['web', '']
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
          'dist/gridle.css': 'grid/gridle.scss',
          'web/css/gridle.css': 'grid/gridle.scss',
          'web/css/theme.css': 'grid/theme.scss'
        }
      }
    },

    cssnext: {
      options: {
        sourcemap: true
      },
      dist: {
        files: {
          'dist/gridle.css': 'dist/gridle.css',
          'web/css/gridle.css': 'web/css/gridle.css',
          'web/css/theme.css': 'web/css/theme.css'
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer-core')({
            browsers: ['last 7 versions', '> 5%'],
          }).postcss
        ]
      },

      dist: {
        src: ['dist/gridle.css', 'web/css/theme.css']
      }
    },

    jade: {
      html: {
        files: {
          'web/': ['web/*.jade']
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
        src: ['dist/']
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
        tasks: ['sass', 'postcss', 'cssnext']
      },
      jade: {
        files: ['web/*.jade', 'web/templates/*.jade'],
        tasks: ['jade']
      }
    }
  });

  grunt.registerTask('serve', [
    'clean',
    'connect',
    'open',
    'watch'
  ]);

  grunt.registerTask('default', ['serve']);
}
