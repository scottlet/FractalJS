/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4, vars: true, evil:true, regexp:true */
/*jshint plusplus: false, smarttabs:true, regexp:false */
/*globals FF:true,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, window:false*/
/**
 * @author scottvanlooy
 */
/**
 * @namespace contains the library.
 */
var FF = {};
(function (namespace) {
	"use strict";
	var
	/** PRIVATE METHODS **/
		/**
		 * initialise the object
		 * @private
		 */
		init = function () {
			Function.prototype.partial = Function.prototype.partial || function () {
				var fn = this, args = Array.prototype.slice.call(arguments);
				return function () {
					var myArgs = Array.prototype.slice.call(arguments);
					var arg = 0,
						i,
						n = 0,
						l = args.length,
						ll = myArgs.length;
					for (i = 0; i < l; i++) {
						if (typeof args[i] === "undefined") {
							args.splice(i, 1);
							while (ll--) {
								n++;
								args.splice(i, 0, myArgs[ll]);
							}
						}
					}
					return fn.apply(this, args);
				};
			};
			namespace.mixins = namespace.mixins || {};
			namespace.core = namespace.core || {};
			namespace.extras = namespace.extras || {};
			namespace.NOOP = function () {};
			namespace.Console = namespace.Console || namespace.NOOP;
			namespace.requires('config');
		};
	/** API METHODS **/
	/**
	 * reqNameSpace. Requests a namespace. If the namespace does not exist, it will
	 * be created
	 * @param {string} req - request in the format of 'my.name.space'
	 * @param {Object} test
	 */
	namespace.reqNameSpace = function (req, test) {
		var t,
			x,
			tns,
			l;
		if (!req || typeof req !== "string") {
			namespace.Console.error('getNameSpace error - requires a string in the format "my.name.space"');
			return null;
		}
		if (!req.match('\\.')) {
			t = [req];
		} else {
			t = req.split('.');
		}
		tns = window;
		l = t.length;
		for (x = 0; x < l; x++) {
			if (tns[t[x]]) {
				tns = tns[t[x]];
			} else {
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
	 */
	namespace.requires =  function (requires, callback) {
		var l = requires.length,
			src,
			load = 0,
			n,
			writeLoad = false,
			async = false,
			namespaceTest,
			loadScript;
		namespaceTest = function (namespace, test) {
			var ret = namespace,
				strArr = test.split('.'),
				l = strArr.length,
				p;
			for (p = 0; p < l; p++) {
				if (typeof ret !== "undefined") {
					ret = ret[strArr[p]];
				}
			}
			return ret;
		};
		loadScript = function (src, cb, len) {
			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = src;
			s.async = false;
			s.onload = s.onreadystatechange =  function () {
				var state = s.state;
				if ((!state || /loaded|complete/.test(state))) {
					load--;
					if (!load && len === n) {
						if (cb && !cb.called) {
							cb.call(this);
							cb.called = true;
						}
					}
				}
			};
			document.getElementsByTagName('head')[0].appendChild(s);
		};
		if (typeof requires === "string") {
			requires = [requires];
			l = requires.length;
		}
		for (n = 0; n < l; n++) {
			src = null;
			if (typeof namespaceTest(namespace, requires[n]) === "undefined") {
				src = this.baseUrl + requires[n].replace(/\./gi, '/') + '.js';
				if (namespace.finished) {
					writeLoad = false;
					async = true;
					load++;
					loadScript(src, callback, load, requires.length);
				} else {
					writeLoad = true;
					document.write('<script type="text/javascript" src="' + src + '"><\/script>');
				}
			}
		}
		if (writeLoad || !async) {
			if (callback) {
				callback();
			}
		}
	};
	/**
	 * The base URL for library scripts - determined by the location of
	 * fractal.min?.js
	 * @return {string}
	 */
	namespace.baseUrl = (function () {
		var s = document.getElementsByTagName('script');
		var m = s[s.length - 1];
		return m.src.replace(/[^\/]+?$/, '');
	}());
	/**
	 * Augment the object, adding a few shared methods to it.
	 * @param  {object} object the object to be augmented
	 * @return {object} the augmented object.
	 */
	namespace.augmentObject = function (object) {
		object.extend = object.extend || function (item, inheritant) {
			item.prototype = inheritant;
			item.constructor = item;
		};
		return object;
	};
	init();
}(FF));
