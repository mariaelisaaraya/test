document.getElementById('activateButton').addEventListener('click', async () => {
  try {
    // Obtener la pestaña activa
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Enviar mensaje al content script
    chrome.tabs.sendMessage(tab.id, { action: "activateExtension" });
    
    // Actualizar el estado visual
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Extension activada';
    statusDiv.style.backgroundColor = '#dff0d8';
    statusDiv.style.color = '#3c763d';
    
    // Guardar el estado en storage
    chrome.storage.local.set({ extensionActive: true });
  } catch (error) {
    console.error('Error al activar la extension:', error);
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Error al activar la extension';
    statusDiv.style.backgroundColor = '#f2dede';
    statusDiv.style.color = '#a94442';
  }
});

// Verificar estado al cargar
document.addEventListener('DOMContentLoaded', async () => {
  const { extensionActive } = await chrome.storage.local.get('extensionActive');
  const statusDiv = document.getElementById('status');
  const button = document.getElementById('activateButton');
  
  if (extensionActive) {
    statusDiv.textContent = 'Extension activada';
    statusDiv.style.backgroundColor = '#dff0d8';
    statusDiv.style.color = '#3c763d';
    button.textContent = 'Desactivar Extensión';
  }
});
  