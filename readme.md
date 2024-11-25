# Arbitrum ALinks Extension

## 📋 Descripción  
Una extensión de Chrome que intercepta y procesa enlaces especiales de Arbitrum utilizando **JSONBin.io** como backend para almacenar y recuperar datos JSON.

## ✨ Características  
- 🔗 Intercepta enlaces con la clase `arbitrum-action`.  
- 📦 Procesa datos JSON desde **JSONBin.io**.  
- 📄 Muestra los resultados directamente en la página.  
- 🚦 Interfaz visual con estado de la extensión.  

## 🎯 Caso de Uso: Donaciones Rápidas y Transparentes con Arbitrum

### El Problema
Las organizaciones benéficas y creadores de contenido enfrentan varios desafíos al recibir donaciones:
- 💸 Altas comisiones en plataformas centralizadas
- 🔍 Falta de transparencia en el proceso
- 🔒 Dependencia de intermediarios
- 😕 Proceso complejo para donantes en crypto

### La Solución
ALinks simplifica las donaciones en Arbitrum mediante:
- 🔗 Enlaces de donación en un clic
- 👆 Sin necesidad de copiar direcciones
- ⚡ Transacciones rápidas y económicas en Arbitrum
- 📱 Integración directa con redes sociales y blogs

### ¿Cómo Funciona?
1. El creador/ONG genera un link especial con sus parámetros de donación
2. Comparte el link en sus plataformas
3. Los donantes hacen clic y confirman la transacción
4. Los fondos se transfieren instantáneamente por Arbitrum

## 🔧 Requisitos Técnicos

### Contratos Inteligentes Necesarios
1. **Contrato de Donaciones**
   ```solidity
   interface IDonationContract {
       function donate(address recipient) external payable;
       function withdrawDonations() external;
       function getDonationHistory(address donor) external view returns (uint256[] memory);
   }
   ```

2. **Contrato de Registro de Enlaces**
   ```solidity
   interface ILinkRegistry {
       function registerLink(string calldata linkId, address recipient) external;
       function validateLink(string calldata linkId) external view returns (bool, address);
   }
   ```

### Integración con Arbitrum
- 🌉 Utiliza Arbitrum Layer 2 para transacciones rápidas y económicas
- 🔐 Compatible con wallets web3 (MetaMask, WalletConnect)
- 📊 Aprovecha la velocidad y bajo costo de Arbitrum para microtransacciones

### Seguridad
- ✅ Validación on-chain de enlaces
- 🛡️ Protección contra enlaces maliciosos
- 📝 Registro inmutable de donaciones
- 🔒 Smart contracts auditados

## 🚀 Instalación  

### Prerrequisitos  
- Google Chrome.  
- Node.js instalado.  
- Cuenta en [**JSONBin.io**](https://jsonbin.io/)

## 🛠️ Pasos de Instalación  

### 1. Clonar el repositorio  
```bash
git clone [url-del-repositorio]
cd arbitrum-alinks-extension
```

### 2.Cargar la extensión en Chrome:

1.Abrir Chrome y navegar a chrome://extensions/
2.Activar "Modo desarrollador" (esquina superior derecha)
3.Hacer clic en "Cargar descomprimida"
4.Seleccionar la carpeta arbitrum-alinks-extension

### 💻 Configuración del Servidor de Prueba

1. Navegar a la carpeta del servidor:
```bash
cd servidorSimple
```
2. Iniciar el servidor:
```bash
node server.js
```
> El servidor estará disponible en http://localhost:3000

### 🔧 Configuración de JSONBin
1. Ir a JSONBin.io
 - Crear una nueva cuenta o iniciar sesión
2. Crear un nuevo bin con este contenido:
```bash
   {
       "action": "transfer",
       "amount": "0.1",
       "to": "0x123..."
   }
```
3.Guardar la URL del bin

>> Necesitarás esta URL para las pruebas

## 🧪 Pruebas  

### 1.Preparación  
- [ ] Servidor local corriendo.  
- [ ] Extensión cargada en Chrome.  
- [ ] **JSONBin** configurado.  

### 2.Ejecución  
- [ ] Abrir `http://localhost:3000`.  
- [ ] Verificar "Extensión activa" con hora.  
- [ ] Hacer clic en **"Probar Acción"**.  

### 3. Resultados Esperados  
- ✅ Datos JSON mostrados en la página.  
- ✅ Logs en la consola del navegador.  
- ✅ Estado de la extensión actualizado.  

## 📁 Estructura del Proyecto

- **proyecto-root/**  
  - **servidorSimple/**  
    - `server.js` - Servidor de pruebas  
    - `text.html` - Página de prueba  
  - **arbitrum-alinks-extension/**  
    - `manifest.json` - Configuración de la extensión  
    - `background.js` - Script de fondo  
    - `content.js` - Script de contenido  
    - `popup.html` - UI de la extensión  
    - `popup.js` - Lógica del popup  
    - `icon.svg` - Ícono de la extensión  


## 🔍 Logs de Desarrollo  

| Evento           | Mensaje                          |  
|------------------|----------------------------------|  
| Carga           | "Content script cargado"         |  
| Inicialización   | "Enlaces encontrados"           |  
| Clic            | "Enlace de Arbitrum detectado"   |  
| Procesamiento   | "Datos recibidos"                |  

## 🛠 Notas Técnicas
- Basado en Chrome Extensions API v3
- Utiliza fetch para comunicación con JSONBin.io
- Servidor local para pruebas
- Selectores de clase específicos (arbitrum-action)