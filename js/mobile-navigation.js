/**
 * Mobile Navigation System
 * Sistema avanzado de navegación para dispositivos móviles
 */

class MobileNavigation {
    constructor() {
        this.isMenuOpen = false;
        this.menuToggle = null;
        this.menuDrawer = null;
        this.menuOverlay = null;
        this.hamburgerLines = [];
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.swipeThreshold = 50;
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
        this.createMobileNavigation();
        this.setupEventListeners();
        this.setupSwipeGestures();
        this.setupKeyboardNavigation();
        
        this.isInitialized = true;
        console.log('📱 Mobile Navigation System initialized');
    }

    createMobileNavigation() {
        // Find existing navbar or create one
        let navbar = document.querySelector('.navbar');
        if (!navbar) {
            navbar = document.createElement('nav');
            navbar.className = 'navbar';
            document.body.insertBefore(navbar, document.body.firstChild);
        }

        let navContainer = navbar.querySelector('.nav-container');
        if (!navContainer) {
            navContainer = document.createElement('div');
            navContainer.className = 'nav-container container';
            navbar.appendChild(navContainer);
        }

        // Create or update brand/logo
        let brand = navContainer.querySelector('.nav-brand');
        if (!brand) {
            brand = document.createElement('a');
            brand.className = 'nav-brand';
            brand.href = '#';
            brand.textContent = 'Anderson Cantor';
            navContainer.insertBefore(brand, navContainer.firstChild);
        }

        // Create hamburger menu button
        this.createHamburgerButton(navContainer);
        
        // Create mobile menu drawer
        this.createMenuDrawer();
        
        // Create overlay
        this.createMenuOverlay();
        
        // Setup existing menu items
        this.setupMenuItems();
    }

    createHamburgerButton(container) {
        // Remove existing button if any
        const existingButton = container.querySelector('.mobile-menu-toggle');
        if (existingButton) {
            existingButton.remove();
        }

        this.menuToggle = document.createElement('button');
        this.menuToggle.className = 'mobile-menu-toggle';
        this.menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.menuToggle.setAttribute('aria-controls', 'mobile-menu');

        // Create hamburger lines
        for (let i = 0; i < 3; i++) {
            const line = document.createElement('span');
            line.className = 'hamburger-line';
            this.menuToggle.appendChild(line);
            this.hamburgerLines.push(line);
        }

        container.appendChild(this.menuToggle);
    }

    createMenuDrawer() {
        // Remove existing drawer if any
        const existingDrawer = document.querySelector('.nav-menu');
        if (existingDrawer && existingDrawer.classList.contains('mobile-drawer')) {
            existingDrawer.remove();
        }

        this.menuDrawer = document.createElement('div');
        this.menuDrawer.className = 'nav-menu mobile-drawer';
        this.menuDrawer.id = 'mobile-menu';
        this.menuDrawer.setAttribute('aria-hidden', 'true');
        this.menuDrawer.setAttribute('role', 'navigation');
        this.menuDrawer.setAttribute('aria-label', 'Menú principal');

        document.body.appendChild(this.menuDrawer);
    }

    createMenuOverlay() {
        this.menuOverlay = document.createElement('div');
        this.menuOverlay.className = 'mobile-menu-overlay';
        this.menuOverlay.setAttribute('aria-hidden', 'true');
        
        document.body.appendChild(this.menuOverlay);
    }

    setupMenuItems() {
        // Define navigation items
        const menuItems = [
            { href: '#hero', text: 'Inicio', icon: '🏠' },
            { href: '#sobre-mi', text: 'Sobre Mí', icon: '👨‍💻' },
            { href: '#academica', text: 'Formación', icon: '🎓' },
            { href: '#proyectos-u', text: 'Proyectos U', icon: '🎯' },
            { href: '#proyectos-trabajo', text: 'Trabajo', icon: '💼' },
            { href: '#proyectos-personales', text: 'Personales', icon: '🚀' },
            { href: '#experiencias', text: 'Experiencia', icon: '⭐' },
            { href: '#contacto', text: 'Contacto', icon: '📧' }
        ];

        // Clear existing items
        this.menuDrawer.innerHTML = '';

        // Create menu items
        menuItems.forEach((item, index) => {
            const menuItem = document.createElement('div');
            menuItem.className = 'nav-item';

            const link = document.createElement('a');
            link.className = 'nav-link';
            link.href = item.href;
            link.setAttribute('data-section', item.href.substring(1));
            link.innerHTML = `
                <span class="nav-icon">${item.icon}</span>
                <span class="nav-text">${item.text}</span>
            `;

            // Add animation delay
            link.style.animationDelay = `${index * 0.1}s`;

            menuItem.appendChild(link);
            this.menuDrawer.appendChild(menuItem);
        });

        // Add close button at the bottom
        this.addCloseButton();
    }

