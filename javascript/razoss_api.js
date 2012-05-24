/*!
 *  Razoss gateway API v0.1
 *  http://www.razoss.com
 *
 *  Copyright (c) 2009-2012
 *  Date: July 2009 - February 2012
 *  Revision: 8
 *
*/

var rapi_type = {
    unknown: 0,
    ie: 1,
    cef: 2
};

var rapi_validator = {
    get_type: function () {
        if (rapi_validator.validate_ie()) {
            return rapi_type.ie;
        } else if (rapi_validator.validate_cef()) {
            return rapi_type.cef;
        }
        return rapi_type.unknown;
    },
    validate_ie: function () {
        try {
            return (window.external.rapi_IsRazossBrowser() !== null);
        } catch (e) {
        }
        return false;
    },
    validate_cef: function () {    
        try  {
            return ((typeof razoss) !== 'undefined');
        } catch (e) {
        }
        return false;
    }
};

if (rapi_validator.get_type() === rapi_type.ie) {
    // RAPI V1 {{{
    var HPosition = {
        fill: 0,
        center: 1,
        left: 2,
        right: 3
    };

    var VPosition = {
        fill: 0,
        center: 4,
        top: 8,
        bottom: 12
    };

    var MovePosition = {
        absolute: 0,
        relative: 1
    };

    var NavigateTarget = {
        current: 0,
        newtab: 1,
        newwindow: 2
    };

    var ShowMode = {
        hide: 0,
        show: 1
    };

    var NewWindowBehavior = 
    {
        defaultBehavior: 0,
        razossPopup: 1,
        hostCurrentTab: 2,
        hostNewTab: 3
    };

    var KeywordsType = {
        all: 0,
        title: 1,
        description: 2,
        heading: 4,
        bold: 8
    };

    var rgw = {
        version: "0.11",
        RazossBrowser: false,
        
        Cache: {
            get: function () {
                var buff = window.external.rapi_Cache_Get();
                return buff;
            },
            set: function (buff) {
                window.external.rapi_Cache_Set(buff);
            },
            query: function (userid, sql) {
                window.external.rapi_Cache_Query(userid, sql);
            }
        },

        onLoad: function () {
            try {
                this.RazossBrowser = (window.external.rapi_IsRazossBrowser() !== null);
            } catch (e) {
                this.RazossBrowser = null;
            }
        },

        breakIfNotRazossBrowser: function () {
            if (!this.RazossBrowser) {
                throw ("Browser Not Supported");
            }
        },
        
        getFrameworkVersion: function () {
            this.breakIfNotRazossBrowser();

            return window.external.rapi_GetFrameworkVersion();
        },
        
        getFrameworkDate: function () {
            this.breakIfNotRazossBrowser();

            return window.external.rapi_GetFrameworkDate();
        },
        
        log: function (message) {
            this.breakIfNotRazossBrowser();

            // TODO IMPLEMENT! ?
        },
        
        registerEvent: function (eventName, funcName, activeIfHidden) {
            this.breakIfNotRazossBrowser();			if(activeIfHidden==undefined)				activeIfHidden = true;
            var result = 0;
			try 
			{ 
				result = window.external.rapi_RegisterEvent(eventName, funcName, activeIfHidden); 
			} 
			catch(e)
			{
				result = window.external.rapi_RegisterEvent(eventName, funcName); 	// fallback for engines that cannot accept 3rd parameter
			}
			
            return result;
        },
        
        unregisterEvent: function (eventName) {
            this.breakIfNotRazossBrowser();
            
            var result = window.external.rapi_UnregisterEvent(eventName);
            return result;
        },
        
        navigate: function (url, target) {
            this.breakIfNotRazossBrowser();

            if (target === undefined) {
                target = NavigateTarget.current;
            }
            
            window.external.rapi_Navigate(url, target);
        },
        
        getCurrentPage: function () {
            this.breakIfNotRazossBrowser();
            var strURL = window.external.rapi_GetCurrentURL();
            
            return strURL;
        },
        
        getCurrentTitle: function () {
            this.breakIfNotRazossBrowser();
            var strTitle = window.external.rapi_GetCurrentTitle();
            
            return strTitle;
        },
        
        getPageKeywords: function (type) {
            this.breakIfNotRazossBrowser();
            var strKeywords = window.external.rapi_GetPageKeywords(type);
            
            return strKeywords;
        },
        
        getCurrentMetadata: function (name) {        
            this.breakIfNotRazossBrowser();
            var strContent = window.external.rapi_GetCurrentMetadata(name);
            return strContent;
        },
        
        getEngineVariable: function (name) {
            this.breakIfNotRazossBrowser();                
            var strValue = window.external.rapi_GetEngineVariable(name);
            
            return strValue;
        },
        
        setStorageValue: function (name, value) {
            this.breakIfNotRazossBrowser();                
            window.external.rapi_SetStorageValue(name, value);
        },
        
        getStorageValue: function (name) {
            this.breakIfNotRazossBrowser();                
            var strValue = window.external.rapi_GetStorageValue(name);
            return strValue;
        },
        
        isStorageValueExists: function (name) {
            this.breakIfNotRazossBrowser();                
            var b = window.external.rapi_IsStorageValueExists(name);
            return b;
        },
        
        executeScript: function (exescript) {
            this.breakIfNotRazossBrowser();                
            window.external.rapi_ExecuteScript(exescript);
        },
		
		getPageSource: function () {
            this.breakIfNotRazossBrowser();
			return window.external.rapi_GetPageSource();
        },
        
        setNewWindowBehavior: function (url, value) {
            this.breakIfNotRazossBrowser();
            
            window.external.rapi_SetNewWindowBehavior(url, value);
        },
        
        postPageInfo: function (serverName, objectName) {
            this.breakIfNotRazossBrowser();

            return window.external.rapi_PostPageInfo(serverName, objectName);
        },
        
        postPageInfoAsync: function (serverName, objectName, context, callback) {
            this.breakIfNotRazossBrowser();

            // NOT IMPLEMENTED!!
        },
        
        newWindow: function (url, pos, showmode) {
            this.breakIfNotRazossBrowser();
            var b = window.external.rapi_NewWindow(url, pos, showmode);
            return b;
        },
        
        closeWindow: function (id) {
            this.breakIfNotRazossBrowser();
            
            var b = window.external.rapi_CloseWindow(id);
            return b;
        },
        
        getCurrentSize: function () {
            this.breakIfNotRazossBrowser();
            
            var w = -1;
            var h = -1;
            try {
                w = window.external.rapi_GetCurrentWidth();
                h = window.external.rapi_GetCurrentHeight();
            }
            catch (err) {
                w = h = -1;
            }

            return {width: w, height: h};
        },
        
        dock: function (pos) {
            this.breakIfNotRazossBrowser();
            window.external.rapi_Dock(pos);
        },
        dockEx: function (state) {
            this.breakIfNotRazossBrowser();
            window.external.rapi_Dock(pos);
        },
        
        resize: function (width, height, keepPosition/*=true by default*/) {
            this.breakIfNotRazossBrowser();
            
            if (keepPosition === undefined) {
                keepPosition = true;
            }

            window.external.rapi_Resize(width, height, keepPosition);
        },
        
        resizeKeepPosition: function (width, height, keepPosition) {
            this.breakIfNotRazossBrowser();

            window.external.rapi_Resize(width, height, keepPosition);
        },
        
        show: function (showmode) {
            this.breakIfNotRazossBrowser();
            
            window.external.rapi_Show(showmode);
        },
        
        isVisible: function () {
            this.breakIfNotRazossBrowser();
            
            var bVisible = window.external.rapi_IsVisible();
            return bVisible;
        },
        
        close: function () {
            this.breakIfNotRazossBrowser();
            
            var b = window.external.rapi_Close();
            return b;
        },
        
        closeAllButThis: function () {
            this.breakIfNotRazossBrowser();
            
            var b = window.external.rapi_CloseAllButThis();
            return b;
        },
        
        getWindowPos: function () {
            this.breakIfNotRazossBrowser();
        },
        
        setWindowPos: function () {
            this.breakIfNotRazossBrowser();
        },
        
        setPositionOffset: function () {
        },
        
        setTrasparentColor: function (col) {
            this.breakIfNotRazossBrowser();
            
            window.external.rapi_SetTransparency(col);
        },
        
        getTrasparentColor: function () {
            this.breakIfNotRazossBrowser();
            var col = window.external.rapi_GetTransparency();
            return col;
        },
        
        setOpacity: function (alpha) {
            this.breakIfNotRazossBrowser();
            window.external.rapi_SetOpacity(alpha);
        },
        
        getOpacity: function () {
            this.breakIfNotRazossBrowser();
            return window.external.rapi_GetOpacity();
        },
        
        moveWindow: function (position, x, y) {
            this.breakIfNotRazossBrowser();
            window.external.rapi_MoveWindow(position, x, y);
        },
        
        FBLogin: function(type, appid, appsecret,permissions)
        {
          window.external.rapi_FBLogin(type,appid,appsecret,permissions);
        } ,
        
        FBLogout: function()
        {
          window.external.rapi_FBLogout();
        },
        
        ChatDisconnect: function(type)
        {
          window.external.rapi_ChatDisconnect(type);
        },
        
        ChatSendMessage: function(type, id, message)
        {
          window.external.rapi_ChatSendMessage(type,id,message);
        }
           
    };
    // }}}
} else {
    // RAPI V2 {{{
    var HPosition = {
        fill: 0,
        center: 1,
        left: 2,
        right: 3
    };

    var VPosition = {
        fill: 0,
        center: 4,
        top: 8,
        bottom: 12
    };

    var MovePosition = {
        absolute: 0,
        relative: 1
    };

    var NavigateTarget = {
        current: 0,
        newtab: 1,
        newwindow: 2
    };

    var ShowMode = {
        hide: 0,
        show: 1
    };

    var NewWindowBehavior = 
    {
        defaultBehavior: 0,
        razossPopup: 1,
        hostCurrentTab: 2,
        hostNewTab: 3
    };

    var KeywordsType = {
        all: 0,
        title: 1,
        description: 2,
        heading: 4,
        bold: 8
    };

    var rgw = {
        version: "0.2",
        RazossBrowser: false,

        onLoad: function () {
            try {
                //this.RazossBrowser = (window.external.rapi_IsRazossBrowser() != null);
                this.RazossBrowser = (typeof window.razoss !== 'undefined');
            }
            catch (e) {
                this.RazossBrowser = null;
            }
        },

        breakIfNotRazossBrowser: function () {
            if (!this.RazossBrowser) {
                throw ("Browser Not Supported");
            }
        },
        
        getFrameworkVersion: function () {
            this.breakIfNotRazossBrowser();
            return window.razoss.GetEngineVersion();
        },
        
        getFrameworkDate: function () {
            this.breakIfNotRazossBrowser();
            return window.razoss.GetEngineDate();
        },
        
        registerEvent: function (eventName, funcName, activeIfHidden) {
            this.breakIfNotRazossBrowser();

			if(activeIfHidden==undefined)
				activeIfHidden = true;
            
            var result = window.razoss.RegisterEvent(eventName, funcName);
            return result;
        },
        
        unregisterEvent: function (eventName) {
            this.breakIfNotRazossBrowser();
            
            var result = window.razoss.UnregisterEvent(eventName);
            return result;
        },
        
        navigate: function (url, target) {
        
            this.breakIfNotRazossBrowser();
            
            if (target === undefined) {
                target = NavigateTarget.current;
            }
                
            window.razoss.Navigate(url, target);
        },
        
        getCurrentPage: function () {
            this.breakIfNotRazossBrowser();
            var strURL = window.razoss.GetCurrentURL();
            return strURL;
        },
        
        getCurrentTitle: function () {
            this.breakIfNotRazossBrowser();
            var strTitle = window.razoss.GetCurrentTitle();
            
            return strTitle;
        },

        getEngineVariable: function (name) {
            this.breakIfNotRazossBrowser();
            return window.razoss.GetEngineVariable(name);
        },
        
        setStorageValue: function (name, value) {
            this.breakIfNotRazossBrowser();                
            window.razoss.SetStorageValue(name, value);
        },
        
        getStorageValue: function (name) {
            this.breakIfNotRazossBrowser();                
            return window.razoss.GetStorageValue(name);
        },
        
        isStorageValueExists: function (name) {
            this.breakIfNotRazossBrowser();                
            return window.razoss.IsStorageValueExists(name);
        },
        
        executeScript: function (exescript) {
            this.breakIfNotRazossBrowser();                
            window.razoss.ExecuteScript(exescript);
        },

        getPageSource: function () {
            this.breakIfNotRazossBrowser();
            return window.razoss.GetPageSource();
        },
        
        setNewWindowBehavior: function (url, value) {
            this.breakIfNotRazossBrowser();
            //window.external.rapi_SetNewWindowBehavior(url, value);
        },

        dock: function (pos) {
            this.breakIfNotRazossBrowser();
            window.razoss.Dock(pos);
        },
        
        resize: function (width, height, keepPosition/*=true by default*/) {
            this.breakIfNotRazossBrowser();
            
            if (keepPosition === undefined) {
                keepPosition = true;
            }
            window.razoss.Resize(width, height, keepPosition);
        },
        
        resizeKeepPosition: function (width, height, keepPosition) {
            this.breakIfNotRazossBrowser();
            window.razoss.Resize(width, height, keepPosition);
        },
        
        show: function (showmode) {
            this.breakIfNotRazossBrowser();
            window.razoss.Show(showmode);
        },
        
        setTrasparentColor: function (col) {
            this.breakIfNotRazossBrowser();
            window.razoss.SetTransparency(col);
        },
        
        getTrasparentColor: function () {
            this.breakIfNotRazossBrowser();
            return "#" + window.razoss.GetTransparency();
        },
        
        setOpacity: function (alpha) {
            this.breakIfNotRazossBrowser();
            window.razoss.SetOpacity(alpha);
        },
        
        getOpacity: function () {
            this.breakIfNotRazossBrowser();
            return window.razoss.GetOpacity();
        }
    };
    // }}}
}

