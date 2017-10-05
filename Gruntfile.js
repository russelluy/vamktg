'use strict';

var isMac = function() {
  var platform = process.platform;

  var isMac = (/darwin/.test(platform)) ? true : false;

  return isMac;
};

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var cmsConfig = {
    target: 'target',
    catalinaPath: process.env.CATALINA_HOME,
    authorInstance: '/webapps/author/WEB-INF/lib',
    cmsInstance: '/webapps/cms/WEB-INF/lib',
    temp: '.tmp',
    src: 'src',
    dist: 'dist',
    isMac: isMac()
  };

  // Project configuration.
  grunt.initConfig({
    bower: {
      install: {
        options: {
          cleanup: true,
          copy: true,
          install: true,
          targetDir: 'src/bower_components'
        }
      }
    },

    cms: cmsConfig,

    exec: {
      'assemble': {
        command: 'grunt build',
        cwd: 'assemble',
        stdout: true
      },
      'carpel': {
        command: cmsConfig.isMac ? 'ruby bin/carpel' : 'ruby bin\\carpel',
        cwd: 'carpel',
        stdout: true
      },
      'maven': {
        command: 'mvn clean install',
        stdout: true
      },
      'start': {
        command: cmsConfig.isMac ? '<%= cms.catalinaPath %>/bin/startup.sh' :
          '<%= cms.catalinaPath %>\\bin\\startup',
        cwd: '<%= cms.catalinaPath %>',
        stdout: false
      },
      'stop': {
        command: cmsConfig.isMac ? '<%= cms.catalinaPath %>/bin/shutdown.sh' :
          '<%= cms.catalinaPath %>\\bin\\shutdown',
        cwd: '<%= cms.catalinaPath %>',
        options: { force: true },
        stdout: false
      }
    },

    clean: {
      assembleTemp: {
        options: { force: true },
        files: [{
          dot: true,
          src: [
            'assemble/.tmp'
          ]
        }]
      },
      assembleDist: {
        options: { force: true },
        files: [{
          dot: true,
          src: [
            'assemble/dist'
          ]
        }]
      },
      cmsTarget: {
        options: { force: true },
        files: [{
          dot: true,
          src: [
            'target'
          ]
        }]
      },
      carpelResources: {
        options: { force: true },
        files: [{
          dot: true,
          src: [
            'carpel/vx-template/resources'
          ]
        }]
      },
      cmsResources: {
        options: { force: true },
        files: [{
          dot: true,
          src: [
            'src/main/resources/mgnl-bootstrap',
            'src/main/resources/mgnl-resources',
            'src/main/resources/vx-template'
          ]
        }]
      },
      authorInstance: {
        options: { force: true },
        files: [{
          dot: true,
          src: [
            '<%= cms.catalinaPath %><%= cms.authorInstance %>/vx-template*.jar'
          ]
        }]
      },
      cmsInstance: {
        options: { force: true },
        files: [{
          dot: true,
          src: [
            '<%= cms.catalinaPath %><%= cms.cmsInstance %>/vx-template*.jar'
          ]
        }]
      },
      logs: {
        files: [{
          dot: true,
          src: [
            '**/*.log'
          ]
        }]
      }
    },

    copy: {
      'assemble-images': {
        files: [
           {
            cwd: 'assemble/src/images',
            expand: true,
            src: [
              '**/*.*'
            ],
            dest: 'assemble/dist/images/'
          }
        ]
      },
      'deploy-author': {
        files: [
           {
            expand: true,
            flatten: true,
            src: [
              'target/*.jar'
            ],
            dest: '<%= cms.catalinaPath %><%= cms.authorInstance %>'
          }
        ]
      },
      'deploy-cms': {
        files: [
           {
            expand: true,
            flatten: true,
            src: [
              'target/*.jar'
            ],
            dest: '<%= cms.catalinaPath %><%= cms.cmsInstance %>'
          }
        ]
      }
    }

  });
  grunt.registerTask('deploy',[
    //'exec:stop',
    'clean',
    'exec:assemble',
    'copy:assemble-images',
    'exec:carpel',
    'exec:maven',
    'copy:deploy-author',
    'copy:deploy-cms',
    'exec:start'
  ]);
  grunt.registerTask('build',[
    'clean',
    'exec:assemble',
    'copy:assemble-images',
    'exec:carpel',
    'exec:maven'
  ]);
  grunt.registerTask('stop',[
    'exec:stop'
  ]);
  grunt.registerTask('start',[
    'exec:start'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

  // Install
  grunt.registerTask('install', [
    'bower:install'
  ]);

};
