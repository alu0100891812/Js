var soundsPath = "https://rawgit.com/pffy/mp3-piano-sound/master/mp3/";
var teclas = ["c1", "c1s", "d1", "d1s", "e1", "f1", "f1s", "g1", "g1s", "a1", "a1s", "b1", "c1"];
var audios = [];

teclas.forEach(function(e) {
    document.getElementById("piano").innerHTML += '<div id="' + e + '" class="key ' + ((e.search('s') != -1) ? 'black' : 'white') + '"></div>';
    audios.push(new Audio(soundsPath + e + ".mp3"));
});

teclas.forEach(function(e, i) {
    document.getElementById(e).addEventListener("click", function() {
        audios[this].currentTime = 0;
        audios[this].play();
    }.bind(i));
});
