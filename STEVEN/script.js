// ==========================================================================
// SCROLL EFFECTS Y ANIMACIONES MINIMALISTAS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initScrollEffects();
    initParallax();
    initSmoothScroll();
    initHeaderScroll();
});

// ==========================================================================
// 1. FADE IN ON SCROLL
// ==========================================================================
function initScrollEffects() {
    const elementsToReveal = document.querySelectorAll('[data-scroll]');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInScroll 0.8s ease-out forwards';
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, revealOptions);

    elementsToReveal.forEach(element => {
        revealOnScroll.observe(element);
    });
}

// ==========================================================================
// 2. PARALLAX EFFECT SUTIL
// ==========================================================================
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const parallaxIntensity = 0.5; // Valor entre 0-1 (más bajo = más sutil)
        
        heroSection.style.backgroundPosition = `center ${scrollPosition * parallaxIntensity}px`;
    });
}

// ==========================================================================
// 3. SMOOTH SCROLL MEJORADO
// ==========================================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Offset para el header fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// 4. HEADER CON BLUR DINÁMICO EN SCROLL
// ==========================================================================
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    const heroSection = document.querySelector('.hero-section');
    
    if (!header || !heroSection) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroHeight = heroSection.offsetHeight;

        // Transición suave de opacidad y blur
        if (scrollPosition > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        }
    });
}

// ==========================================================================
// 5. ANIMACIÓN DE BOTONES AL HOVER
// ==========================================================================
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==========================================================================
// 6. ANIMACIÓN SUTIL EN LINKS DE NAVEGACIÓN
// ==========================================================================
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.letterSpacing = '2.5px';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.letterSpacing = '1.5px';
    });
});

// ==========================================================================
// 7. HOVER EN IMÁGENES DE PERFIL
// ==========================================================================
document.querySelectorAll('.img-profile').forEach(img => {
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// CSS para transform en imágenes
const style = document.createElement('style');
style.textContent = `
    .img-profile {
        transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                    filter 0.6s ease;
    }
`;
document.head.appendChild(style);

// ==========================================================================
// 8. EFECTO DE CARGA PROGRESIVA
// ==========================================================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.6s ease';
});

// ==========================================================================
// 9. SCROLL INDICATOR (OPCIONAL - DESCOMENTAR SI SE DESEA)
// ==========================================================================
/*
function initScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7"></path>
        </svg>
    `;
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.appendChild(scrollIndicator);
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.display = 'none';
        } else {
            scrollIndicator.style.display = 'flex';
        }
    });
}
*/

// ==========================================================================
// ACCESIBILIDAD Y MEJORAS
// ==========================================================================

// Reducir animaciones si el usuario lo prefiere
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
        style.innerHTML = style.innerHTML.replace(/transition:[^;]*;/g, 'transition: none;');
        style.innerHTML = style.innerHTML.replace(/animation:[^;]*;/g, 'animation: none;');
    });
}

// Focus visible para accesibilidad
const focusVisibleStyle = document.createElement('style');
focusVisibleStyle.textContent = `
    a:focus-visible,
    button:focus-visible {
        outline: 2px solid rgba(255, 255, 255, 0.5);
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusVisibleStyle);

console.log('✓ Portfolio scripts loaded successfully');
