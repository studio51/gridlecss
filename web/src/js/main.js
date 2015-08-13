$(document).ready(function() {


  var responsiveAnimationTransform = function() {
    var macbook, ipad, iphone, imac;
    var animTime = 1000;

    macbook = setTimeout(function() {
      $('#animation .pca-anim-wrap').addClass('macbook');
    }, animTime * 1);
    ipad = setTimeout(function() {
      $('#animation .pca-anim-wrap').addClass('ipad');
    }, animTime * 2);
    iphone = setTimeout(function() {
      $('#animation .pca-anim-wrap').addClass('iphone');
    }, animTime * 3);
    imac = setTimeout(function() {
      $('#animation .pca-anim-wrap').removeClass('macbook ipad iphone');
      responsiveAnimationTransform();
    }, animTime * 4);
  };
  responsiveAnimationTransform();

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

  /* close folding content */
  $('.cd-folding-panel .cd-close').on('click', function(event){
    event.preventDefault();
    toggleContent('', false);
  });
  $('.cd-gallery').on('click', function(event){
    /* detect click on .cd-gallery::before when the .cd-folding-panel is open */
    // if($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0 ) toggleContent('', false);
  })

  function openItemInfo(url) {
      toggleContent(url, true);
  }

  function toggleContent(url, bool) {
    if( bool ) {
      var foldingContent = $('.cd-fold-content');
      foldingContent.load(url+' .cd-fold-content > *', function(event){
        setTimeout(function(){
          $('body').addClass('overflow-hidden');
          $('.cd-folding-panel').addClass('is-open');
          $('.cd-main').addClass('fold-is-open');
        }, 100);

      });
    } else {
      $('.cd-folding-panel').removeClass('is-open');
      $('.cd-main').removeClass('fold-is-open');
    }

  }
});
