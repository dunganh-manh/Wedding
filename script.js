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
// Đếm ngược đến 30/10/2025 00:00:00
const countdownDate = new Date("October 30, 2025 00:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    // Nếu đã qua ngày cưới
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    clearInterval(interval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysEl.textContent = days.toString().padStart(2, "0");
  hoursEl.textContent = hours.toString().padStart(2, "0");
  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}

// Cập nhật mỗi giây
updateCountdown(); // chạy ngay lập tức
const interval = setInterval(updateCountdown, 1000);


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

const giftIcon = document.getElementById('gift-icon');
const qrPopup = document.getElementById('qr-popup');
const closeBtn = qrPopup.querySelector('.close-btn');

// Mở popup khi click vào hộp quà
giftIcon.addEventListener('click', () => {
  qrPopup.style.display = 'flex';
});

// Đóng popup khi click nút x
closeBtn.addEventListener('click', () => {
  qrPopup.style.display = 'none';
});

// Đóng popup khi click ngoài nội dung
window.addEventListener('click', (e) => {
  if(e.target === qrPopup){
    qrPopup.style.display = 'none';
  }
});


