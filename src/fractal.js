/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: false, indent: 4 */
/*globals FF:true,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, window:false*/
/**
 * @author scottvanlooy
 */
var FF = {};
(function (namespace) {
	/** PRIVATE METHODS **/
	var extend = function (item, inheritant) {
		item.prototype = inheritant;
		item.constructor = item;
	};
	var init = function () {
		namespace.requires(['config']);
	}
	/** API METHODS **/
	
	/**
	 * reqNameSpace. Requests a namespace. If the namespace does not exist, it will 
	 * be created
	 * @param {string} req - request in the format of 'my.name.space'
	 * @param {Object} test
	 */
	namespace.reqNameSpace = function (req, test) {
		if (!req || typeof req !== "string" || !req.match('\\.')) {
			namespace.Console.error('getNameSpace error - requires a string in the format "my.name.space"');
			return null;
		}
		var t = req.split('.'),
			tns = window,
			l = t.length;
		for (var x = 0; x < l; x++) {
			if (tns[t[x]]) {
				tns = tns[t[x]];
			}
			else {
				if (test) {
					return false;
				}
				tns = tns[t[x]] = {};
			}
		}
	};
	/**
	 * requires method. Using the location of fractal.min?.js as the base, can
	 * load other modules. Checks to see if they exist and if they don't, we grab
	 * the module.
	 * @param {Array} requires - array of strings representing a component's path.
	 * 'myapp/main/Hello.js' would be written as 'myapp.main.Hello' and Hello.js
	 * would contains an object at the same namespace 
	 * (myapp.main.Hello = (function(){}()))
	 * @param {function=} callback. Optional callback to run when loading is complete.
	 * @author Scott van Looy
	 */
	namespace.requires =  function (requires, callback) {
		var l = requires.length,
			src,
			load = 0,
			s,
			n;
		for (n = 0; n < l; n++) {
			if (typeof namespace[requires[n]] === "undefined") {
				src = this.baseUrl + requires[n].replace(/\./gi, '/') + '.js';
				if (namespace.finished) {
					s = document.createElement('script');
					s.type = 'text/javscript';
					s.src = src;
					document.getElementsByTagName('head')[0].appendChild(s);
				} else {
					document.write('<script type="text/javascript" src="' + src + '"></script>');
					s = document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1];
				}
				load++;
			}
		}
		if (load) {
			s.onload = function (){
				if (callback) {
					callback();
				}
				
			}
		} else {
			if (callback) {
				callback();
			}
		}
	};
	/**
	 * baseUrl = the base URL for library scripts - determined by the location of 
	 * fractal.min?.js
	 * @return {string}
	 */
	namespace.baseUrl = (function () {
		var s = document.getElementsByTagName('script');
		var m = s[s.length - 1];
		return m.src.replace(/[^\/]+?$/, '');
		
	})();

	/**
	 * createController - takes an object and extends it with the BaseController
	 * @param {Object} object to extend;
	 * @return {Object} extended object
	 */
	namespace.createController = function (object) {
		return extend(object, namespace.core.controllers.BaseController);
	};
	
	/**
	 * createView - takes an object and extends it with the BaseView
	 * @param {Object} object to extend;
	 * @return {Object} extended object
	 */
	namespace.createView = function (object) {
		return extend(object, namespace.core.views.BaseView);
	};
	
	/**
	 * createUI - takes an object and extends it with the BaseUI
	 * @param {Object} object to extend;
	 * @return {Object} extended object
	 */
	namespace.createUI = function (object) {
		return extend(object, namespace.core.uis.BaseUI);
	};
	namespace.mixins = {};
	namespace.core = {};
	namespace.extras = {};
	namespace.NOOP = function(){};
	namespace.Console = namespace.NOOP;
	init();
}(FF));
