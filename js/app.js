$(document).ready(function() {
  
  console.log('Ready...');

  windowWidth = $(window).width();
  windowHeight = $(window).height();

  console.log("Window width: ", windowWidth)
  console.log("Window height: ", windowHeight)

  if (windowWidth <= 568) {
    setSmallScreenElements ();
  }
});

var control = false
var sectionsId = ["projects", "education", "employment"]

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

  // setButtons ();

  // enable touchy
  setAtouchArea ();
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
  
  $('#sliding-link').html('<img src="img/icon-menu-mobile.png" class="icon-menu" title="Open menu">');

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
      $(slideMenu).animate({ right: "+=130"  }, 200)

      $(shape).animate({
        'right': "0",
        'border-top-width': "+=125",
        'border-left-width': "+=125"
      }, 200)
    }
    else if (control == false)
    {
      $(slideMenu).animate({ right: "-=130"  }, 200)

      $(shape).animate({
        'border-top-width': "-=125",
        'border-left-width': "-=125"
      }, 200)
    }
  });
}

function setButtons () {
  
  // Set 'Top' button
  $('#button-top-container').html('<a href="#top"><div id="top-shape"><div id="top-link"  class="button-top"></div></div></a>')

  $('#top-link').append('Top')

  // Set 'More' buttons
  var allParagraphs = $('[class^=paragraph-header-]').next()

  for (i=0; i < allParagraphs.length; i++)
  {
    var newButton = 'button-' + $(allParagraphs[i]).attr('id');

    $(allParagraphs[i]).append('<div class="col-12 display-position" style="padding:0"><button id="' + newButton + '" class="button-show" title="More...">M</button></div>')
  }

  enableShowMoreButtons ();
}


function enableShowMoreButtons () {

  $("[id^=projects-], [id^=employment-], [id^=education-]")
    .css ({ 'height': '95px'  });

  $("[id^=button-projects-], [id^=button-employment-], [id^=button-education-]")
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

  if (textInButton == "M") {

    // Adding 25px to total height to avoid button overlap
    var fullHeight = $(thisButtonContainerId).css({ height: 'auto' }).height() + 25;

    $(thisButtonContainerId).css({ height: fullHeight });

    // $(thisButtonContainerId + ' > p').css({ 'font-size': '1.4rem' });
    
    // Change text in button
    $(thisButtonId).text('L').attr('title', 'Less...').css({ 'padding' : '0.6rem 0.9rem'});
  }
  else if (textInButton =="L")
  {
    $(thisButtonContainerId).animate({ height: '95px' }, 600);

    // Change text in button
    $(thisButtonId).text('M').attr('title', 'More...').css({ 'padding' : '0.6rem'});

    returnToContainerId (thisButtonContainerId)
  }
}

function setScreen () {

  // Set 'Top' button
  $('#button-top-container').html('<a href="#top"><div id="top-shape"><div id="top-link"  class="button-top"></div></div></a>')

  $('#top-link').html('<img src="img/icon-up-mobile-red.png" class="icon-top" title="To the top">');

  $("[id^=projects-], [id^=employment-], [id^=education-]")
    .css ({ 'height': '95px'  });

}

function setAtouchArea () {

  setScreen ();
  
  var selectAllSubElements = "[id^=projects-], [id^=employment-], [id^=education-]"

  var one = $(selectAllSubElements).parent()

  $(one).children().css('cursor', 'pointer')
    


  one.bind("click", function(e) {

      e.preventDefault(); //just prevent the default behavior of the link
      
      var thisTouchDiv = $( this )

      console.log("thisTouchDiv: ", thisTouchDiv)

      // childrenDivs = $(thisTouchDiv).children()

      activeTouchyDiv (thisTouchDiv);
  }); 
}

function activeTouchyDiv (childrenDivs) {
  
  children = childrenDivs;

  console.log("touchy: ", children)

  showOverlayDiv2 (children);

}

function showOverlayDiv2 (element) {

  wholeBody = $('.pure-g').parent().html()

  var thisDiv = $(element).html()
  console.log("thisDiv: ", thisDiv)

  var ovelayDiv = "<div id='overlay-div2'></div>"
  console.log("ovelayDiv: ", ovelayDiv)

  console.log("element: ", element)

  var myReferenceDiv = '#' + element.find('div').attr('id')
  console.log("myReferenceDiv: ", myReferenceDiv)

  $('body').html('').append("<div id='make-transparent'></div>").append(wholeBody)
  console.log("here 1")

  $('body').append(ovelayDiv)
  console.log("here 2")
  var oin = $('#overlay-div2').append(thisDiv)
  console.log("here 3: ", oin)



  // Replace title 'click to read more' to 'Close'
  $('#overlay-div2').attr('title', 'Close').css({'height' : 'auto'});

  $('#overlay-div2 > p:first-child').attr('title', 'Close this window');

  centeringOverlayDiv2 (element);

  $('#overlay-div2').bind("click", function() {
    
    $('body').html('').append(wholeBody)

    setSmallScreenElements ()
  });
}

function setBottomPaddingFor2 (elements, tag) {

  for (i=0; i < elements.length; i++)
  {
    $('[id^=' + elements[i] + '-] '+ tag +':last-child')
      .css({'padding-bottom': 30 });
  }
}

function centeringOverlayDiv2 (element) {

  // Paragraph header to 'auto'
  $('#overlay-div2 > p:first-child, #overlay-div2 > div').css({'height' : 'auto'});

  // Get Left position for 'overlay'
  var wWidth = windowWidth.toString();
  console.log("wWidth: ", wWidth)

  var sectionWidth = $('section').width().toFixed(); 
  console.log("sectionWidth: ", sectionWidth)

  // var sectionPositionLeft = (wWidth - sectionWidth) * 0.5;
  var sectionPositionLeft = wWidth; 
  console.log("sectionPositionLeft: ", sectionPositionLeft)

  setBottomPaddingFor2 (sectionsId, 'p');

  var overlayWidth = $('#overlay-div2').width().toFixed();
  console.log("overlayWidth: ", overlayWidth)

  var leftMargin = ((wWidth - overlayWidth) * 0.5);
  console.log("leftMargin: ", leftMargin)

  

  // Get Top position for 'overlay'
  var wHeight = windowHeight.toString();
  console.log("wHeight: ", wHeight)

  var overlayHeight = $('#overlay-div2').height().toFixed();
  console.log("overlayHeight: ", overlayHeight)

  // if (overlayHeight > wHeight)
  // {
      reducedOverlayHeight = wHeight - 40 // To balance 'top'
      console.log("reducedOverlayHeight: ", reducedOverlayHeight)
      var topMargin = 20
  // }
  // else
  // {
  //     reducedOverlayHeight = overlayHeight
  //     console.log("reducedOverlayHeight: ", reducedOverlayHeight)

  //     var topMargin = (wHeight - reducedOverlayHeight) * 0.5;
  // } 


  
  console.log("topMargin: ", topMargin)


  // If we don't have enough top margin to center overlay
  // if (topMargin < 10)
  // {
    // Make overlay smaller than Window height and allow 'scroll'
    // var overlayHeight = wHeight - 100;

    $('#overlay-div2').css({
      'height' : reducedOverlayHeight,
      'overflow' : 'scroll',
    });

    $('#overlay-div2').css({'top': topMargin});
  // }
  // else
  // {
  //   $('#overlay-div2').css({'top' : topMargin});
  // }

  $('#overlay-div2').css({'left' : leftMargin});
}
