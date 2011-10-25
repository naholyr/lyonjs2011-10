$(function() {

	// Enable syntax highlighting
	(function (p) {
		var old_getHtml = p.getHtml;
		p.getHtml = function (code) {
			var html = old_getHtml.call(this, code);
			// Inherit from theme web-2.0
			return '<pre class="syntaxhighlighter-container">' + html + '</pre>';
		}
	})(SyntaxHighlighter.Highlighter.prototype);
	SyntaxHighlighter.defaults["gutter"] = false;
	SyntaxHighlighter.defaults["toolbar"] = false;
	SyntaxHighlighter.defaults["quick-code"] = false;
	SyntaxHighlighter.all();

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
				//remoting = true;
				//$.deck('go', 35);
				remoting = false;
			});
		})(io.connect())
	}

	// Deck initialization
	$.deck('.slide');

});

