// Mobile menu
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// Dark mode
// 1. Jalankan ini segera saat halaman dimuat (Cek simpanan tema)
const savedTheme = localStorage.getItem("theme");
const themeIcon = document.getElementById("theme-icon");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeIcon) themeIcon.textContent = "🌙";
}

// 2. Fungsi untuk ganti tema (saat tombol diklik)
function toggleTheme() {
    document.body.classList.toggle("dark");
    const themeBtn = document.getElementById("theme-icon");
    
    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "🌙"; // Tampilkan bulan saat mode terang
        themeBtn.style.transform = "rotate(360deg)"; // Bonus: efek putar
        localStorage.setItem("theme", "dark"); // Simpan pilihan DARK
    } else {
        themeBtn.textContent = "☀️"; // Tampilkan matahari saat mode gelap
        themeBtn.style.transform = "rotate(0deg)"; // Bonus: efek putar
        localStorage.setItem("theme", "light"); // Simpan pilihan LIGHT
    }
}

// Clock
function updateClock() {
    document.getElementById("clock").textContent =
        new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
});

// Canvas Particles
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        d: Math.random() * 1
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(110,168,255,0.5)";
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });
    update();
}

function update() {
    particles.forEach(p => {
        p.y += p.d;
        if (p.y > canvas.height) {
            p.y = 0;
            p.x = Math.random() * canvas.width;
        }
    });
}

setInterval(draw, 33);

function copyIntro() {
    // Ambil teks dari elemen pre
    const introText = document.getElementById('introText').innerText;

    // Proses menyalin
    navigator.clipboard.writeText(introText).then(() => {
        const status = document.getElementById('copyStatus');
        status.style.display = 'block';

        // Sembunyikan notifikasi setelah 2 detik
        setTimeout(() => {
            status.style.display = 'none';
        }, 2000);
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
    });
}
