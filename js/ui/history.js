import { loadSavedData } from '../services/storage.js';
import { editWorkout, deleteWorkout } from './historyEditor.js';

export function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function renderHistory() {
    const data = loadSavedData();
    const container = document.getElementById('historyList');

    const entries = [];

    Object.entries(data.completedDays).forEach(([dayKey, completions]) => {
        completions.forEach(completion => {
            const match = dayKey.match(/m(\d)w(\d)d(\d)/);
            if (match) {
                entries.push({
                    dayKey,
                    mesociclo: match[1],
                    week: match[2],
                    day: match[3],
                    date: completion.date,
                    timestamp: completion.timestamp
                });
            }
        });
    });

    entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (entries.length === 0) {
        container.innerHTML = '<div class="no-data">No hay entrenamientos registrados</div>';
        return;
    }

    container.innerHTML = entries.slice(0, 20).map(entry => {
        const formattedDate = formatDate(entry.date);

        return `
            <div class="history-item">
                <div class="history-item-header">
                    <div class="history-item-info">
                        <div class="history-date">${formattedDate}</div>
                        <div class="history-workout">Mesociclo ${entry.mesociclo} - Semana ${entry.week} - Dia ${entry.day}</div>
                    </div>
                    <div class="history-actions">
                        <button class="history-action-btn edit-btn" data-daykey="${entry.dayKey}" title="Editar">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                        </button>
                        <button class="history-action-btn delete-btn" data-daykey="${entry.dayKey}" data-timestamp="${entry.timestamp}" title="Eliminar">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Attach event listeners
    container.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            editWorkout(btn.dataset.daykey);
        });
    });

    container.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteWorkout(btn.dataset.daykey, btn.dataset.timestamp);
        });
    });
}
