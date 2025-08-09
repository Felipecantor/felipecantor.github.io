/**
 * Universal Platform System
 * Sistema que detecta y optimiza la experiencia para todas las plataformas
 */

class UniversalPlatformSystem {
    constructor() {
        this.platform = null;
        this.deviceType = null;
        this.inputMethod = null;
        this.screenSize = null;
        this.capabilities = {};
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
        this.detectPlatform();
        this.detectCapabilities();
        this.setupUniversalNavigation();
        this.setupPlatformSpecificFeatures();
        this.setupKeyboardShortcuts();
        this.setupResizeHandler();
        this.setupPerformanceOptimizations();
        
        this.isInitialized = true;
        console.log(`🌍 Universal Platform System initialized for ${this.platform}`);
    }

    detectPlatform() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const userAgent = navigator.userAgent;
        
        // Detect screen size category
        if (width <= 767) {
            this.screenSize = 'mobile';
        } else if (width <= 1023) {
            this.screenSize = 'tablet';
        } else if (width <= 1439) {
            this.screenSize = 'desktop';
        } else {
            this.screenSize = 'desktop-xl';
        }
        
        // Detect device type
        if (/iPad|iPhone|iPod/.test(userAgent)) {
            this.deviceType = 'ios';
        } else if (/Android/.test(userAgent)) {
            this.deviceType = 'android';
        } else if (/Windows/.test(userAgent)) {
            this.deviceType = 'windows';
        } else if (/Mac/.test(userAgent)) {
            this.deviceType = 'mac';
        } else {
            this.deviceType = 'unknown';
        }
        
