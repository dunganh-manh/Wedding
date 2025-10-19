// ======= MUSIC AUTOPLAY =======
const audio = document.getElementById('bg-music');
let musicStarted = false;
function startMusic() {
  if (!musicStarted) {
    audio.play().catch(()=>{});
    musicStarted = true;
  }
}
['click','scroll','touchstart'].forEach(e => window.addEventListener(e, startMusic));

// ======= RSVP FORM =======
const rsvpForm = document.getElementById('rsvp-form');
const formMsg = document.getElementById('form-msg');

if(rsvpForm && formMsg){
  rsvpForm.addEventListener('submit', function(e){
    e.preventDefault();

    const formData = new FormData(rsvpForm);
    const name = formData.get('guestName') || 'Khách';
    const status = formData.get('guestStatus') || '';

    const url = "https://forms.gle/ZeDE4monCdEqrpWG8"; // Google Form ID

    fetch(url, { method: "POST", mode: "no-cors", body: formData })
      .then(() => {
        formMsg.textContent = `Cảm ơn ${name}. Chúng tôi đã nhận phản hồi: ${status === 'yes' ? 'Sẽ tham dự' : 'Không thể tham dự'}.`;
        formMsg.style.opacity = 1;
        rsvpForm.reset();
        setTimeout(()=>{ formMsg.style.opacity = 0; }, 7000);
      })
      .catch(err => {
        console.error(err);
        formMsg.textContent = "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
      });
  });
}

// ======= SCROLL REVEAL =======
const sections = document.querySelectorAll('.fade-section');
if(sections.length){
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
  }, {threshold:0.15});
  sections.forEach(s => io.observe(s));
}

// ======= CONFETTI ON LOAD =======
window.addEventListener('load', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  Object.assign(canvas.style, {
    position: 'fixed', top:0, left:0, width:'100%', height:'100%',
    pointerEvents:'none', zIndex:'9999'
  });
  document.body.appendChild(canvas);

  const myConfetti = confetti.create(canvas, { resize:true });
  const duration = 5000;
  const end = Date.now() + duration;

  (function frame(){
    myConfetti({
      particleCount: 6,
      startVelocity: 30,
      spread: 90,
      ticks: 60,
      origin: {x: Math.random(), y: Math.random() - 0.2},
      colors: ["#f7d9e3","#ffd1dc","#fff0f5","#fce1e4","#f9e2ec"]
    });
    if(Date.now() < end) requestAnimationFrame(frame);
    else setTimeout(()=>canvas.remove(),1000);
  })();
});

// ======= INVITE SECTION =======
const inviteSection = document.querySelector('#invite');
if(inviteSection){
  const inviteObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        inviteSection.classList.add('visible');
        inviteObserver.unobserve(inviteSection);
      }
    });
  }, {threshold:0.2});
  inviteObserver.observe(inviteSection);
}

// ======= COUNTDOWN =======
const countdownDate = new Date("October 30, 2025 00:00:00").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown(){
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if(distance < 0){
    [daysEl,hoursEl,minutesEl,secondsEl].forEach(el=>el.textContent="00");
    clearInterval(interval);
    return;
  }

  const days = Math.floor(distance/(1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
  const seconds = Math.floor((distance % (1000*60))/1000);

  daysEl.textContent = String(days).padStart(2,"0");
  hoursEl.textContent = String(hours).padStart(2,"0");
  minutesEl.textContent = String(minutes).padStart(2,"0");
  secondsEl.textContent = String(seconds).padStart(2,"0");
}

updateCountdown();
const interval = setInterval(updateCountdown,1000);

// ======= CALENDAR =======
function generateCalendar(month, year){
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month+1,0).getDate();
  const tbody = document.getElementById("calendar-body");
  tbody.innerHTML = ""; // clear previous rows

  let date = 1;
  for(let i=0;i<6;i++){
    const row = document.createElement("tr");
    for(let j=0;j<7;j++){
      const cell = document.createElement("td");
      if(i===0 && j<firstDay){ cell.innerText=""; }
      else if(date>daysInMonth){ break; }
      else{
        cell.innerText = date;
        if(date===30) cell.classList.add("heart-day");
        date++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
}
generateCalendar(9,2025); // October

// ======= GIFT QR POPUP =======
const giftBtn = document.getElementById('giftToggle');
const qrPopup = document.getElementById('qrPopup');

if(giftBtn && qrPopup){
  giftBtn.addEventListener('click', e=>{
    e.stopPropagation();
    qrPopup.classList.toggle('active');
    giftBtn.classList.toggle('active');
  });

  document.addEventListener('click', e=>{
    if(!qrPopup.contains(e.target) && !giftBtn.contains(e.target)){
      qrPopup.classList.remove('active');
      giftBtn.classList.remove('active');
    }
  });
}
