/**
 * Mobile Cards System
 * Sistema de tarjetas optimizado para dispositivos móviles con swipe gestures
 */

class MobileCardsSystem {
    constructor() {
        this.cards = [];
        this.activeCard = null;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchCurrentX = 0;
        this.touchCurrentY = 0;
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
        // Only initialize on mobile devices
        if (window.innerWidth <= 768) {
            this.setupCards();
            this.setupSwipeGestures();
            this.setupTouchFeedback();
            this.setupCardNavigation();
            
            this.isInitialized = true;
            console.log('📱 Mobile Cards System initialized');
        }
    }

    setupCards() {
        // Find all project cards
        const projectCards = document.querySelectorAll('.proyecto-card');
        
        projectCards.forEach((card, index) => {
            this.enhanceCard(card, index);
        });

        // Setup card containers
        this.setupCardContainers();
    }

    enhanceCard(card, index) {
        // Add mobile-specific classes and attributes
        card.classList.add('mobile-card');
        card.setAttribute('data-card-index', index);
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
        
        // Add touch indicators
        this.addTouchIndicators(card);
        
        // Add card actions
        this.enhanceCardActions(card);
        
        // Add to cards array
        this.cards.push({
            element: card,
            index: index,
            isExpanded: false
        });
    }

    addTouchIndicators(card) {
        // Add swipe indicator
        const swipeIndicator = document.createElement('div');
        swipeIndicator.className = 'mobile-swipe-indicator';
        swipeIndicator.innerHTML = `
            <div class="swipe-dots">
                <span class="swipe-dot"></span>
                <span class="swipe-dot"></span>
                <span class="swipe-dot"></span>
            </div>
            <span class="swipe-text">Desliza para más opciones</span>
        `;
        
        card.appendChild(swipeIndicator);

        // Add styles for indicators
        this.addIndicatorStyles();
    }

