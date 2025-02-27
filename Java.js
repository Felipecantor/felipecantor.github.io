// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const projectFilters = document.querySelectorAll('[data-filter]');
    const projects = document.querySelectorAll('.project-card');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Filtrado de proyectos
    if(projectFilters.length > 0) {
        projectFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remover clase active de todos los botones
                projectFilters.forEach(btn => btn.classList.remove('active'));
                // Añadir clase active al botón clickeado
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Mostrar u ocultar proyectos según el filtro
                projects.forEach(project => {
                    if(filterValue === 'all' || project.classList.contains(filterValue)) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }

    // Navegación suave (smooth scrolling)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el destino del enlace
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if(targetSection) {
                // Scroll suave hacia la sección
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // 70px de offset para la navbar
                    behavior: 'smooth'
                });
                
                // Cerrar el menú móvil si está abierto
                if(navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Resaltar la sección activa en la navegación al hacer scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Obtener todas las secciones
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover clase active de todos los enlaces
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Añadir clase active al enlace correspondiente
                const correspondingLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if(correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // Validación simple del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validaciones básicas
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            if(!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('is-invalid');
            }
            
            if(!emailInput.value.trim() || !validateEmail(emailInput.value)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('is-invalid');
            }
            
            if(!messageInput.value.trim()) {
                messageInput.classList.add('is-invalid');
                isValid = false;
            } else {
                messageInput.classList.remove('is-invalid');
            }
            
            if(isValid) {
                // Aquí iría el código para enviar el formulario por AJAX
                alert('¡Formulario enviado correctamente!');
                contactForm.reset();
            }
        });
    }
    
    // Función para validar email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Animación de elementos al hacer scroll
    const animatedElements = document.querySelectorAll('.animated');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = (windowTopPosition + windowHeight);
        
        animatedElements.forEach(function(element) {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = (elementTopPosition + elementHeight);
            
            // Verificar si el elemento está en el viewport
            if ((elementBottomPosition >= windowTopPosition) && 
                (elementTopPosition <= windowBottomPosition)) {
                element.classList.add('fadeIn');
            }
        });
    }
    
    // Ejecutar la función al cargar la página y al hacer scroll
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('load', checkIfInView);
});
