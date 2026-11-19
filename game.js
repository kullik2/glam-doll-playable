/**
 * GLAM DOLL: DAY OUT! - YOUTUBE PLAYABLES GAME ENGINE
 * Pure Vanilla JavaScript & Web Audio API
 * Built for 60FPS mobile webview performance & kid-friendly UX.
 */

// ==================== 1. PROCEDURAL SOUND ENGINE (WEB AUDIO API) ====================
class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgmPlaying = false;
    this.bgmTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return this.muted;
  }

  // Juicy pop sound (bubble pop)
  playPop() {
    if (this.muted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const t = this.ctx.currentTime;
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.08);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }

  // Sparkle chime cascade (harp glissando)
  playSparkle() {
    if (this.muted || !this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (this.muted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.25);
      }, i * 45);
    });
  }

  // Sizzle frying sound (filtered white noise)
  playSizzle() {
    if (this.muted || !this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1400;

    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
    noise.stop(t + 0.8);
  }

  // Camera shutter snap
  playCamera() {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.setValueAtTime(2400, t + 0.05);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.15);
  }

  // Oven bell ding chime
  playDing() {
    if (this.muted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1760, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.6);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.7);
  }

  // Blender whirring sound
  playBlender() {
    if (this.muted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.linearRampToValueAtTime(340, t + 0.4);
    osc.frequency.linearRampToValueAtTime(220, t + 0.8);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.85);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.85);
  }

  // Sauce squirt sound (funny cartoon squirt)
  playSauceSquirt() {
    if (this.muted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.12);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Crispy crunch sound for fries and nuggets
  playCrunch() {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(350, t);
    osc.frequency.setValueAtTime(150, t + 0.04);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.1);
  }

  // Boiling bubble sound
  playBoil() {
    if (this.muted || !this.ctx) return;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        if (this.muted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300 + Math.random() * 200, t);
        osc.frequency.exponentialRampToValueAtTime(600 + Math.random() * 200, t + 0.06);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.06);
      }, i * 60);
    }
  }

  // Fanfare Celebration Chords
  playFanfare() {
    if (this.muted || !this.ctx) return;
    const chords = [
      [523.25, 659.25, 783.99],       // C
      [587.33, 739.99, 880.00],       // D
      [659.25, 830.61, 987.77],       // E
      [1046.50, 1318.51, 1567.98]     // High C octave
    ];
    chords.forEach((chord, step) => {
      setTimeout(() => {
        if (this.muted || !this.ctx) return;
        chord.forEach(freq => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const t = this.ctx.currentTime;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.15, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.45);
        });
      }, step * 180);
    });
  }

  // Cheerful, non-intrusive procedural ambient melody loop
  startBGM() {
    if (this.muted || this.bgmPlaying || !this.ctx) return;
    this.bgmPlaying = true;
    const melody = [523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 659.25];
    let noteIdx = 0;

    this.bgmTimer = setInterval(() => {
      if (this.muted || !this.bgmPlaying || !this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(melody[noteIdx], t);

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.35);

      noteIdx = (noteIdx + 1) % melody.length;
    }, 450);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

// ==================== 2. PARTICLE & SPARKLE CANVAS FX ====================
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop();
  }

  resize() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  burst(x, y, count = 15, isConfetti = false) {
    const colors = isConfetti 
      ? ['#ff4081', '#ffd166', '#00f3ff', '#ff70a6', '#9c27b0', '#ffffff']
      : ['#ffd166', '#ff80ab', '#ffffff', '#fff0f5'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = isConfetti ? (Math.random() * 8 + 3) : (Math.random() * 4 + 1.5);
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (isConfetti ? 3 : 0),
        size: isConfetti ? (Math.random() * 6 + 4) : (Math.random() * 4 + 2),
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: isConfetti ? (Math.random() * 0.015 + 0.01) : (Math.random() * 0.03 + 0.02),
        isConfetti: isConfetti,
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 10
      });
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.isConfetti) {
        p.vy += 0.25; // gravity
        p.rotation += p.spin;
      }
      p.life -= p.decay;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;

      if (p.isConfetti) {
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      } else {
        // Draw 4-point star sparkle
        this.ctx.translate(p.x, p.y);
        this.ctx.beginPath();
        for (let j = 0; j < 4; j++) {
          this.ctx.lineTo(Math.cos(j * Math.PI / 2) * p.size, Math.sin(j * Math.PI / 2) * p.size);
          this.ctx.lineTo(Math.cos(j * Math.PI / 2 + Math.PI / 4) * (p.size * 0.3), Math.sin(j * Math.PI / 2 + Math.PI / 4) * (p.size * 0.3));
        }
        this.ctx.closePath();
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}

