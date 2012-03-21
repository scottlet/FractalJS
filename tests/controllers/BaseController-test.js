var foo = function(){
	this.myFunction = function () {
		return 'my function';
	};
};
TestCase("testBaseController", {
	testCreateController : function () {
		expectAsserts(3);
		assertNoException(function () {
			J$.createController(foo);
			foo = new foo();
		});
		assertEquals(foo.myFunction(), 'my function');
		assertFunction(foo.callView);
	},
	testClear : function () {
		expectAsserts(0);
	}
});