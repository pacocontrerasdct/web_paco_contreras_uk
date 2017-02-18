
function setLargeScreenElements (sectionsId) {

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
    // $('[id^=' + article + '-]').innerHeight(divMinHeight)


  }

  // Because Headers have different heights as well
  // Set header height to match the highest one
  setParagraphHeaderHeight ();

  setBottomPaddingFor (sectionsId, 'p');

  // setClickToDiv ();
  setAtouchArea ();
}


function setParagraphHeaderHeight () {

  for (i=0; i < sectionsId.length; i++) {

    var article = sectionsId[i]

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
      'height': maxHeaderHeight,
      'padding-bottom': '15px'
    });

  }
}

function setBottomPaddingFor (elements, tag) {

  for (i=0; i < elements.length; i++)
  {
    $('[id^=' + elements[i] + '-] '+ tag +':last-child')
      .css({'padding-bottom': 30 });
  }
}
