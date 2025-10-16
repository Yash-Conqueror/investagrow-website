document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth Scroll Animation on View
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.parallax-image, .parallax-card, .started-content, .values-accordion, .people-header');
    animatedElements.forEach(el => observer.observe(el));

    // Gentle parallax for hero background only
    const heroBackground = document.querySelector('.hero-bg');
    
    function gentleParallax() {
        const scrolled = window.pageYOffset;
        if (heroBackground && scrolled < 800) {
            const yPos = scrolled * 0.3; // Much slower movement
            heroBackground.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
    }

    window.addEventListener('scroll', function() {
        requestAnimationFrame(gentleParallax);
    });

    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });

    // Video Play Button
    document.querySelector('.play-button')?.addEventListener('click', function() {
        alert('Video player will be integrated here. You can embed YouTube or Vimeo videos.');
    });

    // Initialize first accordion as open
    document.querySelector('.accordion-item')?.classList.add('active');

});