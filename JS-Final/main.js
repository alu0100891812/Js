var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var fps = 0, actualFps = 0;
var aliensItems = [];
init();

function init() {
    setInterval(render, 1000/300);
    setInterval(move, 600);
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
    aliensItems.forEach(function(e) {
        e.render();
    });
}

function clear() {
    context.clearRect(0,0,canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);
}

function move() {
    aliensItems.forEach(function(e) {
        e.move();
    });
}

function loadAliens(image) {
    var scale = 0.65;
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 8; i++) {
            switch (j) {
                case 0:
                    aliensItems.push({source: image,
                                      poss: {x: 19, y: 134},
                                      posm: {x: 160, y: 134},
                                      sizes: {x: 120, y: 80}
                                    });
                    break;
                case 1:
                    aliensItems.push({source: image,
                                      poss: {x: 19, y: 14},
                                      posm: {x: 165, y: 14},
                                      sizes: {x: 110, y: 80}
                                    });
                    break;
                case 2:
                    aliensItems.push({source: image,
                                      poss: {x: 421, y: 134},
                                      posm: {x: 300, y: 134},
                                      sizes: {x: 100, y: 80}
                                    });
                    break;
                case 3:
                    aliensItems.push({source: image,
                                      poss: {x: 300, y: 134},
                                      posm: {x: 421, y: 134},
                                      sizes: {x: 100, y: 80}
                                    });
                    break;
                case 4:
                    aliensItems.push({source: image,
                                      poss: {x: 312, y: 14},
                                      posm: {x: 428, y: 14},
                                      sizes: {x: 80, y: 80}
                                  });
                    break;
            }
            let rendItem = aliensItems[i+(j*8)];
            rendItem['sizef'] = {x: rendItem.sizes.x*scale, y: rendItem.sizes.y*scale};
            rendItem['posc'] = {x: rendItem.poss.x, y: rendItem.poss.y};
            rendItem['posscreen'] = {x: (i*(170*scale))+((120*scale-rendItem.sizef.x)/2), y: (550-(j*120))*scale};
            rendItem['render'] = function() {
                context.drawImage(this.source, this.posc.x, this.posc.y, this.sizes.x, this.sizes.y, this.posscreen.x, this.posscreen.y, this.sizef.x, this.sizef.y);
            };
            rendItem['move'] = function() {
                if (this.posc.x==this.poss.x&&this.posc.y==this.poss.y) { this.posc.x = this.posm.x; this.posc.y = this.posm.y;
                }else{ this.posc.x = this.poss.x; this.posc.y = this.poss.y; }
                this.posscreen.x += 30;
                if ((aliensItems[aliensItems.length-1].posscreen.x + aliensItems[aliensItems.length-1].sizef.x) > 1920) {
                    aliensItems.forEach(function(e) {
                        e.posscreen.y += 20;
                    });
                }
            }
        }
    }
}
