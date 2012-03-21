/**
 * @author scottvanlooy
 */

/**
 * create namespaces
 */
var HelloNamespace = {};

(function(ns){
	/** Create objects - for such a small page you'd probably not use a view/controller, but as your pages get more complex, it's a useful paradigm **/
	
	/**
	 * Controller - controls data in and out of the front end.
	 */
	ns.Controller = function(){
		var that = this;
		var init = function(){
			that.enter(true);
		};
		that.enter = function(runonce){
			that.callView(ns,'View');
		};
		init();
	};
	J$.createController(ns.Controller);
	
	/**
	 * View - controls the UIs in the front end.
	 * @param {Object} controller
	 */
	ns.View = function(controller){
		var that = this;
		that.controller = controller;
		var init = function(){
			that.enter(true);
		};
		that.enter = function(runonce){
			that.requires(
				ns, 
				[
				'HelloWorld'
				],
				that);
			if(runonce){
				// Things you only need to run once.
			}
		};
		init();
	};
	J$.createView(ns.View);
	ns.uis = {};
	ns.uis.HelloWorld = function(view){
		var that=this;
		that.view = view;
		var init = function(){
			that.setupUI('HelloWorld');
		};
		init();
	};
	J$.createUI(ns.uis.HelloWorld);
	ns.Controller = new ns.Controller();
}(HelloNamespace));
