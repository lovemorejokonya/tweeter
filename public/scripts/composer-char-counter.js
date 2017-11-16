// A $( document ).ready() block.
$( document ).ready(function() {
  var maxLength = 140;
  $('textarea').keyup(function() {
    var length = $(this).val().length;
    var length = maxLength-length;
    $('.counter').text(length);

    // change color of text after limit is reached
    if($(this).val().length > 140){
                    $(".counter").css("color", "red");
                } else {
                    $(".counter").css("color", "black");
                }

  });

  // if user hovers over a tweet it should display the icons and change border color to black
  $("article").hover(function () {
    $(this).find(".icons").show();
    $(this).css("border-color", "black");
  },function () {  // else it should hide the icons and change borader color to grey
      $(this).find(".icons").hide();
      $(this).css("border-color", "lightgrey");
  });

// prevent default submission of form and redirection
$("#tweetForm").submit(function( event ) {
  event.preventDefault();
  // error handling
  // console.log($(this).find("textarea").val());
  // if ($(this).find("textarea").val() = ""){
  //   $errorMessage = $("<div>").text(object.content.text);
  //   $content = $("new-tweet").append($errorMessage);
  // }
  if($("textarea").val().length == 0 || $("textarea").val().length > 2){
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
                    console.log(d);
                }
            });
    }
});

function validate() {
    var errorMessage, x;
    errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML = "";
    x = $(this).find("textarea").val();
    try {
        if($("textarea").val().length == 0)  throw "You can not submit an empty tweet. Please enter something!";
        if($("textarea").val().length > 2) throw "You can not submit more than 140 characters";
        // x = Number(x);
        // if(x < 5)    throw "too low";
        // if(x > 10)   throw "too high";
    }
    catch(err) {
        errorMessage.innerHTML = err;
    }
}

});
