## GridleCSS

http://studio51.github.io/gridlecss/

A flexible, responive CSS framework powered by the Flexbox Layout module and
SASS.

### Features

* 12 columns flex grid
* Responsive Grid
* Fluid Layout
* Layout Offsets
* Alignments
* Layout Distribution
* Flex Reverse
* Flex Reorder
* **Viewport specific rules**

### Customization

GridleCSS comes with a ocuple of customizable variables which will affect the
way your grid is compiled.

Increasing the number of columns: `$grid-columns: n !default;` <br />
Adding more breakpoints: `$grid-breakpoints: "xs" "sm" "md" "lg";` <br />
Adjusting the responsive breakpoints of the grid: `$grid-*-min: x;` <br />

Read `grid/config.scss` for more informations.

### Components

We're not sure ether or not it's worth spending time creating components when
there's so much out there.
Watch this space, we might change our mind.

### Installation

``` bash
git clone git@github.com:studio51/framework-gridlecss.git
npm install
```

We use [Grunt.JS] as our Task Runner in order to compile the SASS files.
If you haven't used Grunt before, be sure to check out the Getting Started
guide, as it explains how to create a Gruntfile as well as install and use Grunt
plugins.

`$ grunt`

This is the default task which will `clean` the `dist` folder and `compile` the
SASS files.

`$ grunt ship`

If you make any changes to GridleCSS and whish to make a pull request or use it,
use this task which will `clean`, `compile`, and `prettify` the SASS files which
will give you `gridle.css`, `gridle.css.map` and `gridle.min.css`


### Pull Requests are welcome!

### License

MIT &copy; Studio51

[Studio51]:http://creative-studio51.co.uk
[Grunt.JS]:http://gruntjs.com
