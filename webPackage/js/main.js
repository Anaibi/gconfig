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


  // testing
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


  // fix for <pre> elements floated to right for third column layout
  // each <pre> element gets floated right 
  // special case <pre> followed by one or more <pre> tags, 
  // jump the each in this case for all but the first <pre> 
  //
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
      if (isPre($previous)) {
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

  	// return true if is pre element
  	function isPre(nodeName) { 
  	  return ($(nodeName).prop('nodeName') === 'PRE');
  	}

  	// return heights of element: inner height, padding-top, padding-bottom
  	function getHeights(elem) { 
  	  var h = {};

  	  h.inner_height = $(elem).height();
  	  h.padding_bottom = parseInt($(elem).css('padding-bottom'));
  	  h.padding_top = parseInt($(elem).css('padding-top'));

  	  return h;
  	}
  }
});