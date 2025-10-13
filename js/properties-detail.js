document.addEventListener('DOMContentLoaded', function() {
    
    // Hero Image Slider
    const heroSwiper = new Swiper('.propertyHeroSwiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // Sticky Footer Bar
    const stickyBar = document.querySelector('.sticky-footer-bar');
    const sidebar = document.querySelector('.property-sidebar');
    
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 992) {
            if (window.scrollY > 800) {
                stickyBar.classList.add('show');
            } else {
                stickyBar.classList.remove('show');
            }
        }
    });

    // Register Interest Button
    document.querySelectorAll('.btn-register, .btn-register-footer').forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'index.html#contact';
        });
    });

    // Schedule Viewing Button
    document.querySelector('.btn-schedule')?.addEventListener('click', function() {
        window.location.href = 'index.html#contact';
    });

    // Download Brochure
    document.querySelector('.btn-download')?.addEventListener('click', function() {
        alert('Brochure download will be available soon. Please contact us for more information.');
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});