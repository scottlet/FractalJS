/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
TestCase("Test the fractaljs methods", {
	setUp: function () {
		delete FF.namespace;
	},
	"test reqNameSpace" : function () {
		expectAsserts(4);
		assertUndefined(FF.namespace);
		FF.reqNameSpace('FF.namespace');
		assertObject(FF.namespace);
		FF.reqNameSpace('FF.views');
		assertObject(FF.views);
		FF.reqNameSpace('FF.views.namespace');
		assertObject(FF.views.namespace);
	},
	testClear : function () {
		expectAsserts(0);
	}
});