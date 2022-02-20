var vid, playbtn, seekbar, curtimetext, durtimetext, mutebtn, volumeslider, fullscreenbtn;

function initializePlayer(){
    vid = document.getElementById("main-video");
    playbtn = document.getElementById("playpausebtn");
    seekbar = document.getElementById("seekslider");
    curtimetext = document.getElementById("curtimetext");
    durtimetext = document.getElementById("durtimetext");
    mutebtn = document.getElementById("mutebtn");
    volumeslider = document.getElementById("volumeslider");
    fullscreenbtn = document.getElementById("fullscreenbtn");

    playbtn.addEventListener("click",playPause,false);
    seekbar.addEventListener("input",vidSeek,false);
    vid.addEventListener("timeupdate",seektimeupdate,false);
    mutebtn.addEventListener("click",vidmute,false);
    volumeslider.addEventListener("input",setvolume,false);
    fullscreenbtn.addEventListener("click",toggleFullScreen,false);

}
window.onload = initializePlayer;

function playPause(){
    if(vid.paused){
        vid.play();
        playbtn.innerHTML = "⏯️";
    }else{
        vid.pause();
        playbtn.innerHTML = "▶️";
    }
}

function vidSeek(){
    var seekto = vid.duration * (seekbar.value / 100);
    vid.currentTime = seekto;
}

function seektimeupdate(){
    var nt = vid.currentTime * (100 / vid.duration);
    seekbar.value = nt;
    var curmins = Math.floor(vid.currentTime / 60);
    var cursecs = Math.floor(vid.currentTime - curmins * 60);
    var durmins = Math.floor(vid.duration / 60);
    var dursecs = Math.round(vid.duration - durmins * 60);
    if (cursecs < 10) {
        cursecs = "0"+cursecs;        
    }
    if (dursecs < 10) {
        dursecs = "0"+dursecs;        
    }
    if (curmins < 10) {
        curmins = "0"+curmins;        
    }
    if (durmins < 10) {
        durmins = "0"+durmins;        
    }

    curtimetext.innerHTML = curmins+":"+cursecs;
    durtimetext.innerHTML = durmins+":"+dursecs;
}

function vidmute(){
    if(vid.muted){
        vid.muted = false;
        mutebtn.innerHTML = "🔊";
        volumeslider.value = "100";

    }else{
        vid.muted = true;
        mutebtn .innerHTML = "🔈";
        volumeslider.value = "0";
    }   
}

function setvolume() {
    vid.volume = volumeslider.value / 100;
}

function fullscreenbtn() {
    if (vid.requestFullScreen) {
        vid.requestFullScreen();
    }else if (vid.webkitRequestFullScreen){
        vid.webkitRequestFullScreen();
    }else if (vid.mozRequestFullScreen) {
        vid.mozRequestFullScreen();
    }
}