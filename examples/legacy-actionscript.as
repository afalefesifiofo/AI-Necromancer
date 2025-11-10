// ActionScript 2.0 - Flash legacy code

class GameController {
    var score:Number = 0;
    var player:MovieClip;
    
    function GameController() {
        _root.onEnterFrame = function() {
            updateGame();
        };
    }
    
    function updateGame():Void {
        score++;
        _root.scoreText.text = "Score: " + score;
        
        if (Key.isDown(Key.SPACE)) {
            player._y -= 10;
        }
    }
}
