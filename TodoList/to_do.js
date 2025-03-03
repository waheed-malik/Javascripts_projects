const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  // Check if the input field is empty
  if (inputBox.value === '') {
    alert("You Must Write Something!"); // Alert the user if no input is provided
  } else {
    // Create a new list item (li)
    let li = document.createElement("li");
    li.innerHTML = inputBox.value; // Set the inner text to user input

    listContainer.appendChild(li); // Append the new task to the list

    // Create a delete button (×) for the task
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // Unicode for the multiplication sign (×)
    li.appendChild(span); // Append delete button to the task
  }
  inputBox.value = ""; // Clear the input field after adding a task
  saveData(); // Save updated tasks to localStorage
}

// ✅ Event Listener for click actions (Check/Uncheck & Remove)
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    // Toggle "checked" class when a task is clicked
    e.target.classList.toggle("checked");
    saveData(); // Save changes to localStorage
  }
  else if (e.target.tagName === "SPAN") {
    // Remove task when delete button (×) is clicked
    e.target.parentElement.remove();
    saveData(); // Save changes to localStorage
  }
}, false);

// ✅ Function to save tasks in local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// ✅ Function to load and restore tasks from local storage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";

  // 🔹 Reattach event listeners to restored tasks
  let listItems = document.querySelectorAll("#list-container li");
  listItems.forEach(li => {
    li.addEventListener("click", function () {
      li.classList.toggle("checked");
      saveData();
    });
  });

  // 🔹 Reattach event listeners to delete buttons
  let deleteBtns = document.querySelectorAll("#list-container span");
  deleteBtns.forEach(span => {
    span.addEventListener("click", function () {
      span.parentElement.remove();
      saveData();
    });
  });
}

showTask(); // Load existing tasks when the page load