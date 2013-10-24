var interval;
function placeImage(launcher){
  $(launcher).append('<img class="projectile" title="3" src="firefly-closeup.jpg"></img>');
  return $(launcher).children().last();
}

function checkWin(){
  if(document.getElementById("lives").value <= 0)
  {
    return true;
  }
  return false;
}

function Projectile(){
  var launcher_number = Math.floor((Math.random()*8)+1);
  this.launcher = $("#launcher"+launcher_number);
  this.image = placeImage(this.launcher);
}

Projectile.prototype.launch = function()
{
  this.image.css('display', 'block');
  this.image.animate({
    'top': this.launcher.position().top-420
  }, 1500);
  var that = this;
  this.image.animate({
    'top': this.launcher.position().top+300
  }, 1500, function(){
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
  this.testCounter = 0;
}

Game.prototype.play = function()
{
  if(checkWin() === true)
  {
    window.clearInterval(interval);
    $("img").remove();
    $(".most_of_it").hide();
    $(".win_message").html("<h1>GAME OVER MAN, GAME OVER</h1><br><br><h3>You earned " + document.getElementById("points").value + " points</h3>");
  }
  else
  {
    var new_image = new Projectile();
    new_image.launch();
  }
  
};

Game.prototype.startGame = function()
{
  console.log("In startGame. baseSpeed is :" + this.baseSpeed);
  var interval = setInterval(this.play, this.baseSpeed);
  console.log("Done startGame");
};

$(function() {
  var gameStart = false;
  $("button").click(function(e){
    if(gameStart == false)
    {
      gameStart = true;
      var game = new Game();
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
