$(document).ready(function() {
  
  console.log('Ready...');

  windowWidth = $(window).width();
  windowHeight = $(window).height();

  console.log("Window width: ", windowWidth)
  console.log("Window height: ", windowHeight)

  articlesHtml = $("main article").clone();
  wholeBody = $("#container").clone();
  
  control = false
  
  sectionsId = ["projects", "education", "employment"];

  settings ();

});

function settings () {

  setTopbutton ();

  setSlidingMenu ();
  
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
    
    setArticles (maxNumChars, maxNumWords);
    setAtouchArea ();

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
    setArticles (maxNumChars, maxNumWords);
    setLargeScreenElements ();
  }
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
    
    // console.log("article id: ", articlesIds[i].id);
    articleId = "#" + articlesIds[i].id
    
    console.log("this article id: ", articleId);

    // Get header text
    var paragraphHeader = $(articleId + " > [class^=paragraph-header-]")[0]
    // console.log(" paragraphHeader : ", paragraphHeader);

    // Get paragraphs text
    var articleContent = $(articleId + " > p.paragraph").text();
    // console.log("article content: ", articleContent)

    // // Get images if there are any
    // var articleImages = $(articleId + " img")[0];

    // Get images if there are any
    var articleImages = $(articleId + " .thumbnail")[0];
    console.log("article images: ", articleImages)

    // Put white spaces after dots and arrange colateral effects
    articleContent = articleContent
                      .split(".")
                      .join(". ")
                      .replace(/\. \. \./g, "...")
                      .replace(/\(()+/g, "(")
                      .replace(/()+\)/g, ")")

    // console.log("article content: ", articleContent)

    var selectedChars = articleContent.split('').slice(0, maxNumChars).join('')
    var wordsInSelectedChars = selectedChars.trim().split(' ')

    var articleWords = articleContent.trim().split(' ')
    var shortArticle = []

    for (t = 0 ; t < wordsInSelectedChars.length; t++)
    {
      shortArticle.push(articleWords[t]);
    }

    var sentence = shortArticle.join(" ")
    
    // console.log("sentence is: ", sentence)
    // console.log("sentence length is: ", sentence.split('').length)

    $(articleId).html('').append(paragraphHeader).append(paragraphEmpty)
    $(articleId + " > p.paragraph").append(articleImages).append(sentence).append("...")

    // console.log("articleContent: ", articleContent);
  }

}

function setAtouchArea () {
  
  var selectAllSubElements = "[id^=projects-], [id^=employment-], [id^=education-]"
  $(selectAllSubElements)
    .css('cursor', 'pointer')
    .on("click", function(e) {

        e.preventDefault();
        
        var thisTouchDiv = $(this)

        showOverlayWindow (thisTouchDiv);
    }); 
}

checkImgHeight("#education-1 > p.paragraph");

function checkImgHeight (image) {

  var imgHeight

  imgHeight = $(image).height();

  console.log("image height: ", imgHeight)
}

