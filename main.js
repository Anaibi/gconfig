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
	})

  // fix for <pre> elements floated to right for third column layout
  // for each <pre> element, PREVIOUS (usuallyl <p>) gets floated left 
  // set height of both to be the same
  // special case <pre> followed by one or more <pre> tags, 
  // jump the each in this case also for all but the first <pre> !!

  function threeColumnContent() {
    $.each($('.content').find('pre'), function(i, preElement) {
      // get previous sibling of this pre element
      var $previous = $(preElement).prev();
      
      // if previous elements is <pre>, jump each as it's allready accounted for
      if ($previous.prop('tagName') === 'PRE') return;
      
      // get heights
      var pre_height = $(preElement).height();
      var previous_height = $previous.height();

      // get next sibling for case <pre> is followed by one or more <pre> elements
      var $next = $(preElement).next();

      // case <pre> is followed by one or more <pre>
      if ($next.prop('tagName') === 'PRE') {
      	var i = 2; // to include padding 
      	while ($next.prop('tagName') === 'PRE') { console.log(pre_height);
      	  pre_height = pre_height + $next.height() + parseInt($next.css('padding-top')) * i;
          $next = $next.next();
          i++;
        }
      }

      // if previous height < pre_height
      if (previous_height < pre_height) {
        // set it to same as floated right pre element
        $previous.height(pre_height);
      }

    });
  }
});