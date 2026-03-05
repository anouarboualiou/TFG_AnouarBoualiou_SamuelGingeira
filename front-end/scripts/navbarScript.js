
window.addEventListener('DOMContentLoaded', event => {

    let reducNavbar = function () {
        const navbarCollapsable = document.body.querySelector('#mainNav');
        if (!navbarCollapsable) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsable.classList.remove('navbar-shrink')
        } else {
            navbarCollapsable.classList.add('navbar-shrink')
        }

    };

    reducNavbar();

    document.addEventListener('scroll', reducNavbar);

    const navPrincipal = document.body.querySelector('#mainNav');
    if (navPrincipal) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const navItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    navItems.map(item=> {
        item.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});