// Song data
const songList = [
  {
    title: "Sweet Child O Mine",
    file: "Sweet Child O Mine.mp3",
    cover: "SweetChildOMine.jpg"
  },
  {
    title: "Nightrain",
    file: "Nightrain.mp3",
    cover: "Nightrain.png"
  },
  {
    title: "November Rain",
    file: "November Rain.mp3",
    cover: "November Rain.jpg"
  },
  {
    title: "Welcome To The Jungle",
    file: "Welcome To The Jungle.mp3",
    cover: "Welcome To The Jungle.jpg"
  },
  {
    title: "Rocket Queen",
    file: "Rocket Queen.mp3",
    cover: "Rocket Queen.jpg"
  },
  {
    title: "This I Love",
    file: "This I Love.mp3",
    cover: "This I Love.jpg"
  },
  {
    title: "Knockin On Heavens Door",
    file: "Knockin On Heavens Door.mp3",
    cover: "Knockin On Heavens Door.jpg"
  },
  {
    title: "Live And Let Die Live",
    file: "Live And Let Die Live.mp3",
    cover: "Live And Let Die Live.jpg"
  }
];

// Canción actual
let actualSong = null;

// Capturar elementos del DOM para trabajar con JS
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const btnOcultar = document.getElementById("btn-mp3");
progressContainer.addEventListener("click", setProgress);

// Escuchar el elemento AUDIO
audio.addEventListener("timeupdate", updateProgress);

// Escuchar clicks en los controles
play.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

next.addEventListener("click", () => nextSong());
prev.addEventListener("click", () => prevSong());

// Cargar canciones y mostrar el listado
function loadSongs() {
  songList.forEach((song, index) => {
    // Crear li
    const li = document.createElement("li");
    // Crear p
    const link = document.createElement("p");
    // Hidratar p
    link.textContent = song.title;
    // Escuchar clicks
    link.addEventListener("click", () => loadSong(index));
    // Añadir a li
    li.appendChild(link);
    // Aañadir li a ul
    songs.appendChild(li);
  });
}

// Cargar canción seleccionada
function loadSong(songIndex) {
  if (songIndex !== actualSong) {
    changeActiveClass(actualSong, songIndex);
    actualSong = songIndex;
    audio.src = "../assets/audio/" + songList[songIndex].file;
    playSong();
    changeSongtitle(songIndex);
    changeCover(songIndex);
  }
}

// Actualizar barra de progreso de la canción
function updateProgress(event) {
  const { duration, currentTime } = event.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + "%";
}

// Hacer la barra de progreso clicable
function setProgress(event) {
  const totalWidth = this.offsetWidth;
  const progressWidth = event.offsetX;
  const current = (progressWidth / totalWidth) * audio.duration;
  audio.currentTime = current;
}

// Actualiar controles
function updateControls() {
  if (audio.paused) {
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
  } else {
    play.classList.add("fa-pause");
    play.classList.remove("fa-play");
  }
}

// Reproducir canción
function playSong() {
  if (actualSong !== null) {
    audio.play();
    updateControls();
  }
}

// Pausar canción
function pauseSong() {
  audio.pause();
  updateControls(); 
}

// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex) {
  const links = document.querySelectorAll("p");
  if (lastIndex !== null) {
    links[lastIndex].classList.remove("active");
  }
  links[newIndex].classList.add("active");
}

// Cambiar el cover de la canción
function changeCover(songIndex) {
  cover.src = "../assets/img/Reproductor/" + songList[songIndex].cover;
}

// Cambiar el título de la canción
function changeSongtitle(songIndex) {
  title.innerText = songList[songIndex].title;
}

// Anterior canción
function prevSong() {
  if (actualSong > 0) {
    loadSong(actualSong - 1);
  } else {
    loadSong(songList.length - 1);
  }
}

// Siguiente canción
function nextSong() {
  if (actualSong < songList.length - 1) {
    loadSong(actualSong + 1);
  } else {
    loadSong(0);
  }
}

// Lanzar siguiente canción cuando se acaba la actual
audio.addEventListener("ended", () => nextSong());

// GO!
loadSongs();

btnOcultar.onclick = ()=> {
  let mp3Player = document.getElementById("mp3Player");

  if(mp3Player.style.display=="" || mp3Player.style.display=="none"){
    mp3Player.style.display = "block";
  }else if(mp3Player.style.display=="block"){
    mp3Player.style.display="none";
  }

}
