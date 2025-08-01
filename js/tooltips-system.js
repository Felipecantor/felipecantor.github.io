/**
 * Tooltips System
 * Sistema de tooltips elegante y accesible
 */

class TooltipSystem {
    constructor() {
        this.tooltips = new Map();
        this.activeTooltip = null;
        this.tooltipId = 0;
        
        this.init();
    }

    init() {
        this.createTooltipStyles();
        this.setupTooltips();
        this.setupEventListeners();
        
        console.log('💡 Tooltip System initialized');
    }

    createTooltipStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .tooltip {
                position: absolute;
                background: rgba(30, 41, 59, 0.95);
                color: #f1f5f9;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.875rem;
                font-weight: 500;
                z-index: 10000;
                pointer-events: none;
                opacity: 0;
                transform: translateY(5px);
                transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(59, 130, 246, 0.2);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                max-width: 200px;
                word-wrap: break-word;
                line-height: 1.4;
            }
            
            .tooltip.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .tooltip::before {
                content: '';
                position: absolute;
                top: -4px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-bottom: 4px solid rgba(30, 41, 59, 0.95);
            }
            
            .tooltip.bottom::before {
                top: auto;
                bottom: -4px;
                border-bottom: none;
                border-top: 4px solid rgba(30, 41, 59, 0.95);
            }
            
            .tooltip.left::before {
                top: 50%;
                left: auto;
                right: -4px;
                transform: translateY(-50%);
                border-left: 4px solid rgba(30, 41, 59, 0.95);
                border-right: none;
                border-top: 4px solid transparent;
                border-bottom: 4px solid transparent;
            }
            
            .tooltip.right::before {
                top: 50%;
                left: -4px;
                right: auto;
                transform: translateY(-50%);
                border-right: 4px solid rgba(30, 41, 59, 0.95);
                border-left: none;
                border-top: 4px solid transparent;
                border-bottom: 4px solid transparent;
            }
            
            /* Tooltip triggers */
            [data-tooltip] {
                position: relative;
                cursor: help;
            }
            
            /* Accessibility */
            .tooltip[role="tooltip"] {
                position: absolute;
            }
            
            /* Animation variants */
            .tooltip.fade-in {
                animation: tooltipFadeIn 0.2s ease-out;
            }
            
            .tooltip.fade-out {
                animation: tooltipFadeOut 0.2s ease-in;
            }
            
            @keyframes tooltipFadeIn {
                from {
                    opacity: 0;
                    transform: translateY(5px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes tooltipFadeOut {
                from {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateY(5px) scale(0.9);
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupTooltips() {
        // Auto-setup tooltips for elements with data-tooltip
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            this.addTooltip(element, element.dataset.tooltip, element.dataset.tooltipPosition);
        });

        // Add tooltips to common elements
        this.addCommonTooltips();
    }

    addCommonTooltips() {
        // Add tooltips to navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            if (!link.dataset.tooltip) {
                const text = link.textContent.trim();
                this.addTooltip(link, `Ir a la sección ${text}`, 'bottom');
            }
        });

        // Add tooltips to social links
        document.querySelectorAll('a[href*="linkedin"]').forEach(link => {
            this.addTooltip(link, 'Ver perfil de LinkedIn', 'top');
        });

        document.querySelectorAll('a[href*="github"]').forEach(link => {
            this.addTooltip(link, 'Ver repositorios en GitHub', 'top');
        });

        // Add tooltips to contact protection links
        document.querySelectorAll('[data-contact]').forEach(link => {
            const type = link.dataset.contact;
            const messages = {
                email: 'Haz clic para revelar email',
                phone: 'Haz clic para revelar teléfono',
                linkedin: 'Haz clic para ir a LinkedIn',
                portfolio: 'Haz clic para ver portfolio'
            };
            this.addTooltip(link, messages[type] || 'Haz clic para revelar', 'top');
        });

        // Add tooltips to buttons
        document.querySelectorAll('.btn').forEach(button => {
            if (!button.dataset.tooltip && button.textContent.trim()) {
                const action = button.textContent.trim();
                this.addTooltip(button, action, 'top');
            }
        });
    }

    addTooltip(element, text, position = 'top') {
        const tooltipId = `tooltip-${this.tooltipId++}`;
        
        // Store tooltip data
        this.tooltips.set(element, {
            id: tooltipId,
            text: text,
            position: position,
            element: element
        });

        // Add ARIA attributes for accessibility
        element.setAttribute('aria-describedby', tooltipId);
        element.setAttribute('data-tooltip-id', tooltipId);
    }

