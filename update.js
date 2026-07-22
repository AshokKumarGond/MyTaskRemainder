let currentTaskId = null;

// Search Task by ID
function findTask() {
  let searchId = document.getElementById("searchId").value.trim();
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let task = tasks.find(t => t.taskId === searchId);

  let message = document.getElementById("message");
  let updateForm = document.getElementById("updateForm");

  if (!task) {
    message.textContent = "❌ Task ID not found. Please enter a valid Task ID.";
    message.classList.remove("hidden");
    message.style.background = "#dc3545"; // red
    updateForm.classList.add("hidden");
    return;
  }

  // Save current ID
  currentTaskId = searchId;

  // Pre-fill form with existing values
  document.getElementById("taskName").value = task.taskName;
  document.getElementById("taskDate").value = task.taskDate;
  document.getElementById("taskTime").value = task.taskTime;
  document.getElementById("phoneNumber").value = task.phoneNumber;
  document.getElementById("reminderType").value = task.reminderType;

  updateForm.classList.remove("hidden");
  message.classList.add("hidden");
}

// Handle update form submit
document.getElementById("updateForm").addEventListener("submit", function(event) {
  event.preventDefault();

  if (!currentTaskId) {
    alert("⚠️ No task selected!");
    return;
  }

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskIndex = tasks.findIndex(t => t.taskId === currentTaskId);

  if (taskIndex === -1) {
    alert("❌ Task ID not found!");
    return;
  }

  // Update values
  tasks[taskIndex].taskName = document.getElementById("taskName").value.trim();
  tasks[taskIndex].taskDate = document.getElementById("taskDate").value;
  tasks[taskIndex].taskTime = document.getElementById("taskTime").value;
  tasks[taskIndex].phoneNumber = document.getElementById("phoneNumber").value.trim();
  tasks[taskIndex].reminderType = document.getElementById("reminderType").value;

  // Save back to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  let message = document.getElementById("message");
  message.textContent = `✅ Task (ID: ${currentTaskId}) has been updated successfully!`;
  message.classList.remove("hidden");
  message.style.background = "#28a745"; // green
});
