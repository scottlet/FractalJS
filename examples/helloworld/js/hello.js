/**
 * @author scottvanlooy
 */

/**
 * create namespaces
 */
var HelloNamespace = {};
HelloNamespace.uis = {};

/** Create objects - for such a small page you'd probably not use a view/controller, but as your pages get more complex, it's a useful paradigm **/

/**
 * Controller - controls data in and out of the front end.
 */
HelloNamespace.Controller = function(){
	var that = this;
	var init = function(){
		that.enter(true);
	};
	that.enter = function(runonce){
		if(runonce){
			// Things you only need to run once.
			that.view = that.createView(HelloNamespace,'View');
		}else{
			that.view.enter();
		}
	};
	init();
};

/**
 * View - controls the UIs in the front end.
 * @param {Object} controller
 */
HelloNamespace.View = function(controller){
	var that = this;
	that.controller = controller;
	var init = function(){
		that.enter(true);
	};
	that.enter = function(runonce){
		that.requires([
			'HelloWorld'
		]);
		if(runonce){
			// Things you only need to run once.
		}
	};
	init();
};

HelloNamespace.uis.HelloWorld = function(view){
	var that=this;
	that.view = view;
	var init = function(){
		that.setupUI('HelloWorld');
	};
	init();
};
HelloNamespace.Controller = J$.createController(HelloNamespace.Controller);
HelloNamespace.View = J$.createView(HelloNamespace.View);
HelloNamespace.uis.HelloWorld = J$.createUI(HelloNamespace.uis.HelloWorld);
