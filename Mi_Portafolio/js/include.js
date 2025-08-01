/**
 * Script para cargar secciones HTML dinámicamente
 * Busca elementos con data-include y carga el contenido del archivo especificado
 */

class SectionLoader {
    constructor() {
        this.loadedSections = new Set();
        this.init();
    }

    init() {
        // Cargar todas las secciones al cargar la página
        this.loadAllSections();
        
        // También cargar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadAllSections();
            });
        }
    }

    async loadAllSections() {
        const includeElements = document.querySelectorAll('[data-include]');
        
        const loadPromises = Array.from(includeElements).map(element => {
            const filePath = element.getAttribute('data-include');
            return this.loadSection(element, filePath);
        });

        try {
            await Promise.all(loadPromises);
            this.onAllSectionsLoaded();
        } catch (error) {
            console.error('Error cargando secciones:', error);
        }
    }

    async loadSection(element, filePath) {
        if (this.loadedSections.has(filePath)) {
            return;
        }

        try {
            const response = await fetch(filePath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            
            // Insertar el contenido HTML
            element.innerHTML = html;
            
            // Marcar como cargada
            this.loadedSections.add(filePath);
            
            // Agregar clase para animaciones
            element.classList.add('section-loaded');
            
            // Ejecutar scripts dentro de la sección si los hay
            this.executeScripts(element);
            
            console.log(`Sección cargada: ${filePath}`);
            
        } catch (error) {
            console.error(`Error cargando ${filePath}:`, error);
            element.innerHTML = `
                <div class="error-message">
                    <h3>Error cargando sección</h3>
                    <p>No se pudo cargar: ${filePath}</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        }
    }

    executeScripts(container) {
        // Buscar y ejecutar scripts dentro del contenedor
        const scripts = container.querySelectorAll('script');
        
        scripts.forEach(script => {
            if (script.src) {
                // Script externo
                const newScript = document.createElement('script');
                newScript.src = script.src;
                newScript.async = script.async;
                document.head.appendChild(newScript);
            } else {
                // Script inline
                try {
                    eval(script.textContent);
                } catch (error) {
                    console.error('Error ejecutando script inline:', error);
                }
            }
        });
    }

    onAllSectionsLoaded() {
        // Evento personalizado cuando todas las secciones están cargadas
        const event = new CustomEvent('sectionsLoaded', {
            detail: {
                loadedSections: Array.from(this.loadedSections)
            }
        });
        document.dispatchEvent(event);
        
        // Agregar animaciones de entrada
        this.addEntranceAnimations();
        
        console.log('Todas las secciones han sido cargadas');
    }

    addEntranceAnimations() {
        // Agregar animaciones de entrada a las secciones
        const sections = document.querySelectorAll('.section-loaded');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Método para recargar una sección específica
    async reloadSection(filePath) {
        const element = document.querySelector(`[data-include="${filePath}"]`);
        if (element) {
            this.loadedSections.delete(filePath);
            await this.loadSection(element, filePath);
        }
    }

    // Método para cargar una nueva sección dinámicamente
    async loadNewSection(containerId, filePath) {
        const container = document.getElementById(containerId);
        if (container) {
            container.setAttribute('data-include', filePath);
            await this.loadSection(container, filePath);
        }
    }
}

// Inicializar el cargador de secciones
const sectionLoader = new SectionLoader();

// Exportar para uso global
window.SectionLoader = SectionLoader;
window.sectionLoader = sectionLoader;

// Evento cuando todas las secciones están cargadas
document.addEventListener('sectionsLoaded', (event) => {
    console.log('Evento: Todas las secciones cargadas', event.detail);
    
    // Aquí puedes agregar código que se ejecute cuando todas las secciones estén listas
    // Por ejemplo, inicializar componentes específicos, animaciones, etc.
});

// Función de utilidad para cargar secciones manualmente
window.loadSection = (filePath) => {
    return sectionLoader.loadNewSection('dynamic-container', filePath);
}; 