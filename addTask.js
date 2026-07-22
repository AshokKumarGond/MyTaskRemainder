document.getElementById("taskForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get values
  let taskId = document.getElementById("taskId").value.trim();
  let taskName = document.getElementById("taskName").value.trim();
  let taskDate = document.getElementById("taskDate").value;
  let taskTime = document.getElementById("taskTime").value;
  let phoneNumber = document.getElementById("phoneNumber").value.trim();
  let reminderType = document.getElementById("reminderType").value;

  // Validate inputs
  if (!taskId || !taskName || !taskDate || !taskTime || !phoneNumber || !reminderType) {
    alert("⚠️ Please fill all fields!");
    return;
  }

  // Load existing tasks
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Check if ID already exists
  if (tasks.some(task => task.taskId === taskId)) {
    alert("❌ Task ID already exists. Please choose a unique ID.");
    return;
  }

  // Save new task locally
  tasks.push({ taskId, taskName, taskDate, taskTime, phoneNumber, reminderType });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Show success message
  let successMsg = document.getElementById("successMsg");
  successMsg.textContent = `✅ Task "${taskName}" (ID: ${taskId}) has been successfully added. THANK YOU!`;
  successMsg.classList.remove("hidden");

  // Reset form
  document.getElementById("taskForm").reset();

  // --- NEW: Send task to backend for SMS/Call scheduling with UTC timestamp ---
  // Combine date + time in local timezone
  const localDateTime = new Date(`${taskDate}T${taskTime}:00`);
  // Convert to UTC string
  const utcDateTime = localDateTime.toISOString();

  fetch("http://localhost:3000/schedule-task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      taskId,
      taskName,
      phoneNumber,
      reminderType,
      scheduleTime: utcDateTime // send UTC timestamp
    })
  })
  .then(res => res.json())
  .then(data => console.log("Backend response:", data))
  .catch(err => console.error("Error scheduling task:", err));
});

