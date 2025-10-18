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
// --- Tự phát nhạc khi người dùng tương tác ---
const audio = document.getElementById('bg-music');
let musicStarted = false;

function startMusic() {
  if (!musicStarted) {
    audio.play().catch(() => {});
    musicStarted = true;
  }
}

window.addEventListener('click', startMusic);
window.addEventListener('scroll', startMusic);
window.addEventListener('touchstart', startMusic);

// --- Firebase cấu hình ---
const firebaseConfig = {
  apiKey: "AIzaSyCFZ1zwjQo6KlXvo8WEbDXtExf8iQW_ZGo",
  authDomain: "wedding-guestbook.firebaseapp.com",
  databaseURL: "https://wedding-guestbook-default-rtdb.firebaseio.com",
  projectId: "wedding-guestbook",
  storageBucket: "wedding-guestbook.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// --- Xử lý form RSVP ---
const form = document.getElementById('rsvp-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('guestName').value;
  const status = document.getElementById('guestStatus').value;
  const message = document.getElementById('guestMessage').value || "—";

  const newRef = db.ref('guests').push();
  newRef.set({
    name: name,
    status: status,
    message: message,
    time: new Date().toISOString()
  });

  form.reset();
});

// --- Hiển thị realtime lời chúc ---
const messageList = document.getElementById('message-list');
db.ref('guests').on('value', (snapshot) => {
  messageList.innerHTML = '';
  snapshot.forEach(child => {
    const data = child.val();
    const div = document.createElement('div');
    div.classList.add('wish');
    div.innerHTML = `
      <p><strong>${data.name}</strong> (${data.status === 'yes' ? 'Sẽ tham dự' : 'Không tham dự'})</p>
      <p>${data.message}</p>
      <hr>
    `;
    messageList.prepend(div);
  });
});
