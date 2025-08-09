// ===== WELCOME ALERT FUNCTIONALITY =====
// Script para manejar el mensaje de bienvenida con funcionalidad completa

/**
 * Función para cerrar manualmente el alert
 * Se ejecuta cuando el usuario hace clic en la X
 */
const closeWelcomeAlert = window.closeWelcomeAlert || function() {
    // Obtener referencia al elemento del alert
    const alert = document.getElementById('welcomeAlert');
    // Obtener referencia al body para ajustar padding
    const body = document.body;
    
    // Verificar que el alert existe antes de proceder
    if (alert) {
        // Agregar clase CSS para animación de salida
        alert.classList.add('fade-out');
        // Quitar clase que ajusta el padding del body
        body.classList.remove('alert-active');
        
        // Esperar a que termine la animación antes de remover el elemento
        setTimeout(() => {
            alert.remove(); // Eliminar completamente del DOM
        }, 500); // 500ms coincide con la duración de la animación CSS
        
        // Opcional: Marcar como cerrado en sessionStorage
        sessionStorage.setItem('welcomeAlertClosed', 'true');
    }
};
window.closeWelcomeAlert = closeWelcomeAlert;

/**
 * Función para auto-cerrar el alert después de 5.5 segundos
 * Solo se ejecuta si el usuario no lo ha cerrado manualmente
 */
const autoCloseAlert = window.autoCloseAlert || function() {
    setTimeout(() => {
        // Verificar que el alert aún existe y no está en proceso de cierre
        const alert = document.getElementById('welcomeAlert');
        if (alert && !alert.classList.contains('fade-out')) {
            closeWelcomeAlert(); // Usar la misma función de cierre manual
        }
    }, 5500); // 5.5 segundos = 5500 milisegundos
};
window.autoCloseAlert = autoCloseAlert;

/**
 * Función para verificar si el alert debe mostrarse
 * Revisa si ya fue cerrado en esta sesión
 */
const shouldShowAlert = window.shouldShowAlert || function() {
    // Retorna true para que siempre se muestre al recargar la página
    // Comentado: return !sessionStorage.getItem('welcomeAlertClosed');
    return true;
};
window.shouldShowAlert = shouldShowAlert;

/**
 * Función para manejar el cierre con teclado
 * Permite cerrar con la tecla Escape
 */
const handleKeyboardClose = window.handleKeyboardClose || function(event) {
    // Verificar si se presionó la tecla Escape (código 27)
    if (event.key === 'Escape' || event.keyCode === 27) {
        closeWelcomeAlert();
    }
};
window.handleKeyboardClose = handleKeyboardClose;

/**
 * Función de inicialización principal
 * Se ejecuta cuando el DOM está completamente cargado
 */
const initWelcomeAlert = window.initWelcomeAlert || function() {
    // Obtener referencias a elementos necesarios
    const body = document.body;
    const alert = document.getElementById('welcomeAlert');
    
    // Verificar si el alert debe mostrarse
    if (!shouldShowAlert()) {
        // Si ya fue cerrado, ocultar el alert y no aplicar estilos
        if (alert) {
            alert.style.display = 'none';
        }
        return; // Salir de la función
    }
    
    // Si el alert existe y debe mostrarse
    if (alert) {
        // Agregar clase al body para ajustar el padding superior
        body.classList.add('alert-active');
        
        // Iniciar el temporizador de auto-cierre
        autoCloseAlert();
        
        // Agregar event listener para cerrar con teclado (una sola vez)
        if (!window.__welcomeAlertKeydownBound) {
            document.addEventListener('keydown', handleKeyboardClose);
            window.__welcomeAlertKeydownBound = true;
        }
        
        // Opcional: Agregar funcionalidad de click fuera del alert para cerrar
        // (Descomenta si quieres esta funcionalidad)
        /*
        document.addEventListener('click', function(event) {
            // Verificar si el click fue fuera del alert
            if (!alert.contains(event.target)) {
                closeWelcomeAlert();
            }
        });
        */
    }
};
window.initWelcomeAlert = initWelcomeAlert;

/**
 * Event listener para inicializar cuando el DOM esté listo
 * Garantiza que todos los elementos HTML estén disponibles
 */
if (!window.__welcomeAlertDomListenerRegistered) {
    document.addEventListener('DOMContentLoaded', initWelcomeAlert);
    window.__welcomeAlertDomListenerRegistered = true;
}

/**
 * Función adicional para mostrar el alert programáticamente
 * Útil si quieres mostrar el alert desde otro script
 */
const showWelcomeAlert = window.showWelcomeAlert || function() {
    // Limpiar el estado de sessionStorage
    sessionStorage.removeItem('welcomeAlertClosed');
    
    // Recargar la página para mostrar el alert nuevamente
    // O alternativamente, recrear el elemento dinámicamente
    location.reload();
};
window.showWelcomeAlert = showWelcomeAlert;

/**
 * Función para personalizar el mensaje del alert
 * Permite cambiar el contenido dinámicamente
 */
const updateAlertMessage = window.updateAlertMessage || function(title, message) {
    const alertTitle = document.querySelector('.alert-title');
    const alertMessage = document.querySelector('.alert-message');
    
    if (alertTitle && title) {
        // Mantener el emoji y actualizar solo el texto
        alertTitle.innerHTML = `${title} <span style="font-size: 12px; opacity: 0.8;">✨</span>`;
    }
    
    if (alertMessage && message) {
        alertMessage.textContent = message;
    }
};
window.updateAlertMessage = updateAlertMessage;

// ===== CONFIGURACIÓN AVANZADA (OPCIONAL) =====

/**
 * Configuración para diferentes tipos de alerts
 * Permite reutilizar el sistema para otros mensajes
 */
const ALERT_CONFIGS = {
    welcome: {
        title: '¡Bienvenido a mi portafolio!',
        message: 'Este sitio está en constante actualización y mejora. Algunas funcionalidades pueden estar en desarrollo.',
        icon: '🚧',
        duration: 5500
    },
    update: {
        title: '¡Sitio actualizado!',
        message: 'He agregado nuevos proyectos y mejorado la experiencia de usuario.',
        icon: '🎉',
        duration: 5500
    },
    maintenance: {
        title: 'Mantenimiento programado',
        message: 'El sitio puede experimentar interrupciones menores mientras implemento mejoras.',
        icon: '⚙️',
        duration: 5500
    }
};

/**
 * Función para mostrar diferentes tipos de alerts
 * @param {string} type - Tipo de alert (welcome, update, maintenance)
 */
const showAlert = window.showAlert || function(type = 'welcome') {
    const config = ALERT_CONFIGS[type];
    if (!config) return;
    
    // Crear elemento de alert dinámicamente
    const alertHTML = `
        <div id="welcomeAlert" class="welcome-alert">
            <div class="alert-icon">${config.icon}</div>
            <div class="alert-content">
                <div class="alert-title">
                    ${config.title}
                    <span style="font-size: 12px; opacity: 0.8;">✨</span>
                </div>
                <div class="alert-message">${config.message}</div>
            </div>
            <button class="close-btn" onclick="closeWelcomeAlert()">×</button>
            <div class="progress-bar"></div>
        </div>
    `;
    
    // Insertar en el DOM
    document.body.insertAdjacentHTML('afterbegin', alertHTML);
    
    // Inicializar funcionalidad
    initWelcomeAlert();
    
    // Auto-cerrar con duración personalizada
    setTimeout(() => {
        const alert = document.getElementById('welcomeAlert');
        if (alert && !alert.classList.contains('fade-out')) {
            closeWelcomeAlert();
        }
    }, config.duration);
};
window.showAlert = showAlert;