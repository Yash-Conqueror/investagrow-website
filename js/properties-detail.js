// DYNAMIC PROPERTY DETAIL PAGE
// Loads property details based on URL parameter (e.g., property-detail.html?id=1)

document.addEventListener('DOMContentLoaded', function() {
    
    // Debug: Check if properties data is loaded
    console.log('Properties Data Loaded:', typeof propertiesData !== 'undefined' ? 'Yes' : 'No');
    if (typeof propertiesData !== 'undefined') {
        console.log('Total properties:', propertiesData.length);
    }
    
    // Get property ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = parseInt(urlParams.get('id'));
    
    console.log('Property ID from URL:', propertyId);
    
    // Check if propertiesData exists
    if (typeof propertiesData === 'undefined') {
        console.error('Properties data not loaded!');
        alert('Error: Property data not loaded. Please refresh the page.');
        return;
    }
    
    // Find the property in the data
    const property = propertiesData.find(p => p.id === propertyId);
    
    console.log('Property found:', property ? 'Yes' : 'No');
    
    // If property not found, show error and available IDs
    if (!property) {
        console.error('Property not found! Available IDs:', propertiesData.map(p => p.id));
        alert('Property not found! Redirecting to properties page...');
        window.location.href = 'properties.html';
        return;
    }
    
    // Update page title
    document.title = `${property.title} - Investagrow Capital`;
    
    // Populate property details
    populatePropertyDetails(property);
    
    // Initialize image slider
    initializeImageSlider(property.images);
    
    // Initialize other features
    initializeContactForms();
    initializePrintButton();
    initializeShareButton();
});

// Populate all property details on the page
function populatePropertyDetails(property) {
    console.log('Populating details for:', property.title);
    
    // Main property info - update both title instances
    const titleElements = document.querySelectorAll('#propertyTitle');
    titleElements.forEach(el => el.textContent = property.title);
    
    const locationElement = document.getElementById('propertyLocation');
    if (locationElement) {
        locationElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${property.location}`;
    }
    
    const priceElement = document.getElementById('propertyPrice');
    if (priceElement) {
        priceElement.textContent = property.price;
    }
    
    const typeElement = document.getElementById('propertyType');
    if (typeElement) {
        typeElement.textContent = property.type;
    }
    
    // Property specs with error handling
    const setElementText = (id, value, defaultValue = 'N/A') => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value || defaultValue;
        } else {
            console.warn(`Element not found: ${id}`);
        }
    };
    
    setElementText('propertyBedrooms', property.bedrooms);
    setElementText('propertyBathrooms', property.bathrooms);
    setElementText('propertyArea', property.area);
    setElementText('propertyParking', property.parking, 'N/A');
    
    // Description
    setElementText('propertyDescription', property.description);
    
    // Property details
    setElementText('propertyId', property.propertyId);
    setElementText('propertyYearBuilt', property.yearBuilt, 'N/A');
    setElementText('propertyFurnished', property.furnished, 'N/A');
    
    // Features list
    const featuresList = document.getElementById('propertyFeatures');
    if (featuresList && property.features) {
        featuresList.innerHTML = '';
        property.features.forEach(feature => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle"></i> ${feature}`;
            featuresList.appendChild(li);
        });
    }
    
    // Amenities
    const amenitiesList = document.getElementById('propertyAmenities');
    if (amenitiesList && property.amenities) {
        amenitiesList.innerHTML = '';
        property.amenities.forEach(amenity => {
            const span = document.createElement('span');
            span.className = 'amenity-badge';
            span.innerHTML = `<i class="fas fa-check"></i> ${amenity}`;
            amenitiesList.appendChild(span);
        });
    }
}

// Initialize image slider/gallery
function initializeImageSlider(images) {
    const mainImage = document.getElementById('mainPropertyImage');
    const imageCounter = document.getElementById('imageCounter');
    const prevBtn = document.getElementById('prevImageBtn');
    const nextBtn = document.getElementById('nextImageBtn');
    const thumbnailContainer = document.getElementById('imageThumbnails');
    
    if (!mainImage) {
        console.error('Main image element not found');
        return;
    }
    
    if (!images || images.length === 0) {
        console.warn('No images provided, using placeholder');
        mainImage.src = 'https://via.placeholder.com/800x600?text=No+Image+Available';
        return;
    }
    
    let currentImageIndex = 0;
    
    // Set initial image
    mainImage.src = images[0];
    
    // Update counter
    function updateCounter() {
        if (imageCounter) {
            imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
        }
    }
    updateCounter();
    
    // Create thumbnails
    if (thumbnailContainer) {
        thumbnailContainer.innerHTML = '';
        images.forEach((img, index) => {
            const thumb = document.createElement('img');
            thumb.src = img;
            thumb.className = 'thumbnail' + (index === 0 ? ' active' : '');
            thumb.addEventListener('click', () => {
                currentImageIndex = index;
                showImage(currentImageIndex);
            });
            thumbnailContainer.appendChild(thumb);
        });
    }
    
    // Show specific image
    function showImage(index) {
        mainImage.src = images[index];
        updateCounter();
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        });
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        }
    });
}

// Initialize contact forms
function initializeContactForms() {
    const scheduleBtn = document.getElementById('scheduleViewingBtn');
    const inquiryBtn = document.getElementById('makeInquiryBtn');
    const contactForm = document.getElementById('contactForm');
    
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', () => {
            alert('Scheduling feature coming soon! Please call us at 0725 00 33 00');
        });
    }
    
    if (inquiryBtn) {
        inquiryBtn.addEventListener('click', () => {
            if (contactForm) {
                contactForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your inquiry! We will contact you shortly.');
            contactForm.reset();
        });
    }
}

// Initialize print button
function initializePrintButton() {
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

// Initialize share button
function initializeShareButton() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                }).catch(() => {
                    // Fallback: copy to clipboard
                    copyToClipboard(window.location.href);
                });
            } else {
                // Fallback: copy to clipboard
                copyToClipboard(window.location.href);
            }
        });
    }
}

// Copy to clipboard helper
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Link copied to clipboard!');
    }).catch(() => {
        alert('Could not copy link. Please copy manually: ' + text);
    });
}

// Add favorite button functionality
const favoriteBtn = document.getElementById('favoriteBtn');
if (favoriteBtn) {
    favoriteBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.style.color = '#e74c3c';
            alert('Property added to favorites!');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.style.color = '';
            alert('Property removed from favorites!');
        }
    });
}
