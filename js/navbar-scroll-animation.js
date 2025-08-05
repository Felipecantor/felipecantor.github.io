/**
 * Advanced Navbar Scroll Animation System
 * Makes navbar progressively smaller and can hide it during scroll for better content visibility
 */

class NavbarScrollAnimation {
    constructor() {
        this.navbar = null;
        this.heroSection = null;
        this.lastScrollTop = 0;
        this.scrollDirection = 'up';
        this.isScrolling = false;
        this.scrollTimer = null;
        this.mouseY = 0;
        
        // Configuration
        this.config = {
            heroThreshold: 100,      // Pixels from hero to activate compact mode
            scrollThreshold: 150,    // Pixels scrolled to activate minimal mode
            hideThreshold: 200,      // Pixels scrolled down to hide navbar
            showDelay: 150,          // ms delay before showing navbar after scroll stop
            peekZone: 50,           // Pixels from top to show navbar on hover
            animationDuration: 400   // ms for transitions
        };
        
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
            console.warn('🚫 Navbar not found for scroll animation');
            return;
        }

        this.setupScrollListener();
        this.setupMouseListener();
        this.setupTouchListener();
        
        console.log('🎬 Advanced Navbar Scroll Animation initialized');
    }

    setupScrollListener() {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateNavbarState();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupMouseListener() {
        // Track mouse position for peek functionality
        document.addEventListener('mousemove', (e) => {
            this.mouseY = e.clientY;
            this.handlePeekBehavior();
        }, { passive: true });
    }

    setupTouchListener() {
        // Handle touch events for mobile peek behavior
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            if (touchY < this.config.peekZone && touchStartY < this.config.peekZone) {
                this.navbar.classList.add('navbar-peek');
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            setTimeout(() => {
                this.navbar.classList.remove('navbar-peek');
            }, 1000);
        }, { passive: true });
    }

    updateNavbarState() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = scrollTop - this.lastScrollTop;
        
        // Determine scroll direction
        if (scrollDelta > 0) {
            this.scrollDirection = 'down';
        } else if (scrollDelta < 0) {
            this.scrollDirection = 'up';
        }

        // Clear existing scroll timer
        if (this.scrollTimer) {
            clearTimeout(this.scrollTimer);
        }

        // Mark as scrolling
        this.isScrolling = true;
        this.navbar.classList.add('navbar-scrolling');

        // Determine navbar state based on scroll position and direction
        this.determineNavbarState(scrollTop, scrollDelta);

        // Set timer to detect scroll end
        this.scrollTimer = setTimeout(() => {
            this.isScrolling = false;
            this.navbar.classList.remove('navbar-scrolling');
            this.onScrollEnd(scrollTop);
        }, this.config.showDelay);

        this.lastScrollTop = scrollTop;
    }

    determineNavbarState(scrollTop, scrollDelta) {
        const isInHero = this.isInHeroSection();
        
        // Remove all state classes first
        this.navbar.classList.remove('navbar-scrolled', 'navbar-minimal', 'navbar-hidden', 'navbar-peek');

        if (isInHero) {
            // In hero section: normal navbar
            console.log('🏠 In hero - normal navbar');
            return;
        }

        // Outside hero section
        this.navbar.classList.add('navbar-scrolled');

        // Progressive states based on scroll behavior
        if (scrollTop > this.config.scrollThreshold) {
            if (this.scrollDirection === 'down' && scrollDelta > 5) {
                // Scrolling down fast: minimal or hidden
                if (scrollTop > this.config.hideThreshold) {
                    this.navbar.classList.add('navbar-hidden');
                    console.log('👻 Scrolling down - navbar hidden');
                } else {
                    this.navbar.classList.add('navbar-minimal');
                    console.log('📉 Scrolling down - navbar minimal');
                }
            } else if (this.scrollDirection === 'up' || !this.isScrolling) {
                // Scrolling up or stopped: show minimal navbar
                this.navbar.classList.add('navbar-minimal');
                console.log('📈 Scrolling up - navbar minimal visible');
            }
        } else {
            // Near top but outside hero: compact navbar
            console.log('📍 Near top - navbar compact');
        }
    }

    onScrollEnd(scrollTop) {
        // When scrolling stops, ensure navbar is in appropriate state
        if (scrollTop > this.config.scrollThreshold && !this.isInHeroSection()) {
            this.navbar.classList.remove('navbar-hidden');
            this.navbar.classList.add('navbar-minimal');
            console.log('⏹️ Scroll ended - showing minimal navbar');
        }
    }

    handlePeekBehavior() {
        // Show navbar when mouse is near top of screen
        if (this.mouseY < this.config.peekZone && this.navbar.classList.contains('navbar-hidden')) {
            this.navbar.classList.add('navbar-peek');
            console.log('👀 Mouse peek - showing navbar');
        } else if (this.mouseY > this.config.peekZone * 2) {
            this.navbar.classList.remove('navbar-peek');
        }
    }

    isInHeroSection() {
        if (!this.heroSection) return false;
        
        const heroRect = this.heroSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Consider in hero if significant portion is visible
        const heroVisible = Math.min(heroRect.bottom, windowHeight) - Math.max(heroRect.top, 0);
        const heroHeight = heroRect.height;
        const isNearTop = heroRect.bottom > this.config.heroThreshold;
        
        return heroVisible > (heroHeight * 0.3) || isNearTop;
    }

    // Public API
    forceState(state) {
        const states = ['navbar-scrolled', 'navbar-minimal', 'navbar-hidden', 'navbar-peek'];
        states.forEach(s => this.navbar.classList.remove(s));
        
        if (state && state !== 'normal') {
            this.navbar.classList.add(state);
        }
        
        console.log(`🎯 Forced navbar state: ${state || 'normal'}`);
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        console.log('⚙️ Navbar scroll config updated:', this.config);
    }

    destroy() {
        if (this.scrollTimer) {
            clearTimeout(this.scrollTimer);
        }
        console.log('🗑️ Navbar scroll animation destroyed');
    }
}

// Initialize the advanced scroll animation
const navbarScrollAnimation = new NavbarScrollAnimation();

// Export for global access
window.NavbarScrollAnimation = NavbarScrollAnimation;
window.navbarScrollAnimation = navbarScrollAnimation;

// Integration with existing navbar animation
if (window.navbarAnimation) {
    console.log('🔗 Integrating with existing navbar animation system');
}