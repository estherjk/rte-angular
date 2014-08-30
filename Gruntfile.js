module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    karma: {
      unit: {
        options: {
          frameworks: ['jasmine'],
          port: 8081,
          browsers: ['Chrome'],
          logLevel: 'INFO',
          preprocessors: {
            'src/**/*.html': ['ng-html2js']
          },
          files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/**/*'
          ],
          ngHtml2JsPreprocessor: {
            prependPrefix: '/',
            moduleName: 'templates'
          }
        }
      }
    }
  });

  grunt.registerTask('default', []);
};