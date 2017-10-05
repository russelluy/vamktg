'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('assemble');

  var vxCmsConfig = {
    temp: '.tmp',
    src: 'src',
    dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({

    vxCms: vxCmsConfig,

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= vxCms.temp %>/assets',
          layout: '<%= vxCms.src %>/templates/layouts/default.hbs',
          data: '<%= vxCms.src %>/data/*.{json,yml}',
          partials: [
            '<%= vxCms.src %>/templates/includes/*.hbs',
            '<%= vxCms.src %>/templates/components/*.hbs'
          ],
          //plugins: ['assemble-contrib-toc'],
          helpers: ['handlebars-helper-partial']
        },
        files: {
          '<%= vxCms.temp %>/': ['<%= vxCms.src %>/templates/pages/*.hbs']
        }
      },
      components: {
        options: {
          flatten: true,
          data: '<%= vxCms.src %>/data/*.{json,yml}',
          helpers: ['handlebars-helper-partial'],
          partials: [
            '<%= vxCms.src %>/templates/includes/*.hbs',
            '<%= vxCms.src %>/templates/components/*.hbs',
          ]
        },
        files: {
          '<%= vxCms.dist %>/components/': [
            '<%= vxCms.src %>/templates/components/*.hbs'
          ]
        }
      }
    },

    bower: {
      install: {
        options: {
          //cleanup: true,
          copy: true,
          install: true,
          targetDir: 'src/bower_components'
        }
      }
    },

    clean: {
      grunticon: '<%= vxCms.temp %>/images/icons/',
      server: '<%= vxCms.temp %>/',
      dist: '<%= vxCms.dist %>'
    },

    compass: {
      options: {
        require: [
          'susy',
          'sassy-math'
        ],
        sassDir: '<%= vxCms.src %>/styles',
        cssDir: '<%= vxCms.temp %>/styles',
        imagesDir: '<%= vxCms.src %>/images',
        javascriptsDir: '<%= vxCms.src %>/scripts',
        importPath: '<%= vxCms.src %>/bower_components',
        httpImagesPath: '/images'
      },
      dist: {
        options: {
          noLineComments: true,
          outputStyle: 'compressed'
        }
      },
      server: {
        options: {
          debugInfo: false,
          noLineComments: true,
          outputStyle: 'compact'
        }
      }
    },

    concat: {
      styles: {
        src: ['<%= vxCms.temp %>/styles/main.css'],
        dest: '<%= vxCms.dist %>/styles/vx-cms.min.css'
      },
      stylesIE: {
        src: ['<%= vxCms.temp %>/styles/main-ie8.css'],
        dest: '<%= vxCms.dist %>/styles/vx-cms-ie8.min.css'
      },
      headScripts: {
        src: [
          '<%= vxCms.src %>/bower_components/modernizr/modernizr.js',
          '<%= vxCms.src %>/scripts/grunticon.js'
        ],
        dest: '<%= vxCms.dist %>/scripts/vx-cms-head.min.js'
      }
    },

    concurrent: {
      server: [
        'grunticon:server'
        //'copy:server',
      ]
    },

    connect: {
      options: {
        livereload: 35729,
        port: 9000,
        hostname: '0.0.0.0'
      },

      server: {
        options: {
          open: 'http://localhost:<%= connect.options.port%>',
          base: [
            vxCmsConfig.src,
            vxCmsConfig.temp
          ]
        }
      }
    },

    copy: {
      'cms-temp': {
        files: [
           {
            expand: true,
            flatten: false,
            src: [
              '{,**/}*.json'
            ],
            cwd: 'src/cms/',
            dest: '<%= vxCms.temp %>/cms/'
          }
        ]
      },
      'api-temp': {
        files: [
           {
            expand: true,
            flatten: false,
            src: [
              '{,**/}*.json'
            ],
            cwd: 'src/api/',
            dest: '<%= vxCms.temp %>/api/'
          }
        ]
      },
      'shims-temp': {
        files: [
           {
            expand: true,
            flatten: true,
            src: [
              'src/bower_components/css3-multi-column/*.js'
            ],
            dest: '<%= vxCms.temp %>/scripts/shims/'
          }
        ]
      },
      'css-dist': {
        files: [
           {
            expand: true,
            flatten: false,
            src: [
              '{,**/}*.css'
            ],
            cwd: '.tmp/styles/',
            dest: 'dist/styles/'
          }
        ]
      },
      'shims-dist': {
        files: [
           {
            expand: true,
            flatten: true,
            src: [
              'src/bower_components/css3-multi-column/*.js'
            ],
            dest: 'dist/scripts/shims/'
          }
        ]
      }
    },

    grunticon: {
      options: {
        customselectors:
          grunt.file.readJSON('src/styles/grunticon/custom-selectors.json'),
        src: 'src/images/icons-source/'
      },
      dist: {
        options: {
          dest: 'dist/images/icons/'
        }
      },
      server: {
        options: {
          dest: '.tmp/images/icons/'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= vxCms.temp %>',
          src: '*.html',
          dest: '<%= vxCms.dist %>'
        }]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= vxCms.src %>/images',
          src: '{,**/}*.{png,jpg,jpeg}',
          dest: '<%= vxCms.dist %>/images'
        }]
      }
    },

    requirejs: {
      dist: {
        options: {
          baseUrl: '<%= vxCms.src %>/app',
          mainConfigFile: '<%= vxCms.src %>/scripts/config.js',
          normalizeDirDefines: 'all',
          out: '<%= vxCms.temp %>/scripts/vx-cms.js',
          preserveLicenseComments: false
        }
      }
    },

    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      dist: {
        files: {
          '<%= vxCms.dist %>/scripts/vx-cms.min.js': [
            '<%= vxCms.temp %>/scripts/vx-cms.js'
          ]
        }
      }
    },

    useminPrepare: {
      html: '<%= vxCms.temp %>/index.html',
      options: {
        dest: '<%= vxCms.dist %>'
      }
    },

    usemin: {
      html: ['<%= vxCms.dist %>/{,*/}*.html'],
      css: ['<%= vxCms.temp %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= vxCms.dist %>']
      }
    },

    watch: {
      assemble: {
        files: ['<%= vxCms.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      compass: {
        files: ['<%= vxCms.src %>/styles/{,*/}*.scss'],
        tasks: ['compass:server']
      },
      grunticon: {
        files: [
          '<%= vxCms.src %>/images/{,*/}*.svg',
          '<%= vxCms.src %>/styles/grunticon/custom-selectors.json'
        ],
        tasks: ['clean:grunticon', 'grunticon:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= vxCms.temp %>/{,*/}*.html',
          '<%= vxCms.temp %>/styles/{,*/}*.css',
          '<%= vxCms.src %>/{,*/}*.js',
          '<%= vxCms.src %>/images/{,*/}*.{png,jpg,jpeg,gif,svg}'
        ]
      }
    }

  });

  grunt.registerTask('server', [
    'clean:server',
    'assemble:pages',
    'bower:install',
    'copy:shims-temp',
    'copy:cms-temp',
    'copy:api-temp',
    'compass:server',
    'concurrent:server',
    'connect:server',
    'watch'
  ]);

  // Install
  grunt.registerTask('install', [
    'bower:install'
  ]);

  grunt.registerTask('build', [
    'clean',
    'bower:install',
    'assemble:pages',
    'useminPrepare',
    'compass:dist',
    'requirejs:dist',
    'uglify:dist',
    'copy:shims-dist',
    'copy:css-dist',
    'grunticon:dist',
    'htmlmin',
    'concat',
    'usemin'
//  taking too much time to process all the images
//  ,'imagemin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
