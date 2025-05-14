"use strict";
const button = document.getElementById("logout");
button.addEventListener('click', () => {
    window.location.href = 'index.html';
});
function loadUserSession() {
    const info = document.getElementById('sessionInfo');
    const today = new Date().toLocaleDateString();
    const userEmail = "user@example.com";
    const username = "DemoUser";
    info.innerHTML = `
    <p><strong>Email:</strong> ${userEmail}</p>
    <p><strong>Username:</strong> ${username}</p>
    <p><strong>Date:</strong> ${today}</p>
  `;
}
function getCode() {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
    }
}
loadUserSession();
