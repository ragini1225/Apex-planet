// Image Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const imageUrlInput = document.getElementById('imageUrlInput');
    const imageCaptionInput = document.getElementById('imageCaptionInput');
    const addImageBtn = document.getElementById('addImageBtn');
    const galleryGrid = document.getElementById('galleryGrid');
    
    // Gallery data
    let images = JSON.parse(localStorage.getItem('gallery-images')) || [];
    let imageIdCounter = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 4; // Start after sample images
    
    // Image class
    class GalleryImage {
        constructor(url, caption) {
            this.id = imageIdCounter++;
            this.url = url.trim();
            this.caption = caption.trim() || 'Untitled';
            this.createdAt = new Date();
        }
    }
    
    // Save images to localStorage
    function saveImages() {
        localStorage.setItem('gallery-images', JSON.stringify(images));
    }
    
    // Validate image URL
    function isValidImageUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    }
    
    // Test if image loads
    function testImageLoad(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
            
            // Timeout after 10 seconds
            setTimeout(() => resolve(false), 10000);
        });
    }
    
    // Add new image
    async function addImage(url, caption) {
        // Validate URL
        if (!url || url.trim() === '') {
            showToast('Please enter an image URL', 'error');
            imageUrlInput.focus();
            return;
        }
        
        if (!isValidImageUrl(url)) {
            showToast('Please enter a valid URL', 'error');
            imageUrlInput.focus();
            return;
        }
        
        // Show loading state
        const originalText = addImageBtn.textContent;
        addImageBtn.disabled = true;
        addImageBtn.textContent = 'Testing image...';
        
        // Test if image loads
        const imageLoads = await testImageLoad(url);
        
        if (!imageLoads) {
            showToast('Image could not be loaded. Please check the URL.', 'error');
            addImageBtn.disabled = false;
            addImageBtn.textContent = originalText;
            imageUrlInput.focus();
            return;
        }
        
        // Check for duplicates
        if (images.some(img => img.url === url)) {
            showToast('This image is already in the gallery', 'error');
            addImageBtn.disabled = false;
            addImageBtn.textContent = originalText;
            return;
        }
        
        // Create and add image
        const image = new GalleryImage(url, caption);
        images.unshift(image); // Add to beginning
        saveImages();
        renderGallery();
        
        // Clear inputs
        imageUrlInput.value = '';
        imageCaptionInput.value = '';
        
        // Reset button
        addImageBtn.disabled = false;
        addImageBtn.textContent = originalText;
        
        showToast('Image added successfully!', 'success');
        
        // Scroll to new image
        setTimeout(() => {
            const newImage = document.querySelector(`[data-id="${image.id}"]`);
            if (newImage) {
                newImage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Add entrance animation
                newImage.style.opacity = '0';
                newImage.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    newImage.style.transition = 'all 0.5s ease';
                    newImage.style.opacity = '1';
                    newImage.style.transform = 'scale(1)';
                }, 100);
            }
        }, 100);
    }
    
    // Remove image
    function removeImage(id) {
        const image = images.find(img => img.id === id);
        const imageElement = document.querySelector(`[data-id="${id}"]`);
        
        if (!image) return;
        
        if (confirm(`Remove "${image.caption}" from gallery?`)) {
            // Add exit animation
            if (imageElement) {
                imageElement.style.transition = 'all 0.3s ease';
                imageElement.style.opacity = '0';
                imageElement.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    const imageIndex = images.findIndex(img => img.id === id);
                    if (imageIndex > -1) {
                        images.splice(imageIndex, 1);
                        saveImages();
                        renderGallery();
                        showToast('Image removed!', 'success');
                    }
                }, 300);
            }
        }
    }
    
    // Render gallery
    function renderGallery() {
        // Get existing images from DOM to preserve sample images
        const existingImages = Array.from(galleryGrid.children);
        const sampleImages = existingImages.filter(img => {
            const id = parseInt(img.dataset.id);
            return id <= 3; // Sample images have IDs 1, 2, 3
        });
        
        // Clear gallery
        galleryGrid.innerHTML = '';
        
        // Add sample images back if no custom images
        if (images.length === 0) {
            sampleImages.forEach(img => galleryGrid.appendChild(img));
        }
        
        // Add custom images
        images.forEach(image => {
            const imageElement = createImageElement(image);
            galleryGrid.appendChild(imageElement);
        });
        
        // If we have custom images, also add sample images at the end
        if (images.length > 0) {
            sampleImages.forEach(img => galleryGrid.appendChild(img));
        }
    }
    
    // Create image element
    function createImageElement(image) {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.dataset.id = image.id;
        
        div.innerHTML = `
            <img src="${escapeHtml(image.url)}" alt="${escapeHtml(image.caption)}" loading="lazy">
            <div class="gallery-overlay">
                <p>${escapeHtml(image.caption)}</p>
                <button class="remove-btn" onclick="removeImage(${image.id})" title="Remove image">×</button>
            </div>
        `;
        
        // Add error handling for image loading
        const img = div.querySelector('img');
        img.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik01MCA1MEwxNTAgMTUwTTUwIDE1MEwxNTAgNTAiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHRLEHO4IDE7NTAiPkltYWdlIGZhaWxlZCB0byBsb2FkPC90ZXh0Pgo8L3N2Zz4=';
            this.alt = 'Failed to load image';
            div.querySelector('.gallery-overlay p').textContent = 'Image failed to load';
        };
        
        return div;
    }
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Handle URL input validation
    function validateUrlInput() {
        const url = imageUrlInput.value.trim();
        
        if (url === '') {
            imageUrlInput.style.borderColor = '';
            return;
        }
        
        if (isValidImageUrl(url)) {
            imageUrlInput.style.borderColor = '#10b981';
        } else {
            imageUrlInput.style.borderColor = '#ef4444';
        }
    }
    
    // Event listeners
    if (addImageBtn && imageUrlInput && imageCaptionInput) {
        addImageBtn.addEventListener('click', () => {
            addImage(imageUrlInput.value, imageCaptionInput.value);
        });
        
        imageUrlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (imageCaptionInput.value.trim() === '') {
                    imageCaptionInput.focus();
                } else {
                    addImage(imageUrlInput.value, imageCaptionInput.value);
                }
            }
        });
        
        imageCaptionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addImage(imageUrlInput.value, imageCaptionInput.value);
            }
        });
        
        // Real-time URL validation
        imageUrlInput.addEventListener('input', validateUrlInput);
        imageUrlInput.addEventListener('blur', validateUrlInput);
    }
    
    // Make removeImage function global for onclick handlers
    window.removeImage = removeImage;
    
    // Initialize gallery
    renderGallery();
    
    console.log('Gallery initialized');
});