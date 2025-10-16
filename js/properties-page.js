// DYNAMIC PROPERTY CARD GENERATOR
// This script automatically creates property cards from propertiesData

document.addEventListener('DOMContentLoaded', function() {
    
    // Get the properties grid container
    const propertiesGrid = document.getElementById('propertiesGrid');
    
    // Generate property cards dynamically from data
    function generatePropertyCards() {
        propertiesGrid.innerHTML = ''; // Clear existing cards
        
        propertiesData.forEach(property => {
            const propertyCard = `
                <div class="property-card" 
                     data-id="${property.id}"
                     data-type="${property.type}" 
                     data-category="${property.category ? property.category.toLowerCase() : property.type.toLowerCase()}"
                     data-bedrooms="${property.bedrooms}"
                     data-bathrooms="${property.bathrooms}"
                     data-area="${property.area}"
                    data-price="${property.price.replace(/[^0-9]/g, '')}"

                     data-location="${property.location.split(',')[0].toLowerCase()}">
                    
                    ${property.badge ? `<span class="property-badge">${property.badge}</span>` : ''}
                    
                    <div class="property-image">
                        <img src="${property.image}" alt="${property.title}">
                        <div class="property-type">${property.type}</div>
                    </div>
                    
                    <div class="property-content">
                        <h3 class="property-title">${property.title}</h3>
                        <p class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                        <div class="property-price">${property.price}</div>
                        
                        <div class="property-features">
                            <span><i class="fas fa-bed"></i> ${property.bedrooms}</span>
                            <span><i class="fas fa-bath"></i> ${property.bathrooms}</span>
                            <span><i class="fas fa-ruler-combined"></i> ${property.area}</span>
                        </div>
                        
                        <div class="property-actions">
                            <button class="action-btn" title="View Details"><i class="far fa-eye"></i></button>
                            <button class="action-btn" title="Compare"><i class="fas fa-exchange-alt"></i></button>
                            <button class="action-btn" title="Add to Favorites"><i class="far fa-heart"></i></button>
                            <span class="views">${property.views} Views</span>
                        </div>
                    </div>
                </div>
            `;
            
            propertiesGrid.innerHTML += propertyCard;
        });
        
        // Re-initialize event listeners after generating cards
        initializePropertyCards();
    }
    
    // Initialize all functionality after cards are generated
    function initializePropertyCards() {
        const propertyCards = document.querySelectorAll('.property-card');
        const propertyTypeRadios = document.querySelectorAll('input[name="propertyType"]');
        const offerTypeSelect = document.getElementById('offerType');
        const locationSelect = document.getElementById('location');
        const sortBySelect = document.getElementById('sortBy');
        const viewBtns = document.querySelectorAll('.view-btn');
        const pageButtons = document.querySelectorAll('.page-btn');
        const paginationInfo = document.querySelector('.pagination-info');
        
        let currentPage = 1;
        let itemsPerPage = 12;
        let filteredCards = Array.from(propertyCards);
        let autoPaginateTimer;

        // Property Type Filter
        propertyTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                applyFilters();
            });
        });

        // Offer Type Filter (Sale/Rent)
        if (offerTypeSelect) {
            offerTypeSelect.addEventListener('change', function() {
                applyFilters();
            });
        }

        // Location Filter
        if (locationSelect) {
            locationSelect.addEventListener('change', function() {
                applyFilters();
            });
        }

        // Apply All Filters Function
        function applyFilters() {
            const selectedPropertyType = document.querySelector('input[name="propertyType"]:checked')?.value || 'all';
            const selectedOfferType = offerTypeSelect?.value || 'all';
            const selectedLocation = locationSelect?.value || 'all';
        
            filteredCards = Array.from(propertyCards).filter(card => {
                const cardType = card.getAttribute('data-type'); // e.g. For Sale / For Rent
                const cardCategory = card.getAttribute('data-category'); // e.g. houses, land, villas
                const cardLocation = card.getAttribute('data-location') || 'all';
        
                let typeMatch = selectedPropertyType === 'all' || cardCategory === selectedPropertyType;
                let offerMatch = selectedOfferType === 'all' || cardType === selectedOfferType;
                let locationMatch = selectedLocation === 'all' || cardLocation.includes(selectedLocation.toLowerCase());
        
                return typeMatch && offerMatch && locationMatch;
            });
        
            updateResultCount();
            currentPage = 1;
            displayPage(currentPage);
            updatePagination();
        }
        

        // Sort By Function
        if (sortBySelect) {
            sortBySelect.addEventListener('change', function() {
                const sortValue = this.value;

                if (sortValue === 'Price: Low to High') {
                    filteredCards.sort((a, b) => {
                        return getPrice(a) - getPrice(b);
                    });
                } else if (sortValue === 'Price: High to Low') {
                    filteredCards.sort((a, b) => {
                        return getPrice(b) - getPrice(a);
                    });
                } else if (sortValue === 'Newest') {
                    filteredCards.reverse();
                }

                displayPage(currentPage);
            });
        }

        // Get Price from Card
        function getPrice(card) {
            const priceText = card.querySelector('.property-price').textContent;
            const priceNumber = priceText.replace(/[^0-9]/g, '');
            return parseInt(priceNumber);
        }

        // Update Result Count
        function updateResultCount() {
            const resultCount = document.querySelector('.result-count');
            if (resultCount) {
                resultCount.textContent = filteredCards.length;
            }
        }

        // Display Page Function
        function displayPage(page) {
            propertyCards.forEach(card => card.style.display = 'none');

            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const cardsToShow = filteredCards.slice(startIndex, endIndex);

            cardsToShow.forEach(card => card.style.display = 'block');

            // Update pagination info
            const start = filteredCards.length > 0 ? startIndex + 1 : 0;
            const end = Math.min(endIndex, filteredCards.length);
            if (paginationInfo) {
                paginationInfo.innerHTML = `Showing <strong>${start}</strong> to <strong>${end}</strong> of <strong>${filteredCards.length}</strong> results`;
            }

            // Scroll to top
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }

        // Update Pagination Buttons
        function updatePagination() {
            const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
            
            // Remove existing page buttons
            const existingButtons = document.querySelectorAll('.page-btn:not(.prev):not(.next)');
            existingButtons.forEach(btn => btn.remove());

            // Get pagination container
            const paginationButtons = document.querySelector('.pagination-buttons');
            if (!paginationButtons) return;
            
            const nextBtn = paginationButtons.querySelector('.next');

            // Create new page buttons
            for (let i = 1; i <= Math.min(totalPages, 5); i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = 'page-btn';
                pageBtn.textContent = i;
                if (i === currentPage) pageBtn.classList.add('active');
                
                pageBtn.addEventListener('click', function() {
                    currentPage = i;
                    displayPage(currentPage);
                    updateActivePageButton();
                    resetAutoPagination();
                });

                paginationButtons.insertBefore(pageBtn, nextBtn);
            }
        }

        // Update Active Page Button
        function updateActivePageButton() {
            document.querySelectorAll('.page-btn').forEach(btn => {
                btn.classList.remove('active');
                if (parseInt(btn.textContent) === currentPage) {
                    btn.classList.add('active');
                }
            });
        }

        // Page Navigation Buttons
        document.querySelector('.page-btn.prev')?.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
                updateActivePageButton();
                resetAutoPagination();
            }
        });

        document.querySelector('.page-btn.next')?.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayPage(currentPage);
                updateActivePageButton();
                resetAutoPagination();
            }
        });

        // View Toggle (Grid/List)
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                viewBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const view = this.getAttribute('data-view');
                
                if (view === 'list') {
                    propertiesGrid.style.gridTemplateColumns = '1fr';
                    propertyCards.forEach(card => {
                        card.style.display = card.style.display === 'none' ? 'none' : 'grid';
                        card.style.gridTemplateColumns = '400px 1fr';
                    });
                } else {
                    propertiesGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                    propertyCards.forEach(card => {
                        card.style.gridTemplateColumns = '1fr';
                    });
                }
            });
        });

        // Auto-pagination (20 seconds)
        function startAutoPagination() {
            autoPaginateTimer = setInterval(() => {
                const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
                currentPage = currentPage >= totalPages ? 1 : currentPage + 1;
                displayPage(currentPage);
                updateActivePageButton();
            }, 20000);
        }

        // Reset auto-pagination on user interaction
        function resetAutoPagination() {
            clearInterval(autoPaginateTimer);
            startAutoPagination();
        }

        // Action Buttons (Eye, Compare, Heart)
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const icon = this.querySelector('i');
                
                // Heart button - toggle favorite
                if (icon.classList.contains('fa-heart')) {
                    if (icon.classList.contains('far')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        this.style.color = '#e74c3c';
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        this.style.color = '';
                    }
                }
                
                // Eye button - view property
                if (icon.classList.contains('fa-eye')) {
                    this.closest('.property-card').click();
                }
                
                // Compare button
                if (icon.classList.contains('fa-exchange-alt')) {
                    alert('Property added to comparison. This feature will be available soon.');
                }

                // Animation
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        });

        // Property Card Click - Navigate to Detail with ID
        //propertyCards.forEach(card => {
          //  card.addEventListener('click', function() {
           //     const propertyId = this.getAttribute('data-id');
           //     window.location.href = `property-detail.html?id=${propertyId}`;
           // });
       // });

        // Min/Max Price Filters
        const minPriceInput = document.querySelector('.filter-input[placeholder="Min Price"]');
        const maxPriceInput = document.querySelector('.filter-input[placeholder="Max Price"]');

        if (minPriceInput && maxPriceInput) {
            minPriceInput.addEventListener('input', debounce(applyPriceFilter, 500));
            maxPriceInput.addEventListener('input', debounce(applyPriceFilter, 500));
        }

        function applyPriceFilter() {
            const minPrice = parseInt(minPriceInput.value.replace(/,/g, '')) || 0;
            const maxPrice = parseInt(maxPriceInput.value.replace(/,/g, '')) || Infinity;

            filteredCards = Array.from(propertyCards).filter(card => {
                const price = getPrice(card);
                return price >= minPrice && price <= maxPrice;
            });

            displayPage(1);
            updateResultCount();
            updatePagination();
        }

        // Debounce function for input fields
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Initialize
        updateResultCount();
        displayPage(currentPage);
        updatePagination();
        startAutoPagination();

        // Reset auto-pagination on any user interaction
        document.addEventListener('click', function(e) {
            if (e.target.closest('.page-btn') || 
                e.target.closest('.filter-checkbox') || 
                e.target.closest('select')) {
                resetAutoPagination();
            }
        });
    }
    
    // Generate cards on page load
    generatePropertyCards();
});
