/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*jshint plusplus: false, smarttabs:true */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, jQuery:false, window:false*/
/**
 * @author scottvanlooy
 */

/**
 * create namespaces
 */
var HelloNamespace = {};
(function (ns) {
	"use strict";
	/**
	 * Create objects - for such a small page you'd probably not use a
	 * view/controller, but as your pages get more complex, it's a useful paradigm
	**/
	/**
	 * Controls data in and out of the front end.
	 * @constructor
	 */
	ns.Controller = function () {
		var that = this,
			init = function () {
				that.enter(true);
			};
		that.enter = function (runonce) {
			that.callView(ns, 'View');
		};
		init();
	};
	/**
	 * View - controls the UIs in the front end.
	 * @param {Object} controller
	 */
	ns.View = function (controller) {
		var that = this,
			init = function () {
				that.enter(true);
			};
		that.controller = controller;
		that.enter = function (runonce) {
			that.requires(
				ns.uis,
				[
					'HelloWorld'
				],
				that
			);
			/** if (runonce) {
				// Things you only need to run once.
			} **/
		};
		init();
	};
	ns.uis = {};
	ns.uis.HelloWorld = function (view) {
		var HelloWorld = this,
			init = function () {
				HelloWorld.setupUI('HelloWorld');
			};
		HelloWorld.view = view;
		init();
	};
	FF.core.uis.BaseUI.createUI(ns.uis.HelloWorld);
	FF.core.views.BaseView.createView(ns.View);
	FF.core.controllers.BaseController.createController(ns.Controller);
	ns.Controller = new ns.Controller();
}(HelloNamespace));
