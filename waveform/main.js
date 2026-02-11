/* ============================================
   WAVEFORM — Animations & Canvas Waveforms
   GSAP 3.13 + ScrollTrigger + SplitText + ScrambleText
   ============================================ */

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, CustomEase);

CustomEase.create("waveReveal", "M0,0 C0.22,0.1 0.36,1 1,1");

// ============================================
// 1. CANVAS WAVEFORM ENGINE
// ============================================

class WaveformRenderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.options = {
      frequency: options.frequency || 3,
      amplitude: options.amplitude || 0.6,
      noise: options.noise || 0.1,
      color: options.color || getComputedStyle(document.documentElement).getPropertyValue("--signal").trim(),
      lineWidth: options.lineWidth || 1.5,
      secondaryLines: options.secondaryLines !== undefined ? options.secondaryLines : true,
      ...options,
    };
    this.phase = Math.random() * Math.PI * 2;
    this.scrollPhase = 0;
    this.active = false;

    this.resize();
    this._resizeHandler = () => this.resize();
    window.addEventListener("resize", this._resizeHandler);
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  draw(time) {
    const { ctx, width, height, options } = this;
    const { frequency, amplitude, noise, color, lineWidth, secondaryLines } = options;

    ctx.clearRect(0, 0, width, height);
    const midY = height / 2;
    const amp = midY * amplitude;

    // Primary wave
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    for (let x = 0; x <= width; x += 2) {
      const t = x / width;
      const y = midY
        + Math.sin(t * Math.PI * 2 * frequency + this.phase + this.scrollPhase) * amp
        + Math.sin(t * Math.PI * 2 * frequency * 2.3 + this.phase * 1.7 + this.scrollPhase * 0.8) * amp * 0.3
        + (noise > 0 ? (Math.random() - 0.5) * noise * height : 0);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Secondary wave (ghosted)
    if (secondaryLines) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth * 0.5;
      ctx.globalAlpha = 0.3;

      for (let x = 0; x <= width; x += 2) {
        const t = x / width;
        const y = midY
          + Math.sin(t * Math.PI * 2 * frequency * 1.5 + this.phase * 0.7 + this.scrollPhase * 1.2) * amp * 0.5
          + (noise > 0 ? (Math.random() - 0.5) * noise * height * 0.5 : 0);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    this.phase += 0.008;
  }

  destroy() {
    window.removeEventListener("resize", this._resizeHandler);
  }
}


// ============================================
// 2. SIGNAL PULSE RENDERER (for dividers)
// ============================================

class SignalPulseRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.phase = 0;
    this.active = false;

    this.resize();
    this._resizeHandler = () => this.resize();
    window.addEventListener("resize", this._resizeHandler);
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  draw(time) {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);

    const midY = height / 2;
    const color = getComputedStyle(document.documentElement).getPropertyValue("--signal").trim();
    const borderColor = getComputedStyle(document.documentElement).getPropertyValue("--border").trim();

    // Flatline
    ctx.beginPath();
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 0.5;
    ctx.moveTo(0, midY);
    ctx.lineTo(width, midY);
    ctx.stroke();

    // Pulse burst in center
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.lineJoin = "round";

    const center = width / 2;
    for (let x = 0; x <= width; x += 2) {
      const dist = Math.abs(x - center);
      const envelope = Math.max(0, 1 - dist / (width * 0.12));
      const y = midY + Math.sin(x * 0.12 + this.phase) * 14 * envelope
                     + Math.sin(x * 0.25 + this.phase * 1.5) * 6 * envelope;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    this.phase += 0.02;
  }

  destroy() {
    window.removeEventListener("resize", this._resizeHandler);
  }
}


// ============================================
// 3. INITIALIZE ALL CANVAS RENDERERS
// ============================================

const renderers = [];

