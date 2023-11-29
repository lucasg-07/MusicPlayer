const songName = document.getElementById("song-name");
const bandname = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const crrProgress = document.getElementById("current-progress"); 
const cntrProgress = document.getElementById("progress-container"); 

const qMentira = {
  songName: "Qual Mentira Vou Acreditar",
  file: "Qual_mentira_vou_acreditar",
  artist: "Racionais MC's",
};

const comeAsYouAre = {
  songName: "Come as You Are",
  file: "Come_As_You_Are",
  artist: "Nirvana",
};

const ccLady = {
  songName: "Cheri Cheri Lady",
  file: "Cheri_Cheri_Lady",
  artist: "Modern Talking",
};

let isPlaying = false;
const playlist = [qMentira, comeAsYouAre, ccLady];
let index = 0;

function playSong() {
    isPlaying = true;
    play.querySelector("i.bi").classList.remove("bi-play-circle-fill");
    play.querySelector("i.bi").classList.add("bi-pause-circle-fill");
    song.play();
    isPlaying = true;
}
  
function pauseSong() {
    isPlaying = false;
    play.querySelector(" i.bi").classList.add("bi-play-circle-fill");
    play.querySelector("i.bi").classList.remove("bi-pause-circle-fill");
    song.pause();
    isPlaying = false;
}
  
function playPauseDecider() {
    if (isPlaying === true) {
      pauseSong();
    } else {
      playSong();
    }
}

function initSong() {
    cover.src = `imagens/${playlist[index].file}.webp`;
    song.src = `musicas/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandname.innerText = playlist[index].artist;
}

function previousSong() {
    if(index === 0){
        index = playlist.length - 1;
    } else {
        index -=1;
    }
    initSong();
    playSong();
  }

function nextSong() {
    if(index === playlist.length - 1){
        index = 0;
    } else {
        index +=1;
    }
    initSong();
    playSong();
}

function updateprogressbar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    crrProgress.style.setProperty("--progress", `${barWidth}%`);

}

function jumpTo(event) {
    const widht = cntrProgress.clientWidth;
    const clickPos = event.offsetX;
    const jumpToTime = (clickPos / widht) * song.duration;
    song.currentTime = jumpToTime;
}

  initSong();

  play.addEventListener("click", playPauseDecider);
  previous.addEventListener("click", previousSong);
  next.addEventListener("click", nextSong);
  song.addEventListener("timeupdate", updateprogressbar);
  cntrProgress.addEventListener("click", jumpTo)
