/*
$.RazossApi

AUTHOR: Daniel Chcouri <333222@gmail.com>

RERUIRES: Node.js's EventEmitter
          Daniel Chcouri's theosp_common_js (theosp.js)
*/
(function ($) {
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

    $.RazossApi.prototype.$ = function (selector, context) {
        var self = this;

        selector = theosp.string.supplant(selector, {
            prefix: self.options.css_prefix
        });

        return $(selector, context);
    };

    $.RazossApi.prototype.options = {
    };

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

    $.RazossApi.prototype.getUid = function () {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.getEngineVariable("engineid");
        } else {
            return null;
        }
    };

    $.RazossApi.prototype.version = function () {
        if (self.environment === 'razoss_browser') {
            return rgw.getEngineVariable("engineversion");
        } else {
            return "plugin_mode";
        }
    };

    // Go to a web page
    $.RazossApi.prototype.openUrl = function (url) {
        if (self.environment === 'razoss_browser') {
            rgw.navigate(url);
        } else {
            window.open(url);
        }

        return self;
    };

    // Returns a url with an image of the current window view.
    $.RazossApi.prototype.printScreen = function () {
        if (self.environment === 'razoss_browser') {
            return ('http://www.razoss.com/alpha/app/thumbs/' +
                    rgw.postPageInfo('www.razoss.com', '/razoss_services/razoss_uploader.php'));
        } else {
            return '';
        }
    };

    // Returns the current window url
    $.RazossApi.prototype.getWindowUrl = function () {
        if (self.environment === 'razoss_browser') {
            return rgw.getCurrentPage();
        } else {
            return '';
        }
    };

    // Returns the current window title
    $.RazossApi.prototype.getWindowTitle = function () {
        if (self.environment === 'razoss_browser') {
            return rgw.getCurrentTitle();
        } else {
            return '';
        }
    };

    // Returns the current window description
    $.RazossApi.prototype.getWindowDescription = function () {
        if (self.environment === 'razoss_browser') {
            return rgw.getCurrentMetadata("description");
        } else {
            return '';
        }
    };

    $.RazossApi.prototype.dock = function (horizonal_position, vertical_position) {
        var self = this;

        if (self.environment === 'razoss_browser') {
            rgw.dock(HPosition[horizonal_position] | VPosition[vertical_position]);
            document.body.style.backgroundColor = rgw.getTrasparentColor();
            rgw.setOpacity(255);
        }
    }
})(jQuery);
