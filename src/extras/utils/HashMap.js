/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: false, indent: 4 */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * Copyright (c) 2011-2012, Scott van Looy, ThreeSquared.
 * All Rights Reserved.
 * @author Scott van Looy
 */
console.log('loaded hashmap')
FF.reqNameSpace('FF.extras.utils');

(function (utils) {
	var HashMap = function () {
		var that = this, 
			o = {}, 
			len = 0, 
			cloneret = {}, 
			ksret = [], 
			vret = [];
		/** PRIVATE METHODS **/
		var cempty = function () {
			cloneret = {};
			ksret = [];
			vret = [];
		};
		var clear = function () {
			cempty(); 	
			o = {};
		};
		var clone = function () {
			var ret = new HashMap();
			ret.putAll(o);
			return ret;
		};
		var containsKey = function (inkey) {
			return (o[inkey]) ? true : false;
		};
		var containsValue = function (inval) {
			for (var k in o) {
				if (o.hasOwnProperty(k)) {
					if (o[k] === inval) {
						return true;
					}
					return false;
				}
			}
		};
		var get = function (inkey) {
			return o[inkey];
		};
		var entrySet = function () {
			throw ('not implemented');
		};
		var isEmpty = function () {
			return !len;
		};
		var keySet = function () {
			if (!ksret.length) {
				for (var k in o) {
					if (o.hasOwnProperty(k)) {
						ksret.push(k);
					}
				}
			}
			return ksret;
		};
		var put = function (inkey, inval) {
			cempty();
			if (!o[inkey]) {
				len++;
			}
			o[inkey] = inval;
		};
		var putAll = function (inmap) {
			cempty();
			for (var k in inmap) {
				if (inmap.hasOwnProperty(k)) {
					if (!o[k]) {
						len++;
					}
					o[k] = inmap[k];
				}
			}
		};
		var remove = function (inkey) {
			if (o[inkey]) {
				delete o[inkey];
				len--;
			}
			cempty();
		};
		var size = function () {
			return len;
		};
		var toString = function () {
			var ret = [];
			for (var k in o) {
				if (o.hasOwnProperty(k)) {
					ret.push(k + '=' + o[k]);
				}
			}
			return ret.join();
		};
		var values = function () {
			if (!vret.length) {
				for (var k in o) {
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
