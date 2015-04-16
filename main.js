$(window).load(function() {

	var threeColumnContentCalled = false;

	if ($(window).width() > 1180) {
	  	threeColumnContent();
	  	threeColumnContentCalled = true;
	}

	$(window).resize(function() {
		if (!threeColumnContentCalled) {
		  threeColumnContent();
	  	  threeColumnContentCalled = true;
		}
	});

  // fix for <pre> elements floated to right for third column layout
  // for each <pre> element, PREVIOUS (usuallyl <p>) gets floated left 
  // set height of both to be the same --> Nooo! has to be margins/paddings  --> just once (test)
  // else set height to auto again on resize :( --> each resize calculate or somehow assign again --> better try margins/paddings
  // special case <pre> followed by one or more <pre> tags, 
  // jump the each in this case also for all but the first <pre> !!

  // want each element before <pre> tags to have total height (height + margin/padding) 
  // to be same as floated <pre> at left

  // now all content elements have same padding = 10px, account for this to change though

  function threeColumnContent() {
    $.each($('.content').find('pre'), function(i, preElement) {
      
      var $this_pre = $(preElement);
      
      // get previous sibling of this pre element
      var $previous = $this_pre.prev();
      
      // if previous elements is <pre>, jump each as it's allready accounted for
      // if ($previous.prop('tagName') === 'PRE') return;
      if (isPre($previous)) return;
      
      // get measures
      // total height of preElement
      var this_pre_heights = getHeights($this_pre);

      // total height of previous to this preElement
      var previous_heights = getHeights($previous);

      // get next sibling for case <pre> is followed by one or more <pre> elements
      var $next = $this_pre.next(); console.log($next);

      // calculate pre heights 
      // top measures don't affect 
      // if only one pre element, total height to consider if paddings are the same, inner height
      var this_pre_height = this_pre_heights.inner_height;
      var previous_height = previous_heights.inner_height;

      // if previous height < pre_height
      if (previous_height < this_pre_height) { console.log('in previous < this');

        // case <pre> is followed by one or more <pre>
        // if more then one pre element, sum of inner heights and 'inner' paddings
        if (isPre($next)) { console.log('is pre next');
      	
      	  this_pre_height = this_pre_height + this_pre_heights.padding_bottom;
      	  var next_pre_heights = getHeights($next);

      	  while (isPre($next)) { 
            this_pre_height = this_pre_height + next_pre_heights.inner_height + this_pre_heights.padding_top;
            $next = $next.next();
          }
        }

        // set -margin and padding to compensate float empty space
        $previous.css('margin-bottom', - (this_pre_height - previous_heights.inner_height));
        $previous.css('padding-bottom', (this_pre_height - previous_heights.inner_height + previous_heights.padding_bottom));
      }

    });
  }
  
  // return true if element is <pre>
  function isPre(elem) {
  	return ($(elem).prop('tagName' === 'PRE'));
  }

  // return heights of element: inner height, padding-top, padding-bottom, margin-top, margin-bottom
  function getHeights(elem) {
  	var h = {};

  	h.inner_height = $(elem).height();
  	h.padding_bottom = parseInt($(elem).css('padding-bottom'));
  	h.padding_top = parseInt($(elem).css('padding-top'));
  	h.margin_bottom = parseInt($(elem).css('margin-bottom'));
  	h.margin_top = parseInt($(elem).css('margin-top')); 

  	return h;
  }
});