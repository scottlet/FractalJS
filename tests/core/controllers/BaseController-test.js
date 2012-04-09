/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, test:false, assertObject:false*/
TestCase("Test the BaseController object", {
	setUp : function () {
		FF.reqNameSpace('test');
		test.TestController = function () {
			var that = this;
			this.getExampleText = function () {
				return "example text";
			};
			this.enter = function () {
				that.callView(test, 'TestView');
			};
		};
		test.TestView = function () {
			var that = this;
			var init = function () {
				return that.enter();
			};
			this.enter = function () {
				return "example text 2";
			};
			init();
		};
		FF.core.views.BaseView.createView(test.TestView);
	},
	tearDown : function () {
		test.TestController = null;
		test.TestView = null;
	},
	"test creation of controller using createController" : function () {
		expectAsserts(4);
		assertNoException(function () {
			FF.core.controllers.BaseController.createController(test.TestController);
		});
		test.TestController = new test.TestController();
		assertFunction(test.TestController.callView);
		test.TestController.enter();
		assertObject(test.TestView);
		assertEquals(test.TestController.getExampleText(), "example text");
	}
});