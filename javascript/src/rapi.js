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
