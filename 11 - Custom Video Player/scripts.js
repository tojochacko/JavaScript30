const player = document.querySelector('.player');
const video = player.querySelector('video');
const progressBar = player.querySelector('.progress__filled');
const playButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');


//Functions defined from here
function togglePlay() {
    if(video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}

function handlePlayButton(e) {
    const paused = (e.type=='pause')?true:false;
    if(paused) {
        playButton.textContent = '►';
    }
    else {
        playButton.textContent = '❚ ❚';
    }
}

function updateRange() {
    //update the volume and the playback rate
    video[this.name] = this.value;
}

function videoSkip() {
    console.log(video.currentTime);
    video.currentTime += parseFloat(this.dataset.skip)
    console.log(video.currentTime);
}

function handleProgress() {
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;    
}

function handleFullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } 
    else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } 
    else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

//Events defined here
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', handlePlayButton);
video.addEventListener('pause', handlePlayButton);
video.addEventListener('timeupdate', handleProgress);

ranges.forEach(range => range.addEventListener('change', updateRange));
skipButtons.forEach(button => button.addEventListener('click', videoSkip));
fullscreen.addEventListener('click', handleFullScreen);
