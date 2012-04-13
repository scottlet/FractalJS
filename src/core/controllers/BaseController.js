/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*jshint plusplus: false, smarttabs:true */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * @author Scott van Looy
 * @constructor
 */
FF.reqNameSpace('FF.core.controllers');
(function (controllers) {
	"use strict";
	var BaseController = FF.augmentObject({});
	/** Private methods **/
	/** Public methods **/
	/**
	 * On enter of your child controller, you call the view associated with that controller
	 * using the callView method. It either instantiates the view or if it already exists
	 * it calls "enter" on it. Your view's init must also call enter
	 * @param  {Object} namespace your namespace
	 * @param  {string} view      the name of the view you're calling.
	 * @return {Object}           returns the instantiated view.
	 */
	BaseController.callView = function (namespace, view) {
		var ret;
		if (typeof namespace[view] === "function") {
			namespace[view] = new namespace[view]();
			namespace[view].controller = this;
			this.view = namespace[view];
		} else {
			namespace[view].enter();
		}
		return namespace[view];
	};
	/**
	 * createController - takes an object and extends it with the BaseController
	 * @param {Object} object to extend;
	 * @return {Object} extended object
	 */
	BaseController.createController = BaseController.extend.curry(undefined, BaseController);
	controllers.BaseController = BaseController;
}(FF.core.controllers));
