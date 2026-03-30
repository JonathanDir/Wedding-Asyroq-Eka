// INIT AOS
AOS.init();

// SCROLL KE CONTENT
function scrollToContent() {
  // Jalankan Musik
  const music = document.getElementById("background-music");
  music.play().catch(error => console.log("Playback dicegah:", error));
  isPlaying = false;

  // Scroll ke content
  document.getElementById("love-story").scrollIntoView({
    behavior: "smooth",
  });
}

// =========================
// COUNTDOWN SECTION (YANG LAMA)
// =========================
const targetDate = new Date("April 4, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  // Countdown section bawah
  if (document.getElementById("days")) {
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }

  // =========================
  // COUNTDOWN HERO (TAMBAHAN BARU)
  // =========================
  if (document.getElementById("days-hero")) {
    document.getElementById("days-hero").innerText = days;
    document.getElementById("hours-hero").innerText = hours;
    document.getElementById("minutes-hero").innerText = minutes;
    document.getElementById("seconds-hero").innerText = seconds;
  }
}

// jalan setiap 1 detik
setInterval(updateCountdown, 1000);
updateCountdown();


// =========================
// COPY ALAMAT
// =========================
function copyAddress() {
  const url = "https://maps.google.com/?q=-6.912948,109.733156";
  navigator.clipboard.writeText(url);
  Swal.fire("Berhasil!", "Alamat berhasil disalin", "success");
  window.open(url, "_blank");
}

// =========================
// COPY REKENING
// =========================
function copyRekening() {
  const text = "0334 0112 4566 501";
  navigator.clipboard.writeText(text);
  Swal.fire("Berhasil!", "Nomor rekening disalin", "success");
}

// =========================
// COPY ALAMAT HADIAH
// =========================
function copyAlamatHadiah() {
  const text = "https://maps.app.goo.gl/cBcoqrPWfuVisJHL6";
  navigator.clipboard.writeText(text);
  Swal.fire("Berhasil!", "Alamat disalin", "success");
}

// =========================
// UCAPAN (BAGIAN INI YANG DI-FIX)
// =========================
function submitWish(e) {
  e.preventDefault();

  const name = e.target.name.value;
  const message = e.target.message.value;

  if (window.database) {
    window.database.ref('wishes').push({
      name: name,
      message: message,
      timestamp: Date.now()
    })
    .then(() => {
      e.target.reset();
      Swal.fire("Terima Kasih", "Ucapan Anda telah tersimpan!", "success");
    })
    .catch((error) => {
      alert("Gagal kirim: " + error.message);
    });
  }
}

// Menampilkan data secara otomatis
const checkDB = setInterval(() => {
  if (window.database) {
    clearInterval(checkDB);
    window.database.ref('wishes').on('value', (snapshot) => {
      const container = document.querySelector(".wishes-list");
      if (!container) return;
      container.innerHTML = ""; 
      
      snapshot.forEach((child) => {
        const data = child.val();
        const div = document.createElement("div");
        div.classList.add("wish-card");
        div.innerHTML = `
          <p>"${data.message}"</p>
          <div class="wish-meta">
            <span class="wish-author">${data.name}</span>
          </div>
        `;
        container.prepend(div);
      });
    });
  }
}, 500);

// =========================
// GALLERY
// =========================
let currentImage = 0;

const images = [
  "assets/img/5V6A3833.jpg",
  "assets/img/5V6A3863.jpg",
  "assets/img/5V6A3917.jpg",
  "assets/img/5V6A3906.jpg",
];

function openGallery(index) {
  currentImage = index;
  document.getElementById("galleryModal").classList.add("active");
  document.getElementById("modalImage").src = images[index];
}

function closeGallery() {
  document.getElementById("galleryModal").classList.remove("active");
}

function changeImage(step) {
  currentImage += step;

  if (currentImage < 0) currentImage = images.length - 1;
  if (currentImage >= images.length) currentImage = 0;

  document.getElementById("modalImage").src = images[currentImage];
}

// =========================
// MUSIC
// =========================
const music = document.getElementById("background-music");
let isPlaying = false;

function toggleMusic() {
  const music = document.getElementById("background-music");
  const icon = document.getElementById("music-icon");

  if (music.paused) {
    music.play();
    isPlaying = true;
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-compact-disc', 'fa-spin'); 
  } else {
    music.pause();
    isPlaying = false;
    icon.classList.remove('fa-compact-disc', 'fa-spin');
    icon.classList.add('fa-pause');
  }
}

setInterval(() => {
  const now = new Date().getTime();
  const target = new Date("April 4, 2026 00:00:00").getTime();
  const distance = target - now;

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const m = Math.floor((distance / (1000 * 60)) % 60);
  const s = Math.floor((distance / 1000) % 60);

  if (document.getElementById("days-hero")) {
    document.getElementById("days-hero").innerText = d;
    document.getElementById("hours-hero").innerText = h;
    document.getElementById("minutes-hero").innerText = m;
    document.getElementById("seconds-hero").innerText = s;
  }
}, 1000);