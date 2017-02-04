$('body').ready(function() {
  
  console.log('Loaded script ready...');

  if (windowWidth > 568) {

    getDivWithMinHeight (sectionsId);
  }
});

function getDivWithMinHeight (sectionsId) {

  var divHeights = []
  var divId

  for (i=0; i < sectionsId.length; i++) {

    var article = sectionsId[i]
    var numTotalItems = $('[id^=' + article + '-]').length

    for (t = 1; t <= numTotalItems; t++) {

      articleId = '#' + article + '-' + t

      var item = $(articleId).innerHeight().toFixed();
      
      // Add everything div height in this section
      divHeights.push(item)  
    }

    // Get div minimum height which is same as small div in section
    var divMinHeight = Math.min.apply(Math,divHeights);

    // Make it a bit smaller for designing purposes
    divMinHeight = divMinHeight * 0.7

    // Set new div height, it's the same for all divs in a section
    $('[id^=' + article + '-]').innerHeight(divMinHeight)

    // Because Headers have different heights as well
    // Set header height to match the highest one
    setParagraphHeaderHeight (article);
  }

  setBottomPaddingFor (sectionsId, 'p');

  setClickToDiv ();

  console.log("Elements ready for clicking");
}

function setParagraphHeaderHeight (article) {

  // var maxHeaderHeight;
  var listHeaderHeights = [];
  var headerElements = $('p.paragraph-header-' + article)
  var numElements = headerElements.length

  // Measuring Total Headers Heights
  for (t = 0 ; t < numElements; t++) {
    var headerHeight = $(headerElements[t]).height().toFixed();

    listHeaderHeights.push(headerHeight)
  }

  var maxHeaderHeight = Math.max.apply(Math,listHeaderHeights);
  
  $('#' + article + ' p.paragraph-header-' + article).css({
    'height': maxHeaderHeight
  });
}

function setBottomPaddingFor (elements, tag) {

  for (i=0; i < elements.length; i++)
  {
    $('[id^=' + elements[i] + '-] '+ tag +':last-child')
      .css({'padding-bottom': 30 });
  }
}

function setClickToDiv () {

  $("[id^=projects-], [id^=employment-], [id^=education-]")
    .add("[class^=paragraph-header-]")
    .css('cursor', 'pointer')
    .bind("click", function(e) {
      
      e.preventDefault();

      // Check if I clicked on item's body or on item's header 
      clickedElement = $( this )[0].id
      
      // If element has no id
      if (clickedElement == "")
      {
        // Look for 'id' in next sibling 
        thisDivId = "#" + $( this ).next()[0].id
      }
      else
      {
        thisDivId = "#" + clickedElement
      }

      console.log("Clicked on: ", thisDivId)
      
      showOverlayDiv (thisDivId);
    });
}

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
      'overflow' : 'scroll'
    });

    $('#overlay-div').css({'top': '10px'});
  }
  else
  {
    $('#overlay-div').css({'top' : topMargin});
  }

  $('#overlay-div').css({'left' : leftMargin});
}

function showOverlayDiv (thisDivId) {

  wholeBody = $('.pure-g').parent().html()

  var thisDivHtml = $(thisDivId).parent().html()

  console.log("thisDivHtml en showOverlayDiv: ", thisDivHtml)

  var ovelayDiv = "<div id='overlay-div'></div>"

  $('body').html('').append("<div id='make-transparent'></div>")
                    .append(wholeBody)
                    .append(ovelayDiv)

  // Prevent Body scroll
  $('html, body').addClass('no-scroll');

  $('#overlay-div').append(thisDivHtml)

  // Replace title 'click to read more' to 'Close', adding padding
  $('#overlay-div > article')
    .attr('title', 'Close')
    .css({
      'height' : 'auto',
      'padding' : '2.5rem 2rem'
    });

  // Float image to the right
  $(thisDivId + " img").css({'float': 'right'})

  // Make paragraph headers auto
   $(thisDivId + "> [class*='-header-']").css({'height': 'auto'})

  centeringOverlayDiv (thisDivId);

  $('#overlay-div').bind("click", function() {
    
    $('body').html('').append(wholeBody)

    $('html, body').removeClass('no-scroll')

    setClickToDiv ();
  });

}