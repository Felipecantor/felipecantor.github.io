// ===== HERO GALLERY FUNCTIONALITY - PARA CONTENIDO DINÁMICO =====

(function() {
    'use strict';
    
    let galleryInitialized = false;
    
    function initHeroGallery() {
        // Evitar inicialización múltiple
        if (galleryInitialized) {
            console.log('Galería ya inicializada');
            return;
        }
        
        console.log('Intentando inicializar galería del hero...');
        
        // Seleccionar elementos
        const imageContainers = document.querySelectorAll('.image-container');
        const indicators = document.querySelectorAll('.indicator');
        const imageGallery = document.querySelector('.image-gallery');
        
        // Verificar que los elementos existen
        if (!imageContainers.length || !indicators.length) {
            console.warn('Elementos de la galería no encontrados. Reintentando...');
            return false; // Indicar que falló la inicialización
        }
        
        console.log(`✅ Encontrados ${imageContainers.length} contenedores de imagen y ${indicators.length} indicadores`);
        
        let currentSlide = 0;
        let autoPlayInterval = null;
        let isAutoPlayActive = true;
        
        // Función para cambiar de imagen
        function showSlide(index, source = 'auto') {
            if (index < 0 || index >= imageContainers.length) return;
            
            // Remover clases activas
            imageContainers.forEach(container => {
                container.classList.remove('active');
            });
            
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            
            // Agregar clases activas
            if (imageContainers[index]) {
                imageContainers[index].classList.add('active');
            }
            
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
            
            currentSlide = index;
        }
        
        // Función para siguiente imagen
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % imageContainers.length;
            showSlide(nextIndex, 'next');
        }
        
        // Función para imagen anterior
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + imageContainers.length) % imageContainers.length;
            showSlide(prevIndex, 'prev');
        }
        
        // Event listeners para indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function(e) {
                e.preventDefault();
                showSlide(index, 'indicator');
                resetAutoPlay();
            });
            
            indicator.style.cursor = 'pointer';
        });
        
        // Función para reiniciar autoplay
        function resetAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
            if (isAutoPlayActive && imageContainers.length > 1) {
                startAutoPlay();
            }
        }
        
        // Función para iniciar autoplay
        function startAutoPlay() {
            if (imageContainers.length <= 1) return;
            
            autoPlayInterval = setInterval(() => {
                nextSlide();
            }, 4000);
        }
        
        // Función para pausar autoplay
        function pauseAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }
        
        // Event listeners para hover
        if (imageGallery) {
            imageGallery.addEventListener('mouseenter', pauseAutoPlay);
            imageGallery.addEventListener('mouseleave', () => {
                if (isAutoPlayActive && imageContainers.length > 1) {
                    startAutoPlay();
                }
            });
        }
        
        // Navegación con teclado
        document.addEventListener('keydown', function(e) {
            if (document.activeElement.tagName === 'INPUT' || 
                document.activeElement.tagName === 'TEXTAREA') {
                return;
            }
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
                resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
                resetAutoPlay();
            }
        });
        
        // Soporte para touch/swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (imageGallery) {
            imageGallery.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            imageGallery.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                resetAutoPlay();
            }
        }
        
        // Inicializar estado
        showSlide(0, 'init');
        
        // Iniciar autoplay si hay más de una imagen
        if (imageContainers.length > 1) {
            startAutoPlay();
        }
        
        // API pública
        window.HeroGallery = {
            next: nextSlide,
            prev: prevSlide,
            goTo: (index) => showSlide(index, 'api'),
            pause: () => {
                isAutoPlayActive = false;
                pauseAutoPlay();
            },
            resume: () => {
                isAutoPlayActive = true;
                startAutoPlay();
            },
            getCurrentSlide: () => currentSlide,
            getTotalSlides: () => imageContainers.length
        };
        
        galleryInitialized = true;
        console.log('✅ Galería inicializada correctamente');
        return true;
    }
    
    // Función para esperar y reintentar la inicialización
    function waitForElements() {
        let attempts = 0;
        const maxAttempts = 50; // 5 segundos máximo
        
        const checkInterval = setInterval(() => {
            attempts++;
            console.log(`Intento ${attempts}/${maxAttempts} de inicializar galería`);
            
            if (initHeroGallery()) {
                clearInterval(checkInterval);
                console.log('🎉 Galería inicializada exitosamente');
            } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                console.error('❌ No se pudo inicializar la galería después de múltiples intentos');
            }
        }, 100); // Verificar cada 100ms
    }
    
    // Múltiples estrategias de inicialización
    
    // 1. Intentar inmediatamente si el DOM ya está listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(waitForElements, 100);
        });
    } else {
        // 2. Si el DOM ya está listo, esperar un poco y luego intentar
        setTimeout(waitForElements, 100);
    }
    
    // 3. Observador de mutaciones para detectar cuando se agrega contenido
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Verificar si el nodo agregado contiene elementos de la galería
                        if (node.querySelector && 
                            (node.querySelector('.image-container') || 
                             node.querySelector('.indicator') ||
                             node.classList.contains('image-container') ||
                             node.classList.contains('indicator'))) {
                            console.log('🔍 Detectado contenido de galería agregado al DOM');
                            setTimeout(() => {
                                if (!galleryInitialized) {
                                    initHeroGallery();
                                }
                            }, 50);
                        }
                    }
                });
            });
        });
        
        // Observar cambios en el body
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Desconectar el observer después de que la galería esté inicializada
        const checkInitialized = setInterval(() => {
            if (galleryInitialized) {
                observer.disconnect();
                clearInterval(checkInitialized);
                console.log('Observer desconectado - galería inicializada');
            }
        }, 1000);
    }
    
    // 4. Event listener personalizado para cuando el sistema de includes termine
    document.addEventListener('includesLoaded', () => {
        console.log('🔄 Evento includesLoaded recibido');
        setTimeout(() => {
            if (!galleryInitialized) {
                initHeroGallery();
            }
        }, 100);
    });
    
})();