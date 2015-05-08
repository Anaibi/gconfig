$(window).load(function() {

  var threeColumnContentCalled = false;
  var windowWidthMark = 1180;

  var preElements = $('.content').find('pre');

  // fix css for three column layout 
  threeColumnContent();
	
  $(window).resize(function() {
    // fix css for three column layout
    if (!threeColumnContentCalled) {
	    threeColumnContent();
    }
    hideScrollbarMoz();
  });

  
  function hideScrollbarMoz() {
  	var cW, sW;
  	$.each(preElements, function(i, pre) { 
      cW = pre.clientWidth,
  	  sW = pre.scrollWidth;
  	  $(pre).find('.scrolls-x').removeClass('scrolls-x');
  	  if (cW != sW) {
  	  	$(pre).addClass('scrolls-x');
  	  } else {
  	  	//if ($(pre).hasClass('scrolls-x').removeClass('scroll-x'));
  	  }
      
  	});
  };

  hideScrollbarMoz();



  // color combos
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

  var combo1 = [LIGHT_GRAY, ZENBURN_BG, GRAY, DARK_GRAY, FUXSIA, LIGHT_WHITE],
      combo2 = [DARK_GRAY, BLACK, LIGHT_GRAY, LIGHT_WHITE, LIGHT_FUXSIA, BLACK],
      combo3 = [DARK_BLUE, BLACK, LIGHT_GRAY, LIGHT_WHITE, LIGHT_FUXSIA, BLACK],
      combo4 = [FUXSIA, ZENBURN_BG, LIGHT_GRAY, LIGHT_WHITE, LIGHT_FUXSIA, ZENBURN_BG],
      combo5 = [LIGHTER_WHITE, ZENBURN_BG, GRAY, DARK_GRAY, FUXSIA, WHITE];

  
  var theme = '#enjoy-mondays';

  // add here all elements affected by background-color: background_1 
  var bg_1_elements = [];
      
  // http://stackoverflow.com/questions/9708192/use-a-concatenated-dynamic-string-as-javascript-object-key
  bg_1_elements.push(
    'body' + theme,
    theme + ' .content-root',
    theme + ' .menubar',    	
    theme + ' .content',
    theme + ' #main-header',
   	theme + ' h1',
   	theme + ' h2',
   	theme + ' h3',
   	theme + ' h4',
   	theme + ' h5',
   	theme + ' h6',
   	theme + ' p',
   	theme + ' ul',
   	theme + ' ol'
  );

  // add here all elements affected by background-color: background_2
  var bg_2_elements = [];

  bg_2_elements.push(
    theme + ' .hljs',
    theme + ' pre > code'   	
  );

  // add here all elements affected by background-color: background_3
  var bg_3_elements = [];

  bg_3_elements.push(
    theme + ' code'   	
  );

  // add here all elements affected by color: color_1
  var color_1_elements = [];

  color_1_elements.push(
    'body' + theme   	
  );
 
  // add here all elements affected by color: color_2
  var color_2_elements = [];

  color_2_elements.push(
    theme + ' a'   	
  );

  // add here all elements affected by color: color_3
  var color_3_elements = [];

  color_3_elements.push(
    theme + ' .menu a:visited',
    theme + ' .menu a:hover',    	
    theme + ' .menu a.active'
  );
    
  // add here all elements affected by border-color: color_3
  color_3_elements.border = [];

  color_3_elements.border.push(
    theme + ' .menu a:visited',
    theme + ' .menu a:hover',    	
    theme + ' .menu a.active',
    theme + ' a.active',
    theme + ' a:hover'
  );


  // fix for <pre> elements floated to right for third column layout
  // each <pre> element gets floated right 
  // special case <pre> followed by one or more <pre> tags, 
  // jump the each in this case also for all but the first <pre> 

  // want each element before <pre> tags to have total height (height + margin and padding) 
  // to be same as floated <pre> at right
  function threeColumnContent() {
    // if not needed, return
  	if ($(window).width() < windowWidthMark) {
      return;
  	} else {
  	  threeColumnContentCalled = true;
  	}

    $.each(preElements, function(i, preElement) {
      
      var $this_pre = $(preElement);
      
      // get previous sibling of this pre element
      var $previous = $this_pre.prev();
      
      // if previous elements is <pre>, jump each as it's allready accounted for
      // if ($previous.prop('tagName') === 'PRE') return;
      if (isPre($previous.prop('nodeName'))) {
      	return;
      }
      
      // get measures
      // total height of preElement
      var this_pre_heights = getHeights($this_pre);

      // total height of previous to this preElement
      var previous_heights = getHeights($previous);

      // get next sibling for case <pre> is followed by one or more <pre> elements
      var $next = $this_pre.next(); 

      // calculate pre heights 
      // top measures don't affect 
      // if only one pre element, total height to consider if paddings are the same, inner height
      var this_pre_height = this_pre_heights.inner_height;
      var previous_height = previous_heights.inner_height;

      // case <pre> is followed by one or more <pre>
      // if more then one pre element, sum of inner heights and 'inner' paddings
      if (isPre($next.prop('nodeName'))) { 
      	
        this_pre_height = this_pre_height + this_pre_heights.padding_bottom;
      	var next_pre_heights = getHeights($next);

      	while (isPre($next.prop('nodeName'))) { 
          this_pre_height = this_pre_height + next_pre_heights.inner_height + this_pre_heights.padding_top;
          $next = $next.next();
        }

        // if previous height < pre_height
        if (previous_height < this_pre_height) { 
          // set -margin and padding to compensate float empty space
          $previous.css('margin-bottom', - (this_pre_height - previous_heights.inner_height));
          $previous.css('padding-bottom', (this_pre_height - previous_heights.inner_height + previous_heights.padding_bottom));
        }

      } else {

      	// if previous height < pre_height
        if (previous_height < this_pre_height) { 
          // set -margin and padding to compensate float empty space
          $previous.css('margin-bottom', - (this_pre_height - previous_heights.inner_height));
          $previous.css('padding-bottom', (this_pre_height - previous_heights.inner_height + previous_heights.padding_bottom));
        }

      }
    });

	// return true if nodename is <pre>
	function isPre(nodeName) { 
	  return (nodeName === 'PRE');
	}

	// return heights of element: inner height, padding-top, padding-bottom, margin-top, margin-bottom
	function getHeights(elem) { 
	  var h = {};

	  h.inner_height = $(elem).height();
	  h.padding_bottom = parseInt($(elem).css('padding-bottom'));
	  h.padding_top = parseInt($(elem).css('padding-top'));

	  return h;
	}
}



  function colorSwapTest(colors) { 

    $.each(bg_1_elements, function(i, elem) { 
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