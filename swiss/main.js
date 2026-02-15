/* ============================================
   SWISS TOPOLOGY V2 — Peak Map + Drawer
   GSAP 3.13 + DrawSVG + CustomEase
   ============================================ */

gsap.registerPlugin(DrawSVGPlugin, CustomEase);
CustomEase.create("swissReveal", "M0,0 C0.25,0.1 0.25,1 1,1");

const IS_DESKTOP = window.matchMedia('(min-width: 769px) and (pointer: fine)').matches;
let fogDisabled = false;


// ============================================
// 1. GENERATE RINGS — concentric circles per village
// ============================================

function generateRings(village) {
  const svg = village.querySelector('.village-rings');
  if (!svg) return;

  const ringCount = parseInt(village.dataset.rings) || 3;
  const isHero = village.classList.contains('village--hero');
  const innerRadius = isHero ? 28 : 20;
  const ringStep = isHero ? 22 : 16;

  const outerRadius = innerRadius + (ringCount - 1) * ringStep;
  const size = (outerRadius + 4) * 2;

  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);

  const cx = size / 2;
  const cy = size / 2;

  for (let i = 0; i < ringCount; i++) {
    const r = innerRadius + i * ringStep;
    const opacity = 0.2 - i * (0.12 / ringCount);
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    const finalOpacity = Math.max(opacity, 0.06).toFixed(2);
    circle.setAttribute('opacity', finalOpacity);
    circle.setAttribute('data-base-opacity', finalOpacity);
    circle.setAttribute('data-ring-index', i);
    svg.appendChild(circle);
  }

  // Store bounding info for contour deflection
  village._ringRadius = outerRadius;
}


// ============================================
// 2. POSITION VILLAGES — percentage to pixel
// ============================================

function positionVillages() {
  const villages = document.querySelectorAll('.village');
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Build candidate positions with random drift
  const candidates = [];
  villages.forEach(village => {
    const basePx = parseFloat(village.dataset.mapX);
    const basePy = parseFloat(village.dataset.mapY);
    const isHero = village.classList.contains('village--hero');
    const drift = isHero ? 0 : 10;

    candidates.push({
      el: village,
      isHero,
      basePx: basePx,
      basePy: basePy,
      px: basePx + (Math.random() - 0.5) * drift * 2,
      py: basePy + (Math.random() - 0.5) * drift * 2,
      radius: village._ringRadius || 50,
    });
  });

  // Iterative repulsion — push overlapping villages apart
  const minDist = 20; // minimum distance in % units
  for (let iter = 0; iter < 20; iter++) {
    let moved = false;
    for (let i = 0; i < candidates.length; i++) {
      for (let j = i + 1; j < candidates.length; j++) {
        const a = candidates[i];
        const b = candidates[j];
        const dx = b.px - a.px;
        const dy = b.py - a.py;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;

        if (dist < minDist) {
          const overlap = (minDist - dist) / 2;
          const nx = dx / dist;
          const ny = dy / dist;

          // Only push non-hero villages
          if (!a.isHero) {
            a.px -= nx * overlap;
            a.py -= ny * overlap;
          }
          if (!b.isHero) {
            b.px += nx * overlap;
            b.py += ny * overlap;
          }
          moved = true;
        }
      }
    }
    if (!moved) break;
  }

  // Clamp to viewport bounds (5%-95%) and apply
  const positions = [];
  candidates.forEach(c => {
    if (!c.isHero) {
      c.px = Math.max(8, Math.min(92, c.px));
      c.py = Math.max(8, Math.min(92, c.py));
    }

    const x = (c.px / 100) * vw;
    const y = (c.py / 100) * vh;

    c.el.style.left = `${x}px`;
    c.el.style.top = `${y}px`;

    positions.push({
      x,
      y,
      radius: c.radius,
      el: c.el,
    });
  });

  return positions;
}


// ============================================
// VILLAGE HOVER — continuous gentle float
// ============================================

function animateVillageHover() {
  const villages = document.querySelectorAll('.village');
  villages.forEach(village => {
    const isHero = village.classList.contains('village--hero');
    const range = isHero ? 4 : 6;
    const baseDuration = isHero ? 5 : 4;

    // Vertical bob
    gsap.to(village, {
      y: `+=${range}`,
      duration: baseDuration + Math.random() * 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 2,
    });

    // Horizontal sway (slower, subtler)
    gsap.to(village, {
      x: `+=${range * 0.6}`,
      duration: baseDuration + 2 + Math.random() * 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 3,
    });
  });
}


