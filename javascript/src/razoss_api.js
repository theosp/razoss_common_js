/*
$.RazossApi

AUTHOR: Daniel Chcouri <333222@gmail.com>

RERUIRES: Node.js's EventEmitter
          Daniel Chcouri's theosp_common_js (theosp.js)
          Node.js's Url 
              Node.js's QueryString
                  Node.js's Buffer
              Daniel Chcouri's theosp_common_js (theosp.js)
*/
(function ($) {
    var parseUrl = function (url) {
        var parsed_url = NODE_URL.parse(url, false);
        if (typeof parsed_url.hash !== 'undefined') {
            parsed_url.parsed_hash = NODE_QUERY_STRING.parse(parsed_url.hash.substr(parsed_url.hash.indexOf('#') + 1));
        }

        return parsed_url;
    };

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

    RAZOSS_API.emitRazossEvent = function (event_name, args) {
        var self = this;

        args = Array.prototype.slice.call(arguments);
        args[0] = self.getEventName(args[0]);

        RAZOSS_API.emit.apply(self, args);
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

    RAZOSS_API.windowQuery = function (query, callback) {
        /* Call callback with the values of some window variables passed in query.
         *
         * query structure:
         * [
         *     {
         *         condition: "<js_expression>",
         *         vars: {
         *             <label>: "<variable>",
         *             <label>: "<variable>",
         *             ...
         *         }
         *     }
         * ]
         *
         * IMPORTANT: We assume each object has the same labels in vars.
         *
         * The result is passed to callback as a dictionary, <label> will be used
         * as the key for the item holding <variable>'s value.
         *
         * Note that <variable> can be any js expression that has value, not
         * only variables. example: "2 + 2" is a valid variable
         *
         * <js_expression>: different browsers might give different names to
         * variables that stores the same data, for example Firefox/chrome's
         * window.screenX is equivalent to IE's window.screenLeft.
         * To overcome this problem, only if the expression written in
         * <js_expression> is evaluate to true its vars object will be used to
         * get the query's vars.
         * The last (and only the last) query's object can omit the condition
         * property.
         */
        var self = this;

        if (typeof query === 'undefined' || typeof callback === 'undefined') {
            if (typeof console !== 'undefined') {
                console.log("ERROR: RAZOSS_API.windowQuery: requires two arguments.");
            }

            return;
        }

        if (self.environment === 'razoss_browser') {
            var variables_test,
                i,
                razoss_page_query_id = (new Date()).getTime();

            // React to query that has object other than the last without the condition property {{{
            for (i = 0; i < query.length; i++) {
                variables_test = query[i];
            
                if (typeof variables_test.condition === 'undefined' && i !== (query.length - 1)) {
                    alert("RAZOSS_API.windowQuery: Query Syntax Error: only last " +
                          "object of query can omit the condition property.");
                    return;
                }
            }
            // }}}

            // generate query_evaluator_script {{{
            var query_evaluator_script = "",
                block_opened = false;

            // declare RAZOSS_execute_query() {{{
            query_evaluator_script += "var RAZOSS_execute_query = function () {";

            // declare/initiate RAZOSS_new_location var
            query_evaluator_script += "var RAZOSS_new_location = '';";

            // check whether there is a # in the url, add it if not; if the url doesn't end with # add begin with &
            query_evaluator_script += (
                "if (String(document.location).indexOf('#') === -1) {" +
                    "RAZOSS_new_location += '#';" +
                "} else {" +
                    "RAZOSS_new_location += '&';" +
                "}"
            );

            for (i = 0; i < query.length; i++) {
                variables_test = query[i];

                // open condition block {{{

                block_opened = true;
                // if has condition and first {{{
                if (typeof variables_test.condition !== "undefined" && i === 0) {
                    query_evaluator_script += "if (" + variables_test.condition + ") {";
                // }}}
                // if has condition {{{
                } else if (typeof variables_test.condition !== "undefined") {
                    query_evaluator_script += "else if (" + variables_test.condition + ") {";
                // }}}
                // if don't have condition and not first {{{
                } else if (typeof variables_test.condition === "undefined" && query_evaluator_script.length > 1) {
                    query_evaluator_script += "else {";
                // }}}
                // if don't have condition and is first {{{
                } else {
                    block_opened = false;
                }
                // }}}
                
                // }}}

                // generate the query evaluator script {{{
                query_evaluator_script += "RAZOSS_new_location += ";

                for (var label in variables_test.vars) {
                    if (variables_test.vars.hasOwnProperty(label)) {
                        query_evaluator_script += '"' + label + '=" + ' + variables_test.vars[label] + ' + "&" + ';
                    }
                }

                query_evaluator_script += '"rpqid' + razoss_page_query_id + '";';
                // }}}

                // close condition block (if one was opened) {{{
                if (block_opened === true) {
                    query_evaluator_script += "}";
                }
                // }}}

            }

            query_evaluator_script += 'document.location += RAZOSS_new_location;';

            query_evaluator_script += "};";
            // }}}
            
            // on window ready execute query {{{

            // Catch cases where the browser ready event has already occurred.
            query_evaluator_script += (
                'if ( document.readyState === "complete" ) {' +
                    'RAZOSS_execute_query();' +
                '} else {' +
                    // Mozilla, Opera and webkit nightlies currently support this event
                    'if ( document.addEventListener ) {' +
                        'window.addEventListener( "load", RAZOSS_execute_query, false );' +
                    // If IE event model is used
                    '} else if ( document.attachEvent ) {' +
                        'window.attachEvent( "onload", RAZOSS_execute_query );' +
                    '}' +
                '}'
            );
            // }}}
            
            // }}}
            
            // initiate listener for query response {{{
            var onurlchangedListenerForQueryResponse = function (url) {
                    var parsed_url = parseUrl(url);

                    // if the url has hash with razoss_page_query_id as argument (query result received) {{{
                    var result = {};
                    if (typeof parsed_url.parsed_hash !== 'undefined' && "rpqid" + razoss_page_query_id in parsed_url.parsed_hash) {
                        delete parsed_url.parsed_hash["rpqid" + razoss_page_query_id];

                        // delete query parameters
                        for (var label in query[0].vars) {
                            if (query[0].vars.hasOwnProperty(label)) {
                                result[label] = parsed_url.parsed_hash[label];
                                delete parsed_url.parsed_hash[label];
                            }
                        }

                        // Query response received, we can remove the listener
                        RAZOSS_API.removeRazossEventListener('onurlchanged', onurlchangedListenerForQueryResponse);

                        var hash_args = [];
                        for (var item in parsed_url.parsed_hash) {
                            if (parsed_url.parsed_hash.hasOwnProperty(item)) {
                                var item_value = parsed_url.parsed_hash[item];

                                if (item_value !== "") {
                                    hash_args.push(item + "=" + item_value);
                                } else {
                                    hash_args.push(item);
                                }
                            }
                        }

                        parsed_url.hash = "#";
                        if (hash_args.length !== 0) {
                            parsed_url.hash += hash_args.join("&");
                        }

                        // Remove the query response parameters from the url {{{
                        delete parsed_url.parsed_hash;

                        var url_without_the_query_response = NODE_URL.format(parsed_url);

                        // improve NODE_URL.format output {{{
                        
                        // http::/ => http:/ TODO {{{
                        url_without_the_query_response = url_without_the_query_response.replace('http::', 'http:');
                        url_without_the_query_response = url_without_the_query_response.replace('https::', 'https:');
                        // }}}

                        // }}}
                        

                        rgw.executeScript("document.location = \"" + url_without_the_query_response + "\";");
                        // }}}

                        callback(result);

                        return;
                    }
                    // }}}
                };

            RAZOSS_API.onRazossEvent('onurlchanged', onurlchangedListenerForQueryResponse);
            // }}}

            // execute
            alert(query_evaluator_script);
            rgw.executeScript(query_evaluator_script);
        } else {
            return;
        }
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

    /*
    // Initiate emitter for the window_inner_position_or_dimension_changed event {{{
    RAZOSS_API.current_page_position = [0, 0];
    RAZOSS_API.current_page_dimensions = [0, 0];

    RAZOSS_API.onRazossEvent('onurlchanged', function (url) {
        var parsed_url = parseUrl(url),
            rpqid_tester = /^rpqid/;

        // if the url ends with hash it might be a result of finished query - do nothing TODO there should be url tracking, so we'll be able to tell exactly whether it is the same page the user view or he visited a page ends with # {{{
        if (url.slice(-1) === "#") {
            return;
        }
        // }}}

        // if the url was changed as a result of window query - do nothing {{{
        if (typeof parsed_url.parsed_hash !== 'undefined') {
            for (var param in parsed_url.parsed_hash) {
                if (parsed_url.parsed_hash.hasOwnProperty(param)) {
                    if (rpqid_tester.test(param)) {
                        return;
                    }
                }
            }
        }
        // }}}

        // query window size and position {{{
        RAZOSS_API.windowQuery(
            [
                {
                    condition: "typeof window.mozInnerScreenX !== 'undefined'",
                    vars: {
                        screenX: "(window.mozInnerScreenX - window.screenX)",
                        screenY: "(window.mozInnerScreenY - window.screenY)",
                        clientWidth: "document.documentElement.clientWidth",
                        windowHeight: "window.innerHeight"
                    }
                },
                {
                    condition: "typeof window.screenX !== 'undefined'",
                    vars: {
                        screenX: "((window.outerWidth - window.innerWidth) / 2)",
                        screenY: "((window.outerHeight - window.innerHeight) - ((window.outerWidth - window.innerWidth) / 2))",
                        clientWidth: "document.documentElement.clientWidth",
                        windowHeight: "window.innerHeight"
                    }
                },
                {
                    vars: {
                        screenX: "window.screenLeft",
                        screenY: "window.screenTop",
                        clientWidth: "document.documentElement.clientWidth",
                        windowHeight: "window.innerHeight"
                    }
                }
            ],
            function (result) {
                alert(JSON.stringify(result));
                $(document).ready(function () {
                    $('body').css('overflow', 'hidden');

                    $('.ClassicDock-dock_classic_dock_container')
                        .wrap(
                            '<div style="position: absolute; top: ' + result.screenY + 'px; left: ' + result.screenX + 'px; width: ' + result.clientWidth + 'px; height: ' + result.windowHeight + 'px;"></div>'
                        );

                    $('.ClassicDock-dock_classic_dock_container')
                        .css({
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0
                        });
                });
            }
        );
        // }}}
    });
    // }}}
    */
})(jQuery);

// vim:fdm=marker:fmr={{{,}}}:
