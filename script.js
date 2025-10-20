// Start music on first user interaction
const audio = document.getElementById('bg-music');
let musicStarted = false;
function startMusic() {
  if (!musicStarted) {
    audio.play().catch(()=>{});
    musicStarted = true;
  }
}
window.addEventListener('click', startMusic);
window.addEventListener('scroll', startMusic);
window.addEventListener('touchstart', startMusic);

// Simple form handling - static: show thank you message locally
document.getElementById('rsvp-form').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('guestName').value || 'Khách';
  const status = document.getElementById('guestStatus').value || '';
  const msgEl = document.getElementById('form-msg');
  msgEl.textContent = `Cảm ơn ${name}. Chúng tôi đã nhận phản hồi: ${status === 'yes' ? 'Sẽ tham dự' : 'Không thể tham dự'}.`;
  this.reset();
  // optional: show a temporary toast
  msgEl.style.opacity = 1;
  setTimeout(()=>{ msgEl.style.opacity = 0; }, 7000);
});

// scroll reveal for sections
const sections = document.querySelectorAll('.fade-section');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, {threshold:0.15});
sections.forEach(s=>io.observe(s));


// --- Hiệu ứng pháo hoa giấy khi trang load ---
window.addEventListener("load", () => {
  // tạo canvas confetti riêng
  const canvas = document.createElement("canvas");
  canvas.id = "confetti-canvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const myConfetti = confetti.create(canvas, { resize: true });

  const duration = 5000; // 5 giây
  const end = Date.now() + duration;

  (function frame() {
    myConfetti({
      particleCount: 6,
      startVelocity: 30,
      spread: 90,
      ticks: 60,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ["#f7d9e3", "#ffd1dc", "#fff0f5", "#fce1e4", "#f9e2ec"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    } else {
      setTimeout(() => canvas.remove(), 1000); // xoá canvas sau 1 giây
    }
  })();
});

// Khi phần #invite hiển thị trong khung nhìn, thêm class visible
const inviteSection = document.querySelector('#invite');
if (inviteSection) {
  const inviteObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        inviteSection.classList.add('visible');
        inviteObserver.unobserve(inviteSection);
      }
    });
  }, { threshold: 0.2 });
  inviteObserver.observe(inviteSection);
}
// --- Countdown hai chiều (trước & sau ngày cưới) ---
function updateCountdown() {
  const weddingDate = new Date("2025-10-30T00:00:00").getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const isPast = distance < 0;
  const diff = Math.abs(distance);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  if (isPast) {
    document.getElementById("countdown-timer").innerText =
      `💐 Đã trôi qua ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây kể từ ngày cưới 💐`;
  } else {
    document.getElementById("countdown-timer").innerText =
      `${days} days ${hours} hours ${minutes} minutes ${seconds} 💍`;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();



// CALENDAR GENERATOR
function generateCalendar(month, year) {
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const tbody = document.getElementById("calendar-body");

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");
      if (i === 0 && j < firstDay) {
        cell.innerText = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        cell.innerText = date;
        if (date === 30) cell.classList.add("heart-day");
        date++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
}
generateCalendar(9, 2025); // tháng 10 = index 9

const rsvpForm = document.getElementById('rsvp-form');
const formMsg = document.getElementById('form-msg');

rsvpForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(rsvpForm);
  const url = "https://forms.gle/ZeDE4monCdEqrpWG8"; // Thay FORM_ID_HERE

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: formData
  }).then(() => {
    formMsg.textContent = "Cảm ơn bạn! 💖 Chúng tôi đã nhận thông tin.";
    rsvpForm.reset();
  }).catch(err => {
    console.error(err);
    formMsg.textContent = "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
  });
});

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});



// --- Lightbox phóng to ảnh ---
const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("active");
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});


document.addEventListener("DOMContentLoaded", function () {
  // --- Cấu hình Firebase ---
  const firebaseConfig = {
  apiKey: "AIzaSyDenkJA2mAK5UUiBDli5mt8CFUKjXMtmTQ",
  authDomain: "wedding-wishes-3985c.firebaseapp.com",
  databaseURL: "https://wedding-wishes-3985c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wedding-wishes-3985c",
  storageBucket: "wedding-wishes-3985c.firebasestorage.app",
  messagingSenderId: "391144044053",
  appId: "1:391144044053:web:ec2399ba37eb7d0043801c",
  measurementId: "G-TCNDCR3BHK"
};

  // --- Khởi tạo Firebase ---
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  const form = document.getElementById("rsvp-form");
  const list = document.getElementById("wishList");

  // --- Gửi lời chúc ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("guestName").value.trim();
    const message = document.getElementById("guestMessage").value.trim();
    if (!name || !message) return;

    db.ref("wishes").push({
      name,
      message,
      time: new Date().toISOString()
    });

    form.reset();
  });

  // --- Hiển thị realtime ---
  db.ref("wishes").on("value", (snapshot) => {
    list.innerHTML = "";
    snapshot.forEach((child) => {
      const data = child.val();
      const div = document.createElement("div");
      div.classList.add("wish-item");
      div.innerHTML = `
        <strong>${data.name}</strong>
        <p>${data.message}</p>
      `;
      list.prepend(div);
    });
  });
});
