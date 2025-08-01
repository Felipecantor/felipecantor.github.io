/**
 * Portfolio Utils - Funciones polimórficas para mejorar la funcionalidad del portafolio
 * Anderson Felipe Cantor Roa - Data Analyst Portfolio
 */

// Clase base para manejo de datos
class DataHandler {
    constructor(data = {}) {
        this.data = data;
    }

    // Método polimórfico para procesar diferentes tipos de datos
    processData(input) {
        if (typeof input === 'string') {
            return this.processString(input);
        } else if (Array.isArray(input)) {
            return this.processArray(input);
        } else if (typeof input === 'object') {
            return this.processObject(input);
        }
        return input;
    }

    processString(str) {
        return str.trim().toLowerCase();
    }

    processArray(arr) {
        return arr.filter(item => item !== null && item !== undefined);
    }

    processObject(obj) {
        return Object.keys(obj).reduce((acc, key) => {
            if (obj[key] !== null && obj[key] !== undefined) {
                acc[key] = obj[key];
            }
            return acc;
        }, {});
    }
}

// Clase para manejo de animaciones
class AnimationHandler extends DataHandler {
    constructor() {
        super();
        this.animations = new Map();
    }

    // Método polimórfico para diferentes tipos de animaciones
    animate(element, type, options = {}) {
        switch (type) {
            case 'fade':
                return this.fadeAnimation(element, options);
            case 'slide':
                return this.slideAnimation(element, options);
            case 'scale':
                return this.scaleAnimation(element, options);
            case 'custom':
                return this.customAnimation(element, options);
            default:
                return this.defaultAnimation(element, options);
        }
    }

