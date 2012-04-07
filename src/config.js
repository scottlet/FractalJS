/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*jshint plusplus: false, smarttabs:true */
/*globals FF:false,$:false, TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
/**
 * This is the set of core components that the library requires to run.
 * If using the automatic build tools, these will be included. If not,
 * they will be dynamically loaded one at a time. You can use FF.requires
 * elsewhere in your codebase to load your own components, you can also use it to
 * lazy load code.
 */
FF.requires(
	[
	// utils
		'core.utils.Core',
		'core.utils.ArrayUtils',
	//Controllers
		'core.controllers.BaseController',
	// Views
		'core.views.BaseView',
	//uis
		'core.uis.BaseUI',
		'core.mixins.Native',
	//events
		'core.Events'
	],
	function () {
		"use strict";
		FF.finished = true;
	}
);