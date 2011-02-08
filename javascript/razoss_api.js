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
	
	setStorageValue:function(name, value)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }				
		window.external.rapi_SetStorageValue(name, value);
	},
	
	getStorageValue:function(name)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }				
		var strValue = window.external.rapi_GetStorageValue(name);
		return strValue;
	},
	
	isStorageValueExists:function(name)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }				
		var b = window.external.rapi_IsStorageValueExists(name);
		return b;
	},
	
	executeScript:function(exescript)
	{
		if(!this.RazossBrowser) { throw("Browser Not Supported"); }				
		window.external.rapi_ExecuteScript(exescript);
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
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Copyright (c) 2010 Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * $.jStorage
 * 
 * USAGE:
 *
 * jStorage requires Prototype, MooTools or jQuery! If jQuery is used, then
 * jQuery-JSON (http://code.google.com/p/jquery-json/) is also needed.
 * (jQuery-JSON needs to be loaded BEFORE jStorage!)
 *
 * Methods:
 *
 * -set(key, value)
 * $.jStorage.set(key, value) -> saves a value
 *
 * -get(key[, default])
 * value = $.jStorage.get(key [, default]) ->
 *    retrieves value if key exists, or default if it doesn't
 *
 * -deleteKey(key)
 * $.jStorage.deleteKey(key) -> removes a key from the storage
 *
 * -flush()
 * $.jStorage.flush() -> clears the cache
 * 
 * -storageObj()
 * $.jStorage.storageObj() -> returns a read-ony copy of the actual storage
 * 
 * -storageSize()
 * $.jStorage.storageSize() -> returns the size of the storage in bytes
 *
 * -index()
 * $.jStorage.index() -> returns the used keys as an array
 * 
 * -storageAvailable()
 * $.jStorage.storageAvailable() -> returns true if storage is available
 * 
 * -reInit()
 * $.jStorage.reInit() -> reloads the data from browser storage
 * 
 * <value> can be any JSON-able value, including objects and arrays.
 *
 **/

(function($){
    if(!$ || !($.toJSON || Object.toJSON || window.JSON)){
        throw new Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!");
    }
    
    var
        /* This is the object, that holds the cached values */ 
        _storage = {},

        /* Actual browser storage (localStorage or globalStorage['domain']) */
        _storage_service = {jStorage:"{}"},

        /* DOM element for older IE versions, holds userData behavior */
        _storage_elm = null,
        
        /* How much space does the storage take */
        _storage_size = 0,

        /* function to encode objects to JSON strings */
        json_encode = $.toJSON || Object.toJSON || (window.JSON && (JSON.encode || JSON.stringify)),

        /* function to decode objects from JSON strings */
        json_decode = $.evalJSON || (window.JSON && (JSON.decode || JSON.parse)) || function(str){
            return String(str).evalJSON();
        },
        
        /* which backend is currently used */
        _backend = false;
        
        /**
         * XML encoding and decoding as XML nodes can't be JSON'ized
         * XML nodes are encoded and decoded if the node is the value to be saved
         * but not if it's as a property of another object
         * Eg. -
         *   $.jStorage.set("key", xmlNode);        // IS OK
         *   $.jStorage.set("key", {xml: xmlNode}); // NOT OK
         */
        _XMLService = {
            
            /**
             * Validates a XML node to be XML
             * based on jQuery.isXML function
             */
            isXML: function(elm){
                var documentElement = (elm ? elm.ownerDocument || elm : 0).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            },
            
            /**
             * Encodes a XML node to string
             * based on http://www.mercurytide.co.uk/news/article/issues-when-working-ajax/
             */
            encode: function(xmlNode) {
                if(!this.isXML(xmlNode)){
                    return false;
                }
                try{ // Mozilla, Webkit, Opera
                    return new XMLSerializer().serializeToString(xmlNode);
                }catch(E1) {
                    try {  // IE
                        return xmlNode.xml;
                    }catch(E2){}
                }
                return false;
            },
            
            /**
             * Decodes a XML node from string
             * loosely based on http://outwestmedia.com/jquery-plugins/xmldom/
             */
            decode: function(xmlString){
                var dom_parser = ("DOMParser" in window && (new DOMParser()).parseFromString) ||
                        (window.ActiveXObject && function(_xmlString) {
                    var xml_doc = new ActiveXObject('Microsoft.XMLDOM');
                    xml_doc.async = 'false';
                    xml_doc.loadXML(_xmlString);
                    return xml_doc;
                }),
                resultXML;
                if(!dom_parser){
                    return false;
                }
                resultXML = dom_parser.call("DOMParser" in window && (new DOMParser()) || window, xmlString, 'text/xml');
                return this.isXML(resultXML)?resultXML:false;
            }
        };

    ////////////////////////// PRIVATE METHODS ////////////////////////

    /**
     * Initialization function. Detects if the browser supports DOM Storage
     * or userData behavior and behaves accordingly.
     * @returns undefined
     */
    function _init(){
        /* Check if browser supports localStorage */
        if("localStorage" in window){
            try {
                if(window.localStorage) {
                    _storage_service = window.localStorage;
                    _backend = "localStorage";
                }
            } catch(E3) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports globalStorage */
        else if("globalStorage" in window){
            try {
                if(window.globalStorage) {
                    _storage_service = window.globalStorage[window.location.hostname];
                    _backend = "globalStorage";
                }
            } catch(E4) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports userData behavior */
        else {
            _storage_elm = document.createElement('link');
            if(_storage_elm.addBehavior){

                /* Use a DOM element to act as userData storage */
                _storage_elm.style.behavior = 'url(#default#userData)';

                /* userData element needs to be inserted into the DOM! */
                document.getElementsByTagName('head')[0].appendChild(_storage_elm);

                _storage_elm.load("jStorage");
                var data = "{}";
                try{
                    data = _storage_elm.getAttribute("jStorage");
                }catch(E5){}
                _storage_service.jStorage = data;
                _backend = "userDataBehavior";
            }else{
                _storage_elm = null;
                return;
            }
        }

        _load_storage();
    }
    
    /**
     * Loads the data from the storage based on the supported mechanism
     * @returns undefined
     */
    function _load_storage(){
        /* if jStorage string is retrieved, then decode it */
        if(_storage_service.jStorage){
            try{
                _storage = json_decode(String(_storage_service.jStorage));
            }catch(E6){_storage_service.jStorage = "{}";}
        }else{
            _storage_service.jStorage = "{}";
        }
        _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;    
    }

    /**
     * This functions provides the "save" mechanism to store the jStorage object
     * @returns undefined
     */
    function _save(){
        try{
            _storage_service.jStorage = json_encode(_storage);
            // If userData is used as the storage engine, additional
            if(_storage_elm) {
                _storage_elm.setAttribute("jStorage",_storage_service.jStorage);
                _storage_elm.save("jStorage");
            }
            _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;
        }catch(E7){/* probably cache is full, nothing is saved this way*/}
    }

    /**
     * Function checks if a key is set and is string or numberic
     */
    function _checkKey(key){
        if(!key || (typeof key != "string" && typeof key != "number")){
            throw new TypeError('Key name must be string or numeric');
        }
        return true;
    }

    ////////////////////////// PUBLIC INTERFACE /////////////////////////

    $.jStorage = {
        /* Version number */
        version: "0.1.5.0",

        /**
         * Sets a key's value.
         * 
         * @param {String} key - Key to set. If this value is not set or not
         *              a string an exception is raised.
         * @param value - Value to set. This can be any value that is JSON
         *              compatible (Numbers, Strings, Objects etc.).
         * @returns the used value
         */
        set: function(key, value){
            _checkKey(key);
            if(_XMLService.isXML(value)){
                value = {_is_xml:true,xml:_XMLService.encode(value)};
            }
            _storage[key] = value;
            _save();
            return value;
        },
        
        /**
         * Looks up a key in cache
         * 
         * @param {String} key - Key to look up.
         * @param {mixed} def - Default value to return, if key didn't exist.
         * @returns the key value, default value or <null>
         */
        get: function(key, def){
            _checkKey(key);
            if(key in _storage){
                if(typeof _storage[key] == "object" &&
                        _storage[key]._is_xml &&
                            _storage[key]._is_xml){
                    return _XMLService.decode(_storage[key].xml);
                }else{
                    return _storage[key];
                }
            }
            return typeof(def) == 'undefined' ? null : def;
        },
        
        /**
         * Deletes a key from cache.
         * 
         * @param {String} key - Key to delete.
         * @returns true if key existed or false if it didn't
         */
        deleteKey: function(key){
            _checkKey(key);
            if(key in _storage){
                delete _storage[key];
                _save();
                return true;
            }
            return false;
        },

        /**
         * Deletes everything in cache.
         * 
         * @returns true
         */
        flush: function(){
            _storage = {};
            _save();
            /*
             * Just to be sure - andris9/jStorage#3
             */
            try{
                window.localStorage.clear();
            }catch(E8){}
            return true;
        },
        
        /**
         * Returns a read-only copy of _storage
         * 
         * @returns Object
        */
        storageObj: function(){
            function F() {}
            F.prototype = _storage;
            return new F();
        },
        
        /**
         * Returns an index of all used keys as an array
         * ['key1', 'key2',..'keyN']
         * 
         * @returns Array
        */
        index: function(){
            var index = [], i;
            for(i in _storage){
                if(_storage.hasOwnProperty(i)){
                    index.push(i);
                }
            }
            return index;
        },
        
        /**
         * How much space in bytes does the storage take?
         * 
         * @returns Number
         */
        storageSize: function(){
            return _storage_size;
        },
        
        /**
         * Which backend is currently in use?
         * 
         * @returns String
         */
        currentBackend: function(){
            return _backend;
        },
        
        /**
         * Test if storage is available
         * 
         * @returns Boolean
         */
        storageAvailable: function(){
            return !!_backend;
        },
        
        /**
         * Reloads the data from browser storage
         * 
         * @returns undefined
         */
        reInit: function(){
            var new_storage_elm, data;
            if(_storage_elm && _storage_elm.addBehavior){
                new_storage_elm = document.createElement('link');
                
                _storage_elm.parentNode.replaceChild(new_storage_elm, _storage_elm);
                _storage_elm = new_storage_elm;
                
                /* Use a DOM element to act as userData storage */
                _storage_elm.style.behavior = 'url(#default#userData)';

                /* userData element needs to be inserted into the DOM! */
                document.getElementsByTagName('head')[0].appendChild(_storage_elm);

                _storage_elm.load("jStorage");
                data = "{}";
                try{
                    data = _storage_elm.getAttribute("jStorage");
                }catch(E5){}
                _storage_service.jStorage = data;
                _backend = "userDataBehavior";
            }
            
            _load_storage();
        }
    };

    // Initialize jStorage
    _init();

})(window.jQuery || window.$);/*
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
})(jQuery);

// vim:fdm=marker:fmr={{{,}}}:
