/************************************************************* 
* Managing div which pop-up when clicked in any of CV elements
**************************************************************/

var ovelayDiv = "<div id='overlay-div'></div>"
var transparentDiv = "<div id='transparent-alpha-layer'></div>"

var overlayDivId =  "#overlay-div"
var transparentDivId = "#transparent-alpha-layer"

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
  // Transparent div covers whole body with an alpha layer
  $('body').append(transparentDiv).append(ovelayDiv);

  // Append selected article
  $(overlayDivId).append(fullArticle);

  // Prevent Body scroll
  $('html, body').addClass('no-scroll');

  // Replace title 'Click to read more' to 'Close'
  $(fullArticle).attr('title', 'Close')
                .css({'cursor' : 'pointer',
                      'height' : 'auto',
                      'padding-bottom' : '30px'
                });

  // remove thumbnail classes for div containing img
  $(overlayDivId + " div").removeClass();

  // add new classes for showing full images
  $(overlayDivId + " img").addClass("img-auto img-projects");

  var windowHeight = $(window).height();

  modifyElementHeight (overlayDivId, windowHeight);

  window.addEventListener('resize', function() {
    
    var newWindowHeight = getNewWindowHeight();

    modifyElementHeight (overlayDivId, newWindowHeight);

  });

  // on click remove this overlay
  $(overlayDivId).bind("click", function() {

      removeOverlayWindow (this);
  });

}

function removeOverlayWindow (element) {

    $('html, body').removeClass('no-scroll');
    
    $(element).detach();

    $(transparentDivId).detach();   

    removeResizingEvent ();
}

function getNewWindowHeight() {
  
  var newHeight = window.innerHeight;
  
  return newHeight
}

function modifyElementHeight(element, hasHeight) {

  var elementHeight = $(element).height();

  var elementContentHeight = $(element + '> article').outerHeight();

  /* Pixels from window's top to element's top
  Putting it a bit higher because of visual balance */

  topPosition = (hasHeight.toString() - elementHeight) * 0.35;

  /* If there's less than 40px from element's top to window's top
  element height will be 20px smaller than window height
  so element is going to be 40px from top and bottom window
  and allow 'scrolling' */

  if ((topPosition <= 20) && (elementContentHeight > (elementHeight - 40)))
  {
    elementHeight = hasHeight.toString() - 40;
    overflow = 'scroll'
    topPosition = '20px'
  }
  else
  {
    elementHeight = 'auto'
    overflow = 'auto'
  }

  $(element).css({
                  'height' : elementHeight,
                  'overflow' : overflow,
                  'top' : topPosition
                });
}

function removeResizingEvent () {

  window.removeEventListener('resize', getNewWindowHeight);

  $("body").html('').append(articlesSet);

  setTopbutton ();
  setSlidingMenu ();
  setAtouchArea ();
}