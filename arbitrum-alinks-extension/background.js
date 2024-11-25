// Mantener un registro de las pestañas donde el content script está listo
let readyTabs = new Set();

// Escuchar cuando el content script está listo
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "contentScriptReady" && sender.tab) {
        console.log("Content script ready in tab:", sender.tab.id);
        readyTabs.add(sender.tab.id);
    }
    
    if (message.action === "handleArbitrumLink") {
        console.log("Manejando enlace Arbitrum:", message.url);
        
        fetch(message.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos obtenidos:", data);
                // Para jsonbin.io, los datos reales están en data.record
                const processedData = data.record || data;
                sendResponse({ 
                    success: true, 
                    data: processedData,
                    message: 'Datos procesados correctamente'
                });
            })
            .catch(error => {
                console.error("Error:", error);
                sendResponse({ 
                    success: false, 
                    error: error.message 
                });
            });
        return true;
    }
});

// Modificar el listener de onUpdated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && readyTabs.has(tabId)) {
        console.log('Tab updated and ready:', tab.url);
        chrome.tabs.sendMessage(tabId, {
            action: "checkURLs",
            url: tab.url
        }).catch(err => console.log('Error sending message:', err));
    }
});

// Limpiar tabs cerradas del registro
chrome.tabs.onRemoved.addListener((tabId) => {
    readyTabs.delete(tabId);
});

// Mantener las funciones de caché sin cambios
async function cacheAction(actionUrl, data) {
    await chrome.storage.local.set({
        [actionUrl]: {
            data,
            timestamp: Date.now()
        }
    });
}

async function getCachedAction(actionUrl) {
    const cache = await chrome.storage.local.get(actionUrl);
    if (cache[actionUrl] && Date.now() - cache[actionUrl].timestamp < 300000) {
        return cache[actionUrl].data;
    }
    return null;
}