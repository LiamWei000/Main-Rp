// ================= IMPORT FIREBASE =================
// Gunakan link CDN yang konsisten untuk semua modul
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ================= CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyDaykFIxz0WzSTtL0CtUFes9gMkvgTtImk",
  authDomain: "main-rp.firebaseapp.com",
  projectId: "main-rp",
  storageBucket: "main-rp.firebasestorage.app",
  messagingSenderId: "787178139523",
  appId: "1:787178139523:web:c57327b4b674b08d7dd0b6",
  measurementId: "G-Q1W69SPXFC"
};

// Initialize Firebase (Hanya perlu sekali saja)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ================= LOGIN / LOGOUT =================
window.login = function() {
  signInWithPopup(auth, provider)
    .then(() => console.log("Login Sukses"))
    .catch(err => console.error("Login Gagal:", err));
}

window.logout = function() {
  signOut(auth).then(() => {
    location.reload(); // Reload agar tampilan bersih kembali
  });
}

onAuthStateChanged(auth, user => {
  const info = document.getElementById("userInfo");
  const loginBtn = document.getElementById("loginBtn"); // Pastikan ada ID ini di HTML
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    if (info) info.textContent = "👤 " + user.displayName;
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block";
    loadCharacters();
  } else {
    if (info) info.textContent = "";
    if (loginBtn) loginBtn.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "none";
    loadCharacters(); // Tetap load untuk lihat siapa yang sudah claim
  }
});

// ================= CHARACTER LIST =================
const characters = [
  "Naruto", "Luffy", "Gojo", "Mikasa", "Rem", "Zero Two"
];

async function loadCharacters() {
  const grid = document.getElementById("characterGrid");
  if (!grid) return;

  onSnapshot(collection(db, "claims"), snapshot => {
    updateRanking(snapshot);
    grid.innerHTML = "";
    
    // Ambil daftar karakter yang sudah di-claim
    const claimedList = snapshot.docs.map(doc => doc.data().character);

    // Tampilkan semua karakter dari list master
    characters.forEach(char => {
      const claimData = snapshot.docs.find(d => d.data().character === char);
      const div = document.createElement("div");
      div.className = "card reveal active"; // Pakai class reveal yang sudah kamu buat

      if (claimData) {
        // Tampilan jika sudah diambil
        div.innerHTML = `
          <h3>${char}</h3>
          <p style="color: var(--accent)">Taken by: ${claimData.user}</p>
          <button disabled style="background: grey; cursor: not-allowed;">Already Claimed</button>
        `;
      } else {
        // Tampilan jika masih kosong
        div.innerHTML = `
          <h3>${char}</h3>
          <p>Status: Available</p>
          <button class="btn" onclick="claimCharacter('${char}')">Claim Char</button>
        `;
      }
      grid.appendChild(div);
    });
  });
}

window.claimCharacter = async function(character) {
  const user = auth.currentUser;
  if (!user) {
    alert("Kamu harus login dulu untuk mengambil karakter!");
    return;
  }

  try {
    await addDoc(collection(db, "claims"), {
      character: character,
      user: user.displayName,
      uid: user.uid,
      timestamp: new Date()
    });
    alert(`Berhasil claim ${character}!`);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function updateRanking(snapshot){
  const ranking = {};
  snapshot.docs.forEach(doc=>{
    const user = doc.data().user;
    ranking[user] = (ranking[user] || 0) + 1;
  });

  const sorted = Object.entries(ranking).sort((a,b)=>b[1]-a[1]);
  const container = document.getElementById("ranking");
  container.innerHTML = "";

  sorted.forEach(([name,count])=>{
    const p = document.createElement("p");
    p.textContent = `${name} - ${count} claims`;
    container.appendChild(p);
  });
}