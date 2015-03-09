module.exports = function (grunt) {

// Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {expand: true, cwd: "../DragonFractal/", src: ["*.html", "*.js"], dest: 'deploy/pages/'},
          {expand: true, cwd: "../Lind/deploy", src: "Lind.jar", dest: 'deploy/pages/'},
          {expand: true, cwd: "source/", src: "**", dest: 'deploy/'},
          {expand: true, cwd: "source/", src: "*.css", dest: 'deploy/pages'},
        ],
      },
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'counterbeing.com',
          port: 21,
          authKey: 'caius.co'
        },
        src: 'deploy',
        dest: 'html',
        forceVerbose: true,
        exclusions: ['**/.DS_Store']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('deploy', ['copy', 'ftp-deploy']);
};
