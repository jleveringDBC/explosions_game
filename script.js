function Projectile(){

}

Projectile.prototype.test = function()
{
  console.log("testing");
};

function Game() {
  this.launchpad = $("#launchpad");
  this.launchers = $(".launcher");
  this.baseSpeed = 1500;
  this.testCounter = 0;
}

Game.prototype.testFunction = function()
{
  console.log("In testFunction.");
  console.log(this.testCounter);
  this.testCounter++;
  // if(this.testCounter < 5)
  // {
  //   console.log(this.testCounter);
  //   this.testCounter++;
  //   console.log(this.testCounter);
  // }
  // else
  // {
  //   clearInterval();
  // }
};

Game.prototype.startGame = function()
{
  console.log("In startGame. baseSpeed is :" + this.baseSpeed);
  var interval = setInterval(this.testFunction(),500);
  console.log("Done startGame");
};

$(function() {
  $("button").click(function(e){
    $("#projectile").css('display', 'block');
    var launcher = $("#projectile").parent();
    // var rectTest = document.getElementById(launcher);
    // var rect = rectTest.getBoundingClientRect();
    // console.log(rect.top, rect.right);
    $("#projectile").animate({
      'top': launcher.position().top-300
    }, 400);
    var game = new Game();
    game.startGame();
    console.log(game.testCounter);
  });
});
