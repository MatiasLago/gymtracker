import { routineData } from '../data/routineData.js';
import { loadSavedData, saveData } from '../services/storage.js';
import { openModal, closeModal } from './modal.js';
import { renderHistory } from './history.js';
import { renderStreakCard } from './streak.js';

let pendingDeleteDayKey = null;
let pendingDeleteTimestamp = null;

export function editWorkout(dayKey) {
    const data = loadSavedData();
    const workoutData = data.workouts[dayKey] || {};
    const match = dayKey.match(/m(\d)w(\d)d(\d)/);

    if (!match) return;

    const meso = `mesociclo${match[1]}`;
    const week = `semana${match[2]}`;
    const day = `dia${match[3]}`;
    const exercises = routineData[meso]?.[week]?.[day] || [];

    const container = document.getElementById('editExerciseList');
    document.getElementById('editModalTitle').textContent =
        `Editar - M${match[1]} S${match[2]} D${match[3]}`;

    container.innerHTML = exercises.map((exercise, index) => {
        const exData = workoutData[index] || {};
        const sets = exData.sets || [];

        return `
            <div class="edit-exercise-group" data-exercise-index="${index}">
                <div class="edit-exercise-name">${exercise.name}</div>
                ${Array.from({ length: exercise.sets }, (_, i) => {
                    const setData = sets[i] || {};
                    return `
                        <div class="edit-set-row">
                            <span class="edit-set-label">Set ${i + 1}</span>
                            <input type="number" class="edit-weight" data-set="${i}"
                                   value="${setData.weight || ''}" placeholder="kg" step="0.5">
                            <input type="number" class="edit-reps" data-set="${i}"
                                   value="${setData.reps || ''}" placeholder="reps">
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }).join('');

    // Store dayKey for save
    document.getElementById('editHistoryModal').dataset.daykey = dayKey;

    openModal('editHistoryModal');
}

export function saveEditedWorkout() {
    const modal = document.getElementById('editHistoryModal');
    const dayKey = modal.dataset.daykey;
    const data = loadSavedData();

    if (!data.workouts[dayKey]) {
        data.workouts[dayKey] = {};
    }

    modal.querySelectorAll('.edit-exercise-group').forEach(group => {
        const exIndex = group.dataset.exerciseIndex;
        const sets = [];

        group.querySelectorAll('.edit-set-row').forEach(row => {
            const weight = row.querySelector('.edit-weight').value;
            const reps = row.querySelector('.edit-reps').value;
            sets.push({
                weight: weight ? parseFloat(weight) : null,
                reps: reps ? parseInt(reps) : null
            });
        });

        const hasData = sets.some(s => s.weight !== null || s.reps !== null);

        if (data.workouts[dayKey][exIndex]) {
            data.workouts[dayKey][exIndex].sets = sets;
            data.workouts[dayKey][exIndex].completed = hasData;
        } else if (hasData) {
            data.workouts[dayKey][exIndex] = {
                sets,
                completed: hasData,
                date: new Date().toISOString()
            };
        }
    });

    saveData(data);
    closeModal('editHistoryModal');
    renderHistory();
    renderStreakCard();
}

export function deleteWorkout(dayKey, timestamp) {
    pendingDeleteDayKey = dayKey;
    pendingDeleteTimestamp = timestamp;

    const match = dayKey.match(/m(\d)w(\d)d(\d)/);
    const label = match ? `Mesociclo ${match[1]} - Semana ${match[2]} - Dia ${match[3]}` : dayKey;
    document.getElementById('confirmDeleteText').textContent =
        `Eliminar el entrenamiento "${label}"? Esta accion no se puede deshacer.`;

    openModal('confirmDeleteModal');
}

export function confirmDelete() {
    if (!pendingDeleteDayKey || !pendingDeleteTimestamp) return;

    const data = loadSavedData();

    // Remove from completedDays
    if (data.completedDays[pendingDeleteDayKey]) {
        data.completedDays[pendingDeleteDayKey] = data.completedDays[pendingDeleteDayKey]
            .filter(c => c.timestamp !== pendingDeleteTimestamp);

        if (data.completedDays[pendingDeleteDayKey].length === 0) {
            delete data.completedDays[pendingDeleteDayKey];
        }
    }

    saveData(data);
    closeModal('confirmDeleteModal');
    renderHistory();
    renderStreakCard();

    pendingDeleteDayKey = null;
    pendingDeleteTimestamp = null;
}

export function cancelDelete() {
    pendingDeleteDayKey = null;
    pendingDeleteTimestamp = null;
    closeModal('confirmDeleteModal');
}
