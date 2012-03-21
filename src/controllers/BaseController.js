/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * @author Scott van Looy
 */

FF.reqNameSpace('FF.controllers');
(function (controllers) {
	var BaseController = this;
	/** Private methods **/
	/** Public methods **/
	BaseController.callView = function (ns, view) {
		if (typeof ns[view] === "function") {
			ns[view] = new ns[view]();
			ns[view].controller = this;
			this.view = ns[view];
		}
		return ns[view];
	};
	controllers.BaseController = BaseController;
}(FF.controllers));
