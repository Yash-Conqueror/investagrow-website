document.addEventListener('DOMContentLoaded', function() {
    
    const blogNavBtns = document.querySelectorAll('.blog-nav-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const likeButtons = document.querySelectorAll('.blog-like');

    // Category Filter
    blogNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            blogNavBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Like Button Toggle
    likeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            const count = this.querySelector('span');
            let currentCount = parseInt(count.textContent);

            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#e74c3c';
                count.textContent = currentCount + 1;
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
                count.textContent = currentCount - 1;
            }

            // Animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Blog Card Click
    blogCards.forEach(card => {
        card.addEventListener('click', function() {
            // Navigate to individual blog post page
            window.location.href = 'blog-post.html';
        });
    });

    // Investagrow Index Button
    document.querySelector('.btn-index')?.addEventListener('click', function() {
        alert('The Investagrow Property Index will be available soon. Stay tuned for quarterly market reports!');
    });

    // Search Icon Click
    document.querySelector('.blog-search')?.addEventListener('click', function() {
        const searchTerm = prompt('Search blog posts:');
        if (searchTerm) {
            // Simple search implementation
            blogCards.forEach(card => {
                const title = card.querySelector('.blog-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm.toLowerCase()) || excerpt.includes(searchTerm.toLowerCase())) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });

    // Smooth scroll for "Start Reading" button
    document.querySelector('.btn-start-reading')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#blog-posts').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

});