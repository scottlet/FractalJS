/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false, assertObject:false*/
var test = {};
TestCase("Test the BaseView object", {
	setUp : function () {
		FF.reqNameSpace('test');
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
	},
	tearDown : function () {
		test.TestView = null;
	},
	"test creation of view" : function () {
		expectAsserts(2);
		
		
		assertNoException(function () {
			FF.core.views.BaseView.createView(test.TestView);
		});
		test.TestView = new test.TestView();
		assertObject(test.TestView);
	},
	"test BaseView API methods exist on new child View" : function () {
		FF.core.views.BaseView.createView(test.TestView);
		test.TestView = new test.TestView();
		assertFunction(test.TestView.setDefaultComponents);
		assertFunction(test.TestView.requires);
		assertEquals(test.TestView.enter(), "example text 2");
	}
});