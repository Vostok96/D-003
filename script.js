// LISTA DE RECUERDOS (21 FOTOGRAFÍAS CON SUS LEYENDAS DEDICADAS A ISABELA)
const photosData = [
  { src: "assets/images/photo-01.jpg", caption: "El milagro de la vida floreciendo en nuestro hogar" },
  { src: "assets/images/photo-02.jpg", caption: "Tu llegada esperada con todo el amor del mundo" },
  { src: "assets/images/photo-03.jpg", caption: "Cada latido tuyo es la melodía más dulce para mamá y papá" },
  { src: "assets/images/photo-04.jpg", caption: "Soñando con el momento de tenerte entre nuestros brazos" },
  { src: "assets/images/photo-05.jpg", caption: "Creciendo rodeada de ternura, fe y bendiciones" },
  { src: "assets/images/photo-06.jpg", caption: "La dulce espera de nuestra pequeña princesa" },
  { src: "assets/images/photo-07.jpg", caption: "Un amor que no para de crecer día a día" },
  { src: "assets/images/photo-08.jpg", caption: "Tus primeros pasos ya dejan huella en nuestro corazón" },
  { src: "assets/images/photo-09.jpg", caption: "Cómplices de una ilusión infinita como el mar" },
  { src: "assets/images/photo-10.jpg", caption: "Bienvenida, nuestra amada princesa Isabela" },
  { src: "assets/images/photo-11.jpg", caption: "Pequeños zapatitos esperando tus primeros pasos" },
  { src: "assets/images/photo-12.jpg", caption: "El reflejo de la felicidad más pura" },
  { src: "assets/images/photo-13.jpg", caption: "Promesa de amor eterno e incondicional" },
  { src: "assets/images/photo-14.jpg", caption: "Caricias que susurran cuánto te esperamos" },
  { src: "assets/images/photo-15.jpg", caption: "Una familia que te ama antes de nacer" },
  { src: "assets/images/photo-16.jpg", caption: "La ilusión más grande de nuestras vidas" },
  { src: "assets/images/photo-17.jpg", caption: "Un sueño hecho realidad en cada ecografía" },
  { src: "assets/images/photo-18.jpg", caption: "Nuestra luz y mayor bendición del cielo" },
  { src: "assets/images/photo-19.jpg", caption: "El inicio del viaje más hermoso" },
  { src: "assets/images/photo-20.jpg", caption: "Por siempre cuidando de tus sueños" },
  { src: "assets/images/photo-21.jpg", caption: "Eternamente unidos por ti, Isabela" }
];

let currentPhotoIndex = 0;

// ELEMENTOS DEL DOM
const envelopeScreen = document.getElementById("envelope-screen");
const envelopeTrigger = document.getElementById("envelope-trigger");
const waxSealBtn = document.getElementById("wax-seal-btn");
const audio = document.getElementById("romantic-audio");
const vinylDisc = document.getElementById("vinyl-disc");
const toggleAudioBtn = document.getElementById("toggle-audio-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const lightboxModal = document.getElementById("lightbox-modal");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxIndex = document.getElementById("lightbox-index");
const sendBlessingBtn = document.getElementById("send-blessing-btn");
const blessingsCountEl = document.getElementById("blessings-count");

// APERTURA DEL SOBRE INTERACTIVO
function openEnvelope() {
  if (envelopeTrigger.classList.contains("opening")) return;
  envelopeTrigger.classList.add("opening");

  // Iniciar reproducción de la canción "Azul"
  playAudio();

  // Transición suave hacia la web
  setTimeout(() => {
    envelopeScreen.classList.add("opened");
    initMarineParticles();
  }, 900);
}

envelopeTrigger.addEventListener("click", openEnvelope);
waxSealBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openEnvelope();
});

// CONTROL DE AUDIO
function playAudio() {
  if (!audio) return;
  audio.play().then(() => {
    vinylDisc.classList.add("playing");
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  }).catch((err) => {
    console.log("Audio waiting for user gesture:", err);
  });
}

function pauseAudio() {
  if (!audio) return;
  audio.pause();
  vinylDisc.classList.remove("playing");
  playIcon.classList.remove("hidden");
  pauseIcon.classList.add("hidden");
}

toggleAudioBtn.addEventListener("click", () => {
  if (audio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
});

// LIGHTBOX MODAL
function openLightbox(index) {
  currentPhotoIndex = index;
  updateLightboxContent();
  lightboxModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxModal.classList.remove("active");
  document.body.style.overflow = "";
}

function updateLightboxContent() {
  const photo = photosData[currentPhotoIndex];
  if (!photo) return;
  lightboxImg.src = photo.src;
  lightboxCaption.textContent = photo.caption;
  lightboxIndex.textContent = `Recuerdo ${currentPhotoIndex + 1} de ${photosData.length}`;
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % photosData.length;
  updateLightboxContent();
}

function prevPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + photosData.length) % photosData.length;
  updateLightboxContent();
}

