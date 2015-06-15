(function(){

  'use strict';

  var win = $(window),
      targets = $('.frame > div'),
      threshold = (win.height() / 2 + win.height() / 8) >> 0,
      animating = false;

  function setScrollAnimation() {
    // please use throttle()
    win.on('scroll', function(event) {
      var scrollTop = win.scrollTop(),
          bottom = scrollTop + threshold;

      targets.each(function() {
        var that = $(this),
            offset, offsetTop;

        if (that.hasClass('js-animated') ||
            that.hasClass('velocity-animating')) {
          return;
        }

        offset = that.offset();
        offsetTop = offset.top;

        if (offsetTop < bottom) {
          that.velocity({
            opacity: 1,
            translateY: [0, 100]
          }, {
            duration: 'normal',
            complete: function() {
              that.addClass('js-animated');
            }
          });
        }
      });
    });
  }

  win.on('load', function(event) {
    // scroll to top
    $('body').velocity('scroll', {
      duration: 0,
      complete: setScrollAnimation
    });
  });

  $(function(){
    // set threshold border position
    $('.threshold').css({
      height: threshold,
      top: 0
    });
  });

}());