    addCloseButton() {
        const closeButton = document.createElement('button');
        closeButton.className = 'mobile-menu-close';
        closeButton.innerHTML = `
            <span class="nav-icon">✕</span>
            <span class="nav-text">Cerrar Menú</span>
        `;
        closeButton.setAttribute('aria-label', 'Cerrar menú');
        
        const closeItem = document.createElement('div');
        closeItem.className = 'nav-item nav-item-close';
        closeItem.appendChild(closeButton);
        
        this.menuDrawer.appendChild(closeItem);

        // Add styles for close button
        const style = document.createElement('style');
        style.textContent = `
            .nav-item-close {
                margin-top: auto;
                border-top: 1px solid rgba(71, 85, 105, 0.3);
                border-bottom: none;
            }
            
            .mobile-menu-close {
                width: 100%;
                background: none;
                border: none;
                padding: 16px 24px;
                font-size: 1.1rem;
                font-weight: 500;
                color: var(--text-muted);
                text-align: left;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .mobile-menu-close:hover {
                background: rgba(239, 68, 68, 0.1);
                color: #ef4444;
            }
            
            .nav-icon {
                font-size: 1.2rem;
                width: 24px;
                text-align: center;
            }
            
            .nav-text {
                flex: 1;
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Hamburger button click
        this.menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });

        // Overlay click
        this.menuOverlay.addEventListener('click', () => {
            this.closeMenu();
        });

        // Menu link clicks
        this.menuDrawer.addEventListener('click', (e) => {
            if (e.target.closest('.nav-link')) {
                e.preventDefault();
                const link = e.target.closest('.nav-link');
                const targetId = link.getAttribute('href');
                
                // Close menu first
                this.closeMenu();
                
                // Navigate to section with delay
                setTimeout(() => {
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Update active state
                        this.updateActiveState(targetId);
                    }
                }, 300);
            }
            
            if (e.target.closest('.mobile-menu-close')) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Handle resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Update active section on scroll
        this.setupScrollSpy();
    }

    setupSwipeGestures() {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;

            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;

            const diffX = startX - currentX;
            const diffY = startY - currentY;

            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY)) {
                // Swipe from right edge to open menu
                if (startX > window.innerWidth - 50 && diffX < -this.swipeThreshold && !this.isMenuOpen) {
                    this.openMenu();
                }
                
                // Swipe left to close menu
                if (diffX > this.swipeThreshold && this.isMenuOpen) {
                    this.closeMenu();
                }
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            startX = 0;
            startY = 0;
            currentX = 0;
            currentY = 0;
        }, { passive: true });
    }

    setupKeyboardNavigation() {
        // Focus trap when menu is open
        document.addEventListener('keydown', (e) => {
            if (!this.isMenuOpen) return;

            if (e.key === 'Tab') {
                const focusableElements = this.menuDrawer.querySelectorAll(
                    'a, button, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const options = {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveState(`#${entry.target.id}`);
                }
            });
        }, options);

        sections.forEach(section => observer.observe(section));
    }

    updateActiveState(activeHref) {
        // Remove active class from all links
        const allLinks = this.menuDrawer.querySelectorAll('.nav-link');
        allLinks.forEach(link => link.classList.remove('active'));

        // Add active class to current link
        const currentLink = this.menuDrawer.querySelector(`a[href="${activeHref}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }

    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isMenuOpen = true;
        
        // Update button state
        this.menuToggle.classList.add('active');
        this.menuToggle.setAttribute('aria-expanded', 'true');
        
        // Show menu and overlay
        this.menuDrawer.classList.add('active');
        this.menuOverlay.classList.add('active');
        
        // Update ARIA attributes
        this.menuDrawer.setAttribute('aria-hidden', 'false');
        this.menuOverlay.setAttribute('aria-hidden', 'false');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Focus first menu item
        setTimeout(() => {
            const firstLink = this.menuDrawer.querySelector('.nav-link');
            if (firstLink) {
                firstLink.focus();
            }
        }, 300);
        
        // Add animation classes to menu items
        const menuItems = this.menuDrawer.querySelectorAll('.nav-item');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-slide-in-mobile');
            }, index * 50);
        });

        // Announce to screen readers
        this.announceToScreenReader('Menú abierto');
    }

    closeMenu() {
        this.isMenuOpen = false;
        
        // Update button state
        this.menuToggle.classList.remove('active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        
        // Hide menu and overlay
        this.menuDrawer.classList.remove('active');
        this.menuOverlay.classList.remove('active');
        
        // Update ARIA attributes
        this.menuDrawer.setAttribute('aria-hidden', 'true');
        this.menuOverlay.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Return focus to toggle button
        this.menuToggle.focus();
        
        // Remove animation classes
        const menuItems = this.menuDrawer.querySelectorAll('.nav-item');
        menuItems.forEach(item => {
            item.classList.remove('animate-slide-in-mobile');
        });

        // Announce to screen readers
        this.announceToScreenReader('Menú cerrado');
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Public API
    open() {
        this.openMenu();
    }

    close() {
        this.closeMenu();
    }

    toggle() {
        this.toggleMenu();
    }

    isOpen() {
        return this.isMenuOpen;
    }

    refresh() {
        if (this.isInitialized) {
            this.setupMenuItems();
        }
    }

    destroy() {
        // Clean up event listeners and elements
        if (this.menuToggle) {
            this.menuToggle.remove();
        }
        if (this.menuDrawer) {
            this.menuDrawer.remove();
        }
        if (this.menuOverlay) {
            this.menuOverlay.remove();
        }
        
        document.body.style.overflow = '';
        this.isInitialized = false;
    }
}

// Initialize mobile navigation only on mobile devices
const initMobileNavigation = () => {
    if (window.innerWidth <= 768) {
        if (!window.mobileNavigation) {
            window.mobileNavigation = new MobileNavigation();
        }
    } else {
        // Clean up mobile navigation on desktop
        if (window.mobileNavigation) {
            window.mobileNavigation.destroy();
            window.mobileNavigation = null;
        }
    }
};

// Initialize on load and resize
document.addEventListener('DOMContentLoaded', initMobileNavigation);
window.addEventListener('resize', initMobileNavigation);

// Export for manual usage
window.MobileNavigation = MobileNavigation;