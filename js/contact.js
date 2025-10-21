document.addEventListener('DOMContentLoaded', function() {
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            alert('Thank you for contacting us! We will get back to you within 24 hours.');
            
            // Reset form
            this.reset();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth scroll for Connect button
    document.querySelector('.btn-connect')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#contactForm').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

});