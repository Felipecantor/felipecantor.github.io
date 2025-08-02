/**
 * Hero Animations System
 * Restaura todas las animaciones del hero: carrusel, fondo, floating cards
 */

class HeroAnimations {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.indicators = [];
        this.autoPlayInterval = null;
        this.isInitialized = false;
        
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
        this.setupImageGallery();
        this.setupFloatingCards();
        this.setupBackgroundAnimations();
        this.setupScrollAnimations();
        
        this.isInitialized = true;
        console.log('🎭 Hero Animations System initialized');
    }

    setupImageGallery() {
        // Get slides and indicators
        this.slides = document.querySelectorAll('.image-container');
        this.indicators = document.querySelectorAll('.indicator');
        
        if (this.slides.length === 0) return;

        // Setup indicators click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Auto-play gallery
        this.startAutoPlay();

        // Pause on hover
        const gallery = document.querySelector('.image-gallery');
        if (gallery) {
            gallery.addEventListener('mouseenter', () => this.stopAutoPlay());
            gallery.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    goToSlide(index) {
        // Remove active class from current slide and indicator
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');

        // Update current slide
        this.currentSlide = index;

        // Add active class to new slide and indicator
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // Change slide every 4 seconds
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    setupFloatingCards() {
        const cards = document.querySelectorAll('.floating-card');
        
        cards.forEach((card, index) => {
            // Add animation delay
            card.style.animationDelay = `${index * 0.5}s`;
            
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.1)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }

    setupBackgroundAnimations() {
        // Add background pulse animation
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.animation = 'backgroundPulse 6s ease-in-out infinite';
        }

        // Add gradient shift animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.animation = 'contentFloat 8s ease-in-out infinite';
        }
    }

    setupScrollAnimations() {
        // Add scroll indicator animation
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('#sobre-mi');
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Public API
    refresh() {
        if (this.isInitialized) {
            this.setup();
        }
    }

    destroy() {
        this.stopAutoPlay();
        this.isInitialized = false;
    }
}

// Initialize Hero Animations
const heroAnimations = new HeroAnimations();

// Export for global access
window.HeroAnimations = HeroAnimations;
window.heroAnimations = heroAnimations; 