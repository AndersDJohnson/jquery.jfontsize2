
/*
 * jQuery jFontSize2 Plugin
 * 
 * Based on jQuery jFontSize Plugin (http://jfontsize.com)
 * 
 * Author: Anders Johnson
 *  AndersDJohnson@gmail.com
 *  http://github.com/AndersDJohnson
 * 
 * License:
 *  Dual licensed under the MIT and GPL licenses.
 * 
 * Original Author:
 *  Frederico Soares Vanelli
 *   fredsvanelli@gmail.com
 *   http://twitter.com/fredvanelli
 *   http://facebook.com/fred.vanelli
 * 
 * Original License:
 *  Dual licensed under the MIT and GPL licenses.
 *  http://jfontsize.com/license
 * 
 * Requires: jQuery v1.2.6 or later
*/

/*
Uses AMD or browser globals to create a jQuery plugin.
 See http://github.com/umdjs/umd/blob/master/jqueryPlugin.js
*/

(function() {
  var $btns, $this, $uiSlider, btns, changeFontSize, defaults, fontsizes, getFontSize, limit, opts;

  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery'], factory);
    } else {
      return factory(jQuery);
    }
  })((function($) {
    return $.fn.jfontsize = function(opts) {};
  }, $this = $(this), defaults = {
    btnMinus: null,
    btnDefault: null,
    btnPlus: null,
    uiSlider: null,
    btnMinusMaxHits: 10,
    btnPlusMaxHits: 10,
    sizeChange: 1
  }, ($.isPlainObject(opts)) || (!opts) ? opts = $.extend(defaults, opts) : (defaults.sizeChange = opts, opts = defaults), getFontSize = function() {
    var size;
    size = $(this).css('font-size');
    size = size.replace('px', '');
    return size = parseInt(size.replace('px', ''));
  }, limit = [], fontsizes = [], $(this).each(function(i) {
    limit[i] = 0;
    return fontsizes[i] = getFontSize.call(this);
  }), btns = [opts.btnMinus, opts.btnDefault, opts.btnPlus].join(', '), $btns = $(btns), $btns.css('cursor', 'pointer'), $uiSlider = null, changeFontSize = function(i, dir) {
    var change, currSize, current, newfontsize;
    currSize = getFontSize.call(this);
    newfontsize = currSize + dir * opts.sizeChange;
    limit[i] += dir;
    if ($uiSlider != null) {
      current = $uiSlider.slider('option', 'value');
      change = dir * opts.sizeChange;
      $uiSlider.slider('option', 'value', current + change);
    }
    return $(this).css('font-size', newfontsize + 'px');
  }, opts.uiSlider != null ? ($uiSlider = $(opts.uiSlider), $uiSlider.slider({
    'max': opts.btnPlusMaxHits + opts.btnMinusMaxHits,
    'value': opts.btnMinusMaxHits,
    'step': 1
  }).bind('slidestart', function(event, ui) {
    return $this.each(function(i) {
      return $(this).data('prevValue', ui.value);
    });
  }).bind('slidechange', function(event, ui) {
    if (event.originalEvent == null) return;
    return $this.each(function(i) {
      var change;
      change = ui.value - $(this).data('prevValue');
      return changeFontSize.call(this, i, change);
    });
  })) : void 0, $(opts.btnMinus).click(function(e) {
    e.preventDefault();
    return $this.each(function(i) {
      if (limit[i] > -opts.btnMinusMaxHits) {
        return changeFontSize.call(this, i, -1);
      }
    });
  }), $(opts.btnDefault).click(function() {
    return $this.each(function(i) {
      limit[i] = 0;
      return $(this).css('font-size', fontsizes[i] + 'px');
    });
  }), $(opts.btnPlus).click(function() {
    return $this.each(function(i) {
      if (limit[i] < opts.btnPlusMaxHits) return changeFontSize.call(this, i, 1);
    });
  })));

}).call(this);
