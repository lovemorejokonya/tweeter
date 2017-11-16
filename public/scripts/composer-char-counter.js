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
  // console.log ( "default " + event.type + " prevented" );
  const tweetData = $("#tweetForm").serialize();
  // console.log(tweetData);
  // do post request using ajax
  $.ajax({
              url: "/tweets",
              type: "post",
              data: tweetData,
              success: function(d) {
                  console.log(d);
              }
          });
});

});
