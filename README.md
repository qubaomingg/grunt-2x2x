# grunt-2x2x

> a grunt plugin to resize and rename **@2x.png(jpg,gif,) image to **.png(jpg,gif)

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```
npm install grunt-2x2x --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```
grunt.loadNpmTasks('grunt-2x2x');
```

## The "_2x2x" task

### Overview
In your project's Gruntfile, add a section named `_2x2x` to the data object passed into `grunt.initConfig()`.


    grunt.initConfig({
        _2x2x: {
            scale: {
                imgsrcdir: "src",
                imgdesdir: "dest",
                option: {
                  'quality': 50,  
                  'overwrite' : true 
                }
            }
        }
    });


### Arguments

#### imgsrcdir
Type: `String`

A string value that means image source directory.

#### imgdesdir
Type: `String`

A string value that represent image destination directory.

#### quality
Type: `Int`

Defalut Value: `50`

A number that set our scale quality. range from 0 to 100.
#### overwrite
Type: `Boolean`

Defalut Value: `false`

a boolean that used to decide if 2x2x will overwrite the existed @x image.


<br>

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

    grunt.initConfig({
      _2x2x: {
        scale: {
          imgsrcdir: "img",
          imgdesdir: "img/slice",
          option: {
             'quality': 30,  
             'overwrite' : false
          }
        }
     }
    });

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
