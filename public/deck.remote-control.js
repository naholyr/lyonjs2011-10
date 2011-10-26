$(function() {

	// Remote control
	if ('undefined' != typeof io) {
		(function (socket) {
			var remoting = true, warned = false;
			// Enable remote control
			socket.on('deck', function () {
				remoting = true;
				$.deck.apply($, arguments);
				remoting = false;
			});
			// Warning when local controls
			$(document).bind('deck.change', function (event, from, to) {
				if (!remoting && !warned) {
					warned = true;
					alert('Les contrôles locaux sont actifs. Néanmoins, laisse-toi guider, ce sera plus sympa pour toi :)');
				}
			});
			$(document).bind('deck.init', function () {
				remoting = false;
			});
		})(io.connect())
	}

});

