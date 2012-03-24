/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
TestCase("Test the fractaljs methods", {
	setUp: function () {
		delete FF.namespace;
	},
	"test reqNameSpace function to request a namespace" : function () {
		expectAsserts(4);
		assertUndefined(FF.namespace);
		FF.reqNameSpace('FF.namespace');
		assertObject(FF.namespace);
		FF.reqNameSpace('FF.core.views');
		assertObject(FF.core.views);
		FF.reqNameSpace('FF.core.views.namespace');
		assertObject(FF.core.views.namespace);
	}/*,
	"test requires function to request an additional module" : function () {
		expectAsserts(2);
		assertNoException(function () {
			FF.baseUrl += '../test/';
			FF.requires(['foo'], FF);
		});
		assertObject(FF.foo);
	}*/
});