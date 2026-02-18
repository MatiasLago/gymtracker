import { API_URL } from './api.js';
import { cachedData, setCachedData } from '../state/appState.js';

function showSyncStatus(message) {
    let statusEl = document.getElementById('syncStatus');
    if (!statusEl) {
        statusEl = document.createElement('div');
        statusEl.id = 'syncStatus';
        statusEl.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 12px;
            z-index: 1000;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(statusEl);
    }
    statusEl.textContent = message;
    statusEl.style.opacity = '1';

    setTimeout(() => {
        statusEl.style.opacity = '0';
    }, 2000);
}

export function loadSavedData() {
    if (cachedData) {
        return cachedData;
    }

    const saved = localStorage.getItem('gymTrackerData');
    if (saved) {
        const data = JSON.parse(saved);
        setCachedData(data);
        return data;
    }

    const data = {
        workouts: {},
        completedDays: {}
    };
    setCachedData(data);
    return data;
}

export function saveData(data) {
    setCachedData(data);
    localStorage.setItem('gymTrackerData', JSON.stringify(data));

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(() => {
        showSyncStatus('Guardado en la nube');
    }).catch(() => {
        showSyncStatus('Guardado localmente (sin conexion)');
    });
}

function mergeData(local, server) {
    const merged = {
        workouts: { ...server.workouts, ...local.workouts },
        completedDays: { ...server.completedDays }
    };

    Object.keys(local.completedDays || {}).forEach(key => {
        if (!merged.completedDays[key]) {
            merged.completedDays[key] = local.completedDays[key];
        } else {
            const combined = [...merged.completedDays[key], ...local.completedDays[key]];
            const unique = combined.filter((item, index, self) =>
                index === self.findIndex(t => t.timestamp === item.timestamp)
            );
            merged.completedDays[key] = unique;
        }
    });

    return merged;
}

export async function syncWithServer() {
    try {
        showSyncStatus('Sincronizando...');
        const response = await fetch(API_URL);
        if (response.ok) {
            const serverData = await response.json();
            const localData = JSON.parse(localStorage.getItem('gymTrackerData') || '{}');

            const mergedData = mergeData(localData, serverData);

            setCachedData(mergedData);
            localStorage.setItem('gymTrackerData', JSON.stringify(mergedData));

            if (JSON.stringify(mergedData) !== JSON.stringify(serverData)) {
                await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(mergedData)
                });
            }

            showSyncStatus('Sincronizado');
            return mergedData;
        }
    } catch (e) {
        showSyncStatus('Modo offline');
    }
    return loadSavedData();
}
