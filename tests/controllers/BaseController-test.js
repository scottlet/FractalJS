/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
var Foo = function () {
	"use strict";
	this.myFunction = function () {
		return 'my function';
	};
};

TestCase("Test the base controller", {
	testCreateController : function () {
		"use strict";
		expectAsserts(3);
		assertNoException(function () {
			FF.createController(Foo);
			Foo = new Foo();
		});
		assertEquals(Foo.myFunction(), 'my function');
		assertFunction(Foo.callView);
	}
});