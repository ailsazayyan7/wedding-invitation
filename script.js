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

fetch('tamu.json')
  .then(res => res.json())
  .then(daftarTamu => {
    const params = new URLSearchParams(window.location.search);
    const rawNama = params.get('to') || '';
    const namaTamu = rawNama.replace(/\+/g, ' ').trim();

    const valid = daftarTamu.some(n => n.toLowerCase() === namaTamu.toLowerCase());

    if (valid) {
      document.getElementById('namaTamu').innerText = namaTamu;
      document.getElementById('namaHero').innerText = namaTamu;
    } else {
      document.body.innerHTML = `
        <section style="text-align: center; padding: 100px 20px;">
          <h1>💌 Maaf</h1>
          <p>Nama <strong>${namaTamu || "yang Anda masukkan"}</strong> tidak ada dalam daftar tamu kami.</p>
        </section>
      `;
    }
  });