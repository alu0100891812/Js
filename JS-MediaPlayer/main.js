var audioList = ["https://scummbar.com/mi2/MI1-CD/09%20-%20Guybrush%20and%20Elaine.mp3",
                 "https://scummbar.com/mi2/MI1-CD/06%20-%20Ghost%20Ship%20Shuffle.mp3",
                 "https://scummbar.com/mi2/MI1-CD/02%20-%20Chapter%20Screen.mp3"];
var currentSong = 0;
var play = false;
var audio = document.getElementById("song");
var lcd = document.getElementById("lcd");
var playButton = document.getElementById("play/pause");
var vol = document.getElementById("volume");
audio.src = audioList[0];
setInterval(progress, 250);

function playPause() {
    if(!play){
        audio.play();
        play = true;
        setName();
        playButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    }else{
        audio.pause();
        play = false;
        playButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    }
}

function stop() {
    audio.pause();
    play = false;
    audio.currentTime = 0;
    lcd.innerHTML = "";
    playButton.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    document.getElementById("progressbar").style.width = "0px";
}

function prev() {
    currentSong = (currentSong - 1) < 0 ? (audioList.length - 1) : currentSong-1;
    reset();
}

function next() {
    currentSong = (currentSong + 1) % audioList.length;
    reset();
}

function reset() {
    audio.pause();
    audio.src = audioList[currentSong];
    document.getElementById("progressbar").style.width = "0px";
    play = true;
    setName();
    playButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    audio.play();
}

function setName() {
    lcd.innerHTML = audioList[currentSong].substring(audioList[currentSong].lastIndexOf('/')+1, audioList[currentSong].lastIndexOf('.')).replace(/%20/g, "");
}

function volume() {
    audio.volume = vol.value/100;
}

function mute() {
    if(audio.volume == 0) {
        audio.volume = 1;
        vol.value = 100;
        document.getElementById("mute").innerHTML = '<i class="fa fa-volume-off" aria-hidden="true">';
    }else{
        vol.value = audio.volume = 0;
        document.getElementById("mute").innerHTML = '<i class="fa fa-volume-up" aria-hidden="true">';
    }
}

function forward() {
    audio.currentTime = ((audio.currentTime+5) < audio.duration) ? (audio.currentTime+5) : next();
}

function backward() {
    audio.currentTime = ((audio.currentTime-5) > 0) ? (audio.currentTime-5) : 0;
}

function progress() {
    audio.duration == audio.currentTime ? next() : document.getElementById("progressbar").style.width = ((parseInt(window.getComputedStyle(document.getElementById("progressbarbackground"), null).getPropertyValue("width"))/audio.duration) * audio.currentTime) + "px";
}
