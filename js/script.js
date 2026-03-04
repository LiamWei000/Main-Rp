/* ===============================
   INIT AFTER DOM LOADED
================================= */
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initClock();
    initReveal();
    initParticles();
});


/* ===============================
   MOBILE MENU
================================= */
function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav?.classList.toggle("active");
}


/* ===============================
   THEME SYSTEM (Smart + Saved)
================================= */
function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const themeIcon = document.getElementById("theme-icon");

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        document.body.classList.add("dark");
        if (themeIcon) themeIcon.textContent = "🌙";
    }
}

function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById("theme-icon");

    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");

    if (themeBtn) {
        themeBtn.style.transform = "rotate(360deg)";
        setTimeout(() => themeBtn.style.transform = "rotate(0deg)", 400);
        themeBtn.textContent = isDark ? "🌙" : "☀️";
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
}


/* ===============================
   LIVE CLOCK
================================= */
function initClock() {
    const clock = document.getElementById("clock");
    if (!clock) return;

    const updateClock = () => {
        clock.textContent = new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    };

    updateClock();
    setInterval(updateClock, 1000);
}


/* ===============================
   SCROLL REVEAL (Optimized)
================================= */
function initReveal() {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach(el => observer.observe(el));
}


/* ===============================
   CANVAS PARTICLES (Smooth)
================================= */
function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 80;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                speed: Math.random() * 0.6 + 0.2
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(110,168,255,0.5)";

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            p.y += p.speed;
            if (p.y > canvas.height) {
                p.y = 0;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener("resize", () => {
        resizeCanvas();
        createParticles();
    });
}


/* ===============================
   COPY INTRO (Better UX)
================================= */
function copyIntro() {
    const intro = document.getElementById("introText");
    const status = document.getElementById("copyStatus");

    if (!intro) return;

    navigator.clipboard.writeText(intro.innerText)
        .then(() => {
            if (!status) return;
            status.style.display = "block";
            status.textContent = "Berhasil disalin! ✨";

            setTimeout(() => {
                status.style.display = "none";
            }, 2000);
        })
        .catch(() => {
            if (!status) return;
            status.style.display = "block";
            status.textContent = "Gagal menyalin ❌";
        });
}

// Smooth Scroll untuk Navigasi
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Stop lompatan kasar

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Hitung posisi dengan offset agar tidak tertutup header melayang
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }

        // Tutup menu mobile otomatis setelah klik (jika di HP)
        const navLinks = document.getElementById("navLinks");
        if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
        }
    });
});