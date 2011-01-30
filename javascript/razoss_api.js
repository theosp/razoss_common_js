/*!
 *  Razoss gateway API v0.1
 *  http://www.razoss.com
 *
 *  Copyright (c) 2009
 *  Date: July 2009 - December 2010
 *  Revision: 6
 *
*/


var HPosition = {
	fill:0,
	center:1,
	left:2,
	right:3
};

var VPosition = {
	fill:0,
	center:4,
	top:8,
	bottom:12
};

var MovePosition = {
	absolute:0,
	relative:1
};

var NavigateTarget = {
	current:0,
	newtab:1,
	newwindow:2
};

var ShowMode = {
	hide:0,
	show:1
};

var NewWindowBehavior = 
{
	defaultBehavior:0,
	razossPopup:1,
	hostCurrentTab:2,
	hostNewTab:3
};

var KeywordsType = {
	all:0,
	title:1,
	description:2,
	heading:4,
	bold:8
};

/*
var RazossPostObject = {
	cbPostOnComplete:null,
	keep:null,
	
	onStart:function(cbOnComplete, keepData)
	{
		cbPostOnComplete = cbOnComplete;
		keep = keepData;
	},
	
	onComplete:function()
	{
		cbPostOnComplete(keep);
	}
};*/

var rgw = {

	version:"0.11",
	RazossBrowser:false,
	
	Cache:	{
				get:function()
				{
					var buff = window.external.rapi_Cache_Get();
					return buff;
				},
				set:function(buff)
				{
					window.external.rapi_Cache_Set(buff);
				},
				query:function(userid, sql)
				{
					window.external.rapi_Cache_Query(userid, sql);
				}
			},
	
	onLoad:function()
	{	try 
		{
			this.RazossBrowser = (window.external.rapi_IsRazossBrowser() != null);
		}
		catch(e)
		{
			this.RazossBrowser = null;
		}
	},
	
	getFrameworkVersion:function()
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }

		return window.external.rapi_GetFrameworkVersion();
	},
	
	getFrameworkDate:function()
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }

		return window.external.rapi_GetFrameworkDate();
	},
	
	log:function(message)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }

		// TODO IMPLEMENT! ?
	},
	
	registerEvent:function(eventName, funcName)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		var result = window.external.rapi_RegisterEvent(eventName, funcName);
		return result;
	},
	
	unregisterEvent:function(eventName)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		var result = window.external.rapi_UnregisterEvent(eventName);
		return result;
	},
	
	navigate:function(url, target)
	{
	
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		if(target==undefined)
			target = NavigateTarget.current;
		
		window.external.rapi_Navigate(url, target);
	},
	
	getCurrentPage:function()
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		var strURL = window.external.rapi_GetCurrentURL();
		
		return strURL;
	},
	
	getCurrentTitle:function()
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		var strTitle = window.external.rapi_GetCurrentTitle();
		
		return strTitle;
	},
	
	getPageKeywords:function(type)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		var strKeywords = window.external.rapi_GetPageKeywords(type);
		
		return strKeywords;
	},
	
	getCurrentMetadata:function(name)
	{		
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		var strContent = window.external.rapi_GetCurrentMetadata(name);
		return strContent;
	},
	
	getEngineVariable:function(name)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }				
		var strValue = window.external.rapi_GetEngineVariable(name);
		
		return strValue;
	},
	
	setNewWindowBehavior:function(url, value)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		window.external.rapi_SetNewWindowBehavior(url, value);
	},
	
	postPageInfo:function(serverName, objectName)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }

		return window.external.rapi_PostPageInfo(serverName, objectName);
	},
	
	postPageInfoAsync:function(serverName, objectName, context, callback)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }

		// NOT IMPLEMENTED!!
	},
	
	newWindow:function(url, pos, showmode)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		var b = window.external.rapi_NewWindow(url, pos, showmode);
		return b;
	},
	
	closeWindow:function(id)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		var b = window.external.rapi_CloseWindow(id);
		return b;
	},
	
	getCurrentSize:function()
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		var w = -1;
		var h = -1;
		try {
			w = window.external.rapi_GetCurrentWidth();
			h = window.external.rapi_GetCurrentHeight();
		}
		catch(err) {
			w = h = -1;
		}

		return {width:w, height:h};
	},
	
	dock:function(pos)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		window.external.rapi_Dock(pos);
	},
	dockEx:function(state)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		window.external.rapi_Dock(pos);
	},
	
	resize:function(width, height, keepPosition/*=true by default*/)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		if(keepPosition == undefined)
		{
			keepPosition = true;
		}

		window.external.rapi_Resize(width, height, keepPosition);
	},
	
	resizeKeepPosition:function(width, height, keepPosition)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }

		window.external.rapi_Resize(width, height, keepPosition);
	},
	
	show:function(showmode)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		window.external.rapi_Show(showmode);
	},
	
	isVisible:function()
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		var bVisible = window.external.rapi_IsVisible();
		return bVisible;
	},
	
	close:function()
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		var b = window.external.rapi_Close();
		return b;
	},
	
	closeAllButThis:function()
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		var b = window.external.rapi_CloseAllButThis();
		return b;
	},
	
	getWindowPos:function()
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
	},
	
	setWindowPos:function()
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
	},
	
	setPositionOffset:function()
	{
	},
	
	setTrasparentColor:function(col)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		window.external.rapi_SetTransparency(col);
	},
	
	getTrasparentColor:function()
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		
		var col = window.external.rapi_GetTransparency();
		return col;
	},
	
	setOpacity:function(alpha)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		window.external.rapi_SetOpacity(alpha);
	},
	
	getOpacity:function()
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		return window.external.rapi_GetOpacity();
	},
	
	moveWindow:function(position, x, y)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }
		window.external.rapi_MoveWindow(position, x, y);
	}
};

rgw.onLoad();
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
