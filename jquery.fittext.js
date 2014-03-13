/*global jQuery */
/*!
* FitText.js 1.0
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  var isStyleAdded;

  $.fn.fitText = function( kompressor, options ) {

    // add .fit-text <style> to <head>
    if ( !isStyleAdded ) {
      $('head').append('<style>.fit-text{ display: inline-block; clear: both; white-space: pre; }</style>');
      isStyleAdded = true;
    }

    $(this).addClass('fit-text');

    var settings = $.extend({
      'minFontSize' : 1,
      'maxFontSize' : Number.POSITIVE_INFINITY
    }, options || {} );

    return this.each(function(){
      var $this = $(this);              // store the object
      var compressor = kompressor || 1; // set the compressor
      var sized = false;

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        // get proportional size of text to fit in its parent
        var size = ( parseInt( $this.css('font-size'), 10 ) / $this.width() ) * $this.parent().innerWidth();
        size = Math.max( parseFloat( settings.minFontSize ), size );
        size = Math.min( parseFloat( settings.maxFontSize ), size );
        size *= compressor;
        $this.css( 'font-size', size );

        if (!sized) {
          // Call for first size
          if (typeof settings.sized == "function") {
            settings.sized.call($this)
          }
          sized = true
        } else {
          // Call for each resize
          if (typeof settings.resized == "function") {
            settings.resized.call($this)
          }
        }
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).resize(resizer);

    });

  };

})( jQuery );