// ==================== 3. WARDROBE SVG ASSETS DEFINITION ====================
const WARDROBE_DATA = {
  hair: [
    {
      id: 'hair-blonde-buns',
      name: 'Princess Buns',
      color: '#fbd160',
      backSvg: `<circle cx="75" cy="80" r="24" fill="#fbd160" /><circle cx="165" cy="80" r="24" fill="#fbd160" />`,
      frontSvg: `<path d="M 82 85 Q 120 40 158 85 Q 140 60 120 62 Q 100 60 82 85 Z" fill="#fbd160" />`
    },
    {
      id: 'hair-pink-glam',
      name: 'Pink Waves',
      color: '#ff66aa',
      backSvg: `<path d="M 70 90 Q 50 180 80 230 Q 95 180 90 120 Z" fill="#ff66aa" /><path d="M 170 90 Q 190 180 160 230 Q 145 180 150 120 Z" fill="#ff66aa" />`,
      frontSvg: `<path d="M 80 85 Q 120 50 160 85 Q 145 65 120 66 Q 95 65 80 85 Z" fill="#ff66aa" />`
    },
    {
      id: 'hair-brunette-pony',
      name: 'High Ponytail',
      color: '#5c3a21',
      backSvg: `<path d="M 140 70 Q 210 80 195 190 Q 170 180 150 100 Z" fill="#5c3a21" />`,
      frontSvg: `<path d="M 84 88 Q 120 45 156 88 Q 135 65 120 65 Q 105 65 84 88 Z" fill="#5c3a21" /><circle cx="145" cy="75" r="8" fill="#ff4081" />`
    },
    {
      id: 'hair-lavender-bob',
      name: 'Lavender Bob',
      color: '#ba68c8',
      backSvg: `<path d="M 75 90 Q 65 160 85 170 L 155 170 Q 175 160 165 90 Z" fill="#ba68c8" />`,
      frontSvg: `<path d="M 82 85 Q 120 52 158 85 Q 140 68 120 68 Q 100 68 82 85 Z" fill="#ba68c8" />`
    }
  ],
  outfits: [
    {
      id: 'outfit-ballgown',
      name: 'Sparkle Gown',
      color: '#ff4081',
      svg: `
        <!-- Bodice -->
        <path d="M 102 155 L 138 155 L 132 195 L 108 195 Z" fill="#ff4081" />
        <!-- Sweetheart collar -->
        <path d="M 102 155 Q 110 148 120 155 Q 130 148 138 155 Z" fill="#ffd166" />
        <!-- Big Sparkle Skirt -->
        <path d="M 108 195 Q 60 250 65 315 L 175 315 Q 180 250 132 195 Z" fill="#ff80ab" />
        <path d="M 90 220 Q 120 280 150 220" stroke="#fff" stroke-width="2" fill="none" opacity="0.6" />
        <circle cx="120" cy="250" r="4" fill="#ffd166" />
      `
    },
    {
      id: 'outfit-denim-pop',
      name: 'Star Casual',
      color: '#42a5f5',
      svg: `
        <!-- Crop top -->
        <rect x="104" y="152" width="32" height="26" fill="#ffd166" rx="4" />
        <text x="114" y="170" font-size="12">⭐</text>
        <!-- Denim Skirt -->
        <path d="M 102 184 L 138 184 L 144 235 L 96 235 Z" fill="#1e88e5" />
        <line x1="120" y1="184" x2="120" y2="235" stroke="#90caf9" stroke-width="2" />
      `
    },
    {
      id: 'outfit-party-romper',
      name: 'Disco Romper',
      color: '#ab47bc',
      svg: `
        <!-- Romper -->
        <path d="M 104 150 L 136 150 L 140 215 L 120 230 L 100 215 Z" fill="#ab47bc" />
        <line x1="104" y1="150" x2="114" y2="135" stroke="#ffd166" stroke-width="3" />
        <line x1="136" y1="150" x2="126" y2="135" stroke="#ffd166" stroke-width="3" />
        <circle cx="120" cy="180" r="6" fill="#ffd166" />
      `
    },
    {
      id: 'outfit-rainbow-dress',
      name: 'Candy Rainbow',
      color: '#ff70a6',
      svg: `
        <rect x="104" y="152" width="32" height="32" fill="#ff4081" rx="2" />
        <path d="M 104 184 L 80 280 L 160 280 L 136 184 Z" fill="#ffee58" />
        <path d="M 85 240 L 155 240 L 160 280 L 80 280 Z" fill="#26c6da" />
        <path d="M 90 260 L 150 260 L 160 280 L 80 280 Z" fill="#ab47bc" />
      `
    }
  ],
  shoes: [
    {
      id: 'shoes-pink-heels',
      name: 'Glam Heels',
      svg: `<path d="M 96 332 L 114 332 L 115 348 L 106 348 L 105 340 L 96 340 Z" fill="#ff4081" /><path d="M 126 332 L 144 332 L 145 348 L 136 348 L 135 340 L 126 340 Z" fill="#ff4081" />`
    },
    {
      id: 'shoes-gold-sneakers',
      name: 'Star Kicks',
      svg: `<rect x="94" y="334" width="22" height="15" rx="6" fill="#ffd166" /><rect x="124" y="334" width="22" height="15" rx="6" fill="#ffd166" />`
    },
    {
      id: 'shoes-purple-boots',
      name: 'Chic Boots',
      svg: `<rect x="94" y="315" width="20" height="34" rx="4" fill="#8e24aa" /><rect x="126" y="315" width="20" height="34" rx="4" fill="#8e24aa" />`
    }
  ],
  accessories: [
    {
      id: 'acc-tiara',
      name: 'Diamond Tiara',
      svg: `<path d="M 105 60 L 112 48 L 120 56 L 128 48 L 135 60 Z" fill="#ffd166" stroke="#fff" stroke-width="1.5" /><circle cx="120" cy="52" r="2.5" fill="#00e5ff" />`
    },
    {
      id: 'acc-heart-glasses',
      name: 'Heart Shades',
      svg: `<path d="M 100 88 C 96 82, 88 84, 88 90 C 88 96, 100 102, 100 102 C 100 102, 112 96, 112 90 C 112 84, 104 82, 100 88 Z" fill="#ff4081" opacity="0.85" /><path d="M 140 88 C 136 82, 128 84, 128 90 C 128 96, 140 102, 140 102 C 140 102, 152 96, 152 90 C 152 84, 144 82, 140 88 Z" fill="#ff4081" opacity="0.85" /><line x1="112" y1="90" x2="128" y2="90" stroke="#ff4081" stroke-width="3" />`
    },
    {
      id: 'acc-bow',
      name: 'Pink Bow',
      svg: `<path d="M 120 64 L 105 52 L 105 76 Z" fill="#ff4081" /><path d="M 120 64 L 135 52 L 135 76 Z" fill="#ff4081" /><circle cx="120" cy="64" r="5" fill="#ffd166" />`
    },
    {
      id: 'acc-handbag',
      name: 'Chic Purse',
      svg: `<path d="M 70 200 Q 60 180 72 170 Q 82 170 80 200" stroke="#ffd166" stroke-width="3" fill="none" /><rect x="60" y="200" width="28" height="24" rx="5" fill="#ff4081" /><circle cx="74" cy="210" r="3" fill="#ffd166" />`
    }
  ]
};

