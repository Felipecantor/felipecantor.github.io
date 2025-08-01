// ===== HERO ANIMATIONS & INTERACTIVITY =====

(function() {
    'use strict';
    
    // Función para inicializar todas las animaciones del hero
    function initHeroAnimations() {
        console.log('🎨 Inicializando animaciones del hero...');
        
        // Animación de contador para las estadísticas
        animateCounters();
        
        // Efectos de parallax suave
        initParallaxEffects();
        
        // Animaciones de scroll
        initScrollAnimations();
        
        // Efectos de partículas
        initParticleEffects();
        
        // Interactividad de las tarjetas flotantes
        initFloatingCards();
        
        console.log('✅ Animaciones del hero inicializadas');
    }
    
    // Animación de contadores para las estadísticas
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace('+', ''));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + '+';
            }, 16);
        });
    }
    
    // Efectos de parallax suave
    function initParallaxEffects() {
        const hero = document.querySelector('.hero');
        const floatingCards = document.querySelectorAll('.floating-card');
        
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            floatingCards.forEach((card, index) => {
                const speed = (index + 1) * 0.1;
                card.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }
    
    // Animaciones de scroll
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, observerOptions);
        
        // Observar elementos del hero
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-actions');
        heroElements.forEach(el => observer.observe(el));
    }
    
    // Efectos de partículas
    function initParticleEffects() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Crear partículas flotantes
        for (let i = 0; i < 15; i++) {
            createParticle(hero);
        }
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(59, 130, 246, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat 8s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 8}s;
        `;
        
        container.appendChild(particle);
        
        // Remover partícula después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }
    
    // Interactividad de las tarjetas flotantes
    function initFloatingCards() {
        const floatingCards = document.querySelectorAll('.floating-card');
        
        floatingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.15) translateY(-10px)';
                card.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }
    
    // Efectos de hover para botones
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 10px 20px rgba(59, 130, 246, 0.3)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.boxShadow = '';
            });
        });
    }
    
    // Efectos de texto dinámico
    function initTextEffects() {
        const title = document.querySelector('.hero-title');
        if (!title) return;
        
        // Efecto de escritura para el título
        const titleText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            title.textContent += titleText.charAt(i);
            i++;
            if (i >= titleText.length) {
                clearInterval(typeWriter);
            }
        }, 100);
    }
    
    // Efectos de cursor personalizado (DESHABILITADO)
    function initCustomCursor() {
        // Cursor personalizado deshabilitado por solicitud del usuario
        return;
    }
    
    // Efectos de sonido (opcional)
    function initSoundEffects() {
        const interactiveElements = document.querySelectorAll('.btn, .floating-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('click', () => {
                // Crear efecto de onda de sonido visual
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border: 2px solid rgba(59, 130, 246, 0.5);
                    border-radius: 50%;
                    animation: rippleEffect 0.6s ease-out;
                    pointer-events: none;
                `;
                
                el.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
    }
    
    // Inicialización cuando el DOM esté listo
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initHeroAnimations);
        } else {
            initHeroAnimations();
        }
        
        // Inicializar efectos adicionales después de un delay
        setTimeout(() => {
            initButtonEffects();
            initTextEffects();
            initCustomCursor();
            initSoundEffects();
        }, 1000);
    }
    
    // Agregar estilos CSS dinámicamente
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes rippleEffect {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
            
            .hero-particle {
                z-index: 1;
            }
            
            .custom-cursor {
                mix-blend-mode: difference;
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Inicializar todo
    addDynamicStyles();
    init();
    
    // API pública para controlar animaciones
    window.HeroAnimations = {
        play: () => {
            document.querySelectorAll('.hero *').forEach(el => {
                if (el.style.animationPlayState) {
                    el.style.animationPlayState = 'running';
                }
            });
        },
        pause: () => {
            document.querySelectorAll('.hero *').forEach(el => {
                if (el.style.animationPlayState) {
                    el.style.animationPlayState = 'paused';
                }
            });
        },
        restart: () => {
            document.querySelectorAll('.hero *').forEach(el => {
                if (el.style.animation) {
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = null;
                }
            });
        }
    };
    
})(); 