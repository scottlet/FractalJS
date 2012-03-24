/*jslint bitwise: false, browser: true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals FF:false,TestCase:false,assertEquals:false,expectAsserts:false,assertFunction:false,assertNoException:false*/
TestCase("Test the ArrayUtils object", {
	testCombine : function () {
		expectAsserts(1);
		var Array1 = ['my', 'funky', 'array'];
		var Array2 = ['my', 'awesome', 'array'];
		var finalArray = FF.core.utils.ArrayUtils.combine(Array1, Array2);
		assertEquals(finalArray, ['my', 'funky', 'array', 'awesome']);
	}
});