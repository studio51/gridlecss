## GridleCSS Theme

http://studio51.github.io/gridlecss/

A `test` theme for GridleCSS in order to test all the frameworks components.
This theme relies, heavily, on GridleCSS. Any changes, if any, made on the
framework will affect this theme.

### Installation

``` bash
$ git clone git@github.com:studio51/gridlecss.git
$ cd web
$ npm install
```

We use [Grunt.JS] as our Task Runner in order to compile the SASS files.
If you haven't used Grunt before, be sure to check out the Getting Started
guide, as it explains how to create a Gruntfile as well as install and use Grunt
plugins.

`$ grunt`

This is the default task which will `clean` the `dist` folder and `compile` the
all the theme files, such SASS, JS and JADE.

It will also launch a server on `localhost:1337` so make sure the port is not in
use by any other service. The server comes with livereload in order to see
updates as they happen in your browser.

`$ grunt compile`

This will `clean` the `dist` folder and `compile` the all the theme files, such
SASS, JS and JADE.

`$ grunt ship`

If you make any changes to GridleCSS Theme and whish to make a pull request or
use it, use this task which will `clean`, `compile`, and `prettify` all the
resources used by the theme.

### Open for pull requests

Before making any pull requests, make sure the Theme looks as it should by using
the `$ grunt` task.

### License

MIT &copy; [Studio51]

[Studio51]:http://creative-studio51.co.uk
[Grunt.JS]:http://gruntjs.com
