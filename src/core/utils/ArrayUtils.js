/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*jshint plusplus: false, smarttabs:true */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/

/**
 * @author Scott van Looy
 */
FF.reqNameSpace('FF.core.utils');
/**
 * takes two arrays of strings and combines them, removing duplicates
 * @param arr1 {Array} - first array to combine
 * @param arr2 {Array} - second array to combine
 * @return ret {Array} - deduped unsorted array of strings
 */
(function (utils) {
	"use strict";
	var ArrayUtils = {};
/** API METHODS **/
	ArrayUtils.combine = function (arr1, arr2) {
		var tarr = arr1.concat(arr2),
			l = tarr.length,
			o = {},
			ret = [],
			n,
			name;
		for (n = 0; n < l; n++) {
			o[tarr[n]] = true;
		}
		for (name in o) {
			if (o.hasOwnProperty(name)) {
				ret.push(name);
			}
		}
		return ret;
	};
	utils.ArrayUtils = ArrayUtils;
}(FF.core.utils));
