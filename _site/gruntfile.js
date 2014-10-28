module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        // Define locations of files
        dirs: {
            build: {
                css: "src/_resources/build/css",
                js: "src/_resources/build/js"
            },
            src: {
                scss: "src/_resources/src/scss",
                js: "src/_resources/src/js",
                vendor: "src/_resources/src/vendor"
            },
            css: "src/_site/css",
            js: "src/_site/js"
        },

        // Minify CSS resources
        cssmin: {
            vendor: {
                files: {
                    "<%= dirs.build.css %>/vendor.min.css": [
                        "<%= dirs.src.vendor %>/normalize.css/normalize.css",
                    ]
                }
            }
        },

        // Concatenate third-party resources with compiled resources
        concat: {
            options: {
                seperator: ";"
            },
            css: {
                files: {
                    "<%= dirs.css %>/style.css": [
                        "<%= dirs.build.css %>/vendor.min.css",
                        "<%= dirs.build.css %>/style.min.css"
                    ]
                }
            },
            js: {
                files: {
                    "<%= dirs.js %>/scripts.js": [
                        "<%= dirs.src.vendor %>/jquery/dist/jquery.min.js",
                        "<%= dirs.src.vendor %>/SelectOrDie/_src/selectordie.min.js",
                        "<%= dirs.build.js %>/scripts.min.js"
                    ]
                }
            }
        },

        // Compile SCSS into compressed CSS
        sass: {
            options: {
                style: "compressed"
            },
            dist: {
                files: {
                    "<%= dirs.build.css %>/style.min.css": [
                        "<%= dirs.src.scss %>/style.scss"
                    ]
                }
            }
        },

        // Minify JS Source
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    "<%= dirs.build.js %>/scripts.min.js": [
                        "<%= dirs.src.js %>/**/*.js"
                    ]
                }
            }
        },

        // Watch files, run appropriate tasks at appropriate times
        watch: {
            css: {
                options: {
                    spawn: false
                },
                files: [
                    "<%= dirs.src.scss %>/**/*.scss"
                ],
                tasks: ["css"]
            },
            js: {
                options: {
                    spawn: false
                },
                files: [
                    "<%= dirs.src.js %>/**/*.js"
                ],
                tasks: ["js"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["css", "js"]);
    grunt.registerTask("css", ["cssmin:vendor", "sass", "concat:css"]);
    grunt.registerTask("js", ["uglify", "concat:js"]);
};