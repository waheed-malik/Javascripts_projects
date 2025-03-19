let speech = new SpeechSynthesisUtterance();
let voices = [];
let voicesSelect = document.querySelector("select");
let audioContext;
let recorder;

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];

  voices.forEach((voice, i) => (voicesSelect.options[i] = new Option(voice.name, i)));
};

voicesSelect.addEventListener("change", () => {
  speech.voice = voices[voicesSelect.value];
});

document.querySelector("#playBtn").addEventListener("click", () => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
    document.querySelector("#playBtn img").src = "images/play1.gif";
  } else {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
    document.querySelector("#playBtn img").src = "images/pause.png";

    // Start recording
    startRecording();
  }
});

document.querySelector("#stopBtn").addEventListener("click", () => {
  window.speechSynthesis.cancel();
  document.querySelector("#playBtn img").src = "images/play1.png";

  // Stop recording
  stopRecording();
});

document.querySelector("#downloadBtn").addEventListener("click", () => {
  if (recorder) {
    recorder.exportWAV(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'text_to_speech.wav';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    });
  }
});

function startRecording() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const input = audioContext.createMediaStreamDestination();
  window.speechSynthesis.speak(speech);
  speech.onstart = () => {
    recorder = new Recorder(input);
    recorder && recorder.record();
  }
}

function stopRecording() {
  if (recorder) {
    recorder.stop();
    recorder.clear();
  }
}