// Navegación por teclado
window.addEventListener("keydown", (e) => {
  if (!lightboxModal.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextPhoto();
  if (e.key === "ArrowLeft") prevPhoto();
});

// Soporte táctil Swipe para móviles
let touchStartX = 0;
let touchEndX = 0;

lightboxModal.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightboxModal.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 45;
  if (touchEndX < touchStartX - swipeThreshold) {
    nextPhoto();
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    prevPhoto();
  }
}

// Clic fuera de la foto para cerrar
lightboxModal.addEventListener("click", (e) => {
  if (e.target === lightboxModal) closeLightbox();
});

// DETALLE INTERACTIVO: ENVIAR BENDICIONES Y BURBUJAS DE AMOR
let blessingsCount = parseInt(localStorage.getItem("rym_d003_blessings") || "0", 10);
if (blessingsCountEl) {
  blessingsCountEl.textContent = blessingsCount;
}

if (sendBlessingBtn) {
  sendBlessingBtn.addEventListener("click", (e) => {
    blessingsCount++;
    blessingsCountEl.textContent = blessingsCount;
    localStorage.setItem("rym_d003_blessings", blessingsCount.toString());

    // Crear oleada de burbujas y corazoncitos hacia arriba
    const rect = sendBlessingBtn.getBoundingClientRect();
    for (let i = 0; i < 7; i++) {
      createFloatingBubble(rect.left + rect.width / 2 + (Math.random() * 80 - 40), rect.top);
    }
  });
}

function createFloatingBubble(x, y) {
  const isHeart = Math.random() > 0.45;
  const bubble = document.createElement("div");

  if (isHeart) {
    bubble.innerHTML = `<svg class="w-6 h-6 text-coral-soft fill-current drop-shadow-md" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
  } else {
    // Burbuja marina iridiscente
    bubble.innerHTML = `<div style="width: 24px; height: 24px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(186,160,208,0.4) 60%, rgba(118,159,140,0.6) 100%); border: 1.5px solid rgba(250,230,158,0.8); box-shadow: 0 4px 12px rgba(118,159,140,0.3);"></div>`;
  }

  bubble.style.position = "fixed";
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  bubble.style.pointerEvents = "none";
  bubble.style.zIndex = "1000";
  bubble.style.transition = "transform 2s cubic-bezier(0.2, 0.8, 0.4, 1), opacity 2s ease-out";
  bubble.style.transform = `scale(${0.6 + Math.random() * 0.7}) rotate(${Math.random() * 30 - 15}deg)`;

  document.body.appendChild(bubble);

  requestAnimationFrame(() => {
    bubble.style.transform = `translate(${(Math.random() - 0.5) * 140}px, -${160 + Math.random() * 120}px) scale(1.3) rotate(${Math.random() * 60 - 30}deg)`;
    bubble.style.opacity = "0";
  });

  setTimeout(() => {
    bubble.remove();
  }, 2100);
}

// LIENZO DE PARTÍCULAS MARINAS: BURBUJAS BRILLANTES Y DESTELLOS DORADOS
function initMarineParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const totalCount = window.innerWidth < 768 ? 20 : 34;

  for (let i = 0; i < totalCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height + height * 0.2,
      radius: Math.random() * 5 + 3,
      speedY: -(Math.random() * 0.9 + 0.6), // Suben suavemente como burbujas
      speedX: (Math.random() - 0.5) * 0.8,
      wobbleSpeed: Math.random() * 0.03 + 0.015,
      wobbleOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.55 + 0.25,
      type: Math.random() > 0.35 ? "bubble" : (Math.random() > 0.5 ? "sparkle" : "pearl")
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.y += p.speedY;
      p.wobbleOffset += p.wobbleSpeed;
      p.x += Math.sin(p.wobbleOffset) * 0.7 + p.speedX;

      if (p.y < -30) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);

      if (p.type === "bubble") {
        // Burbuja marina con reflejo de luz
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 220, 205, ${p.opacity * 0.4})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(250, 230, 158, ${p.opacity * 0.75})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Destello interior de la burbuja
        ctx.beginPath();
        ctx.arc(-p.radius * 0.35, -p.radius * 0.35, p.radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.9})`;
        ctx.fill();
      } else if (p.type === "pearl") {
        // Perla lila suave
        ctx.beginPath();
        ctx.arc(0, 0, p.radius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(202, 175, 222, ${p.opacity * 0.65})`;
        ctx.fill();
      } else {
        // Pequeño destello o estrella marina
        ctx.beginPath();
        ctx.arc(0, 0, p.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250, 230, 158, ${p.opacity * 0.85})`;
        ctx.fill();
      }

      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
