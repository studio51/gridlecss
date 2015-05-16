$(document).ready(function() {

  $('.nav-menu .btn').on('click', function(e) {
    e.preventDefault();

    var target = $(this).data('target');

    $('html, body').stop().animate({
       scrollTop: $(target).offset().top
    }, 1000);
  });

  // var stickyNavTop = $('.main').offset().top;

  // var stickyNav = function(){
  //   var scrollTop = $(window).scrollTop();

  //   if (scrollTop > stickyNavTop) {
  //     $('.nav-menu').addClass('sticky');
  //   } else {
  //     $('.nav-menu').removeClass('sticky');
  //   }
  // };

  // stickyNav();

  // $(window).scroll(function() {
  //     stickyNav();
  // });

  $('.social-buttons--container ul').sharegg({
    data: {
      url: 'https://studio51.github.io/gridlecss',
      title: 'GridleCSS, yet another flexbox grid!'
    },
    buttons: {
      facebook: {
        show: true,
        count: true
      },
      googleplus: {
        show: true,
        count: true
      },
      twitter: {
        show: true,
        count: true
      },
      pinterest: {
        show: true,
        count: true
      },
      digg: {
        show: true,
        count: true
      },
      reddit: {
        show: true,
        count: true
      },
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
    if($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0 ) toggleContent('', false);
  })

  function openItemInfo(url) {
      toggleContent(url, true);
  }

  function toggleContent(url, bool) {
    if( bool ) {
      /* load and show new content */
      var foldingContent = $('.cd-fold-content');
      foldingContent.load(url+' .cd-fold-content > *', function(event){
        setTimeout(function(){
          $('body').addClass('overflow-hidden');
          $('.cd-folding-panel').addClass('is-open');
          $('.cd-main').addClass('fold-is-open');
        }, 100);

      });
    } else {
      /* close the folding panel */
      var mq = viewportSize();
      $('.cd-folding-panel').removeClass('is-open');
      $('.cd-main').removeClass('fold-is-open');

      (mq == 'mobile' || $('.no-csstransitions').length > 0 )
        /* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
        ? $('body').removeClass('overflow-hidden')

        : $('.cd-main').find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          $('body').removeClass('overflow-hidden');
          $('.cd-main').find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });
    }

  }
});
