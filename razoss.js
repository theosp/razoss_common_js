/*
 * Daniel Chcouri
 *
 * REQUIRES: $.cookie
 *           http://www.razoss.com/razoss_services/rapi-0.1.js
 */
(function ($) {
    $.razoss = function (custom_options) {
        var self = this;
        var default_options = {
            dock_width: 420,
            dock_height: 300,
            horizonal_position: 'left',
            vertical_position: 'top',
            dock: false,
            events: {}
        };

        this.options = $.extend(true, {}, default_options, custom_options);

        this.version = function () {
            if (self.environment === 'razoss_browser') {
                return rgw.getEngineVariable("engineversion");
            } else {
                return "plugin_mode";
            }
        };

        // Go to a web page
        this.openUrl = function (url) {
            if (self.environment === 'razoss_browser') {
                rgw.navigate(url);
            } else {
                window.open(url);
            }

            return self;
        };

        // Returns a url with an image of the current window view.
        this.printScreen = function () {
            if (self.environment === 'razoss_browser') {
                return ('http://www.razoss.com/alpha/app/thumbs/' +
                        rgw.postPageInfo('www.razoss.com', '/razoss_services/razoss_uploader.php'));
            } else {
                return '{{ MEDIA_URL }}/bookmarks/temp.jpg';
            }
        };

        // Returns the current window url
        this.getWindowUrl = function () {
            if (self.environment === 'razoss_browser') {
                return rgw.getCurrentPage();
            } else {
                return 'http://www.google.com/';
            }
        };

        // Returns the current window title
        this.getWindowTitle = function () {
            if (self.environment === 'razoss_browser') {
                return rgw.getCurrentTitle();
            } else {
                return 'The window title';
            }
        };

        // Returns the current window description
        this.getWindowDescription = function () {
            if (self.environment === 'razoss_browser') {
                return rgw.getCurrentMetadata("description");
            } else {
                return 'The window description';
            }
        };

        this.init = function () {
            // Bind the events functions that were passed as options
            $.each(self.options.events, function (eventName, functions) {
                functions = splat(functions);
                $.each(functions, function (i, fn) {
                    self.addEvent(eventName, fn);
                });
            });

            // find out which environment we are running on
            if (rgw.RazossBrowser) {
                self.environment = 'razoss_browser';
            } else if (typeof(GM_log) !== 'undefined') {
                self.environment = 'greasemonkey';
            } else {
                self.environment = 'direct_view';
            }

            if (self.environment === 'razoss_browser') {
                self.uid = rgw.getEngineVariable("engineid");
            } else {
                self.uid = null;
            }

            // For the razoss browser, If the dock option is on, we use the
            // razoss browser api to dock the current document to it.
            if (self.options.dock && self.environment === 'razoss_browser') {
                var horizonal_position,
                    vertical_position,
                    scroll_bar_width = 38,
                    status_bar_height = 25,
                    razoss_browser_width = rgw.getCurrentSize().width - scroll_bar_width,
                    razoss_browser_height = rgw.getCurrentSize().height - status_bar_height;

                if (self.options.horizonal_position === 'left') {
                    horizonal_position = HPosition.left;
                } else if (self.options.horizonal_position === 'center') {
                    horizonal_position = HPosition.center;
                } else {
                    horizonal_position = HPosition.right;
                }

                if (self.options.vertical_position === 'top') {
                    vertical_position = VPosition.top;
                } else if (self.options.vertical_position === 'middle') {
                    vertical_position = VPosition.center;
                } else {
                    vertical_position = VPosition.bottom;
                }

                rgw.dock(horizonal_position | vertical_position);
                if (self.options.dock_width === '*' && self.options.dock_height === '*') {
                    rgw.resize(razoss_browser_width, razoss_browser_height);
                } else if (self.options.dock_width === '*') {
                    rgw.resize(razoss_browser_width, self.options.dock_height);
                } else if (self.options.dock_height === '*') {
                    rgw.resize(razoss_browser_width, razoss_browser_height);
                } else {
                    rgw.resize(self.options.dock_width, self.options.dock_height);
                }

                document.body.style.backgroundColor = rgw.getTrasparentColor();
                rgw.setOpacity(255);

                window.onrazossshow = function (visible) {
                    if (parseInt(visible, 10)) {
                        self.fireEvent('onshow');
                    } else {
                        self.fireEvent('onhide');
                    }
                };

                // The razoss browser calls onrazossresize() on resize
                window.onrazossresize = function (width, height) {
                    var razoss_browser_width = width - scroll_bar_width;
                    var razoss_browser_height = height - status_bar_height;

                    if (self.options.dock_width === '*' && self.options.dock_height === '*') {
                        rgw.resize(razoss_browser_width, razoss_browser_height);
                    } else if (self.options.dock_width === '*') {
                        rgw.resize(razoss_browser_width, self.options.dock_height);
                    } else if (self.options.dock_height === '*') {
                        rgw.resize(self.options.dock_width, razoss_browser_height);
                    }
                };

                rgw.registerEvent("onshow", "onrazossshow");
                rgw.registerEvent("onsize", "onrazossresize");
            }

            // Takeover the external a tags functionality
            $("a[href^='http']").live('click', function () {
                var url = $(this).attr('href');

                // On ie href="#" is being expanded to http://path/#
                // which we don't want to open using openUrl()
                if (url === '{{SITE_URL}}/#') {
                    return true;
                }

                self.openUrl(url);
                return false;
            });

            self.fireEvent('environment_determined', [self.environment]);
        };

        {% include 'js/enable_events.inc.js' %}

        this.init();

        return this;

    };
})(jQuery);
