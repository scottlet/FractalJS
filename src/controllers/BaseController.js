/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * @author Scott van Looy
 * @constructor
 */
FF.reqNameSpace('FF.controllers');
(function (controllers) {
	var BaseController = {};
	/** Private methods **/
	/** Public methods **/
	BaseController.callView = function (namespace, view) {
		if (typeof namespace[view] === "function") {
			namespace[view] = new namespace[view]();
			namespace[view].controller = this;
			this.view = namespace[view];
		}
		return namespace[view];
	};
	controllers.BaseController = BaseController;
}(FF.controllers));
