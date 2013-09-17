/*
 * grunt-2x2x
 * https://github.com/freestyle21/2x2x
 *
 * Copyright (c) 2013 675861708@qq.com
 * Licensed under the MIT license.
 */
(function() {
    'use strict';
    var gm = require('gm');
    var async = require('async');
    var path = require('path');
    module.exports = function(grunt) {
        var that;
        
        function new2x () {
            that = this;
           
            var instance2x = new _2x2x();

            instance2x.init();    
            
        }
        function _2x2x() {
           // this.done = this.async();
            this.series = [];
            this.quality = 50;
            this.overwrite = false;
        }
        
        _2x2x.prototype = {
            init: function() {
                this.quality = !that.data.option ? this.quality : that.data.option.quality ?  that.data.option.quality : this.quality;

                this.overwrite = !that.data.option ? false : that.data.option.overwrite ? that.data.option.overwrite : this.overwrite;

                this.imgsrcdir = that.data.imgsrcdir;
                this.imgdesdir = that.data.imgdesdir;
                this.recurse();
            },
            // ergodic the img in imgsrcdir
            recurse: function() {
                var _2x2x = this;

                var guard_file = 0;
                var guard_2x = 0;
                grunt.file.recurse(this.imgsrcdir, function(file) {
                    guard_file += 1;

                   

                    var srcextname = path.extname(file), 
                        srcdirname = path.dirname(file);
                    if (!grunt.file.isDir(_2x2x.imgdesdir)) {
                        grunt.file.mkdir(_2x2x.imgdesdir);
                    }
                    var has2x = (function() {
                        return file.indexOf('@2x') > -1;
                    })();

                    if(!has2x) {

                      return false;  
                    } 
                    guard_2x += 1;
                    _2x2x.series.push(function(callback) {
                        gm(file).size(function(err, features) {
                          
                            // find the @2x image and get it's normal name
                            var outfile = replace2x(file);
                            
                            var dstPath = _2x2x.imgdesdir + "/" +  outfile;
                            var final_width = features.width;
                            var final_height = features.height;
                            // fix the decimals width & height
                            if((features.height % 2)) {
                                final_height += 1;
                            }
                            if((features.width % 2)) {
                                final_width += 1;
                            }
                            if(!_2x2x.overwrite) {
                                // not overwrite
                                if(grunt.file.exists(dstPath)) {
                                    grunt.log.error((dstPath + "is existed already!"));
                                    return false;    

                                }
                                
                            }
                             gm(file).autoOrient().
                                resize(final_width / 2, final_height / 2, "!").
                                write(dstPath, function(err) {
                                  grunt.log.writelns((dstPath + " has been created !").green);
                                });
                            // gm(file).thumb(final_width / 2, final_height / 2, dstPath, _2x2x.quality, function() {
                            //    grunt.log.writelns((dstPath + " has been created !").green);
                            // });
                        });
                    }(file));    
                });
                if((guard_file != 0) && (guard_2x == 0)) {
                    grunt.log.error('no @2x image in the srcdir! ').red;
                }
                if(guard_file == 0) {
                    grunt.log.error('no image in the srcdir! ');
                }

                async.series(_2x2x.series, that.async());          
            }
        };
        // helpers 
        function replace2x(path) {
            // src/a@2x.jpg => a.png
            var reg_replace2x = /@2x/ig;
            var sigle_x_path = path.replace(reg_replace2x, '');
            return sigle_x_path.substring(sigle_x_path.lastIndexOf('/') + 1,sigle_x_path.length);
        };

        grunt.registerMultiTask('_2x2x', 'a grunt plugin to resize and rename **@2x.{png,jpg...} image to **.{png,jpg...}',new2x);  
    };
    
})();
