/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(object){
    $tweet = $("<article>").addClass("tweetsArticle");
    $header = $("<header>");
    $content = $("<content>");
    $profilepic = $("<img>").addClass("profilepic").attr("src", object.user.avatars.small );
    $userName = $("<h3>").text(object.user.name);
    $tweeterHandle = $("<h4>").text(object.user.handle);
    $tweetParagraph = $("<p>").text(object.content.text);

    // method to the time lapse
    $countDays = Math.floor((Date.now() - object.created_at) / (1000 * 60 * 60 * 24));
    $footer = $("<footer>").text($countDays + " days ago");
    $iconsHeart = $("<img>").addClass("icons").attr("src", "/images/heart.svg");
    $iconsRetweet = $("<img>").addClass("icons").attr("src", "/images/retweet.svg")
    $iconsFlag = $("<img>").addClass("icons").attr("src", "/images/flag.svg")

    $header = $header.append($profilepic).append($userName).append($tweeterHandle);
    $content = $content.append($tweetParagraph)
    $footer = $footer.append($iconsHeart).append($iconsRetweet).append($iconsFlag);
    $tweet = $tweet.append($header).append($content).append($footer);
    return $tweet;
}

// //loop through the tweets object and create html for each tweet
function renderTweets(tweets) {
  for(var tweet in tweets){
   var $tweet = createTweetElement(tweets[tweet]);
   $("#tweets").prepend($tweet);
 }
};

// function to renderTweets(data);
 function loadTweets(){
  $("#tweets").empty();
    $.ajax({
      url: "/tweets",
      method: 'GET',
      success: function (moreTweetsJson) {
        renderTweets(moreTweetsJson)
      }
    });
 }

//render tweets when document is ready
$(document).ready( function () {

// compose button toggle feature
   $("section.new-tweet").hide();
  // On click event to toggle the form
  $("#compose").on("click", function(){
    $("section.new-tweet").slideToggle();
    //set focus on text box
    $("#tweetTextBox").focus();
  });


  // prevent default submission of form and redirection
$("#tweetForm").submit(function( event ) {
  event.preventDefault();
  //validate tweet text area
  if($("textarea").val().length == 0 || $("textarea").val().length > 140){
    validate();
  } else {
    //clear errorMessage HTMNL
    errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML = "";
    const tweetData = $("#tweetForm").serialize();
    // do post request using ajax
    $.ajax({
                url: "/tweets",
                type: "post",
                data: tweetData,
                success: function(d) {
                    loadTweets();
                }
            });
      // clear text field after form submission
      $(this).find("textarea").val("");
    }
});

//function to validate the text entered in the tweet text box
function validate() {
    var errorMessage, x;
    errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML = "";
    x = $(this).find("textarea").val();
    try {
        if($("textarea").val().length == 0)  throw "You can not submit an empty tweet. Please enter something!";
        if($("textarea").val().length > 140) throw "You can not submit more than 140 characters";
    }
    catch(err) {
        errorMessage.innerHTML = err;
    }
}

// load tweets at form load
 loadTweets();

});
