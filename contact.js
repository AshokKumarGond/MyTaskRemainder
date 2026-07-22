// Select elements
const form = document.querySelector(".contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// Add event listener for form submit
form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop refresh

  let errorMessage = "";

  // Validation
  if (nameInput.value.trim() === "" || emailInput.value.trim() === "" || messageInput.value.trim() === "") {
    errorMessage = "⚠️ Please fill out all fields.";
  } else if (!validateEmail(emailInput.value.trim())) {
    errorMessage = "❌ Invalid email format.";
  } else if (messageInput.value.trim().length < 10) {
    errorMessage = "✏️ Message must be at least 10 characters.";
  }

  // Show feedback
  let messageBox = document.querySelector(".form-message");
  if (!messageBox) {
    messageBox = document.createElement("p");
    messageBox.className = "form-message";
    form.appendChild(messageBox);
  }

  if (errorMessage) {
    messageBox.textContent = errorMessage;
    messageBox.style.color = "red";
  } else {
    messageBox.textContent = "✅ Message sent successfully! We will contact you soon.";
    messageBox.style.color = "white";

    // Clear fields after success
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";

    // Add button animation
    const btn = form.querySelector(".btn");
    btn.textContent = "Sending...";
    btn.style.background = "#00c851"; // green
    setTimeout(() => {
      btn.textContent = "Send Message";
      btn.style.background = "#4facfe";
    }, 1500);
  }
});

// Helper function to validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
