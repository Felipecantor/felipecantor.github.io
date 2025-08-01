/**
 * UX/UI Enhancements System
 * Mejoras avanzadas de experiencia de usuario e interfaz
 */

class UXEnhancementSystem {
    constructor() {
        this.isInitialized = false;
        this.observers = new Map();
        this.animations = new Map();
        this.touchStartY = 0;
        this.scrollDirection = 'down';
        this.lastScrollY = 0;
        
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
        this.setupMicroInteractions();
        this.setupLoadingStates();
        this.setupNavigationEnhancements();
        this.setupFormEnhancements();
        this.setupVisualHierarchy();
        this.setupInteractiveElements();
        this.setupAccessibilityEnhancements();
        this.setupMobileOptimizations();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        
        this.isInitialized = true;
        console.log('🎨 UX Enhancement System initialized');
    }

    // Micro-interacciones sutiles
    setupMicroInteractions() {
        // Hover effects mejorados para botones
        document.querySelectorAll('.btn, .nav-link, .proyecto-card, .contacto-item').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e.target, e);
                this.addHoverGlow(e.target);
            });
            
            element.addEventListener('mouseleave', (e) => {
                this.removeHoverGlow(e.target);
            });
        });

        // Click feedback con ondas
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, .nav-link, .contacto-item')) {
                this.createClickWave(e.target, e);
            }
        });

        // Animación de entrada para elementos al hacer scroll
        this.setupScrollRevealAnimations();
    }

    createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    addHoverGlow(element) {
        element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4)';
        element.style.transition = 'all 0.3s ease';
    }

    removeHoverGlow(element) {
        element.style.boxShadow = '';
    }

    createClickWave(element, event) {
        const wave = document.createElement('div');
        wave.className = 'click-wave';
        
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        wave.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            left: ${x - 2}px;
            top: ${y - 2}px;
            background: rgba(59, 130, 246, 0.8);
            border-radius: 50%;
            pointer-events: none;
            animation: clickWave 0.5s ease-out;
            z-index: 10;
        `;
        
        element.appendChild(wave);
        setTimeout(() => wave.remove(), 500);
    }

    // Estados de carga mejorados
    setupLoadingStates() {
        // Skeleton loaders para contenido dinámico
        this.createSkeletonStyles();
        
        // Loading spinners elegantes
        this.createLoadingSpinners();
        
        // Progress indicators
        this.setupProgressIndicators();
    }

    createSkeletonStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .skeleton {
                background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);
                background-size: 200% 100%;
                animation: skeleton-loading 1.5s infinite;
                border-radius: 4px;
            }
            
            .skeleton-text {
                height: 1rem;
                margin-bottom: 0.5rem;
            }
            
            .skeleton-title {
                height: 1.5rem;
                width: 60%;
                margin-bottom: 1rem;
            }
            
            .skeleton-avatar {
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
            }
            
            @keyframes skeleton-loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `;
        document.head.appendChild(style);
    }

    createLoadingSpinners() {
        const style = document.createElement('style');
        style.textContent = `
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid #334155;
                border-top: 3px solid #3b82f6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 20px auto;
            }
            
            .loading-dots {
                display: flex;
                gap: 4px;
                justify-content: center;
                align-items: center;
                height: 40px;
            }
            
            .loading-dot {
                width: 8px;
                height: 8px;
                background: #3b82f6;
                border-radius: 50%;
                animation: loading-dots 1.4s infinite ease-in-out;
            }
            
            .loading-dot:nth-child(1) { animation-delay: -0.32s; }
            .loading-dot:nth-child(2) { animation-delay: -0.16s; }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes loading-dots {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    setupProgressIndicators() {
        // Progress bar para scroll
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #60a5fa);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    // Mejoras de navegación
    setupNavigationEnhancements() {
        // Smooth scroll mejorado
        this.setupSmoothScroll();
        
        // Navegación inteligente (ocultar/mostrar en scroll)
        this.setupIntelligentNavigation();
        
        // Indicadores de sección activa
        this.setupActiveSection();
        
        // Breadcrumbs dinámicos
        this.setupBreadcrumbs();
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Feedback visual
                    target.style.animation = 'highlight 2s ease-out';
                    setTimeout(() => {
                        target.style.animation = '';
                    }, 2000);
                }
            });
        });
    }

    setupIntelligentNavigation() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
                this.scrollDirection = 'down';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
                this.scrollDirection = 'up';
            }
            
            this.lastScrollY = currentScrollY;
        });
    }

    setupActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to current section link
                    const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => observer.observe(section));
    }

    setupBreadcrumbs() {
        const breadcrumb = document.createElement('div');
        breadcrumb.className = 'breadcrumb';
        breadcrumb.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(30, 41, 59, 0.9);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.875rem;
            color: #cbd5e1;
            backdrop-filter: blur(10px);
            border: 1px solid #475569;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(breadcrumb);

        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1);
                    breadcrumb.textContent = sectionName.replace('-', ' ');
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => observer.observe(section));
    }

    // Mejoras de formularios
    setupFormEnhancements() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            this.enhanceFormInputs(form);
            this.addRealTimeValidation(form);
            this.addFormProgress(form);
        });
    }

    enhanceFormInputs(form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Floating labels
            this.createFloatingLabel(input);
            
            // Input focus effects
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('input-focused');
                if (input.value) {
                    input.parentElement.classList.add('input-filled');
                } else {
                    input.parentElement.classList.remove('input-filled');
                }
            });
        });
    }

    createFloatingLabel(input) {
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        wrapper.style.cssText = `
            position: relative;
            margin-bottom: 1.5rem;
        `;
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            wrapper.appendChild(label);
            label.style.cssText = `
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-50%);
                transition: all 0.3s ease;
                pointer-events: none;
                color: #94a3b8;
            `;
        }
    }

    addRealTimeValidation(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
            
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });
        });
    }

    validateInput(input) {
        const isValid = input.checkValidity();
        const wrapper = input.closest('.input-wrapper') || input.parentElement;
        
        wrapper.classList.remove('input-valid', 'input-invalid');
        
        if (input.value) {
            if (isValid) {
                wrapper.classList.add('input-valid');
                this.showValidationMessage(wrapper, '✓ Válido', 'success');
            } else {
                wrapper.classList.add('input-invalid');
                this.showValidationMessage(wrapper, input.validationMessage, 'error');
            }
        }
    }

    showValidationMessage(wrapper, message, type) {
        let messageEl = wrapper.querySelector('.validation-message');
        
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'validation-message';
            wrapper.appendChild(messageEl);
        }
        
        messageEl.textContent = message;
        messageEl.className = `validation-message validation-${type}`;
        messageEl.style.cssText = `
            font-size: 0.75rem;
            margin-top: 4px;
            color: ${type === 'success' ? '#10b981' : '#ef4444'};
            transition: all 0.3s ease;
        `;
    }

    addFormProgress(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        const progressBar = document.createElement('div');
        const progressFill = document.createElement('div');
        
        progressBar.className = 'form-progress';
        progressFill.className = 'form-progress-fill';
        
        progressBar.style.cssText = `
            width: 100%;
            height: 4px;
            background: #334155;
            border-radius: 2px;
            margin-bottom: 1rem;
            overflow: hidden;
        `;
        
        progressFill.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #10b981);
            border-radius: 2px;
            width: 0%;
            transition: width 0.3s ease;
        `;
        
        progressBar.appendChild(progressFill);
        form.insertBefore(progressBar, form.firstChild);
        
        const updateProgress = () => {
            const filledInputs = Array.from(inputs).filter(input => input.value && input.checkValidity());
            const progress = (filledInputs.length / inputs.length) * 100;
            progressFill.style.width = `${progress}%`;
        };
        
        inputs.forEach(input => {
            input.addEventListener('input', updateProgress);
        });
    }

    // Animaciones de scroll
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.section, .proyecto-card, .timeline-item, .skill-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    setupScrollRevealAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .fade-in-up {
                animation: fadeInUp 0.6s ease forwards;
            }
            
            .fade-in-left {
                animation: fadeInLeft 0.6s ease forwards;
            }
            
            .fade-in-right {
                animation: fadeInRight 0.6s ease forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes fadeInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            @keyframes clickWave {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(10);
                    opacity: 0;
                }
            }
            
            @keyframes highlight {
                0% { background-color: rgba(59, 130, 246, 0.1); }
                50% { background-color: rgba(59, 130, 246, 0.2); }
                100% { background-color: transparent; }
            }
        `;
        document.head.appendChild(style);
    }

    // Efectos parallax sutiles
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero, .section-title');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate * 0.1}px)`;
            });
        });
    }

    // Mejoras de accesibilidad
    setupAccessibilityEnhancements() {
        this.setupFocusManagement();
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
    }

    setupFocusManagement() {
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid #3b82f6';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key closes modals
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.open');
                if (openModal) {
                    this.closeModal(openModal);
                }
            }
            
            // Arrow keys for navigation
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                const focusedElement = document.activeElement;
                const focusableElements = Array.from(document.querySelectorAll('a, button, input, textarea'));
                const currentIndex = focusableElements.indexOf(focusedElement);
                
                if (currentIndex !== -1) {
                    e.preventDefault();
                    const nextIndex = e.key === 'ArrowDown' 
                        ? (currentIndex + 1) % focusableElements.length
                        : (currentIndex - 1 + focusableElements.length) % focusableElements.length;
                    
                    focusableElements[nextIndex].focus();
                }
            }
        });
    }

    setupScreenReaderSupport() {
        // Add ARIA labels where missing
        document.querySelectorAll('button:not([aria-label])').forEach(button => {
            if (!button.textContent.trim()) {
                button.setAttribute('aria-label', 'Button');
            }
        });
        
        // Add live regions for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    // Optimizaciones móviles
    setupMobileOptimizations() {
        this.setupTouchGestures();
        this.setupMobileNavigation();
        this.setupMobileFormOptimizations();
    }

    setupTouchGestures() {
        let startY = 0;
        let startX = 0;
        
        document.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const currentX = e.touches[0].clientX;
            const diffY = startY - currentY;
            const diffX = startX - currentX;
            
            // Detect swipe gestures
            if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
                if (diffY > 0) {
                    // Swipe up
                    this.handleSwipeUp();
                } else {
                    // Swipe down
                    this.handleSwipeDown();
                }
            }
        }, { passive: true });
    }

    handleSwipeUp() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transform = 'translateY(-100%)';
        }
    }

    handleSwipeDown() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transform = 'translateY(0)';
        }
    }

    setupMobileNavigation() {
        // Mobile menu toggle
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-toggle';
        mobileMenuButton.innerHTML = '☰';
        mobileMenuButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: #cbd5e1;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;
        
        const navbar = document.querySelector('.navbar .nav-container');
        if (navbar) {
            navbar.appendChild(mobileMenuButton);
        }
        
        // Show mobile menu button on small screens
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleScreenChange = (e) => {
            if (e.matches) {
                mobileMenuButton.style.display = 'block';
            } else {
                mobileMenuButton.style.display = 'none';
            }
        };
        
        mediaQuery.addListener(handleScreenChange);
        handleScreenChange(mediaQuery);
    }

    setupMobileFormOptimizations() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Prevent zoom on input focus on iOS
            input.addEventListener('focus', () => {
                if (window.innerWidth < 768) {
                    const viewport = document.querySelector('meta[name=viewport]');
                    if (viewport) {
                        viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
                    }
                }
            });
            
            input.addEventListener('blur', () => {
                if (window.innerWidth < 768) {
                    const viewport = document.querySelector('meta[name=viewport]');
                    if (viewport) {
                        viewport.setAttribute('content', 'width=device-width, initial-scale=1');
                    }
                }
            });
        });
    }

    // Utility methods
    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }

    closeModal(modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        
        // Return focus to trigger element
        const trigger = document.querySelector(`[data-modal="${modal.id}"]`);
        if (trigger) {
            trigger.focus();
        }
    }

    // Public API
    refresh() {
        this.setup();
    }

    addCustomAnimation(element, animationName, duration = '0.6s') {
        element.style.animation = `${animationName} ${duration} ease forwards`;
    }

    createNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, duration);
        
        return notification;
    }
}

// Initialize UX Enhancement System
const uxEnhancements = new UXEnhancementSystem();

// Export for use in other modules
window.UXEnhancementSystem = UXEnhancementSystem;
window.uxEnhancements = uxEnhancements;