// if the admin and password is correct redirect to cards.html
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault(); // stop normal form submit

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {
    window.location.href = "./cards.html"; // redirect
  } else {
    document.getElementById("error").classList.remove("hidden");
  }
});




