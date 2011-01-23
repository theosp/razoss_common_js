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
