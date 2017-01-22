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
