var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var fps = 0, actualFps = 0;
var renderItems = [];
init();

function init() {
    setInterval(render, 1000/60);
    setInterval(function() {
        actualFps = fps; fps = 0;
    }, 1000);

    var image = new Image();
    image.src = "spaceInvaders.gif";
    image.addEventListener("load", function() {
        loadAliens(image);
    });
}

function render() {
    clear();
    context.font = "18pt Arial";
    context.fillStyle = "white";
    context.fillText(actualFps + " FPS", 20, 50);
    fps++;
    renderItems.forEach(function(e) {
        e.render();
    });
}

function clear() {
    context.clearRect(0,0,canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);
}

function loadAliens(image) {
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 8; i++) {
            switch (j) {
                case 0:
                    renderItems.push({source: image,
                                      poss: {x: 19, y: 134},
                                      posm: {x: 160, y: 134},
                                      size: {x: 120, y: 80},
                                      render: function() {
                                          context.drawImage(this.source, this.poss.x, this.poss.y, this.size.x, this.size.y, i*120, 500, this.size.x, this.size.y);
                                      }});
                    break;
                case 1:
                    renderItems.push({source: image,
                                      poss: {x: 19, y: 14},
                                      posm: {x: 165, y: 14},
                                      size: {x: 110, y: 80},
                                      render: function() {
                                          context.drawImage(this.source, this.poss.x, this.poss.y, this.size.x, this.size.y, i*120, 400, this.size.x, this.size.y);
                                      }});
                    break;
                case 2:
                    renderItems.push({source: image,
                                      poss: {x: 19, y: 134},
                                      posm: {x: 160, y: 134},
                                      size: {x: 120, y: 80},
                                      render: function() {
                                          context.drawImage(this.source, this.poss.x, this.poss.y, this.size.x, this.size.y, i*120, 300, this.size.x, this.size.y);
                                      }});
                    renderItems.push({source: image,
                                      poss: {x: 19, y: 134},
                                      posm: {x: 160, y: 134},
                                      size: {x: 120, y: 80},
                                      render: function() {
                                          context.drawImage(this.source, this.poss.x, this.poss.y, this.size.x, this.size.y, i*120, 200, this.size.x, this.size.y);
                                      }});
                    break;
                case 3:
                    renderItems.push({source: image,
                                      poss: {x: 19, y: 134},
                                      posm: {x: 160, y: 134},
                                      size: {x: 120, y: 80},
                                      render: function() {
                                          context.drawImage(this.source, this.poss.x, this.poss.y, this.size.x, this.size.y, i*120, 100, this.size.x, this.size.y);
                                      }});
                    break;
            }
        }
    }
}