    fadeAnimation(element, options) {
        const { duration = 500, delay = 0 } = options;
        element.style.transition = `opacity ${duration}ms ease-in-out ${delay}ms`;
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, delay);
    }

    slideAnimation(element, options) {
        const { direction = 'left', duration = 500, delay = 0 } = options;
        const transform = direction === 'left' ? 'translateX(-100%)' : 'translateY(-100%)';
        
        element.style.transition = `transform ${duration}ms ease-in-out ${delay}ms`;
        element.style.transform = transform;
        
        setTimeout(() => {
            element.style.transform = 'translate(0, 0)';
        }, delay);
    }

    scaleAnimation(element, options) {
        const { scale = 1.1, duration = 300, delay = 0 } = options;
        
        element.style.transition = `transform ${duration}ms ease-in-out ${delay}ms`;
        element.style.transform = 'scale(1)';
        
        element.addEventListener('mouseenter', () => {
            element.style.transform = `scale(${scale})`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    }

    customAnimation(element, options) {
        const { keyframes, duration = 500, delay = 0 } = options;
        
        if (keyframes && Array.isArray(keyframes)) {
            element.style.animation = `custom-animation ${duration}ms ease-in-out ${delay}ms`;
            
            // Crear keyframes dinámicamente
            const style = document.createElement('style');
            style.textContent = `
                @keyframes custom-animation {
                    ${keyframes.map((frame, index) => 
                        `${(index / (keyframes.length - 1)) * 100}% { ${frame} }`
                    ).join('\n')}
                }
            `;
            document.head.appendChild(style);
        }
    }

    defaultAnimation(element, options) {
        const { duration = 300 } = options;
        element.style.transition = `all ${duration}ms ease-in-out`;
    }
}

// Clase para manejo de proyectos
class ProjectHandler extends DataHandler {
    constructor() {
        super();
        this.projects = new Map();
    }

    // Método polimórfico para agregar diferentes tipos de proyectos
    addProject(project) {
        if (typeof project === 'string') {
            return this.addProjectFromString(project);
        } else if (typeof project === 'object') {
            return this.addProjectFromObject(project);
        }
        return null;
    }

    addProjectFromString(projectString) {
        const project = {
            id: Date.now(),
            title: projectString,
            description: '',
            technologies: [],
            type: 'personal'
        };
        this.projects.set(project.id, project);
        return project;
    }

    addProjectFromObject(projectObj) {
        const project = {
            id: projectObj.id || Date.now(),
            title: projectObj.title || 'Sin título',
            description: projectObj.description || '',
            technologies: projectObj.technologies || [],
            type: projectObj.type || 'professional',
            company: projectObj.company || '',
            period: projectObj.period || '',
            achievements: projectObj.achievements || []
        };
        this.projects.set(project.id, project);
        return project;
    }

    getProjectsByType(type) {
        return Array.from(this.projects.values()).filter(project => project.type === type);
    }

    getProjectsByTechnology(tech) {
        return Array.from(this.projects.values()).filter(project => 
            project.technologies.includes(tech)
        );
    }
}

// Clase para manejo de habilidades
class SkillHandler extends DataHandler {
    constructor() {
        super();
        this.skills = new Map();
    }

    // Método polimórfico para agregar habilidades
    addSkill(skill) {
        if (typeof skill === 'string') {
            return this.addSkillFromString(skill);
        } else if (typeof skill === 'object') {
            return this.addSkillFromObject(skill);
        }
        return null;
    }

    addSkillFromString(skillName) {
        const skill = {
            id: Date.now(),
            name: skillName,
            level: 50,
            category: 'general',
            icon: '🔧'
        };
        this.skills.set(skill.id, skill);
        return skill;
    }

    addSkillFromObject(skillObj) {
        const skill = {
            id: skillObj.id || Date.now(),
            name: skillObj.name || 'Sin nombre',
            level: skillObj.level || 50,
            category: skillObj.category || 'general',
            icon: skillObj.icon || '🔧'
        };
        this.skills.set(skill.id, skill);
        return skill;
    }

    getSkillsByCategory(category) {
        return Array.from(this.skills.values()).filter(skill => skill.category === category);
    }

    getSkillsByLevel(minLevel) {
        return Array.from(this.skills.values()).filter(skill => skill.level >= minLevel);
    }
}

// Clase para manejo de contactos
class ContactHandler extends DataHandler {
    constructor() {
        super();
        this.contacts = new Map();
    }

    // Método polimórfico para agregar contactos
    addContact(contact) {
        if (typeof contact === 'string') {
            return this.addContactFromString(contact);
        } else if (typeof contact === 'object') {
            return this.addContactFromObject(contact);
        }
        return null;
    }

    addContactFromString(contactString) {
        const contact = {
            id: Date.now(),
            type: 'email',
            value: contactString,
            label: 'Contacto'
        };
        this.contacts.set(contact.id, contact);
        return contact;
    }

    addContactFromObject(contactObj) {
        const contact = {
            id: contactObj.id || Date.now(),
            type: contactObj.type || 'email',
            value: contactObj.value || '',
            label: contactObj.label || 'Contacto',
            icon: contactObj.icon || '📧'
        };
        this.contacts.set(contact.id, contact);
        return contact;
    }

    getContactsByType(type) {
        return Array.from(this.contacts.values()).filter(contact => contact.type === type);
    }
}

// Clase principal del portafolio
class PortfolioManager {
    constructor() {
        this.dataHandler = new DataHandler();
        this.animationHandler = new AnimationHandler();
        this.projectHandler = new ProjectHandler();
        this.skillHandler = new SkillHandler();
        this.contactHandler = new ContactHandler();
    }

    // Método polimórfico para inicializar diferentes secciones
    initializeSection(section, type) {
        switch (type) {
            case 'hero':
                return this.initializeHero(section);
            case 'projects':
                return this.initializeProjects(section);
            case 'skills':
                return this.initializeSkills(section);
            case 'contact':
                return this.initializeContact(section);
            default:
                return this.initializeDefault(section);
        }
    }

    initializeHero(section) {
        const elements = section.querySelectorAll('[data-animate]');
        elements.forEach(element => {
            const animationType = element.dataset.animate;
            this.animationHandler.animate(element, animationType);
        });
    }

    initializeProjects(section) {
        const projectCards = section.querySelectorAll('.proyecto-card');
        projectCards.forEach(card => {
            this.animationHandler.animate(card, 'scale', { scale: 1.05 });
        });
    }

    initializeSkills(section) {
        const skillBars = section.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    initializeContact(section) {
        const form = section.querySelector('form');
        if (form) {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
    }

    initializeDefault(section) {
        // Animación por defecto
        this.animationHandler.animate(section, 'fade', { duration: 800 });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        // Procesar datos del formulario
        const processedData = this.dataHandler.processData(data);
        
        // Aquí se podría enviar a un servidor
        console.log('Datos del formulario:', processedData);
        
        // Mostrar mensaje de éxito
        this.showNotification('Mensaje enviado correctamente', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Método para cargar datos dinámicamente
    loadDynamicData() {
        // Cargar proyectos desde el CV
        const projects = [
            {
                title: 'Dashboard Gerencial de Monitoreo Estratégico',
                company: 'BDO Colombia',
                description: 'Desarrollé arquitectura de dashboards gerenciales en Power BI para monitoreo estratégico de recursos.',
                technologies: ['Power BI', 'Power Query', 'DAX', 'Excel'],
                type: 'professional'
            },
            {
                title: 'Auditoría Integral de Eficiencia del Staff',
                company: 'BDO Colombia',
                description: 'Lideré auditorías integrales mediante análisis correlacional de datos WIP en CRM interna.',
                technologies: ['Python', 'SQL', 'Excel', 'Análisis Estadístico'],
                type: 'professional'
            }
        ];

        projects.forEach(project => {
            this.projectHandler.addProject(project);
        });

        // Cargar habilidades desde el CV
        const skills = [
            { name: 'Power BI', level: 95, category: 'análisis', icon: '📊' },
            { name: 'Python', level: 85, category: 'programación', icon: '🐍' },
            { name: 'SQL', level: 90, category: 'base-datos', icon: '🗄️' },
            { name: 'Excel Avanzado', level: 92, category: 'herramientas', icon: '📈' },
            { name: 'Power Platform', level: 88, category: 'microsoft', icon: '⚡' },
            { name: 'Machine Learning', level: 75, category: 'avanzado', icon: '🧠' }
        ];

        skills.forEach(skill => {
            this.skillHandler.addSkill(skill);
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new PortfolioManager();
    
    // Cargar datos dinámicos
    portfolio.loadDynamicData();
    
    // Inicializar secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionType = section.dataset.sectionType || 'default';
        portfolio.initializeSection(section, sectionType);
    });
});

// Exportar para uso global
window.PortfolioManager = PortfolioManager;
window.DataHandler = DataHandler;
window.AnimationHandler = AnimationHandler;
window.ProjectHandler = ProjectHandler;
window.SkillHandler = SkillHandler;
window.ContactHandler = ContactHandler; 