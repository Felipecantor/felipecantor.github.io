/**
 * Navbar Animation System
 * Detecta cuando estamos en la sección hero y anima el navbar
 */

class NavbarAnimation {
    constructor() {
        this.navbar = null;
        this.heroSection = null;
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
        this.navbar = document.querySelector('.navbar');
        this.heroSection = document.querySelector('#home, .hero');
        
        if (!this.navbar) {
            console.warn('Navbar not found');
            return;
        }

        this.setupScrollListener();
        this.setupIntersectionObserver();
        
        this.isInitialized = true;
        console.log('🎯 Navbar Animation System initialized');
    }

    setupScrollListener() {
        let lastScrollTop = 0;
        const scrollThreshold = 100; // Píxeles para activar la animación

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Detectar si estamos en la sección hero
            const isInHero = this.isInHeroSection();
            
            if (isInHero) {
                // En hero: navbar normal
                this.navbar.classList.remove('navbar-scrolled');
            } else {
                // Fuera de hero: navbar pequeña
                this.navbar.classList.add('navbar-scrolled');
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }

    setupIntersectionObserver() {
        if (!this.heroSection) return;

        const options = {
            threshold: 0.1, // Activar cuando 10% de la sección hero esté visible
            rootMargin: '-50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Estamos en la sección hero
                    this.navbar.classList.remove('navbar-scrolled');
                } else {
                    // No estamos en la sección hero
                    this.navbar.classList.add('navbar-scrolled');
                }
            });
        }, options);

        observer.observe(this.heroSection);
    }

    isInHeroSection() {
        if (!this.heroSection) return false;
        
        const heroRect = this.heroSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Considerar que estamos en hero si al menos 20% está visible
        const heroVisible = Math.min(heroRect.bottom, windowHeight) - Math.max(heroRect.top, 0);
        const heroHeight = heroRect.height;
        
        return heroVisible > (heroHeight * 0.2);
    }

    // Public API
    refresh() {
        if (this.isInitialized) {
            this.setup();
        }
    }

    forceScrollState(isScrolled) {
        if (isScrolled) {
            this.navbar.classList.add('navbar-scrolled');
        } else {
            this.navbar.classList.remove('navbar-scrolled');
        }
    }
}

// Initialize Navbar Animation
const navbarAnimation = new NavbarAnimation();

// Export for global access
window.NavbarAnimation = NavbarAnimation;
window.navbarAnimation = navbarAnimation;