const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'text.html');
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Error: No se encuentra el archivo HTML:', filePath);
            res.writeHead(500);
            res.end('Error: No se encuentra el archivo HTML');
            return;
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Error al leer el archivo:', err);
                res.writeHead(500);
                res.end('Error loading text.html');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Ruta al HTML: ${path.join(__dirname, 'text.html')}`);
});
