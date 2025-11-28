document.addEventListener('DOMContentLoaded', () => {

  // ------------------ PASSWORD SYSTEM ------------------
  const password = "2003";
  let input = "";

  const passDisplay = document.getElementById("pass-display");
  const keys = document.querySelectorAll(".key");
  const overlay = document.getElementById("overlay");
  const main = document.getElementById("main");

  const bgAudio = new Audio("Audio/happy_birthday.mp3");
  bgAudio.loop = true;
  bgAudio.volume = 0.4;

  keys.forEach(key => {
    key.addEventListener("click", () => {
      const num = key.textContent;
      if (!num) return;

      input += num;
      passDisplay.textContent = "•".repeat(input.length);

      if (input.length === password.length) {
        if (input === password) {
          passDisplay.textContent = "HAPPY BIRTHDAY NATHANIEL";
          passDisplay.classList.add("animate");

          setTimeout(() => {
            overlay.style.display = "none";
            main.style.display = "block";
            passDisplay.classList.remove("animate");

            bgAudio.play().catch(() => console.log("Music autoplay blocked"));

            // Video handling
            const video = document.querySelector(".video-container video");
            if (video) {
              video.muted = false;
              video.controls = false;
              video.loop = true;
              video.autoplay = true;
              video.style.pointerEvents = "none";
              video.style.opacity = 0;
              video.classList.add("show");
              video.play().catch(() => console.log("Video autoplay blocked"));
              video.addEventListener("pause", () => video.play());
              setTimeout(() => {
                video.style.transition = "opacity 1.5s ease-in-out";
                video.style.opacity = 1;
              }, 100);
            }

            scaleA4Container();
          }, 1200);

        } else {
          passDisplay.textContent = "";
          input = "";
          alert("SIKU KUU!");
        }
      }
    });
  });

  // ------------------ DROPDOWN & PINBOARD ------------------
  const pinboard = document.getElementById("pinboard");

  document.querySelectorAll(".dropdown").forEach(drop => {
    const btn = drop.querySelector(".dropbtn");

    btn.addEventListener("click", () => {
      document.querySelectorAll(".dropdown").forEach(d => {
        if (d !== drop) d.classList.remove("active");
      });
      drop.classList.toggle("active");

      if (btn.textContent.trim() === "Profile") {
        if (!pinboard) return;

        const isVisible = pinboard.classList.contains("show");
        pinboard.classList.remove("show");
        if (!isVisible) pinboard.classList.add("show");
      } else {
        pinboard?.classList.remove("show");
      }
    });
  });

  // ------------------ HAPPY BIRTHDAY OVERLAY ------------------
  const happyBtn = document.getElementById("happyBirthdayBtn");
  const happyOverlay = document.getElementById("happyBirthdayOverlay");
  const happyTextParagraph = happyOverlay.querySelector("p");
  const closeHappy = happyOverlay.querySelector(".closeOverlay");

  const birthdayMessage = `Happy birthday to the most wonderful and strongest person I know. Happy my love, today is the day the universe blessed me with you.
You are my greatest gift. You make me happier with your presence and warmer with your love. Every single day you amaze me with your kindness and your beautiful soul.
From the moment you came into my life, everything changed for the better. You have brought me endless joy, laughter and love.
How I feel for you will never change. May the rest of your years bring happiness and joy as much as you bring into my life. I can’t wait to make many more memories together. Enjoy your day to the fullest and remember I’m always cheering for you. I love youuu ❤️❤️❤️ and Happy Birthday!! 🎂🎊`;

  happyBtn.addEventListener("click", () => {
    happyTextParagraph.textContent = birthdayMessage;
    happyOverlay.classList.add("show");
  });

  closeHappy.addEventListener("click", () => {
    happyOverlay.classList.remove("show");
  });

  happyOverlay.addEventListener("click", e => {
    if (e.target === happyOverlay) happyOverlay.classList.remove("show");
  });

  // ------------------ READ ME OVERLAY ------------------
  const readMeBtn = document.getElementById("readMeBtn");
  const readMeOverlay = document.getElementById("readMeOverlay");
  const readMeTextParagraph = readMeOverlay.querySelector("p");
  const closeReadMe = readMeOverlay.querySelector(".closeOverlay");

  const readMeMessage = `He is someone who carries himself with kindness and maturity. His sense of reasoning is calm, steady and thoughtful. He pays attention to the small things that make others comfortable and he does them naturally without being asked to. 
Loyalty is one of his strongest traits, he stands by the people who matter to him and remains consistent in his friendships, relationships and bonds he makes. He is a person who embraces change and doesn’t run from it. He adjusts, grows and learns with every situation that comes his way.
He allows others to express themselves freely because he creates a space where honesty feels safe. He believes in growth both on himself and those around him. He gently pushes people to become better versions of themselves, not by pressuring them but by encouragement and support. When he sees potential, he doesn’t let it go unnoticed. He remind people of what they can achieve and motivates them to step into their strengths.
Altogether he is open-hearted, patient and grounded. The kind of man who brings growth and stability and understanding into lives he touches. When he loves, he does it with everything he has. His love is full sincere and intentional, the kind that makes someone feel valued and seen. 
That about sums up the kind of person he is.`;

  readMeBtn.addEventListener("click", () => {
    readMeTextParagraph.textContent = readMeMessage;
    readMeOverlay.classList.add("show");
  });

  closeReadMe.addEventListener("click", () => {
    readMeOverlay.classList.remove("show");
  });

  readMeOverlay.addEventListener("click", e => {
    if (e.target === readMeOverlay) readMeOverlay.classList.remove("show");
  });

  // ------------------ POLAROID MODAL ------------------
  const modal = document.getElementById("modal");
  const modalImg = modal?.querySelector("img");
  const modalCaption = modal?.querySelector(".caption");
  const closeModalBtn = modal?.querySelector(".close");

  document.querySelectorAll(".polaroid, .pinboard-polaroid").forEach((card, i) => {
    card.addEventListener("click", () => {
      if (!modalImg || !modalCaption || !modal) return;
      const img = card.querySelector("img");
      const caption = card.dataset.caption || card.querySelector(".caption")?.textContent || "Photo";

      modalImg.src = img.src;
      modalCaption.textContent = caption;

      modal.style.display = "flex";
      modal.style.opacity = 0;
      setTimeout(() => { modal.style.transition = "opacity 0.3s ease"; modal.style.opacity = 1; }, 10);
    });

    card.style.animationDelay = `${i * 0.1}s`;
  });

  function closeModal() {
    if (!modal) return;
    modal.style.transition = "opacity 0.3s ease";
    modal.style.opacity = 0;
    setTimeout(() => modal.style.display = "none", 300);
  }

  closeModalBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });

  // ------------------ FULL SCREEN OVERLAYS ------------------
  document.querySelectorAll(".fullOverlay").forEach(overlay => {
    const closeBtn = overlay.querySelector(".closeOverlay");
    closeBtn?.addEventListener("click", () => overlay.classList.remove("show"));
    overlay.addEventListener("click", e => { if (e.target === overlay) overlay.classList.remove("show"); });
  });

  // ------------------ PARTICLE BACKGROUND ------------------
  (function setupParticles() {
    const particleCanvas = document.getElementById('particles') || (() => {
      const c = document.createElement('canvas');
      c.id = 'particles';
      document.body.appendChild(c);
      return c;
    })();

    const ctx = particleCanvas.getContext('2d');
    let particles = [];

    const lowEnd = navigator.deviceMemory && navigator.deviceMemory <= 2 || /Android|iPhone|iPad|Mobile/.test(navigator.userAgent);
    const PARTICLE_COUNT = lowEnd ? 80 : 400;
    const useShadows = !lowEnd;

    Object.assign(particleCanvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '1'
    });

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      particleCanvas.width = Math.round(window.innerWidth * dpr);
      particleCanvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function getRects() {
      const rects = [];
      ['overlay','keypad','canvas','pinboard'].forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetParent !== null) rects.push(el.getBoundingClientRect());
      });
      return rects;
    }

    function insideProtected(x, y, rects, margin = 14) {
      return rects.some(r => x > r.left - margin && x < r.right + margin && y > r.top - margin && y < r.bottom + margin);
    }

    function initParticles() {
      resizeCanvas();
      particles = [];
      const rects = getRects();
      const w = particleCanvas.width / (window.devicePixelRatio || 1);
      const h = particleCanvas.height / (window.devicePixelRatio || 1);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let x, y, attempts = 0;
        do {
          x = Math.random() * w;
          y = Math.random() * h;
          if (++attempts > 50) break;
        } while (insideProtected(x, y, rects, 20));

        particles.push({
          x, y,
          dx: (Math.random() - 0.5) * (0.6 + Math.random()),
          dy: (Math.random() - 0.5) * (0.6 + Math.random()),
          r: Math.random() * 2 + 0.8,
          alpha: Math.random() * 0.6 + 0.25
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      const rects = getRects();
      const w = particleCanvas.width / (window.devicePixelRatio || 1);
      const h = particleCanvas.height / (window.devicePixelRatio || 1);

      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

        if (insideProtected(p.x, p.y, rects, 8)) {
          p.x -= p.dx * 2;
          p.y -= p.dy * 2;
          p.dx *= -1.1;
          p.dy *= -1.1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        if (useShadows) {
          ctx.shadowColor = `rgba(255,255,255,${Math.min(0.6,p.alpha)})`;
          ctx.shadowBlur = p.r * 2.5;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      initParticles();
    });

    initParticles();
    animate();
  })();

  // ------------------ A4 CONTAINER SCALING ------------------
  const a4Container = document.getElementById('canvas');
  let scaleTimer;
  function scaleA4Container() {
    if (!a4Container) return;
    const padding = 20;
    const scale = Math.min(
      (window.innerWidth - padding * 2) / a4Container.offsetWidth,
      (window.innerHeight - padding * 2) / a4Container.offsetHeight,
      1
    );
    a4Container.style.transform = `scale(${scale})`;
    a4Container.style.transformOrigin = "top center";
  }

  window.addEventListener('resize', () => clearTimeout(scaleTimer) || (scaleTimer = setTimeout(scaleA4Container, 120)));
  scaleA4Container();

});
