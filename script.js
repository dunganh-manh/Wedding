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
      `Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} 💞`;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

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
