import { routineData } from '../data/routineData.js';
import { loadSavedData } from '../services/storage.js';

export function calculatePRs() {
    const data = loadSavedData();
    const prs = new Map();

    Object.entries(data.workouts || {}).forEach(([dayKey, dayData]) => {
        Object.entries(dayData).forEach(([index, exerciseData]) => {
            const match = dayKey.match(/m(\d)w(\d)d(\d)/);
            if (match && exerciseData.sets) {
                const meso = `mesociclo${match[1]}`;
                const week = `semana${match[2]}`;
                const day = `dia${match[3]}`;
                const exercise = routineData[meso]?.[week]?.[day]?.[parseInt(index)];

                if (exercise) {
                    exerciseData.sets.forEach(set => {
                        if (set.weight && set.weight > 0) {
                            const current = prs.get(exercise.name);
                            if (!current || set.weight > current.maxWeight) {
                                prs.set(exercise.name, {
                                    maxWeight: set.weight,
                                    reps: set.reps || 0,
                                    date: exerciseData.date
                                });
                            }
                        }
                    });
                }
            }
        });
    });

    return prs;
}

export function checkForNewPR(exerciseName, weight, reps) {
    const prs = calculatePRs();
    const current = prs.get(exerciseName);

    // If no previous PR or new weight is strictly higher
    if (!current || weight > current.maxWeight) {
        showPRToast(exerciseName, weight);
        return true;
    }
    return false;
}

function showPRToast(exerciseName, weight) {
    let toast = document.getElementById('prToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'prToast';
        toast.className = 'pr-toast';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <span class="pr-toast-icon">&#127942;</span>
        <div class="pr-toast-text">
            <strong>Nuevo PR!</strong>
            <span>${exerciseName}: ${weight} kg</span>
        </div>
    `;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

export function renderRecords() {
    const container = document.getElementById('prList');
    const prs = calculatePRs();

    if (prs.size === 0) {
        container.innerHTML = '<div class="no-data">No hay records personales aun. Registra tus entrenamientos para ver tus PRs.</div>';
        return;
    }

    const sorted = Array.from(prs.entries()).sort((a, b) => a[0].localeCompare(b[0]));

    container.innerHTML = sorted.map(([name, pr]) => {
        const date = pr.date ? new Date(pr.date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }) : '';

        return `
            <div class="pr-card">
                <div class="pr-badge">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <div class="pr-info">
                    <div class="pr-name">${name}</div>
                    <div class="pr-date">${date}</div>
                </div>
                <div class="pr-value">
                    <span class="pr-weight">${pr.maxWeight} kg</span>
                    ${pr.reps ? `<span class="pr-reps">x${pr.reps}</span>` : ''}
                </div>
            </div>
        `;
    }).join('');
}
