$(function() {

	// fix for <pre> elements floated to right for third column layout
	// for each <pre> element, PREVIOUS (usuallyl <p>) gets floated left 
	// set height of both to be the same

    $.each($('.content').find('pre'), function(i, preElement) {
      // get previous sibling of this pre element
      var $previous = $(preElement).prev();
      // get heights
      var pre_height = $(preElement).height();
      var previous_height = $previous.height();

      // get next siblign for case <pre> is followed by one or more <pre> elements
      var $next = $(preElement).next();
      console.log($next.prop('tagName'));

      // case <pre> is followed by one or more <pre>
      if ($next.prop('tagName') === 'PRE') {
      	while ($next.prop('tagName') === 'PRE') {
      	  pre_height = pre_height + $next.height();
          $next = $next.next();
        }
      }

      // if previous height < pre_height
      if (previous_height < pre_height) {
        // set it to same as floated right pre element
        $previous.height(pre_height);
      }

    });
});