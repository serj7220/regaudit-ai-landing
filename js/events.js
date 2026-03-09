// Icons init
lucide.createIcons();

// Elements
const modal = document.getElementById("leadModal");
const leadForm = document.getElementById("leadForm");

// Modal logic
function openModal() {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Show toast
function showToast(message) {
  const toast = document.createElement("div");

  toast.className = `
    fixed bottom-6 right-6 z-[100] 
    bg-green-100 border border-green-200 text-green-800 
    px-6 py-4 rounded-2xl shadow-2xl 
    flex items-center gap-3 
    animate-slide-in
  `;

  toast.innerHTML = `
    <i data-lucide="check-circle" class="w-5 h-5 text-green-600"></i>
    <span class="font-medium">${message}</span>
  `;

  document.body.appendChild(toast);

  if (window.lucide) {
    lucide.createIcons();
  }

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// Form Handling
async function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const btn = event.target.querySelector('button[type="submit"]');

  btn.disabled = true;
  const originalText = btn.innerText;
  btn.innerText = "Sending...";

  try {
    const response = await fetch(
      "https://regaudit-form-handler.serj-halkin.workers.dev",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      },
    );

    if (response.ok) {
      showToast("Thank you! Check your email for confirmation.");

      leadForm.reset();
      closeModal();
    } else {
      throw new Error("Server error");
    }
  } catch (err) {
    console.error(err);
    alert("Submission failed. Please try again.");
  } finally {
    btn.disabled = false;
    btn.innerText = originalText;
  }
}

if (leadForm) {
  leadForm.addEventListener("submit", handleFormSubmit);
}
