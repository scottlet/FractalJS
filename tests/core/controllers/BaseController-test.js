/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
TestCase("Test the BaseController object", {
	setUp : function () {
		FF.reqNameSpace('test');
		test.TestController = function () {
			return {
				getExampleText : "example text"
			};
		};
		test.TestView = function () {
			return {
				enter : "example text"
			};
		};
		FF.createView(test.TestView);
	},
	tearDown : function () {
		test.TestController = null;
		test.TestView = null;
	},
	testCreation : function () {
		expectAsserts(3);
		
		
		assertNoException(function () {
			FF.createController(test.TestController);
		})
		test.TestController = new test.TestController();
		assertFunction(test.TestController.callView);
		assertEquals(test.TestController.getExampleText(), "example text");
	}
});