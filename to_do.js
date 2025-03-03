const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === '') {
    alert("You Must Write Something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

// ✅ Click Event Listener (Check/Uncheck + Remove)
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } 
  else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

// ✅ Save to Local Storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// ✅ Load and Restore Tasks
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";

  // 🔹 دوبارہ ایونٹ لسٹنر لگائیں تاکہ Checked کلاس کام کرے
  let listItems = document.querySelectorAll("#list-container li");
  listItems.forEach(li => {
    li.addEventListener("click", function () {
      li.classList.toggle("checked");
      saveData();
    });
  });

  // 🔹 ڈیلیٹ بٹن کے لیے بھی ایونٹ لسٹنر لگائیں
  let deleteBtns = document.querySelectorAll("#list-container span");
  deleteBtns.forEach(span => {
    span.addEventListener("click", function () {
      span.parentElement.remove();
      saveData();
    });
  });
}

showTask();
