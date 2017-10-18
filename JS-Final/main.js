var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var fps = 0, actualFps = 0;
var scale = 0.65;
var scalePlayer = 0.75;
var aliensItems = [];
var bulletsItem = [];
var player;
var isShooting = false;
var keyMap = {};
init();

function init() {
    setInterval(render, 1000/300);
    setInterval(aliensMove, 600);
    setInterval(bulletsMove, 1000/60);
    setInterval(function() {
        actualFps = fps; fps = 0;
    }, 1000);

    var image = new Image();
    image.src = "spaceInvaders.gif";
    image.addEventListener("load", function() {
        loadAliens(image);
        loadPlayer(image);
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
    if(player != undefined) { player.render(); }
    bulletsItem.forEach(function(e) {
        e.render();
    });
}

function clear() {
    context.clearRect(0,0,canvas.width, canvas.height);
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width, canvas.height);
}

function bulletsMove() {
    bulletsItem.forEach(function(e) {
        e.move();
    });
}

function aliensMove() {
    aliensItems.forEach(function(e) {
        e.move();
    });
}

function loadAliens(image) {
    var speedX = 40;
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
            rendItem['dead'] = false;
            rendItem['sizef'] = {x: rendItem.sizes.x*scale, y: rendItem.sizes.y*scale};
            rendItem['posc'] = {x: rendItem.poss.x, y: rendItem.poss.y};
            rendItem['posscreen'] = {x: (i*(170*scale))+((120*scale-rendItem.sizef.x)/2), y: (600-(j*120))*scale};
            rendItem['render'] = function() {
                if(!this.dead) { context.drawImage(this.source, this.posc.x, this.posc.y, this.sizes.x, this.sizes.y, this.posscreen.x, this.posscreen.y, this.sizef.x, this.sizef.y); }
            };
            rendItem['move'] = function() {
                if(!this.dead) {
                    if (this.posc.x==this.poss.x&&this.posc.y==this.poss.y) {
                        this.posc.x = this.posm.x; this.posc.y = this.posm.y;
                    }else{
                        this.posc.x = this.poss.x; this.posc.y = this.poss.y;
                    }
                    this.posscreen.x += speedX;
                    if ((aliensItems[aliensItems.length-1].posscreen.x + aliensItems[aliensItems.length-1].sizef.x + speedX) > canvas.width || (aliensItems[0].posscreen.x + speedX) < 0) {
                        aliensItems.forEach(function(e) {
                            e.posscreen.y += 20;
                        });
                        if((aliensItems[0].posscreen.x + 2*speedX) < 0) {
                            aliensItems[0].posscreen.x -= 2*speedX;
                            aliensItems.forEach(function(e) {
                                e.posscreen.x += speedX;
                            });
                        }else{
                            aliensItems.forEach(function(e) {
                                e.posscreen.x -= speedX;
                            });
                        }
                        speedX = -speedX;
                    }
                }
            }
        }
    }
}

function loadObstacles() {

}

function loadPlayer(image) {
    player = {source: image,
              bulletsps: 1,
              posc: {x: 150, y: 638},
              posscreen: {x: 960, y: 1000},
              sizes: {x: 73, y: 52},
              sizef: {x: 73*scalePlayer, y: 52*scalePlayer},
              render: function() {
                  context.drawImage(this.source, this.posc.x, this.posc.y, this.sizes.x, this.sizes.y, this.posscreen.x, this.posscreen.y, this.sizef.x, this.sizef.y);
              }
    };
    document.addEventListener("keydown", function(ev) {
        keyMap[ev.keyCode] = ev.type == 'keydown';
    });
    document.addEventListener("keyup", function(ev) {
        keyMap[ev.keyCode] = ev.type == 'keydown';
    });
    setInterval(function() {
        if(keyMap[37]){
            if(player.posscreen.x > 10) {
                player.posscreen.x -= 5;
            }
        }else if(keyMap[39]){
            if(player.posscreen.x + player.sizef.x < 1910) {
                player.posscreen.x += 5;
            }
        }
        if(keyMap[38]) {
            if(!isShooting) {
                fire();
            }
        }else if(keyMap[32]) {
            if(!isShooting) {
                fire();
            }
        }
        function fire() {
            bulletsItem.push({posscreen: {x: player.posscreen.x + player.sizef.x/2 -2, y: player.posscreen.y - player.sizef.y/2},
                              render: function() {
                                  context.fillStyle = "white";
                                  context.fillRect(this.posscreen.x, this.posscreen.y, 5, 20);
                              },
                              move: function() {
                                  this.posscreen.y -= 10;
                                  let index = bulletsItem.indexOf(this);
                                  if(this.posscreen.y <= aliensItems[0].posscreen.y && this.posscreen.x >= aliensItems[0].posscreen.x && this.posscreen.x <= (aliensItems[7].posscreen.x + aliensItems[7].sizef.x)) {
                                      aliensItems.some(function(e, i) {
                                          if(bulletsItem[index].posscreen.x >= e.posscreen.x && bulletsItem[index].posscreen.x <= e.posscreen.x + e.sizef.x + (50*scale)) {
                                              e.dead = true;
                                              bulletsItem.splice(bulletsItem.indexOf(this), 1);
                                              return true;
                                          }
                                      });
                                  }
                              }
            });
            isShooting = true;
            setTimeout(function() { isShooting = false; }, 1000/player.bulletsps);
        }
    }, 1000/60);
}
