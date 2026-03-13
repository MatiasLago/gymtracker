import { state } from './state/appState.js';
import { syncWithServer } from './services/storage.js';
import { loadTodaySteps } from './services/api.js';
import { renderExercises, saveExercise, skipExercise, updateCompletedDaysUI } from './ui/exercises.js';
import { renderHistory } from './ui/history.js';
import { renderExerciseSelect, renderProgress, setChartType } from './ui/progress.js';
import { completeWorkout, updateHeader } from './ui/workout.js';
import { initTheme, toggleTheme, setTheme } from './ui/theme.js';
import { closeModal, openModal } from './ui/modal.js';
import { renderRecords } from './ui/records.js';
import { saveEditedWorkout, confirmDelete, cancelDelete } from './ui/historyEditor.js';
import { initTimer } from './ui/timer.js';
import {
    requestNotificationPermission,
    initNotifications,
    renderSettingsModal,
    saveSettingsFromModal
} from './services/notifications.js';

// Initialize theme immediately
initTheme();

// Theme toggle listener
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('gymTrackerTheme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Service Worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');

            if (tab.dataset.tab === 'history') {
                renderHistory();
            } else if (tab.dataset.tab === 'progress') {
                renderExerciseSelect();
                renderProgress();
            } else if (tab.dataset.tab === 'records') {
                renderRecords();
            }
        });
    });

    // Day buttons
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentDay = parseInt(btn.dataset.day);
            renderExercises();
        });
    });

    // Mesociclo select
    document.getElementById('mesocicloSelect').addEventListener('change', (e) => {
        state.currentMesociclo = parseInt(e.target.value);
        updateHeader();
        renderExercises();
    });

    // Week select
    document.getElementById('weekSelect').addEventListener('change', (e) => {
        state.currentWeek = parseInt(e.target.value);
        updateHeader();
        renderExercises();
    });

    // Exercise Modal close
    document.querySelector('#exerciseModal .modal-close').addEventListener('click', () => closeModal('exerciseModal'));
    document.getElementById('exerciseModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal('exerciseModal');
    });

    // Save exercise
    document.getElementById('saveExercise').addEventListener('click', saveExercise);

    // Skip exercise
    document.getElementById('skipExercise').addEventListener('click', skipExercise);

    // Complete workout
    document.getElementById('completeWorkout').addEventListener('click', completeWorkout);

    // Progress exercise select
    document.getElementById('exerciseProgressSelect').addEventListener('change', renderProgress);

    // Chart type toggle
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setChartType(btn.dataset.type);
        });
    });

    // Edit History Modal
    document.querySelector('#editHistoryModal .modal-close').addEventListener('click', () => closeModal('editHistoryModal'));
    document.getElementById('editHistoryModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal('editHistoryModal');
    });
    document.getElementById('saveEditBtn').addEventListener('click', saveEditedWorkout);

    // Confirm Delete Modal
    document.querySelector('#confirmDeleteModal .modal-close').addEventListener('click', () => closeModal('confirmDeleteModal'));
    document.getElementById('confirmDeleteModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal('confirmDeleteModal');
    });
    document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDelete);
    document.getElementById('cancelDeleteBtn').addEventListener('click', cancelDelete);

    // Settings Modal
    document.getElementById('settingsBtn').addEventListener('click', () => {
        renderSettingsModal();
        openModal('settingsModal');
    });
    document.querySelector('#settingsModal .modal-close').addEventListener('click', () => closeModal('settingsModal'));
    document.getElementById('settingsModal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal('settingsModal');
    });
    document.getElementById('saveSettingsBtn').addEventListener('click', async () => {
        const toggle = document.getElementById('notifToggle');
        if (toggle.checked) {
            const granted = await requestNotificationPermission();
            if (!granted) {
                toggle.checked = false;
                alert('Se necesita permiso de notificaciones para activar los recordatorios.');
                return;
            }
        }
        saveSettingsFromModal();
        closeModal('settingsModal');
    });

    // Initial render
    updateHeader();
    renderExercises();
    // Sync with server
    syncWithServer().then(() => {
        renderExercises();
        updateCompletedDaysUI();
    });

    // Load steps
    loadTodaySteps();

    // Init notifications
    initNotifications();

    // Init timer
    initTimer();
});
