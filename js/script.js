// Mobile menu
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// Dark mode
function toggleTheme() {
    document.body.classList.toggle("dark");
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