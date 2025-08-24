// Products App JavaScript
class ProductsApp {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.currentView = 'grid';
        this.filters = {
            search: '',
            category: 'all',
            priceRange: 'all',
            rating: 'all',
            sortBy: 'name'
        };
        
        this.initializeProducts();
        this.initializeEventListeners();
        this.applyFilters();
    }

    // Initialize sample products data
    initializeProducts() {
        this.products = [
            {
                id: 1,
                name: 'Wireless Bluetooth Headphones',
                description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
                price: 199.99,
                category: 'electronics',
                rating: 4.5,
                image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 2,
                name: 'Premium Cotton T-Shirt',
                description: 'Comfortable 100% organic cotton t-shirt available in multiple colors.',
                price: 29.99,
                category: 'clothing',
                rating: 4.2,
                image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 3,
                name: 'Smart Fitness Watch',
                description: 'Advanced fitness tracking with heart rate monitor and GPS functionality.',
                price: 299.99,
                category: 'electronics',
                rating: 4.7,
                image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: false
            },
            {
                id: 4,
                name: 'Ergonomic Office Chair',
                description: 'Comfortable office chair with lumbar support and adjustable height.',
                price: 449.99,
                category: 'home',
                rating: 4.3,
                image: 'https://images.pexels.com/photos/586744/pexels-photo-586744.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 5,
                name: 'Yoga Mat Pro',
                description: 'Non-slip yoga mat with extra cushioning for comfort during workouts.',
                price: 59.99,
                category: 'sports',
                rating: 4.6,
                image: 'https://images.pexels.com/photos/4498155/pexels-photo-4498155.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 6,
                name: 'JavaScript: The Complete Guide',
                description: 'Comprehensive guide to modern JavaScript development and best practices.',
                price: 39.99,
                category: 'books',
                rating: 4.8,
                image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 7,
                name: 'Wireless Gaming Mouse',
                description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons.',
                price: 89.99,
                category: 'electronics',
                rating: 4.4,
                image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 8,
                name: 'Designer Sunglasses',
                description: 'Stylish sunglasses with UV protection and polarized lenses.',
                price: 149.99,
                category: 'clothing',
                rating: 4.1,
                image: 'https://images.pexels.com/photos/1201407/pexels-photo-1201407.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 9,
                name: 'Plant-Based Cookbook',
                description: 'Collection of delicious and healthy plant-based recipes for every meal.',
                price: 24.99,
                category: 'books',
                rating: 4.5,
                image: 'https://images.pexels.com/photos/1666095/pexels-photo-1666095.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 10,
                name: 'Smart LED Desk Lamp',
                description: 'Energy-efficient LED desk lamp with adjustable brightness and color temperature.',
                price: 79.99,
                category: 'home',
                rating: 4.2,
                image: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 11,
                name: 'Professional Tennis Racket',
                description: 'High-performance tennis racket used by professional players worldwide.',
                price: 199.99,
                category: 'sports',
                rating: 4.6,
                image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 12,
                name: 'Mechanical Keyboard',
                description: 'RGB mechanical keyboard with tactile switches and customizable keycaps.',
                price: 129.99,
                category: 'electronics',
                rating: 4.7,
                image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: false
            },
            {
                id: 13,
                name: 'Casual Denim Jacket',
                description: 'Classic denim jacket perfect for casual wear in all seasons.',
                price: 89.99,
                category: 'clothing',
                rating: 4.3,
                image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 14,
                name: 'Indoor Plant Collection',
                description: 'Set of three air-purifying indoor plants perfect for home or office.',
                price: 49.99,
                category: 'home',
                rating: 4.4,
                image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 15,
                name: 'Resistance Band Set',
                description: 'Complete resistance band set with different resistance levels for full-body workouts.',
                price: 34.99,
                category: 'sports',
                rating: 4.2,
                image: 'https://images.pexels.com/photos/4498155/pexels-photo-4498155.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            },
            {
                id: 16,
                name: 'Web Development Masterclass',
                description: 'Complete guide to modern web development including HTML, CSS, JavaScript, and React.',
                price: 59.99,
                category: 'books',
                rating: 4.9,
                image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=500',
                inStock: true
            }
        ];
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Search
        const searchInput = document.getElementById('productSearch');
        searchInput.addEventListener('input', (e) => this.handleSearch(e));

        // Filters
        const categoryFilter = document.getElementById('categoryFilter');
        const priceRange = document.getElementById('priceRange');
        const ratingFilter = document.getElementById('ratingFilter');
        const sortBy = document.getElementById('sortBy');

        categoryFilter.addEventListener('change', (e) => this.handleFilterChange('category', e.target.value));
        priceRange.addEventListener('change', (e) => this.handleFilterChange('priceRange', e.target.value));
        ratingFilter.addEventListener('change', (e) => this.handleFilterChange('rating', e.target.value));
        sortBy.addEventListener('change', (e) => this.handleFilterChange('sortBy', e.target.value));

        // Reset filters
        const resetFilters = document.getElementById('resetFilters');
        resetFilters.addEventListener('click', () => this.resetFilters());

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleViewChange(e));
        });

        // Pagination
        const prevPage = document.getElementById('prevPage');
        const nextPage = document.getElementById('nextPage');
        
        prevPage.addEventListener('click', () => this.changePage(-1));
        nextPage.addEventListener('click', () => this.changePage(1));

        // Modal
        const closeModal = document.getElementById('closeProductModal');
        const modal = document.getElementById('productModal');
        
        closeModal.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Mobile navigation
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // Handle search
    handleSearch(e) {
        this.filters.search = e.target.value.toLowerCase();
        this.currentPage = 1;
        this.applyFilters();
    }

    // Handle filter changes
    handleFilterChange(filterType, value) {
        this.filters[filterType] = value;
        this.currentPage = 1;
        this.applyFilters();
    }

    // Reset all filters
    resetFilters() {
        this.filters = {
            search: '',
            category: 'all',
            priceRange: 'all',
            rating: 'all',
            sortBy: 'name'
        };

        // Reset form values
        document.getElementById('productSearch').value = '';
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('priceRange').value = 'all';
        document.getElementById('ratingFilter').value = 'all';
        document.getElementById('sortBy').value = 'name';

        this.currentPage = 1;
        this.applyFilters();
    }

    // Handle view change
    handleViewChange(e) {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        e.target.classList.add('active');
        this.currentView = e.target.getAttribute('data-view');
        
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.className = `products-grid ${this.currentView}-view`;
    }

    // Apply filters and sorting
    applyFilters() {
        this.showLoading(true);
        
        // Simulate loading delay
        setTimeout(() => {
            let filtered = [...this.products];

            // Search filter
            if (this.filters.search) {
                filtered = filtered.filter(product => 
                    product.name.toLowerCase().includes(this.filters.search) ||
                    product.description.toLowerCase().includes(this.filters.search)
                );
            }

            // Category filter
            if (this.filters.category !== 'all') {
                filtered = filtered.filter(product => product.category === this.filters.category);
            }

            // Price range filter
            if (this.filters.priceRange !== 'all') {
                filtered = filtered.filter(product => {
                    const price = product.price;
                    switch (this.filters.priceRange) {
                        case '0-50': return price <= 50;
                        case '51-100': return price > 50 && price <= 100;
                        case '101-200': return price > 100 && price <= 200;
                        case '201-500': return price > 200 && price <= 500;
                        case '501+': return price > 500;
                        default: return true;
                    }
                });
            }

            // Rating filter
            if (this.filters.rating !== 'all') {
                const minRating = parseFloat(this.filters.rating.replace('+', ''));
                filtered = filtered.filter(product => product.rating >= minRating);
            }

            // Sort products
            filtered = this.sortProducts(filtered);

            this.filteredProducts = filtered;
            this.showLoading(false);
            this.render();
            this.updatePagination();
        }, 500);
    }

    // Sort products
    sortProducts(products) {
        return products.sort((a, b) => {
            switch (this.filters.sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'price':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'rating':
                    return a.rating - b.rating;
                case 'rating-desc':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
    }

    // Get paginated products
    getPaginatedProducts() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredProducts.slice(startIndex, endIndex);
    }

    // Render products
    render() {
        const productsGrid = document.getElementById('productsGrid');
        const noResults = document.getElementById('noResults');
        const resultsCount = document.getElementById('resultsCount');
        
        const paginatedProducts = this.getPaginatedProducts();
        
        // Update results count
        resultsCount.textContent = this.filteredProducts.length;

        if (paginatedProducts.length === 0) {
            productsGrid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            productsGrid.style.display = 'grid';
            noResults.style.display = 'none';
            
            productsGrid.innerHTML = paginatedProducts.map(product => this.createProductHTML(product)).join('');
            
            // Add event listeners to product cards
            this.attachProductEventListeners();
        }
    }

    // Create HTML for a product
    createProductHTML(product) {
        const stars = this.generateStars(product.rating);
        const stockBadge = product.inStock ? '' : '<div class="product-badge">Out of Stock</div>';
        
        return `
            <div class="product-card" onclick="productsApp.showProductDetails(${product.id})">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${stockBadge}
                </div>
                <div class="product-content">
                    <h3 class="product-title">${this.escapeHtml(product.name)}</h3>
                    <p class="product-description">${this.escapeHtml(product.description)}</p>
                    <div class="product-meta">
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-rating">
                            ${stars}
                            <span>(${product.rating})</span>
                        </div>
                    </div>
                    <div class="product-category">${this.capitalize(product.category)}</div>
                </div>
            </div>
        `;
    }

    // Generate star rating HTML
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    // Show product details in modal
    showProductDetails(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) return;

        const modal = document.getElementById('productModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = product.name;
        modalBody.innerHTML = `
            <div class="product-detail">
                <div class="product-detail-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-detail-info">
                    <p class="product-detail-description">${product.description}</p>
                    <div class="product-detail-meta">
                        <div class="detail-price">$${product.price.toFixed(2)}</div>
                        <div class="detail-rating">
                            ${this.generateStars(product.rating)}
                            <span>(${product.rating} stars)</span>
                        </div>
                    </div>
                    <div class="product-detail-category">
                        Category: ${this.capitalize(product.category)}
                    </div>
                    <div class="product-detail-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                        ${product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                    </div>
                    <div class="product-detail-actions">
                        <button class="btn btn-primary ${!product.inStock ? 'disabled' : ''}" 
                                ${!product.inStock ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i>
                            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-heart"></i>
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        if (!document.querySelector('.product-detail-styles')) {
            const style = document.createElement('style');
            style.className = 'product-detail-styles';
            style.textContent = `
                .product-detail {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    align-items: start;
                }
                .product-detail-image img {
                    width: 100%;
                    border-radius: 15px;
                }
                .product-detail-description {
                    color: #d1d5db;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }
                .product-detail-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                .detail-price {
                    font-size: 2rem;
                    font-weight: 700;
                    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .detail-rating {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #fbbf24;
                }
                .product-detail-category {
                    color: #9ca3af;
                    margin-bottom: 1rem;
                }
                .product-detail-stock {
                    margin-bottom: 2rem;
                    font-weight: 600;
                }
                .product-detail-stock.in-stock {
                    color: #10b981;
                }
                .product-detail-stock.out-of-stock {
                    color: #ef4444;
                }
                .product-detail-actions {
                    display: flex;
                    gap: 1rem;
                }
                .btn.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                @media (max-width: 768px) {
                    .product-detail {
                        grid-template-columns: 1fr;
                    }
                    .product-detail-actions {
                        flex-direction: column;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        modal.classList.add('active');
    }

    // Close modal
    closeModal() {
        document.getElementById('productModal').classList.remove('active');
    }

    // Attach event listeners to products
    attachProductEventListeners() {
        // Event delegation is used in the HTML onclick attributes
    }

    // Change page
    changePage(direction) {
        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        const newPage = this.currentPage + direction;
        
        if (newPage >= 1 && newPage <= totalPages) {
            this.currentPage = newPage;
            this.render();
            this.updatePagination();
            
            // Scroll to top of products
            document.getElementById('productsGrid').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Update pagination
    updatePagination() {
        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        const paginationInfo = document.getElementById('paginationInfo');
        
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;
        
        paginationInfo.textContent = `Page ${this.currentPage} of ${totalPages || 1}`;
    }

    // Show/hide loading state
    showLoading(show) {
        const loadingState = document.getElementById('loadingState');
        const productsGrid = document.getElementById('productsGrid');
        const noResults = document.getElementById('noResults');
        
        if (show) {
            loadingState.style.display = 'block';
            productsGrid.style.display = 'none';
            noResults.style.display = 'none';
        } else {
            loadingState.style.display = 'none';
        }
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize the Products App when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.productsApp = new ProductsApp();
    
    console.log('Products App initialized successfully! 🛍️');
});