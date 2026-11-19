/**
 * GLAM DOLL: LIFESTYLE & BEAUTY SIMULATION ENGINE
 * High-Definition Aesthetic Chibi Fashion Doll & Snap-Fit Hairstyles
 * Zero gaps, seamless hairline mesh alignment, 21 Hairstyles, 21 Outfits, 20 Shoes, 20 Accessories, 20 Lipsticks
 */

// ==================== 1. PROCEDURAL SOUND ENGINE (WEB AUDIO API) ====================
class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgmTimer = null;
    this.bgmPlaying = false;
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

  playPop() {
    if (this.muted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(850, t + 0.08);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  playSparkle() {
    if (this.muted || !this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
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
      }, i * 40);
    });
  }

  playHairdryer() {
    if (this.muted || !this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.7;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.7);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(t);
    noise.stop(t + 0.7);
  }

  playBrush() {
    if (this.muted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.linearRampToValueAtTime(600, t + 0.15);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  playWaterSplash() {
    if (this.muted || !this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.6;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(t);
    noise.stop(t + 0.5);
  }

  playMaskPeel() {
    if (this.muted || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.2);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.2);
  }

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

  playSizzle() {
    if (this.muted || !this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1400;
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(t);
    noise.stop(t + 0.6);
  }

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
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.06);
      }, i * 60);
    }
  }

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

  playFanfare() {
    if (this.muted || !this.ctx) return;
    const chords = [
      [523.25, 659.25, 783.99],
      [587.33, 739.99, 880.00],
      [659.25, 830.61, 987.77],
      [1046.50, 1318.51, 1567.98]
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
          gain.gain.setValueAtTime(0.14, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.4);
        });
      }, step * 160);
    });
  }

  startBGM() {
    if (this.muted || this.bgmPlaying || !this.ctx) return;
    this.bgmPlaying = true;
    const notes = [523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 659.25];
    let idx = 0;
    this.bgmTimer = setInterval(() => {
      if (this.muted || !this.bgmPlaying || !this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(notes[idx], t);
      gain.gain.setValueAtTime(0.035, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.35);
      idx = (idx + 1) % notes.length;
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
      ? ['#ff3385', '#ffd166', '#00f3ff', '#ba68c8', '#ffffff', '#ff80ab']
      : ['#ffd166', '#ff80ab', '#ffffff', '#e1bee7'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = isConfetti ? (Math.random() * 7 + 2.5) : (Math.random() * 3.5 + 1.2);
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (isConfetti ? 2.5 : 0),
        size: isConfetti ? (Math.random() * 6 + 3) : (Math.random() * 3.5 + 1.5),
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: isConfetti ? (Math.random() * 0.015 + 0.01) : (Math.random() * 0.03 + 0.02),
        isConfetti: isConfetti,
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 8
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
        p.vy += 0.2;
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
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      } else {
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

// ==================== 3. COMPREHENSIVE ASSET LIBRARIES ====================

// 8 Trendy Hair Dye Colors
const HAIR_COLORS = [
  { id: 'c-blonde', name: 'Platinum Blonde', hex: '#fde047' },
  { id: 'c-pink', name: 'Pastel Bubblegum', hex: '#f472b6' },
  { id: 'c-black', name: 'Obsidian Black', hex: '#1e1b24' },
  { id: 'c-caramel', name: 'Warm Caramel', hex: '#b45309' },
  { id: 'c-lavender', name: 'Idol Lavender', hex: '#c084fc' },
  { id: 'c-mint', name: 'Mint Aqua', hex: '#2dd4bf' },
  { id: 'c-cherry', name: 'Ruby Cherry', hex: '#e11d48' },
  { id: 'c-iceblue', name: 'Frost Ice Blue', hex: '#38bdf8' }
];

// Helper to create glossy shine highlights across the hair crown
const hairSheen = () => `
  <path d="M 88 56 Q 120 46 152 56" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.35" />
`;

// 21 DISTINCT HAIRSTYLES (FEATURING K-POP TRENDS & CLASSIC HAIRSTYLES)
// All styles engineered to snap seamlessly to head mesh (Center: 120, 92; Skull top: 48; Forehead: 74-85)
const HAIRSTYLES_DATA = [
  {
    id: 'hair-wolf-cut',
    name: 'K-Pop Wolf Cut',
    category: 'kpop',
    back: (c) => `
      <path d="M 62 82 Q 28 150 46 255 Q 82 205 86 138 L 154 138 Q 158 205 194 255 Q 212 150 178 82 Z" fill="${c}" />
      <path d="M 50 150 Q 70 210 84 240 L 76 250 Q 56 210 40 160 Z" fill="#000" opacity="0.12" />
      <path d="M 190 150 Q 170 210 156 240 L 164 250 Q 184 210 200 160 Z" fill="#000" opacity="0.12" />
    `,
    front: (c) => `
      <!-- Solid Crown Cap & Voluminous Shaggy Layers -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 164 125 152 142 Q 146 102 138 86 Q 120 80 102 86 Q 94 102 88 142 Q 76 125 72 88 Z" fill="${c}" />
      <!-- Layered Feather Bangs (Graze Eyebrows, Zero Gap) -->
      <path d="M 96 82 Q 106 68 120 82 Q 110 76 96 82 Z" fill="${c}" />
      <path d="M 120 82 Q 134 68 144 82 Q 130 76 120 82 Z" fill="${c}" />
      <path d="M 108 82 L 120 89 L 132 82 Z" fill="${c}" />
      <!-- Sidelock flick accents -->
      <path d="M 82 108 Q 72 125 80 138 Q 84 122 88 114 Z" fill="${c}" />
      <path d="M 158 108 Q 168 125 160 138 Q 156 122 152 114 Z" fill="${c}" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-hime-cut',
    name: 'K-Pop Hime Cut',
    category: 'kpop',
    back: (c) => `
      <path d="M 64 80 L 60 280 L 180 280 L 176 80 Z" fill="${c}" />
      <path d="M 74 120 L 70 280 L 80 280 L 82 120 Z" fill="#000" opacity="0.1" />
      <path d="M 166 120 L 170 280 L 160 280 L 158 120 Z" fill="#000" opacity="0.1" />
    `,
    front: (c) => `
      <!-- Solid Scalp Crown & Full Blunt Bangs -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 L 168 85 L 72 85 Z" fill="${c}" />
      <path d="M 72 82 L 168 82 L 168 87 Q 120 89 72 87 Z" fill="${c}" />
      <!-- Sleek Straight Sidelocks (Classic Hime Step) -->
      <path d="M 70 82 L 88 82 L 88 140 L 70 140 Z" fill="${c}" />
      <path d="M 152 82 L 170 82 L 170 140 L 152 140 Z" fill="${c}" />
      <line x1="88" y1="84" x2="88" y2="138" stroke="#fff" stroke-width="1.2" opacity="0.3" />
      <line x1="152" y1="84" x2="152" y2="138" stroke="#000" stroke-width="1.2" opacity="0.15" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-skunk-stripes',
    name: 'Idol Skunk Stripes',
    category: 'kpop',
    back: (c) => `
      <path d="M 66 80 Q 45 165 58 260 L 182 260 Q 195 165 174 80 Z" fill="${c}" />
      <path d="M 66 80 Q 52 165 64 260 L 76 260 Q 64 165 74 80 Z" fill="#ffffff" />
      <path d="M 174 80 Q 188 165 176 260 L 164 260 Q 176 165 166 80 Z" fill="#ffffff" />
    `,
    front: (c) => `
      <!-- Base Color Solid Scalp Cap -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 164 120 156 142 Q 146 110 142 86 Q 120 76 98 86 Q 94 110 84 142 Q 76 120 72 88 Z" fill="${c}" />
      <!-- Platinum Front Strands Running From Crown To Framing Cheeks -->
      <path d="M 94 48 Q 86 78 80 148 L 92 148 Q 96 110 102 78 Z" fill="#ffffff" />
      <path d="M 146 48 Q 154 78 160 148 L 148 148 Q 144 110 138 78 Z" fill="#ffffff" />
      <!-- Center Wispy Bangs -->
      <path d="M 102 82 Q 120 76 138 82 L 135 87 Q 120 83 105 87 Z" fill="${c}" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-curtain-waves',
    name: 'Curtain Waves',
    category: 'long',
    back: (c) => `
      <path d="M 60 82 Q 32 170 62 280 Q 95 215 90 138 L 150 138 Q 145 215 178 280 Q 208 170 180 82 Z" fill="${c}" />
    `,
    front: (c) => `
      <!-- Solid Crown Cap & Parted Curtain Bangs -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 164 125 156 152 Q 146 120 140 88 Q 120 74 100 88 Q 94 120 84 152 Q 76 125 72 88 Z" fill="${c}" />
      <path d="M 98 85 Q 108 72 120 86 Q 112 78 98 85 Z" fill="${c}" />
      <path d="M 120 86 Q 132 72 142 85 Q 128 78 120 86 Z" fill="${c}" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-sleek-bun',
    name: 'Clean Girl Sleek Bun',
    category: 'updo',
    back: (c) => `
      <!-- High Sculpted Topknot Bun -->
      <circle cx="120" cy="26" r="23" fill="${c}" />
      <circle cx="120" cy="26" r="24" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.5" />
      <circle cx="120" cy="38" r="6" fill="#ffd166" />
    `,
    front: (c) => `
      <!-- Seamless Slicked Crown Cap -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 120 76 72 88 Z" fill="${c}" />
      <!-- Soft Delicate Wispy Tendrils Framing Face -->
      <path d="M 80 86 Q 78 120 84 142" stroke="${c}" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <path d="M 160 86 Q 162 120 156 142" stroke="${c}" stroke-width="2.5" stroke-linecap="round" fill="none" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-space-buns',
    name: 'Y2K Space Buns',
    category: 'updo',
    back: (c) => `
      <!-- Left & Right High Puffed Buns -->
      <circle cx="64" cy="32" r="23" fill="${c}" />
      <circle cx="176" cy="32" r="23" fill="${c}" />
      <circle cx="64" cy="32" r="6" fill="#ff4081" />
      <circle cx="176" cy="32" r="6" fill="#ff4081" />
      <circle cx="64" cy="32" r="23" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.4" />
      <circle cx="176" cy="32" r="23" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.4" />
    `,
    front: (c) => `
      <!-- Solid Crown Cap with Center Part & Cute Face-Framing Tendrils -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 162 120 156 142 Q 148 110 144 86 Q 120 75 96 86 Q 92 110 84 142 Q 78 120 72 88 Z" fill="${c}" />
      <line x1="120" y1="36" x2="120" y2="75" stroke="#ffffff" stroke-width="1.5" opacity="0.45" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-bubble-ponies',
    name: 'Idol Bubble Ponies',
    category: 'kpop',
    back: (c) => `
      <!-- Left Bubble Segments -->
      <circle cx="54" cy="102" r="15" fill="${c}" />
      <circle cx="50" cy="132" r="14" fill="${c}" />
      <circle cx="46" cy="162" r="12" fill="${c}" />
      <!-- Right Bubble Segments -->
      <circle cx="186" cy="102" r="15" fill="${c}" />
      <circle cx="190" cy="132" r="14" fill="${c}" />
      <circle cx="194" cy="162" r="12" fill="${c}" />
      <!-- Elastic Hair Bands -->
      <circle cx="52" cy="117" r="4.5" fill="#ff3385" /><circle cx="48" cy="147" r="4.5" fill="#ff3385" />
      <circle cx="188" cy="117" r="4.5" fill="#ff3385" /><circle cx="192" cy="147" r="4.5" fill="#ff3385" />
    `,
    front: (c) => `
      <!-- Solid Crown Cap & Side Puffs -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 160 115 152 135 Q 145 98 140 85 Q 120 76 100 85 Q 95 98 88 135 Q 80 115 72 88 Z" fill="${c}" />
      <!-- Ribbon Clips at Hair Ties -->
      <circle cx="68" cy="80" r="5" fill="#ffd166" /><circle cx="172" cy="80" r="5" fill="#ffd166" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-anime-twintails',
    name: 'Anime Pigtails',
    category: 'long',
    back: (c) => `
      <!-- Voluminous Swishing High Twintails -->
      <path d="M 62 78 Q 15 160 38 280 Q 72 210 78 122 Z" fill="${c}" />
      <path d="M 178 78 Q 225 160 202 280 Q 168 210 162 122 Z" fill="${c}" />
      <circle cx="66" cy="78" r="8" fill="#ff4081" /><circle cx="174" cy="78" r="8" fill="#ff4081" />
    `,
    front: (c) => `
      <!-- Solid Crown Cap & Iconic Anime Jagged Bangs -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 L 168 84 Q 148 78 120 83 Q 92 78 72 84 Z" fill="${c}" />
      <polygon points="88,82 98,89 94,80" fill="${c}" />
      <polygon points="116,83 122,91 126,82" fill="${c}" />
      <polygon points="144,82 136,89 140,80" fill="${c}" />
      <polygon points="102,83 108,88 112,82" fill="${c}" />
      <polygon points="128,82 134,88 138,82" fill="${c}" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-mermaid-waves',
    name: 'Mermaid Waves',
    category: 'long',
    back: (c) => `
      <!-- Cascading Waist-Length Siren Waves -->
      <path d="M 56 80 Q 15 200 52 330 L 188 330 Q 225 200 184 80 Z" fill="${c}" />
      <path d="M 60 180 Q 90 260 120 330" stroke="#fff" stroke-width="2" fill="none" opacity="0.25" />
      <path d="M 180 180 Q 150 260 120 330" stroke="#fff" stroke-width="2" fill="none" opacity="0.25" />
    `,
    front: (c) => `
      <!-- Solid Crown Cap & Dramatic S-Curve Face-Framing Waves -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 164 135 156 190 Q 148 135 142 86 Q 120 75 98 86 Q 92 135 84 190 Q 76 135 72 88 Z" fill="${c}" />
      <path d="M 98 86 Q 108 72 120 85 Q 132 72 142 86 Q 120 78 98 86 Z" fill="${c}" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-micro-bob',
    name: 'French Micro Bob',
    category: 'short',
    back: (c) => `
      <!-- Chic Rounded Parisian Jawline Bob -->
      <rect x="62" y="78" width="116" height="78" rx="26" fill="${c}" />
    `,
    front: (c) => `
      <!-- Solid Crown Cap & Cheek-Curving Bob Contour -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 L 168 132 Q 158 142 150 138 L 150 85 L 90 85 L 90 138 Q 82 142 72 132 Z" fill="${c}" />
      <!-- Sharp French Micro Bangs -->
      <path d="M 88 80 L 152 80 L 152 85 L 88 85 Z" fill="${c}" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-butterfly-layers',
    name: '90s Butterfly Layers',
    category: 'long',
    back: (c) => `
      <path d="M 58 80 Q 26 160 50 255 Q 82 190 86 135 L 154 135 Q 158 190 190 255 Q 214 160 182 80 Z" fill="${c}" />
    `,
    front: (c) => `
      <!-- Fluffed Butterfly Wing Front Layers -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 162 120 156 155 Q 148 118 142 86 Q 120 75 98 86 Q 92 118 84 155 Q 78 120 72 88 Z" fill="${c}" />
      <path d="M 98 85 Q 108 73 120 86 Q 132 73 142 85 Q 120 78 98 85 Z" fill="${c}" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-box-braids',
    name: 'Braided Twin Tails',
    category: 'updo',
    back: (c) => `
      <!-- Intricately Box-Braided Strands with Golden Filigree Rings -->
      <path d="M 64 85 L 54 270 L 70 270 L 76 85 Z" fill="${c}" />
      <path d="M 176 85 L 186 270 L 170 270 L 164 85 Z" fill="${c}" />
      <rect x="54" y="250" width="16" height="9" rx="2" fill="#ffd166" />
      <rect x="170" y="250" width="16" height="9" rx="2" fill="#ffd166" />
      <rect x="57" y="180" width="12" height="7" rx="2" fill="#ffd166" />
      <rect x="171" y="180" width="12" height="7" rx="2" fill="#ffd166" />
    `,
    front: (c) => `
      <!-- Solid Crown Cap & Laid Edge Baby Hairs -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 120 75 72 88 Z" fill="${c}" />
      <!-- Center Part Line & Styled Swirl Edges -->
      <line x1="120" y1="36" x2="120" y2="76" stroke="#ffffff" stroke-width="1.6" opacity="0.45" />
      <path d="M 84 84 Q 88 90 94 85" stroke="${c}" stroke-width="2.2" stroke-linecap="round" fill="none" />
      <path d="M 156 84 Q 152 90 146 85" stroke="${c}" stroke-width="2.2" stroke-linecap="round" fill="none" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-hollywood-glam',
    name: 'Hollywood Glam Wave',
    category: 'long',
    back: (c) => `
      <path d="M 60 80 Q 28 170 45 275 Q 100 245 126 190 Z" fill="${c}" />
    `,
    front: (c) => `
      <!-- Deep Side Part Dramatic Cascading Waves -->
      <path d="M 72 88 C 68 32, 174 32, 170 88 Q 146 50 110 60 Q 80 70 72 88 Z" fill="${c}" />
      <path d="M 70 86 Q 48 150 66 235 Q 86 180 82 125 Z" fill="${c}" />
      <line x1="108" y1="42" x2="100" y2="65" stroke="#fff" stroke-width="1.8" opacity="0.4" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-half-up-crown',
    name: 'Fairycore Half-Up',
    category: 'updo',
    back: (c) => `
      <path d="M 62 82 Q 40 185 66 285 L 174 285 Q 200 185 178 82 Z" fill="${c}" />
    `,
    front: (c) => `
      <!-- Solid Crown Cap with Golden Braided Tiara Headband -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 120 76 72 88 Z" fill="${c}" />
      <path d="M 78 60 Q 120 50 162 60" stroke="#ffd166" stroke-width="3.5" stroke-dasharray="5,3" fill="none" />
      <circle cx="120" cy="50" r="4" fill="#ff3385" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-cyber-bob',
    name: 'Cyberpunk Angle Bob',
    category: 'short',
    back: (c) => `
      <path d="M 64 80 L 44 175 L 115 148 L 176 130 L 176 80 Z" fill="${c}" />
    `,
    front: (c) => `
      <!-- Sharp Asymmetrical Laser-Cut Crown & Bob -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 L 168 130 L 156 126 L 156 86 Q 120 75 88 86 L 52 175 L 68 175 L 86 120 L 72 88 Z" fill="${c}" />
      <!-- Neon Accent Streak -->
      <line x1="68" y1="120" x2="56" y2="168" stroke="#00f3ff" stroke-width="2.2" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-afro-puffs',
    name: 'High Afro Puffs',
    category: 'updo',
    back: (c) => `
      <!-- Volumetric Dual Afro Puffs with Gold Bands -->
      <circle cx="56" cy="42" r="30" fill="${c}" />
      <circle cx="184" cy="42" r="30" fill="${c}" />
      <circle cx="70" cy="60" r="6" fill="#ffd166" />
      <circle cx="170" cy="60" r="6" fill="#ffd166" />
    `,
    front: (c) => `
      <!-- Solid Slicked Crown Cap with Swooped Baby Edges -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 120 75 72 88 Z" fill="${c}" />
      <path d="M 82 85 Q 88 92 96 86" stroke="${c}" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <path d="M 158 85 Q 152 92 144 86" stroke="${c}" stroke-width="2.5" stroke-linecap="round" fill="none" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-high-ponytail',
    name: 'High Idol Ponytail',
    category: 'kpop',
    back: (c) => `
      <!-- Dramatic High Arching Ponytail with Oversized Bow -->
      <path d="M 130 48 Q 230 62 202 240 Q 172 200 144 108 Z" fill="${c}" />
      <path d="M 134 44 L 118 28 L 118 60 Z" fill="#ff3385" />
      <path d="M 134 44 L 150 28 L 150 60 Z" fill="#ff3385" />
      <circle cx="134" cy="44" r="5.5" fill="#ffd166" />
    `,
    front: (c) => `
      <!-- High Tension Snapped Scalp Cap with Temple Strands -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 120 75 72 88 Z" fill="${c}" />
      <path d="M 82 86 Q 80 125 84 140" stroke="${c}" stroke-width="2.2" stroke-linecap="round" fill="none" />
      <path d="M 158 86 Q 160 125 156 140" stroke="${c}" stroke-width="2.2" stroke-linecap="round" fill="none" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-korean-perm',
    name: 'Korean C-Curl Lob',
    category: 'kpop',
    back: (c) => `
      <!-- Shoulder-Grazing Inward C-Curl Ends -->
      <path d="M 64 80 Q 44 150 70 190 L 170 190 Q 196 150 176 80 Z" fill="${c}" />
    `,
    front: (c) => `
      <!-- Solid Crown Cap & Inward Curving Face Frames -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 164 135 148 182 L 140 168 Q 152 130 148 86 Q 120 74 92 86 Q 88 130 100 168 L 92 182 Q 76 135 72 88 Z" fill="${c}" />
      <!-- Signature K-Pop Airy See-Through Bangs -->
      <path d="M 108 76 Q 112 88 110 91" stroke="${c}" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <path d="M 120 75 Q 120 88 120 92" stroke="${c}" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <path d="M 132 76 Q 128 88 130 91" stroke="${c}" stroke-width="2.5" stroke-linecap="round" fill="none" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-pixie-chic',
    name: 'Fluffy Pixie Cut',
    category: 'short',
    back: (c) => `
      <circle cx="120" cy="85" r="48" fill="${c}" />
    `,
    front: (c) => `
      <!-- Fluffy Textured Pixie Crown & Boyish Charm Bangs -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 160 110 156 122 L 150 116 Q 152 95 146 86 Q 120 74 94 86 Q 88 95 90 116 L 84 122 Q 80 110 72 88 Z" fill="${c}" />
      <polygon points="102,80 110,89 116,80" fill="${c}" />
      <polygon points="116,80 124,90 130,80" fill="${c}" />
      <polygon points="128,80 136,88 142,80" fill="${c}" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-goth-braids',
    name: 'Twin Fishtail Braids',
    category: 'updo',
    back: (c) => `
      <path d="M 60 82 Q 42 165 58 260 L 72 260 Q 60 165 74 90 Z" fill="${c}" />
      <path d="M 180 82 Q 198 165 182 260 L 168 260 Q 180 165 166 90 Z" fill="${c}" />
      <circle cx="65" cy="252" r="5" fill="#e11d48" /><circle cx="175" cy="252" r="5" fill="#e11d48" />
    `,
    front: (c) => `
      <!-- Solid Crown Cap & Straight Wednesday-Style Blunt Fringe -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 L 168 85 L 72 85 Z" fill="${c}" />
      <path d="M 74 80 L 166 80 L 166 87 Q 120 88 74 87 Z" fill="${c}" />
      ${hairSheen()}
    `
  },
  {
    id: 'hair-silk-press',
    name: 'Glossy Silk Press',
    category: 'long',
    back: (c) => `
      <!-- Sleek Flat-Ironed Mirror Sheen Press -->
      <rect x="62" y="80" width="116" height="200" rx="8" fill="${c}" />
      <line x1="80" y1="100" x2="80" y2="270" stroke="#fff" stroke-width="1.5" opacity="0.25" />
      <line x1="160" y1="100" x2="160" y2="270" stroke="#fff" stroke-width="1.5" opacity="0.25" />
    `,
    front: (c) => `
      <!-- Center Parted Slicked Crown & Curving Sidelocks -->
      <path d="M 72 88 C 68 34, 172 34, 168 88 Q 160 130 156 170 L 148 170 Q 150 120 146 86 Q 120 75 94 86 Q 90 120 92 170 L 84 170 Q 80 130 72 88 Z" fill="${c}" />
      <line x1="120" y1="36" x2="120" y2="76" stroke="#ffffff" stroke-width="1.8" opacity="0.45" />
      ${hairSheen()}
    `
  },
];

// 21 DISTINCT OUTFITS (FITTED TO NEW DOLL PROPORTIONS)
// 21 DISTINCT OUTFITS (FITTED TO NEW DOLL PROPORTIONS)
const OUTFITS_DATA = [
  { id: 'outfit-ballgown', name: 'Sparkle Ballgown', color: '#ff4081', svg: `<path d="M 98 154 L 142 154 L 136 195 L 104 195 Z" fill="#ff3385" /><path d="M 104 195 Q 55 240 60 315 L 180 315 Q 185 240 136 195 Z" fill="#ff80ab" /><circle cx="120" cy="250" r="4" fill="#ffd166" /><path d="M 90 220 Q 120 280 150 220" stroke="#fff" stroke-width="2" fill="none" opacity="0.6" />` },
  { id: 'outfit-kpop-stage', name: 'K-Pop Stage Tweed', color: '#c084fc', svg: `<rect x="96" y="152" width="48" height="38" rx="5" fill="#c084fc" /><path d="M 100 190 L 140 190 L 148 230 L 92 230 Z" fill="#7e22ce" /><circle cx="120" cy="170" r="3.5" fill="#ffd166" />` },
  { id: 'outfit-streetwear', name: 'Pastel Street Hoodie', color: '#38bdf8', svg: `<rect x="92" y="150" width="56" height="50" rx="8" fill="#38bdf8" /><text x="114" y="178" font-size="12">⚡</text><rect x="98" y="200" width="44" height="26" rx="4" fill="#1e293b" />` },
  { id: 'outfit-fairy-tulle', name: 'Celestial Fairy Gown', color: '#f472b6', svg: `<path d="M 100 152 L 140 152 L 134 192 L 106 192 Z" fill="#f472b6" /><path d="M 106 192 Q 50 240 55 310 L 185 310 Q 190 240 134 192 Z" fill="#fbcfe8" opacity="0.9" /><text x="115" y="240" font-size="12">✨</text>` },
  { id: 'outfit-denim-tennis', name: 'Y2K Denim & Tennis Skirt', color: '#3b82f6', svg: `<rect x="98" y="152" width="44" height="32" fill="#2563eb" rx="4" /><path d="M 98 184 L 142 184 L 150 228 L 90 228 Z" fill="#ffffff" /><line x1="120" y1="184" x2="120" y2="228" stroke="#93c5fd" stroke-width="2" />` },
  { id: 'outfit-gothic-lolita', name: 'Gothic Lolita Dress', color: '#18181b', svg: `<rect x="98" y="152" width="44" height="38" fill="#18181b" rx="3" /><path d="M 98 190 Q 60 240 65 305 L 175 305 Q 180 240 142 190 Z" fill="#27272a" /><circle cx="120" cy="170" r="4" fill="#e11d48" /><line x1="65" y1="295" x2="175" y2="295" stroke="#fff" stroke-width="2" stroke-dasharray="3,3" />` },
  { id: 'outfit-preppy-blazer', name: 'Preppy Academy Blazer', color: '#047857', svg: `<rect x="94" y="150" width="52" height="42" rx="4" fill="#047857" /><polygon points="120,158 114,178 126,178" fill="#fde047" /><path d="M 100 192 L 140 192 L 146 230 L 94 230 Z" fill="#b91c1c" />` },
  { id: 'outfit-cyber-romper', name: 'Cyber Hologram Romper', color: '#06b6d4', svg: `<path d="M 100 152 L 140 152 L 146 225 L 120 235 L 94 225 Z" fill="#06b6d4" /><circle cx="120" cy="178" r="5" fill="#f43f5e" />` },
  { id: 'outfit-velvet-gown', name: 'Velvet Midnight Gown', color: '#4c1d95', svg: `<path d="M 100 154 L 140 154 L 134 198 L 106 198 Z" fill="#4c1d95" /><path d="M 106 198 L 134 198 L 144 325 L 96 325 Z" fill="#311068" />` },
  { id: 'outfit-floral-sundress', name: 'Cottagecore Sundress', color: '#fef08a', svg: `<path d="M 102 154 L 138 154 L 134 192 L 106 192 Z" fill="#fef08a" /><path d="M 106 192 Q 70 230 75 290 L 165 290 Q 170 230 134 192 Z" fill="#fef9c3" /><circle cx="120" cy="240" r="3" fill="#f43f5e" />` },
  { id: 'outfit-runner-set', name: 'Sporty Gym Set', color: '#f97316', svg: `<rect x="100" y="152" width="40" height="24" rx="4" fill="#f97316" /><rect x="98" y="186" width="44" height="54" rx="5" fill="#0f172a" />` },
  { id: 'outfit-silver-pop', name: 'Metallic Idol Jumpsuit', color: '#e2e8f0', svg: `<path d="M 98 152 L 142 152 L 146 265 L 120 275 L 94 265 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />` },
  { id: 'outfit-strawberry-knit', name: 'Strawberry Milk Knit', color: '#fbcfe8', svg: `<rect x="94" y="152" width="52" height="44" rx="6" fill="#fbcfe8" /><text x="114" y="176" font-size="12">🍓</text><rect x="98" y="196" width="44" height="62" rx="4" fill="#f1f5f9" />` },
  { id: 'outfit-retro-polka', name: 'Retro 50s Polka Dress', color: '#dc2626', svg: `<path d="M 100 154 L 140 154 L 134 190 L 106 190 Z" fill="#dc2626" /><path d="M 106 190 Q 60 235 65 300 L 175 300 Q 180 235 134 190 Z" fill="#ef4444" /><circle cx="120" cy="230" r="3" fill="#fff" /><circle cx="95" cy="260" r="3" fill="#fff" /><circle cx="145" cy="260" r="3" fill="#fff" />` },
  { id: 'outfit-hanbok-fusion', name: 'Modern Hanbok Set', color: '#fb7185', svg: `<rect x="98" y="152" width="44" height="28" rx="4" fill="#fb7185" /><polygon points="120,152 110,168 130,168" fill="#fef08a" /><path d="M 98 180 Q 55 225 60 315 L 180 315 Q 185 225 142 180 Z" fill="#38bdf8" />` },
  { id: 'outfit-coquette-slip', name: 'Coquette Silk Slip', color: '#fce7f3', svg: `<path d="M 102 154 L 138 154 L 134 238 L 106 238 Z" fill="#fce7f3" stroke="#f472b6" stroke-width="1.5" /><circle cx="120" cy="162" r="3" fill="#f43f5e" />` },
  { id: 'outfit-mermaid-gown', name: 'Pearl Mermaid Gown', color: '#065f46', svg: `<path d="M 100 154 L 140 154 L 134 250 L 106 250 Z" fill="#047857" /><path d="M 106 250 L 75 325 L 165 325 L 134 250 Z" fill="#10b981" />` },
  { id: 'outfit-rainbow-dungaree', name: 'Rainbow Dungarees', color: '#eab308', svg: `<rect x="100" y="154" width="40" height="28" fill="#f43f5e" /><path d="M 98 182 L 142 182 L 144 270 L 96 270 Z" fill="#0284c7" />` },
  { id: 'outfit-gold-gala', name: 'Gold Sequin Gala Gown', color: '#eab308', svg: `<path d="M 100 152 L 140 152 L 134 195 L 106 195 Z" fill="#eab308" /><path d="M 106 195 Q 55 245 60 325 L 180 325 Q 185 245 134 195 Z" fill="#fde047" />` },
  { id: 'outfit-rocker-leather', name: 'Biker Leather & Tutu', color: '#18181b', svg: `<rect x="94" y="152" width="52" height="38" rx="4" fill="#18181b" /><path d="M 96 190 Q 65 230 70 275 L 170 275 Q 175 230 144 190 Z" fill="#f43f5e" />` },
  { id: 'outfit-cloud-pajamas', name: 'Fluffy Cloud Pajamas', color: '#bae6fd', svg: `<rect x="94" y="152" width="52" height="44" rx="8" fill="#bae6fd" /><text x="114" y="176" font-size="12">☁️</text><rect x="96" y="196" width="48" height="68" rx="6" fill="#e0f2fe" />` }
];

// 20 DISTINCT SHOES
const SHOES_DATA = [
  { id: 'shoes-glass-heels', name: 'Glass Stilettos', svg: `<path d="M 96 332 L 114 332 L 115 348 L 106 348 L 105 340 L 96 340 Z" fill="#38bdf8" /><path d="M 126 332 L 144 332 L 145 348 L 136 348 L 135 340 L 126 340 Z" fill="#38bdf8" />` },
  { id: 'shoes-combat-boots', name: 'Platform Combat', svg: `<rect x="92" y="320" width="24" height="30" rx="4" fill="#18181b" /><rect x="124" y="320" width="24" height="30" rx="4" fill="#18181b" />` },
  { id: 'shoes-dad-sneakers', name: 'Chunky Sneakers', svg: `<rect x="92" y="332" width="24" height="18" rx="6" fill="#f472b6" /><rect x="124" y="332" width="24" height="18" rx="6" fill="#f472b6" />` },
  { id: 'shoes-mary-janes', name: 'Mary Jane Lace', svg: `<rect x="94" y="335" width="20" height="15" rx="5" fill="#18181b" /><rect x="126" y="335" width="20" height="15" rx="5" fill="#18181b" /><line x1="94" y1="332" x2="114" y2="332" stroke="#fff" stroke-width="2" />` },
  { id: 'shoes-knee-high', name: 'Knee-High Idol', svg: `<rect x="94" y="270" width="20" height="78" rx="4" fill="#ffffff" stroke="#e2e8f0" /><rect x="126" y="270" width="20" height="78" rx="4" fill="#ffffff" stroke="#e2e8f0" />` },
  { id: 'shoes-roller-skates', name: 'Pastel Rollers', svg: `<rect x="92" y="328" width="24" height="16" rx="4" fill="#f43f5e" /><circle cx="96" cy="347" r="4" fill="#ffd166" /><circle cx="112" cy="347" r="4" fill="#ffd166" /><rect x="124" y="328" width="24" height="16" rx="4" fill="#f43f5e" /><circle cx="128" cy="347" r="4" fill="#ffd166" /><circle cx="144" cy="347" r="4" fill="#ffd166" />` },
  { id: 'shoes-ballet-flats', name: 'Ballerina Pointe', svg: `<rect x="94" y="338" width="20" height="11" rx="5" fill="#fbcfe8" /><rect x="126" y="338" width="20" height="11" rx="5" fill="#fbcfe8" />` },
  { id: 'shoes-strappy-gold', name: 'Strappy Gold Glitz', svg: `<line x1="94" y1="334" x2="114" y2="348" stroke="#eab308" stroke-width="2" /><line x1="126" y1="334" x2="146" y2="348" stroke="#eab308" stroke-width="2" />` },
  { id: 'shoes-fuzzy-slippers', name: 'Fuzzy Slippers', svg: `<ellipse cx="104" cy="342" rx="14" ry="9" fill="#f472b6" /><ellipse cx="136" cy="342" rx="14" ry="9" fill="#f472b6" />` },
  { id: 'shoes-kitten-heels', name: 'Coquette Heels', svg: `<path d="M 96 336 L 114 336 L 114 346 L 108 346 L 96 340 Z" fill="#fb7185" /><path d="M 126 336 L 144 336 L 144 346 L 138 346 L 126 340 Z" fill="#fb7185" />` },
  { id: 'shoes-cowgirl-boots', name: 'Western Star Boots', svg: `<rect x="94" y="295" width="22" height="54" rx="4" fill="#b45309" /><rect x="124" y="295" width="22" height="54" rx="4" fill="#b45309" />` },
  { id: 'shoes-creepers', name: 'Cyber Creepers', svg: `<rect x="92" y="332" width="24" height="17" rx="3" fill="#06b6d4" /><rect x="124" y="332" width="24" height="17" rx="3" fill="#06b6d4" />` },
  { id: 'shoes-lavender-boots', name: 'Lavender Ankle Boots', svg: `<rect x="94" y="315" width="20" height="34" rx="4" fill="#c084fc" /><rect x="126" y="315" width="20" height="34" rx="4" fill="#c084fc" />` },
  { id: 'shoes-ruby-slippers', name: 'Ruby Slippers', svg: `<rect x="94" y="336" width="20" height="13" rx="5" fill="#dc2626" /><rect x="126" y="336" width="20" height="13" rx="5" fill="#dc2626" />` },
  { id: 'shoes-canvas-hightops', name: 'Canvas High-Tops', svg: `<rect x="94" y="325" width="22" height="24" rx="4" fill="#ea580c" /><rect x="124" y="325" width="22" height="24" rx="4" fill="#ea580c" />` },
  { id: 'shoes-velvet-booties', name: 'Velvet Booties', svg: `<rect x="94" y="318" width="20" height="31" rx="4" fill="#4c1d95" /><rect x="126" y="318" width="20" height="31" rx="4" fill="#4c1d95" />` },
  { id: 'shoes-pearl-mules', name: 'Pearl Mules', svg: `<rect x="94" y="336" width="18" height="12" rx="4" fill="#f8fafc" /><rect x="126" y="336" width="18" height="12" rx="4" fill="#f8fafc" />` },
  { id: 'shoes-beach-sandals', name: 'Beach Flatforms', svg: `<rect x="92" y="340" width="24" height="8" rx="2" fill="#f59e0b" /><rect x="124" y="340" width="24" height="8" rx="2" fill="#f59e0b" />` },
  { id: 'shoes-gothic-wedges', name: 'Gothic Buckle Wedges', svg: `<polygon points="94,325 114,325 116,348 94,348" fill="#18181b" /><polygon points="126,325 146,325 148,348 126,348" fill="#18181b" />` },
  { id: 'shoes-diamond-pumps', name: 'Diamond Pumps', svg: `<path d="M 96 335 L 114 335 L 115 348 L 105 348 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="1" /><path d="M 126 335 L 144 335 L 145 348 L 135 348 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="1" />` }
];

// 20 DISTINCT ACCESSORIES
const ACCESSORIES_DATA = [
  { id: 'acc-tiara', name: 'Empress Tiara', svg: `<path d="M 104 52 L 112 38 L 120 46 L 128 38 L 136 52 Z" fill="#ffd166" stroke="#fff" stroke-width="1.5" /><circle cx="120" cy="42" r="2.5" fill="#00e5ff" />` },
  { id: 'acc-heart-shades', name: 'Y2K Heart Shades', svg: `<path d="M 104 94 C 98 87, 88 89, 88 96 C 88 103, 104 110, 104 110 C 104 110, 120 103, 120 96 C 120 89, 110 87, 104 94 Z" fill="#ff3385" opacity="0.9" /><path d="M 136 94 C 130 87, 120 89, 120 96 C 120 103, 136 110, 136 110 C 136 110, 152 103, 152 96 C 152 89, 142 87, 136 94 Z" fill="#ff3385" opacity="0.9" /><line x1="116" y1="96" x2="124" y2="96" stroke="#ff3385" stroke-width="3" />` },
  { id: 'acc-star-glasses', name: 'Star Cutout Glasses', svg: `<polygon points="103,88 106,96 114,96 108,101 110,109 103,104 96,109 98,101 92,96 100,96" fill="#fde047" opacity="0.9" /><polygon points="137,88 140,96 148,96 142,101 144,109 137,104 130,109 132,101 126,96 134,96" fill="#fde047" opacity="0.9" /><line x1="114" y1="96" x2="126" y2="96" stroke="#fde047" stroke-width="2.5" />` },
  { id: 'acc-beret', name: 'K-Pop French Beret', svg: `<ellipse cx="120" cy="50" rx="36" ry="14" fill="#e11d48" /><circle cx="120" cy="36" r="3.5" fill="#e11d48" />` },
  { id: 'acc-oversized-bow', name: 'Satin Bow', svg: `<path d="M 120 48 L 100 32 L 100 64 Z" fill="#f43f5e" /><path d="M 120 48 L 140 32 L 140 64 Z" fill="#f43f5e" /><circle cx="120" cy="48" r="5" fill="#fde047" />` },
  { id: 'acc-cat-ears', name: 'Cat Ear Headband', svg: `<polygon points="92,56 100,32 110,56" fill="#f472b6" /><polygon points="148,56 140,32 130,56" fill="#f472b6" /><path d="M 92 56 Q 120 42 148 56" stroke="#18181b" stroke-width="3" fill="none" />` },
  { id: 'acc-pearl-choker', name: 'Pearl Choker', svg: `<ellipse cx="120" cy="140" rx="16" ry="5" fill="none" stroke="#f8fafc" stroke-width="4" stroke-dasharray="3,3" />` },
  { id: 'acc-hologram-bag', name: 'Holo Crossbody Bag', svg: `<line x1="88" y1="162" x2="68" y2="218" stroke="#ffd166" stroke-width="2.5" /><rect x="58" y="214" width="28" height="24" rx="4" fill="#06b6d4" stroke="#fff" /><circle cx="72" cy="226" r="3" fill="#f43f5e" />` },
  { id: 'acc-cat-headset', name: 'Gamer Headset', svg: `<path d="M 82 86 Q 120 42 158 86" stroke="#f472b6" stroke-width="4" fill="none" /><rect x="76" y="82" width="10" height="20" rx="3" fill="#ec4899" /><rect x="154" y="82" width="10" height="20" rx="3" fill="#ec4899" />` },
  { id: 'acc-fairy-wings', name: 'Fairy Wings', svg: `<path d="M 98 160 Q 35 120 40 195 Q 75 205 98 182 Z" fill="#bae6fd" opacity="0.8" /><path d="M 142 160 Q 205 120 200 195 Q 165 205 142 182 Z" fill="#bae6fd" opacity="0.8" />` },
  { id: 'acc-hoop-earrings', name: 'Gold Hoop Earrings', svg: `<circle cx="81" cy="106" r="8" fill="none" stroke="#eab308" stroke-width="2.5" /><circle cx="159" cy="106" r="8" fill="none" stroke="#eab308" stroke-width="2.5" />` },
  { id: 'acc-heart-belt', name: 'Chunky Heart Belt', svg: `<rect x="98" y="186" width="44" height="6" fill="#18181b" /><text x="114" y="195" font-size="12">💖</text>` },
  { id: 'acc-flower-crown', name: 'Rose Flower Crown', svg: `<text x="88" y="52" font-size="14">🌸</text><text x="104" y="46" font-size="14">🌹</text><text x="120" y="44" font-size="14">🌸</text><text x="136" y="52" font-size="14">🌹</text>` },
  { id: 'acc-bear-backpack', name: 'Teddy Backpack', svg: `<rect x="62" y="192" width="24" height="26" rx="6" fill="#b45309" /><circle cx="64" cy="190" r="4" fill="#b45309" /><circle cx="84" cy="190" r="4" fill="#b45309" />` },
  { id: 'acc-chandelier-earrings', name: 'Crystal Earrings', svg: `<line x1="81" y1="102" x2="81" y2="120" stroke="#38bdf8" stroke-width="2" /><polygon points="78,120 84,120 81,126" fill="#38bdf8" /><line x1="159" y1="102" x2="159" y2="120" stroke="#38bdf8" stroke-width="2" /><polygon points="156,120 162,120 159,126" fill="#38bdf8" />` },
  { id: 'acc-feather-boa', name: 'Pink Feather Boa', svg: `<path d="M 82 142 Q 120 168 158 142 Q 168 185 152 205" stroke="#f472b6" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.85" />` },
  { id: 'acc-moon-pin', name: 'Moon Hairpin', svg: `<path d="M 148 58 A 8 8 0 0 0 148 72 A 10 10 0 0 1 148 58 Z" fill="#ffd166" />` },
  { id: 'acc-lace-gloves', name: 'Coquette Lace Gloves', svg: `<rect x="64" y="198" width="12" height="16" rx="3" fill="#ffffff" opacity="0.9" /><rect x="164" y="198" width="12" height="16" rx="3" fill="#ffffff" opacity="0.9" />` },
  { id: 'acc-boba-tea', name: 'Boba Milk Tea', svg: `<rect x="62" y="202" width="16" height="24" rx="3" fill="#fed7aa" /><line x1="70" y1="196" x2="70" y2="204" stroke="#ea580c" stroke-width="3" />` },
  { id: 'acc-magic-wand', name: 'Star Magic Wand', svg: `<line x1="168" y1="182" x2="182" y2="235" stroke="#ffd166" stroke-width="3" /><text x="162" y="182" font-size="14">⭐</text>` }
];

// 20 DISTINCT LIPSTICKS
const LIPSTICKS_DATA = [
  { id: 'lip-ruby-red', name: 'Ruby Red', hex: '#dc2626' },
  { id: 'lip-kpop-coral', name: 'K-Pop Coral', hex: '#fb7185' },
  { id: 'lip-glossy-peach', name: 'Glossy Peach', hex: '#fda4af' },
  { id: 'lip-cotton-candy', name: 'Cotton Candy', hex: '#f472b6' },
  { id: 'lip-bubblegum', name: 'Hot Bubblegum', hex: '#ec4899' },
  { id: 'lip-berry-wine', name: 'Berry Wine', hex: '#9d174d' },
  { id: 'lip-mauve-nude', name: 'Mauve Velvet', hex: '#a855f7' },
  { id: 'lip-fuchsia-pop', name: 'Fuchsia Pop', hex: '#d946ef' },
  { id: 'lip-cherry-glaze', name: 'Cherry Glaze', hex: '#b91c1c' },
  { id: 'lip-plum-noir', name: 'Plum Noir', hex: '#581c87' },
  { id: 'lip-nude-cocoa', name: 'Nude Cocoa', hex: '#78350f' },
  { id: 'lip-strawberry-milk', name: 'Strawberry Milk', hex: '#fbcfe8' },
  { id: 'lip-tangerine-pop', name: 'Tangerine Pop', hex: '#ea580c' },
  { id: 'lip-rose-gold', name: 'Rose Gold', hex: '#e11d48' },
  { id: 'lip-neon-violet', name: 'Neon Violet', hex: '#7c3aed' },
  { id: 'lip-black-cherry', name: 'Black Cherry', hex: '#450a0a' },
  { id: 'lip-cinnamon-spice', name: 'Cinnamon Spice', hex: '#9a3412' },
  { id: 'lip-petal-rose', name: 'Petal Rose', hex: '#f43f5e' },
  { id: 'lip-holo-frost', name: 'Holo Frost', hex: '#a5f3fc' },
  { id: 'lip-ruby-glitz', name: 'Ruby Glitz', hex: '#be123c' }
];

// ==================== 4. MAIN SIMULATION ENGINE ====================
class GlamDollApp {
  constructor() {
    this.sound = new SoundManager();
    this.fx = new ParticleSystem(document.getElementById('fxCanvas'));

    // Persistent Unified Doll Model (Preserved across all Hubs)
    this.dollState = {
      hair: HAIRSTYLES_DATA[0],
      hairColor: HAIR_COLORS[0].hex,
      outfit: OUTFITS_DATA[0],
      shoes: SHOES_DATA[0],
      accessories: null,
      lipstick: LIPSTICKS_DATA[0].hex,
      eyeshadow: 'transparent',
      blush: '#ff7aa2',
      faceSticker: '',
      skinGlow: false
    };

    // Kitchen Cooking State
    this.kitchenState = {
      dishes: {
        cake: { stacked: false, frosted: false, candles: false, completed: false },
        cupcake: { poured: false, baked: false, frosted: false, completed: false },
        meatballs: { dropped: false, stirred: false, sauced: false, completed: false },
        pizzapasta: { sauced: false, baked: false, pastaAdded: false, completed: false },
        fastfood: { fried: false, served: false, salted: false, completed: false }
      }
    };

    this.activeHub = 'salon';
    this.initDOM();
    this.bindEvents();
    this.renderHairDyePalette();
    this.renderHairstylesGrid('all');
    this.renderMakeupSwatches('lipstick');
    this.renderClosetItems('outfits');
    this.renderAllDollViews();
  }

  initDOM() {
    this.hubs = {
      salon: document.getElementById('hub-salon'),
      spa: document.getElementById('hub-spa'),
      makeup: document.getElementById('hub-makeup'),
      wardrobe: document.getElementById('hub-wardrobe'),
      kitchen: document.getElementById('hub-kitchen'),
      photo: document.getElementById('hub-photo')
    };
    this.navBtns = document.querySelectorAll('.nav-item');
    this.currentHubTitle = document.getElementById('currentHubTitle');
  }

  bindEvents() {
    const userUnlock = () => {
      this.sound.init();
      this.sound.startBGM();
      window.removeEventListener('pointerdown', userUnlock);
    };
    window.addEventListener('pointerdown', userUnlock);

    document.getElementById('soundToggleBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      const isMuted = this.sound.toggleMute();
      document.getElementById('soundToggleBtn').textContent = isMuted ? '🔇' : '🔊';
      this.fx.burst(e.clientX, e.clientY, 8);
    });

    document.getElementById('randomLookBtn').addEventListener('click', (e) => {
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25, true);
      this.dollState.hair = HAIRSTYLES_DATA[Math.floor(Math.random() * HAIRSTYLES_DATA.length)];
      this.dollState.hairColor = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)].hex;
      this.dollState.outfit = OUTFITS_DATA[Math.floor(Math.random() * OUTFITS_DATA.length)];
      this.dollState.shoes = SHOES_DATA[Math.floor(Math.random() * SHOES_DATA.length)];
      this.dollState.accessories = ACCESSORIES_DATA[Math.floor(Math.random() * ACCESSORIES_DATA.length)];
      this.dollState.lipstick = LIPSTICKS_DATA[Math.floor(Math.random() * LIPSTICKS_DATA.length)].hex;
      this.renderAllDollViews();
      this.renderHairstylesGrid('all');
    });

    document.getElementById('resetLookBtn').addEventListener('click', () => {
      this.sound.playPop();
      this.dollState.hair = HAIRSTYLES_DATA[0];
      this.dollState.hairColor = HAIR_COLORS[0].hex;
      this.dollState.outfit = OUTFITS_DATA[0];
      this.dollState.shoes = SHOES_DATA[0];
      this.dollState.accessories = null;
      this.dollState.lipstick = LIPSTICKS_DATA[0].hex;
      this.dollState.eyeshadow = 'transparent';
      this.dollState.blush = '#ff7aa2';
      this.dollState.faceSticker = '';
      this.dollState.skinGlow = false;
      this.renderAllDollViews();
      this.renderHairstylesGrid('all');
    });

    this.navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const hub = btn.dataset.hub;
        this.switchHub(hub);
      });
    });

    // Salon Buttons
    document.getElementById('salonShampooBtn').addEventListener('click', (e) => {
      this.sound.playWaterSplash();
      this.fx.burst(e.clientX, e.clientY, 15);
      const bubbles = document.getElementById('hairBubblesGroup');
      document.getElementById('salonCareOverlay').classList.remove('hidden');
      bubbles.classList.remove('hidden');
      setTimeout(() => bubbles.classList.add('hidden'), 1200);
    });

    document.getElementById('salonRinseBtn').addEventListener('click', (e) => {
      this.sound.playWaterSplash();
      this.fx.burst(e.clientX, e.clientY, 20);
    });

    document.getElementById('salonBlowdryBtn').addEventListener('click', (e) => {
      this.sound.playHairdryer();
      this.fx.burst(e.clientX, e.clientY, 15);
      const wind = document.getElementById('hairdryerWind');
      document.getElementById('salonCareOverlay').classList.remove('hidden');
      wind.classList.remove('hidden');
      setTimeout(() => wind.classList.add('hidden'), 1200);
    });

    document.getElementById('salonBrushBtn').addEventListener('click', (e) => {
      this.sound.playBrush();
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25, true);
    });

    document.querySelectorAll('.hair-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.hair-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.sound.playPop();
        this.renderHairstylesGrid(tab.dataset.filter);
      });
    });

    // Spa Buttons
    const spaInstructions = document.getElementById('spaInstructionBox');
    document.getElementById('spaCleanseBtn').addEventListener('click', (e) => {
      this.sound.playWaterSplash();
      this.fx.burst(e.clientX, e.clientY, 15);
      const foam = document.getElementById('facialFoam');
      foam.classList.remove('hidden');
      spaInstructions.textContent = 'Cleansing foam applied! Tap Sheet Mask next. 🌸';
      setTimeout(() => foam.classList.add('hidden'), 1200);
    });

    document.getElementById('spaMaskBtn').addEventListener('click', (e) => {
      const mask = document.getElementById('sheetMaskOverlay');
      if (mask.classList.contains('hidden')) {
        this.sound.playPop();
        mask.classList.remove('hidden');
        spaInstructions.textContent = 'Sheet mask on! Tap again to peel off for glowing skin! ✨';
      } else {
        this.sound.playMaskPeel();
        this.sound.playSparkle();
        this.fx.burst(e.clientX, e.clientY, 25, true);
        mask.classList.add('hidden');
        spaInstructions.textContent = 'Peel complete! Skin is refreshed and glowing! 💖';
      }
    });

    document.getElementById('spaCucumberBtn').addEventListener('click', (e) => {
      const cuc = document.getElementById('cucumbersOverlay');
      this.sound.playPop();
      cuc.classList.toggle('hidden');
      spaInstructions.textContent = cuc.classList.contains('hidden') ? 'Cucumbers removed!' : 'Cooling cucumber slices on eyes! 🥒';
    });

    document.getElementById('spaRollerBtn').addEventListener('click', (e) => {
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 30, true);
      this.dollState.skinGlow = !this.dollState.skinGlow;
      this.renderAllDollViews();
      spaInstructions.textContent = 'Jade roller massage complete! Maximum skin glow unlocked! ✨';
    });

    // Makeup Tabs
    document.querySelectorAll('.m-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.m-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.sound.playPop();
        this.renderMakeupSwatches(tab.dataset.tab);
      });
    });

    // Wardrobe Tabs
    document.querySelectorAll('.closet-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.closet-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.sound.playPop();
        this.renderClosetItems(tab.dataset.cat);
      });
    });

    this.bindKitchenEvents();

    // Photo Studio
    document.querySelectorAll('.photo-bg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.photo-bg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const theme = btn.dataset.bg;
        document.getElementById('photoPolaroidCard').className = `polaroid-frame ${theme}`;
        this.sound.playPop();
      });
    });

    document.querySelectorAll('.add-sticker-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.sound.playSparkle();
        this.fx.burst(e.clientX, e.clientY, 10);
        const emoji = btn.dataset.emoji;
        const sticker = document.createElement('div');
        sticker.className = 'placed-sticker';
        sticker.textContent = emoji;
        sticker.style.left = `${Math.random() * 70 + 10}%`;
        sticker.style.top = `${Math.random() * 60 + 10}%`;
        document.getElementById('photoStickersLayer').appendChild(sticker);
      });
    });

    document.getElementById('snapPhotoActionBtn').addEventListener('click', (e) => {
      this.sound.playCamera();
      this.fx.burst(e.clientX, e.clientY, 40, true);

      const flash = document.createElement('div');
      flash.style.position = 'absolute';
      flash.style.top = '0';
      flash.style.left = '0';
      flash.style.width = '100%';
      flash.style.height = '100%';
      flash.style.backgroundColor = '#ffffff';
      flash.style.zIndex = '999';
      flash.style.transition = 'opacity 0.4s ease-out';
      document.getElementById('game-container').appendChild(flash);

      setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 400);
        this.sound.playFanfare();
        document.getElementById('modalSnapshotFrame').innerHTML = this.renderDollSVG();
        document.getElementById('photoResultModal').classList.remove('hidden');
      }, 80);
    });

    document.getElementById('closeModalBtn').addEventListener('click', () => {
      document.getElementById('photoResultModal').classList.add('hidden');
      this.sound.playPop();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.sound.stopBGM();
      } else if (!this.sound.muted) {
        this.sound.startBGM();
      }
    });
  }

  switchHub(hubName) {
    if (!this.hubs[hubName]) return;
    this.activeHub = hubName;
    Object.keys(this.hubs).forEach(key => {
      this.hubs[key].classList.toggle('active', key === hubName);
    });
    this.navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.hub === hubName);
    });

    const hubTitles = {
      salon: 'HAIR SALON',
      spa: 'WELLNESS SPA',
      makeup: 'MAKEUP LAB',
      wardrobe: 'DRESSING ROOM',
      kitchen: 'GOURMET KITCHEN',
      photo: 'PHOTO STUDIO'
    };
    this.currentHubTitle.textContent = hubTitles[hubName] || 'STUDIO';
    this.sound.playPop();
    this.renderAllDollViews();
  }

  // ================= ELEGANT CHIBI FASHION DOLL MESH =================
  renderDollSVG() {
    const s = this.dollState;
    const hair = s.hair;
    const outfit = s.outfit;
    const shoes = s.shoes;
    const acc = s.accessories;
    const color = s.hairColor;

    return `
      <svg viewBox="0 0 240 380" class="doll-svg-render">
        <defs>
          <linearGradient id="dollSkinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff6f0" />
            <stop offset="40%" stop-color="#fee8dd" />
            <stop offset="100%" stop-color="#fbd2be" />
          </linearGradient>
          <linearGradient id="dollEyeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#150818" />
            <stop offset="45%" stop-color="#3b1134" />
            <stop offset="75%" stop-color="#7c1d5a" />
            <stop offset="100%" stop-color="#b83375" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Back Hair Layer -->
        <g id="svg-back-hair">${hair ? hair.back(color) : ''}</g>

        <!-- Doll Anatomical Body Mesh -->
        <g id="svg-doll-body">
          <!-- Legs with contoured knees & ankles -->
          <path d="M 98 215 Q 94 270 98 335 Q 98 348 106 348 Q 114 348 114 335 Q 116 270 114 215 Z" fill="url(#dollSkinGrad)" />
          <path d="M 126 215 Q 124 270 126 335 Q 126 348 134 348 Q 142 348 142 335 Q 146 270 142 215 Z" fill="url(#dollSkinGrad)" />
          <!-- Knee accents -->
          <ellipse cx="106" cy="272" rx="4" ry="2.5" fill="#f4b5a0" opacity="0.4" />
          <ellipse cx="134" cy="272" rx="4" ry="2.5" fill="#f4b5a0" opacity="0.4" />

          <!-- Feminine Torso & Hips Silhouette -->
          <path d="M 92 152 Q 120 146 148 152 L 144 185 Q 138 200 142 225 L 98 225 Q 102 200 96 185 Z" fill="url(#dollSkinGrad)" />

          <!-- Default Coquette Lace Camisole Undergarment -->
          <path d="M 96 154 L 144 154 L 138 190 Q 120 194 102 190 Z" fill="#fff5f8" stroke="#ff80ab" stroke-width="1.2" />
          <path d="M 98 190 Q 120 196 142 190 L 146 222 Q 120 228 94 222 Z" fill="#ffe4ec" stroke="#ff80ab" stroke-width="1" />
          <circle cx="120" cy="160" r="2.5" fill="#ff3385" />
          <path d="M 115 159 Q 120 162 125 159" stroke="#ff3385" stroke-width="1.5" fill="none" />

          <!-- Arms with soft posed hands -->
          <path d="M 93 154 Q 78 185 82 225 Q 86 232 90 228 Q 88 195 98 162 Z" fill="url(#dollSkinGrad)" />
          <path d="M 147 154 Q 162 185 158 225 Q 154 232 150 228 Q 152 195 142 162 Z" fill="url(#dollSkinGrad)" />

          <!-- Slender Neck & Soft Chin Drop Shadow -->
          <path d="M 112 128 L 112 152 Q 120 155 128 152 L 128 128 Z" fill="#f8cfbe" />
          <ellipse cx="120" cy="132" rx="14" ry="3.5" fill="#e09e8c" opacity="0.35" />

          <!-- Delicate Clavicle Lines -->
          <path d="M 106 155 Q 120 158 134 155" stroke="#e09e8c" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.45" />

          <!-- Ears with Pearl Stud Earrings -->
          <g id="doll-ears">
            <path d="M 80 90 Q 70 96 80 104 Z" fill="#fed5c2" />
            <circle cx="79" cy="97" r="4.5" fill="#f8b69e" opacity="0.6" />
            <circle cx="78" cy="99" r="2.2" fill="#ffffff" stroke="#ffd166" stroke-width="0.8" />
            <path d="M 160 90 Q 170 96 160 104 Z" fill="#fed5c2" />
            <circle cx="161" cy="97" r="4.5" fill="#f8b69e" opacity="0.6" />
            <circle cx="162" cy="99" r="2.2" fill="#ffffff" stroke="#ffd166" stroke-width="0.8" />
          </g>

          <!-- Elegant Contoured Chibi Face Shape (Soft sculpted jawline, sweet cheeks) -->
          <path d="M 80 82 C 78 116, 94 138, 120 140 C 146 138, 162 116, 160 82 C 160 48, 80 48, 80 82 Z" fill="url(#dollSkinGrad)" />

          <!-- Magical Skin Glow Aura if Spa Roller active -->
          ${s.skinGlow ? `<path d="M 78 82 C 75 118, 92 141, 120 143 C 148 141, 165 118, 162 82 C 162 45, 78 45, 78 82 Z" fill="none" stroke="#ffd166" stroke-width="2.5" stroke-dasharray="4,4" opacity="0.85" filter="url(#softGlow)" />` : ''}

          <!-- Luminous Expressive Anime Eyes -->
          <g id="doll-eyes">
            <!-- Left Eye -->
            <path d="M 93 95 Q 103 88 113 95 Q 103 102 93 95 Z" fill="#ffffff" />
            <ellipse cx="103" cy="95" rx="6.5" ry="7.5" fill="url(#dollEyeGrad)" />
            <ellipse cx="103" cy="96" rx="3.5" ry="4.2" fill="#150818" />
            <path d="M 98 97 Q 103 101 108 97" stroke="#ff80ab" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.7" />
            <circle cx="100.5" cy="92.5" r="2.4" fill="#ffffff" />
            <circle cx="105.5" cy="97" r="1.3" fill="#ffffff" opacity="0.9" />
            <!-- Left Winged Lash Line & Flutter Lashes -->
            <path d="M 91 94 Q 103 86 114 93" stroke="#200d1c" stroke-width="3" stroke-linecap="round" fill="none" />
            <path d="M 113 92 L 118 89" stroke="#200d1c" stroke-width="2.2" stroke-linecap="round" />
            <path d="M 111 90 L 115 86" stroke="#200d1c" stroke-width="1.5" stroke-linecap="round" />
            <path d="M 95 87 Q 103 83 111 87" stroke="#d4949b" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.65" />
            <path d="M 96 101 Q 103 103.5 110 101" stroke="#9e6678" stroke-width="1.2" fill="none" opacity="0.55" />

            <!-- Right Eye -->
            <path d="M 127 95 Q 137 88 147 95 Q 137 102 127 95 Z" fill="#ffffff" />
            <ellipse cx="137" cy="95" rx="6.5" ry="7.5" fill="url(#dollEyeGrad)" />
            <ellipse cx="137" cy="96" rx="3.5" ry="4.2" fill="#150818" />
            <path d="M 132 97 Q 137 101 142 97" stroke="#ff80ab" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.7" />
            <circle cx="134.5" cy="92.5" r="2.4" fill="#ffffff" />
            <circle cx="139.5" cy="97" r="1.3" fill="#ffffff" opacity="0.9" />
            <!-- Right Winged Lash Line & Flutter Lashes -->
            <path d="M 126 93 Q 137 86 149 94" stroke="#200d1c" stroke-width="3" stroke-linecap="round" fill="none" />
            <path d="M 127 92 L 122 89" stroke="#200d1c" stroke-width="2.2" stroke-linecap="round" />
            <path d="M 129 90 L 125 86" stroke="#200d1c" stroke-width="1.5" stroke-linecap="round" />
            <path d="M 129 87 Q 137 83 145 87" stroke="#d4949b" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.65" />
            <path d="M 130 101 Q 137 103.5 144 101" stroke="#9e6678" stroke-width="1.2" fill="none" opacity="0.55" />

            <!-- Eyeshadow -->
            <path d="M 92 90 Q 103 80 114 90 Z" fill="${s.eyeshadow}" opacity="0.65" />
            <path d="M 126 90 Q 137 80 148 90 Z" fill="${s.eyeshadow}" opacity="0.65" />
          </g>

          <!-- Arched Delicate Eyebrows -->
          <path d="M 94 81 Q 103 76 112 80" stroke="#683446" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.8" />
          <path d="M 128 80 Q 137 76 146 81" stroke="#683446" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.8" />

          <!-- Sweet Blushing Cheeks with Star Twinkles -->
          <ellipse cx="96" cy="104" rx="9" ry="5.5" fill="${s.blush}" opacity="0.55" />
          <ellipse cx="144" cy="104" rx="9" ry="5.5" fill="${s.blush}" opacity="0.55" />
          <path d="M 95 101 L 96 103 L 98 104 L 96 105 L 95 107 L 94 105 L 92 104 L 94 103 Z" fill="#ffffff" opacity="0.85" />
          <path d="M 145 101 L 146 103 L 148 104 L 146 105 L 145 107 L 144 105 L 142 104 L 144 103 Z" fill="#ffffff" opacity="0.85" />

          <!-- Tiny Cute Aesthetic Nose -->
          <circle cx="120" cy="107" r="1.6" fill="#f09584" opacity="0.75" />
          <circle cx="119.5" cy="106.5" r="0.6" fill="#ffffff" opacity="0.9" />

          <!-- Glossy 3D Cupid's Bow Lips -->
          <path d="M 112 117 Q 116 114 120 116 Q 124 114 128 117 Q 120 119 112 117 Z" fill="${s.lipstick}" />
          <path d="M 113 117 Q 120 125 127 117 Q 120 120 113 117 Z" fill="${s.lipstick}" />
          <path d="M 114 117 Q 120 118 126 117" stroke="#600028" stroke-width="0.8" fill="none" opacity="0.5" />
          <ellipse cx="119" cy="120" rx="2.5" ry="1.2" fill="#ffffff" opacity="0.8" />
          <circle cx="123" cy="119.5" r="0.8" fill="#ffffff" opacity="0.7" />
          <circle cx="116.5" cy="115.5" r="0.6" fill="#ffffff" opacity="0.8" />

          <!-- Face Gem Sticker if active -->
          ${s.faceSticker ? `<text x="142" y="96" font-size="11">${s.faceSticker}</text>` : ''}
        </g>

        <!-- Shoes Slot -->
        <g id="svg-shoes">${shoes ? shoes.svg : ''}</g>

        <!-- Outfit Slot -->
        <g id="svg-outfit">${outfit ? outfit.svg : ''}</g>

        <!-- Front Hair Layer (Seamless Snap-Fit Crown & Bangs) -->
        <g id="svg-front-hair">${hair ? hair.front(color) : ''}</g>

        <!-- Accessories Slot -->
        <g id="svg-accessories">${acc ? acc.svg : ''}</g>
      </svg>
    `;
  }

  renderAllDollViews() {
    const svgContent = this.renderDollSVG();
    const containers = [
      'salonDollContainer',
      'spaDollContainer',
      'makeupDollContainer',
      'wardrobeDollContainer',
      'photoDollContainer'
    ];
    containers.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = svgContent;
    });
  }

  // ================= HUB 1: SALON THUMBNAILS & DYES =================
  renderHairDyePalette() {
    const palette = document.getElementById('hairDyePalette');
    palette.innerHTML = '';
    HAIR_COLORS.forEach(c => {
      const swatch = document.createElement('div');
      swatch.className = `dye-swatch ${this.dollState.hairColor === c.hex ? 'active' : ''}`;
      swatch.style.backgroundColor = c.hex;
      swatch.title = c.name;
      swatch.addEventListener('click', (e) => {
        this.sound.playSparkle();
        this.fx.burst(e.clientX, e.clientY, 15);
        this.dollState.hairColor = c.hex;
        this.renderAllDollViews();
        this.renderHairDyePalette();
        this.renderHairstylesGrid();
      });
      palette.appendChild(swatch);
    });
  }

  // Card thumbnails with zoom on head and perfect snap-fit alignment
  renderHairstylesGrid(filter = 'all') {
    const grid = document.getElementById('hairstyleGrid');
    grid.innerHTML = '';

    const list = filter === 'all' 
      ? HAIRSTYLES_DATA 
      : HAIRSTYLES_DATA.filter(h => h.category === filter);

    list.forEach(hair => {
      const card = document.createElement('div');
      card.className = `hair-card ${this.dollState.hair.id === hair.id ? 'equipped' : ''}`;
      
      const thumbSvg = `
        <svg viewBox="55 25 130 130" class="hair-thumb-svg">
          <g>${hair.back(this.dollState.hairColor)}</g>
          <!-- Mini Face Mesh matching doll coordinates -->
          <path d="M 80 82 C 78 116, 94 138, 120 140 C 146 138, 162 116, 160 82 C 160 48, 80 48, 80 82 Z" fill="#fee8dd" />
          <ellipse cx="103" cy="95" rx="5" ry="6" fill="#2c1424" />
          <ellipse cx="137" cy="95" rx="5" ry="6" fill="#2c1424" />
          <circle cx="101" cy="93" r="1.8" fill="#fff" />
          <circle cx="135" cy="93" r="1.8" fill="#fff" />
          <ellipse cx="96" cy="103" rx="6" ry="3.5" fill="#ff7aa2" opacity="0.6" />
          <ellipse cx="144" cy="103" rx="6" ry="3.5" fill="#ff7aa2" opacity="0.6" />
          <path d="M 115 116 Q 120 120 125 116 Z" fill="#ff3385" />
          <g>${hair.front(this.dollState.hairColor)}</g>
        </svg>
      `;

      card.innerHTML = `${thumbSvg}<span class="hair-name-lbl">${hair.name}</span>`;
      card.addEventListener('click', (e) => {
        this.sound.playSparkle();
        this.fx.burst(e.clientX, e.clientY, 18);
        this.dollState.hair = hair;
        this.renderAllDollViews();
        this.renderHairstylesGrid(filter);
      });
      grid.appendChild(card);
    });
  }

  // ================= HUB 3: MAKEUP PALETTES =================
  renderMakeupSwatches(tab) {
    const container = document.getElementById('makeupSwatchesContainer');
    container.innerHTML = '';

    if (tab === 'lipstick') {
      LIPSTICKS_DATA.forEach(lip => {
        const card = document.createElement('div');
        card.className = `swatch-card ${this.dollState.lipstick === lip.hex ? 'equipped' : ''}`;
        card.innerHTML = `
          <div class="swatch-circle" style="background-color: ${lip.hex};"></div>
          <span class="swatch-name">${lip.name}</span>
        `;
        card.addEventListener('click', (e) => {
          this.sound.playPop();
          this.fx.burst(e.clientX, e.clientY, 12);
          this.dollState.lipstick = lip.hex;
          this.renderAllDollViews();
          this.renderMakeupSwatches('lipstick');
        });
        container.appendChild(card);
      });
    } else if (tab === 'eyeshadow') {
      const eyes = [
        { name: 'Sky Cyan', hex: '#00f3ff' },
        { name: 'Pop Magenta', hex: '#ff007f' },
        { name: 'Golden Sun', hex: '#ffd166' },
        { name: 'Lavender', hex: '#ba68c8' },
        { name: 'Emerald', hex: '#10b981' },
        { name: 'Velvet Plum', hex: '#7c3aed' },
        { name: 'None', hex: 'transparent' }
      ];
      eyes.forEach(item => {
        const card = document.createElement('div');
        card.className = `swatch-card ${this.dollState.eyeshadow === item.hex ? 'equipped' : ''}`;
        card.innerHTML = `
          <div class="swatch-circle" style="background-color: ${item.hex};"></div>
          <span class="swatch-name">${item.name}</span>
        `;
        card.addEventListener('click', (e) => {
          this.sound.playSparkle();
          this.fx.burst(e.clientX, e.clientY, 12);
          this.dollState.eyeshadow = item.hex;
          this.renderAllDollViews();
          this.renderMakeupSwatches('eyeshadow');
        });
        container.appendChild(card);
      });
    } else if (tab === 'blush') {
      const blushes = [
        { name: 'Peach Glow', hex: '#ff80ab' },
        { name: 'Rose Petal', hex: '#ff4081' },
        { name: 'Warm Coral', hex: '#ff7043' },
        { name: 'Berry Flush', hex: '#e91e63' }
      ];
      blushes.forEach(item => {
        const card = document.createElement('div');
        card.className = `swatch-card ${this.dollState.blush === item.hex ? 'equipped' : ''}`;
        card.innerHTML = `
          <div class="swatch-circle" style="background-color: ${item.hex};"></div>
          <span class="swatch-name">${item.name}</span>
        `;
        card.addEventListener('click', (e) => {
          this.sound.playPop();
          this.fx.burst(e.clientX, e.clientY, 12);
          this.dollState.blush = item.hex;
          this.renderAllDollViews();
          this.renderMakeupSwatches('blush');
        });
        container.appendChild(card);
      });
    } else if (tab === 'stickers') {
      const gems = ['⭐', '💖', '✨', '🦋', '💎', '🌸', ''];
      gems.forEach(gem => {
        const card = document.createElement('div');
        card.className = `swatch-card ${this.dollState.faceSticker === gem ? 'equipped' : ''}`;
        card.innerHTML = `
          <div style="font-size: 22px;">${gem || '❌'}</div>
          <span class="swatch-name">${gem ? 'Gem' : 'Remove'}</span>
        `;
        card.addEventListener('click', (e) => {
          this.sound.playSparkle();
          this.fx.burst(e.clientX, e.clientY, 12);
          this.dollState.faceSticker = gem;
          this.renderAllDollViews();
          this.renderMakeupSwatches('stickers');
        });
        container.appendChild(card);
      });
    }
  }

  // ================= HUB 4: WARDROBE (CLOSET 20+ ITEMS) =================
  renderClosetItems(category) {
    const grid = document.getElementById('closetItemsGrid');
    grid.innerHTML = '';

    let items = [];
    if (category === 'outfits') items = OUTFITS_DATA;
    if (category === 'shoes') items = SHOES_DATA;
    if (category === 'accessories') items = ACCESSORIES_DATA;

    items.forEach(item => {
      const card = document.createElement('div');
      const isEquipped = (category === 'outfits' && this.dollState.outfit.id === item.id) ||
                         (category === 'shoes' && this.dollState.shoes.id === item.id) ||
                         (category === 'accessories' && this.dollState.accessories.id === item.id);

      card.className = `closet-card ${isEquipped ? 'equipped' : ''}`;
      
      let viewBox = "50 140 140 140";
      if (category === 'shoes') viewBox = "85 300 70 70";
      if (category === 'accessories') viewBox = "70 30 100 100";

      card.innerHTML = `
        <svg viewBox="${viewBox}" class="closet-thumb-svg">
          ${item.svg}
        </svg>
        <span class="closet-item-lbl">${item.name}</span>
      `;

      card.addEventListener('click', (e) => {
        this.sound.playSparkle();
        this.fx.burst(e.clientX, e.clientY, 18);
        if (category === 'outfits') this.dollState.outfit = item;
        if (category === 'shoes') this.dollState.shoes = item;
        if (category === 'accessories') this.dollState.accessories = item;
        this.renderAllDollViews();
        this.renderClosetItems(category);
      });
      grid.appendChild(card);
    });
  }

  // ================= HUB 5: KITCHEN ENGINE =================
  bindKitchenEvents() {
    const tabs = document.querySelectorAll('.recipe-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const dish = tab.dataset.dish;
        document.querySelectorAll('.dish-station').forEach(st => st.classList.add('hidden'));
        const target = document.getElementById(`station-${dish}`);
        if (target) target.classList.remove('hidden');
        this.sound.playPop();
      });
    });

    // Dish 1: Cake
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
      if (this.kitchenState.dishes.cake.stacked) return;
      this.sound.playPop();
      this.fx.burst(e.clientX, e.clientY, 15);
      cakeBottom.classList.remove('hidden');
      cakeTop.classList.remove('hidden');
      this.kitchenState.dishes.cake.stacked = true;
      cakeSpongeTool.disabled = true;
      cakeFrostingTool.disabled = false;
      cakeFrostingTool.classList.add('active-tool');
      cakeInstruction.textContent = '2. Tap Frosting to glaze the cake! 🍦';
    });

    cakeFrostingTool.addEventListener('click', (e) => {
      if (!this.kitchenState.dishes.cake.stacked || this.kitchenState.dishes.cake.frosted) return;
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 20);
      cakeBottom.classList.add('frosted');
      cakeTop.classList.add('frosted');
      this.kitchenState.dishes.cake.frosted = true;
      cakeFrostingTool.disabled = true;
      cakeCandlesTool.disabled = false;
      cakeCandlesTool.classList.add('active-tool');
      cakeInstruction.textContent = '3. Tap Candles to light the celebration! 🕯️';
    });

    cakeCandlesTool.addEventListener('click', (e) => {
      if (!this.kitchenState.dishes.cake.frosted || this.kitchenState.dishes.cake.candles) return;
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25, true);
      cakeCandles.classList.remove('hidden');
      this.kitchenState.dishes.cake.candles = true;
      this.kitchenState.dishes.cake.completed = true;
      cakeCandlesTool.disabled = true;
      cakeInstruction.textContent = '4. Add sweet strawberries & candy stars! 🍓';
      cakeToppingsShelf.classList.remove('hidden');
      document.getElementById('tray-slot-cake').classList.add('completed');
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

    // Dish 2: Cupcake
    const cupcakeTarget = document.getElementById('cupcake-baking-target');
    const cupcakeInstruction = document.getElementById('cupcake-instruction');
    const cupcakeBatterTool = document.getElementById('cupcakeBatterTool');
    const cupcakeBakeTool = document.getElementById('cupcakeBakeTool');
    const cupcakeFrostingTool = document.getElementById('cupcakeFrostingTool');
    const cupcakeToppingsShelf = document.getElementById('cupcake-toppings-shelf');
    const ovenHeat = document.getElementById('oven-glow-heat');

    cupcakeBatterTool.addEventListener('click', (e) => {
      if (this.kitchenState.dishes.cupcake.poured) return;
      this.sound.playPop();
      this.fx.burst(e.clientX, e.clientY, 15);
      cupcakeTarget.classList.add('state-poured');
      this.kitchenState.dishes.cupcake.poured = true;
      cupcakeBatterTool.disabled = true;
      cupcakeBakeTool.disabled = false;
      cupcakeBakeTool.classList.add('active-tool');
      cupcakeInstruction.textContent = '2. Tap Bake to heat the oven! 🔥';
    });

    cupcakeBakeTool.addEventListener('click', (e) => {
      if (!this.kitchenState.dishes.cupcake.poured || this.kitchenState.dishes.cupcake.baked) return;
      cupcakeBakeTool.disabled = true;
      ovenHeat.classList.remove('hidden');
      this.sound.playSizzle();
      this.fx.burst(e.clientX, e.clientY, 20);
      cupcakeInstruction.textContent = 'Baking in the oven... ♨️';

      setTimeout(() => {
        ovenHeat.classList.add('hidden');
        cupcakeTarget.classList.remove('state-poured');
        cupcakeTarget.classList.add('state-baked');
        this.kitchenState.dishes.cupcake.baked = true;
        this.sound.playDing();
        this.sound.playSparkle();
        cupcakeInstruction.textContent = '3. Freshly baked! Tap Frost! 🧁';
        cupcakeFrostingTool.disabled = false;
        cupcakeFrostingTool.classList.add('active-tool');
      }, 1200);
    });

    cupcakeFrostingTool.addEventListener('click', (e) => {
      if (!this.kitchenState.dishes.cupcake.baked || this.kitchenState.dishes.cupcake.frosted) return;
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25);
      document.getElementById('cupcake-frosting').classList.remove('hidden');
      this.kitchenState.dishes.cupcake.frosted = true;
      this.kitchenState.dishes.cupcake.completed = true;
      cupcakeFrostingTool.disabled = true;
      cupcakeInstruction.textContent = '4. Add gorgeous cupcake toppings! 🍒';
      cupcakeToppingsShelf.classList.remove('hidden');
      document.getElementById('tray-slot-cupcake').classList.add('completed');
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

    // Dish 3: Meatballs
    const meatballGroup = document.getElementById('meatballs-pan-group');
    const marinaraSauce = document.getElementById('marinara-sauce-layer');
    const meatballGarnish = document.getElementById('meatball-garnish-layer');
    const meatballInstruction = document.getElementById('meatball-instruction');
    const meatballDropTool = document.getElementById('meatballDropTool');
    const meatballStirTool = document.getElementById('meatballStirTool');
    const meatballSauceTool = document.getElementById('meatballSauceTool');
    const meatballToppingsShelf = document.getElementById('meatball-toppings-shelf');

    meatballDropTool.addEventListener('click', (e) => {
      if (this.kitchenState.dishes.meatballs.dropped) return;
      this.sound.playPop();
      this.sound.playSizzle();
      this.fx.burst(e.clientX, e.clientY, 20);
      meatballGroup.innerHTML = `
        <div class="meatball-item"></div>
        <div class="meatball-item"></div>
        <div class="meatball-item"></div>
        <div class="meatball-item"></div>
      `;
      this.kitchenState.dishes.meatballs.dropped = true;
      meatballDropTool.disabled = true;
      meatballStirTool.disabled = false;
      meatballStirTool.classList.add('active-tool');
      meatballInstruction.textContent = '2. Tap Sizzle to brown the meatballs! 🥄';
    });

    meatballStirTool.addEventListener('click', (e) => {
      if (!this.kitchenState.dishes.meatballs.dropped || this.kitchenState.dishes.meatballs.stirred) return;
      this.sound.playSizzle();
      this.fx.burst(e.clientX, e.clientY, 20);
      document.querySelectorAll('.meatball-item').forEach(m => m.classList.add('sizzling'));
      meatballStirTool.disabled = true;
      meatballInstruction.textContent = 'Sizzling hot! ♨️';

      setTimeout(() => {
        document.querySelectorAll('.meatball-item').forEach(m => m.classList.remove('sizzling'));
        this.kitchenState.dishes.meatballs.stirred = true;
        this.sound.playSparkle();
        meatballSauceTool.disabled = false;
        meatballSauceTool.classList.add('active-tool');
        meatballInstruction.textContent = '3. Tap Sauce to pour rich marinara! 🥫';
      }, 1000);
    });

    meatballSauceTool.addEventListener('click', (e) => {
      if (!this.kitchenState.dishes.meatballs.stirred || this.kitchenState.dishes.meatballs.sauced) return;
      this.sound.playSauceSquirt();
      this.sound.playBoil();
      this.fx.burst(e.clientX, e.clientY, 25);
      marinaraSauce.classList.remove('hidden');
      this.kitchenState.dishes.meatballs.sauced = true;
      this.kitchenState.dishes.meatballs.completed = true;
      meatballSauceTool.disabled = true;
      meatballInstruction.textContent = '4. Garnish with basil, cheese & bread! 🧀';
      meatballToppingsShelf.classList.remove('hidden');
      document.getElementById('tray-slot-meatballs').classList.add('completed');
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

    // Dish 4: Pizza & Pasta
    const pizzaSauceLayer = document.getElementById('pizza-sauce-layer');
    const pizzaCheeseLayer = document.getElementById('pizza-cheese-layer');
    const pizzaToppingsLayer = document.getElementById('pizza-toppings-layer');
    const twirledSpaghetti = document.getElementById('twirled-spaghetti');
    const pizzaInstruction = document.getElementById('pizza-instruction');
    const pizzaSauceTool = document.getElementById('pizzaSauceTool');
    const pizzaBakeTool = document.getElementById('pizzaBakeTool');
    const pastaAddTool = document.getElementById('pastaAddTool');
    const italianToppingsShelf = document.getElementById('italian-toppings-shelf');

    pizzaSauceTool.addEventListener('click', (e) => {
      if (this.kitchenState.dishes.pizzapasta.sauced) return;
      this.sound.playSauceSquirt();
      this.fx.burst(e.clientX, e.clientY, 15);
      pizzaSauceLayer.classList.remove('hidden');
      pizzaCheeseLayer.classList.remove('hidden');
      this.kitchenState.dishes.pizzapasta.sauced = true;
      pizzaSauceTool.disabled = true;
      pizzaBakeTool.disabled = false;
      pizzaBakeTool.classList.add('active-tool');
      pizzaInstruction.textContent = '2. Tap Bake to melt the mozzarella! 🔥';
    });

    pizzaBakeTool.addEventListener('click', (e) => {
      if (!this.kitchenState.dishes.pizzapasta.sauced || this.kitchenState.dishes.pizzapasta.baked) return;
      this.sound.playSizzle();
      this.fx.burst(e.clientX, e.clientY, 20);
      pizzaBakeTool.disabled = true;
      pizzaInstruction.textContent = 'Baking stone pizza... ♨️';

      setTimeout(() => {
        pizzaCheeseLayer.classList.add('baked');
        this.sound.playDing();
        this.sound.playSparkle();
        this.kitchenState.dishes.pizzapasta.baked = true;
        pastaAddTool.disabled = false;
        pastaAddTool.classList.add('active-tool');
        pizzaInstruction.textContent = '3. Tap Pasta to serve twirled spaghetti! 🍝';
      }, 1000);
    });

    pastaAddTool.addEventListener('click', (e) => {
      if (!this.kitchenState.dishes.pizzapasta.baked || this.kitchenState.dishes.pizzapasta.pastaAdded) return;
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25);
      twirledSpaghetti.classList.remove('hidden');
      this.kitchenState.dishes.pizzapasta.pastaAdded = true;
      this.kitchenState.dishes.pizzapasta.completed = true;
      pastaAddTool.disabled = true;
      pizzaInstruction.textContent = '4. Add pepperoni, mushrooms & olives! 🍕';
      italianToppingsShelf.classList.remove('hidden');
      document.getElementById('tray-slot-pizzapasta').classList.add('completed');
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

    // Dish 5: French Fries & Nuggets
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
      if (this.kitchenState.dishes.fastfood.fried) return;
      this.sound.playSizzle();
      this.sound.playCrunch();
      this.fx.burst(e.clientX, e.clientY, 20);
      fryerBasket.classList.remove('hidden');
      fryerOil.classList.add('bubbling');
      fryDropTool.disabled = true;
      fryInstruction.textContent = 'Deep frying until golden crispy... ♨️';

      setTimeout(() => {
        fryerOil.classList.remove('bubbling');
        this.kitchenState.dishes.fastfood.fried = true;
        this.sound.playSparkle();
        fryServeTool.disabled = false;
        fryServeTool.classList.add('active-tool');
        fryInstruction.textContent = '2. Tap Serve to fill the diner basket! 📦';
      }, 1000);
    });

    fryServeTool.addEventListener('click', (e) => {
      if (!this.kitchenState.dishes.fastfood.fried || this.kitchenState.dishes.fastfood.served) return;
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25);
      fryerBasket.classList.add('hidden');
      dinerFoodTray.innerHTML = `
        <span>🍟</span>
        <span>🍗</span>
        <span>🍟</span>
        <span>🍗</span>
      `;
      this.kitchenState.dishes.fastfood.served = true;
      fryServeTool.disabled = true;
      frySeasonTool.disabled = false;
      frySeasonTool.classList.add('active-tool');
      fryInstruction.textContent = '3. Tap Salt to season with sparkle! 🧂';
    });

    frySeasonTool.addEventListener('click', (e) => {
      if (!this.kitchenState.dishes.fastfood.served || this.kitchenState.dishes.fastfood.salted) return;
      this.sound.playSparkle();
      this.fx.burst(e.clientX, e.clientY, 25, true);
      this.kitchenState.dishes.fastfood.salted = true;
      this.kitchenState.dishes.fastfood.completed = true;
      frySeasonTool.disabled = true;
      fryInstruction.textContent = '4. Dip in yummy Ketchup, Honey Dip or BBQ! 🍅';
      dinerSauceShelf.classList.remove('hidden');
      document.getElementById('tray-slot-fastfood').classList.add('completed');
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
  }
}

// Start simulation on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  new GlamDollApp();
});
