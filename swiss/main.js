/* ============================================
   SWISS TOPOLOGY V2 — Peak Map + Drawer
   GSAP 3.13 + DrawSVG + CustomEase
   ============================================ */

gsap.registerPlugin(DrawSVGPlugin, CustomEase);
CustomEase.create("swissReveal", "M0,0 C0.25,0.1 0.25,1 1,1");

const IS_DESKTOP = window.matchMedia('(min-width: 769px) and (pointer: fine)').matches;


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
  const positions = [];

  villages.forEach(village => {
    const px = parseFloat(village.dataset.mapX);
    const py = parseFloat(village.dataset.mapY);

    const x = (px / 100) * vw;
    const y = (py / 100) * vh;

    village.style.left = `${x}px`;
    village.style.top = `${y}px`;

    positions.push({
      x,
      y,
      radius: village._ringRadius || 50,
      el: village,
    });
  });

  return positions;
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

  let mouseX = -9999;
  let mouseY = -9999;
  let ticking = false;

  function updateFlashlight() {
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

    ticking = false;
  }

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateFlashlight);
    }
  });

  document.addEventListener('mouseleave', () => {
    mouseX = -9999;
    mouseY = -9999;
    document.documentElement.style.setProperty('--mouse-x', '-9999px');
    document.documentElement.style.setProperty('--mouse-y', '-9999px');
    villageQuickOps.forEach(({ quickOpacity }) => quickOpacity(0.03));
    contourPaths.forEach(path => {
      path.setAttribute('opacity', path.dataset.baseOpacity);
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
    if (target) target.classList.add('is-active');

    drawer.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('is-active');
    currentSection = sectionId;

    if (!isOpen) {
      isOpen = true;
      gsap.to(drawer, {
        x: 0,
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
    drawer.scrollTop = 0;
  }

  function closeDrawer() {
    if (!isOpen) return;
    isOpen = false;
    currentSection = null;

    gsap.to(drawer, {
      x: '100%',
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
// 7. RING PULSE ANIMATION
// ============================================

function animateRings() {
  const villages = document.querySelectorAll('.village');
  villages.forEach(village => {
    const rings = village.querySelectorAll('.village-rings circle');
    rings.forEach((ring, i) => {
      gsap.to(ring, {
        attr: { r: `+=${1.5 + i * 0.5}` },
        duration: 3 + Math.random() * 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.3 + Math.random(),
      });
    });
  });
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

  // Make all visible immediately
  villages.forEach(v => {
    gsap.set(v, { opacity: 0, y: 20 });
  });

  // Stagger entrance
  gsap.to(villages, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'swissReveal',
    delay: 0.3,
  });

  // Drawer still works via tap
  initDrawer();
}


// ============================================
// 10. RESIZE HANDLER
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

      // Regenerate contours
      const newPaths = generateContours(newPositions);
      contourPathsRef.current = newPaths;
      animateContourOscillation(newPaths);
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
    initFlashlight();
    initDrawer();
    heroEntrance();
    animateRings();
  } else {
    // Mobile: simple layout
    const contourPaths = generateContours([]);
    contourPathsRef.current = contourPaths;
    animateContourOscillation(contourPaths);
    initMobile();
  }

  window.addEventListener('resize', () => handleResize(contourPathsRef, villagePositionsRef));
})();
