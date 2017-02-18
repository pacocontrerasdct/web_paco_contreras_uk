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

    setSmallScreenElements ();

  }
  else
  {
    if (windowWidth > 568) {

      maxNumChars = 200;
      maxNumWords = 50;

      elementWidthRatio = 0.5
    }

    setLargeScreenElements (sectionsId);
  }

  setArticles (maxNumChars, maxNumWords);
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

function setSmallScreenElements () {

  setSlidingMenu ();

  setTopbutton ();

  setAtouchArea ();
}


function setArticles (maxNumChars, maxNumWords) {

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
    // console.log(" paragraphHeader : ", paragraphHeader);

    // Get paragraphs text
    var articleContent = $(articleId + " > p.paragraph").text();
    // console.log("article content: ", articleContent)

    // Get images if there are any
    var articleImages = $(articleId + " img")[0];
    // console.log("article images: ", articleImages)

    // I need to give an extra space to dots
    articleContent = articleContent.replace(/\.\.\.$/, "").replace(".", ". ")

    var cientoVeinte = articleContent.split('').slice(0, maxNumChars).join('')
    var wordsFromCiento = cientoVeinte.trim().split(' ')

    // console.log("120 : ", cientoVeinte);
    // console.log("word 120 : ", wordsFromCiento);

    var articleWords = articleContent.trim().split(' ')
    var shortArticle = []

    for (t = 0 ; t < wordsFromCiento.length; t++)
    {
      shortArticle.push(articleWords[t]);
    }

    var sentence = shortArticle.join(" ")
    
    // console.log("sentence is: ", sentence)
    // console.log("sentence length is: ", sentence.split('').length)

    $(articleId).html('').append(paragraphHeader).append(paragraphEmpty)
    $(articleId + " > p.paragraph").append(articleImages).append(sentence).append("...")

    // console.log("articleContent: ", articleContent);


  } // end for loop

}

function setAtouchArea () {
  
  var selectAllSubElements = "[id^=projects-], [id^=employment-], [id^=education-]"

  // var one = $(selectAllSubElements)
  // $(selectAllSubElements).css('cursor', 'pointer')

  $(selectAllSubElements)
    .css('cursor', 'pointer')
    .on("click", function(e) {

        e.preventDefault(); //just prevent the default behavior of the link
        
        var thisTouchDiv = $( this )

        showOverlayWindow (thisTouchDiv);
    }); 
}



