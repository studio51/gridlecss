module.exports = function(grunt) {

  var appConfig = {
    host: "localhost",
    port: 1337,
    appDir: "web"
  };

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
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
        path: "http://<%= appConfig.host %>:<%= appConfig.port %>"
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          "dist/grid.css": "grid/base.scss",
          "web/css/theme.css": "grid/theme.scss"
        }
      }
    },

    cssnext: {
      options: {
        sourcemap: true
      },
      dist: {
        files: {
          "dist/grid.css": "dist/grid.css",
          "web/css/theme.css": "web/css/theme.css"
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require("autoprefixer-core")({
            browsers: ["last 2 versions", "> 5%"]
          }).postcss
        ]
      },
      dist: {
        src: ["dist/grid.css", "web/css/theme.css"]
      }
    },

    clean: {
      options: {
        dot: true
      },
      dist: {
        src: ["dist/"]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      grunt: {
        files: "Gruntfile.js"
      },
      sass: {
        files: "grid/*.scss",
        tasks: ["sass", "postcss", "cssnext"]
      },
      html: {
        files: "web/*.html"
      }
    }
  });

  grunt.registerTask("serve", [
    "clean",
    "sass",
    "connect",
    "open",
    "watch"
  ]);

  grunt.registerTask("default", ["serve"]);
}