    addIndicatorStyles() {
        if (document.querySelector('#mobile-cards-styles')) return;

        const style = document.createElement('style');
        style.id = 'mobile-cards-styles';
        style.textContent = `
            .mobile-swipe-indicator {
                position: absolute;
                bottom: 10px;
                right: 15px;
                display: flex;
                align-items: center;
                gap: 8px;
                opacity: 0.6;
                font-size: 0.75rem;
                color: var(--text-muted);
                pointer-events: none;
                transition: opacity 0.3s ease;
            }
            
            .swipe-dots {
                display: flex;
                gap: 4px;
            }
            
            .swipe-dot {
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                animation: swipePulse 2s infinite;
            }
            
            .swipe-dot:nth-child(2) {
                animation-delay: 0.3s;
            }
            
            .swipe-dot:nth-child(3) {
                animation-delay: 0.6s;
            }
            
            @keyframes swipePulse {
                0%, 70%, 100% {
                    opacity: 0.3;
                    transform: scale(1);
                }
                35% {
                    opacity: 1;
                    transform: scale(1.2);
                }
            }
            
            .swipe-text {
                font-size: 0.7rem;
                white-space: nowrap;
            }
            
            .mobile-card.swiped .mobile-swipe-indicator {
                opacity: 0;
            }
            
            .mobile-card-actions {
                position: absolute;
                top: 0;
                right: -100%;
                width: 80px;
                height: 100%;
                background: var(--bg-light);
                border-left: 1px solid var(--border-color);
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 8px;
                padding: 10px;
                transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 2;
            }
            
            .mobile-card.swiped .mobile-card-actions {
                right: 0;
            }
            
            .mobile-action-btn {
                width: 60px;
                height: 60px;
                background: var(--primary-color);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 1.2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
            }
            
            .mobile-action-btn:hover {
                background: var(--primary-dark);
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            }
            
            .mobile-action-btn.secondary {
                background: var(--bg-gray);
                color: var(--text-light);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }
            
            .mobile-action-btn.secondary:hover {
                background: var(--border-color);
                color: var(--text-dark);
            }
            
            .mobile-card-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.3);
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                z-index: 1;
            }
            
            .mobile-card.swiped .mobile-card-overlay {
                opacity: 1;
            }
            
            .mobile-card-expanded {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 90%;
                max-width: 400px;
                max-height: 80vh;
                background: var(--bg-white);
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                z-index: 10000;
                overflow-y: auto;
                animation: cardExpand 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            @keyframes cardExpand {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            
            .mobile-card-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(4px);
                z-index: 9999;
                animation: backdropFadeIn 0.3s ease;
            }
            
            @keyframes backdropFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .card-close-btn {
                position: absolute;
                top: 15px;
                right: 15px;
                width: 40px;
                height: 40px;
                background: rgba(0, 0, 0, 0.5);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                z-index: 10001;
            }
            
            .card-close-btn:hover {
                background: rgba(0, 0, 0, 0.7);
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);
    }

    enhanceCardActions(card) {
        // Create actions container
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'mobile-card-actions';
        
        // Add action buttons
        const actions = [
            { icon: '👁️', action: 'view', label: 'Ver detalles' },
            { icon: '🔗', action: 'link', label: 'Abrir enlace', secondary: true }
        ];
        
        actions.forEach(actionData => {
            const button = document.createElement('button');
            button.className = `mobile-action-btn ${actionData.secondary ? 'secondary' : ''}`;
            button.innerHTML = actionData.icon;
            button.setAttribute('aria-label', actionData.label);
            button.setAttribute('data-action', actionData.action);
            
            actionsContainer.appendChild(button);
        });
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-card-overlay';
        
        card.style.position = 'relative';
        card.appendChild(overlay);
        card.appendChild(actionsContainer);
    }

    setupCardContainers() {
        const projectSections = document.querySelectorAll('[id*="proyectos"]');
        
        projectSections.forEach(section => {
            const grid = section.querySelector('.proyectos-grid');
            if (grid) {
                grid.classList.add('mobile-cards-container');
            }
        });
    }

    setupSwipeGestures() {
        this.cards.forEach(cardData => {
            const card = cardData.element;
            
            card.addEventListener('touchstart', (e) => {
                this.handleTouchStart(e, cardData);
            }, { passive: true });
            
            card.addEventListener('touchmove', (e) => {
                this.handleTouchMove(e, cardData);
            }, { passive: true });
            
            card.addEventListener('touchend', (e) => {
                this.handleTouchEnd(e, cardData);
            }, { passive: true });
        });
    }

    handleTouchStart(e, cardData) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.activeCard = cardData;
    }

    handleTouchMove(e, cardData) {
        if (!this.activeCard || this.activeCard !== cardData) return;
        
        this.touchCurrentX = e.touches[0].clientX;
        this.touchCurrentY = e.touches[0].clientY;
        
        const diffX = this.touchStartX - this.touchCurrentX;
        const diffY = this.touchStartY - this.touchCurrentY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY)) {
            const card = cardData.element;
            
            // Swipe left to reveal actions
            if (diffX > 20) {
                card.style.transform = `translateX(-${Math.min(diffX, 80)}px)`;
            }
        }
    }

    handleTouchEnd(e, cardData) {
        if (!this.activeCard || this.activeCard !== cardData) return;
        
        const diffX = this.touchStartX - this.touchCurrentX;
        const diffY = this.touchStartY - this.touchCurrentY;
        const card = cardData.element;
        
        // Reset transform
        card.style.transform = '';
        
        // Check if it's a swipe gesture
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > this.swipeThreshold) {
            if (diffX > 0) {
                // Swipe left - show actions
                this.showCardActions(cardData);
            } else {
                // Swipe right - hide actions
                this.hideCardActions(cardData);
            }
        } else if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
            // It's a tap
            this.handleCardTap(cardData);
        }
        
        this.activeCard = null;
    }

    showCardActions(cardData) {
        // Hide actions from other cards
        this.cards.forEach(otherCard => {
            if (otherCard !== cardData) {
                this.hideCardActions(otherCard);
            }
        });
        
        cardData.element.classList.add('swiped');
        
        // Setup action button listeners
        this.setupActionListeners(cardData);
    }

    hideCardActions(cardData) {
        cardData.element.classList.remove('swiped');
    }

    setupActionListeners(cardData) {
        const actionButtons = cardData.element.querySelectorAll('.mobile-action-btn');
        
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const action = button.getAttribute('data-action');
                this.handleAction(action, cardData);
            });
        });
    }

    handleAction(action, cardData) {
        switch (action) {
            case 'view':
                this.expandCard(cardData);
                break;
            case 'link':
                this.openCardLink(cardData);
                break;
        }
        
        // Hide actions after action
        this.hideCardActions(cardData);
    }

    handleCardTap(cardData) {
        // If actions are shown, hide them
        if (cardData.element.classList.contains('swiped')) {
            this.hideCardActions(cardData);
        } else {
            // Expand card
            this.expandCard(cardData);
        }
    }

    expandCard(cardData) {
        const card = cardData.element;
        const cardClone = card.cloneNode(true);
        
        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'mobile-card-backdrop';
        
        // Create expanded card container
        const expandedContainer = document.createElement('div');
        expandedContainer.className = 'mobile-card-expanded';
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'card-close-btn';
        closeButton.innerHTML = '✕';
        closeButton.setAttribute('aria-label', 'Cerrar');
        
        // Clean up cloned card
        cardClone.classList.remove('swiped', 'mobile-card');
        cardClone.style.transform = '';
        const actionsContainer = cardClone.querySelector('.mobile-card-actions');
        const overlay = cardClone.querySelector('.mobile-card-overlay');
        const indicator = cardClone.querySelector('.mobile-swipe-indicator');
        
        if (actionsContainer) actionsContainer.remove();
        if (overlay) overlay.remove();
        if (indicator) indicator.remove();
        
        // Add content to expanded container
        expandedContainer.appendChild(cardClone);
        expandedContainer.appendChild(closeButton);
        
        // Add to DOM
        document.body.appendChild(backdrop);
        document.body.appendChild(expandedContainer);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Setup close handlers
        const closeCard = () => {
            backdrop.remove();
            expandedContainer.remove();
            document.body.style.overflow = '';
        };
        
        closeButton.addEventListener('click', closeCard);
        backdrop.addEventListener('click', closeCard);
        
        // Keyboard support
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeCard();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
        
        // Focus close button
        setTimeout(() => {
            closeButton.focus();
        }, 300);
        
        cardData.isExpanded = true;
    }

    openCardLink(cardData) {
        const card = cardData.element;
        const link = card.querySelector('a[href]');
        
        if (link) {
            window.open(link.href, '_blank', 'noopener,noreferrer');
        }
    }

    setupTouchFeedback() {
        this.cards.forEach(cardData => {
            const card = cardData.element;
            
            card.addEventListener('touchstart', () => {
                card.style.transition = 'transform 0.1s ease';
                card.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    card.style.transform = '';
                }, 100);
            }, { passive: true });
        });
    }

    setupCardNavigation() {
        // Add keyboard navigation
        this.cards.forEach(cardData => {
            const card = cardData.element;
            
            card.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        this.expandCard(cardData);
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.showCardActions(cardData);
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.hideCardActions(cardData);
                        break;
                }
            });
        });
    }

    // Public API
    refresh() {
        if (window.innerWidth <= 768) {
            this.cards = [];
            this.setup();
        }
    }

    hideAllActions() {
        this.cards.forEach(cardData => {
            this.hideCardActions(cardData);
        });
    }

    expandCardByIndex(index) {
        const cardData = this.cards[index];
        if (cardData) {
            this.expandCard(cardData);
        }
    }
}

// Initialize mobile cards system
const initMobileCards = () => {
    if (window.innerWidth <= 768) {
        if (!window.mobileCards) {
            window.mobileCards = new MobileCardsSystem();
        }
    }
};

// Initialize on load and resize
document.addEventListener('DOMContentLoaded', initMobileCards);
window.addEventListener('resize', () => {
    if (window.mobileCards) {
        window.mobileCards.refresh();
    }
});

// Export for manual usage
window.MobileCardsSystem = MobileCardsSystem;