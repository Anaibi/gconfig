$(window).load(function() {

	var theme = '#enjoy-mondays';

	// color constants
  var GRAY = '#4a4a4a',
      LIGHT_GRAY = '#E9E8E3',
      DARK_GRAY = '#3A3A3A',
      DARK_BLUE =	'#363B48',	
      FUXSIA = '#DF3F54',
      LIGHT_FUXSIA = '#F17C71',
      ZENBURN_BG = '#3F3F3F',
      LIGHT_WHITE = '#F3F6FB',
      LIGHTER_WHITE = '#F8F8F4',
      BLACK = '#000',
      WHITE = '#FFF';

  var base_color = LIGHT_GRAY;

  var color3Hue = 20,
  		color3Saturation = 50;

  var useBaseColor = true;
  var useMiddleColor = true;

  var color1 = getMiddleLightness(base_color), 
  		color2 = complement(color1),
  		color3 = saturate(adjustHue(color1, color3Hue), color3Saturation);

  var dark_color1 = ColorLuminance(color1, -.20),
  		//
			darker_color1 = ColorLuminance(color1, -.85),
			// 
			darkest_color1 = ColorLuminance(color1, -.72),

			lightest_color1 = ColorLuminance(color1, .50),
			// light gray ok
			lighter_color1 = ColorLuminance(color1, .71),
			light_color1 = ColorLuminance(color1, .20),

			dark_color2 = ColorLuminance(color2, -.20),
			light_color2 = ColorLuminance(color2, .20),

			dark_color3 = ColorLuminance(color3, -.20),
			light_color3 = ColorLuminance(color3, .20);

	console.log(color1); // #8f8a70  // 8a8986

  var bg_main = [
  	'body' + theme,
  	theme + ' #main-header',
    theme + ' .content-root',
    theme + ' .menubar',    	
    theme + ' .content',
   	theme + ' h1',
   	theme + ' h2',
   	theme + ' h3',
   	theme + ' h4',
   	theme + ' h5',
   	theme + ' h6',
   	theme + ' .content p',
   	theme + ' .content ul',
   	theme + ' .content ol'
  ];

  $.each(bg_main, function(i, elem) { 
      $(elem).css('background-color', lighter_color1);
  });

  var bg_main_gradient = [
  	'body.big-h3' + theme
  ];

  var text = [
  	'body' + theme
  ];

  $.each(text, function(i, elem) { 
      $(elem).css('color', darkest_color1);
  });

  var text_headers = [
   	theme + ' h1',
   	theme + ' h2',
   	theme + ' h3',
   	theme + ' h4',
   	theme + ' h5',
   	theme + ' h6'
  ];

  $.each(text_headers, function(i, elem) { 
      $(elem).css('color', darker_color1);
  });

  var text_links = [
  	theme + ' a'
  ];

  $.each(text_links, function(i, elem) { 
      $(elem).css('color', color2);
  });

  // TODO links active, hover, visited, color and borders
  // text_active_links, deco_links

  var em = [
  	theme + ' .content em'
  ];

  var bg_code = [
  	theme + ' .content code'
  ];

  var bg_code_3col = [
  	theme + '.content hljs',
  	theme + ' .content pre > code'
  ];

  var bg_code_3col_gradient = [
  	theme + ' .content',
  	theme + ' .content-root',
  	theme + ' .content .hljs',
  	theme + ' .content pre > code'
  ];

  var text_code = [
  	theme + ' .content p > code',
  	theme + ' .content li > code'
  ];

  var text_details = [
  	theme + '#main-header'
  ];

  // TODO bg_details
	// TODO  borders1, borders2


  function colorSwapTest(colors) { 

    $.each(bg_main, function(i, elem) { 
      $(elem).css('background-color', colors[0]);
    });

    $.each(bg_3_elements, function(i, elem) {
      $(elem).css('background-color', colors[5]);
    });

    $.each(bg_2_elements, function(i, elem) {
      $(elem).css('background-color', colors[1]);
    });
    

    $.each(color_1_elements, function(i, elem) {
      $(elem).css('color', colors[2]);
    });

    $.each(color_2_elements, function(i, elem) {
      $(elem).css('color', colors[3]);
    });

    $.each(color_3_elements, function(i, elem) {
      $(elem).css('color', colors[4]);
    });

    $.each(color_3_elements.border, function(i, elem) {
      $(elem).css('border-color', colors[4]);
    });
    
    fixCodeBackground();

    var previousWindowWidth = $(window).width(); 

    $(window).resize(function() {
      var newWindowWidth = $(window).width(); 

      if (previousWindowWidth < windowWidthMark && newWindowWidth > windowWidthMark || previousWindowWidth > windowWidthMark && newWindowWidth < windowWidthMark) {
        previousWindowWidth = newWindowWidth;
        fixCodeBackground();
      }
    })
  }


  // color swapper 
  $('#color-swapper a').click(function(e) {
    e.preventDefault();
    var color = $(this).parent().attr('class'); 
    var colors;
 
    // each class is the name of the first color in combo
    // TODO (if is to be used, refactor into more general function)
    switch (color) {
      case 'LIGHT_GRAY':
        colors = combo1;
        break;
      case 'DARK_GRAY': 
        colors = combo2;
        break;
      case 'DARK_BLUE':
        colors = combo3;
        break;
      case 'FUXSIA':
        colors = combo4;
        break;
      case 'LIGHTER_WHITE':
        colors = combo5;
        break;
    }

    colorSwapTest(colors);

  });

  // http://www.sitepoint.com/javascript-generate-lighter-darker-color/
  function ColorLuminance(hex, lum) {

		// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}
		lum = lum || 0;

		// convert to decimal and change luminosity
		var rgb = "#", c, i;
		for (i = 0; i < 3; i++) {
			c = parseInt(hex.substr(i*2,2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00"+c).substr(c.length);
		}

		return rgb;
	}

	function getMiddleLightness(color) {
		var l = (382.5 - getIntensity(color))/756; console.log(l);
		console.log(ColorLuminance(color, -.4019608));
		return ColorLuminance(color, l) 
	}

	function getIntensity(hex_color) { 
		hex_color = String(hex_color).replace(/[^0-9a-f]/gi, '');
		var i, c = 0;
		for (i = 0; i < 3; i++) { 
			c = c + parseInt(hex_color.substr(i*2,2), 16); 
		} 
		return c;
	}

	function complement(color) {
		color = String(color).replace(/[^0-9a-f]/gi, '');

		return color;
	}

	function adjustHue(color, hue) {
		return color;
	}

	function saturate(color, sat) {
		return color;
	}

	// http://www.javascripter.net/faq/hextorgb.htm
	function hexToRGB(hex_color) {
		R = hexToR(hex_color);
		G = hexToG(hex_color);
		B = hexToB(hex_color);

		function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
		function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
		function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
		function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
	}


  function fixCodeBackground() { 
  	setTimeout(function() {
      var color1 = $(preElements[0]).css('background-color');
      //$('pre > code').css('background-color'); 
  	  var color2 = $('p').css('background-color');

  	  if ($(window).width() < windowWidthMark) {
  	    $('.content, .content-root').css('background-color', color2);
  	  } else {
  	    $('.content, .content-root').css('background-color', color1);
  	  }
  	}, 150);	
  }

});