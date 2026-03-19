import { loadSavedData } from '../services/storage.js';

export function calculateStreak() {
    const data = loadSavedData();
    const dateSet = new Set();

    Object.values(data.completedDays || {}).forEach(completions => {
        completions.forEach(c => {
            if (c.date) dateSet.add(c.date);
        });
    });

    if (dateSet.size === 0) {
        return { currentStreak: 0, bestStreak: 0, lastWorkoutDate: null };
    }

    const dates = Array.from(dateSet).sort((a, b) => new Date(b) - new Date(a));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const mostRecent = new Date(dates[0]);
    mostRecent.setHours(0, 0, 0, 0);

    const daysSinceLast = Math.floor((today - mostRecent) / (1000 * 60 * 60 * 24));

    let currentStreak = 0;
    if (daysSinceLast <= 2) {
        currentStreak = 1;
        for (let i = 0; i < dates.length - 1; i++) {
            const current = new Date(dates[i]);
            const next = new Date(dates[i + 1]);
            current.setHours(0, 0, 0, 0);
            next.setHours(0, 0, 0, 0);
            const gap = Math.floor((current - next) / (1000 * 60 * 60 * 24));
            if (gap <= 2) {
                currentStreak++;
            } else {
                break;
            }
        }
    }

    let bestStreak = 1;
    let tempStreak = 1;
    for (let i = 0; i < dates.length - 1; i++) {
        const current = new Date(dates[i]);
        const next = new Date(dates[i + 1]);
        current.setHours(0, 0, 0, 0);
        next.setHours(0, 0, 0, 0);
        const gap = Math.floor((current - next) / (1000 * 60 * 60 * 24));
        if (gap <= 2) {
            tempStreak++;
        } else {
            tempStreak = 1;
        }
        if (tempStreak > bestStreak) bestStreak = tempStreak;
    }

    if (currentStreak > bestStreak) bestStreak = currentStreak;

    return { currentStreak, bestStreak, lastWorkoutDate: dates[0] };
}


export function renderStreakCard() {
    const { currentStreak } = calculateStreak();
    document.getElementById('streakCount').textContent = currentStreak;
}

let calendarMonth = null;
let calendarYear = null;

export function renderRachaTab() {
    const { currentStreak, bestStreak } = calculateStreak();
    document.getElementById('rachaCurrentStreak').textContent = currentStreak;
    document.getElementById('rachaBestStreak').textContent = bestStreak;

    const now = new Date();
    if (calendarMonth === null) calendarMonth = now.getMonth();
    if (calendarYear === null) calendarYear = now.getFullYear();

    renderMonthCalendar(calendarYear, calendarMonth);

    document.getElementById('rachaPrevMonth').onclick = () => {
        calendarMonth--;
        if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
        renderMonthCalendar(calendarYear, calendarMonth);
    };
    document.getElementById('rachaNextMonth').onclick = () => {
        calendarMonth++;
        if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
        renderMonthCalendar(calendarYear, calendarMonth);
    };
}

function renderMonthCalendar(year, month) {
    const data = loadSavedData();
    const dateSet = new Set();
    Object.values(data.completedDays || {}).forEach(completions => {
        completions.forEach(c => { if (c.date) dateSet.add(c.date); });
    });

    const monthNames = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    document.getElementById('rachaMonthTitle').textContent = `${monthNames[month]} ${year}`;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = new Date(year, month, 1);
    // Monday-based: 0=Mon ... 6=Sun
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const container = document.getElementById('rachaCalendarDays');
    let html = '';

    for (let i = 0; i < startOffset; i++) {
        html += `<div class="racha-cal-day empty"></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const dateStr = date.toISOString().split('T')[0];
        const isToday = date.getTime() === today.getTime();
        const hasWorkout = dateSet.has(dateStr);
        const classes = ['racha-cal-day'];
        if (hasWorkout) classes.push('has-workout');
        if (isToday) classes.push('is-today');
        html += `<div class="${classes.join(' ')}">${d}</div>`;
    }

    container.innerHTML = html;
}
