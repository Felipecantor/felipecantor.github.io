// ===== CONTACTO SOCIAL MEDIA FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades de redes sociales
    initSocialMediaFeatures();
    
    // Inicializar analytics de redes sociales
    initSocialAnalytics();
    
    // Inicializar efectos interactivos
    initInteractiveEffects();
});

// ===== FUNCIONALIDADES PRINCIPALES =====

function initSocialMediaFeatures() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        // Efecto de hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            addPulseEffect(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            removePulseEffect(this);
        });
        
        // Click tracking
        card.addEventListener('click', function(e) {
            trackSocialClick(this);
        });
        
        // Efecto de carga progresiva
        addLoadingEffect(card);
    });
}

// ===== EFECTOS INTERACTIVOS =====

function addPulseEffect(element) {
    const pulse = document.createElement('div');
    pulse.className = 'social-pulse';
    pulse.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
        border-radius: inherit;
        transform: translate(-50%, -50%);
        animation: socialPulse 1s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.appendChild(pulse);
    
    setTimeout(() => {
        if (pulse.parentNode) {
            pulse.remove();
        }
    }, 1000);
}

function removePulseEffect(element) {
    const pulses = element.querySelectorAll('.social-pulse');
    pulses.forEach(pulse => pulse.remove());
}

function addLoadingEffect(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        element.style.transition = 'all 0.6s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, Math.random() * 500);
}

// ===== ANALYTICS Y TRACKING =====

function trackSocialClick(element) {
    const platform = getSocialPlatform(element);
    const url = element.href;
    
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            'event_category': 'social_media',
            'event_label': platform,
            'value': 1
        });
    }
    
    // Console log para debugging
    console.log(`Social click tracked: ${platform} - ${url}`);
    
    // Efecto de confirmación visual
    showClickConfirmation(element);
}

function getSocialPlatform(element) {
    if (element.classList.contains('linkedin')) return 'LinkedIn';
    if (element.classList.contains('github')) return 'GitHub';
    if (element.classList.contains('twitter')) return 'Twitter';
    if (element.classList.contains('instagram')) return 'Instagram';
    return 'Unknown';
}

function showClickConfirmation(element) {
    const confirmation = document.createElement('div');
    confirmation.className = 'social-click-confirmation';
    confirmation.textContent = '¡Redirigiendo...';
    confirmation.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary-color);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        z-index: 10;
        animation: confirmationFade 1s ease-out;
    `;
    
    element.appendChild(confirmation);
    
    setTimeout(() => {
        if (confirmation.parentNode) {
            confirmation.remove();
        }
    }, 1000);
}

// ===== ESTADÍSTICAS DINÁMICAS =====

function initSocialAnalytics() {
    // Simular carga de estadísticas reales
    updateSocialStats();
    
    // Actualizar estadísticas cada 30 segundos (simulación)
    setInterval(updateSocialStats, 30000);
}

function updateSocialStats() {
    const followersElements = document.querySelectorAll('.social-followers');
    
    followersElements.forEach(element => {
        const currentText = element.textContent;
        const currentNumber = parseInt(currentText.replace(/\D/g, ''));
        
        // Simular incremento aleatorio
        const increment = Math.floor(Math.random() * 5) + 1;
        const newNumber = currentNumber + increment;
        
        // Animación de contador
        animateCounter(element, currentNumber, newNumber);
    });
}

function animateCounter(element, start, end) {
    const duration = 1000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = `${current}+`;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== EFECTOS INTERACTIVOS AVANZADOS =====

function initInteractiveEffects() {
    // Efecto parallax en el fondo
    initParallaxEffect();
    
    // Efecto de partículas en hover
    initParticleEffect();
    
    // Efecto de typing en descripciones
    initTypingEffect();
}

function initParallaxEffect() {
    const socialSection = document.querySelector('.social-media-section');
    
    if (!socialSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        socialSection.style.transform = `translateY(${rate}px)`;
    });
}

function initParticleEffect() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createParticles(this);
        });
    });
}

function createParticles(element) {
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'social-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 5;
            animation: particleFloat 2s ease-out forwards;
        `;
        
        // Posición aleatoria
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        element.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 2000);
    }
}

function initTypingEffect() {
    const descriptions = document.querySelectorAll('.social-card-content p');
    
    descriptions.forEach(description => {
        const originalText = description.textContent;
        description.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            description.textContent += originalText.charAt(i);
            i++;
            
            if (i >= originalText.length) {
                clearInterval(typeInterval);
            }
        }, 50);
    });
}

// ===== UTILIDADES =====

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== CSS ANIMATIONS (inyectadas dinámicamente) =====

function injectSocialAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes socialPulse {
            0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        
        @keyframes confirmationFade {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes particleFloat {
            0% { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
            100% { 
                opacity: 0; 
                transform: translateY(-100px) scale(0); 
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ===== INICIALIZACIÓN =====

// Inyectar animaciones CSS
injectSocialAnimations();

// Exportar funciones para uso global
window.SocialMediaFeatures = {
    trackSocialClick,
    updateSocialStats,
    createParticles
}; 