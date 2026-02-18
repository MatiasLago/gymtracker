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

export function getWeekCalendarData() {
    const data = loadSavedData();
    const dateSet = new Set();

    Object.values(data.completedDays || {}).forEach(completions => {
        completions.forEach(c => {
            if (c.date) dateSet.add(c.date);
        });
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

    const dayLabels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const week = [];

    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const dateStr = d.toISOString().split('T')[0];
        const isToday = d.getTime() === today.getTime();
        week.push({
            dayLabel: dayLabels[i],
            date: dateStr,
            hasWorkout: dateSet.has(dateStr),
            isToday
        });
    }

    return week;
}

export function renderStreakCard() {
    const { currentStreak, bestStreak } = calculateStreak();
    const weekData = getWeekCalendarData();

    document.getElementById('streakCount').textContent = currentStreak;
    document.getElementById('streakBest').textContent = `Mejor racha: ${bestStreak} dias`;

    const weekContainer = document.getElementById('streakWeek');
    weekContainer.innerHTML = weekData.map(day => {
        const classes = ['streak-day'];
        if (day.hasWorkout) classes.push('active');
        if (day.isToday) classes.push('today');

        return `
            <div class="${classes.join(' ')}">
                <span class="streak-day-label">${day.dayLabel}</span>
                <div class="streak-day-dot"></div>
            </div>
        `;
    }).join('');
}
