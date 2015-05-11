####Using webPackage/css/sass/**_settings**.scss file:


#####To view default settings, comment out the settings import in webPackage/css/sass/**style.scss**.
```
//@import "settings/_settings";
```


#####To change layout color combination, options:
  1. **Base color**: `$base_color` (Can pick constant color name from _color-constants.scss)
  2. **Background type**: `$lightBackground` (**true**: light version of base_color / **false**: base_color as is)
  3. **Shades** variation degree: `$shadeCoeficient` (default 1. Values between 0.0 and 2.0)
  4. **Adjust color3**: `$color3Hue` and `$color3Saturation`
  

#####Default color settings are:

```
$base_color: $LIGHT_GRAY !default;
$lightBackground: true !default;
$shadeCoeficient: 1 !default;
$color3Hue: -60deg !default;
$color3Saturation: 80% !default;
```


#####To change fonts:
  1. Font family: `$font_1` and `$font_2`
  2. Font sizes: ``$font_ratio` TODO


#####Default font settings are:

```
$font_1: $LATO !default;
$font_2: $DOSIS !default;
$font_size_1: 1.25em !default; 
$font_size_2: 1.15em !default;
$font_size_3: 1em !default;
$font_size_4: 2.5em !default; 
$font_weight_1: $LIGHT !default;
$font_weight_2: $BOLD !default;
$font_weight_3: $BOLDER !default;
```


