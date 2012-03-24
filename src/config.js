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
		'extras.mixins.jQuery',
		'extras.utils.Console',
		'extras.utils.HashMap'
	]);