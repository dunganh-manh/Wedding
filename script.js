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