// ============================================
// 3. GENERATIVE CONTOUR LINES (village-aware)
// ============================================

function generateContours(villagePositions) {
  const svg = document.getElementById('contour-svg');
  if (!svg) return [];

  svg.innerHTML = '';

  const width = window.innerWidth;
  const height = window.innerHeight;

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // Build obstacle list from village positions
  const obstacles = villagePositions.map(v => ({
    cx: v.x,
    cy: v.y,
    r: v.radius + 30,
  }));

  function deflect(px, py) {
    let dx = 0, dy = 0;
    for (const obs of obstacles) {
      const distX = px - obs.cx;
      const distY = py - obs.cy;
      const dist = Math.sqrt(distX * distX + distY * distY) || 1;
      if (dist < obs.r + 60) {
        const force = ((obs.r + 60 - dist) / (obs.r + 60)) ** 2 * 50;
        dx += (distX / dist) * force;
        dy += (distY / dist) * force;
      }
    }
    return { x: px + dx, y: py + dy };
  }

  const contourPaths = [];
  const groupSpacing = height / 6;
  const groupCount = 7;

  for (let g = 0; g < groupCount; g++) {
    const baseY = g * groupSpacing + (Math.random() - 0.5) * 30;
    const lineCount = 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < lineCount; i++) {
      const y = baseY + i * 28;
      const frequency = 1.5 + Math.random() * 2;
      const amplitude = 12 + Math.random() * 20;
      const phase = Math.random() * Math.PI * 2;
      const opacity = 0.12 + (1 - i / lineCount) * 0.28;
      const strokeWidth = 1.0 - i * 0.15;

      const segments = 12;
      const segWidth = (width + 200) / segments;
      const points = [];

      for (let s = 0; s <= segments; s++) {
        const rawX = -100 + s * segWidth;
        const rawY = y
          + Math.sin(s * frequency * 0.5 + phase) * amplitude
          + Math.sin(s * frequency * 0.3 + phase * 1.7) * amplitude * 0.4;

        const deflected = IS_DESKTOP ? deflect(rawX, rawY) : { x: rawX, y: rawY };
        points.push(deflected);
      }

      let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
      for (let p = 1; p < points.length; p++) {
        const prev = points[p - 1];
        const curr = points[p];
        const cpx1 = prev.x + segWidth * 0.4;
        const cpy1 = prev.y;
        const cpx2 = curr.x - segWidth * 0.4;
        const cpy2 = curr.y;
        d += ` C ${cpx1.toFixed(1)} ${cpy1.toFixed(1)}, ${cpx2.toFixed(1)} ${cpy2.toFixed(1)}, ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('class', 'contour-line');
      path.setAttribute('stroke-width', Math.max(strokeWidth, 0.5));
      path.setAttribute('opacity', opacity.toFixed(2));
      path.dataset.group = g;
      path.dataset.depth = (0.3 + Math.random() * 0.7).toFixed(2);
      path.dataset.baseOpacity = opacity.toFixed(2);
      svg.appendChild(path);
      contourPaths.push(path);
    }

    // Elevation markers
    if (Math.random() > 0.4) {
      const markerX = 120 + Math.random() * (width - 240);
      const markerY = baseY + 5;
      const elevation = (300 + g * 120 + Math.floor(Math.random() * 50)).toString();

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', markerX);
      circle.setAttribute('cy', markerY);
      circle.setAttribute('r', '2');
      circle.setAttribute('fill', 'var(--contour)');
      circle.setAttribute('opacity', '0.25');
      svg.appendChild(circle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', markerX + 8);
      text.setAttribute('y', markerY + 4);
      text.setAttribute('fill', 'var(--contour)');
      text.setAttribute('font-size', '8');
      text.setAttribute('opacity', '0.2');
      text.setAttribute('font-family', 'JetBrains Mono, monospace');
      text.textContent = elevation;
      svg.appendChild(text);
    }
  }

  // DrawSVG entrance
  contourPaths.forEach((path, i) => {
    gsap.set(path, { drawSVG: '0%' });
    gsap.to(path, {
      drawSVG: '100%',
      duration: 2 + Math.random() * 1.5,
      delay: 0.05 + i * 0.03,
      ease: 'power2.inOut',
    });
  });

  return contourPaths;
}


// ============================================
// 4. CONTOUR OSCILLATION
// ============================================

function animateContourOscillation(paths) {
  paths.forEach(path => {
    const depth = parseFloat(path.dataset.depth);

    gsap.to(path, {
      y: `+=${8 + depth * 7}`,
      duration: 4 + Math.random() * 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 2,
    });

    gsap.to(path, {
      x: `+=${3 + depth * 5}`,
      duration: 7 + Math.random() * 5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 3,
    });
  });
}


// ============================================
// 5. FLASHLIGHT / FOG-OF-WAR
// ============================================

function initFlashlight() {
  const fog = document.querySelector('.fog');
  const villages = document.querySelectorAll('.village');
  const contourPaths = document.querySelectorAll('.contour-line');
  let pathways = null; // lazy — queried after pathways are generated
  if (!fog || !villages.length) return;

  // Initial hidden state
  villages.forEach(v => {
    gsap.set(v, { opacity: 0.03 });
  });

  const villageQuickOps = [];
  villages.forEach(v => {
    villageQuickOps.push({
      el: v,
      quickOpacity: gsap.quickTo(v, 'opacity', { duration: 0.35, ease: 'power2.out' }),
    });
  });

  // Start flashlight at viewport center (hero position)
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight * 0.48; // hero is at 48% y
  let picked = false;
  let ticking = false;

  // Apply initial center position immediately
  requestAnimationFrame(updateFlashlight);

  function updateFlashlight() {
    if (fogDisabled) { ticking = false; return; }
    document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);

    villageQuickOps.forEach(({ el, quickOpacity }) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let target;
      if (dist < 300) {
        target = 1;
      } else if (dist < 550) {
        target = 1 - ((dist - 300) / 250) * 0.97;
      } else {
        target = 0.03;
      }

      quickOpacity(target);

      // Boost ring stroke opacity near cursor
      const rings = el.querySelectorAll('.village-rings circle');
      rings.forEach(ring => {
        const baseOp = parseFloat(ring.dataset.baseOpacity) || 0.1;
        if (dist < 350) {
          const boost = 1 + (1 - dist / 350) * 4;
          ring.setAttribute('opacity', Math.min(baseOp * boost, 0.65).toFixed(2));
        } else {
          ring.setAttribute('opacity', baseOp);
        }
      });
    });

    // Contour glow near cursor
    contourPaths.forEach(path => {
      const baseOp = parseFloat(path.dataset.baseOpacity) || 0.2;
      const groupIdx = parseInt(path.dataset.group) || 0;
      const approxPathY = groupIdx * (window.innerHeight / 6);
      const dy = Math.abs(mouseY - approxPathY);

      if (dy < 400) {
        const boost = 1 + (1 - dy / 400) * 1.5;
        path.setAttribute('opacity', Math.min(baseOp * boost, 0.7).toFixed(2));
      } else {
        path.setAttribute('opacity', baseOp);
      }
    });

    // Pathway glow — light up when cursor is near the path's village endpoint
    pathways = document.querySelectorAll('.pathway');
    pathways.forEach(pw => {
      const vx = parseFloat(pw.dataset.vx);
      const vy = parseFloat(pw.dataset.vy);
      const hx = parseFloat(pw.dataset.heroX);
      const hy = parseFloat(pw.dataset.heroY);

      // Distance from cursor to village end
      const dvx = mouseX - vx;
      const dvy = mouseY - vy;
      const distV = Math.sqrt(dvx * dvx + dvy * dvy);

      // Distance from cursor to hero end
      const dhx = mouseX - hx;
      const dhy = mouseY - hy;
      const distH = Math.sqrt(dhx * dhx + dhy * dhy);

      // Use whichever end is closer
      const dist = Math.min(distV, distH);

      if (dist < 350) {
        const t = 1 - dist / 350;
        pw.setAttribute('opacity', (0.04 + t * 0.35).toFixed(2));
      } else {
        pw.setAttribute('opacity', '0.04');
      }
    });

    ticking = false;
  }

  document.addEventListener('mousemove', e => {
    if (!picked) {
      // First mouse move: smoothly transition from center to cursor
      picked = true;
      const startX = mouseX;
      const startY = mouseY;
      const targetX = e.clientX;
      const targetY = e.clientY;
      gsap.to({ t: 0 }, {
        t: 1,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: function () {
          const t = this.targets()[0].t;
          mouseX = startX + (targetX - startX) * t;
          mouseY = startY + (targetY - startY) * t;
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(updateFlashlight);
          }
        },
        onComplete: () => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          requestAnimationFrame(updateFlashlight);
        },
      });
      return;
    }

    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateFlashlight);
    }
  });

  document.addEventListener('mouseleave', () => {
    picked = false; // Reset so re-entering triggers smooth pickup again
    // Animate flashlight back to center
    const startX = mouseX;
    const startY = mouseY;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.48;
    gsap.to({ t: 0 }, {
      t: 1,
      duration: 0.6,
      ease: 'power2.inOut',
      onUpdate: function () {
        const t = this.targets()[0].t;
        mouseX = startX + (centerX - startX) * t;
        mouseY = startY + (centerY - startY) * t;
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateFlashlight);
        }
      },
      onComplete: () => {
        mouseX = centerX;
        mouseY = centerY;
        requestAnimationFrame(updateFlashlight);
      },
    });
  });
}


// ============================================
// 6. DRAWER
// ============================================

function initDrawer() {
  const drawer = document.querySelector('.drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close');
  const fog = document.querySelector('.fog');
  const panels = document.querySelectorAll('.drawer-panel');
  const villages = document.querySelectorAll('.village[data-section]');
  if (!drawer || !villages.length) return;

  let isOpen = false;
  let currentSection = null;

  function openDrawer(sectionId) {
    if (isOpen && currentSection === sectionId) return;

    // Activate correct panel
    panels.forEach(p => p.classList.remove('is-active'));
    const target = document.getElementById(`drawer-${sectionId}`);
    if (target) {
      target.classList.add('is-active');
      // Activate deferred iframes (e.g. SoundCloud embeds)
      target.querySelectorAll('iframe[data-src]').forEach(iframe => {
        iframe.src = iframe.dataset.src;
        delete iframe.dataset.src;
      });
    }

    drawer.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('is-active');
    if (fog) fog.classList.add('fog--dimmed');
    currentSection = sectionId;

    if (!isOpen) {
      isOpen = true;
      gsap.to(drawer, {
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
      });
      gsap.to(backdrop, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    // Scroll drawer to top
    const scrollArea = drawer.querySelector('.drawer-scroll');
    if (scrollArea) scrollArea.scrollTop = 0;
  }

  function closeDrawer() {
    if (!isOpen) return;
    isOpen = false;
    currentSection = null;

    if (fog) fog.classList.remove('fog--dimmed');

    gsap.to(drawer, {
      y: '-100%',
      duration: 0.35,
      ease: 'power3.in',
      onComplete: () => {
        panels.forEach(p => p.classList.remove('is-active'));
        drawer.setAttribute('aria-hidden', 'true');
      },
    });
    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        backdrop.classList.remove('is-active');
      },
    });
  }

  // Click handlers on village markers
  villages.forEach(village => {
    village.addEventListener('click', () => {
      const sectionId = village.dataset.section;
      if (sectionId) openDrawer(sectionId);
    });
  });

  // Close button
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Click outside (backdrop)
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeDrawer();
  });
}


// ============================================
// 7. CONTINUOUS RING DRAW ANIMATION
// ============================================

function animateRings() {
  const villages = document.querySelectorAll('.village');
  villages.forEach(village => {
    const rings = village.querySelectorAll('.village-rings circle');
    rings.forEach((ring, i) => {
      const duration = 4 + i * 1.2 + Math.random() * 2;
      const delay = i * 0.5 + Math.random() * 1.5;

      // Continuous drawing loop: 0% → 100% → rotating start point
      gsap.fromTo(ring,
        { drawSVG: '0% 0%' },
        {
          drawSVG: '0% 100%',
          duration: duration * 0.5,
          ease: 'power1.inOut',
          delay,
          onComplete: function () {
            // Start the perpetual cycle
            loopRingDraw(ring, duration);
          },
        }
      );
    });
  });
}

function loopRingDraw(ring, duration) {
  const tl = gsap.timeline({ repeat: -1 });

  // Full circle visible, then the tail catches up
  tl.fromTo(ring,
    { drawSVG: '0% 100%' },
    { drawSVG: '100% 100%', duration: duration * 0.5, ease: 'power1.inOut' }
  );

  // Gap, then head starts drawing again
  tl.fromTo(ring,
    { drawSVG: '0% 0%' },
    { drawSVG: '0% 100%', duration: duration * 0.5, ease: 'power1.inOut' },
    '+=0.3'
  );
}


// ============================================
// 8. HERO ENTRANCE
// ============================================

function heroEntrance() {
  const hero = document.querySelector('.village--hero');
  if (!hero) return;

  const rings = hero.querySelectorAll('.village-rings circle');
  const title = hero.querySelector('.village-title');
  const tl = gsap.timeline({ delay: 0.4 });

  // Fade in hero first (bypass flashlight for entrance)
  if (IS_DESKTOP) {
    tl.set(hero, { opacity: 1 });
  }

  // Draw rings concentrically
  rings.forEach((ring, i) => {
    ring.setAttribute('opacity', '0.3');
    gsap.set(ring, { drawSVG: '0%' });
    tl.to(ring, {
      drawSVG: '100%',
      duration: 0.8,
      ease: 'power2.inOut',
    }, i * 0.15);
  });

  // Fade in title
  gsap.set(title, { opacity: 0, y: 10 });
  tl.to(title, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'swissReveal',
  }, '-=0.3');

  // After hero entrance, settle ring opacities back to base values
  tl.add(() => {
    rings.forEach(ring => {
      const baseOp = parseFloat(ring.dataset.baseOpacity) || 0.1;
      gsap.to(ring, {
        attr: { opacity: baseOp },
        duration: 1,
      });
    });
  });
}


// ============================================
// 9. MOBILE FALLBACK
// ============================================

function initMobile() {
  const villages = document.querySelectorAll('.village');

  // Override coordinates for portrait layout — spread vertically, keep x variety
  const mobileCoords = {
    'about':       { x: 50, y: 12 },  // hero
    'ai-diplomacy': { x: 72, y: 25 },
    'fractalgva':  { x: 25, y: 35 },
    'djing':       { x: 75, y: 45 },
    'writing':     { x: 22, y: 55 },
'photoalbum':  { x: 70, y: 92 },
    'bookshelf':   { x: 35, y: 18 },
    'recommendations': { x: 65, y: 10 },
    'funfacts':    { x: 15, y: 28 },
    'hottakes':    { x: 45, y: 82 },
    'keyideas':    { x: 78, y: 75 },
  };

  villages.forEach(v => {
    const section = v.dataset.section;
    if (section && mobileCoords[section]) {
      v.dataset.mapX = mobileCoords[section].x;
      v.dataset.mapY = mobileCoords[section].y;
    }
  });

  // Position using the standard function
  const positions = positionVillages();

  // Generate contours (no obstacle avoidance on mobile)
  const contourPaths = generateContours([]);
  animateContourOscillation(contourPaths);

  // Fade in villages
  villages.forEach((v, i) => {
    gsap.set(v, { opacity: 0 });
    gsap.to(v, {
      opacity: 1,
      duration: 0.5,
      delay: 0.2 + i * 0.08,
      ease: 'power2.out',
    });
  });

  // Drawer works via tap
  initDrawer();
  animateVillageHover();
}


// ============================================
// 10. PATHWAYS — lines from hero to villages
// ============================================

function generatePathways(villagePositions) {
  const svg = document.getElementById('contour-svg');
  if (!svg || villagePositions.length < 2) return [];

  // Find hero position (first entry, the one without data-section)
  const hero = villagePositions.find(v => v.el.classList.contains('village--hero'));
  if (!hero) return [];

  const paths = [];

  villagePositions.forEach(v => {
    if (v.el === hero.el) return; // skip hero → hero

    // Curved path from hero to village via a control point offset sideways
    const dx = v.x - hero.x;
    const dy = v.y - hero.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Perpendicular offset for the curve — gives it a nice arc
    const nx = -dy / dist;
    const ny = dx / dist;
    const curvature = dist * 0.15 * (Math.random() > 0.5 ? 1 : -1);
    const cpx = (hero.x + v.x) / 2 + nx * curvature;
    const cpy = (hero.y + v.y) / 2 + ny * curvature;

    const d = `M ${hero.x.toFixed(1)} ${hero.y.toFixed(1)} Q ${cpx.toFixed(1)} ${cpy.toFixed(1)}, ${v.x.toFixed(1)} ${v.y.toFixed(1)}`;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', 'pathway');
    path.setAttribute('stroke', 'var(--accent)');
    path.setAttribute('stroke-width', '0.8');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-dasharray', '4 6');
    path.setAttribute('opacity', '0.04');
    path.dataset.baseOpacity = '0.04';
    // Store the village's pixel center for proximity checks
    path.dataset.vx = v.x.toFixed(0);
    path.dataset.vy = v.y.toFixed(0);
    path.dataset.heroX = hero.x.toFixed(0);
    path.dataset.heroY = hero.y.toFixed(0);

    svg.appendChild(path);
    paths.push(path);
  });

  // Entrance: draw in
  paths.forEach((path, i) => {
    gsap.set(path, { drawSVG: '0%' });
    gsap.to(path, {
      drawSVG: '100%',
      duration: 1.5 + Math.random(),
      delay: 1.5 + i * 0.1,
      ease: 'power2.inOut',
    });
  });

  return paths;
}


// ============================================
// 11. RESIZE HANDLER
// ============================================

let resizeTimeout;
function handleResize(contourPathsRef, villagePositionsRef) {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (IS_DESKTOP) {
      // Kill existing oscillation tweens
      contourPathsRef.current.forEach(path => gsap.killTweensOf(path));

      // Reposition villages
      const newPositions = positionVillages();
      villagePositionsRef.current = newPositions;

      // Regenerate contours and pathways
      const newPaths = generateContours(newPositions);
      contourPathsRef.current = newPaths;
      animateContourOscillation(newPaths);
      generatePathways(newPositions);
    }
  }, 300);
}


// ============================================
// INIT
// ============================================

(function init() {
  const contourPathsRef = { current: [] };
  const villagePositionsRef = { current: [] };

  // Generate rings for all villages
  document.querySelectorAll('.village').forEach(generateRings);

  if (IS_DESKTOP) {
    // Position villages on the map
    const positions = positionVillages();
    villagePositionsRef.current = positions;

    // Generate obstacle-aware contour lines
    const contourPaths = generateContours(positions);
    contourPathsRef.current = contourPaths;

    animateContourOscillation(contourPaths);
    generatePathways(positions);
    initFlashlight();
    initDrawer();
    heroEntrance();
    animateRings();
    animateVillageHover();
  } else {
    // Mobile: simple layout
    const contourPaths = generateContours([]);
    contourPathsRef.current = contourPaths;
    animateContourOscillation(contourPaths);
    initMobile();
  }

  window.addEventListener('resize', () => handleResize(contourPathsRef, villagePositionsRef));

  // Archive gallery — lazy-load manifest when drawer first opens
  initArchiveGallery();

  // Lazy-load JSON data on first drawer open
  initLazyPanels();
})();


// ============================================
// 12. ARCHIVE GALLERY
// ============================================

function initArchiveGallery() {
  const gallery = document.getElementById('archive-gallery');
  if (!gallery) return;

  let allImages = []; // flat list for lightbox navigation
  let captions = {};  // filename -> caption text

  // Prefetch archive in background after page is ready
  const startLoad = () => loadArchive();
  if ('requestIdleCallback' in window) {
    requestIdleCallback(startLoad, { timeout: 3000 });
  } else {
    setTimeout(startLoad, 500);
  }

  function loadArchive() {
    Promise.all([
      fetch('archive/manifest.json').then(r => r.json()),
      fetch('archive/captions.json').then(r => r.json()).catch(() => ({}))
    ]).then(([months, captionData]) => {
      captions = captionData;
      let idx = 0;
      months.forEach(group => {
          const section = document.createElement('div');
          section.className = 'archive-month';

          const label = document.createElement('div');
          label.className = 'archive-month-label';
          label.textContent = group.label;
          section.appendChild(label);

          const grid = document.createElement('div');
          grid.className = 'archive-grid';

          group.images.forEach(filename => {
            const src = `archive/posts/${group.month}/${filename}`;
            allImages.push(src);

            const thumb = document.createElement('div');
            thumb.className = 'archive-thumb';
            const imgIdx = idx++;

            const img = document.createElement('img');
            img.loading = 'lazy';
            img.alt = `Post from ${group.label}`;
            img.src = src;

            thumb.addEventListener('click', () => openLightbox(imgIdx));
            thumb.appendChild(img);
            grid.appendChild(thumb);
          });

          section.appendChild(grid);
          gallery.appendChild(section);
        });
      });
  }

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  let currentIdx = 0;

  function openLightbox(idx) {
    currentIdx = idx;
    updateLightbox();
    lightbox.classList.add('is-active');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-active');
  }

  function updateLightbox() {
    lightboxImg.src = allImages[currentIdx];
    const filename = allImages[currentIdx].split('/').pop();
    lightboxCaption.textContent = captions[filename] || '';
    lightboxCounter.textContent = `${currentIdx + 1} / ${allImages.length}`;
  }

  function navigate(dir) {
    currentIdx = (currentIdx + dir + allImages.length) % allImages.length;
    updateLightbox();
  }

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));

  // Click backdrop to close
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Swipe support for mobile
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      navigate(dx > 0 ? -1 : 1);
    }
  }, { passive: true });
}


// ============================================
// 13. BOOKSHELF
// ============================================

function initLazyPanels() {
  const registry = [
    { containerId: 'bookshelf',       json: 'books.json',           render: renderBookshelf },
    { containerId: 'recommendations', json: 'recommendations.json', render: renderRecommendations },
    { containerId: 'funfacts',        json: 'funfacts.json',        render: renderFunFacts },
    { containerId: 'hottakes',        json: 'hottakes.json',        render: renderHotTakes },
    { containerId: 'keyideas',        json: 'keyideas.json',        render: renderKeyIdeas },
  ];

  // Prefetch all JSON and render panels in background after page is ready
  const prefetch = () => {
    registry.forEach(cfg => {
      const container = document.getElementById(cfg.containerId);
      if (container) {
        fetch(cfg.json)
          .then(r => r.json())
          .then(data => cfg.render(data, container))
          .catch(() => {});
      }
    });
  };

  // Use requestIdleCallback (or setTimeout fallback) so we don't block initial render
  if ('requestIdleCallback' in window) {
    requestIdleCallback(prefetch, { timeout: 2000 });
  } else {
    setTimeout(prefetch, 200);
  }
}

function renderBookshelf(data, container) {
  data.forEach(cat => {
    const section = document.createElement('div');
    section.className = 'bookshelf-category';

    const label = document.createElement('div');
    label.className = 'bookshelf-category-label';
    label.textContent = cat.category;
    section.appendChild(label);

    const grid = document.createElement('div');
    grid.className = 'bookshelf-grid';

    cat.books.forEach(book => {
      const card = document.createElement('a');
      card.className = 'book-card';
      card.href = 'https://www.goodreads.com/search?q=' + encodeURIComponent(book.title + ' ' + book.author);
      card.target = '_blank';
      card.rel = 'noopener';

      const cover = document.createElement('div');
      cover.className = 'book-cover';

      if (book.cover) {
        const img = document.createElement('img');
        img.src = book.cover;
        img.alt = book.title;
        img.loading = 'lazy';
        cover.appendChild(img);
      } else {
        const ph = document.createElement('div');
        ph.className = 'book-cover-placeholder';
        ph.textContent = book.title;
        cover.appendChild(ph);
      }

      const author = document.createElement('div');
      author.className = 'book-author';
      author.textContent = book.author;

      card.appendChild(cover);
      card.appendChild(author);
      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}


// ============================================
// 14. RECOMMENDATIONS
// ============================================

function renderRecommendations(data, container) {
  data.forEach(cat => {
    const section = document.createElement('div');
    section.className = 'rec-category';

    const label = document.createElement('div');
    label.className = 'rec-category-label';
    label.textContent = cat.category;
    section.appendChild(label);

    const list = document.createElement('div');
    list.className = 'rec-list';

    cat.items.forEach(item => {
      const entry = document.createElement('a');
      entry.className = 'rec-entry';
      entry.href = item.url || '#';
      if (item.url) {
        entry.target = '_blank';
        entry.rel = 'noopener';
      }

      const title = document.createElement('div');
      title.className = 'rec-title';
      title.textContent = item.title;

      const byline = document.createElement('div');
      byline.className = 'rec-byline';
      byline.textContent = item.by || '';

      const desc = document.createElement('div');
      desc.className = 'rec-desc';
      desc.textContent = item.desc || '';

      entry.appendChild(title);
      if (item.by) entry.appendChild(byline);
      if (item.desc) entry.appendChild(desc);
      list.appendChild(entry);
    });

    section.appendChild(list);
    container.appendChild(section);
  });
}


// ============================================
// 15. FUN FACTS
// ============================================

function renderFunFacts(data, container) {
  data.forEach(fact => {
    const card = document.createElement('div');
    card.className = 'funfact-card';

    const text = document.createElement('div');
    text.className = 'funfact-text';
    text.textContent = fact.text;
    card.appendChild(text);

    container.appendChild(card);
  });
}


// ============================================
// 16. HOT TAKES
// ============================================

function renderHotTakes(data, container) {
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'hottake-card';

    const text = document.createElement('div');
    text.className = 'hottake-text';
    text.textContent = item.take;
    card.appendChild(text);

    if (item.tag) {
      const tag = document.createElement('span');
      tag.className = 'hottake-tag';
      tag.textContent = item.tag;
      card.appendChild(tag);
    }

    container.appendChild(card);
  });
}


// ============================================
// 17. KEY IDEAS
// ============================================

function renderKeyIdeas(data, container) {
  data.forEach(idea => {
    const card = document.createElement('div');
    card.className = 'keyidea-card';

    const title = document.createElement('div');
    title.className = 'keyidea-title';
    title.textContent = idea.title;
    card.appendChild(title);

    const summary = document.createElement('div');
    summary.className = 'keyidea-summary';
    summary.textContent = idea.summary;
    card.appendChild(summary);

    if (idea.image) {
      const img = document.createElement('img');
      img.className = 'keyidea-image';
      img.src = idea.image;
      img.alt = idea.title;
      img.loading = 'lazy';
      card.appendChild(img);
    }

    if (idea.related && idea.related.length > 0) {
      const related = document.createElement('div');
      related.className = 'keyidea-related';
      related.textContent = idea.related.join(' \u00b7 ');
      card.appendChild(related);
    }

    container.appendChild(card);
  });
}


// ============================================
// 18. EASTER EGG — FOG TOGGLE
// ============================================

(function initFogToggle() {
  const toggle = document.getElementById('fog-toggle');
  const modal = document.getElementById('agi-modal');
  const btnLove = document.getElementById('agi-love');
  const btnNope = document.getElementById('agi-nope');
  const fog = document.querySelector('.fog');
  if (!toggle || !modal || !fog) return;

  // Position in a random corner each reload
  const corners = [
    { top: '20px', left: '20px' },
    { top: '20px', right: '20px' },
    { bottom: '50px', left: '20px' },
    { bottom: '50px', right: '20px' },
  ];
  const corner = corners[Math.floor(Math.random() * 4)];
  Object.assign(toggle.style, corner);

  // Click: show modal
  toggle.addEventListener('click', () => {
    modal.classList.add('is-active');
  });

  // "Toward love too cheap to meter"
  btnLove.addEventListener('click', () => {
    modal.classList.remove('is-active');
    fogDisabled = true;

    // Dissolve the fog
    fog.style.transition = 'opacity 2s ease';
    fog.style.opacity = '0';
    fog.style.pointerEvents = 'none';
    setTimeout(() => { fog.style.display = 'none'; }, 2200);

    // Show all villages fully
    document.querySelectorAll('.village').forEach(v => {
      gsap.to(v, { opacity: 1, duration: 1.5, ease: 'power2.out' });
    });

    // Reveal all contour lines and pathways
    document.querySelectorAll('.contour-line').forEach(p => {
      p.setAttribute('opacity', (parseFloat(p.dataset.baseOpacity) * 2.5).toFixed(2));
    });
    document.querySelectorAll('.pathway').forEach(p => {
      gsap.to(p, { attr: { opacity: 0.25 }, duration: 1.5 });
    });

    // Paperclips!
    spawnPaperclips();

    // Hide the toggle
    toggle.style.display = 'none';
  });

  // "No, I'm not ready"
  btnNope.addEventListener('click', () => {
    window.open('https://gradual-disempowerment.ai/', '_blank', 'noopener');
  });

  // Close modal on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('is-active');
  });
})();

function spawnPaperclips() {
  const clips = ['\u{1F4CE}', '\u{1F587}\uFE0F', '\u{1F4CE}', '\u{1F4CE}', '\u{1F587}\uFE0F'];
  const count = 30;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'paperclip';
      el.textContent = clips[i % clips.length];

      // Random start position
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      el.style.left = startX + 'px';
      el.style.top = startY + 'px';

      // Random drift direction
      const dx = (Math.random() - 0.5) * 400;
      const dy = -200 - Math.random() * 300;
      const rot = (Math.random() - 0.5) * 720;
      el.style.setProperty('--dx', dx + 'px');
      el.style.setProperty('--dy', dy + 'px');
      el.style.setProperty('--rot', rot + 'deg');
      el.style.fontSize = (1 + Math.random() * 1.5) + 'rem';

      document.body.appendChild(el);
      el.style.animation = `paperclip-drift ${2 + Math.random() * 2}s ease-out forwards`;

      // Clean up
      setTimeout(() => el.remove(), 5000);
    }, i * 120);
  }
}
