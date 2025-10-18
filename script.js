// RSVP form
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('form-msg').textContent = 'Cảm ơn bạn đã xác nhận!';
  this.reset();
});

// Fade-in animation on scroll
const sections = document.querySelectorAll('.fade-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));
// --- Popup nhạc ---
window.addEventListener('load', () => {
  const popup = document.getElementById('music-popup');
  const btn = document.getElementById('play-music');
  const audio = new Audio('image/music.mp3'); // Đặt file nhạc tại image/music.mp3

  popup.classList.add('show');
  btn.addEventListener('click', () => {
    audio.play();
    popup.classList.remove('show');
  });
});