// ==================== 4. MAIN GAME ENGINE ====================
class GlamDollGame {
  constructor() {
    this.sound = new SoundManager();
    this.fx = new ParticleSystem(document.getElementById('fxCanvas'));

    // Doll Customization & Cooking State (5 Recipes)
    this.state = {
      currentStage: 0,
      dishes: {
        cake: { stacked: false, frosted: false, candles: false, completed: false },
        cupcake: { poured: false, baked: false, frosted: false, completed: false },
        meatballs: { dropped: false, stirred: false, sauced: false, completed: false },
        pizzapasta: { sauced: false, baked: false, pastaAdded: false, completed: false },
        fastfood: { fried: false, served: false, salted: false, completed: false }
      },
      makeup: {
        blush: 'transparent',
        eyeshadow: 'transparent',
        lipstick: '#ff7aa2',
        clean: false
      },
      wardrobe: {
        hair: WARDROBE_DATA.hair[0],
        outfit: WARDROBE_DATA.outfits[0],
        shoes: WARDROBE_DATA.shoes[0],
        accessories: WARDROBE_DATA.accessories[0]
      },
      photoTheme: 'bg-glam'
    };

    this.initDOM();
    this.bindEvents();
    this.renderWardrobe('hair');
    this.updateDollAvatar();
  }

  initDOM() {
    this.screens = {
      0: document.getElementById('screen-title'),
      1: document.getElementById('screen-kitchen'),
      2: document.getElementById('screen-vanity'),
      3: document.getElementById('screen-dressup'),
      4: document.getElementById('screen-photobooth')
    };
    this.stepDots = document.querySelectorAll('.step-dot');
  }

  bindEvents() {
    // Sound & User Interaction unlock
    const userUnlock = () => {
      this.sound.init();
      this.sound.startBGM();
      window.removeEventListener('pointerdown', userUnlock);
    };
    window.addEventListener('pointerdown', userUnlock);

    // Mute button
    document.getElementById('soundBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      const isMuted = this.sound.toggleMute();
      document.getElementById('soundBtn').textContent = isMuted ? '🔇' : '🔊';
      this.fx.burst(e.clientX, e.clientY, 8);
    });

    // Home button (restart to stage 0)
    document.getElementById('homeBtn').addEventListener('click', () => {
      this.sound.playPop();
      this.goToStage(0);
    });

