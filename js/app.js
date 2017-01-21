$(document).ready(function() {
  
  console.log('Ready...');

  windowWidth = $(window).width();
  windowHeight = $(window).height();
  bodyWidth = $('body').width();

  console.log("Window width: ", windowWidth)
  console.log("Window height: ", windowHeight)
  console.log("Body width: ", bodyWidth)

  if (windowWidth < 568) {

    setSmallScreenElements ();

  }
  else //if (windowWidth > 768) 
  {

  // }
  // else if (windowWidth < 1024) {}
  // else if (windowWidth > 1227) {


    // setTimeout (getDivWithMinHeight(sectionsId), 500);
    getDivWithMinHeight (sectionsId);
  }

});

/* Global */
var control = false
var sectionsId = ["ga-projects", "education", "employment"]

function toggleControl () {

  if (control == false) {
    control = true
  }
  else if (control == true) {
    control = false
  }
  return control;
}

function setSmallScreenElements () {

  setSlidingMenu ();

  setButtons ();
  
}

function setSlidingMenu () {
   
  // Display menu Div
  $('#sliding-menu').css({ 'display': 'block'  });

  // Build menu tag structure inside 'sliding-menu' div
  $('#sliding-menu').html('<div id="sliding-shape"></div><div id="sliding-link" class="link-menu"></div><div id="sliding-menu-list"><ul class="menu-list"><li><a href="#projects" class="link-menu"></a></li><li><a href="#education" class="link-menu"></a></li><li><a href="#employment" class="link-menu"></a></li><li><a href="#contact" class="link-menu"></a></li></ul></div>')

  // Change menu list display
  $('#sliding-menu-list .menu-list').css ({ 'display': 'inline'  });

  // Append text elements to sliding menu
  var sectionHeaders = ["Projects", "Education", "Employment", "Contact"]
  
  $('#sliding-link').append('Menu');
  for ( i = 0; i < sectionHeaders.length; i++) {
    $('#sliding-menu-list > ul > li:nth-child(' + (i + 1) + ') > a').append(sectionHeaders[i]);
  }

  // Change menu font color
  $('#sliding-menu .link-menu').css({ 'color': '#fff'  });

  $('#sliding-menu .link-menu').hover(
    function () {
    $( this ).css({ 'color': '#ddd'  }) },
    function () {
    $( this ).css({ 'color': '#fff'  })
  });

  activateSlidingMenu ();
}

function activateSlidingMenu () {

  var slideMenu = $('#sliding-menu, #sliding-link, #sliding-menu-list');
  var shape = $('#sliding-shape');

  $('#sliding-link, #sliding-menu-list a').on("click", function() {

    // Call to toggleControl function
    toggleControl ();

    if (control == true)
    {
      $(slideMenu).animate({ right: "+=120"  }, 200)

      $(shape).animate({
        'right': "0",
        'border-top-width': "+=130",
        'border-left-width': "+=110"
      }, 200)
    }
    else if (control == false)
    {
      $(slideMenu).animate({ right: "-=120"  }, 200)

      $(shape).animate({
        'border-top-width': "-=130",
        'border-left-width': "-=110"
      }, 200)
    }
  });
}

function setButtons () {
  
  // Set 'Top' button
  $('#button-top-container').html('<a href="#top"><div id="top-shape"><div id="top-link"  class="button-top"></div></div></a>')

  $('#top-link').append('Top')

  // Set 'More...' buttons
  var allParagraphs = $('[class^=paragraph-header-]').next()

  for (i=0; i < allParagraphs.length; i++)
  {
    var newButton = 'button-' + $(allParagraphs[i]).attr('id');

    $(allParagraphs[i]).append('<div class="col-12 display-position"><button id="' + newButton + '" class="button-show">More...</button></div>')
  }

  enableShowMoreButtons ();
}


function enableShowMoreButtons () {

  $("[id^=ga-projects-], [id^=employment-], [id^=education-]")
    .css ({ 'height': '95px'  });

  $("[id^=button-ga-projects-], [id^=button-employment-], [id^=button-education-]")
    .bind("click", function(e) {

      e.preventDefault(); //just prevent the default behavior of the link
      
      var thisButton = $( this )[0]
      activeButton (thisButton);
  });
}

