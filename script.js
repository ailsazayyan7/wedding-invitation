// Get URL param
const params = new URLSearchParams(window.location.search);
const namaTamu = params.get("to") || "Tamu";
document.getElementById("namaTamu").textContent = decodeURIComponent(namaTamu);

// Elements
const landing = document.getElementById("landing");
const mainContent = document.getElementById("mainContent");
const openBtn = document.getElementById("openInvitation");
const music = document.getElementById("bgMusic");
const toggleMusic = document.getElementById("toggleMusic");

openBtn.addEventListener("click", () => {
  landing.style.display = "none";
  mainContent.classList.remove("hidden");
  music.play();
});

toggleMusic.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    toggleMusic.textContent = "🔊";
  } else {
    music.pause();
    toggleMusic.textContent = "🔇";
  }
}
);