    // Title Start Button
    document.getElementById('startPlayBtn').addEventListener('click', (e) => {
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25, true);
      this.goToStage(1);
    });

    // ================= STAGE 1: KITCHEN (5 GOURMET DISHES) =================
    const checkAnyDishCompleted = () => {
      const d = this.state.dishes;
      const anyDone = d.cake.completed || d.cupcake.completed || d.meatballs.completed || d.pizzapasta.completed || d.fastfood.completed;
      if (anyDone) {
        document.getElementById('nextToVanityBtn').classList.remove('hidden');
      }
    };

    // Recipe Switcher Tabs
    const recipeTabs = document.querySelectorAll('.recipe-tab');
    recipeTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        recipeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const dish = tab.dataset.dish;
        document.querySelectorAll('.dish-station').forEach(station => station.classList.add('hidden'));
        const targetStation = document.getElementById(`station-${dish}`);
        if (targetStation) targetStation.classList.remove('hidden');
        this.sound.playPop();
        this.fx.burst(e.clientX, e.clientY, 10);
      });
    });

    // ---------- DISH 1: CELEBRATION CAKE ----------
    const cakeBottom = document.getElementById('cake-tier-bottom');
    const cakeTop = document.getElementById('cake-tier-top');
    const cakeCandles = document.getElementById('cake-candles-layer');
    const cakeInstruction = document.getElementById('cake-instruction');
    const cakeSpongeTool = document.getElementById('cakeSpongeTool');
    const cakeFrostingTool = document.getElementById('cakeFrostingTool');
    const cakeCandlesTool = document.getElementById('cakeCandlesTool');
    const cakeToppingsShelf = document.getElementById('cake-toppings-shelf');
    const cakeToppingsLayer = document.getElementById('cake-toppings-layer');

    cakeSpongeTool.addEventListener('click', (e) => {
      if (this.state.dishes.cake.stacked) return;
      this.sound.playPop();
      this.fx.burst(e.clientX, e.clientY, 15);
      cakeBottom.classList.remove('hidden');
      cakeTop.classList.remove('hidden');
      this.state.dishes.cake.stacked = true;
      cakeSpongeTool.disabled = true;
      cakeFrostingTool.disabled = false;
      cakeFrostingTool.classList.add('active-tool');
      cakeInstruction.textContent = '2. Tap Frosting to glaze the cake! 🍦';
    });

    cakeFrostingTool.addEventListener('click', (e) => {
      if (!this.state.dishes.cake.stacked || this.state.dishes.cake.frosted) return;
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 20);
      cakeBottom.classList.add('frosted');
      cakeTop.classList.add('frosted');
      this.state.dishes.cake.frosted = true;
      cakeFrostingTool.disabled = true;
      cakeCandlesTool.disabled = false;
      cakeCandlesTool.classList.add('active-tool');
      cakeInstruction.textContent = '3. Tap Candles to light the celebration! 🕯️';
    });

    cakeCandlesTool.addEventListener('click', (e) => {
      if (!this.state.dishes.cake.frosted || this.state.dishes.cake.candles) return;
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25, true);
      cakeCandles.classList.remove('hidden');
      this.state.dishes.cake.candles = true;
      this.state.dishes.cake.completed = true;
      cakeCandlesTool.disabled = true;
      cakeInstruction.textContent = '4. Add sweet strawberries & candy stars! 🍓';
      cakeToppingsShelf.classList.remove('hidden');
      document.getElementById('tray-slot-cake').classList.add('completed');
      checkAnyDishCompleted();
    });

    document.querySelectorAll('.cake-top-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.sound.playPop();
        this.fx.burst(e.clientX, e.clientY, 10);
        const item = btn.dataset.item;
        const icon = document.createElement('span');
        if (item === 'strawberry') icon.textContent = '🍓';
        if (item === 'star') icon.textContent = '⭐';
        if (item === 'cherry') icon.textContent = '🍒';
        if (item === 'sprinkles') icon.textContent = '✨';
        cakeToppingsLayer.appendChild(icon);
      });
    });

    // ---------- DISH 2: GLAM CUPCAKE ----------
    const cupcakeTarget = document.getElementById('cupcake-baking-target');
    const cupcakeInstruction = document.getElementById('cupcake-instruction');
    const cupcakeBatterTool = document.getElementById('cupcakeBatterTool');
    const cupcakeBakeTool = document.getElementById('cupcakeBakeTool');
    const cupcakeFrostingTool = document.getElementById('cupcakeFrostingTool');
    const cupcakeToppingsShelf = document.getElementById('cupcake-toppings-shelf');
    const ovenHeat = document.getElementById('oven-glow-heat');

    cupcakeBatterTool.addEventListener('click', (e) => {
      if (this.state.dishes.cupcake.poured) return;
      this.sound.playPop();
      this.fx.burst(e.clientX, e.clientY, 15);
      cupcakeTarget.classList.add('state-poured');
      this.state.dishes.cupcake.poured = true;
      cupcakeBatterTool.disabled = true;
      cupcakeBakeTool.disabled = false;
      cupcakeBakeTool.classList.add('active-tool');
      cupcakeInstruction.textContent = '2. Tap Bake to heat the oven! 🔥';
    });

    cupcakeBakeTool.addEventListener('click', (e) => {
      if (!this.state.dishes.cupcake.poured || this.state.dishes.cupcake.baked) return;
      cupcakeBakeTool.disabled = true;
      ovenHeat.classList.remove('hidden');
      this.sound.playSizzle();
      this.fx.burst(e.clientX, e.clientY, 20);
      cupcakeInstruction.textContent = 'Baking in the oven... ♨️';

      setTimeout(() => {
        ovenHeat.classList.add('hidden');
        cupcakeTarget.classList.remove('state-poured');
        cupcakeTarget.classList.add('state-baked');
        this.state.dishes.cupcake.baked = true;
        this.sound.playDing();
        this.sound.playSparkle();
        cupcakeInstruction.textContent = '3. Freshly baked! Tap Frost! 🧁';
        cupcakeFrostingTool.disabled = false;
        cupcakeFrostingTool.classList.add('active-tool');
      }, 1200);
    });

    cupcakeFrostingTool.addEventListener('click', (e) => {
      if (!this.state.dishes.cupcake.baked || this.state.dishes.cupcake.frosted) return;
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25);
      document.getElementById('cupcake-frosting').classList.remove('hidden');
      this.state.dishes.cupcake.frosted = true;
      this.state.dishes.cupcake.completed = true;
      cupcakeFrostingTool.disabled = true;
      cupcakeInstruction.textContent = '4. Add gorgeous cupcake toppings! 🍒';
      cupcakeToppingsShelf.classList.remove('hidden');
      document.getElementById('tray-slot-cupcake').classList.add('completed');
      checkAnyDishCompleted();
    });

    document.querySelectorAll('.cupcake-top-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.sound.playPop();
        this.fx.burst(e.clientX, e.clientY, 12);
        const item = btn.dataset.item;
        const icon = document.createElement('span');
        icon.style.margin = '0 2px';
        if (item === 'cherry') icon.textContent = '🍒';
        if (item === 'star') icon.textContent = '⭐';
        if (item === 'choc') icon.textContent = '🍫';
        if (item === 'sparkle') icon.textContent = '✨';
        document.getElementById('cupcake-toppings').appendChild(icon);
      });
    });

    // ---------- DISH 3: SIZZLING MEATBALLS ----------
    const meatballGroup = document.getElementById('meatballs-pan-group');
    const marinaraSauce = document.getElementById('marinara-sauce-layer');
    const meatballGarnish = document.getElementById('meatball-garnish-layer');
    const meatballInstruction = document.getElementById('meatball-instruction');
    const meatballDropTool = document.getElementById('meatballDropTool');
    const meatballStirTool = document.getElementById('meatballStirTool');
    const meatballSauceTool = document.getElementById('meatballSauceTool');
    const meatballToppingsShelf = document.getElementById('meatball-toppings-shelf');

    meatballDropTool.addEventListener('click', (e) => {
      if (this.state.dishes.meatballs.dropped) return;
      this.sound.playPop();
      this.sound.playSizzle();
      this.fx.burst(e.clientX, e.clientY, 20);

      meatballGroup.innerHTML = `
        <div class="meatball-item"></div>
        <div class="meatball-item"></div>
        <div class="meatball-item"></div>
        <div class="meatball-item"></div>
      `;
      this.state.dishes.meatballs.dropped = true;
      meatballDropTool.disabled = true;
      meatballStirTool.disabled = false;
      meatballStirTool.classList.add('active-tool');
      meatballInstruction.textContent = '2. Tap Sizzle to brown the meatballs! 🥄';
    });

    meatballStirTool.addEventListener('click', (e) => {
      if (!this.state.dishes.meatballs.dropped || this.state.dishes.meatballs.stirred) return;
      this.sound.playSizzle();
      this.fx.burst(e.clientX, e.clientY, 20);
      document.querySelectorAll('.meatball-item').forEach(m => m.classList.add('sizzling'));
      meatballStirTool.disabled = true;
      meatballInstruction.textContent = 'Sizzling hot! ♨️';

      setTimeout(() => {
        document.querySelectorAll('.meatball-item').forEach(m => m.classList.remove('sizzling'));
        this.state.dishes.meatballs.stirred = true;
        this.sound.playSparkle();
        meatballSauceTool.disabled = false;
        meatballSauceTool.classList.add('active-tool');
        meatballInstruction.textContent = '3. Tap Sauce to pour rich marinara! 🥫';
      }, 1000);
    });

    meatballSauceTool.addEventListener('click', (e) => {
      if (!this.state.dishes.meatballs.stirred || this.state.dishes.meatballs.sauced) return;
      this.sound.playSauceSquirt();
      this.sound.playBoil();
      this.fx.burst(e.clientX, e.clientY, 25);
      marinaraSauce.classList.remove('hidden');
      this.state.dishes.meatballs.sauced = true;
      this.state.dishes.meatballs.completed = true;
      meatballSauceTool.disabled = true;
      meatballInstruction.textContent = '4. Garnish with basil, cheese & bread! 🧀';
      meatballToppingsShelf.classList.remove('hidden');
      document.getElementById('tray-slot-meatballs').classList.add('completed');
      checkAnyDishCompleted();
    });

    document.querySelectorAll('.meatball-top-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.sound.playPop();
        this.fx.burst(e.clientX, e.clientY, 10);
        const item = btn.dataset.item;
        const icon = document.createElement('span');
        icon.style.margin = '2px';
        if (item === 'basil') icon.textContent = '🌿';
        if (item === 'cheese') icon.textContent = '🧀';
        if (item === 'bread') icon.textContent = '🥖';
        meatballGarnish.appendChild(icon);
      });
    });

    // ---------- DISH 4: PIZZA AND PASTA ----------
    const pizzaSauceLayer = document.getElementById('pizza-sauce-layer');
    const pizzaCheeseLayer = document.getElementById('pizza-cheese-layer');
    const pizzaToppingsLayer = document.getElementById('pizza-toppings-layer');
    const twirledSpaghetti = document.getElementById('twirled-spaghetti');
    const pastaToppings = document.getElementById('pasta-toppings-layer');
    const pizzaInstruction = document.getElementById('pizza-instruction');
    const pizzaSauceTool = document.getElementById('pizzaSauceTool');
    const pizzaBakeTool = document.getElementById('pizzaBakeTool');
    const pastaAddTool = document.getElementById('pastaAddTool');
    const italianToppingsShelf = document.getElementById('italian-toppings-shelf');

    pizzaSauceTool.addEventListener('click', (e) => {
      if (this.state.dishes.pizzapasta.sauced) return;
      this.sound.playSauceSquirt();
      this.fx.burst(e.clientX, e.clientY, 15);
      pizzaSauceLayer.classList.remove('hidden');
      pizzaCheeseLayer.classList.remove('hidden');
      this.state.dishes.pizzapasta.sauced = true;
      pizzaSauceTool.disabled = true;
      pizzaBakeTool.disabled = false;
      pizzaBakeTool.classList.add('active-tool');
      pizzaInstruction.textContent = '2. Tap Bake to melt the mozzarella! 🔥';
    });

    pizzaBakeTool.addEventListener('click', (e) => {
      if (!this.state.dishes.pizzapasta.sauced || this.state.dishes.pizzapasta.baked) return;
      this.sound.playSizzle();
      this.fx.burst(e.clientX, e.clientY, 20);
      pizzaBakeTool.disabled = true;
      pizzaInstruction.textContent = 'Baking stone pizza... ♨️';

      setTimeout(() => {
        pizzaCheeseLayer.classList.add('baked');
        this.sound.playDing();
        this.sound.playSparkle();
        this.state.dishes.pizzapasta.baked = true;
        pastaAddTool.disabled = false;
        pastaAddTool.classList.add('active-tool');
        pizzaInstruction.textContent = '3. Tap Pasta to serve twirled spaghetti! 🍝';
      }, 1000);
    });

    pastaAddTool.addEventListener('click', (e) => {
      if (!this.state.dishes.pizzapasta.baked || this.state.dishes.pizzapasta.pastaAdded) return;
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25);
      twirledSpaghetti.classList.remove('hidden');
      this.state.dishes.pizzapasta.pastaAdded = true;
      this.state.dishes.pizzapasta.completed = true;
      pastaAddTool.disabled = true;
      pizzaInstruction.textContent = '4. Add pepperoni, mushrooms & olives! 🍕';
      italianToppingsShelf.classList.remove('hidden');
      document.getElementById('tray-slot-pizzapasta').classList.add('completed');
      checkAnyDishCompleted();
    });

    document.querySelectorAll('.italian-top-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.sound.playPop();
        this.fx.burst(e.clientX, e.clientY, 10);
        const item = btn.dataset.item;
        const icon = document.createElement('span');
        icon.style.margin = '2px';
        if (item === 'pepperoni') icon.textContent = '🍕';
        if (item === 'mushroom') icon.textContent = '🍄';
        if (item === 'olive') icon.textContent = '🫒';
        if (item === 'basil') icon.textContent = '🌿';
        pizzaToppingsLayer.appendChild(icon);
      });
    });

    // ---------- DISH 5: FRENCH FRIES & CHICKEN NUGGETS ----------
    const fryerOil = document.getElementById('fryer-oil');
    const fryerBasket = document.getElementById('fryer-basket-contents');
    const dinerFoodTray = document.getElementById('diner-food-tray');
    const dinerSauces = document.getElementById('diner-sauce-dollops');
    const fryInstruction = document.getElementById('fry-instruction');
    const fryDropTool = document.getElementById('fryDropTool');
    const fryServeTool = document.getElementById('fryServeTool');
    const frySeasonTool = document.getElementById('frySeasonTool');
    const dinerSauceShelf = document.getElementById('diner-sauce-shelf');

    fryDropTool.addEventListener('click', (e) => {
      if (this.state.dishes.fastfood.fried) return;
      this.sound.playSizzle();
      this.sound.playCrunch();
      this.fx.burst(e.clientX, e.clientY, 20);
      fryerBasket.classList.remove('hidden');
      fryerOil.classList.add('bubbling');
      fryDropTool.disabled = true;
      fryInstruction.textContent = 'Deep frying until golden crispy... ♨️';

      setTimeout(() => {
        fryerOil.classList.remove('bubbling');
        this.state.dishes.fastfood.fried = true;
        this.sound.playSparkle();
        fryServeTool.disabled = false;
        fryServeTool.classList.add('active-tool');
        fryInstruction.textContent = '2. Tap Serve to fill the diner basket! 📦';
      }, 1000);
    });

    fryServeTool.addEventListener('click', (e) => {
      if (!this.state.dishes.fastfood.fried || this.state.dishes.fastfood.served) return;
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25);
      fryerBasket.classList.add('hidden');
      dinerFoodTray.innerHTML = `
        <span>🍟</span>
        <span>🍗</span>
        <span>🍟</span>
        <span>🍗</span>
      `;
      this.state.dishes.fastfood.served = true;
      fryServeTool.disabled = true;
      frySeasonTool.disabled = false;
      frySeasonTool.classList.add('active-tool');
      fryInstruction.textContent = '3. Tap Salt to season with sparkle! 🧂';
    });

    frySeasonTool.addEventListener('click', (e) => {
      if (!this.state.dishes.fastfood.served || this.state.dishes.fastfood.salted) return;
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25, true);
      this.state.dishes.fastfood.salted = true;
      this.state.dishes.fastfood.completed = true;
      frySeasonTool.disabled = true;
      fryInstruction.textContent = '4. Dip in yummy Ketchup, Honey Dip or BBQ! 🍅';
      dinerSauceShelf.classList.remove('hidden');
      document.getElementById('tray-slot-fastfood').classList.add('completed');
      checkAnyDishCompleted();
    });

    document.querySelectorAll('.diner-sauce-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.sound.playSauceSquirt();
        this.fx.burst(e.clientX, e.clientY, 12);
        const sauce = btn.dataset.sauce;
        const dollop = document.createElement('span');
        if (sauce === 'ketchup') dollop.textContent = '🍅';
        if (sauce === 'mustard') dollop.textContent = '🍯';
        if (sauce === 'bbq') dollop.textContent = '🍫';
        dinerSauces.appendChild(dollop);
      });
    });

    // Advance from Kitchen to Vanity
    document.getElementById('nextToVanityBtn').addEventListener('click', (e) => {
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 20);
      this.goToStage(2);
    });

    // ================= STAGE 2: VANITY & MAKEUP =================
    const makeupTabs = document.querySelectorAll('.cat-tab');
    makeupTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        makeupTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.sound.playPop();
        this.renderMakeupPalette(tab.dataset.makeup);
      });
    });
    this.renderMakeupPalette('sponge');

    document.getElementById('nextToDressupBtn').addEventListener('click', (e) => {
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 20);
      this.goToStage(3);
    });

    // ================= STAGE 3: DRESS UP STUDIO =================
    const wardrobeTabs = document.querySelectorAll('.w-tab');
    wardrobeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        wardrobeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.sound.playPop();
        this.renderWardrobe(tab.dataset.wardrobe);
      });
    });

    document.getElementById('nextToPhotoBtn').addEventListener('click', (e) => {
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 20);
      this.preparePhotoBooth();
      this.goToStage(4);
    });

    // ================= STAGE 4: PHOTO BOOTH =================
    document.querySelectorAll('.bg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const theme = btn.dataset.bg;
        this.state.photoTheme = theme;
        const polaroid = document.getElementById('polaroidCard');
        polaroid.className = `polaroid-frame ${theme}`;
        this.sound.playPop();
      });
    });

    document.querySelectorAll('.add-sticker-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.sound.playSparkle();
        this.fx.burst(e.clientX, e.clientY, 10);
        const emoji = btn.dataset.emoji;
        const sticker = document.createElement('div');
        sticker.className = 'sticker-item';
        sticker.textContent = emoji;
        sticker.style.left = `${Math.random() * 70 + 10}%`;
        sticker.style.top = `${Math.random() * 65 + 10}%`;
        document.getElementById('stickersLayer').appendChild(sticker);
      });
    });

    document.getElementById('snapPhotoBtn').addEventListener('click', (e) => {
      this.sound.playCamera();
      this.fx.burst(e.clientX, e.clientY, 40, true);

      // Camera Flash animation
      const flash = document.createElement('div');
      flash.style.position = 'absolute';
      flash.style.top = '0';
      flash.style.left = '0';
      flash.style.width = '100%';
      flash.style.height = '100%';
      flash.style.backgroundColor = '#ffffff';
      flash.style.zIndex = '999';
      flash.style.transition = 'opacity 0.5s ease-out';
      document.getElementById('game-container').appendChild(flash);

      setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 500);
        this.showCelebrationModal();
      }, 100);
    });

    document.getElementById('playAgainBtn').addEventListener('click', () => {
      document.getElementById('resultModal').classList.add('hidden');
      this.sound.playSparkle();
      this.goToStage(0);
    });

    // YouTube Playables Compliance: Auto-pause on tab blur / visibilitychange
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.sound.stopBGM();
      } else if (!this.sound.muted) {
        this.sound.startBGM();
      }
    });
  }

  goToStage(stageNumber) {
    this.state.currentStage = stageNumber;
    Object.keys(this.screens).forEach(key => {
      this.screens[key].classList.toggle('active', parseInt(key) === stageNumber);
    });

    this.stepDots.forEach(dot => {
      const step = parseInt(dot.dataset.step);
      dot.classList.toggle('active', step === stageNumber - 1);
    });
  }

  // ================= MAKEUP PALETTES =================
  renderMakeupPalette(category) {
    const container = document.getElementById('palette-options');
    container.innerHTML = '';

    if (category === 'sponge') {
      const cleanBtn = document.createElement('button');
      cleanBtn.className = 'big-pink-btn';
      cleanBtn.style.padding = '8px 20px';
      cleanBtn.style.fontSize = '14px';
      cleanBtn.textContent = '✨ Sparkle Clean Face!';
      cleanBtn.addEventListener('click', (e) => {
        this.sound.playSparkle();
        this.fx.burst(e.clientX, e.clientY, 20);
        document.getElementById('svg-eyeshadow-left').setAttribute('fill', 'transparent');
        document.getElementById('svg-eyeshadow-right').setAttribute('fill', 'transparent');
        document.getElementById('svg-blush-left').setAttribute('fill', 'transparent');
        document.getElementById('svg-blush-right').setAttribute('fill', 'transparent');
        document.getElementById('face-glitter-star').classList.add('hidden');
      });
      container.appendChild(cleanBtn);
    } else if (category === 'eyeshadow') {
      const colors = ['#00f3ff', '#ff007f', '#ffd166', '#ba68c8'];
      colors.forEach(col => {
        const btn = document.createElement('button');
        btn.className = 'swatch-btn';
        btn.style.backgroundColor = col;
        btn.addEventListener('click', (e) => {
          this.sound.playSparkle();
          this.fx.burst(e.clientX, e.clientY, 15);
          document.getElementById('svg-eyeshadow-left').setAttribute('fill', col);
          document.getElementById('svg-eyeshadow-right').setAttribute('fill', col);
          document.getElementById('face-glitter-star').classList.remove('hidden');
        });
        container.appendChild(btn);
      });
    } else if (category === 'blush') {
      const blushes = ['#ff4081', '#ff80ab', '#ff7043', '#e91e63'];
      blushes.forEach(col => {
        const btn = document.createElement('button');
        btn.className = 'swatch-btn';
        btn.style.backgroundColor = col;
        btn.addEventListener('click', (e) => {
          this.sound.playPop();
          this.fx.burst(e.clientX, e.clientY, 15);
          document.getElementById('svg-blush-left').setAttribute('fill', col);
          document.getElementById('svg-blush-right').setAttribute('fill', col);
          document.getElementById('mini-blush-l').setAttribute('fill', col);
          document.getElementById('mini-blush-r').setAttribute('fill', col);
        });
        container.appendChild(btn);
      });
    } else if (category === 'lipstick') {
      const lips = ['#ff1744', '#f50057', '#d500f9', '#ff9100'];
      lips.forEach(col => {
        const btn = document.createElement('button');
        btn.className = 'swatch-btn';
        btn.style.backgroundColor = col;
        btn.addEventListener('click', (e) => {
          this.sound.playPop();
          this.fx.burst(e.clientX, e.clientY, 15);
          document.getElementById('svg-lips').setAttribute('fill', col);
          document.getElementById('mini-lip-path').setAttribute('fill', col);
        });
        container.appendChild(btn);
      });
    }
  }

  // ================= WARDROBE SELECTION =================
  renderWardrobe(category) {
    const grid = document.getElementById('wardrobe-items-grid');
    grid.innerHTML = '';
    const items = WARDROBE_DATA[category];

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = `wardrobe-item-card ${this.state.wardrobe[category]?.id === item.id ? 'equipped' : ''}`;
      
      let previewSvg = '';
      if (category === 'hair') {
        previewSvg = `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="${item.color}" /></svg>`;
      } else if (category === 'outfits') {
        previewSvg = `<svg viewBox="0 0 150 150">${item.svg}</svg>`;
      } else {
        previewSvg = `<svg viewBox="0 0 150 150">${item.svg}</svg>`;
      }

      card.innerHTML = `${previewSvg}<span style="font-size: 10px; font-weight: bold; margin-top: 4px;">${item.name}</span>`;
      
      card.addEventListener('click', (e) => {
        this.sound.playSparkle();
        this.fx.burst(e.clientX, e.clientY, 18);
        this.state.wardrobe[category] = item;
        this.updateDollAvatar();
        this.renderWardrobe(category);
      });

      grid.appendChild(card);
    });
  }

  updateDollAvatar() {
    const w = this.state.wardrobe;
    document.getElementById('slot-back-hair').innerHTML = w.hair ? w.hair.backSvg : '';
    document.getElementById('slot-front-hair').innerHTML = w.hair ? w.hair.frontSvg : '';
    document.getElementById('slot-outfit').innerHTML = w.outfit ? w.outfit.svg : '';
    document.getElementById('slot-shoes').innerHTML = w.shoes ? w.shoes.svg : '';
    document.getElementById('slot-accessories').innerHTML = w.accessories ? w.accessories.svg : '';
  }

  preparePhotoBooth() {
    const clone = document.getElementById('mainDollAvatar').innerHTML;
    document.getElementById('photoDollClone').innerHTML = clone;
    document.getElementById('stickersLayer').innerHTML = '';
  }

  showCelebrationModal() {
    this.sound.playFanfare();
    const modal = document.getElementById('resultModal');
    const preview = document.getElementById('finalSnapshotPreview');
    preview.innerHTML = document.getElementById('photoDollClone').innerHTML;
    modal.classList.remove('hidden');

    // Confetti storm
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        this.fx.burst(window.innerWidth / 2, window.innerHeight / 2 - 50, 25, true);
      }, i * 200);
    }
  }
}

// Start game on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  new GlamDollGame();
});
