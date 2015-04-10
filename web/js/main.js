$(document).ready(function() {

  $('.nav-menu .btn').on('click', function(e) {
      e.preventDefault();

      var target = $(this).data('target');

      $('html, body').stop().animate({
         scrollTop: $(target).offset().top
      }, 1000);
  });

  $('#toggle-menu').on('click', function(e) {
    e.preventDefault();

    var menu = $('.nav-menu');

    $(menu).toggleClass('open');
  });

  $('.source').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  $('.social-likes').socialLikes({
      url: 'http://studio51.github.io/gridlecss',
      title: 'GridleCSS, yet another flexbox grid!',
      counters: true,
      singleTitle: 'Spread the word, daug!'
  });
});
