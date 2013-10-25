// Setup for SoundCloud API (to enable song on play)

var iframeElement   = document.querySelector('iframe');
var widget1         = SC.Widget(iframeElement);

var interval;
var globalGame;
function placeImage(launcher){
  $(launcher).append('<img class="projectile" title="3" src="explosion.jpg"></img>');
  return $(launcher).children().last();
}

function checkWin(){
  if(document.getElementById("lives").value <= 0)
  {
    return true;
  }
  return false;
}

Game.prototype.updateTime = function()
{
  var currentTime = new Date().getTime();
  globalGame.speed = globalGame.baseSpeed - ((currentTime - globalGame.startTime)/1000)*10;
  console.log(globalGame.speed);
};

function Projectile(){
  var launcher_number = Math.floor((Math.random()*8)+1);
  this.launcher = $("#launcher"+launcher_number);
  this.image = placeImage(this.launcher);
}

Projectile.prototype.launch = function()
{
  var upDistance = Math.floor((Math.random()*500)+320);
  var downDistance = upDistance - (Math.floor(Math.random()*100));
  globalGame.updateTime();
  this.image.css('display', 'block');
  this.image.animate({
    'top': this.launcher.position().top-upDistance
  }, globalGame.speed);
  var that = this;
  this.image.animate({
    'top': this.launcher.position().top+downDistance
  }, globalGame.speed, function(){
    if(that.image.attr("title") != "hit")
    {
      if(document.getElementById("lives").value > 0)
      {
        document.getElementById("lives").value = parseInt(document.getElementById("lives").value,10) - 1;
      }
    }
  });
  
};

function Game() {
  this.launchpad = $("#launchpad");
  this.launchers = $(".launcher");
  this.baseSpeed = 1500;
  this.speed = this.baseSpeed;
  this.testCounter = 0;
  this.startTime = new Date().getTime();
}

Game.prototype.play = function()
{
  if(checkWin() === true)
  {
    window.clearInterval(interval);
    $("img").remove();
    $(".most_of_it").hide();
    $("body").css("background-image", "url('man_on_fire.gif')");
    widget1.pause();
    $(".win_message").html("<div style='background-color:white;width:600px;'><h1>GAME OVER MAN, GAME OVER</h1><br><br><h3>You earned " + document.getElementById("points").value + " points</h3></div>");
  }
  else
  {
    var new_image = new Projectile();
    new_image.launch();
  }
  
};

Game.prototype.startGame = function()
{
  var interval = setInterval(this.play, this.speed);
};

$(function() {
  var gameStart = false;
  $("button").click(function(e){
    if(gameStart === false)
    {
      $("button").html("RELOAD");
      widget1.setVolume(50);
      widget1.play();
      gameStart = true;
      var game = new Game();
      globalGame = game;
      game.startGame();
    }
    else
    {
      location.reload();
    }
  });

  $(document).on("click", "img", function(e){
    e.preventDefault();
    this.setAttribute("title", "hit");
    this.remove();
    document.getElementById("points").value = parseInt(document.getElementById("points").value,10) + 100;
    // var that = this;
    // setTimeout(function(){that.remove();},500);
  });
});
