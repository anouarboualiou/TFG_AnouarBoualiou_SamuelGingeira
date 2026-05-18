window.addEventListener('DOMContentLoaded', event => {

    const navbar = document.querySelector('#mainNav');

    function handleNavbarScroll() {
        if (!navbar) return;

        // 🔑 SOLO aplicar efecto si es la home
        if (navbar.classList.contains('navbar-home')) {
            if (window.scrollY === 0) {
                navbar.classList.remove('navbar-scrolled');
            } else {
                navbar.classList.add('navbar-scrolled');
            }
        }
    }

    handleNavbarScroll();
    document.addEventListener('scroll', handleNavbarScroll);

    // ScrollSpy
    if (navbar) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Cerrar menú en móvil
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link:not(.dropdown-toggle)')
    );

    navItems.map(item => {
        item.addEventListener('click', () => {
            if (
                navbarToggler &&
                window.getComputedStyle(navbarToggler).display !== 'none'
            ) {
                navbarToggler.click();
            }
        });
    });

});
