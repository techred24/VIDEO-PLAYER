// Obtener los elementos
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Crear las funciones 
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}
function updateButton () {
    if (this.paused) {
        toggle.textContent = '▶';
    } else {
        toggle.textContent = '||'
    }
}
function skip (e) {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}
function rangeUpdate () {
    // console.log(this.name);
    // console.log(this.value);
    video[this.name] = this.value;
}
function handleProgress () {
    const percentage = (video.currentTime / video.duration)*100;
    progressBar.style.width = `${percentage}%`;
}
function scrub (e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
// Event Listeners
video.addEventListener('click',togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
// ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate));

let click = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
    if (click) {
        scrub(e);
    }
});
progress.addEventListener('mousedown', () => click=true);
progress.addEventListener('mouseup', () => click=false);