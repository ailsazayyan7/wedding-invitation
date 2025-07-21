// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { onSnapshot, query, orderBy, serverTimestamp} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5Poe-h97vcnfrTV-rOWJGQ9vvXICI8-s",
  authDomain: "undangan-pernikahan-1ffac.firebaseapp.com",
  projectId: "undangan-pernikahan-1ffac",
  storageBucket: "undangan-pernikahan-1ffac.firebasestorage.app",
  messagingSenderId: "817879625488",
  appId: "1:817879625488:web:2c30c170afc271940d3f95",
  measurementId: "G-71XHDBEDJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formUcapan");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Biar halaman nggak reload

    const nama = document.getElementById("namaPengirim").value.trim();
    const isi = document.getElementById("isiUcapan").value.trim();

    if (!nama || !isi) {
      alert("Harap isi semua kolom.");
      return;
    }

    try {
      await addDoc(collection(db, "ucapan"), {
        nama,
        isi,
        waktu: serverTimestamp()
      });

      alert("Ucapan berhasil dikirim!");
      form.reset(); // Kosongkan form setelah submit
    } catch (err) {
      console.error("Gagal mengirim ucapan:", err);
      alert("Gagal mengirim. Coba lagi ya.");
    }
  });

  function tampilkanUcapanRealtime() {
    const list = document.getElementById("daftarUcapan");
    list.innerHTML = "<p>Loading ucapan...</p>";
  
    const q = query(collection(db, "ucapan"), orderBy("waktu", "desc"));
  
    onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        list.innerHTML = "<p>Belum ada ucapan 🥲</p>";
        return;
      }
  
      list.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const data = doc.data();
  
        const item = document.createElement("div");
        item.className = "ucapan-item";

        const tanggal = data.waktu?.seconds
        ? new Date(data.waktu.seconds * 1000).toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "Menunggu waktu...";

        item.innerHTML = `
          <p class="ucapan-nama">${data.nama}</p>
          <p class="ucapan-isi">${data.isi}</p>
          <p class="ucapan-tanggal">${tanggal}</p>
        `;
  
        list.appendChild(item);
      });
    }, (error) => {
      console.error("Gagal mengambil ucapan realtime:", error);
      list.innerHTML = "<p>Gagal memuat ucapan. Coba refresh ya.</p>";
    });
  }
  

  tampilkanUcapanRealtime(); // <--- PENTING

  // Get URL param
  const params = new URLSearchParams(window.location.search);
  const namaTamu = params.get("to") || "Tamu";
  document.getElementById("namaTamu").textContent = decodeURIComponent(namaTamu);

  // Elements
  const landing = document.getElementById("landing");
  const mainContent = document.getElementById("mainContent");
  const hero = document.getElementsByClassName("hero");
  const openBtn = document.getElementById("openInvitation");
  const music = document.getElementById("bgMusic");
  const toggleMusic = document.getElementById("toggleMusic");
  const icon = document.getElementById("iconMusic");
  const photo = document.getElementById("transitionPhoto");
  const landingText = document.getElementById("landingText");
  


  openBtn.addEventListener("click", () => {
    // Hilangkan teks & animasikan foto
    landingText.classList.add("fade-out");
    photo.classList.add("zoom-fade-out");
  
    setTimeout(() => {
      landing.style.display = "none";
      mainContent.classList.remove("hidden");
      mainContent.classList.add("fade-in");
      music.play();
    }, 1000); // sesuai durasi animasi
  });


toggleMusic.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    icon.src = "assets/sound-on.svg";
  } else {
    music.pause();
    icon.src = "assets/sound-off.svg";
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && !music.paused) {
    music.pause();
    icon.src = "assets/sound-off.svg";
  }
});

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

});

  const sections = document.querySelectorAll('.fade-section');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.05 // bagian 10% dari element udah keliatan, langsung animasi
  });
  
  sections.forEach(section => {
    observer.observe(section);
  });

