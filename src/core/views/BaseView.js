/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: false, indent: 4 */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/

/**
 * @author Scott van Looy
 */

FF.reqNameSpace('FF.views');
(function (views) {
	var BaseView = {};
	/** PRIVATE METHODS **/
	var defaults = [];
	
	var loadComponents = function (namespace, arr, view, addToDefaults) {
		var l = arr.length;
		while (l--) {
			if (arr[l] && namespace[arr[l]]) {
				if (typeof namespace[arr[l]] === 'function') {
					namespace[arr[l]] = new namespace[arr[l]](view);
				} else {
					namespace[arr[l]].setView(view);
				}
				if (addToDefaults) {
					defaults.push(arr[l]);
				}
			}
		}
	};
	
	/** API METHODS **/
	/**
	 * 
	 * @param {Object} ns - the namespace your UIs can be found under.
	 * @param {string} arr - An array of UI names.
	 */
	BaseView.setDefaultComponents = function (ns, arr) {
		defaults = [];
		loadComponents(ns, arr, null, true);
	};
	BaseView.requires = function (namespace, arr, view) {
		var uiMap = FF.utils.ArrayUtils.combine(arr, defaults);
		loadComponents(namespace, uiMap, view);
	};
	views.BaseView = BaseView;
}(FF.views));