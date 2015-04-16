$(function() {

	// fix for <pre> elements floated to right for third column layout
	// cover with content background (margin/padding) to achieve same background color
    // formula is : set the next sibling of the <pre> element margin-top and padding-top
    // to be: margin-top = -(<pre>.height + padding-bottom)
    // padding-top = <pre>.height + padding-bottom + padding-top

    $each.($('.content').find('pre'), function(i, preElement) {
      // get measures	
      var pre_height = $(preElement).height();
      var pre_padding_bottom = parseInt($(preElement).css('padding-bottom'));
      var pre_padding_top = parseInt($(preElement).css('padding-top'));

      // get next sibling of this pre element
      var $next = $(preElement).next();
      
      // if there's next element, set it's margin-top and padding-top as in formula
      if (!!$next) {
        $(next).css('margin-top', -(pre_height + pre_padding_bottom));
        $(next).css('padding-top', pre_height + pre_padding_bottom + pre_padding_top);
      }

    });
});