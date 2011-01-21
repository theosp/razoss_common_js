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
    $.RazossApi.prototype.openUrl = function (url) {
        var self = this;

        if (self.environment === 'razoss_browser') {
            rgw.navigate(url);
        } else {
            window.open(url);
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
            return '';
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
            return '';
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
})(jQuery);

// vim:fdm=marker:fmr={{{,}}}:
