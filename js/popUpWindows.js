/************************************************************* 
* Managing div which pop-up when clicked in any of CV elements
**************************************************************/

var ovelayDiv = "<div id='transparent-alpha-layer'></div><div id='overlay-div2'></div>"
var overlayDivId =  "#overlay-div2"
var transparentId = "#transparent-alpha-layer"

function findFullArticleHtml (element) {

  var thisClickedArticleId = element[0].id

  for (r = 0; r < articlesHtml.length; r++)
  {
      if (articlesHtml[r].id == thisClickedArticleId)
      {
          var fullArticle = articlesHtml[r];
          break;
      }
  }
  return fullArticle;
}

function showOverlayWindow (element) {

  var fullArticle = findFullArticleHtml (element);

  // Layer after layer built using z-index
  // Transparent div covers whole body making it blury
  // thanks to an alpha layer on background
  $('body').append(ovelayDiv);

  $(overlayDivId).append(fullArticle);

  // Prevent Body scroll
  $('html, body').addClass('no-scroll');

  var articleSelected = overlayDivId + ' > article'

  // Replace title 'click to read more' to 'Close'
  $(articleSelected).attr('title', 'Close')
                      .css({'cursor' : 'pointer',
                            'height' : 'auto',
                            'padding-bottom' : '30px'});

  centerWindowVertically (articleSelected);

  $(overlayDivId).bind("click", function() {

      removeOverlayWindow (this)
  });

  var thumbnailClasses = $("body > #overlay-div2 > article > div").removeClass();

  $("body > #overlay-div2 > article > div > img").addClass("img-auto img-projects");

console.log("thumbnails : " , thumbnailClasses)

}

function removeOverlayWindow (element) {

    $('html, body').removeClass('no-scroll');
    
    $(element).detach();
    $(transparentId).detach();   

    if (control == true)
    {
      toggleControl ();
    }
}

function centerWindowVertically (element) {

  console.log(element)
  
  var elementHeight = $(element).height().toFixed();

  windowHeight = $(window).height();
  console.log(windowHeight);
  console.log(elementHeight);
  // Pixels from window's top to element's top
  // Putting it a bit higher because of visual balance
  var topPosition = (windowHeight.toString() - elementHeight) * 0.35;

  console.log(topPosition);

  // new overlay window width proportionated to browser window
  var elementWidth = (windowWidth.toString()) * elementWidthRatio;

  // Left position ratio to place pop-up window centered
  var leftPositionRatio = (1 - elementWidthRatio) / 2

  var leftPosition = (windowWidth.toString()) * leftPositionRatio;

  // If there's less than 40px from element's top to window's top
  // element height will be 20px smaller than window height
  // so element is going to be 40px from top and bottom window
  // and allow 'scrolling'
  if (topPosition <= 20)
  {
    elementHeight = windowHeight.toString() - 40;
    overflow = 'scroll'
    topPosition = '20px'
  }
  else
  {
    elementHeight = 'auto'
    overflow = 'auto'
  }

  $(element).parent().css({
    'height' : elementHeight,
    'left' : leftPosition,
    'overflow' : overflow,
    'top' : topPosition,
    'width' : elementWidth
  });

  maxHeight = windowHeight.toString() - (topPosition * 1.75);

  $(element).parent().css({
    'max-height' : maxHeight
  });

}
