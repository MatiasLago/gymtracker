// Estado de la aplicacion
export const state = {
    currentMesociclo: 1,
    currentWeek: 1,
    currentDay: 1,
    currentExerciseIndex: null
};

// Cache de datos en memoria
export let cachedData = null;

export function setCachedData(data) {
    cachedData = data;
}
