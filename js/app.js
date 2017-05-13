$(document).ready(function() {
  
  console.log('Ready...');

  control = false
  articlesHtml = $("main article").clone();
  sectionsId = ["projects", "education", "employment"];

  settings ();

});

function settings () {

  windowWidth = $(window).width();
  windowHeight = $(window).height();

  if (windowWidth <= 568) {

    // Pop-up Window Ratio related to Window width
    elementWidthRatio = 0.9

    if (windowWidth > 360 && windowWidth <= 480) {

      maxNumChars = 140;
      maxNumWords = 30;
    }
    else if (windowWidth > 480 && windowWidth <= 568) {

      maxNumChars = 180;
      maxNumWords = 40;
    }
    else {

      maxNumChars = 100;
      maxNumWords = 20;
    }
  }
  else
  {
    if (windowWidth > 568 && windowWidth <= 768) {

      maxNumChars = 200;
      maxNumWords = 50;

      elementWidthRatio = 0.8

    } else if (windowWidth > 768 && windowWidth <= 1024) {

      maxNumChars = 200;
      maxNumWords = 50;

      elementWidthRatio = 0.65
    }
    else {

      maxNumChars = 200;
      maxNumWords = 50;

      elementWidthRatio = 0.5
    }
  }

  setTopbutton ();
  setSlidingMenu ();
  setArticles (maxNumChars, maxNumWords);
  setAtouchArea ();
}

function toggleControl () {

  if (control == false) {
    control = true
  }
  else if (control == true) {
    control = false
  }
  return control;
}

function setArticles (maxNumChars, maxNumWords) {

  var articlesIds = $("main article").clone();
  var articleId;

  // Declare an empty paragraph
  var paragraphEmpty = '<p class="paragraph"></p>'

  for (i = 0; i < articlesIds.length; i++)
  {

    articleId = "#" + articlesIds[i].id

    // Get header text
    var paragraphHeader = $(articleId + " > [class^=paragraph-header-]")[0]

    // Get paragraphs text
    var articleContent = $(articleId + " > p.paragraph").text();

    // Get images if there are any
    var articleImages = $(articleId + " .thumbnail")[0];

    // Put white spaces after dots and arrange colateral effects
    articleContent = articleContent
                      .split(".")
                      .join(". ")
                      .replace(/\. \. \./g, "...")
                      .replace(/\(()+/g, "(")
                      .replace(/()+\)/g, ")")

    var selectedChars = articleContent.split('').slice(0, maxNumChars).join('')
    var wordsInSelectedChars = selectedChars.trim().split(' ')

    var articleWords = articleContent.trim().split(' ')
    var shortArticle = []

    for (t = 0 ; t < wordsInSelectedChars.length; t++)
    {
      shortArticle.push(articleWords[t]);
    }

    var sentence = shortArticle.join(" ")

    $(articleId).attr('title', 'Click to read more')
                .html('')
                .append(paragraphHeader)
                .append(paragraphEmpty);

    $(articleId + " > p.paragraph").append(articleImages)
                                   .append(sentence)
                                   .append("...");
  }
  
  // Cloning whole adapted page to use it
  // later when removing overlayWindow
  articlesSet = $("#container").clone();
}

function setAtouchArea () {
  
  var selectAllSubElements = "[id^=projects-], [id^=employment-], [id^=education-]"
  
  $(selectAllSubElements).css('cursor', 'pointer').on("click", function(e) {

        e.preventDefault();

        var thisTouchDiv = $(this)

        showOverlayWindow (thisTouchDiv);

        // If sliding menu is in, put it out
        if (control == true)
        {
          slidingMenuOnOff (navSlide, navShape);
        }
    }); 
}