// 1. Icons init
lucide.createIcons();

// 2. Popup window
const modal = document.getElementById("leadModal");

function openModal() {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Block scroll
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto"; // Unblock scroll
}

// Close with Esc using
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
