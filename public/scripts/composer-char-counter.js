// A $( document ).ready() block.
$( document ).ready(function() {
  var maxLength = 140;
  $('textarea').keyup(function() {
    var length = $(this).val().length;
    var length = maxLength-length;
    $('.counter').text(length);

    // change color of text after limit is reached
    if($(this).val().length > maxLength){
                    $(".counter").css("color", "red");
                } else {
                    $(".counter").css("color", "black");
                }
  });

});
