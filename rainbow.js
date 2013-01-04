// rainbow.js 
// A jquery plugin for changing text to rainbow colored
// by thunder9 (https://github.com/thunder9)
// Copyright (c) 2013 thunder9 licensed under the MIT license.

;(function($) {
            
  $.fn.rainbow = function(options) {
    var opts, angle;

    if (!$.isPlainObject(options)) options = { direction: options };
    opts = $.extend({}, $.fn.rainbow.defaults, options);
      
    if ($.isNumeric(opts.direction)) {
      angle = opts.direction;
    } else {
      angle = opts.direction === 'vertical' ? 90 : 0;
    }          
    angle *= Math.PI / 180;
      
    return this.each(function() {

      $(this).contents().filter(function () {
        return this.nodeType === 3;
      }).each(function() {
        var $textnode = $(this),
            $rainbowed,
            text      = this.data,
            html      = '';
        
        for (var i = 0; i < text.length; i++) {
          html += '<span>' + text.charAt(i) + '</span>';
        }
          
        $rainbowed = $(html);
        $textnode.after($rainbowed);
        this.data = '';
        $rainbowed.each(function() {
          var $ch = $(this),
              pos = $ch.position(),
              x   = pos.left + 0.5 * $ch.width(),
              y   = pos.top + 0.5 * $ch.height(),
              u   = (x* Math.cos(angle) + y * Math.sin(angle)) / opts.period,
              hue = u - Math.floor(u);
          $ch.css('color', hsvaToRgba(hue, opts.saturation, opts.value, opts.alpha));
        });

      });
    });
      
  };

  $.fn.rainbow.defaults = {
    direction: 'horizontal',
    period: 300,
    saturation: 1,
    value: 1,
    alpha: 1
  };
  
  var hsvaToRgba = function(h, s, v, a) {
    var f = h * 6,
        i = Math.floor(f),
        m = v - v * s,
        k = v * s * (f - i),
        p = v - k,
        q = k + m,
        rgba = [
          Math.round([v, p, m, m, q, v][i] * 255),
          Math.round([q, v, v, p, m, m][i] * 255),
          Math.round([m, m, q, v, v, p][i] * 255),
          a
        ];
    return 'rgba(' + rgba.join(',') + ')';
  };
    
}(jQuery));
