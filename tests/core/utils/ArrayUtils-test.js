/*jslint bitwise: false, sloppy:true, browser: true, newcap:true, windows: false, evil: false, white: false, plusplus: true, indent: 4 */
/*globals
	FF:false,
	TestCase:false,
	assertEquals:false,
	expectAsserts:false,
	assertFunction:false,
	assertNotUndefined:false,
	assertNoException:false,
	assertObject:false,
	assertTrue,
	assertFalse,
	assertException:false,
	assertNotEquals:false,
	test:false
*/
TestCase("Test the ArrayUtils object", {
	testCombine : function () {
		expectAsserts(1);
		var Array1 = ['my', 'funky', 'array'],
			Array2 = ['my', 'awesome', 'array'],
			finalArray = FF.core.utils.ArrayUtils.combine(Array1, Array2);
		assertEquals(finalArray, ['my', 'funky', 'array', 'awesome']);
	}
});