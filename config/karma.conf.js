module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: [ 'jasmine' ],
    files: [
        'dist/vendor.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'dist/app.js',
        'tests/**/*.js'
    ],
    preprocessors: {
		'app/**/templates/*.html':  ['ngbootstrapfix', 'ng-html2js']
    },
    reporters: [ 'progress' ],
    colors: true,
    autoWatch: false,
    browsers: [ 'PhantomJS' ],
    singleRun: true,
    plugins: [
        'karma-ng-bootstrap-fix-preprocessor',
		'karma-phantomjs-launcher',
		'karma-jasmine',
		'karma-ng-html2js-preprocessor'
    ]
  });
};
