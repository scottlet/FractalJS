FF.reqNameSpace('FF.utils');
(function (utils) {
	var Console = (function () {
		var nlog = function (type) {
			if (!window.console) {
				return function () {
					window.alert('type: ' + type + ' ' + arguments);
				};
			} else {
				return function () {
					window.console[type](arguments);
				};
			}
		};
		var log = new nlog('log');
		var warn = new nlog('warn');
		var error = new nlog('error');
		return {
			log: log,
			warn: warn,
			error: error
		};

	})()
}(FF.utils));