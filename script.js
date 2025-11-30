document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const status = document.getElementById("status");

    status.textContent = "Sending...";

    const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (result.success) {
        status.textContent = "Message Sent Successfully!";
        status.style.color = "green";
        document.getElementById("contactForm").reset();
    } else {
        status.textContent = "Failed to send. Try again.";
        status.style.color = "red";
    }
});