rgw.onLoad();

// vim:fdm=marker:fmr={{{,}}}:
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

    // getInstaceId {{{
    $.RazossApi.prototype.getInstaceId = function () {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.getEngineVariable("hostinstanceid");
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
                    /(chrome)[ \/]([\w.]+)/.exec(host_browser_ua) ||
                    /(webkit)[ \/]([\w.]+)/.exec(host_browser_ua) ||
                    /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(host_browser_ua) ||
                    /(msie) ([\w.]+)/.exec(host_browser_ua) ||
                    !/compatible/.test(host_browser_ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(host_browser_ua) || [];

            if (ua[1] === 'msie') {
                ua[1] = 'ie';
            }

            if (ua[1] === 'chrome') {
                ua[1] = 'webkit';
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

    // isChatAvailable {{{
    $.RazossApi.prototype.isChatAvailable = function () {
        var self = this;

        if (self.environment === 'razoss_browser') {
            if (typeof window.external !== 'undefined' && typeof window.external.rapi_FBLogin !== 'undefined') {
                return true;
            }
        }

        return false;
    };
    // }}}

    // fbLogin {{{
    $.RazossApi.prototype.fbLogin = function (type, appid, appsecret, permissions) {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.FBLogin(type, appid, appsecret, permissions);
        }
    };
    // }}}

    // fbLogout {{{
    $.RazossApi.prototype.fbLogout = function () {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.FBLogout();
        }
    };
    // }}}

    // chatDisconnect {{{
    $.RazossApi.prototype.chatDisconnect = function (type) {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.ChatDisconnect(type);
        }
    };
    // }}}

    // chatConnect {{{
    $.RazossApi.prototype.chatConnect = function (type) {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.ChatConnect(type);
        }
    };
    // }}}

    // chatSendMessage {{{
    $.RazossApi.prototype.chatSendMessage = function (type, id, message) {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.ChatSendMessage(type, id, message);
        }
    };
    // }}}

    // executeScript {{{
    $.RazossApi.prototype.executeScript = function (script) {
        var self = this;

        if (self.environment === 'razoss_browser') {
            return rgw.executeScript(script);
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
