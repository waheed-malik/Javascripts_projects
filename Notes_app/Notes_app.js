const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// لوکل اسٹوریج سے نوٹس لوڈ کریں
function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
}
showNotes();

// لوکل اسٹوریج کو اپڈیٹ کرنے کا فنکشن
function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// نیا نوٹ بنانے کا فنکشن
createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";

  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);

  updateStorage(); // نیا نوٹ بننے کے بعد اسٹوریج اپڈیٹ کریں
});

// ڈیلیٹ اور نوٹ ایڈٹ کرنے کا ایونٹ لسٹنر
notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  }
});

// ہر نوٹ میں ٹائپ ہونے پر ڈیٹا محفوظ کرنے کا فنکشن
notesContainer.addEventListener("keyup", () => {
  updateStorage();
});

// انٹر دبانے پر لائن بریک ڈالنے کے لیے
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
});
