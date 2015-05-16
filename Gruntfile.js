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
          'dist/gridle.css': 'grid/gridlecss.scss'
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
        src: ['dist/gridle.css']
      }
    },

    cssnext: {
      options: {
        sourcemap: false
      },

      dist: {
        files: {
          'dist/gridle.css': 'dist/gridle.css'
        }
      }
    },

    cssbeautifier : {
      files : ['dist/gridle.css'],
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
          'dist/gridle.min.css': ['dist/gridle.css']
        }
      }
    }
  });

  // Compiles the GridleCSS.css files from source
  //
  grunt.registerTask('build', [
    'sass',
    'postcss',
    'cssnext'
  ]);

  // Prettifies the css files and creates a minified version
  //
  grunt.registerTask('prettify', [
    'cssbeautifier',
    'cssmin',
  ]);

  grunt.registerTask('default', ['clean', 'build']);
  grunt.registerTask('ship', ['clean', 'build', 'prettify']);
}
