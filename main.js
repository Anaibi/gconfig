$(window).load(function() {

	var threeColumnContentCalled = false;

	// fix css for three column layout 
	threeColumnContent();
	
	$(window).resize(function() {
		if (!threeColumnContentCalled) {
		  threeColumnContent();
		}
	});


  // fix for <pre> elements floated to right for third column layout
  // each <pre> element gets floated right 
  // special case <pre> followed by one or more <pre> tags, 
  // jump the each in this case also for all but the first <pre> 

  // want each element before <pre> tags to have total height (height + margin/padding) 
  // to be same as floated <pre> at right
  function threeColumnContent() {
    // if not needed, return
  	if ($(window).width() < 1180) {
      return;
  	} else {
  	  threeColumnContentCalled = true;
  	}

    $.each($('.content').find('pre'), function(i, preElement) {
      
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
      if (isPre($next.prop('nodeName'))) { console.log('is pre next');
      	
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

  function colorSwapTest() {
  	var theme = '#enjoy-mondays';
    var bg_1_elements = {};
    var light_green = '#CCFFCC';
      
    bg_1_elements['body' + theme] = 0;
    bg_1_elements[theme + ' .content-root'] = 0;
    bg_1_elements[theme + ' .menubar'] = 0;
    bg_1_elements[theme + ' .content'] = 0;
    bg_1_elements[theme + ' .header'] = 0;
    bg_1_elements[theme + ' h1'] = 0;
    bg_1_elements[theme + ' h2'] = 0;
    bg_1_elements[theme + ' h3'] = 0;
    bg_1_elements[theme + ' h4'] = 0;
    bg_1_elements[theme + ' h5'] = 0;
    bg_1_elements[theme + ' h6'] = 0;
    bg_1_elements[theme + ' p'] = 0;
    bg_1_elements[theme + ' ul'] = 0;
    bg_1_elements[theme + ' ol'] = 0;

    $.each(bg_1_elements, function(elem, val) {
      console.log(elem);
      swapBGcolor($(elem), light_green);
    });

    function swapBGcolor(elem, color) {
  	  $(elem).css('background-color', color);
    }
  }

  colorSwapTest();
  
});