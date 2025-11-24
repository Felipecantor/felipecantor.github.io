/**
 * JavaScript para la sección académica
 * Manejo de pestañas y modales de certificados
 */

class AcademicaManager {
    constructor() {
        this.currentTab = 'estudios';
        this.certificates = new Map();
        this.autoDemoActive = true;
        this.userInteracted = false;
        this.autoDemoInterval = null;
        this.currentButtonIndex = 0;
    }

    init() {
        this.setupTabs();
        this.setupCertificates();
        this.setupModal();
        this.startAutoDemo();
    }

    switchTab(tabName) {
        // Actualizar botones
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Actualizar contenido
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;
    }

    // Configurar certificados
    setupCertificates() {
        const certificateButtons = document.querySelectorAll('.certificate-btn');
        
        certificateButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const certificateId = button.dataset.certificate;
                this.showCertificate(certificateId);
            });
        });
    }

    // Configurar pestañas con detección de interacción
    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                this.switchTab(targetTab);
                
                // Marcar interacción del usuario
                this.userInteracted = true;
                this.stopAutoDemo();
                
                // Reiniciar auto-demo después de 6 segundos
                setTimeout(() => {
                    this.userInteracted = false;
                    this.startAutoDemo();
                }, 6000); // 6 segundos máximo después de interacción
            });
        });
    }

    // Función de auto-demo
    startAutoDemo() {
        if (this.autoDemoInterval) {
            clearInterval(this.autoDemoInterval);
        }

        // Determinar velocidad basada en interacción previa
        const speed = this.userInteracted ? 4000 : 2000; // 4 segundos si hubo interacción, 2 segundos normal

        this.autoDemoInterval = setInterval(() => {
            if (!this.userInteracted) {
                this.simulateNextTabClick();
            }
        }, speed);
    }

    stopAutoDemo() {
        if (this.autoDemoInterval) {
            clearInterval(this.autoDemoInterval);
            this.autoDemoInterval = null;
        }
    }

    simulateNextTabClick() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        if (tabButtons.length === 0) return;

        // Obtener el botón actual
        const currentButton = tabButtons[this.currentButtonIndex];
        
        if (currentButton) {
            // Simular clic
            currentButton.click();
            
            // Avanzar al siguiente botón
            this.currentButtonIndex = (this.currentButtonIndex + 1) % tabButtons.length;
        }
    }

    // Mostrar certificado
    showCertificate(certificateId) {
        const modal = document.getElementById('certificateModal');
        const modalTitle = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');

        // Configurar título según el certificado
        const titles = {
            'diplomado-ia-cataluna': 'Diplomado en Arquitectura y Sistemas de Inteligencia Artificial',
            'diplomado-analitica': 'Diplomado en Analítica de Datos',
            'microsoft-analisis': 'Fundamentos Profesionales de Análisis Empresarial',
            'pl900': 'PL-900: Power Platform Fundamentals',
            'powerbi': 'Power BI: Análisis y Visualización',
            'python-sena': 'Análisis Exploratorio de Datos en Python',
            'communication': 'Communication Skills',
            'marco-logico': 'Marco Lógico de Proyectos',
            'bases-datos': 'Bases de Datos: Generalidades y Sistemas',
            'excel-access': 'Excel y Access para Aplicaciones Empresariales'
        };

        modalTitle.textContent = titles[certificateId] || 'Certificado';

        // Configurar contenido del modal
        modalBody.innerHTML = `
            <div class="certificate-placeholder">
                <div class="placeholder-icon">📄</div>
                <h3>Certificado ${titles[certificateId] || certificateId}</h3>
                <p>El certificado será agregado manualmente en formato PDF o imagen.</p>
                <div class="placeholder-actions">
                    <button class="btn btn-primary" onclick="window.open('assets/certificates/${certificateId}.pdf', '_blank')">
                        Ver PDF
                    </button>
                    <button class="btn btn-secondary" onclick="window.open('assets/certificates/${certificateId}.jpg', '_blank')">
                        Ver Imagen
                    </button>
                </div>
            </div>
        `;

        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Configurar modal
    setupModal() {
        const modal = document.getElementById('certificateModal');
        const closeBtn = document.querySelector('.modal-close');

        // Cerrar con botón X
        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        // Cerrar con clic fuera del modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const modal = document.getElementById('certificateModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Agregar certificado dinámicamente
    addCertificate(id, title, institution, period, description, icon) {
        const certificate = {
            id,
            title,
            institution,
            period,
            description,
            icon
        };

        this.certificates.set(id, certificate);
        this.renderCertificate(certificate);
    }

    // Renderizar certificado en la interfaz
    renderCertificate(certificate) {
        const timeline = document.querySelector('#certificaciones .timeline-academica');
        
        const certificateHTML = `
            <div class="timeline-item">
                <div class="timeline-marker">
                    <div class="marker-dot"></div>
                    <div class="marker-line"></div>
                </div>
                
                <div class="timeline-content">
                    <div class="academica-header">
                        <div class="academica-icon">${certificate.icon}</div>
                        <div class="academica-info">
                            <h3 class="academica-title">${certificate.title}</h3>
                            <p class="academica-institution">${certificate.institution}</p>
                            <p class="academica-period">${certificate.period}</p>
                        </div>
                    </div>
                    
                    <div class="academica-description">
                        <p>${certificate.description}</p>
                    </div>
                    
                    <div class="academica-certificate">
                        <button class="certificate-btn" data-certificate="${certificate.id}">
                            <span>Ver Certificado</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        timeline.insertAdjacentHTML('beforeend', certificateHTML);
        
        // Reconfigurar eventos para el nuevo certificado
        const newButton = timeline.querySelector(`[data-certificate="${certificate.id}"]`);
        newButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.showCertificate(certificate.id);
        });
    }

    // Filtrar certificados por categoría
    filterCertificates(category) {
        const certificates = Array.from(this.certificates.values());
        return certificates.filter(cert => cert.category === category);
    }

    // Buscar certificados
    searchCertificates(query) {
        const certificates = Array.from(this.certificates.values());
        return certificates.filter(cert => 
            cert.title.toLowerCase().includes(query.toLowerCase()) ||
            cert.institution.toLowerCase().includes(query.toLowerCase())
        );
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear modal si no existe
    if (!document.getElementById('certificateModal')) {
        const modalHTML = `
            <div id="certificateModal" class="certificate-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Certificado</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="certificate-placeholder">
                            <div class="placeholder-icon">📄</div>
                            <h3>Cargando certificado...</h3>
                            <p>El certificado será mostrado aquí.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Inicializar gestor académico con delay simple
    setTimeout(() => {
        window.academicaManager = new AcademicaManager();
        window.academicaManager.init();
    }, 500);
});

// Estilos adicionales para el placeholder
const placeholderStyles = `
    <style>
        .certificate-placeholder {
            text-align: center;
            padding: 40px 20px;
        }
        
        .placeholder-icon {
            font-size: 64px;
            margin-bottom: 20px;
        }
        
        .certificate-placeholder h3 {
            color: var(--text-dark);
            margin-bottom: 15px;
        }
        
        .certificate-placeholder p {
            color: var(--text-medium);
            margin-bottom: 30px;
        }
        
        .placeholder-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .placeholder-actions .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .placeholder-actions .btn-primary {
            background: var(--primary-color);
            color: white;
        }
        
        .placeholder-actions .btn-secondary {
            background: #6b7280;
            color: white;
        }
        
        .placeholder-actions .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    </style>
`;

// Agregar estilos al head
document.head.insertAdjacentHTML('beforeend', placeholderStyles); 