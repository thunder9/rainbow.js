// rainbow.js 
// A jquery plugin for changing text to rainbow colored
// by thunder9 (https://github.com/thunder9)
// Copyright (c) 2013 thunder9 licensed under the MIT license.

;(function($) {
            
  $.fn.rainbow = function(options) {
    var $containers = this,
        angle       = 0,
        period      = 300,
        saturation  = 1,
        value       = 1,
        alpha       = 1;

    if ($.isPlainObject(options)) {
      angle = options.direction || 0
      period = options.period || 300;
      saturation = options.saturation || 1;
      value = options.value || 1;
      alpha = options.alpha || 1;
    } else {
      angle = options;
    }
    
    if (!$.isNumeric(angle))
        angle = angle === 'vertical' ? 90 : 0;      
    angle *= Math.PI / 180;
      
    return $containers.each(function() {

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
              hue   = 0,
              x   = pos.left + 0.5 * $ch.width(),
              y   = pos.top + 0.5 * $ch.height(),
              u   = (x* Math.cos(angle) + y * Math.sin(angle)) / period;
          hue = u - Math.floor(u);
          $ch.css('color', hsvaToRgba(hue, saturation, value, alpha));
        });

      });
    });
      
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
