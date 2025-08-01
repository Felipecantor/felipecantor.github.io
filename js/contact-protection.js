/**
 * Contact Protection System
 * Protects personal information without requiring a backend
 */

class ContactProtection {
    constructor() {
        // Obfuscated contact information
        this.obfuscatedData = {
            email: this.encode('Felipecantor2019@gmail.com'),
            phone: this.encode('+57 311 268 9126'),
            linkedin: this.encode('https://linkedin.com/in/AndersonCantorRoa'),
            github: this.encode('https://github.com/FelipeCantor'),
            portfolio: this.encode('https://felipecantor.github.io/')
        };
    }

    // Simple encoding function
    encode(str) {
        return btoa(str).split('').reverse().join('');
    }

    // Decoding function
    decode(str) {
        return atob(str.split('').reverse().join(''));
    }

    // Get contact information with basic bot protection
    getContactInfo(type) {
        if (!this.isHuman()) {
            return 'Contact information protected';
        }
        return this.decode(this.obfuscatedData[type]);
    }

    // Basic human verification
    isHuman() {
        // Check for user interaction indicators
        return window.hasUserInteracted || document.hasFocus();
    }

    // Initialize contact protection
    init() {
        // Mark user interaction
        const markInteraction = () => {
            window.hasUserInteracted = true;
        };

        // Add interaction listeners
        ['click', 'keydown', 'mousemove', 'scroll'].forEach(event => {
            document.addEventListener(event, markInteraction, { once: true, passive: true });
        });

        // Replace contact information in DOM
        this.replaceContactInfo();
    }

    // Replace static contact info with protected versions
    replaceContactInfo() {
        const contactElements = {
            email: document.querySelectorAll('[data-contact="email"]'),
            phone: document.querySelectorAll('[data-contact="phone"]'),
            linkedin: document.querySelectorAll('[data-contact="linkedin"]'),
            github: document.querySelectorAll('[data-contact="github"]'),
            portfolio: document.querySelectorAll('[data-contact="portfolio"]')
        };

        Object.keys(contactElements).forEach(type => {
            contactElements[type].forEach(element => {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.revealContact(element, type);
                });
                
                // Add visual indicator
                element.style.cursor = 'pointer';
                element.title = 'Click to reveal contact information';
            });
        });
    }

    // Reveal contact information on user interaction
    revealContact(element, type) {
        const contactInfo = this.getContactInfo(type);
        
        if (type === 'email') {
            element.textContent = contactInfo;
            element.href = `mailto:${contactInfo}`;
        } else if (type === 'phone') {
            element.textContent = contactInfo;
            element.href = `tel:${contactInfo}`;
        } else {
            element.href = contactInfo;
            if (element.textContent.includes('***')) {
                element.textContent = contactInfo;
            }
        }
        
        element.style.cursor = 'default';
        element.title = '';
    }

    // Contact form protection
    protectContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        // Add honeypot field (hidden from users, visible to bots)
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.style.display = 'none';
        honeypot.setAttribute('tabindex', '-1');
        honeypot.setAttribute('autocomplete', 'off');
        form.appendChild(honeypot);

        // Add timestamp field
        const timestamp = document.createElement('input');
        timestamp.type = 'hidden';
        timestamp.name = 'timestamp';
        timestamp.value = Date.now();
        form.appendChild(timestamp);

        // Form submission handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check honeypot
            if (honeypot.value) {
                console.log('Bot detected');
                return;
            }

            // Check timestamp (minimum 3 seconds to fill form)
            const timeDiff = Date.now() - parseInt(timestamp.value);
            if (timeDiff < 3000) {
                alert('Please take your time to fill out the form properly.');
                return;
            }

            // Process form (you can integrate with a service like Formspree, Netlify Forms, etc.)
            this.handleFormSubmission(form);
        });
    }

    // Handle form submission
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Remove honeypot and timestamp from data
        delete data.website;
        delete data.timestamp;

        // Show success message
        this.showFormMessage('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
        form.reset();
    }

    // Show form messages
    showFormMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;
        
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(messageDiv, form.nextSibling);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Initialize contact protection when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const contactProtection = new ContactProtection();
    contactProtection.init();
    contactProtection.protectContactForm();
});

// Export for use in other modules
window.ContactProtection = ContactProtection;