/**
 * Oasis Console Class
 * @author  Brian Seitel
 * @version  0.0.1
 */
;(function(global, $) { var
	API = {
		command: 'console'
	},
	RXP = {
		html: /(<([^>]+)>)/ig,
		whitespace: /^\s+|\s+$/g,
		newLines: /(\r\n|\n|\r)/gm,
		tab: /\t/g
	},
	TEXT = {
		space: ' ',
		blank: '',
		thinking: 'Thinking...'
	},
	TIME = {
		hide: 2500
	},
	SPEED = {
		delay: 500
	};

	/*
	* trim string whitespace
	*
	* @param {string} sValue | string to trim
	* @return {string} | trimmed string
	*/
	function trim(sValue) {
		return sValue.replace(RXP.whitespace, TEXT.blank);
	}

	/**
	* get element Value
	*
	* @param {jQuery} jEl | jQuery object to test
	* @return {bool}
	**/
	function getElVal(jEl) {
		return jEl.text() || TEXT.blank;
	}

	var _class = function(container, options) { this.init(options); };
	Console = _class;

	/**
	* Public methods
	**/
	_class.prototype = {

		init: function(options) {
			this.options = $.extend({
				winHeight: 100
			}, options || {});

			this.container = $('body');
			this.winHeight = this.options.winHeight;
			this.mirage = {};
			this.command = {};

			this.timer = { throttle: null };
			this.xhr = false;

			this.buildMirage();
			this.addEventListeners();
		},

		addEventListeners: function() {
			this.container
				.bind('keydown', $.proxy(this.toggleConsole, this));
		},

		buildMirage: function() {
			this.mirage = $('<div id="mirage"/>');
			this.container.append(this.mirage);

			this.mirage.css({
				width: '100%',
				background: '#000000',
				height: this.options.winHeight,
				position: 'absolute',
				top: 0
			});

			this.command = $('<textarea id="command"></textarea>');
			this.mirage.html('<span style="float:left;color: #FFF;font-size:12px;padding:5px;font-family: Verdana, sans-serif;">></span> ').append(this.command);

			this.command
				.css({
					width: '95%',
					background: '#000000',
					height: this.options.winHeight / 2,
					color: '#FFF',
					border: 0,
					padding: 5,
					'font-family': 'Verdana, sans-serif',
					'font-size': 12
				})
				.focus()
				.bind('keydown', $.proxy(this.sendCommand, this));

			this.response = $('<pre id="response"/>');
			this.mirage.append(this.response);

			this.response.css({
				color: '#FFF',
				padding: 5,
				height: 35
			});
		},

		sendCommand: function(e) {
			var $this = $(e.target),
				self = this,
				response = this.response;
			if (e.which == 13) {
				e.preventDefault();
				e.stopPropagation();
				e.returnValue = false;
				$this.prop('disabled', true);

				if (this.xhr)
					this.xhr.abort();
				
				this.response.html(TEXT.thinking);

				clearTimeout(this.timer);
				this.timer = setTimeout(function() {
					this.xhr = $.post(API.command, { command: $this.val() }, function(data) {
						$this.prop('disabled', false);
						self.response.html(data);
						$this.val('');
					});
				}, SPEED.delay);
				
			}
		},

		toggleConsole: function(e) {
			if (e.ctrlKey && e.which == 81) {
				if (this.mirage.is(':visible'))
					this.mirage.slideUp('fast');
				else
					this.mirage.slideDown('fast');
			}
		}
	};
})(window, jQuery);
























