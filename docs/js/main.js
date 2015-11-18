$(document).ready(function() {


  // var responsiveAnimationTransform = function() {
    var macbook, ipad, iphone, imac;
    var animTime = 1000;

    macbook = setTimeout(function() {
      $('#animated .pca-anim-wrap').addClass('macbook');
    }, animTime * 1);
    ipad = setTimeout(function() {
      $('#animated .pca-anim-wrap').addClass('ipad');
    }, animTime * 2);
    iphone = setTimeout(function() {
      $('#animated .pca-anim-wrap').addClass('iphone');
    }, animTime * 3);
    imac = setTimeout(function() {
      $('#animated .pca-anim-wrap').removeClass('macbook ipad iphone');
      responsiveAnimationTransform();
    }, animTime * 4);
  // };
  // responsiveAnimationTransform();

  $('.nav-menu a.btn').on('click', function(e) {
    e.preventDefault();
    var target = $(this).data('target');
    $('html, body').stop().animate({
       scrollTop: $(target).offset().top
    }, 1000);
  });

  $('.show-css').on('click', function(e) {
    e.preventDefault();

    var target = $(this).attr('href'),
        parent = $('section' + target);

    parent.toggleClass('css');
  });

  $('.social-buttons--container ul').sharegg({
    data: {
      url: 'http://studio51.github.io/gridlecss',
      title: 'GridleCSS, yet another flexbox grid!'
    },
    buttons: {
      googleplus: {
        show: true,
        count: true
      },
      twitter: {
        show: true,
        count: true
      },
      digg: {
        show: true,
        count: true
      }
    }
  });

  /* open folding content */
  $('#toggle-menu').on('click', function(event){
    event.preventDefault();
    openItemInfo($(this).attr('href'));
    var menu = $('.nav-menu');

    $(menu).toggleClass('open');
    $(this).toggleClass('close');

  });
});
