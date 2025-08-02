/**
 * Background Particles System
 * Agrega partículas flotantes al fondo de la página
 */

class BackgroundParticles {
    constructor() {
        this.particles = [];
        this.isInitialized = false;
        this.maxParticles = 10;
        
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.createParticles();
        this.isInitialized = true;
        console.log('✨ Background Particles System initialized');
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(59, 130, 246, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                animation: particleFloat 8s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 8}s;
            `;
            
            document.body.appendChild(particle);
            this.particles.push(particle);
        }
    }

    // Public API
    refresh() {
        if (this.isInitialized) {
            this.destroy();
            this.setup();
        }
    }

    destroy() {
        this.particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        this.particles = [];
        this.isInitialized = false;
    }
}

// Initialize Background Particles
const backgroundParticles = new BackgroundParticles();

// Export for global access
window.BackgroundParticles = BackgroundParticles;
window.backgroundParticles = backgroundParticles;