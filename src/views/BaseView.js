/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: false, indent: 4 */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/

/**
 * @author Scott van Looy
 */

FF.reqNameSpace('FF.views');
(function (views) {
	var BaseView = this;
	/** PRIVATE METHODS **/
	var defaults = [];
	
	var loadComponents = function (ns, arr, view, defaults) {
		var l = arr.length;
		while (l--) {
			if (arr[l] && ns[arr[l]]) {
				var ui = ns[arr[l]];
				if (typeof ui === 'function') {
					ui = new ui(view);
				} else {
					ui.setView(view);
				}
				if (defaults) {
					defaults.push(ui);
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
	BaseView.requires = function (ns, arr, view) {
		var uiMap = FF.utils.ArrayUtils.combine(arr, defaults);
		loadComponents(ns, arr, view);
	};
	views.BaseView = BaseView;
}(FF.views));