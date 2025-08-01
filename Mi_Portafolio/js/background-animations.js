// ===== BACKGROUND ANIMATIONS CONTROLLER =====

(function() {
    'use strict';
    
    // Función para inicializar las animaciones de fondo
    function initBackgroundAnimations() {
        console.log('🎨 Inicializando animaciones de fondo...');
        
        // Controlar animaciones basadas en scroll
        initScrollBasedAnimations();
        
        // Optimizar rendimiento en dispositivos móviles
        optimizeForMobile();
        
        // Respetar preferencias de movimiento reducido
        respectMotionPreferences();
        
        console.log('✅ Animaciones de fondo inicializadas');
    }
    
    // Animaciones basadas en scroll
    function initScrollBasedAnimations() {
        const sections = document.querySelectorAll('.hero, .sobre-mi, .proyectos-u, .proyectos-trabajo, .proyectos-personales, .experiencias, .cv, .contacto, .footer');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Activar animación cuando la sección es visible
                    entry.target.style.animationPlayState = 'running';
                    
                    // Añadir clase para efectos adicionales
                    entry.target.classList.add('section-visible');
                } else {
                    // Pausar animación cuando no es visible (opcional)
                    // entry.target.style.animationPlayState = 'paused';
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
    
    // Optimizar para dispositivos móviles
    function optimizeForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Reducir intensidad de animaciones en móviles
            const animatedElements = document.querySelectorAll('.hero::before, .sobre-mi::before, .proyectos-u::before, .proyectos-trabajo::before, .proyectos-personales::before, .experiencias::before, .cv::before, .footer::before, .navbar::before');
            
            animatedElements.forEach(element => {
                if (element) {
                    element.style.animationDuration = '20s';
                    element.style.opacity = '0.5';
                }
            });
        }
    }
    
    // Respetar preferencias de movimiento reducido
    function respectMotionPreferences() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Deshabilitar animaciones para usuarios que prefieren menos movimiento
            const animatedElements = document.querySelectorAll('.hero::before, .sobre-mi::before, .proyectos-u::before, .proyectos-trabajo::before, .proyectos-personales::before, .experiencias::before, .cv::before, .footer::before, .navbar::before');
            
            animatedElements.forEach(element => {
                if (element) {
                    element.style.animation = 'none';
                }
            });
        }
    }
    
    // Función para pausar/reanudar animaciones
    function toggleAnimations() {
        const animatedElements = document.querySelectorAll('.hero::before, .sobre-mi::before, .proyectos-u::before, .proyectos-trabajo::before, .proyectos-personales::before, .experiencias::before, .cv::before, .footer::before, .navbar::before');
        
        animatedElements.forEach(element => {
            if (element) {
                const isPaused = element.style.animationPlayState === 'paused';
                element.style.animationPlayState = isPaused ? 'running' : 'paused';
            }
        });
    }
    
    // Función para cambiar velocidad de animaciones
    function setAnimationSpeed(speed = 1) {
        const animatedElements = document.querySelectorAll('.hero::before, .sobre-mi::before, .proyectos-u::before, .proyectos-trabajo::before, .proyectos-personales::before, .experiencias::before, .cv::before, .footer::before, .navbar::before');
        
        animatedElements.forEach(element => {
            if (element) {
                const currentDuration = getComputedStyle(element).animationDuration;
                const baseDuration = parseFloat(currentDuration) || 10;
                element.style.animationDuration = `${baseDuration / speed}s`;
            }
        });
    }
    
    // Función para cambiar intensidad de animaciones
    function setAnimationIntensity(intensity = 1) {
        const animatedElements = document.querySelectorAll('.hero::before, .sobre-mi::before, .proyectos-u::before, .proyectos-trabajo::before, .proyectos-personales::before, .experiencias::before, .cv::before, .footer::before, .navbar::before');
        
        animatedElements.forEach(element => {
            if (element) {
                element.style.opacity = Math.min(1, Math.max(0, intensity));
            }
        });
    }
    
    // Inicialización cuando el DOM esté listo
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initBackgroundAnimations);
        } else {
            initBackgroundAnimations();
        }
    }
    
    // Inicializar
    init();
    
    // API pública para controlar animaciones
    window.BackgroundAnimations = {
        toggle: toggleAnimations,
        setSpeed: setAnimationSpeed,
        setIntensity: setAnimationIntensity,
        pause: () => setAnimationSpeed(0.1),
        resume: () => setAnimationSpeed(1),
        lowIntensity: () => setAnimationIntensity(0.3),
        highIntensity: () => setAnimationIntensity(1)
    };
    
    // Event listeners para controles de usuario
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + A para alternar animaciones
        if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
            e.preventDefault();
            toggleAnimations();
        }
        
        // Ctrl/Cmd + 1-5 para cambiar velocidad
        if ((e.ctrlKey || e.metaKey) && ['1', '2', '3', '4', '5'].includes(e.key)) {
            e.preventDefault();
            const speed = parseInt(e.key);
            setAnimationSpeed(speed);
        }
    });
    
})(); 