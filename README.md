# Gridlex, 12 column flex-box grid

Feature list:

 * 1 file, 12 columns
 * no padding, margins etc..
 * 36 lines of sass :)

In your main .scss file add the following
```scss
@import "gridlex";

```

Gridlex comes with 4 default breakpoints, ```xs, sm, md, lg``` . 
In order to add more, you'll have to write your own class before you import gridlex.scss

```
$breakpoints (
	"(min-width: new_breakpoint_value)" "new_breakpoint_name"
)
```
