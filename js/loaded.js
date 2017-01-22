$('body').ready(function() {
  
  console.log('Full "body" printed...');

  if (windowWidth >= 568) {

    getDivWithMinHeight (sectionsId);

  }
});

function getDivWithMinHeight (sectionsId) {

  var divHeights = []
  var divAlpha

  for (i=0; i < sectionsId.length; i++) {

    var section = sectionsId[i]
    var numTotalItems = $('[id^=' + section + '-]').length

    for (t = 1; t <= numTotalItems; t++) {

      divAlpha = '#' + section + '-' + t
      
      console.log("alpha: ", divAlpha);

      var item = $('#' + section + '-' + t).innerHeight().toFixed();
      
      // Add everything div height in this section
      divHeights.push(item)  
    }

    // Get div minimum height which is same as small div in section
    var divMinHeight = Math.min.apply(Math,divHeights);

    // Make it a bit smaller for designing purposes
    divMinHeight = divMinHeight * 0.7

    // Set new div height, it's the same for all divs in a section
    $('[id^=' + section + '-]').innerHeight(divMinHeight)

    // Because Headers have different heights as well
    // Set header height to match the highest one
    setParagraphHeaderHeight (section);
  }

  setBottomPaddingFor (sectionsId, 'p');

  setClickToDiv ();

  console.log("Elements ready for clicking");
}

function setParagraphHeaderHeight (section) {

  // var maxHeaderHeight;
  var listHeaderHeights = [];
  var headerElements = $('p.paragraph-header-' + section)
  var numElements = headerElements.length

  // Measuring Total Headers Heights
  for (t = 0 ; t < numElements; t++) {
    var headerHeight = $(headerElements[t]).height().toFixed();
    console.log("HEADERHEIGHT num ", t, " has ", headerHeight)
    listHeaderHeights.push(headerHeight)
  }

  var maxHeaderHeight = Math.max.apply(Math,listHeaderHeights);
  console.log("header height max for: ", section, " is ", maxHeaderHeight)
  $('#' + section + ' p.paragraph-header-' + section).css({
    'height': maxHeaderHeight
    // 'min-height' : maxHeaderHeight
  });
}

function setBottomPaddingFor (elements, tag) {

  for (i=0; i < elements.length; i++)
  {
    $('[id^=' + elements[i] + '-] '+ tag +':last-child').css({'padding-bottom': 30 });
  }
}

function setClickToDiv () {

  $("[id^=ga-projects-], [id^=employment-], [id^=education-]").add("[class^=paragraph-header-]")
    .attr('title', 'Click to read more')
    .css('cursor', 'pointer')
    .bind("click", function(e) {
      
      e.preventDefault();

      // Check if I clicked on item's body or on item's header 
      clickedElement = $( this )[0].id
      
      // If element has no id
      if (clickedElement == "")
      {
        // Look for 'id' in next sibling 
        thisDiv = "#" + $( this ).next()[0].id
      }
      else
      {
        thisDiv = "#" + $( this )[0].id
      }

      console.log("you clicked on: ", thisDiv)
      
      showOverlayDiv (thisDiv);

    });

}

// Modify 'overlay-div' to match window height and width
function centeringOverlayDiv (element) {

  // Paragraph header to 'auto'
  $('#overlay-div > p:first-child').css({'height' : 'auto'});

  // Get Left position for 'overlay'
  var wWidth = windowWidth.toString();
  var sectionWidth = $('section').width().toFixed(); 
  var sectionPositionLeft = (wWidth - sectionWidth) * 0.5; 
  var overlayWidth = $('#overlay-div').width().toFixed();
  var leftMargin = sectionPositionLeft + ((sectionWidth - overlayWidth) * 0.5);
  
  // Get Top position for 'overlay'
  var wHeight = windowHeight.toString();
  var overlayHeight = $('#overlay-div').height().toFixed();
  var topMargin = (wHeight - overlayHeight) * 0.45;

  // If we don't have enough top margin to center overlay
  if (topMargin < 10)
  {
      // Make overlay smaller than Window height and allow 'scroll'
      var overlayHeight = wHeight - 100;

      $('#overlay-div > '+ element).css({
        'height' : overlayHeight,
        'overflow' : 'scroll',
      });

      $('#overlay-div').css({'top': '10px'});
  }
  else
  {
      $('#overlay-div').css({'top' : topMargin});
  }

  $('#overlay-div').css({'left' : leftMargin});
}

function showOverlayDiv (element) {

  wholeBody = $('.pure-g').parent().html()
  var thisDiv = $(element).parent().html()
  var ovelayDiv = "<div id='overlay-div'></div>"

  $('body').html('').append("<div id='make-transparent'></div>").append(wholeBody)

  $('section').append(ovelayDiv)

  $('#overlay-div').append(thisDiv)

  // Replace title 'click to read more' to 'Close'
  $('#overlay-div > '+ element).attr('title', 'Close').css({'height' : 'auto'});

  $('#overlay-div > p:first-child').attr('title', 'Close this window');

  centeringOverlayDiv (element);

  $('#overlay-div').bind("click", function() {
    
    $('body').html('').append(wholeBody)

    setClickToDiv ();

  });
}
