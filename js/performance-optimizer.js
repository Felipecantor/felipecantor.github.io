/**
 * Performance Optimizer
 * Handles lazy loading, resource optimization, and performance monitoring
 */

class PerformanceOptimizer {
    constructor() {
        this.lazyImages = [];
        this.lazyElements = [];
        this.intersectionObserver = null;
        this.performanceMetrics = {};
        this.resourceCache = new Map();
        
        this.init();
    }

    init() {
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupLazyLoading();
        this.optimizeResourceLoading();
        this.setupPerformanceMonitoring();
        this.preloadCriticalResources();
        this.optimizeFonts();
        
        console.log('🚀 Performance Optimizer initialized');
    }

    // Lazy Loading Implementation
    setupLazyLoading() {
        // Create intersection observer
        this.intersectionObserver = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                rootMargin: '50px 0px',
                threshold: 0.01
            }
        );

        // Find and setup lazy images
        this.setupLazyImages();
        
        // Find and setup lazy sections
        this.setupLazySections();
    }

    setupLazyImages() {
        const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        
        images.forEach(img => {
            // Add lazy loading class
            img.classList.add('lazy-load');
            
            // If no data-src, use src as data-src
            if (!img.dataset.src && img.src) {
                img.dataset.src = img.src;
                img.src = this.generatePlaceholder(img);
            }
            
            this.lazyImages.push(img);
            this.intersectionObserver.observe(img);
        });
    }

    setupLazySections() {
        const sections = document.querySelectorAll('[data-include]');
        
        sections.forEach(section => {
            section.classList.add('lazy-section');
            this.lazyElements.push(section);
            this.intersectionObserver.observe(section);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.tagName === 'IMG') {
                    this.loadImage(element);
                } else if (element.dataset.include) {
                    this.loadSection(element);
                }
                
                this.intersectionObserver.unobserve(element);
            }
        });
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        // Create new image to preload
        const newImg = new Image();
        
        newImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            
            // Remove data-src to prevent reloading
            delete img.dataset.src;
        };
        
        newImg.onerror = () => {
            img.classList.add('error');
            console.warn(`Failed to load image: ${src}`);
        };
        
        newImg.src = src;
    }

    loadSection(element) {
        const includeUrl = element.dataset.include;
        if (!includeUrl) return;

        // Check cache first
        if (this.resourceCache.has(includeUrl)) {
            element.innerHTML = this.resourceCache.get(includeUrl);
            element.classList.add('loaded');
            return;
        }

        // Load section content
        fetch(includeUrl)
            .then(response => response.text())
            .then(html => {
                this.resourceCache.set(includeUrl, html);
                element.innerHTML = html;
                element.classList.add('loaded');
                
                // Initialize any new lazy elements in the loaded content
                this.setupLazyImages();
            })
            .catch(error => {
                console.error(`Failed to load section: ${includeUrl}`, error);
                element.classList.add('error');
            });
    }

    generatePlaceholder(img) {
        const width = img.width || 400;
        const height = img.height || 300;
        
        // Generate SVG placeholder
        return `data:image/svg+xml;base64,${btoa(`
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f3f4f6"/>
                <text x="50%" y="50%" font-family="system-ui" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">
                    Loading...
                </text>
            </svg>
        `)}`;
    }

    // Resource Optimization
    optimizeResourceLoading() {
        // Defer non-critical CSS
        this.deferNonCriticalCSS();
        
        // Optimize JavaScript loading
        this.optimizeScriptLoading();
        
        // Setup resource hints
        this.setupResourceHints();
    }

    deferNonCriticalCSS() {
        const nonCriticalCSS = [
            'styles/effects.css',
            'styles/background-animations.css',
            'styles/notifications.css'
        ];

        nonCriticalCSS.forEach(href => {
            const link = document.querySelector(`link[href="${href}"]`);
            if (link) {
                // Load CSS asynchronously
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = href;
                newLink.media = 'print';
                newLink.onload = () => {
                    newLink.media = 'all';
                };
                
                // Replace original link
                link.parentNode.replaceChild(newLink, link);
            }
        });
    }

    optimizeScriptLoading() {
        const scripts = document.querySelectorAll('script[src]');
        
        scripts.forEach(script => {
            // Add async/defer to non-critical scripts
            if (!script.src.includes('include.js') && 
                !script.src.includes('contact-protection.js')) {
                script.defer = true;
            }
        });
    }

    setupResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
        ];

        hints.forEach(hint => {
            const link = document.createElement('link');
            Object.assign(link, hint);
            document.head.appendChild(link);
        });
    }

    preloadCriticalResources() {
        const criticalResources = [
            { href: 'styles/optimized.css', as: 'style' },
            { href: 'js/include.js', as: 'script' },
            { href: 'sections/hero.html', as: 'fetch', crossorigin: 'anonymous' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            Object.assign(link, resource);
            document.head.appendChild(link);
        });
    }

    optimizeFonts() {
        // Optimize Google Fonts loading
        const fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
        if (fontLink) {
            fontLink.rel = 'preload';
            fontLink.as = 'style';
            fontLink.onload = () => {
                fontLink.rel = 'stylesheet';
            };
        }

        // Add font-display: swap to CSS
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Inter';
                font-display: swap;
            }
        `;
        document.head.appendChild(style);
    }

    // Performance Monitoring
    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        this.monitorWebVitals();
        
        // Monitor resource loading
        this.monitorResourceLoading();
        
        // Setup performance observer
        this.setupPerformanceObserver();
    }

    monitorWebVitals() {
        // First Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.name === 'first-contentful-paint') {
                    this.performanceMetrics.fcp = entry.startTime;
                    console.log(`🎨 First Contentful Paint: ${entry.startTime.toFixed(2)}ms`);
                }
            });
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.performanceMetrics.lcp = lastEntry.startTime;
            console.log(`🖼️ Largest Contentful Paint: ${lastEntry.startTime.toFixed(2)}ms`);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            this.performanceMetrics.cls = clsValue;
            console.log(`📐 Cumulative Layout Shift: ${clsValue.toFixed(4)}`);
        }).observe({ entryTypes: ['layout-shift'] });
    }

    monitorResourceLoading() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const resources = performance.getEntriesByType('resource');
            
            console.log('📊 Performance Metrics:');
            console.log(`⏱️ Page Load Time: ${navigation.loadEventEnd - navigation.fetchStart}ms`);
            console.log(`🌐 DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.fetchStart}ms`);
            console.log(`📦 Total Resources: ${resources.length}`);
            
            // Log slow resources
            const slowResources = resources.filter(r => r.duration > 1000);
            if (slowResources.length > 0) {
                console.warn('⚠️ Slow loading resources:', slowResources);
            }
        });
    }

    setupPerformanceObserver() {
        // Monitor long tasks
        if ('PerformanceObserver' in window) {
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.duration > 50) {
                        console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(2)}ms`);
                    }
                });
            }).observe({ entryTypes: ['longtask'] });
        }
    }

    // Public API
    getMetrics() {
        return this.performanceMetrics;
    }

    refreshLazyElements() {
        this.setupLazyImages();
        this.setupLazySections();
    }

    preloadResource(url, type = 'fetch') {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = type;
        document.head.appendChild(link);
    }
}

// Initialize performance optimizer
const performanceOptimizer = new PerformanceOptimizer();

// Export for use in other modules
window.PerformanceOptimizer = PerformanceOptimizer;
window.performanceOptimizer = performanceOptimizer;