    setupEventListeners() {
        // Mouse events
        document.addEventListener('mouseenter', (e) => {
            if (this.tooltips.has(e.target)) {
                this.showTooltip(e.target, e);
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (this.tooltips.has(e.target)) {
                this.hideTooltip();
            }
        }, true);

        // Focus events for keyboard accessibility
        document.addEventListener('focus', (e) => {
            if (this.tooltips.has(e.target)) {
                this.showTooltip(e.target, e);
            }
        }, true);

        document.addEventListener('blur', (e) => {
            if (this.tooltips.has(e.target)) {
                this.hideTooltip();
            }
        }, true);

        // Hide tooltip on scroll or resize
        window.addEventListener('scroll', () => this.hideTooltip(), { passive: true });
        window.addEventListener('resize', () => this.hideTooltip(), { passive: true });

        // Hide tooltip on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideTooltip();
            }
        });
    }

    showTooltip(element, event) {
        // Hide any existing tooltip
        this.hideTooltip();

        const tooltipData = this.tooltips.get(element);
        if (!tooltipData) return;

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.id = tooltipData.id;
        tooltip.textContent = tooltipData.text;
        tooltip.setAttribute('role', 'tooltip');
        tooltip.setAttribute('aria-hidden', 'false');

        document.body.appendChild(tooltip);

        // Position tooltip
        this.positionTooltip(tooltip, element, tooltipData.position);

        // Show tooltip with animation
        requestAnimationFrame(() => {
            tooltip.classList.add('show', 'fade-in');
        });

        this.activeTooltip = tooltip;

        // Auto-hide after delay for touch devices
        if ('ontouchstart' in window) {
            setTimeout(() => this.hideTooltip(), 3000);
        }
    }

    positionTooltip(tooltip, element, position) {
        const elementRect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const scrollX = window.pageXOffset;
        const scrollY = window.pageYOffset;

        let left, top;

        switch (position) {
            case 'top':
                left = elementRect.left + scrollX + (elementRect.width / 2) - (tooltipRect.width / 2);
                top = elementRect.top + scrollY - tooltipRect.height - 8;
                break;
            
            case 'bottom':
                left = elementRect.left + scrollX + (elementRect.width / 2) - (tooltipRect.width / 2);
                top = elementRect.bottom + scrollY + 8;
                tooltip.classList.add('bottom');
                break;
            
            case 'left':
                left = elementRect.left + scrollX - tooltipRect.width - 8;
                top = elementRect.top + scrollY + (elementRect.height / 2) - (tooltipRect.height / 2);
                tooltip.classList.add('left');
                break;
            
            case 'right':
                left = elementRect.right + scrollX + 8;
                top = elementRect.top + scrollY + (elementRect.height / 2) - (tooltipRect.height / 2);
                tooltip.classList.add('right');
                break;
            
            default:
                left = elementRect.left + scrollX + (elementRect.width / 2) - (tooltipRect.width / 2);
                top = elementRect.top + scrollY - tooltipRect.height - 8;
        }

        // Ensure tooltip stays within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Horizontal bounds
        if (left < 10) {
            left = 10;
        } else if (left + tooltipRect.width > viewportWidth - 10) {
            left = viewportWidth - tooltipRect.width - 10;
        }

        // Vertical bounds
        if (top < scrollY + 10) {
            // If tooltip would be above viewport, show below element
            top = elementRect.bottom + scrollY + 8;
            tooltip.classList.remove('top');
            tooltip.classList.add('bottom');
        } else if (top + tooltipRect.height > scrollY + viewportHeight - 10) {
            // If tooltip would be below viewport, show above element
            top = elementRect.top + scrollY - tooltipRect.height - 8;
            tooltip.classList.remove('bottom');
            tooltip.classList.add('top');
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }

    hideTooltip() {
        if (this.activeTooltip) {
            this.activeTooltip.classList.remove('show', 'fade-in');
            this.activeTooltip.classList.add('fade-out');
            this.activeTooltip.setAttribute('aria-hidden', 'true');
            
            setTimeout(() => {
                if (this.activeTooltip && this.activeTooltip.parentNode) {
                    this.activeTooltip.parentNode.removeChild(this.activeTooltip);
                }
                this.activeTooltip = null;
            }, 200);
        }
    }

    // Public API
    add(element, text, position = 'top') {
        this.addTooltip(element, text, position);
    }

    remove(element) {
        if (this.tooltips.has(element)) {
            element.removeAttribute('aria-describedby');
            element.removeAttribute('data-tooltip-id');
            this.tooltips.delete(element);
        }
    }

    update(element, newText) {
        if (this.tooltips.has(element)) {
            const tooltipData = this.tooltips.get(element);
            tooltipData.text = newText;
            
            // Update active tooltip if it's the same element
            if (this.activeTooltip && this.activeTooltip.id === tooltipData.id) {
                this.activeTooltip.textContent = newText;
            }
        }
    }

    refresh() {
        // Re-scan for new elements with data-tooltip
        this.setupTooltips();
    }

    // Utility methods
    createTooltip(text, position = 'top') {
        const tooltip = document.createElement('div');
        tooltip.className = `tooltip ${position}`;
        tooltip.textContent = text;
        tooltip.setAttribute('role', 'tooltip');
        return tooltip;
    }
}

// Initialize tooltip system
const tooltipSystem = new TooltipSystem();

// Export for use in other modules
window.TooltipSystem = TooltipSystem;
window.tooltipSystem = tooltipSystem;