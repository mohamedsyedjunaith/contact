document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("status");

  // Basic validation
  if (!name || !email || !message) {
    status.textContent = "Please fill all fields!";
    status.style.color = "red";
    return;
  }

  status.textContent = "Sending...";
  status.style.color = "black";

  try {
    const response = await fetch("https://contact-one-mu.vercel.app/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (result.success) {
      status.textContent = result.message;
      status.style.color = "green";
      document.getElementById("contactForm").reset();
    } else {
      status.textContent = result.message || "Failed to send. Try again.";
      status.style.color = "red";
    }

  } catch (err) {
    status.textContent = "Network error. Try again.";
    status.style.color = "red";
    console.error(err);
  }
});
