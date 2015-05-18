'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.registerTask('test', ['jshint:dev', 'simplemocha:unit_tests']);
	grunt.registerTask('default', ['test']);
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.initConfig({
		jshint: {
			dev: {
				src: ['Gruntfile.js', '*.js', 'test/*.js', 'models/*.js', 'routes/*.js']
			},
			options: {
				jshintrc: '.jshintrc'
			}
		},
		simplemocha: {
			unit_tests: {
				src: ['test/*.js']
			}
		},
		watch: {
			scripts: {
				files: ['Gruntfile.js', '*.js', 'test/*.js'],
				tasks: ['test'],
			}
		}
	});

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
};