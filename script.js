$(function() {
  $("input[type=button]").click(function(e){
    console.log("click")
    $("#projectile").css('display', 'block');
    var launcher = $("#projectile").parent();
    // var rectTest = document.getElementById(launcher);
    // var rect = rectTest.getBoundingClientRect();
    // console.log(rect.top, rect.right);
    console.log(launcher.position());
    $("#projectile").animate({
      'top': launcher.position().top-300
    }, 400);
  });
});