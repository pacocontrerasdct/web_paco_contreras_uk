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

  console.log("Sliding menu set")

  activateSlidingMenu ();
}

function activateSlidingMenu () {

  slideMenu = $('#sliding-menu, #sliding-link, #sliding-menu-list');
  shape = $('#sliding-shape');

  // console.log("toggle ", control)

  $('#sliding-link, #sliding-menu-list a').on("click", function() {

    toggleControl ();

    var anchorId = $(this).attr("href");

    if (anchorId)
    {
      slowScrollToSection (anchorId);
    } 

    // Switch Menu
    slidingMenuOnOff (slideMenu, shape);

  });
}

function slowScrollToSection (anchorId) {

  var anchor = $(anchorId)
  var top = anchor.position();

  $('html,body').animate({  
    scrollTop: $(anchorId).offset().top 
  }, 600);
}

function slidingMenuOnOff (slideMenu, shape) {

  var sign = "+"

  if (control == false)
  {
    sign = "-"
  }

  $(slideMenu).animate({ right: sign + "=130"  }, 200)

  $(shape).animate({
                    'right': "0",
                    'border-top-width': sign + "=125",
                    'border-left-width': sign + "=125"
  }, 200)
}

function setTopbutton () {

  // Set 'Top' button
  $('#button-top-container').html('<div id="top-shape"><div id="top-link"  class="button-top"></div></div>')

  $('#top-link').html('<img src="img/icon-up-mobile-red.png" class="icon-top" title="Scroll back to top">');

  $('#button-top-container').bind("click", function(e) {

      e.preventDefault(); //just prevent the default behavior of the link
      
      // console.log("button-top-container: ", $( this))

      if (control == true)
      {
        toggleControl ();
      }

      setSlidingMenu ();

      $('html,body').animate({  
        scrollTop: $("#top").parent().offset().top 
      }, 600);

  });

  // Set height for all articles
  $("[id^=projects-], [id^=employment-], [id^=education-]")
    .css ({ 'height': 'auto'  });

}