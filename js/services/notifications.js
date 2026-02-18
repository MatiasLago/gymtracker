import { loadSavedData } from './storage.js';

const NOTIF_PREFS_KEY = 'gymTrackerNotifPrefs';
let notificationTimeout = null;

export function getNotificationPrefs() {
    const saved = localStorage.getItem(NOTIF_PREFS_KEY);
    if (saved) return JSON.parse(saved);
    return {
        enabled: false,
        hour: '18:00',
        days: [1, 2, 3, 4, 5] // L-V by default
    };
}

export function saveNotificationPrefs(prefs) {
    localStorage.setItem(NOTIF_PREFS_KEY, JSON.stringify(prefs));
    if (prefs.enabled) {
        scheduleNotification();
    } else {
        clearScheduledNotification();
    }
}

export async function requestNotificationPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;

    const result = await Notification.requestPermission();
    return result === 'granted';
}

function hasWorkedOutToday() {
    const data = loadSavedData();
    const today = new Date().toISOString().split('T')[0];

    return Object.values(data.completedDays || {}).some(completions =>
        completions.some(c => c.date === today)
    );
}

function clearScheduledNotification() {
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
        notificationTimeout = null;
    }
}

export function scheduleNotification() {
    clearScheduledNotification();

    const prefs = getNotificationPrefs();
    if (!prefs.enabled) return;

    const now = new Date();
    const currentDay = now.getDay() === 0 ? 7 : now.getDay(); // 1=Mon, 7=Sun

    if (!prefs.days.includes(currentDay)) return;

    const [hours, minutes] = prefs.hour.split(':').map(Number);
    const target = new Date(now);
    target.setHours(hours, minutes, 0, 0);

    let delay = target - now;
    if (delay < 0) return; // Already past the time today

    notificationTimeout = setTimeout(() => {
        if (hasWorkedOutToday()) return;

        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.ready.then(reg => {
                reg.showNotification('GymTracker', {
                    body: 'No te olvides de entrenar hoy!',
                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" rx="12" fill="%236c5ce7"/><text x="32" y="44" font-size="36" text-anchor="middle" fill="white" font-weight="bold">G</text></svg>',
                    tag: 'gym-reminder',
                    requireInteraction: false
                });
            });
        } else if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('GymTracker', {
                body: 'No te olvides de entrenar hoy!'
            });
        }
    }, delay);
}

export function initNotifications() {
    const prefs = getNotificationPrefs();
    if (prefs.enabled) {
        scheduleNotification();
    }
}

export function renderSettingsModal() {
    const prefs = getNotificationPrefs();
    const toggle = document.getElementById('notifToggle');
    const timeInput = document.getElementById('notifTime');

    if (toggle) toggle.checked = prefs.enabled;
    if (timeInput) timeInput.value = prefs.hour;

    const dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const dayValues = [1, 2, 3, 4, 5, 6, 7];

    document.querySelectorAll('.day-checkbox').forEach((cb, i) => {
        cb.checked = prefs.days.includes(dayValues[i]);
    });
}

export function saveSettingsFromModal() {
    const toggle = document.getElementById('notifToggle');
    const timeInput = document.getElementById('notifTime');
    const dayValues = [1, 2, 3, 4, 5, 6, 7];

    const days = [];
    document.querySelectorAll('.day-checkbox').forEach((cb, i) => {
        if (cb.checked) days.push(dayValues[i]);
    });

    const prefs = {
        enabled: toggle.checked,
        hour: timeInput.value || '18:00',
        days
    };

    saveNotificationPrefs(prefs);
}
