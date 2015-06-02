'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('test', ['jshint:dev', 'simplemocha:unit_tests']);
	grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
  grunt.registerTask('build', ['build:dev']);
  grunt.registerTask('default', ['build']);
  grunt.registerTask('karma_test', ['webpack:karma']);

	grunt.initConfig({
		webpack: {
      client: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: 'build/',
          file: 'bundle.js'
        }
      },
      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: 'test_bundle.js'
        }
      },

      karma: {
        entry: __dirname + '/test/karma_tests/test_entry',
        output: {
          path: 'test/karma_tests/',
          file: 'bundle.js'
        }
      }
    },

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    },

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