TestCase("testHashMap", {
	putTest : function () {
		expectAsserts(1);
		var hash = new J$.utils.HashMap();
        	hash.put('me', 'myself');
        	assertEquals(hash.get('me'), "myself");
	},
	clearTest : function () {
		expectAsserts(2);
		var hash = new J$.utils.HashMap();
        	hash.put('me', 'myself');
        	assertEquals(hash.get('me'), "myself");
        	hash.clear();
        	assertNull(hash.get('me'));
	}
});
