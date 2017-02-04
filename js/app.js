$(document).ready(function() {
  
  console.log('Ready...');

  windowWidth = $(window).width();
  windowHeight = $(window).height();

  console.log("Window width: ", windowWidth)
  console.log("Window height: ", windowHeight)

  if (windowWidth <= 568) {
    
    articlesHtml = $("main article").clone();

    setSmallScreenElements ();

  }
});

var control = false
var sectionsId = ["projects", "education", "employment"];

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

  console.log("Sliding menu set")

  activateSlidingMenu ();
}

function activateSlidingMenu () {

  slideMenu = $('#sliding-menu, #sliding-link, #sliding-menu-list');
  shape = $('#sliding-shape');

  console.log("toggle ", control)

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

// function setButtons () {
  
//   // Set 'Top' button
//   $('#button-top-container').html('<a href="#top"><div id="top-shape"><div id="top-link"  class="button-top"></div></div></a>')

//   $('#top-link').append('Top')

//   // Set 'More' buttons
//   var allParagraphs = $('[class^=paragraph-header-]').next()

//   for (i=0; i < allParagraphs.length; i++)
//   {
//     var newButton = 'button-' + $(allParagraphs[i]).attr('id');

//     $(allParagraphs[i]).append('<div class="col-12 display-position" style="padding:0"><button id="' + newButton + '" class="button-show" title="More...">M</button></div>')
//   }

//   enableShowMoreButtons ();
// }


// function enableShowMoreButtons () {

//   $("[id^=projects-], [id^=employment-], [id^=education-]")
//     .css ({ 'height': '95px'  });

//   $("[id^=button-projects-], [id^=button-employment-], [id^=button-education-]")
//     .bind("click", function(e) {

//       e.preventDefault(); //just prevent the default behavior of the link
      
//       var thisButton = $( this )[0]

//       activeButton (thisButton);
//   });
// }

// function activeButton (thisButton) {

//   var thisButtonContainerId = "#" + $(thisButton).parent().parent().attr('id')
//   var thisButtonId = "#" + $(thisButton).attr('id')
//   var textInButton = $(thisButtonId).text();

//   if (textInButton == "M") {

//     // Adding 25px to total height to avoid button overlap
//     var fullHeight = $(thisButtonContainerId).css({ height: 'auto' }).height() + 25;

//     $(thisButtonContainerId).css({ height: fullHeight });

//     // $(thisButtonContainerId + ' > p').css({ 'font-size': '1.4rem' });
    
//     // Change text in button
//     $(thisButtonId).text('L').attr('title', 'Less...').css({ 'padding' : '0.6rem 0.9rem'});
//   }
//   else if (textInButton =="L")
//   {
//     $(thisButtonContainerId).animate({ height: '95px' }, 600);

//     // Change text in button
//     $(thisButtonId).text('M').attr('title', 'More...').css({ 'padding' : '0.6rem'});

//     returnToContainerId (thisButtonContainerId)
//   }
// }

// function setScreen () {

//   // Set 'Top' button
//   $('#button-top-container').html('<a href="#top"><div id="top-shape"><div id="top-link"  class="button-top"></div></div></a>')

//   $('#top-link').html('<img src="img/icon-up-mobile-red.png" class="icon-top" title="To the top">');

//   $("[id^=projects-], [id^=employment-], [id^=education-]")
//     .css ({ 'height': '95px'  });

// }

function setSmallScreens () {

  // Set 'Top' button
  $('#button-top-container').html('<div id="top-shape"><div id="top-link"  class="button-top"></div></div>')

  $('#top-link').html('<img src="img/icon-up-mobile-red.png" class="icon-top" title="Scroll back to top">');

  $('#button-top-container').bind("click", function(e) {

      e.preventDefault(); //just prevent the default behavior of the link
      
      console.log("button-top-container: ", $( this))

      if (control == true)
      {
        toggleControl ();
      }

      setSlidingMenu ();

      $('html,body').animate({  
        scrollTop: $("#top").parent().offset().top 
      }, 600);

  });


  setArticles ();

  // Set height for all articles
  $("[id^=projects-], [id^=employment-], [id^=education-]")
    .css ({ 'height': 'auto'  });


}

function setArticles () {

  var maxNumChars = 100;
  var maxNumWords = 20;
  var articlesIds = $("main article").clone();
  var articleId;

  // Declare an empty paragraph
  var paragraphEmpty = '<p class="paragraph"></p>'

  for (i = 0; i < articlesIds.length; i++)
  {
    
    console.log("article id: ", articlesIds[i].id);
    articleId = "#" + articlesIds[i].id
    
    console.log("this article id: ", articleId);
    


    // Get header text
    var paragraphHeader = $(articleId + " > [class^=paragraph-header-]")[0]
    console.log(" paragraphHeader : ", paragraphHeader);

    // Get paragraphs text
    var articleContent = $(articleId + " > p.paragraph").text();
    console.log("article content: ", articleContent)

    // Get images if there are any
    var articleImages = $(articleId + " img")[0];
    console.log("article images: ", articleImages)

    // I need to give an extra space to dots
    articleContent = articleContent.replace(/\.\.\.$/, "").replace(".", ". ")

    var cientoVeinte = articleContent.split('').slice(0, maxNumChars).join('')
    var wordsFromCiento = cientoVeinte.trim().split(' ')

    console.log("120 : ", cientoVeinte);
    console.log("word 120 : ", wordsFromCiento);

    var articleWords = articleContent.trim().split(' ')
    var shortArticle = []

    for (t = 0 ; t < wordsFromCiento.length; t++)
    {
      shortArticle.push(articleWords[t]);
    }

    var sentence = shortArticle.join(" ")
    
    console.log("sentence is: ", sentence)
    console.log("sentence length is: ", sentence.split('').length)

    $(articleId).html('').append(paragraphHeader).append(paragraphEmpty)
    $(articleId + " > p.paragraph").append(articleImages).append(sentence).append("...")

    console.log("articleContent: ", articleContent);


  } // end for loop
}

function setAtouchArea () {

  setSmallScreens ();
  
  var selectAllSubElements = "[id^=projects-], [id^=employment-], [id^=education-]"

  // var one = $(selectAllSubElements)
  // $(selectAllSubElements).css('cursor', 'pointer')

  $(selectAllSubElements)
    .css('cursor', 'pointer')
    .bind("click", function(e) {

        e.preventDefault(); //just prevent the default behavior of the link
        
        var thisTouchDiv = $( this )

        console.log("thisTouchDiv: ", thisTouchDiv)

        showOverlayDiv2 (thisTouchDiv);
    }); 
}

// function articlesHtml () {
  
//   var articlesIds = $("main article");
//   var articlesHtml = [];

//   // Collecting full articles' html
//   for (i = 0; i < articlesIds.length; i++)
//   {
//     // var articleHtml = $("#" + articlesIds[i].id)//.parent()//.html()
//     var articleHtml = $("#" + articlesIds[i].id)//.parent()//.html()

//     articlesHtml.push(articleHtml);
//   }

//   console.log("here1: ", articlesHtml[0]);
//   return articlesHtml
// }

function findHtmlForId (element) {

  var thisClickedArticleId = element[0].id
  console.log("thisClickedArticleId:  ", thisClickedArticleId)

  for (r = 0; r < articlesHtml.length; r++)
  {
      console.log(articlesHtml[r].id)

      if (articlesHtml[r].id == element[0].id)
      {
          var theDiv = articlesHtml[r];
          break;
      }
  }

  return theDiv;
}

function showOverlayDiv2 (element) {

  console.log("element: ", element)

  wholeBody = $('.pure-g').parent().html()

  // What comes from findHtml is var thisDiv

/*<article id="projects-4" style="height: auto; cursor: pointer;"><p class="paragraph-header-projects">Simon for the blind</p><p class="paragraph"><img src="img/simon-node-min.jpg" class="img-project-4" title="Image for Simon for the Blind project">For my final project at General Assembly, I decided to revisit my first project which was a JavaScript...</p></article>*/

  var theDiv = findHtmlForId (element);

  // var theDiv = $(element).parent().html()
  // console.log("theDiv: ", theDiv)




  var ovelayDiv = "<div id='overlay-div2'></div>"
  console.log("ovelayDiv: ", ovelayDiv)

  $('body').html('').append("<div id='make-transparent'></div>").append(wholeBody)
  console.log("here 1")

  // Prevent Body scroll
  $('html, body').addClass('no-scroll');

  $('body').append(ovelayDiv)
  console.log("here 2")

  var oin = $('#overlay-div2').append(theDiv)
  console.log("here 3: ", oin)

  // Replace title 'click to read more' to 'Close'
  $('#overlay-div2 > article').attr('title', 'Close').css({'height' : 'auto'});

  centeringOverlayDiv2 (element);

  $('#overlay-div2').bind("click", function() {
    
    $('body').html('').append(wholeBody)

    $('html, body').removeClass('no-scroll')   

    if (control == true)
    {
      toggleControl ();
    }

    setSmallScreenElements ()
  });
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

  setBottomPaddingFor (sectionsId, 'p');

  var overlayWidth = $('#overlay-div2').width().toFixed();
  console.log("overlayWidth: ", overlayWidth)

  var leftMargin = ((wWidth - overlayWidth) * 0.5);
  console.log("leftMargin: ", leftMargin)

  // Get Top position for 'overlay'
  var wHeight = windowHeight.toString();
  console.log("wHeight: ", wHeight)

  var overlayHeight = $('#overlay-div2').height().toFixed();
  console.log("overlayHeight: ", overlayHeight)

  reducedOverlayHeight = wHeight - 40 // To balance 'top'
  console.log("reducedOverlayHeight: ", reducedOverlayHeight)
  var topMargin = 20

  console.log("topMargin: ", topMargin)

  $('#overlay-div2').css({
    'height' : reducedOverlayHeight,
    'overflow' : 'scroll',
    'top': topMargin,
    'left' : leftMargin
  });
}

