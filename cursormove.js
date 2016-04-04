// Remixes jquery-boilerplate (github.com/jquery-boilerplate/jquery-boilerplate)
// Copyright © 2016 Zeno Rocha <hi@zenorocha.com>

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function($, window, document, undefined) {

	"use strict";

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variables rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	var pluginName = "cursormove";

	// The actual plugin constructor
	function Plugin(el) {
		this.$el = $(el);
		this.currentPos = null;
		this.firstScroll = null;

		this._name = pluginName;
		this.init();
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function() {

			var pl = this;

			pl.$el.on("mousemove", function(e) {
				pl.mousemove(e, pl);
			});

			// using window instead of $el because we want to only capure
			// scrolling that changes the cursors position relative to the
			// viewport
			// $(window).on("mousemove", function(e) {
			//     pl.winPos = {
			//         pageX: e.pageX,
			//         pageY: e.pageY
			//     };
			// });

			$(window).on("scroll", function(e) {
				pl.scroll(e, pl);
			});
		},

		mousemove: function(e, pl) {
			if (pl.firstScroll) pl.firstScroll = null;

			pl.currentPos = {
				pageX: e.pageX,
				pageY: e.pageY
			};

			pl.$el.triggerHandler(
				$.extend($.Event("cursormove"), pl.currentPos)
			);
		},

		scroll: function(e, pl) {
			var currentScroll = {
				scrollX: pl.$el.scrollLeft(),
				scrollY: pl.$el.scrollTop()
			};

			if (!pl.firstScroll) pl.firstScroll = currentScroll;

			var scrollMove = {};
			$.each(pl.currentPos, function(i, o) {
				scrollMove[i] = o + (
					currentScroll[i == "pageX" ? "scrollX" : "scrollY"] -
					pl.firstScroll[i == "pageX" ? "scrollX" : "scrollY"]
				);
			});

			pl.$el.triggerHandler(
				$.extend($.Event("cursormove"), scrollMove)
			);
		}
	});

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function() {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin(this));
			}
		});
	};

})(jQuery, window, document);