
function setLargeScreenElements () {

  // Because Headers have different heights as well
  // Set header height to match the highest one
  setParagraphHeaderHeight ();

  setAtouchArea ();
}

function setParagraphHeaderHeight () {  
  
  for (i=0; i < sectionsId.length; i++) {

    var article = sectionsId[i];

    var maxHeaderHeight;
    var listHeaderHeights = [];
    var headerElements = $('p.paragraph-header-' + article);
    var numElements = headerElements.length;

    // Measuring Total Headers Heights
    for (t = 0 ; t < numElements; t++) {

      headerHeight = $(headerElements[t]).height().toFixed();
      console.log("headerHeight for: ", headerElements[t], " is: ", headerHeight)

      listHeaderHeights.push(headerHeight);
    }

    maxHeaderHeight = Math.max.apply(Math,listHeaderHeights);

    console.log ("max height: ", maxHeaderHeight)

    $(headerElements).css({'height': maxHeaderHeight});

  }
}
