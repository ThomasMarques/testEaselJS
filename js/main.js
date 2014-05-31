/// Global variable
var stage, level, loader;

var play = true;
var sound = true;

function Case () {
    /// attributes
    this.x;
    this.y;
    this.shape;
}

function Level () {
    /// attributes
    this.beginX = 18;
    this.beginY = 18;
    this.caseNumberH = 14;
    this.caseNumberW = 20;
    this.caseHeight = 36;
    this.caseWidth = 36;
    this.cases = [];

    /// methods
    this.init = function() {
        for(var i = 0; i <= this.caseNumberW; ++i) {
            for(var j = 0; j <= this.caseNumberH; ++j) {
                var tempCase = new Case;
                tempCase.x = i;
                tempCase.y = j;
                var tempShape = new createjs.Shape();
                tempShape.graphics.beginStroke(createjs.Graphics.getRGB(200, 200, 200))
                .drawRect(this.beginX + i * this.caseWidth, this.beginY + j * this.caseHeight, this.caseWidth, this.caseHeight);
                stage.addChild(tempShape); 
                tempCase.shape = tempShape;
                this.cases.push(tempCase);
            }
        }

        /// Adding buttons
        var data = {
            images:[loader.getResult("buttons")],
            frames:{width:36, height:36},
            animations: {play:0, pause:1, soundOn:2, soundOff:3}
        }
        // create a SpriteSheet using the data:
        spriteSheet = new createjs.SpriteSheet(data);

        /// Adding sound button
        var playButton = new createjs.Sprite(spriteSheet);
        playButton.x = this.beginX;
        playButton.y = (this.caseNumberH + 1) * this.caseHeight + this.beginY;
        playButton.gotoAndStop("pause");
        playButton.on("mousedown", function(e) {
            if(play) {
                play = false;
                playButton.gotoAndStop("play");
            } else {
                play = true;
                playButton.gotoAndStop("pause");
            }
        });
        stage.addChild(playButton);

        var soundButton = playButton.clone();
        soundButton.gotoAndStop("soundOn");
        soundButton.x += this.caseNumberW * this.caseWidth;
        soundButton.on("mousedown", function(e) {
            if(sound) {
                sound = false;
                soundButton.gotoAndStop("soundOff");
            } else {
                sound = true;
                soundButton.gotoAndStop("soundOn");
            }
        });
        stage.addChild(soundButton);
    };
}


function init() {
    /// Creating stage
    stage = new createjs.Stage("canvas-easel");
    /// Creating container
    holder = stage.addChild(new createjs.Container());
    /// Creating level
    level = new Level();

    /// Load assets
    manifest = [
        {src:"assets/tower.png", id:"tower"},
        {src:"assets/tower-price.png", id:"tower-price"},
        {src:"assets/buttons.png", id:"buttons"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest);
}

/// Function called when asset are loaded.
function handleComplete() {

    /// level initialisation
    level.init();

    /// Starting the timer
    createjs.Ticker.on("tick", tick);
}

function tick(event) {
    stage.update(event);
}

window.onload = init();