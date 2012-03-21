TestCase("testArrayUtils", {
	testCombine : function () {
		expectAsserts(1);
		var Array1 = ['my', 'funky', 'array'];
		var Array2 = ['my', 'awesome', 'array'];
		var finalArray = J$.utils.ArrayUtils.combine(Array1, Array2);
		assertEquals(finalArray, ['my', 'funky', 'array', 'awesome']);
	}
});