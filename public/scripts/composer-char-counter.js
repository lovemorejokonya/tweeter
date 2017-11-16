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


      $("article").hover(function () {
        $(this).find(".icons").show();
        $(this).css("border-color", "black");
    },function () {
        $(this).find(".icons").hide();
        $(this).css("border-color", "lightgrey");
    });

});
