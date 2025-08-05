/**
 * Navbar Demo Controls
 * Development tool for testing different navbar animation states and configurations
 */

class NavbarDemoControls {
    constructor() {
        this.isVisible = false;
        this.panel = null;
        
        // Only show in development (when localhost or specific conditions)
        if (this.isDevelopment()) {
            this.init();
        }
    }

    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.search.includes('demo=true');
    }

    init() {
        this.createPanel();
        this.setupKeyboardShortcuts();
        console.log('🎮 Navbar Demo Controls initialized (Press Ctrl+Shift+N to toggle)');
    }

    createPanel() {
        const panel = document.createElement('div');
        panel.id = 'navbar-demo-panel';
        panel.innerHTML = `
            <div class="demo-panel">
                <div class="demo-header">
                    <h3>🎬 Navbar Animation Demo</h3>
                    <button class="demo-close" onclick="navbarDemoControls.togglePanel()">×</button>
                </div>
                
                <div class="demo-section">
                    <h4>Estados del Navbar</h4>
                    <div class="demo-buttons">
                        <button onclick="navbarDemoControls.setState('normal')">Normal</button>
                        <button onclick="navbarDemoControls.setState('navbar-scrolled')">Compacto</button>
                        <button onclick="navbarDemoControls.setState('navbar-minimal')">Minimal</button>
                        <button onclick="navbarDemoControls.setState('navbar-hidden')">Oculto</button>
                        <button onclick="navbarDemoControls.setState('navbar-peek')">Peek</button>
                    </div>
                </div>

                <div class="demo-section">
                    <h4>Configuración de Scroll</h4>
                    <div class="demo-controls">
                        <label>
                            Umbral Hero: <span id="hero-threshold-value">100</span>px
                            <input type="range" id="hero-threshold" min="50" max="300" value="100">
                        </label>
                        <label>
                            Umbral Scroll: <span id="scroll-threshold-value">150</span>px
                            <input type="range" id="scroll-threshold" min="100" max="400" value="150">
                        </label>
                        <label>
                            Umbral Ocultar: <span id="hide-threshold-value">200</span>px
                            <input type="range" id="hide-threshold" min="150" max="500" value="200">
                        </label>
                        <label>
                            Zona Peek: <span id="peek-zone-value">50</span>px
                            <input type="range" id="peek-zone" min="20" max="100" value="50">
                        </label>
                    </div>
                </div>

                <div class="demo-section">
                    <h4>Información</h4>
                    <div class="demo-info">
                        <div>Scroll Y: <span id="scroll-info">0</span>px</div>
                        <div>Dirección: <span id="direction-info">-</span></div>
                        <div>Estado: <span id="state-info">normal</span></div>
                        <div>En Hero: <span id="hero-info">-</span></div>
                    </div>
                </div>

                <div class="demo-section">
                    <button onclick="navbarDemoControls.resetAnimation()" class="demo-reset">
                        🔄 Resetear Animación
                    </button>
                </div>
            </div>
        `;

        // Add styles
        const styles = `
            <style>
                #navbar-demo-panel {
                    position: fixed;
                    top: 100px;
                    right: -350px;
                    width: 320px;
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    border-radius: 12px;
                    z-index: 10000;
                    transition: right 0.3s ease;
                    color: white;
                    font-family: system-ui, -apple-system, sans-serif;
                    font-size: 14px;
                }

                #navbar-demo-panel.visible {
                    right: 20px;
                }

                .demo-panel {
                    padding: 20px;
                }

                .demo-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    border-bottom: 1px solid rgba(71, 85, 105, 0.3);
                    padding-bottom: 10px;
                }

                .demo-header h3 {
                    margin: 0;
                    color: #3b82f6;
                    font-size: 16px;
                }

                .demo-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.2s;
                }

                .demo-close:hover {
                    background: rgba(239, 68, 68, 0.2);
                }

                .demo-section {
                    margin-bottom: 20px;
                }

                .demo-section h4 {
                    margin: 0 0 10px 0;
                    color: #e2e8f0;
                    font-size: 14px;
                    font-weight: 600;
                }

                .demo-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .demo-buttons button {
                    padding: 6px 12px;
                    background: rgba(59, 130, 246, 0.2);
                    border: 1px solid rgba(59, 130, 246, 0.4);
                    color: white;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.2s;
                }

                .demo-buttons button:hover {
                    background: rgba(59, 130, 246, 0.4);
                    transform: translateY(-1px);
                }

                .demo-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .demo-controls label {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    font-size: 12px;
                    color: #cbd5e1;
                }

                .demo-controls input[type="range"] {
                    width: 100%;
                    height: 4px;
                    background: rgba(71, 85, 105, 0.4);
                    border-radius: 2px;
                    outline: none;
                    cursor: pointer;
                }

                .demo-info {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    font-size: 12px;
                    color: #94a3b8;
                    background: rgba(30, 41, 59, 0.5);
                    padding: 10px;
                    border-radius: 6px;
                }

                .demo-info span {
                    color: #3b82f6;
                    font-weight: 600;
                }

                .demo-reset {
                    width: 100%;
                    padding: 10px;
                    background: rgba(34, 197, 94, 0.2);
                    border: 1px solid rgba(34, 197, 94, 0.4);
                    color: white;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.2s;
                }

                .demo-reset:hover {
                    background: rgba(34, 197, 94, 0.3);
                    transform: translateY(-1px);
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.appendChild(panel);
        this.panel = panel;

        this.setupPanelEvents();
        this.startInfoUpdates();
    }

    setupPanelEvents() {
        // Range inputs
        const inputs = ['hero-threshold', 'scroll-threshold', 'hide-threshold', 'peek-zone'];
        inputs.forEach(id => {
            const input = document.getElementById(id);
            const valueSpan = document.getElementById(id + '-value');
            
            input.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                valueSpan.textContent = value;
                this.updateConfig(id.replace('-', '_'), value);
            });
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+N to toggle panel
            if (e.ctrlKey && e.shiftKey && e.key === 'N') {
                e.preventDefault();
                this.togglePanel();
            }
        });
    }

    togglePanel() {
        this.isVisible = !this.isVisible;
        this.panel.classList.toggle('visible', this.isVisible);
    }

    setState(state) {
        if (window.navbarScrollAnimation) {
            window.navbarScrollAnimation.forceState(state);
        }
        console.log(`🎯 Demo: Set navbar state to ${state}`);
    }

    updateConfig(key, value) {
        if (window.navbarScrollAnimation) {
            const config = {};
            config[key.replace('_', 'T').replace('t', 'T')] = value;
            window.navbarScrollAnimation.updateConfig(config);
        }
    }

    resetAnimation() {
        if (window.navbarScrollAnimation) {
            window.navbarScrollAnimation.forceState('normal');
            // Reset config to defaults
            window.navbarScrollAnimation.updateConfig({
                heroThreshold: 100,
                scrollThreshold: 150,
                hideThreshold: 200,
                peekZone: 50
            });
            
            // Reset range inputs
            document.getElementById('hero-threshold').value = 100;
            document.getElementById('scroll-threshold').value = 150;
            document.getElementById('hide-threshold').value = 200;
            document.getElementById('peek-zone').value = 50;
            
            // Update value displays
            document.getElementById('hero-threshold-value').textContent = '100';
            document.getElementById('scroll-threshold-value').textContent = '150';
            document.getElementById('hide-threshold-value').textContent = '200';
            document.getElementById('peek-zone-value').textContent = '50';
        }
        console.log('🔄 Demo: Animation reset');
    }

    startInfoUpdates() {
        setInterval(() => {
            if (!this.isVisible) return;

            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            const direction = window.navbarScrollAnimation?.scrollDirection || '-';
            const navbar = document.querySelector('.navbar');
            
            let state = 'normal';
            if (navbar?.classList.contains('navbar-hidden')) state = 'hidden';
            else if (navbar?.classList.contains('navbar-minimal')) state = 'minimal';
            else if (navbar?.classList.contains('navbar-scrolled')) state = 'compact';
            else if (navbar?.classList.contains('navbar-peek')) state = 'peek';

            const isInHero = window.navbarScrollAnimation?.isInHeroSection() || false;

            document.getElementById('scroll-info').textContent = Math.round(scrollY);
            document.getElementById('direction-info').textContent = direction;
            document.getElementById('state-info').textContent = state;
            document.getElementById('hero-info').textContent = isInHero ? 'Sí' : 'No';
        }, 100);
    }
}

// Initialize demo controls
const navbarDemoControls = new NavbarDemoControls();

// Export for global access
window.NavbarDemoControls = NavbarDemoControls;
window.navbarDemoControls = navbarDemoControls;