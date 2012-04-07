/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*jshint plusplus: false, smarttabs:true */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * Copyright (c) 2011-2012, Scott van Looy, ThreeSquared.
 * All Rights Reserved.
 * @author Scott van Looy
 */
FF.reqNameSpace('FF.extras.utils');

(function (utils) {
	"use strict";
	var HashMap = function () {
		var o = {},
			len = 0,
			cloneret = {},
			ksret = [],
			vret = [],
		/** PRIVATE METHODS **/
			cempty = function () {
				cloneret = {};
				ksret = [];
				vret = [];
			},
			clear = function () {
				cempty();
				o = {};
			},
			clone = function () {
				var ret = new HashMap();
				ret.putAll(o);
				return ret;
			},
			containsKey = function (inkey) {
				return (o[inkey]) ? true : false;
			},
			containsValue = function (inval) {
				var k;
				for (k in o) {
					if (o.hasOwnProperty(k)) {
						if (o[k] === inval) {
							return true;
						}
						return false;
					}
				}
			},
			get = function (inkey) {
				return o[inkey];
			},
			entrySet = function () {
				throw ('not implemented');
			},
			isEmpty = function () {
				return !len;
			},
			keySet = function () {
				var k;
				if (!ksret.length) {
					for (k in o) {
						if (o.hasOwnProperty(k)) {
							ksret.push(k);
						}
					}
				}
				return ksret;
			},
			put = function (inkey, inval) {
				cempty();
				if (!o[inkey]) {
					len++;
				}
				o[inkey] = inval;
			},
			putAll = function (inmap) {
				var k;
				cempty();
				for (k in inmap) {
					if (inmap.hasOwnProperty(k)) {
						if (!o[k]) {
							len++;
						}
						o[k] = inmap[k];
					}
				}
			},
			remove = function (inkey) {
				if (o[inkey]) {
					delete o[inkey];
					len--;
				}
				cempty();
			},
			size = function () {
				return len;
			},
			toString = function () {
				var ret = [],
					k;
				for (k in o) {
					if (o.hasOwnProperty(k)) {
						ret.push(k + '=' + o[k]);
					}
				}
				return ret.join();
			},
			values = function () {
				var k;
				if (!vret.length) {
					for (k in o) {
						if (o.hasOwnProperty(k)) {
							vret.push(o[k]);
						}
					}
				}
				return vret;
			};
		/** API METHODS **/
		return {
			clear : clear,
			clone : clone,
			containsKey : containsKey,
			containsValue : containsValue,
			entrySet : entrySet,
			get : get,
			isEmpty : isEmpty,
			keySet : keySet,
			put : put,
			putAll : putAll,
			remove : remove,
			size : size,
			toString : toString,
			values : values
		};
	};
	utils.HashMap = HashMap;
}(FF.extras.utils));
