let songIndex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  {
    songName: "Justin Biber - Baby",
    filePath: "1.mp3",
    coverPath: "Justin.jpg",
  },
  {
    songName: "Shape of You",
    filePath: "2.mp3",
    coverPath: "Ed.jpg",
  },
  {
    songName: "Matargashti",
    filePath: "3.mp3",
    coverPath: "Matargashti.jpg",
  },
  {
    songName: "Taarif Karoon",
    filePath: "4.mp3",
    coverPath: "Tarrif.jpg",
  },
  {
    songName: "In Ankhone Ki Masti",
    filePath: "5.mp3",
    coverPath: "in ankhone ki masti.jpg",
  },
  {
    songName: "The Break Up",
    filePath: "6.mp3",
    coverPath: "The_Break_Up.jpg",
  },
  {
    songName: "Garba",
    filePath: "7.mp3",
    coverPath: "Garba.jpg",
  },
];

songItems.forEach((element, i) => {
  //   console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    // songIndex += 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  //   console.log("timeupdate");
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  //   console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", function () {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

// Array.from(document.getElementsByClassName("songItemPlay")).forEach(
//   (element) => {
//     element.addEventListener("click", (e) => {
//       makeAllPlays();

//       songIndex = parseInt(e.target.id) - 1;
//       e.target.classList.remove("fa-circle-play");
//       e.target.classList.add("fa-circle-pause");
//       audioElement.src = songs[songIndex].filePath;
//       masterSongName.innerText = songs[songIndex].songName;
//       audioElement.currentTime = 0;
//       audioElement.play();
//       gif.style.opacity = 1;
//       masterPlay.classList.remove("fa-circle-play");
//       masterPlay.classList.add("fa-circle-pause");
//     });
//   }
// );
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();

      const targetSongIndex = parseInt(e.target.id) - 1;
      if (targetSongIndex === songIndex && !audioElement.paused) {
        // Clicked on the same song that is currently playing, so pause it
        audioElement.pause();
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        gif.style.opacity = 0;
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
      } else {
        // Clicked on a different song or the same song while it's paused, so play it
        songIndex = targetSongIndex;
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
      }
    });
  }
);
//Logic ChatGPT

document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length; // Update songIndex, handle last song correctly
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  // Update play/pause class for the songItemPlay buttons
  makeAllPlays();
  const currentSongItemPlay = document.getElementById(songIndex + 1);
  currentSongItemPlay.classList.remove("fa-circle-play");
  currentSongItemPlay.classList.add("fa-circle-pause");
});

document.getElementById("previos").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length; // Update songIndex, handle first song correctly
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  // Update play/pause class for the songItemPlay buttons
  makeAllPlays();
  const currentSongItemPlay = document.getElementById(songIndex + 1);
  currentSongItemPlay.classList.remove("fa-circle-play");
  currentSongItemPlay.classList.add("fa-circle-pause");
});

// ... (remaining code)
