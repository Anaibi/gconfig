$(window).load(function() {

  var threeColumnContentCalled = false;
  var minWidth_threeColumn = 1180;
  var ww = $(window).width();

  var preElements = $('.content').find('pre');

  if (ww > minWidth_threeColumn) {
    // fix css for three column layout 
    threeColumnCss();
  }
	
  $(window).resize(function() { console.log('in resize');
    // new window width
    ww = $(window).width();
    if (!threeColumnContentCalled && (ww > minWidth_threeColumn)) { 
      threeColumnCss();
    }
    //hideScrollbarMoz();
  });


  // --------------------------------------------------------------------- hideScrollbarMoz
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

  //hideScrollbarMoz();


  // ----------------------------------------------------------------------- threeColumnCss
  // fix css for three column layout (fill gap)
  // each <pre> element gets floated right and leaves 'empty' background space
  // special case <pre> followed by one or more <pre> tags, 
  // jump the each in this case for all but the first <pre> 
  //
  // want each element before <pre> tags to have total height (height + margin and padding) 
  // to be same as floated <pre> at right
  function threeColumnCss() { 
    
  	threeColumnContentCalled = true;

    $.each(preElements, function(i, preElement) {
      
      var $this_pre = $(preElement);
      var $previous = $this_pre.prev();
      var $next = $this_pre.next();
      
      // if previous elements is <pre>, jump each as it's allready accounted for
      if (isPre($previous)) return;
      
      // get heights 
      var this_pre_heights = getHeights($this_pre);
      var previous_heights = getHeights($previous);
      

      // calculate gap to fill 
      // top measures don't affect 
      // if only one pre element, total height to consider if paddings are the same is the inner height
      var fillHeight = this_pre_heights.inner_height;

      // case <pre> is followed by one or more <pre>
      // if more then one pre element, sum of inner heights and 'inner' paddings
      if (isPre($next)) {
      	
        // include padding between this and next element
        fillHeight += this_pre_heights.padding_bottom;

      	while (isPre($next)) { 
          fillHeight +=  $next.height() + this_pre_heights.padding_top;
          $next = $next.next();
        }
      }

      if (previous_heights.inner_height < fillHeight) { 
        // set -margin and padding to compensate float empty space
        $previous.css('margin-bottom', -(fillHeight - previous_heights.inner_height));
        $previous.css('padding-bottom', (fillHeight - previous_heights.inner_height + previous_heights.padding_bottom));
      }
    });

  	// return true if elem is pre element
  	function isPre(elem) { 
  	  return ($(elem).prop('nodeName') === 'PRE');
  	}

  	// return heights of element
  	function getHeights(elem) { 
  	  return {
        inner_height: $(elem).height(),
        padding_bottom: parseInt($(elem).css('padding-bottom')),
        padding_top: parseInt($(elem).css('padding-top'))
      };
  	}
  }
});