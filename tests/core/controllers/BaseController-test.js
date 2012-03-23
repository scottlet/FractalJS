/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
var Foo;
TestCase("Test the BaseController object", {
	setUp: function () {
		Foo = function () {
			"use strict";
			this.myFunction = function () {
				return 'my function';
			};
		};
	},
	testCreateController : function () {
		"use strict";
		expectAsserts(4);
		assertNoException(function () {
			FF.createController(Foo);
			Foo = new Foo();
		});
		assertFunction(Foo.myFunction);
		assertEquals(Foo.myFunction(), 'my function');
		assertFunction(Foo.callView);
	}
});