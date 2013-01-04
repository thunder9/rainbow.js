rainbow.js
==========

A jquery plugin for changing text to rainbow colored.

Try [previewer](http://rainbowjs.herokuapp.com/).

# Usage

Call the plugin on the selected elements containing the target text.

```js
$('#target').rainbow(); // horizontal rainbow by default

$('#target').rainbow('vertical'); // specify vertical rainbow

$('#target').rainbow(45); // specify rainbow direction by angle in degrees

// multiple options are also allowed
$('#target').rainbow({
  direction: 'vertical', // 'horizontal', 'vertical' or angle in degrees
  period: 500, // period of hue in pixels
  staturation: 0.5, // from 0 to 1
  value: 0.8, // from 0 to 1
  alpha: 0.7 // from 0 to 1
});
```
# License
Copyright (c) 2013 thunder9 licensed under the MIT license.
