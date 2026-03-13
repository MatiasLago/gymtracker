const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const DATA_FILE = path.join(__dirname, 'gym-data.json');

// Cargar datos existentes o crear archivo vacío
function loadData() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        }
    } catch (e) {
        console.error('Error loading data:', e);
    }
    return { workouts: {}, completedDays: {}, steps: {} };
}

// Guardar datos
function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // API endpoints
    if (req.url === '/api/data' && req.method === 'GET') {
        const data = loadData();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
        return;
    }

    if (req.url === '/api/data' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                saveData(data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
                console.log('Datos guardados correctamente');
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        return;
    }

    // Endpoint para Health Auto Export (iPhone)
    // Health Auto Export manda: { "data": { "metrics": [{ "name": "step_count", "data": [{ "date": "YYYY-MM-DD ...", "qty": 1234 }] }] } }
    if (req.url === '/api/health' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const payload = JSON.parse(body);
                const metrics = payload?.data?.metrics || payload?.metrics || [];
                const appData = loadData();
                if (!appData.steps) appData.steps = {};

                let saved = 0;

                metrics.forEach(metric => {
                    if (metric.name !== 'step_count') return;

                    (metric.data || []).forEach(entry => {
                        const qty = Math.round(entry.qty || 0);
                        if (!qty) return;

                        // La fecha viene como "2024-01-15 00:00:00 +0000" o "2024-01-15"
                        const dateKey = String(entry.date).split(' ')[0];
                        if (!dateKey.match(/^\d{4}-\d{2}-\d{2}$/)) return;

                        appData.steps[dateKey] = {
                            count: qty,
                            timestamp: new Date().toISOString()
                        };
                        saved++;
                    });
                });

                saveData(appData);
                console.log(`Health Auto Export: ${saved} dias de pasos guardados`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, saved }));
            } catch (e) {
                console.error('Error procesando health data:', e.message);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid data', detail: e.message }));
            }
        });
        return;
    }

    // Obtener pasos
    if (req.url === '/api/steps' && req.method === 'GET') {
        const data = loadData();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data.steps || {}));
        return;
    }

    // Serve static files
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Not Found');
            } else {
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`GymTracker Server running on port ${PORT}`);
    console.log('Data file:', DATA_FILE);
});
