/**
 * Experiencias Links Handler
 * Maneja los clicks en los logos de empresas para redirigir a sus sitios web
 */

class ExperienciasLinksHandler {
  constructor() {
    this.links = null;
    this.observer = null;
    this.attachTimeout = null;
    this.processedCount = 0;
    this.init();
  }

  async init() {
    try {
      // Cargar el JSON con los links
      await this.loadLinks();
      // Configurar los eventos click en los logos
      this.setupLogoClicks();
    } catch (error) {
      console.error('Error al inicializar ExperienciasLinksHandler:', error);
    }
  }

  async loadLinks() {
    try {
      const response = await fetch('assets/LINKS/LinksEmpresas/linksExperiencias.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.links = await response.json();
    } catch (error) {
      console.error('Error al cargar links de experiencias:', error);
      this.links = {};
    }
  }

  setupLogoClicks() {
    // Esperar a que el DOM esté listo y las secciones se hayan cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.attachClickHandlers();
        this.setupObserver();
      });
    } else {
      // Si el DOM ya está listo, intentar inmediatamente
      // pero también esperar un poco por si las secciones se cargan dinámicamente
      setTimeout(() => {
        this.attachClickHandlers();
        this.setupObserver();
      }, 500);
    }
  }

  setupObserver() {
    // Solo observar cambios en la sección de experiencias si existe
    const experienciasSection = document.getElementById('experiencias');
    if (!experienciasSection) {
      // Si no existe, intentar de nuevo después de un tiempo
      setTimeout(() => this.setupObserver(), 1000);
      return;
    }

    // Función debounced para limitar llamadas
    const debouncedAttach = () => {
      if (this.attachTimeout) {
        clearTimeout(this.attachTimeout);
      }
      this.attachTimeout = setTimeout(() => {
        const beforeCount = this.processedCount;
        this.attachClickHandlers();
        const afterCount = this.processedCount;
        
        // Si no se procesaron nuevos logos, desconectar el observer
        // (asumiendo que todos los logos ya están procesados)
        if (beforeCount === afterCount && this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
      }, 300); // Debounce de 300ms
    };

    // Observer más selectivo: solo observa cambios en la sección de experiencias
    this.observer = new MutationObserver((mutations) => {
      // Solo procesar si hay cambios relevantes (nuevos nodos con company-logo)
      const hasRelevantChanges = mutations.some(mutation => {
        return Array.from(mutation.addedNodes).some(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            return node.classList?.contains('company-logo') || 
                   node.querySelector?.('.company-logo[data-company]');
          }
          return false;
        });
      });

      if (hasRelevantChanges) {
        debouncedAttach();
      }
    });

    // Observar solo la sección de experiencias, no todo el body
    this.observer.observe(experienciasSection, {
      childList: true,
      subtree: true
    });

    // Desconectar el observer después de 10 segundos como medida de seguridad
    setTimeout(() => {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    }, 10000);
  }

  attachClickHandlers() {
    const logos = document.querySelectorAll('.company-logo[data-company]:not([data-link-attached])');
    
    logos.forEach((logo) => {
      const companyName = logo.getAttribute('data-company');
      const link = this.links && this.links[companyName];

      if (link) {
        // Agregar estilo de cursor pointer
        logo.style.cursor = 'pointer';
        logo.setAttribute('title', `Visitar sitio web de ${companyName}`);
        
        // Agregar evento click
        logo.addEventListener('click', (e) => {
          e.preventDefault();
          window.open(link, '_blank', 'noopener,noreferrer');
        });

        // Marcar como procesado
        logo.setAttribute('data-link-attached', 'true');
        this.processedCount++;
      }
    });
  }
}

// Inicializar cuando el script se carga
const experienciasLinksHandler = new ExperienciasLinksHandler();

