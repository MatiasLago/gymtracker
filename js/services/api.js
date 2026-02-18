export const API_URL = `${window.location.origin}/api/data`;

export async function loadTodaySteps() {
    try {
        const response = await fetch(`${window.location.origin}/api/steps`);
        if (response.ok) {
            const steps = await response.json();
            const today = new Date().toISOString().split('T')[0];
            const todaySteps = steps[today];

            if (todaySteps) {
                document.getElementById('todaySteps').textContent =
                    todaySteps.count.toLocaleString();
            } else {
                document.getElementById('todaySteps').textContent = '--';
            }
        }
    } catch (e) {
        console.log('No se pudieron cargar los pasos');
    }
}
