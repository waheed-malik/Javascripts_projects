fetch("https://api.json2video.com/render", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer hPJ8BeDa7ZSGpGK4iTpk7ePCg7oWFyt1AEJbBggJ"
  },
  body: JSON.stringify({
    template: "your-template-id-or-object",
    output: {
      format: "mp4"
    }
  })
})
  .then(res => res.json())
  .then(data => {
    console.log("Video rendering started:", data);
  })
  .catch(err => console.error("Error rendering video:", err));


let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;

}
function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  }
  else {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }
}

if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 500)
}

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
}