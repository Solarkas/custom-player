const player = document.querySelector(".video-player");
const video = player.querySelector(".viewer");
const poster = player.querySelector(".poster");
const playBtn = player.querySelector(".play-btn");
const playIconPlay = player.querySelector(".play");
const rangeProgress = player.querySelector(".progress");
const volumeProgress = player.querySelector(".volume");
const volumeIcon = player.querySelector(".volume-icon");

function togglePlay() {
  poster.style.display = "none";
  playBtn.style.display = "none";
  if (video.paused) {
    video.play();
    playIconPlay.style.backgroundImage = "url('assets/svg/play.svg')";
  } else {
    video.pause();
    playBtn.style.display = "block";
    playIconPlay.style.backgroundImage = "url('assets/svg/pause.svg')";
  }
}

function handleRangeUpdate() {
  const percent = (video.currentTime / video.duration) * 100;
  rangeProgress.value = percent;
  rangeProgress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${rangeProgress.value}%, #fff ${rangeProgress.value}%, white 100%)`;
}
function updateVol() {
  const volume = this.value;
  video.volume = volume / 100;
  volumeProgress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${
    video.volume * 100
  }%, #fff ${video.volume * 100}%, white 100%)`;
  if (video.volume === 0) {
    volumeIcon.style.backgroundImage = "url('assets/svg/mute.svg')";
  } else {
    volumeIcon.style.backgroundImage = "url('assets/svg/volume.svg')";
  }
}
function volToggle() {
  const volume = volumeProgress.value;
  if (video.volume !== 0) {
    volumeIcon.style.backgroundImage = "url('assets/svg/mute.svg')";
    video.volume = 0;
  } else {
    volumeIcon.style.backgroundImage = "url('assets/svg/volume.svg')";
    video.volume = volume / 100;
  }
}

function scrub(e) {
  const scrubTime = (e.offsetX / rangeProgress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;

rangeProgress.addEventListener("change", handleRangeUpdate);
rangeProgress.addEventListener("click", scrub);
volumeProgress.addEventListener("click", updateVol);
rangeProgress.addEventListener("mousemove", (e) => mousedown && scrub(e));
rangeProgress.addEventListener("mousedown", () => (mousedown = true));
rangeProgress.addEventListener("mouseup", () => (mousedown = false));
video.addEventListener("timeupdate", handleRangeUpdate);
