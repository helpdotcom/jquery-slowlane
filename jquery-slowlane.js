(function($) {
    $.fn.slowlane = function(options) {
        options = typeof options === 'object' ? options : {};
        options.fontAwesome = typeof options.fontAwesome === 'boolean' ? options.fontAwesome : false;
        options.customFloater = typeof options.customFloater === 'boolean' ? options.customFloater : false;
        options.loadTime = typeof options.loadTime === 'number' ? options.loadTime : 5000;
        options.adFadeTime = typeof options.adFadeTime === 'number' ? options.adFadeTime : 500;

        function killLoaders() {
            $('._slowlane-ad').each(function(index, element) {
                setTimeout(function() {
                    $(element).remove();
                }, 1);
            });
            $('._slowlane-loader').stop(true).each(function(index, element) {
                setTimeout(function() {
                    $(element).animate({ height: element._slowlaneHeight + 'px' }, 500, function() {
                        $(this).css({ overflow: 'visible' });
                    });
                }, 500 * index);
            });
        }

        // Inject Info Floater
        if (!options.customFloater) {
            var close = options.fontAwesome ? '<i id="_slowlane-floater-x" class="fa fa-close"></i>' : '<a id="_slowlane-floater-x" class="_slowlane-text">Close</a>';
            var social = options.fontAwesome ? '<i id="_slowlane-twitter" class="fa fa-twitter-square"></i>'
                                                + '<i id="_slowlane-facebook" class="fa fa-facebook-square"></i>'
                                                + '<i id="_slowlane-linkedin" class="fa fa-linkedin-square"></i>'
                                                + '<i id="_slowlane-reddit" class="fa fa-reddit-square"></i>'
                                             : '<a id="_slowlane-twitter" class="_slowlane-text">Twitter</a>'
                                                + '<a id="_slowlane-facebook" class="_slowlane-text">Facebook</a>'
                                                + '<a id="_slowlane-linkedin" class="_slowlane-text">LinkedIn</a>'
                                                + '<a id="_slowlane-reddit" class="_slowlane-text">Reddit</a>'

            var floater = $('<div id="_slowlane-floater">'
                        +   close
                        +   '<div id="_slowlane-floater-container">'
                        +       '<div id="_slowlane-floater-social">'
                        +           social
                        +       '</div>'
                        +       '<p><b>This is what the Internet could become if Net Neutrality is compromised.</b></p>'
                        +       '<p><a href="http://dontbreakthe.net/" target="_blank">Express your opinion</a>, <a href="http://act2.freepress.net/letter/two_million/" target="_blank">e-mail Congress and the FCC</a>, and <a href="http://www.house.gov/representatives/find/" target="_blank">write to your local congressional representative</a>.</p>'
                        +   '</div>'
                        + '</div>').hide();

            $('body').append(floater.delay(1000).fadeIn(1000));

            $('#_slowlane-floater-x').click(killLoaders).click(function() {
                setTimeout(function() {
                    $('#_slowlane-floater').fadeOut();
                }, 1);
            });
        }

        // Run through each element to be slow-laned.
        this.each(function(index, query) {
            var element = $(query);

            // Hide the element so it doesn't look loaded, but we still want to pull its dimensions.
            element.css({ visibility: 'hidden' });

            function slowLoad() {
                var self = this;
                var element = $(self);
                self._slowlaneHeight = element.height();
                self._slowlaneId = index;

                // Quick workaround hack to actually wait for a loaded image.
                if (element.prop('tagName') === 'IMG' && self._slowlaneHeight <= 1) {
                    setTimeout(function() {
                        slowLoad.call(self);
                    }, 100);
                } else {
                    // Grab original element dimensions and classes.
                    var attributes = {
                        padding: element.css('padding'),
                        margin: element.css('margin'),
                        border: element.css('border'),
                        classes: typeof element.attr('class') === 'string' ? element.attr('class') : ''
                    };

                    // Completely gut the element of all dimensional styling.
                    element.removeClass().css({
                        width: '100%',
                        margin: 0,
                        padding: 0,
                        border: '0px solid #000',
                        height: self._slowlaneHeight + 'px'
                    });

                    // Create a wrapper and apply original element styling to it.
                    var wrapper = element.wrap('<div class="_slowlane-wrapper ' + attributes.classes + '"></div>').parent(); 
                    wrapper.css({
                        padding: attributes.padding,
                        margin: attributes.margin,
                        height: self._slowlaneHeight + 'px'
                    });

                    // Wrap loader around the element which will fake loading.
                    var loader = element.wrap('<div class="_slowlane-loader"></div>').parent();
                    loader[0]._slowlaneHeight = loader.height();
                    loader.height('0')
                          .delay(options.loadTime * self._slowlaneId)
                          .animate({ height: loader[0]._slowlaneHeight + 'px' }, options.loadTime, function() {
                              $(this).css({ overflow: 'visible' });
                              $(this).find('> ._slowlane-ad').fadeOut(options.adFadeTime);
                          });

                    // Create a button to get into the fast-lane.
                    var icons = options.fontAwesome ? '<i class="fa fa-spinner fa-spin"></i><i class="fa fa-rocket"></i>' : '';
                    var ad = $('<div class="_slowlane-ad">' + icons + ' &nbsp; Buy Fast-Lane Access</div>');
                    ad.click(killLoaders);
                    loader.append(ad);

                    // Show the element.
                    element.css({ visibility: 'visible' });
                }
            }

            slowLoad.call(query);
        });

        return this;
    }
})(jQuery);
