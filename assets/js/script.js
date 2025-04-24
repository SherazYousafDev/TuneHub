// Variables
const songTitle = document.querySelector(".song-title");
const songArtist = document.querySelector(".song-artist");
const songPoster = document.querySelector(".song-poster");
const playPauseImg = document.querySelector("#play");
const volumeSlider = document.querySelector("#v-slider");
const songDuration = document.querySelector("#song-duration");
const currentTimeEl = document.querySelector("#current-time");
const totalDurationEl = document.querySelector("#total-duration");
const playlistIcon = document.querySelector("#playlist-icon");
const playlistToggle = document.querySelector(".playlist-box");
const playlistSongs = document.querySelectorAll(".playlist-songs");
const volSvg = document.querySelector("#volSvg");

let index = 0;
let playingSong = false;
let track = document.createElement("audio");

// All Songs
let songs = [
  {
    title: "Ishq",
    artist: "Faheem Abdullah x Rauhan Malik",
    path: "assets/music/music-1.mp3",
    poster: "assets/images/poster-1.jpg",
  },
  {
    title: "jhol",
    artist: "Maanu x Annural Khalid",
    path: "assets/music/music-2.mp3",
    poster: "assets/images/poster-2.jpg",
  },
  {
    title: "heer",
    artist: "Ali Raza x Shjar",
    path: "assets/music/music-3.mp3",
    poster: "assets/images/poster-3.jpg",
  },
  {
    title: "Nahin Milta",
    artist: "Bayaan",
    path: "assets/music/music-4.mp3",
    poster: "assets/images/poster-4.jpg",
  },
  {
    title: "Die With A Smile",
    artist: "Lady Gaga x Bruno Mars ",
    path: "assets/music/music-5.mp3",
    poster: "assets/images/poster-5.jpg",
  },
  {
    title: "Pal pal",
    artist: "Afusic x Talwiinder",
    path: "assets/music/music-6.mp3",
    poster: "assets/images/poster-6.jpg",
  },
];

// Load Func
function loadTrack(index) {
  track.src = songs[index].path;
  songTitle.innerHTML = songs[index].title;
  songArtist.innerHTML = songs[index].artist;
  songPoster.style = `background-image: url(${songs[index].poster});`;

  track.load(); // Load audio
  track.currentTime = 0; // Reset position

  // Wait for metadata to be loaded to get duration
  track.addEventListener("loadedmetadata", () => {
    songDuration.max = track.duration;
  });

  volume();
}

// For Song Duration
setInterval(() => {
  songDuration.value = track.currentTime;
}, 500);

loadTrack(index);

// Play/Pause toggle
function playPause() {
  if (!playingSong) {
    playSong();
  } else {
    pauseSong();
  }
}

// Play
function playSong() {
  track.play();
  playingSong = true;
  playPauseImg.src = "assets/images/icons/pause.svg";
}

// Pause
function pauseSong() {
  track.pause();
  playingSong = false;
  playPauseImg.src = "assets/images/icons/play.svg";
}

// Previous
function preSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadTrack(index);
  playSong();
}

// Next
function nextSong() {
  index = (index + 1) % songs.length;
  loadTrack(index);
  playSong();
}

// Volume control
function volume() {
  track.volume = volumeSlider.value / 100;
  volSvg.src =
    volumeSlider.value == 0
      ? "assets/images/icons/mute.svg"
      : "assets/images/icons/volume.svg";
}

// Change duration
function changeDuration(value) {
  track.currentTime = value;
  if (playingSong) {
    track.play();
  }
}

// For Song Duration CHange w.r.t Song
setInterval(() => {
  if (!isNaN(track.duration)) {
    songDuration.value = track.currentTime;
    currentTimeEl.textContent = formatTime(track.currentTime);
    totalDurationEl.textContent = formatTime(track.duration);
  }
}, 500);

// Time Shows func
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  if (sec < 10) sec = "0" + sec;
  return `${min}:${sec}`;
}

// playlist toggle
playlistIcon.addEventListener("click", () => {
  playlistToggle.classList.toggle("active");
});

// For play songs from sidebar
playlistSongs.forEach((song, index) => {
  song.addEventListener("click", () => {
    loadTrack(index);
    playSong();
  });
});
