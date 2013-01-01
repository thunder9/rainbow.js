// rainbow.js 
// A jquery plugin for changing text to rainbow colors
// Copyright (c) 2013 thunder9 licensed under the MIT license.

;(function($) {
            
  $.fn.rainbow = function(options) {
    var $containers = this,
        direction   = 'h',
        period      = 300,
        saturation  = 1,
        value       = 1,
        alpha       = 1;

    if ($.isPlainObject(options)) {
      direction = options.dirction || 'h';
      period = options.period || 300;
      saturation = options.saturation || 1;
      value = options.value || 1;
      alpha = options.alpha || 1;
    } else {
      direction = options || 'h';
    }
     
    direction = direction.indexOf('v') >= 0 ? 'v' : 'h';
      
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
              x;
          if (direction === 'h') {
            x = (pos.left + 0.5 * $ch.width()) / period;            
          } else {
            x = (pos.top + 0.5 * $ch.height()) / period;
          }
          hue = x - Math.floor(x);
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
          Math.floor([v, p, m, m, q, v][i] * 255),
          Math.floor([q, v, v, p, m, m][i] * 255),
          Math.floor([m, m, q, v, v, p][i] * 255),
          a
        ];
    return 'rgba(' + rgba.join(',') + ')';
  };
    
}(jQuery));
