import { routineData } from '../data/routineData.js';
import { loadSavedData } from '../services/storage.js';

let currentChart = null;
let currentChartType = 'line';

export function getAllExercises() {
    const exercises = new Set();

    Object.values(routineData).forEach(meso => {
        Object.values(meso).forEach(week => {
            Object.values(week).forEach(day => {
                day.forEach(ex => exercises.add(ex.name));
            });
        });
    });

    return Array.from(exercises).sort();
}

export function renderExerciseSelect() {
    const select = document.getElementById('exerciseProgressSelect');
    const exercises = getAllExercises();

    select.innerHTML = exercises.map(ex =>
        `<option value="${ex}">${ex}</option>`
    ).join('');
}

function getProgressData(exerciseName) {
    const data = loadSavedData();
    const progressData = [];

    Object.entries(data.workouts).forEach(([dayKey, dayData]) => {
        Object.entries(dayData).forEach(([index, exerciseData]) => {
            const match = dayKey.match(/m(\d)w(\d)d(\d)/);
            if (match && exerciseData.sets) {
                const meso = `mesociclo${match[1]}`;
                const week = `semana${match[2]}`;
                const day = `dia${match[3]}`;
                const exercise = routineData[meso]?.[week]?.[day]?.[parseInt(index)];

                if (exercise && exercise.name === exerciseName) {
                    const weights = exerciseData.sets.filter(s => s.weight).map(s => s.weight);
                    const maxWeight = weights.length > 0 ? Math.max(...weights) : 0;
                    if (maxWeight > 0) {
                        progressData.push({
                            date: exerciseData.date,
                            weight: maxWeight,
                            dayKey
                        });
                    }
                }
            }
        });
    });

    progressData.sort((a, b) => new Date(a.date) - new Date(b.date));
    return progressData;
}

export function renderProgress() {
    const exerciseName = document.getElementById('exerciseProgressSelect').value;
    const canvas = document.getElementById('progressCanvas');
    const container = document.getElementById('progressChart');

    if (!exerciseName) {
        container.innerHTML = '<div class="no-data">Selecciona un ejercicio</div>';
        return;
    }

    const progressData = getProgressData(exerciseName);

    if (progressData.length === 0) {
        if (currentChart) {
            currentChart.destroy();
            currentChart = null;
        }
        // Hide canvas, show message
        canvas.style.display = 'none';
        let noData = container.querySelector('.no-data');
        if (!noData) {
            noData = document.createElement('div');
            noData.className = 'no-data';
            container.appendChild(noData);
        }
        noData.textContent = 'No hay datos de progreso para este ejercicio';
        noData.style.display = '';
        return;
    }

    // Show canvas, hide no-data
    canvas.style.display = '';
    const noData = container.querySelector('.no-data');
    if (noData) noData.style.display = 'none';

    const labels = progressData.map(entry => {
        const date = new Date(entry.date);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    });
    const weights = progressData.map(entry => entry.weight);

    // Read CSS variables for theming
    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue('--accent').trim();
    const textPrimary = styles.getPropertyValue('--text-primary').trim();
    const textSecondary = styles.getPropertyValue('--text-secondary').trim();
    const border = styles.getPropertyValue('--border').trim();

    if (currentChart) {
        currentChart.destroy();
    }

    const ctx = canvas.getContext('2d');
    currentChart = new Chart(ctx, {
        type: currentChartType,
        data: {
            labels,
            datasets: [{
                label: 'Peso (kg)',
                data: weights,
                borderColor: accent,
                backgroundColor: currentChartType === 'line'
                    ? accent + '20'
                    : accent + '80',
                borderWidth: 2,
                tension: 0.3,
                fill: currentChartType === 'line',
                pointBackgroundColor: accent,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textSecondary,
                        font: { size: 11 }
                    },
                    grid: {
                        color: border
                    }
                },
                y: {
                    ticks: {
                        color: textSecondary,
                        font: { size: 11 },
                        callback: (value) => value + ' kg'
                    },
                    grid: {
                        color: border
                    }
                }
            }
        }
    });
}

export function setChartType(type) {
    currentChartType = type;
    renderProgress();
}
