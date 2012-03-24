###
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
###

###
Uses AMD or browser globals to create a jQuery plugin.
 See http://github.com/umdjs/umd/blob/master/jqueryPlugin.js
###

(((factory) ->
	if typeof define is 'function' and define.amd
		#AMD. Register as an anonymous module.
		define ['jquery'], factory
	else
		#Browser globals
		factory jQuery

)( (($) ->
	
    $.fn.jfontsize = (opts) ->
		
		$this = $(this)
		
		defaults =
			btnMinus: null
			btnDefault: null
			btnPlus: null
			uiSlider: null
			btnMinusMaxHits: 10
			btnPlusMaxHits: 10
			sizeChange: 1
		
		if ($.isPlainObject(opts)) or (not opts)
			opts = $.extend(defaults, opts)
		else
			defaults.sizeChange = opts
			opts = defaults
		
		getFontSize = ->
			size = $(this).css('font-size')
			size = size.replace('px', '')
			size = parseInt(size.replace('px', ''))
		
		limit = []
		fontsizes = []
		
		$(this).each( (i) ->
			limit[i] = 0
			fontsizes[i] = getFontSize.call(this)
		)
		
		btns = [opts.btnMinus, opts.btnDefault, opts.btnPlus].join(', ')
		$btns = $(btns)
		
		$btns.css('cursor', 'pointer')
		
		$uiSlider = null
		
		changeFontSize = (i, dir) ->
			currSize = getFontSize.call(this)
			newfontsize = currSize + dir * (opts.sizeChange)
			limit[i] += dir
			if $uiSlider?
				current = $uiSlider.slider('option', 'value')
				change = dir * opts.sizeChange
				$uiSlider.slider('option', 'value', current + change)
			$(this).css('font-size', newfontsize+'px')
		
		if opts.uiSlider?
			$uiSlider = $(opts.uiSlider)
			$uiSlider.slider({
				'max': opts.btnPlusMaxHits + opts.btnMinusMaxHits,
				'value': opts.btnMinusMaxHits,
				'step': 1
			}).bind( 'slidestart', (event, ui) ->
				$this.each( (i) ->
					$(this).data('prevValue', ui.value)
				)
			).bind( 'slidechange', (event, ui) ->
				return unless event.originalEvent?
				$this.each( (i) ->
					change = ui.value - $(this).data('prevValue')
					changeFontSize.call(this, i, change)
				)
			)
		
		$(opts.btnMinus).click( (e) ->
			e.preventDefault()
			$this.each( (i) ->
				if limit[i] > -(opts.btnMinusMaxHits)
					changeFontSize.call(this, i, -1)
			)
		)
		
		$(opts.btnDefault).click( ->
			$this.each( (i) ->
				limit[i] = 0
				$(this).css('font-size', fontsizes[i] + 'px')
			)
		)
		
		$(opts.btnPlus).click( ->
			$this.each( (i) ->
				if limit[i] < opts.btnPlusMaxHits
					changeFontSize.call(this, i, 1)
			)
		)
)))
