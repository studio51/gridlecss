// Slightly modified to support custom Theme styles and use FontAwesome social
// icons instead of old pngs
//

(function($) {
  "use strict";
  var services = {
      buffer: {
        url: 'https://bufferapp.com/add?url={url}&title={description}&source=button',
        supportCount: true,
        screenSize: {
          height: 350,
          width: 800
        }
      },
      delicious: {
        url: 'http://www.delicious.com/save?v=5&noui&jump=close&url={url}&title={title}',
        supportCount: false,
        screenSize: {
          height: 650,
          width: 1024
        }
      },
      digg: {
        url: 'http://digg.com/submit?url={url}',
        supportCount: false,
        screenSize: {
          height: 650,
          width: 1024
        }
      },
      facebook: {
        url: 'https://www.facebook.com/sharer/sharer.php?u={url}&display=popup&ref=plugin',
        supportCount: true,
        screenSize: {
          height: 306,
          width: 650
        }
      },
      googleplus: {
        url: 'https://plus.google.com/share?url={url}',
        supportCount: true,
        screenSize: {
          height: 620,
          width: 620
        }
      },
      linkedin: {
        url: 'http://www.linkedin.com/shareArticle?url={url}&title={title}&summary={description}&source=sharegg',
        supportCount: true,
        screenSize: {
          height: 650,
          width: 1024
        }
      },
      pinterest: {
        url: 'https://pinterest.com/pin/create/bookmarklet/?url={url}&description={description}&media={image}',
        supportCount: true,
        screenSize: {
          height: 650,
          width: 1024
        }
      },
      pocket: {
        url: 'https://getpocket.com/save?url={url}&title={title}',
        supportCount: false,
        screenSize: {
          height: 360,
          width: 576
        }
      },
      reddit: {
        url: 'http://reddit.com/submit?url={url}&title={title}',
        supportCount: true,
        screenSize: {
          height: 650,
          width: 1024
        }
      },
      stumbleupon: {
        url: 'http://www.stumbleupon.com/badge/?url={url}',
        supportCount: true,
        screenSize: {
          height: 602,
          width: 480
        }
      },
      tumblr: {
        url: 'http://www.tumblr.com/share/link?url={url}&name={title}&description={description}',
        //url: 'http://www.tumblr.com/share/quote?quote={description}&source={url}',
        //url: 'http://www.tumblr.com/share/photo?source={image}&clickthru={url}&caption={description}',
        //url: 'http://www.tumblr.com/share/video?embed={url}&caption={description}',
        supportCount: false,
        screenSize: {
          height: 650,
          width: 1024
        }
      },
      twitter: {
        url: 'https://twitter.com/share?url={url}&text={title}',
        supportCount: true,
        screenSize: {
          height: 420,
          width: 550
        }
      },
      vkontakte: {
        url: 'https://vk.com/share.php?url={url}',
        supportCount: true,
        screenSize: {
          height: 445,
          width: 642
        }
      }
    },
    locales = {
      'en_US': {
        name: 'English (United States)',
        alias: ['en', 'en-US'],
        messages: {
          buffer: {
            title: 'Share on Buffer'
          },
          delicious: {
            title: 'Share on Delicious'
          },
          digg: {
            title: 'Share on Digg'
          },
          facebook: {
            title: 'Share on Facebook'
          },
          googleplus: {
            title: 'Share on Google Plus'
          },
          linkedin: {
            title: 'Share on Linkedin'
          },
          pinterest: {
            title: 'Share on Pinterest'
          },
          pocket: {
            title: 'Share on Pocket'
          },
          reddit: {
            title: 'Share on Reddit'
          },
          stumbleupon: {
            title: 'Share on StumbleUpon'
          },
          tumblr: {
            title: 'Share on Tumblr'
          },
          twitter: {
            title: 'Share on Twitter'
          },
          vkontakte: {
            title: 'Share on VK'
          }
        }
      }
    };

  function fmt(str, args) {
    var s = str.toString();
    Object.keys(args).forEach(function(k) {
      var re = new RegExp('\\{' + k + '\\}', 'gm');
      s = s.replace(re, args[k]);
    });
    return s;
  }

  function slash(url) {
    if (!(/\/$/.test(url))) {
      return url + '/';
    }
    return url;
  }

  function getStats(serviceName, url, callback) {
    $.ajax({
      url: slash($.fn.sharegg.defaults.apiUrl) + 'stats/' + serviceName + '?url=' + encodeURIComponent(url),
      dataType: 'json',
      type: 'GET'
    }).complete(function(xhr) {
      if (xhr.status === 200) {
        callback(xhr.responseJSON);
      } else {
        callback();
      }
    });
  }

  function getShareCount(serviceName, url, callback) {
    getStats(serviceName, url, function(data) {
      if (serviceName === 'reddit') {
        callback(data ? data.score : 0);
      } else if (serviceName === 'stumbleupon') {
        callback(data ? data.views : 0);
      } else if (serviceName === 'pocket' || serviceName === 'vkontakte') {
        callback(data ? data.count : 0);
      } else {
        callback(data ? data.shares : 0);
      }
    });
  }

  function getService(serviceName) {
    var s = services[serviceName];
    if (!s) {
      throw new Error('Invalid service name: ' + serviceName);
    }
    return s;
  }

  function serviceExists(serviceName) {
    return services[serviceName] !== undefined;
  }

  function getLocale(locale) {
    var l = locales[locale];
    if (!l) {
      l = locales.en_US;
      console.warn('Invalid locale: ' + locale);
    }
    return l;
  }

  function registerLocale(id, info) {
    locales[id] = info;
  }

  function popup(elem) {
    var e = $(elem),
      serviceName = e.data('service-name'),
      service = getService(serviceName),
      parent = e.closest('.sharegg-widget'),
      url = encodeURIComponent(parent.data('url')),
      title = encodeURIComponent(parent.data('title')),
      description = encodeURIComponent(parent.data('description')),
      image = encodeURIComponent(parent.data('image'));
    var w = window.open(fmt(service.url, {
      url: url,
      title: title,
      description: description,
      image: image
    }), 'sharegg', fmt('width={width}, height={height}, resizable=1, scrollbars=1, top=0, left=0', service.screenSize));
    // FIX-ME: Find a better way to do this.
    var timer = setInterval(function() {
      if (w.closed) {
        clearInterval(timer);
        getShareCount(serviceName, url, function(count) {
          e.find('span').text(count);
        });
      }
    }, 600);
  }

  function loadCount(elem) {
    var buttons;
    if (elem) {
      buttons = elem.find('li.social-btn');
    } else {
      buttons = $('li.social-btn');
    }
    $.each(buttons, function() {
      var e = $(this).find('a');
      getShareCount(e.data('service-name'), e.closest('.sharegg-widget').data('url'), function(count) {
        e.find('span').text(count);
      });
    });
  }

  function createShareButtons(elem, opt) {
    opt = $.extend({}, $.fn.sharegg.defaults, opt);
    $.each(opt.buttons, function(item) {
      if (this.show === true) {
        var serviceName = item.toString();
        if (!serviceExists(serviceName)) {
          throw new Error('Invalid service name: ' + serviceName);
        }
        var title = getLocale('en_US').messages[serviceName].title;
        /* jshint multistr: true */
        elem.append('<li class="social-btn fade"> \
                                 <a href="javascript:void(0);" \
                                    class="btn btn--outline btn--' + serviceName + '" \
                                    onclick="sharegg.popup(this);" \
                                    data-service-name="' + serviceName + '" \
                                    title="' + title + '"> \
                                    <i class="fa fa-' + serviceName + ' ' + serviceName + '-btn"></i> \
                                 </a> \
                             </li>');
        var icon = elem.find('.' + serviceName + '-btn');
        if (this.count === true) {
          icon.parent().append('<span class="social-counter">0</span>');
        } else {
          icon.addClass('social-no-counter');
        }
      }
    });
  }
  $.fn.sharegg = function() {
    var opt;
    if (arguments.length === 0) {
      opt = $.fn.sharegg.defaults;
    } else if (arguments.length === 1) {
      if (typeof arguments[0] === 'string') {
        if (arguments[0] === 'count') {
          return this.each(function() {
            loadCount($(this));
          });
        }
        throw new Error('Invalid arguments value: ' + arguments[0]);
      }
      opt = arguments[0];
    } else {
      throw new Error('Invalid number of arguments: ' + arguments.length);
    }
    return this.each(function() {
      var e = $(this);
      e.addClass('sharegg-widget');
      if (e.data('url') === undefined) {
        e.data('url', (opt.data !== undefined && opt.data.url) ? opt.data.url : 'http://www.sharegg.org');
      }
      if (e.data('title') === undefined) {
        e.data('title', (opt.data !== undefined && opt.data.title) ? opt.data.title : 'Sharegg');
      }
      if (e.data('description') === undefined) {
        e.data('description', (opt.data !== undefined && opt.data.description) ? opt.data.description : '');
      }
      if (e.data('image') === undefined) {
        e.data('image', (opt.data !== undefined && opt.data.image) ? opt.data.image : '');
      }
      createShareButtons($('.social-buttons--container ul'), opt);
      loadCount(e);
    });
  };
  $.fn.sharegg.defaults = {
    apiUrl: 'http://api.sharegg.org/',
    buttons: {
      buffer: {
        show: true,
        count: true,
      },
      delicious: {
        show: true,
        count: true,
      },
      digg: {
        show: true,
        count: true,
      },
      facebook: {
        show: true,
        count: true,
      },
      googleplus: {
        show: true,
        count: true,
      },
      linkedin: {
        show: true,
        count: true,
      },
      pinterest: {
        show: true,
        count: true,
      },
      pocket: {
        show: true,
        count: true,
      },
      reddit: {
        show: true,
        count: true,
      },
      stumbleupon: {
        show: true,
        count: true,
      },
      tumblr: {
        show: true,
        count: true,
      },
      twitter: {
        show: true,
        count: true,
      },
      vkontakte: {
        show: true,
        count: true,
      }
    }
  };
  window.sharegg = {
    popup: popup
  };
}(jQuery));
