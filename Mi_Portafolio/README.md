# 🚀 Portafolio Profesional - Anderson Felipe Cantor Roa

Un portafolio web moderno y modular desarrollado con HTML, CSS y JavaScript vanilla. Diseñado para mostrar proyectos, habilidades y experiencia profesional de Anderson Felipe Cantor Roa como **Junior Data Analyst**.

## ✨ Características

- **Arquitectura Modular**: Cada sección es un archivo HTML independiente
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Animaciones Suaves**: Transiciones y efectos visuales modernos
- **Reloj en Tiempo Real**: Muestra la hora actual en Bogotá
- **Carga Dinámica**: Secciones cargadas mediante JavaScript
- **SEO Optimizado**: Estructura semántica y meta tags
- **Accesibilidad**: Cumple estándares WCAG 2.1
- **Contenido Optimizado**: Texto profesional y coherente con el perfil de Data Analyst
- **Sección Académica**: Línea de tiempo con pestañas para estudios, certificaciones y cursos
- **Sistema de Certificados**: Modal interactivo para visualizar certificados en PDF/imagen

## 🏗️ Estructura del Proyecto

```
/mi-portafolio/
│
├── index.html                  # Página principal
├── cv.html                     # CV profesional (no modificable)
├── README.md                   # Documentación
│
├── /sections/                  # Módulos HTML
│   ├── navbar.html            # Navegación
│   ├── hero.html              # Sección principal (Data Analyst)
│   ├── sobre-mi.html          # Información personal optimizada
│   ├── academica.html         # Formación académica con línea de tiempo
│   ├── proyectos-u.html       # Proyectos universitarios
│   ├── proyectos-trabajo.html # Proyectos profesionales (BDO, ABS RedSist)
│   ├── proyectos-personales.html # Proyectos personales
│   ├── experiencias.html      # Timeline laboral actualizado
│   ├── contacto.html          # Formulario de contacto optimizado
│   └── footer.html            # Pie de página
│
├── /styles/                    # Archivos CSS
│   ├── main.css               # Estilos globales
│   ├── navbar.css             # Estilos de navegación
│   ├── hero.css               # Estilos de hero
│   ├── sobre-mi.css           # Estilos de sobre mí
│   ├── academica.css          # Estilos de formación académica
│   ├── proyectos-u.css        # Estilos de proyectos U
│   ├── proyectos-trabajo.css  # Estilos de proyectos trabajo
│   ├── proyectos-personales.css # Estilos de proyectos personales
│   ├── experiencias.css       # Estilos de experiencias
│   ├── contacto.css           # Estilos de contacto
│   ├── footer.css             # Estilos de footer
│   ├── effects.css            # Efectos visuales
│   ├── background-animations.css # Animaciones de fondo
│   └── notifications.css      # Estilos de notificaciones
│
├── /js/                        # Scripts JavaScript
│   ├── include.js             # Cargador de secciones
│   ├── reloj.js               # Reloj de Bogotá
│   ├── portfolio-utils.js     # Funciones polimórficas
│   └── academica.js           # Gestión de sección académica
│
└── /assets/                    # Recursos
    ├── /img/                  # Imágenes
    ├── /fonts/                # Fuentes personalizadas
    └── /certificates/         # Certificados académicos
        └── README.md          # Guía para agregar certificados
```

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+**: Módulos, Async/Await, Intersection Observer
- **Google Fonts**: Inter (tipografía principal)
- **GitHub Pages**: Hosting gratuito

## 🚀 Instalación y Uso

### Requisitos

- Navegador web moderno
- Servidor web local (opcional)

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/mi-portafolio.git
   cd mi-portafolio
   ```

2. **Abrir en el navegador**

   - Abrir `index.html` directamente en el navegador
   - O usar un servidor local:

   ```bash
   # Con Python
   python -m http.server 8000

   # Con Node.js
   npx serve .
   ```

3. **Personalizar contenido**

   - Editar archivos HTML en `/sections/`
   - Modificar estilos en `/styles/`
   - Actualizar información personal

## 📱 Responsive Design

El portafolio está optimizado para:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🎯 Características Técnicas

### Sistema de Carga Modular

- `include.js` carga dinámicamente las secciones
- Uso de `data-include` para referenciar archivos
- Manejo de errores y estados de carga

### Reloj en Tiempo Real

- `reloj.js` muestra hora de Bogotá
- Actualización automática cada segundo
- Formato 24 horas con fecha completa

### Animaciones y Efectos

- Animaciones CSS con `@keyframes`
- Intersection Observer para animaciones al scroll
- Transiciones suaves en hover states

### Optimización de Rendimiento

- CSS crítico inline
- Lazy loading de secciones
- Optimización de imágenes
- Minificación de assets

### Sección Académica

- **Pestañas Interactivas**: Estudios Universitarios, Certificaciones, Cursos
- **Línea de Tiempo**: Visualización cronológica de formación
- **Modales de Certificados**: Visualización de PDFs e imágenes
- **Iconos Representativos**: Cada curso/certificación tiene su icono
- **Responsive**: Adaptado para todos los dispositivos

## 🎨 Personalización

### Colores

Editar variables CSS en `styles/main.css`:

```css
:root {
  --primary-color: #3b82f6;
  --primary-dark: #2563eb;
  --text-dark: #1f2937;
  /* ... más variables */
}
```

### Tipografía

Cambiar fuente en `index.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Contenido

- Editar texto en archivos HTML de `/sections/`
- Actualizar información personal
- Agregar/enlaces de proyectos

## 🔧 Scripts Disponibles

### include.js

```javascript
// Cargar sección específica
window.loadSection("sections/nueva-seccion.html");

// Recargar sección
window.sectionLoader.reloadSection("sections/hero.html");
```

### reloj.js

```javascript
// Obtener hora actual
const hora = window.getBogotaTime();

// Obtener fecha actual
const fecha = window.getBogotaDate();
```

### academica.js

```javascript
// Cambiar pestaña
window.academicaManager.switchTab("certificaciones");

// Agregar certificado dinámicamente
window.academicaManager.addCertificate(
  "nuevo-certificado",
  "Título del Certificado",
  "Institución",
  "2024",
  "Descripción del certificado",
  "🎓"
);
```

## 📊 SEO y Accesibilidad

### Meta Tags

- Título y descripción optimizados
- Open Graph para redes sociales
- Twitter Cards configuradas

### Estructura Semántica

- Uso correcto de `<section>`, `<article>`, `<nav>`
- Headings jerárquicos (h1-h6)
- Alt text en imágenes

### Accesibilidad

- Navegación por teclado
- Contraste de colores adecuado
- ARIA labels donde sea necesario

## 🚀 Deployment

### GitHub Pages

1. Subir código a GitHub
2. Activar GitHub Pages en Settings
3. Seleccionar rama `main` como fuente

### Dominio Personalizado

1. Agregar archivo `CNAME` con tu dominio
2. Configurar DNS en tu proveedor
3. Esperar propagación (24-48 horas)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

- **Email**: Felipecantor2019@gmail.com
- **LinkedIn**: [linkedin.com/in/AndersonCantorRoa](https://linkedin.com/in/AndersonCantorRoa)
- **GitHub**: [github.com/FelipeCantor](https://github.com/FelipeCantor)
- **Portfolio**: [felipecantor.github.io](https://felipecantor.github.io/)

---

**Desarrollado con ❤️ en Bogotá, Colombia**

_Última actualización: Enero 2024_
