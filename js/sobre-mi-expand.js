// ===== FUNCIONALIDAD PARA EXPANDIR/COMPRIMIR TEXTO EN SOBRE MÍ =====

// Variable global para evitar inicialización múltiple
window.sobreMiExpandInitialized = false;

// Función para sincronizar la altura del texto con la caja de habilidades
function syncTextHeightWithSkills() {
    const skillsBox = document.querySelector('.sobre-mi-skills');
    const descriptionBox = document.querySelector('.sobre-mi-description-truncated');

    if (skillsBox && descriptionBox) {
        const skillsHeight = skillsBox.offsetHeight;

        // Solo aplicar la altura si NO está expandido
        if (!descriptionBox.classList.contains('expanded')) {
            descriptionBox.style.maxHeight = `${skillsHeight}px`;
            console.log('Altura sincronizada:', skillsHeight, 'px');
        }
    }
}

// Función para inicializar la funcionalidad
function initializeSobreMiExpand() {
    // Evitar inicialización múltiple
    if (window.sobreMiExpandInitialized) {
        return;
    }
    
    console.log('Inicializando funcionalidad de expandir texto...');
    
    const expandBtn = document.getElementById('expandTextBtn');
    const truncatedText = document.querySelector('.sobre-mi-description-truncated');
    const skillsContainer = document.querySelector('.sobre-mi-skills');
    
    // Debug: Verificar que los elementos existen
    console.log('Elementos encontrados:');
    console.log('expandBtn:', expandBtn);
    console.log('truncatedText:', truncatedText);
    console.log('skillsContainer:', skillsContainer);
    
    if (!expandBtn || !truncatedText || !skillsContainer) {
        console.warn('Elementos necesarios para la funcionalidad de expandir texto no encontrados');
        return;
    }
    
    // Marcar como inicializado
    window.sobreMiExpandInitialized = true;
    
    // Variable para controlar el estado
    let isExpanded = false;
    
    // Función para verificar si el botón debe mostrarse
    function checkButtonVisibility() {
        const textHeight = truncatedText.scrollHeight;
        const skillsHeight = skillsContainer.offsetHeight;
        
        console.log('Altura del texto:', textHeight);
        console.log('Altura de skills:', skillsHeight);
        
        if (textHeight > skillsHeight) {
            expandBtn.style.display = 'inline-flex';
            expandBtn.parentElement.style.display = 'block';
            console.log('Botón mostrado');
        } else {
            expandBtn.style.display = 'none';
            expandBtn.parentElement.style.display = 'none';
            console.log('Botón oculto');
        }
    }
    
    // Función para toggle del texto
    function toggleText() {
        console.log('Toggle texto...');
        
        if (isExpanded) {
            // Comprimir texto
            truncatedText.classList.remove('expanded');
            truncatedText.style.overflow = 'hidden';
            expandBtn.querySelector('span').textContent = 'Más...';
            expandBtn.classList.remove('expanded');
            isExpanded = false;
            // Sincronizar altura después de comprimir
            setTimeout(syncTextHeightWithSkills, 100);
            console.log('Texto comprimido');
        } else {
            // Expandir texto
            truncatedText.classList.add('expanded');
            truncatedText.style.maxHeight = 'none';
            truncatedText.style.overflow = 'visible';
            expandBtn.querySelector('span').textContent = 'Menos...';
            expandBtn.classList.add('expanded');
            isExpanded = true;
            console.log('Texto expandido');
        }
    }
    
    // Event listener para el botón
    expandBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Botón clickeado');
        toggleText();
    });
    
    // Asegurar que el estado inicial sea comprimido
    function resetToCompressedState() {
        truncatedText.classList.remove('expanded');
        truncatedText.style.overflow = 'hidden';
        expandBtn.querySelector('span').textContent = 'Más...';
        expandBtn.classList.remove('expanded');
        isExpanded = false;
        
        // Sincronizar altura y calcular visibilidad del botón dinámicamente
        setTimeout(() => {
            syncTextHeightWithSkills();
            checkButtonVisibility();
        }, 100);
        
        console.log('Estado inicial configurado');
    }
    
    // Ejecutar al cargar la página
    resetToCompressedState();
    
    // También ejecutar cuando se navega de vuelta a la página
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            resetToCompressedState();
        }
    });
    
    // Ejecutar cuando se hace clic en enlaces internos que llevan a esta sección
    document.addEventListener('click', function(event) {
        if (event.target.tagName === 'A' && event.target.getAttribute('href')?.includes('#sobre-mi')) {
            setTimeout(resetToCompressedState, 100);
        }
    });
    
    // Reposicionar el botón cuando cambie el tamaño de la ventana
    window.addEventListener('resize', function() {
        if (!isExpanded) {
            syncTextHeightWithSkills();
            checkButtonVisibility();
        }
    });
    
    console.log('Funcionalidad inicializada correctamente');
}

// Función para intentar inicializar cuando las secciones se han cargado
function tryInitializeSobreMi() {
    if (document.getElementById('expandTextBtn') && !window.sobreMiExpandInitialized) {
        initializeSobreMiExpand();
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, esperando contenido dinámico...');
    
    // Intentar inicializar después de que se carguen las secciones
    setTimeout(tryInitializeSobreMi, 1000);
    setTimeout(tryInitializeSobreMi, 2000);
    setTimeout(tryInitializeSobreMi, 3000);
});

// También ejecutar cuando se carga la página completamente
window.addEventListener('load', function() {
    console.log('Página cargada completamente');
    setTimeout(tryInitializeSobreMi, 500);
});

// Ejecutar cuando se detecte que las secciones se han cargado
document.addEventListener('sectionsLoaded', function() {
    console.log('Secciones cargadas, inicializando funcionalidad...');
    setTimeout(tryInitializeSobreMi, 100);
});

// También intentar cada segundo durante los primeros 10 segundos
let attempts = 0;
const maxAttempts = 10;
const attemptInterval = setInterval(function() {
    attempts++;
    tryInitializeSobreMi();
    
    if (attempts >= maxAttempts || window.sobreMiExpandInitialized) {
        clearInterval(attemptInterval);
    }
}, 1000);

// Event listeners adicionales para sincronización de altura
window.addEventListener('DOMContentLoaded', syncTextHeightWithSkills);
window.addEventListener('resize', syncTextHeightWithSkills); 