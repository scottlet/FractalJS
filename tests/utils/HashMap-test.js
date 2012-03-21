/*jslint evil:false, sloppy:false, undef:true, white:true, browser:true, plusplus:true */
/*global ns:true, $:false, window:false, document:false */
TestCase("testHashMap", {
	testPut : function () {
		expectAsserts(1);
		var hash = new FF.utils.HashMap();
        	hash.put('me', 'myself');
        	assertEquals(hash.get('me'), "myself");
	},
	testClear : function () {
		expectAsserts(2);
		var hash = new FF.utils.HashMap();
        	hash.put('me', 'myself');
        	assertEquals(hash.get('me'), "myself");
        	hash.clear();
        	assertEquals(hash.get('me'), undefined);
	},
	testClone : function () {
		expectAsserts(2);
		var hash = new FF.utils.HashMap();
		hash.put('me', 'myself');
		hash.put('no', 'way');
		var moo = hash.clone();
		assertEquals(hash.get('me'), moo.get('me'));
		assertEquals(hash.size(), moo.size());
	},
	testContainsKey: function () {
		expectAsserts(2);
		var hash = new FF.utils.HashMap();
		hash.put('me', 'myself');
		assertTrue(hash.containsKey('me'));
		assertFalse(hash.containsKey('you'));
	},
	testContainsValue: function () {
		expectAsserts(2);
		var hash = new FF.utils.HashMap();
		hash.put('me', 'myself');
		assertTrue(hash.containsValue('myself'));
		assertFalse(hash.containsValue('you'));
	},
	testEntrySet: function () {
		expectAsserts(1);
		var hash = new FF.utils.HashMap();
		assertException(function(){hash.entrySet()});
	},
	testGet: function () {
		expectAsserts(2);
		var hash = new FF.utils.HashMap();
		hash.put('me', 'myself');
		assertEquals(hash.get('me'), 'myself');
		assertNotEquals(hash.get('me'), 'boo');
	},
	testIsEmpty: function () {
		expectAsserts(2);
		var hash = new FF.utils.HashMap();
		assertTrue(hash.isEmpty());
		hash.put('me', 'myself');
		assertFalse(hash.isEmpty());
	},
	testKeySet: function () {
		expectAsserts(1);
		var hash = new FF.utils.HashMap();
		hash.put('me', 'myself');
		hash.put('you', 'myself');
		assertEquals(hash.keySet(), ['me','you']);
	},
	testPut: function () {
		expectAsserts(2);
		var hash = new FF.utils.HashMap();
		assertEquals(hash.get('me'), undefined);
		hash.put('me', 'myself');
		assertEquals(hash.get('me'), 'myself');
	},
	testPutAll: function () {
		expectAsserts(2);
		var hash = new FF.utils.HashMap();
		hash.putAll({
			me: 'myself', 
			you: 'yourself'
		});
		assertEquals(hash.get('me'), 'myself');
		assertEquals(hash.get('you'), 'yourself');
	},
	testRemove: function () {
		expectAsserts(2);
		var hash = new FF.utils.HashMap();
		hash.put('me', 'myself');
		assertEquals(hash.get('me'), 'myself');
		hash.remove('me');
		assertEquals(hash.get('me'), undefined);
	},
	testSize: function () {
		expectAsserts(1);
		var hash = new FF.utils.HashMap();
		hash.putAll({
			me: 'myself', 
			you: 'yourself',
			brian: 'brian'
		});
		hash.put('bob', 'bob');
		hash.put('you', 'you');
		hash.remove('me');
		assertEquals(hash.size(), 3);
	},
	testToString: function () {
		expectAsserts(1);
		var hash = new FF.utils.HashMap();
		hash.putAll({
			me: 'myself', 
			you: 'yourself',
			brian: 'brian'
		});
		assertEquals(hash.toString(),"me=myself,you=yourself,brian=brian");
	},
	testValues: function () {
		expectAsserts(1);
		var hash = new FF.utils.HashMap();
		hash.putAll({
			me: 'myself', 
			you: 'yourself',
			brian: 'brian'
		});
		assertEquals(hash.values(),["myself", "yourself", "brian"]);
	}
});