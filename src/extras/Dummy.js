FF.getNameSpace('FF.extras');
(function (namespace) {
	var Dummy = {
		iExist : function () {
			return 'iDo';
		}
	};
	namespace.Dummy = Dummy;
	console.log('compleat')
}(FF.extras));
console.log('loadeth')
alert('ere')
