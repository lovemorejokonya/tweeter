/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


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
// });

// function createTweetElement(tweetData) {

//   // declare variables and pull data from tweets object
//   const tweeterHandle = tweetData['user']['handle'];
//   const userName = tweetData['user']['name'];
//   const profilepic = tweetData['user']['avatars']['small'];
//   const tweetContent = tweetData['content']['text'];
//   const created_at = tweetData['created_at'];

//   //create HTML frame
//   const html_version = `<section id="tweets">
//                           <article class= "tweetsArticle">
//                             <header>
//                               <img class="profilepic" src="${profilepic}">
//                               <h3>${userName}</h3>
//                               <h4> ${tweeterHandle}</h4>
//                             </header>
//                             <content>
//                             <p>${tweetContent}</p>
//                             </content>
//                             <footer>
//                               10 days ago
//                               <img class="icons" src="/images/heart.svg"> </img>
//                               <img class="icons" src="/images/retweet.svg"> </img>
//                               <img class="icons" src="/images/flag.svg"> </img>
//                             </footer>
//                           </article>
//                         </section>`
//   return html_version
// }

// //loop through the tweets object and create html for each tweet
function renderTweets(tweets) {
  for(var tweet in tweets){
    console.log(tweet)
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
 // load tweets at form load
 loadTweets();

});