function activeButton (thisButton) {

  var thisButtonContainerId = "#" + $(thisButton).parent().parent().attr('id')
  var thisButtonId = "#" + $(thisButton).attr('id')
  var textInButton = $(thisButtonId).text();

  if (textInButton == "More...") {

    // Adding 25px to total height to avoid button overlap
    var fullHeight = $(thisButtonContainerId).css({ height: 'auto' }).height() + 25;

    $(thisButtonContainerId).css({ height: fullHeight });

    // Change text in button
    $(thisButtonId).text('Less...');

  }
  else if (textInButton =="Less...")
  {
    $(thisButtonContainerId).animate({ height: '95px' }, 600);

    // Change text in button
    $(thisButtonId).text('More...');

    returnToContainerId (thisButtonContainerId)
  }
}

function returnToContainerId (thisButtonContainerId) {

  $('html,body').animate({  
    scrollTop: $(thisButtonContainerId).parent().offset().top 
  }, 600);

}













function getDivWithMinHeight (sectionsId) {
  
  var divHeights = []
  
  console.log("entro 1");

  for (i=0; i < sectionsId.length; i++) {

    var section = sectionsId[i]
    var numTotalItems = $('[id^=' + section + '-]').length

    for (t = 1; t <= numTotalItems; t++) {

      var divAlpha = '#' + section + '-' + t
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


  // var myDivElements = $("[id^=ga-projects-], [id^=employment-], [id^=education-]")[0]
    
  // var parents = $("[id^=ga-projects-], [id^=employment-], [id^=education-]").parent()

  // $("[id^=ga-projects-], [id^=employment-], [id^=education-]").parent().html('')

  // parents.append('<div class="test"></div>')

  // var testLegth = $('.test').length

  // console.log("test length ", testLegth)

  // for (i=0 ; i < testLegth; i++)
  // {
  //   console.log("test ", $('.test')[i])
  //   console.log("parents ", parents[i])
  //   console.log("myDivElements[i] ", myDivElements)


  //   $('.test')[i].append(parents[i])//.append(myDivElements[i])
  // }

  // .append(myDivElements)
  
  // console.log("parents ", parents)

    // .addClass('gradient')

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
  
  console.log("section width: ", sectionWidth)
  console.log("section position left: ", sectionPositionLeft)
  console.log("overlayHeight: ", overlayHeight)
  console.log("overlayWidth: ", overlayWidth)
  console.log("windowHeight: ", wHeight)
  console.log("windowWidth: ", wWidth)
  console.log("This is topMargin value: ", topMargin)
  console.log("This is left value: ", leftMargin)

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

  var wholeBody = $('.pure-g').parent().html()
  var thisDiv = $(element).parent().html()
  var ovelayDiv = "<div id='overlay-div' alt='Click to close' title='Click to close the window'></div>"
  

  $('body').html('').append("<div id='make-transparent'></div>").append(wholeBody)

  $('section').append(ovelayDiv)

  $('#overlay-div').append(thisDiv)

  // Replace title 'click to read more' to 'Close'
  $('#overlay-div > '+ element).attr('title', 'Close').css({'height' : 'auto'});

  centeringOverlayDiv (element);

  // // Modify 'overlay-div' to match window height
  // $('#overlay-div > p:first-child').css({'height' : 'auto'});
  
  // autoHeight = $('#overlay-div').height().toFixed();
  
  // console.log("auto: ", autoHeight)
  
  // console.log("windowHeight: ", windowHeight)
  
  // top = ((windowHeight - autoHeight) / 2)

  // console.log("This is top value: ", top)

  // if (top < 10)
  // {
  //     var autoHeight = windowHeight - 100;
  //     var top = (((windowHeight - autoHeight) * 0.5)).toFixed()
  //     console.log("menor de 0: ", top)
  //     $('#overlay-div > '+ element).css({
  //       'height' : autoHeight,
  //       'overflow' : 'scroll',
  //     });
  //     $('#overlay-div').css({'top': '10px'});

  // }
  // else
  // {
  //     $('#overlay-div').css({'top' : top});
  // }

  $('#overlay-div').bind("click", function() {
    
    $('#make-transparent').remove()

    $('body').html('').append(wholeBody)

    setClickToDiv ();

  });
}