// Hero waveform
const heroCanvas = document.querySelector(".hero-waveform");
if (heroCanvas) {
  const heroWave = new WaveformRenderer(heroCanvas, {
    frequency: 3,
    amplitude: 0.7,
    noise: 0.08,
    lineWidth: 1.8,
  });
  heroWave.isHero = true;
  renderers.push(heroWave);
}

// Signal dividers
document.querySelectorAll(".signal-canvas").forEach((canvas) => {
  renderers.push(new SignalPulseRenderer(canvas));
});

// Channel waveforms
document.querySelectorAll(".ch-waveform").forEach((canvas) => {
  const freq = parseFloat(canvas.dataset.freq) || 4;
  const amp = parseFloat(canvas.dataset.amp) || 0.5;
  const noise = parseFloat(canvas.dataset.noise) || 0.1;
  renderers.push(new WaveformRenderer(canvas, {
    frequency: freq,
    amplitude: amp,
    noise: noise,
    lineWidth: 1,
    secondaryLines: false,
  }));
});


// ============================================
// 4. ANIMATION LOOP — 60fps via gsap.ticker
// ============================================

let scrollY = 0;
window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

gsap.ticker.add((time) => {
  renderers.forEach((r) => {
    // Only animate if visible (performance)
    const rect = r.canvas.getBoundingClientRect();
    if (rect.bottom < -50 || rect.top > window.innerHeight + 50) return;

    // Scroll-reactive phase shift for hero
    if (r.isHero) {
      r.scrollPhase = scrollY * 0.003;
    }

    r.draw(time);
  });
});


// ============================================
// 5. HERO ANIMATIONS
// ============================================

(function heroAnimations() {
  const tl = gsap.timeline({ delay: 0.2 });

  // Top bar (photo + freq labels)
  tl.to(".hero .hero-top", {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: "waveReveal",
  });

  // Name: ScrambleText effect then settle
  const nameEl = document.querySelector(".hero-name");
  if (nameEl) {
    const finalText = nameEl.innerHTML;
    // First: scramble reveal
    tl.set(nameEl, { opacity: 1, y: 0 });
    tl.from(nameEl, {
      duration: 1.2,
      scrambleText: {
        text: finalText,
        chars: "01",
        revealDelay: 0.3,
        speed: 0.4,
        newClass: "scramble-char",
      },
      ease: "none",
    }, "-=0.3");
  }

  // Tagline slide up
  tl.to(".hero .tagline", {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: "waveReveal",
  }, "-=0.5");

  // Links
  tl.to(".hero .hero-links", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "waveReveal",
  }, "-=0.3");
})();


// ============================================
// 6. CHANNEL HEADER BAR ANIMATIONS
// ============================================

(function channelBarAnimations() {
  document.querySelectorAll(".channel-bar").forEach((bar) => {
    ScrollTrigger.create({
      trigger: bar.closest(".channel-header"),
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(bar, {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
        });
      },
    });
  });
})();


// ============================================
// 7. SCROLL-TRIGGERED SECTION REVEALS
// ============================================

(function sectionReveals() {
  ScrollTrigger.batch("[data-reveal]", {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "waveReveal",
        overwrite: true,
      });
    },
    start: "top 88%",
    once: true,
  });
})();


// ============================================
// 8. TAGS STAGGER
// ============================================

(function tagStagger() {
  const tags = document.querySelectorAll(".tags span");
  if (!tags.length) return;

  gsap.set(tags, { opacity: 0, y: 10 });

  ScrollTrigger.create({
    trigger: ".also",
    start: "top 85%",
    once: true,
    onEnter: () => {
      gsap.to(tags, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: "power2.out",
      });
    },
  });
})();


// ============================================
// 9. SIGNAL DIVIDER PULSE TRIGGER
// ============================================

(function signalPulseTrigger() {
  document.querySelectorAll(".signal-divider").forEach((div) => {
    gsap.set(div, { opacity: 0 });

    ScrollTrigger.create({
      trigger: div,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(div, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      },
    });
  });
})();
