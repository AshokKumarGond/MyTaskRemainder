// Select elements
const form = document.querySelector(".login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Add event listener
form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop form from refreshing the page

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  let errorMessage = "";

  // Basic validation
  if (email === "" || password === "") {
    errorMessage = "⚠️ Please fill out all fields.";
  } else if (!validateEmail(email)) {
    errorMessage = "❌ Invalid email format.";
  } else if (password.length < 5) {
    errorMessage = "🔑 Password must be at least 5 characters.";
  }

  // Show error or success
  let messageBox = document.querySelector(".message");
  if (!messageBox) {
    messageBox = document.createElement("p");
    messageBox.className = "message";
    form.appendChild(messageBox);
  }

  if (errorMessage) {
    messageBox.textContent = errorMessage;
    messageBox.style.color = "red";
  } else {
    messageBox.textContent = "✅ Login successful! Redirecting...";
    messageBox.style.color = "green";

    // Fake redirect after 1.5 seconds
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  }
});

// Helper function: validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
