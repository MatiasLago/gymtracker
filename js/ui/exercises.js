import { routineData } from '../data/routineData.js';
import { state } from '../state/appState.js';
import { loadSavedData, saveData } from '../services/storage.js';
import { closeModal } from './modal.js';
import { checkForNewPR } from './records.js';

export function getExercises() {
    const meso = `mesociclo${state.currentMesociclo}`;
    const week = `semana${state.currentWeek}`;
    const day = `dia${state.currentDay}`;
    return routineData[meso]?.[week]?.[day] || [];
}

export function getDayKey() {
    return `m${state.currentMesociclo}w${state.currentWeek}d${state.currentDay}`;
}

export function updateCompletedDaysUI() {
    const data = loadSavedData();

    document.querySelectorAll('.day-btn').forEach(btn => {
        const day = btn.dataset.day;
        const dayKey = `m${state.currentMesociclo}w${state.currentWeek}d${day}`;

        if (data.completedDays[dayKey]?.length > 0) {
            btn.classList.add('completed');
        } else {
            btn.classList.remove('completed');
        }
    });
}

export function renderExercises() {
    const container = document.getElementById('exerciseList');
    const exercises = getExercises();
    const data = loadSavedData();
    const dayKey = getDayKey();
    const dayData = data.workouts[dayKey] || {};

    container.innerHTML = exercises.map((exercise, index) => {
        const exerciseData = dayData[index] || {};
        const isCompleted = exerciseData.completed;
        const isSkipped = exerciseData.skipped;
        const lastWeight = exerciseData.sets?.[0]?.weight || '';

        const cardClass = isSkipped ? 'skipped' : (isCompleted ? 'completed' : '');

        return `
            <div class="exercise-card ${cardClass}" data-index="${index}">
                <div class="exercise-name">${exercise.name}</div>
                <div class="exercise-details">
                    <span>${exercise.sets} sets</span>
                    <span>${exercise.reps} reps</span>
                    <span>RPE ${exercise.rpe}</span>
                </div>
                ${isSkipped ? '<div class="skip-badge">Saltado</div>' : (lastWeight ? `<div class="exercise-weight">Ultimo: ${lastWeight} kg</div>` : '')}
            </div>
        `;
    }).join('');

    container.querySelectorAll('.exercise-card').forEach(card => {
        card.addEventListener('click', () => openExerciseModal(parseInt(card.dataset.index)));
    });

    updateCompletedDaysUI();
}

export function openExerciseModal(index) {
    state.currentExerciseIndex = index;
    const exercises = getExercises();
    const exercise = exercises[index];
    const data = loadSavedData();
    const dayKey = getDayKey();
    const exerciseData = data.workouts[dayKey]?.[index] || {};

    document.getElementById('modalExerciseName').textContent = exercise.name;
    document.getElementById('modalSets').textContent = exercise.sets;
    document.getElementById('modalReps').textContent = exercise.reps;
    document.getElementById('modalRPE').textContent = exercise.rpe;

    const setsContainer = document.getElementById('setsContainer');
    setsContainer.innerHTML = '';

    for (let i = 0; i < exercise.sets; i++) {
        const setData = exerciseData.sets?.[i] || {};
        setsContainer.innerHTML += `
            <div class="set-row">
                <span class="set-number">Set ${i + 1}</span>
                <div class="set-input">
                    <label>Peso (kg)</label>
                    <input type="number" class="weight-input" data-set="${i}"
                           value="${setData.weight || ''}" placeholder="0" step="0.5">
                </div>
                <div class="set-input">
                    <label>Reps</label>
                    <input type="number" class="reps-input" data-set="${i}"
                           value="${setData.reps || ''}" placeholder="${exercise.reps}">
                </div>
            </div>
        `;
    }

    document.getElementById('exerciseNotes').value = exerciseData.notes || '';

    const skipBtn = document.getElementById('skipExercise');
    if (exerciseData.skipped) {
        skipBtn.textContent = 'Restaurar ejercicio';
    } else {
        skipBtn.textContent = 'Saltar ejercicio';
    }

    document.getElementById('exerciseModal').classList.add('active');
}

export function saveExercise() {
    const data = loadSavedData();
    const dayKey = getDayKey();
    const exercises = getExercises();
    const exercise = exercises[state.currentExerciseIndex];

    if (!data.workouts[dayKey]) {
        data.workouts[dayKey] = {};
    }

    const sets = [];
    document.querySelectorAll('#setsContainer .set-row').forEach((row) => {
        const weight = row.querySelector('.weight-input').value;
        const reps = row.querySelector('.reps-input').value;
        sets.push({
            weight: weight ? parseFloat(weight) : null,
            reps: reps ? parseInt(reps) : null
        });
    });

    const hasData = sets.some(s => s.weight !== null || s.reps !== null);

    data.workouts[dayKey][state.currentExerciseIndex] = {
        sets,
        notes: document.getElementById('exerciseNotes').value,
        completed: hasData,
        date: new Date().toISOString()
    };

    saveData(data);

    // Check for new PR
    if (exercise && hasData) {
        const maxWeight = Math.max(...sets.filter(s => s.weight).map(s => s.weight));
        if (maxWeight > 0) {
            const maxReps = sets.find(s => s.weight === maxWeight)?.reps || 0;
            checkForNewPR(exercise.name, maxWeight, maxReps);
        }
    }

    closeModal('exerciseModal');
    renderExercises();
}

export function skipExercise() {
    const data = loadSavedData();
    const dayKey = getDayKey();

    if (!data.workouts[dayKey]) {
        data.workouts[dayKey] = {};
    }

    const existing = data.workouts[dayKey][state.currentExerciseIndex] || {};
    const isCurrentlySkipped = existing.skipped;

    if (isCurrentlySkipped) {
        // Restaurar: quitar el estado skipped
        delete data.workouts[dayKey][state.currentExerciseIndex].skipped;
        if (!data.workouts[dayKey][state.currentExerciseIndex].sets?.length) {
            delete data.workouts[dayKey][state.currentExerciseIndex];
        }
    } else {
        // Saltar: limpiar datos y marcar como saltado
        data.workouts[dayKey][state.currentExerciseIndex] = {
            skipped: true,
            completed: false,
            date: new Date().toISOString()
        };
    }

    saveData(data);
    closeModal('exerciseModal');
    renderExercises();
}
