// Función de log personalizada
const debugLog = (message, data) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`🔧 [Debug]: ${message}`, data || '');
    }
};

// Inicialización silenciosa
window.onload = function() {
    const links = document.querySelectorAll('a.arbitrum-action');
    debugLog(`Encontrados ${links.length} enlaces de Arbitrum`);
    
    // Actualizar el estado visual
    const status = document.getElementById('extension-status');
    if (status) {
        status.textContent = 'Extensión activa - ' + new Date().toLocaleTimeString();
        status.style.color = 'green';
    }
};

// Log básico para verificar que el script se está cargando
console.log('Content script cargado en:', window.location.href);

// Notificar al background script que estamos listos
chrome.runtime.sendMessage({ action: "contentScriptReady" });

// Función simple para manejar clics
document.addEventListener('click', async function(e) {
    const linkElement = e.target.closest('a');
    if (!linkElement || !linkElement.classList.contains('arbitrum-action')) return;
    
    console.log('🎯 Enlace de Arbitrum detectado:', linkElement.href);
    e.preventDefault();
    
    // Crear o actualizar el elemento de visualización
    let dataDisplay = document.getElementById('data-display');
    if (!dataDisplay) {
        dataDisplay = document.createElement('div');
        dataDisplay.id = 'data-display';
        dataDisplay.style.margin = '20px';
        dataDisplay.style.padding = '10px';
        dataDisplay.style.border = '1px solid #ccc';
        document.body.appendChild(dataDisplay);
    }
    
    dataDisplay.innerHTML = 'Cargando datos...';
    
    try {
        const response = await new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({
                action: "handleArbitrumLink",
                url: linkElement.href
            }, response => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(response);
                }
            });
        });

        console.log('Datos recibidos:', response);
        if (response && response.success) {
            dataDisplay.innerHTML = `
                <h3>Datos del Enlace Arbitrum:</h3>
                <pre>${JSON.stringify(response.data, null, 2)}</pre>
            `;
        } else {
            throw new Error(response?.error || 'Error desconocido');
        }
    } catch (error) {
        console.error('Error:', error);
        dataDisplay.innerHTML = `
            <h3>Error al procesar el enlace:</h3>
            <p style="color: red;">${error.message}</p>
        `;
    }
});