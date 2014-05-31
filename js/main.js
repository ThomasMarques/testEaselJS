/// Global variable
var stage, holder, level;

function Case () {
    /// attributes
    this.x;
    this.y;
    this.shape;
}

function Level () {
    /// attributes
    this.caseHeight = 40;
    this.caseWidth = 40;
    this.caseNumberH = 13;
    this.caseNumberW = 18;
    this.cases = [];

    /// methods
    this.init = function() {
        for(var i = 1; i <= this.caseNumberW; ++i) {
            for(var j = 1; j <= this.caseNumberH; ++j) {
                var tempCase = new Case;
                tempCase.x = i;
                tempCase.y = j;
                var tempShape = new createjs.Shape();
                tempShape.graphics.beginStroke(createjs.Graphics.getRGB(200, 200, 200))
                .drawRect(i * this.caseWidth, j * this.caseHeight, this.caseWidth, this.caseHeight);
                holder.addChild(tempShape); 
                tempCase.shape = tempShape;
                this.cases.push(tempCase);
            }
        }
    };
}


function init() {
    /// Creating stage
    stage = new createjs.Stage("canvas-easel");
    /// Creating container
    holder = stage.addChild(new createjs.Container());
    /// Creating level
    level = new Level();

    holder.x = level.caseNumberW * level.caseWidht;
    holder.y = level.caseNumberH * level.caseHeight;

    /// level initialisation
    level.init();

    /// Starting the timer
    createjs.Ticker.on("tick", tick);
}

function tick(event) {
    stage.update(event);
}

window.onload = init();