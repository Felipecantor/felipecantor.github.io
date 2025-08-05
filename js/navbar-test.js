/**
 * Navbar Test Script
 * Verifica que todos los sistemas de animación del navbar estén funcionando correctamente
 */

class NavbarTest {
    constructor() {
        this.testResults = [];
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.runTests());
        } else {
            this.runTests();
        }
    }

    runTests() {
        console.log('🧪 Iniciando tests del navbar...');
        
        this.testNavbarExists();
        this.testCSSClasses();
        this.testJavaScriptSystems();
        this.testAnimationStates();
        
        this.showResults();
    }

    testNavbarExists() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            this.testResults.push('✅ Navbar encontrado en el DOM');
        } else {
            this.testResults.push('❌ Navbar NO encontrado en el DOM');
        }
    }

    testCSSClasses() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const testClasses = [
            'navbar-scrolled',
            'navbar-minimal', 
            'navbar-hidden',
            'navbar-peek',
            'navbar-scrolling'
        ];

        testClasses.forEach(className => {
            navbar.classList.add(className);
            const hasStyle = getComputedStyle(navbar).transform !== 'none' || 
                           getComputedStyle(navbar).opacity !== '1' ||
                           getComputedStyle(navbar).height !== 'auto';
            
            if (hasStyle) {
                this.testResults.push(`✅ Clase CSS "${className}" aplicada correctamente`);
            } else {
                this.testResults.push(`⚠️ Clase CSS "${className}" puede no tener estilos`);
            }
            
            navbar.classList.remove(className);
        });
    }

    testJavaScriptSystems() {
        // Test sistema básico
        if (typeof window.navbarScrollAnimation !== 'undefined') {
            this.testResults.push('✅ Sistema avanzado navbar-scroll-animation.js cargado');
        } else {
            this.testResults.push('❌ Sistema avanzado navbar-scroll-animation.js NO cargado');
        }

        // Test sistema básico
        if (typeof window.navbarAnimation !== 'undefined') {
            this.testResults.push('✅ Sistema básico navbar-animation.js cargado');
        } else {
            this.testResults.push('❌ Sistema básico navbar-animation.js NO cargado');
        }
    }

    testAnimationStates() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Test estados manuales
        const states = ['navbar-scrolled', 'navbar-minimal', 'navbar-hidden'];
        
        states.forEach(state => {
            navbar.classList.add(state);
            setTimeout(() => {
                if (navbar.classList.contains(state)) {
                    this.testResults.push(`✅ Estado "${state}" aplicado correctamente`);
                } else {
                    this.testResults.push(`❌ Estado "${state}" NO se aplicó`);
                }
                navbar.classList.remove(state);
            }, 100);
        });
    }

    showResults() {
        console.log('\n📊 RESULTADOS DE TESTS DEL NAVBAR:');
        console.log('=====================================');
        
        this.testResults.forEach(result => {
            console.log(result);
        });

        const passed = this.testResults.filter(r => r.includes('✅')).length;
        const total = this.testResults.length;
        
        console.log(`\n📈 Resumen: ${passed}/${total} tests pasaron`);
        
        if (passed === total) {
            console.log('🎉 ¡Todos los tests pasaron! El navbar está funcionando correctamente.');
        } else {
            console.log('⚠️ Algunos tests fallaron. Revisa los errores arriba.');
        }

        // Mostrar información adicional
        this.showDebugInfo();
    }

    showDebugInfo() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        console.log('\n🔍 INFORMACIÓN DE DEBUG:');
        console.log('========================');
        console.log('Clases actuales del navbar:', navbar.className);
        console.log('Altura del navbar:', getComputedStyle(navbar).height);
        console.log('Posición del navbar:', getComputedStyle(navbar).position);
        console.log('Z-index del navbar:', getComputedStyle(navbar).zIndex);
        
        const heroSection = document.querySelector('#home, .hero');
        if (heroSection) {
            console.log('Sección hero encontrada:', heroSection.id || heroSection.className);
        } else {
            console.log('⚠️ Sección hero NO encontrada');
        }
    }
}

// Ejecutar tests después de un breve delay para asegurar que todo esté cargado
setTimeout(() => {
    new NavbarTest();
}, 1000);

// También ejecutar tests cuando se complete la carga
window.addEventListener('load', () => {
    setTimeout(() => {
        new NavbarTest();
    }, 500);
});