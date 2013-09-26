module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        jshint: {
            files: [yeomanConfig.app+'/**/*.js', '!'+yeomanConfig.app+'/bower_components/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        requirejs: {
            dist: {
                options: {
                    baseUrl: yeomanConfig.app + '/scripts',
                    dir: yeomanConfig.dist + '/scripts',
                    mainConfigFile: yeomanConfig.app + '/scripts/app.build.js',
                    name: "main",
                    optimize: 'none',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                }
            }
        },
        bower: {
            target: {
                options: {
                    exclude: ['requirejs']
                },
                rjsConfig: yeomanConfig.app + '/scripts/app.build.js'
            }
        },
        clean: ["dist/*"],
        copy: {
            dist: {
                files: [
                { expand: true, dot: true, cwd: yeomanConfig.app, dest: yeomanConfig.dist, src: [
                        'index.html'
                    ]}
                ]
            },
            bower_libs: {
                files: [
                    {expand: true, cwd: yeomanConfig.app+'/bower_components/', src: ['**'], dest: yeomanConfig.dist +'/bower_components/'} 
                ]
            },
            amd_not_compiled: {
                files: [
                    {expand: true, cwd: yeomanConfig.app+'/scripts/', src: ['**'], dest: yeomanConfig.dist +'/scripts/'} 
                ]
            }
        },
        concat: {           
            amd_not_compiled: {
                src: [yeomanConfig.app+'/scripts/app.build.js', yeomanConfig.app+'/scripts/main.js'],
                dest: yeomanConfig.dist +'/scripts/main.js'
            }
        }/*,
        jasmine : {
            src : '<%= pkg.name %>.js',
            options : {
                host: 'http://127.0.0.1:8000/',
                keepRunner:true,*/  
                //specs : 'spec/**/*.js',
                /*helpers: ['src/vendor/sinon-1.7.1.js', 'src/vendor/jquery.js', 'src/vendor/jasmine-jquery.js'],
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: yeomanConfig.app + '/scripts',
                        dir: yeomanConfig.dist+ '/scripts',
                        mainConfigFile: yeomanConfig.app + '/scripts/app.build.js'
                        
                    }
                }
            }
        }*/

    });

    //remember to run 'grunt bower' every time a new packge is installed 
    grunt.registerTask('deploy', [ 'jshint', 'clean', 'copy:dist', /*'copy:bower_libs',*/ 'bower', 'requirejs' ]);
    grunt.registerTask('build', [ 'jshint', 'clean', 'copy:dist', /*'copy:bower_libs',*/ 'copy:amd_not_compiled', 'bower', 'concat:amd_not_compiled']);

};

