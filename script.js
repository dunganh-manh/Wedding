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

// --- Hiệu ứng pháo hoa giấy khi load trang ---
window.addEventListener("load", () => {
  const duration = 5 * 1000; // thời gian chạy 5 giây
  const end = Date.now() + duration;

  (function frame() {
    // tạo hiệu ứng nhẹ, màu pastel
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#f7d9e3", "#ffe4ef", "#ffd1dc", "#fff0f5", "#fce1e4"],
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#f7d9e3", "#ffe4ef", "#ffd1dc", "#fff0f5", "#fce1e4"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
});
