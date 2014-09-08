(function($) {
    $.fn.slowlane = function(options) {
        var self = this;

        var floater = $('<div id="_slowlane-floater">\
            <div id="_slowlane-floater-container">\
                <div id="_slowlane-floater-social">\
                    <i class="fa fa-twitter-square"></i>\
                    <i class="fa fa-facebook-square"></i>\
                    <i class="fa fa-linkedin-square"></i>\
                    <i class="fa fa-reddit-square"></i>\
                </div>\
                <p><b>This is what the Internet could be like if Net Neutrality is compromised.</b></p>\
                <p><a href="#">Express your opinion</a>, <a href="#">e-mail Congress and the FCC</a>, and <a href="#">write to your local congressional representative</a>.</p>\
            </div>\
        </div>');
        $('body').append(floater);

        this.each(function(index, query) {
            var element = $(query);
            element.css({ visibility: 'hidden' });

            function slowItDown() {
                var element = $(this);
                var height = element.height();
                var el = this;
                el._slowlaneId = index;

                if (height < 10) {
                    setTimeout(function() {
                        slowItDown.call(el);
                    }, 100);
                } else {
                    var padding = element.css('padding');
                    var margin = element.css('margin');
                    var border = element.css('border');
                    var classes = typeof element.attr('class') === 'string' ? element.attr('class') : '';
                    element.removeClass();

                    var wrapper = element.wrap('<div class="_slowlane-wrapper ' + classes + '"></div>').parent(); 
                    wrapper.height(height);
                    wrapper.css({ padding: padding, margin: margin });
                    element.css({ margin: 0, padding: 0, border: '0px solid #000' });
                    element.width('100%');

                    var loader = element.wrap('<div class="_slowlane-loader"></div>').parent();
                    loader._slowlaneHeight = loader.height();
                    loader.height('0').delay(3000 * el._slowlaneId).animate({ height: loader._slowlaneHeight + 'px' }, 3000, function() {
                        $(this).css({ overflow: 'visible' });
                        $(this).find('> ._slowlane-ad').fadeOut(500);
                    });


                    var ad = $('<div class="_slowlane-ad">Click Here to Buy Fast-Lane Access</div>');
                    ad.click(function() {
                        $('._slowlane-loader').stop().css({ height: loader._slowlaneHeight + 'px', overflow: 'visible' });
                        $('._slowlane-ad').remove();
                    });
                    loader.append(ad);

                    element.css({ visibility: 'visible' });
                }
            }

            slowItDown.call(query);
        });

        return this;
    }
})(jQuery);
