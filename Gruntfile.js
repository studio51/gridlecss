module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
        sourceMap: true
      },

      dist: {
        files: {
          'dist/css/gridle.css': 'sass/gridle.scss'
        }
      }
    },

    postcss: {
      options: {
        map: false,
        diff: true,
        processors: [
          require('autoprefixer') ({ browsers: ['last 5 versions', '> 15%', 'IE 10'] })
        ]
      },

      dist: {
        src: ['dist/css/gridle.css']
      }
    },

    cssnext: {
      options: {
        sourcemap: false
      },

      dist: {
        files: {
          'dist/css/gridle.css': 'dist/css/gridle.css'
        }
      }
    },

    // cssbeautifier : {
    //   files : ['dist/css/gridle.css'],
    //   options : {
    //     indent: '  ',
    //     openbrace: 'end-of-line',
    //     autosemicolon: true
    //   }
    // },

    // cssmin: {
    //   options: {
    //     shorthandCompacting: false,
    //     roundingPrecision: -1
    //   },

    //   target: {
    //     files: {
    //       'dist/css/gridle.min.css': ['dist/css/gridle.css']
    //     }
    //   }
    // }

    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

          // includes files within path and its sub-directories
          {expand: true, src: ['path/**'], dest: 'dest/'},

          // makes all src relative to cwd
          {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

          // flattens results to a single level
          {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
        ],
      },
    }
  });

  // Compiles the GridleCSS.css files from source
  //
  grunt.registerTask('compile', [
    'sass',
    'postcss',
    'cssnext'
  ]);

  // Prettifies the css files and creates a minified version
  //
  grunt.registerTask('prettify', [
    'cssbeautifier',
    'cssmin'
  ]);

  grunt.registerTask('default', ['clean', 'compile']);
  grunt.registerTask('ship', ['clean', 'compile', 'prettify']);
}