        // Detect input method
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            if (width >= 768) {
                this.inputMethod = 'hybrid'; // Tablet with touch
            } else {
                this.inputMethod = 'touch'; // Mobile
            }
        } else {
            this.inputMethod = 'mouse'; // Desktop
        }
        
        // Set primary platform
        this.platform = this.screenSize;
        
        // Add platform classes to body
        document.body.classList.add(`platform-${this.screenSize}`);
        document.body.classList.add(`device-${this.deviceType}`);
        document.body.classList.add(`input-${this.inputMethod}`);
        
        // Set CSS custom properties
        document.documentElement.style.setProperty('--screen-width', `${width}px`);
        document.documentElement.style.setProperty('--screen-height', `${height}px`);
        document.documentElement.style.setProperty('--platform', this.platform);
    }

    detectCapabilities() {
        this.capabilities = {
            // Hardware capabilities
            touchSupport: 'ontouchstart' in window,
            mouseSupport: window.matchMedia('(hover: hover)').matches,
            keyboardSupport: true,
            
            // Display capabilities
            highDPI: window.devicePixelRatio > 1,
            wideScreen: window.innerWidth / window.innerHeight > 1.5,
            darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            highContrast: window.matchMedia('(prefers-contrast: high)').matches,
            
            // Performance capabilities
            hardwareAcceleration: this.checkHardwareAcceleration(),
            modernBrowser: this.checkModernBrowser(),
            connectionSpeed: this.getConnectionSpeed(),
            
            // Platform specific
            isMobile: this.screenSize === 'mobile',
            isTablet: this.screenSize === 'tablet',
            isDesktop: this.screenSize === 'desktop' || this.screenSize === 'desktop-xl',
            isHybrid: this.inputMethod === 'hybrid'
        };
        
        // Apply capability classes
        Object.keys(this.capabilities).forEach(capability => {
            if (this.capabilities[capability]) {
                document.body.classList.add(`has-${capability.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
            }
        });
    }

    checkHardwareAcceleration() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
    }

    checkModernBrowser() {
        return !!(window.IntersectionObserver && 
                 window.ResizeObserver && 
                 CSS.supports('backdrop-filter', 'blur(10px)') &&
                 'serviceWorker' in navigator);
    }

    getConnectionSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType) {
                return connection.effectiveType; // '4g', '3g', '2g', 'slow-2g'
            }
        }
        return 'unknown';
    }

    setupUniversalNavigation() {
        // Setup platform-specific navigation (navbar already exists in HTML)
        if (this.capabilities.isMobile) {
            this.setupMobileNavigation();
        } else if (this.capabilities.isTablet) {
            this.setupTabletNavigation();
        } else if (this.capabilities.isDesktop) {
            this.setupDesktopNavigation();
        }
    }

    // Removed createUniversalNavbar and createDesktopMenu methods to prevent duplicate navbar creation

    setupMobileNavigation() {
        // Mobile navigation handled by existing mobile system
        console.log('📱 Mobile navigation active');
    }

    setupTabletNavigation() {
        console.log('📱 Tablet navigation active');
        
        // Setup tablet-specific interactions
        this.setupTabletGestures();
        this.optimizeTabletLayout();
    }

    setupDesktopNavigation() {
        console.log('🖥️ Desktop navigation active');
        
        // Setup desktop-specific features
        this.setupDesktopHoverEffects();
        this.setupDesktopKeyboardNavigation();
        this.setupDesktopScrollEffects();
    }

    // Removed setupDesktopNavigationListeners method as it referenced dynamically created elements

    setupScrollSpy(links) {
        const sections = document.querySelectorAll('section[id], div[id]');
        const options = {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavigation(`#${entry.target.id}`);
                }
            });
        }, options);

        sections.forEach(section => {
            if (section.id) {
                observer.observe(section);
            }
        });
    }

    updateActiveNavigation(activeHref) {
        // Update navigation links (using existing navbar structure)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeHref) {
                link.classList.add('active');
            }
        });

        // Update mobile navigation if exists
        if (window.mobileNavigation) {
            window.mobileNavigation.updateActiveState(activeHref);
        }
    }

    smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    setupTabletGestures() {
        // Tablet-specific gesture handling
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Three-finger swipe for navigation
            if (e.changedTouches.length === 3) {
                if (Math.abs(diffX) > Math.abs(diffY)) {
                    if (diffX > 50) {
                        // Swipe left - next section
                        this.navigateToNextSection();
                    } else if (diffX < -50) {
                        // Swipe right - previous section
                        this.navigateToPreviousSection();
                    }
                }
            }
        }, { passive: true });
    }

    optimizeTabletLayout() {
        // Tablet-specific layout optimizations
        const cards = document.querySelectorAll('.proyecto-card');
        cards.forEach(card => {
            card.classList.add('tablet-optimized');
        });
    }

    setupDesktopHoverEffects() {
        // Enhanced hover effects for desktop
        const cards = document.querySelectorAll('.proyecto-card, .contacto-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createHoverGlow(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeHoverGlow(card);
            });
        });
    }

    createHoverGlow(element) {
        if (!this.capabilities.isDesktop) return;

        const glow = document.createElement('div');
        glow.className = 'desktop-hover-glow';
        glow.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, 
                rgba(59, 130, 246, 0.3), 
                rgba(59, 130, 246, 0.1), 
                rgba(59, 130, 246, 0.3));
            border-radius: inherit;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.appendChild(glow);

        requestAnimationFrame(() => {
            glow.style.opacity = '1';
        });
    }

    removeHoverGlow(element) {
        const glow = element.querySelector('.desktop-hover-glow');
        if (glow) {
            glow.style.opacity = '0';
            setTimeout(() => {
                if (glow.parentNode) {
                    glow.parentNode.removeChild(glow);
                }
            }, 300);
        }
    }

    setupDesktopKeyboardNavigation() {
        // Enhanced keyboard navigation for desktop
        document.addEventListener('keydown', (e) => {
            if (!this.capabilities.isDesktop) return;

            // Ctrl/Cmd + Number keys for quick navigation
            if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '8') {
                e.preventDefault();
                const sectionIndex = parseInt(e.key) - 1;
                const sections = ['#hero', '#sobre-mi', '#academica', '#proyectos-u', 
                                '#proyectos-trabajo', '#proyectos-personales', '#experiencias', '#contacto'];
                
                if (sections[sectionIndex]) {
                    this.smoothScrollTo(sections[sectionIndex]);
                }
            }

            // Arrow keys for section navigation
            if (e.altKey) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateToNextSection();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateToPreviousSection();
                }
            }

            // Escape to close any open modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    setupDesktopScrollEffects() {
        if (!this.capabilities.isDesktop) return;

        // Parallax effect for hero section
        const hero = document.querySelector('#hero, .hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.5;
                hero.style.transform = `translateY(${parallax}px)`;
            }, { passive: true });
        }

        // Navbar hide/show on scroll
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar-universal');
        
        if (!navbar) {
            return;
        }
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }

    navigateToNextSection() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const currentSection = this.getCurrentSection();
        const currentIndex = Array.from(sections).findIndex(section => section.id === currentSection);
        
        if (currentIndex < sections.length - 1) {
            const nextSection = sections[currentIndex + 1];
            this.smoothScrollTo(`#${nextSection.id}`);
        }
    }

    navigateToPreviousSection() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const currentSection = this.getCurrentSection();
        const currentIndex = Array.from(sections).findIndex(section => section.id === currentSection);
        
        if (currentIndex > 0) {
            const previousSection = sections[currentIndex - 1];
            this.smoothScrollTo(`#${previousSection.id}`);
        }
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const scrollPosition = window.pageYOffset + 200;
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section.offsetTop <= scrollPosition) {
                return section.id;
            }
        }
        
        return sections[0]?.id || '';
    }

    closeAllModals() {
        // Close mobile menu if open
        if (window.mobileNavigation && window.mobileNavigation.isOpen()) {
            window.mobileNavigation.close();
        }

        // Close any expanded cards
        if (window.mobileCards) {
            window.mobileCards.hideAllActions();
        }

        // Close any other modals
        const modals = document.querySelectorAll('.modal, .mobile-card-expanded');
        modals.forEach(modal => {
            if (modal.classList.contains('active') || modal.style.display !== 'none') {
                modal.style.display = 'none';
                modal.classList.remove('active');
            }
        });
    }

    setupKeyboardShortcuts() {
        const shortcuts = {
            'h': () => this.smoothScrollTo('#hero'),
            's': () => this.smoothScrollTo('#sobre-mi'),
            'a': () => this.smoothScrollTo('#academica'),
            'p': () => this.smoothScrollTo('#proyectos-u'),
            'e': () => this.smoothScrollTo('#experiencias'),
            'c': () => this.smoothScrollTo('#contacto'),
            '?': () => this.showKeyboardShortcuts()
        };

        document.addEventListener('keydown', (e) => {
            // Only activate shortcuts when not in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            // Only for desktop
            if (!this.capabilities.isDesktop) return;

            const shortcut = shortcuts[e.key.toLowerCase()];
            if (shortcut) {
                e.preventDefault();
                shortcut();
            }
        });
    }

    showKeyboardShortcuts() {
        if (document.querySelector('.keyboard-shortcuts-modal')) return;

        const modal = document.createElement('div');
        modal.className = 'keyboard-shortcuts-modal';
        modal.innerHTML = `
            <div class="shortcuts-content">
                <h3>Atajos de Teclado</h3>
                <div class="shortcuts-grid">
                    <div><kbd>H</kbd> Inicio</div>
                    <div><kbd>S</kbd> Sobre Mí</div>
                    <div><kbd>A</kbd> Formación</div>
                    <div><kbd>P</kbd> Proyectos</div>
                    <div><kbd>E</kbd> Experiencia</div>
                    <div><kbd>C</kbd> Contacto</div>
                    <div><kbd>Ctrl+1-8</kbd> Navegación rápida</div>
                    <div><kbd>Alt+↑↓</kbd> Secciones</div>
                    <div><kbd>Esc</kbd> Cerrar</div>
                    <div><kbd>?</kbd> Esta ayuda</div>
                </div>
                <button class="close-shortcuts">Cerrar</button>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-shortcuts-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .shortcuts-content {
                background: var(--bg-white);
                padding: 2rem;
                border-radius: 16px;
                max-width: 400px;
                width: 90%;
                color: var(--text-dark);
            }
            
            .shortcuts-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.5rem;
                margin: 1rem 0;
            }
            
            .shortcuts-grid div {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            kbd {
                background: var(--bg-gray);
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-family: monospace;
                font-size: 0.8rem;
                color: var(--text-light);
            }
            
            .close-shortcuts {
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                cursor: pointer;
                margin-top: 1rem;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(modal);

        // Close handlers
        const closeBtn = modal.querySelector('.close-shortcuts');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            style.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                style.remove();
            }
        });

        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                modal.remove();
                style.remove();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const oldPlatform = this.platform;
                this.detectPlatform();
                
                if (oldPlatform !== this.platform) {
                    console.log(`🔄 Platform changed: ${oldPlatform} → ${this.platform}`);
                    this.handlePlatformChange(oldPlatform, this.platform);
                }
            }, 250);
        });
    }

    handlePlatformChange(oldPlatform, newPlatform) {
        // Clean up old platform features
        this.cleanupPlatformFeatures(oldPlatform);
        
        // Setup new platform features
        this.setupPlatformSpecificFeatures();
        
        // Refresh other systems
        if (window.mobileNavigation) {
            if (newPlatform === 'mobile') {
                if (!window.mobileNavigation.isInitialized) {
                    window.mobileNavigation = new MobileNavigation();
                }
            } else {
                if (window.mobileNavigation.isOpen()) {
                    window.mobileNavigation.close();
                }
            }
        }

        if (window.mobileCards) {
            window.mobileCards.refresh();
        }

        if (window.uxEnhancements) {
            window.uxEnhancements.refresh();
        }
    }

    cleanupPlatformFeatures(platform) {
        // Remove platform-specific event listeners and elements
        const glows = document.querySelectorAll('.desktop-hover-glow');
        glows.forEach(glow => glow.remove());
    }

    setupPlatformSpecificFeatures() {
        if (this.capabilities.isMobile) {
            this.setupMobileNavigation();
        } else if (this.capabilities.isTablet) {
            this.setupTabletNavigation();
        } else if (this.capabilities.isDesktop) {
            this.setupDesktopNavigation();
        }
    }

    setupPerformanceOptimizations() {
        // Optimize based on device capabilities
        if (this.capabilities.connectionSpeed === 'slow-2g' || this.capabilities.connectionSpeed === '2g') {
            // Reduce animations for slow connections
            document.body.classList.add('reduced-animations');
        }

        if (!this.capabilities.hardwareAcceleration) {
            // Disable heavy effects
            document.body.classList.add('no-hardware-acceleration');
        }

        if (this.capabilities.reducedMotion) {
            // Respect user preference
            document.body.classList.add('prefers-reduced-motion');
        }
    }

    // Public API
    getPlatform() {
        return this.platform;
    }

    getCapabilities() {
        return this.capabilities;
    }

    isMobile() {
        return this.capabilities.isMobile;
    }

    isTablet() {
        return this.capabilities.isTablet;
    }

    isDesktop() {
        return this.capabilities.isDesktop;
    }

    refresh() {
        this.detectPlatform();
        this.detectCapabilities();
        this.setupPlatformSpecificFeatures();
    }
}

// Initialize Universal Platform System
const universalPlatform = new UniversalPlatformSystem();

// Export for global access
window.UniversalPlatformSystem = UniversalPlatformSystem;
window.universalPlatform = universalPlatform;