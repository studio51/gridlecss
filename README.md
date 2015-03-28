# GridleCSS

We created GridleCSS for another side project we're currently working on, which
you should totally check! :D

[Booqmark.it]

With booqmark.it we've used Bootstrap and it did a great job, until we started
creating the UI, like most websites this day, we've approached a flat style.
We found Bootstrap inadequate for creating the UI we wanted.. so we've created
our own.

## Features

| Responsive  | Fluid | Offsets | Nested | Auto Width | Alignments | Distributed | Reversed | Reordering | Masonry |
| ----------- | ----- | ------- | ---- | ------ | --------- | ------------ | -------- | ---------- | ----- | ----- |

## Components

At the moment we don't have any components nor do we think we'll ever add any in
this repository. GridleCSS was only created as a grid.

If you do whish to create components, do a pull request and we'll keep them in
separate branches until we decide what's the best way to showcase them as a
whole.

## Installation

``` bash
git clone git@github.com:studio51/framework-gridlecss.git
npm install
```

GridleCSS uses [Grunt.JS] as our Task Runner. If you're not familiar with grunt,
you should check it out.

There are 3 tasks that matter if you want to develop on GridleCSS:

`grunt`
Will compile everything (SASS, JADE and JS) for you and launch a server for
previewing the Grid.
Any changes you make to the SASS files will show on the website as we use Watch
and LiveReload.

`grunt build`
This just build the `web/dist` folder for the gh-pages, that means everything
compiled is also minified, whereas `grunt` gives you unminifed assets.

`grunt clean`
Removes the `web/dist` folder.

## Pull Requests are welcome!

`#wip`

# License

The MIT License (MIT)

Copyright (c) 2014 Studio51

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Booqmark.it]:https://github.com/studio51/web-booqmark.it
[Grunt.JS]:http://gruntjs.com/
