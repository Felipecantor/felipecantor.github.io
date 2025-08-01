// ===== NAVBAR PERSISTENCE =====
// Asegura que el navbar permanezca visible en todas las secciones

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) {
        console.error('Navbar no encontrado en navbar-persistence.js');
        return;
    }

    // Función para forzar la visibilidad del navbar
    function forceNavbarVisibility() {
        if (navbar) {
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.left = '0';
            navbar.style.right = '0';
            navbar.style.zIndex = '1000';
            navbar.style.display = 'block';
            navbar.style.visibility = 'visible';
            navbar.style.opacity = '1';
            navbar.style.width = '100%';
            navbar.style.height = 'auto';
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid rgba(71, 85, 105, 0.2)';
            navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.3)';
        }
    }

    // Ejecutar inmediatamente
    forceNavbarVisibility();

    // Verificar cada 500ms que el navbar esté visible
    setInterval(function() {
        if (navbar) {
            const computedStyle = window.getComputedStyle(navbar);
            
            if (computedStyle.display === 'none' || 
                computedStyle.visibility === 'hidden' || 
                computedStyle.opacity === '0' ||
                computedStyle.position !== 'fixed') {
                
                console.log('Navbar se ocultó, restaurando...');
                forceNavbarVisibility();
            }
        }
    }, 500);

    // Verificar en eventos de navegación
    window.addEventListener('popstate', forceNavbarVisibility);
    window.addEventListener('hashchange', forceNavbarVisibility);
    
    // Verificar cuando se carga contenido dinámicamente
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                forceNavbarVisibility();
            }
        });
    });

    // Observar cambios en el body
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Verificar en eventos de scroll
    window.addEventListener('scroll', function() {
        forceNavbarVisibility();
    });

    // Verificar en eventos de resize
    window.addEventListener('resize', function() {
        forceNavbarVisibility();
    });

    // Verificar cuando se hace focus en elementos
    document.addEventListener('focusin', function() {
        forceNavbarVisibility();
    });

    // Verificar cuando se hace click
    document.addEventListener('click', function() {
        forceNavbarVisibility();
    });

    console.log('Navbar persistence script cargado');
}); 