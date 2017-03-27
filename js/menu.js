
navSlide = $('#nav-sliding, #nav-sliding-link, #nav-sliding-list');
navShape = $('#nav-sliding-shape');

function setSlidingMenu () {

  $('#nav-sliding-link, #nav-sliding-list a').on("click", function() {

    var anchorId = $(this).attr("href");

    if (anchorId) { slowScrollToSection (anchorId); };

    slidingMenuOnOff (navSlide, navShape);

  });
}

function slowScrollToSection (anchorId) {

  var anchor = $(anchorId)
  var top = anchor.position();

  $('html,body').animate({  
                scrollTop: $(anchorId).offset().top 
  }, 600);
}

function slidingMenuOnOff (navSlide, navShape) {

  var sign = "+"

  if (control == true) { sign = "-" }

  $(navSlide).animate({
              right: sign + "=130"
  }, 200);

  $(navShape).animate({
              'right': "0",
              'border-top-width': sign + "=125",
              'border-left-width': sign + "=125"
  }, 200);

  toggleControl ();
}

function setTopbutton () {

  $('#btn-top-container').bind("click", function(e) {

      e.preventDefault();

      $('html,body').animate({  
        scrollTop: $("#top").parent().offset().top 
      }, 600);

      if (control == true)
      {
        slidingMenuOnOff (navSlide, navShape);
      }
  });

  // Set height for all articles
  $("[id^=projects-], [id^=employment-], [id^=education-]")
    .css ({ 'height': 'auto'  });

}