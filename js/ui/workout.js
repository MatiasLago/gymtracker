import { state } from '../state/appState.js';
import { loadSavedData, saveData } from '../services/storage.js';
import { getDayKey, updateCompletedDaysUI } from './exercises.js';
import { renderHistory } from './history.js';

export function completeWorkout() {
    const data = loadSavedData();
    const dayKey = getDayKey();
    const today = new Date().toISOString().split('T')[0];

    if (!data.completedDays[dayKey]) {
        data.completedDays[dayKey] = [];
    }

    data.completedDays[dayKey].push({
        date: today,
        timestamp: new Date().toISOString()
    });

    saveData(data);
    updateCompletedDaysUI();
    renderHistory();

    alert('Entrenamiento completado!');
}

export function updateHeader() {
    document.getElementById('currentMesociclo').textContent = `Mesociclo ${state.currentMesociclo}`;
    document.getElementById('currentWeek').textContent = `Semana ${state.currentWeek}`;
}
