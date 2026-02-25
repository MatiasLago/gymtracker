let totalSeconds = 90;
let remaining = 90;
let intervalId = null;
let isRunning = false;

const CIRCUMFERENCE = 2 * Math.PI * 88; // r=88

function pad(n) {
    return String(n).padStart(2, '0');
}

function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${pad(s)}`;
}

function updateDisplay() {
    const display = document.getElementById('timerDisplay');
    const ring = document.getElementById('timerRingProgress');
    if (!display || !ring) return;

    display.textContent = formatTime(remaining);

    const progress = totalSeconds > 0 ? remaining / totalSeconds : 0;
    const offset = CIRCUMFERENCE * (1 - progress);
    ring.style.strokeDashoffset = offset;
}

function onFinish() {
    isRunning = false;
    clearInterval(intervalId);
    intervalId = null;

    const btn = document.getElementById('timerStartPause');
    if (btn) btn.textContent = 'Iniciar';

    // Beep via Web Audio API
    try {
        const ctx = new AudioContext();
        [0, 0.5, 1.0].forEach(delay => {
            const osc = ctx.createOscillator();
            osc.frequency.value = 880;
            osc.connect(ctx.destination);
            osc.start(ctx.currentTime + delay);
            osc.stop(ctx.currentTime + delay + 0.3);
        });
    } catch (_) {}

    // Vibration
    if ('vibrate' in navigator) {
        navigator.vibrate([300, 100, 300, 100, 300]);
    }
}

function tick() {
    remaining -= 1;
    if (remaining <= 0) {
        remaining = 0;
        updateDisplay();
        onFinish();
    } else {
        updateDisplay();
    }
}

export function setTime(seconds) {
    totalSeconds = seconds;
    remaining = seconds;
    if (isRunning) {
        clearInterval(intervalId);
        intervalId = null;
        isRunning = false;
        const btn = document.getElementById('timerStartPause');
        if (btn) btn.textContent = 'Iniciar';
    }
    updateDisplay();
}

export function startPause() {
    const btn = document.getElementById('timerStartPause');
    if (isRunning) {
        clearInterval(intervalId);
        intervalId = null;
        isRunning = false;
        if (btn) btn.textContent = 'Iniciar';
    } else {
        if (remaining <= 0) {
            remaining = totalSeconds;
            updateDisplay();
        }
        isRunning = true;
        if (btn) btn.textContent = 'Pausar';
        intervalId = setInterval(tick, 1000);
    }
}

export function reset() {
    clearInterval(intervalId);
    intervalId = null;
    isRunning = false;
    remaining = totalSeconds;
    const btn = document.getElementById('timerStartPause');
    if (btn) btn.textContent = 'Iniciar';
    updateDisplay();
}

export function initTimer() {
    // Init SVG ring
    const ring = document.getElementById('timerRingProgress');
    if (ring) {
        ring.style.strokeDasharray = CIRCUMFERENCE;
        ring.style.strokeDashoffset = 0;
    }

    updateDisplay();

    // Preset buttons
    document.querySelectorAll('.timer-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.timer-preset-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setTime(parseInt(btn.dataset.seconds));
        });
    });

    // Custom input
    document.getElementById('timerCustomSet')?.addEventListener('click', () => {
        const input = document.getElementById('timerCustomInput');
        const val = parseInt(input.value);
        if (val > 0) {
            document.querySelectorAll('.timer-preset-btn').forEach(b => b.classList.remove('active'));
            setTime(val);
            input.value = '';
        }
    });

    document.getElementById('timerCustomInput')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('timerCustomSet')?.click();
        }
    });

    // Controls
    document.getElementById('timerStartPause')?.addEventListener('click', startPause);
    document.getElementById('timerReset')?.addEventListener('click', reset);
}
