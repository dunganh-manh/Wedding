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