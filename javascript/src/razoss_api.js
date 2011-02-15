/*
$.RazossApi

AUTHOR: Daniel Chcouri <333222@gmail.com>

RERUIRES: Node.js's EventEmitter
          Daniel Chcouri's theosp_common_js (theosp.js)
*/
(function ($) {
    // constructor {{{
    $.RazossApi = function (options) {
        var self = this;

        if (typeof options === 'undefined') {
            options = {};
        }
        self.options = theosp.object.clone(self.options); // clone the prototypical options
        $.extend(self.options, options);

        self.environment = null;

        self.init();
    };

    $.RazossApi.prototype = new EventEmitter();
    $.RazossApi.prototype.constructor = $.RazossApi;
    // }}}

    // properties {{{
    $.RazossApi.prototype.options = {
    };

    $.RazossApi.prototype.iframe_links_targets = {
        // default IE behavior (can be a new tab or a new IE window)
        "default": "defaultBehavior",

        // razoss popups (for login windows)
        popup: "razossPopup",

        // navigate to the current tab
        current: "hostCurrentTab",

        // navigate in a new tab
        new_tab: "hostNewTab"

    };

    // navigation targets {{{
    $.RazossApi.prototype.navigation_targets = {
        current_window: "Current window",
        new_tab: "New tab",
        new_window: "New window"
    };

    $.RazossApi.prototype.navigation_targets_ids = {
        current_window: 0,
        new_tab: 1,
        new_window: 2
    };

    $.RazossApi.prototype.default_navigation_target = "current_window";
    // }}}

    // }}}

    // methods {{{

    // $ {{{
    $.RazossApi.prototype.$ = function (selector, context) {
        var self = this;

        selector = theosp.string.supplant(selector, {
            prefix: self.options.css_prefix
        });

        return $(selector, context);
    };
    // }}}

    // init {{{
    $.RazossApi.prototype.init = function () {
        var self = this;

        // find out which environment we are running on
        if (rgw.RazossBrowser) {
            self.environment = 'razoss_browser';
        } else if (typeof(GM_log) !== 'undefined') {
            self.environment = 'greasemonkey';
        } else {
            self.environment = 'direct_view';
        }

        var host_browser_ua = self.getHostBrowser();

        $('html').addClass('host_browser-' + host_browser_ua[0]);
    };
    // }}}

    // getUid {{{
    $.RazossApi.prototype.getUid = function () {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.getEngineVariable("engineid");
        } else {
            return null;
        }
    };
    // }}}

    // version {{{
    $.RazossApi.prototype.version = function () {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.getEngineVariable("engineversion");
        } else {
            return "plugin_mode";
        }
    };
    // }}}

    // openUrl {{{
    // Go to a web page
    $.RazossApi.prototype.openUrl = function (url, target) {
        var self = this;

        if (typeof target === 'undefined' || !(target in self.navigation_targets)) {
            target = "current_window";
        }

        if (self.environment === 'razoss_browser') {
            rgw.navigate(url, self.navigation_targets_ids[target]);
        } else {
            if (target === "current_window") {
                document.location = url;
            } else if (target === "new_tab" ||  target === "new_window") {
                window.open(url);
            }
        }

        return self;
    };
    // }}}

    // printScreen {{{
    // Returns a url with an image of the current window view.
    $.RazossApi.prototype.printScreen = function () {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return ('http://www.razoss.com/alpha/app/thumbs/' +
                    rgw.postPageInfo('www.razoss.com', '/razoss_services/razoss_uploader.php'));
        } else {
            return '';
        }
    };
    // }}}

    // getWindowUrl {{{
    // Returns the current window url
    $.RazossApi.prototype.getWindowUrl = function () {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.getCurrentPage();
        } else {
            return 'http://www.razoss.com/';
        }
    };
    // }}}

    // getWindowTitle {{{
    // Returns the current window title
    $.RazossApi.prototype.getWindowTitle = function () {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.getCurrentTitle();
        } else {
            return 'Razoss';
        }
    };
    // }}}

    // getWindowDescription {{{
    // Returns the current window description
    $.RazossApi.prototype.getWindowDescription = function () {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.getCurrentMetadata("description");
        } else {
            return '';
        }
    };
    // }}}

    // setIframeLinksTarget {{{
    $.RazossApi.prototype.setIframeLinksTarget = function (iframe_url, target) {
        var self = this;

        if (self.environment === 'razoss_browser') {
            if (typeof iframe_url === 'undefined') {
                return;
            }

            if (typeof target === 'undefined') {
                target = "default";
            }

            if (!(target in self.iframe_links_targets)) {
                target = "default";
            }

            rgw.setNewWindowBehavior(iframe_url, NewWindowBehavior[self.iframe_links_targets[target]]);
        } else {
            return;
        }
    };
    // }}}

    // dock {{{
    $.RazossApi.prototype.dock = function (horizonal_position, vertical_position) {
        var self = this;

        if (self.environment === 'razoss_browser') {
            rgw.dock(HPosition[horizonal_position] | VPosition[vertical_position]);
            document.body.style.backgroundColor = rgw.getTrasparentColor();
            rgw.setOpacity(255);
        }
    };
    // }}}

    // getHostBrowser {{{
    $.RazossApi.prototype.getHostBrowser = function () {
        var self = this;

        if (self.environment === 'razoss_browser') {
            var host_browser_ua = rgw.getEngineVariable("hostbrowser").toLowerCase(),
                ua = 
                    /(webkit)[ \/]([\w.]+)/.exec(host_browser_ua) ||
                    /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(host_browser_ua) ||
                    /(msie) ([\w.]+)/.exec(host_browser_ua) ||
                    !/compatible/.test(host_browser_ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(host_browser_ua) || [];

            if (ua[1] === 'msie') {
                ua[1] = 'ie';
            }

            var host_browser = ua[1],
                host_browser_version = ua[2];

            return [host_browser, host_browser_version];
        } else {
            return ["direct", 0];
        }
    };
    // }}}

    // put {{{
    $.RazossApi.prototype.put = function (key, value) {
        var self = this;

        if (self.environment === 'razoss_browser') {
            rgw.setStorageValue(key, value);
        } else {
            if ($.jStorage.storageAvailable()) {
                $.jStorage.set(key, value);
            }
        }
    };
    // }}}

    // get {{{
    $.RazossApi.prototype.get = function (key, _default) {
        var self = this;

        if (typeof _default === 'undefined') {
            _default = null;
        }

        if (self.environment === 'razoss_browser') {
            var value = rgw.getStorageValue(key);

            return value === "" ? _default : value;
        } else {
            if ($.jStorage.storageAvailable()) {
                return $.jStorage.get(key, _default);
            }

            return _default;
        }
    };
    // }}}

    // }}}

    // Initiate singleton {{{

    // The Razoss browser allow only single callback reference to be set as the
    // listener of a certein event. Therefore only one $.RazossApi object, i.e.
    // the one that bind and interact with that listener, can work with that
    // razoss browser events. So to avoid conflicts we initiate $.RazossApi
    // object - RAZOSS_API that should be the only one in use, and implement
    // upon it more flexible mechanizem for working with events.
    RAZOSS_API = new $.RazossApi();

    RAZOSS_API.listeners = {};

    RAZOSS_API.getEventName = function (event_name) {
        return 'razoss_event_' + event_name;
    };

    RAZOSS_API.newRazossEventListener = function (event_name) {
        var self = this;

        if (self.environment === 'razoss_browser') {
            if (typeof RAZOSS_API.listeners[event_name] === 'undefined') {
                window[self.getEventName(event_name)] = function () {
                    var args = Array.prototype.slice.call(arguments);
                    args.unshift(self.getEventName(event_name));

                    RAZOSS_API.emit.apply(self, args);
                };

                rgw.registerEvent(event_name, self.getEventName(event_name));
            }
        }
    };

    RAZOSS_API.onRazossEvent = function (event_name, callback) {
        var self = this;

        self.newRazossEventListener(event_name);

        self.on(self.getEventName(event_name), callback);
    };

    RAZOSS_API.onceRazossEvent = function (event_name, callback) {
        var self = this;

        self.newRazossEventListener(event_name);

        self.once(self.getEventName(event_name), callback);
    };

    RAZOSS_API.removeRazossEventListener = function (event_name, callback) {
        var self = this;

        self.newRazossEventListener(event_name);

        self.removeListener(self.getEventName(event_name), callback);
    };

    RAZOSS_API.removeAllListeners = function (event_name) {
        var self = this;

        self.newRazossEventListener(event_name);

        self.removeListener(self.getEventName(event_name));
    };
    // }}}

    // inititate live events {{{
    $('a.Rapi-navigate_current_window').live('click', function () {
        RAZOSS_API.openUrl($(this).attr('href'), "current_window");

        return false;
    });

    $('a.Rapi-navigate_new_tab').live('click', function () {
        RAZOSS_API.openUrl($(this).attr('href'), "new_tab");

        return false;
    });

    $('a.Rapi-navigate_new_window').live('click', function () {
        RAZOSS_API.openUrl($(this).attr('href'), "new_window");

        return false;
    });
    // }}}
    
})(jQuery);

// vim:fdm=marker:fmr={{{,}}}:
