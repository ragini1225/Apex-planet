// Main JavaScript functionality

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeLoadingScreen();
    initializeScrollEffects();
    initializePortfolio();
    initializeCounters();
    initializeFAQ();
    initializeContactForm();
    initializeBackToTop();
    initializeLazyLoading();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    });

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Loading screen
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
                
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 1000);
        });
    }
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('#services') || document.querySelector('section:nth-of-type(2)');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Text reveal animation
    const textRevealElements = document.querySelectorAll('.text-reveal');
    textRevealElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });

    // Parallax effect for hero video
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroVideo.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Portfolio functionality
function initializePortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.getElementById('portfolio-grid');

    // Filter functionality
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        }, 200);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Portfolio item hover effects
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Counter animation
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const countUp = (element, target) => {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                countUp(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const faqAnswer = faq.querySelector('.faq-answer');
                    if (faqAnswer) {
                        faqAnswer.style.maxHeight = '0';
                    }
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            const errors = validateForm(data);
            
            if (Object.keys(errors).length === 0) {
                // Show loading state
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.classList.add('loading');
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    this.style.display = 'none';
                    if (formSuccess) {
                        formSuccess.classList.add('show');
                    }
                    
                    // Show success message
                    showNotification('Message sent successfully!', 'success');
                }, 2000);
            } else {
                // Show errors
                displayFormErrors(errors);
            }
        });
        
        // Real-time validation
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Form validation
function validateForm(data) {
    const errors = {};
    
    if (!data.firstName || data.firstName.trim().length < 2) {
        errors.firstName = 'First name must be at least 2 characters long';
    }
    
    if (!data.lastName || data.lastName.trim().length < 2) {
        errors.lastName = 'Last name must be at least 2 characters long';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (data.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/\s/g, ''))) {
        errors.phone = 'Please enter a valid phone number';
    }
    
    if (!data.service) {
        errors.service = 'Please select a service';
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long';
    }
    
    return errors;
}

function validateField(field) {
    const data = { [field.name]: field.value };
    const errors = validateForm(data);
    
    if (errors[field.name]) {
        showFieldError(field, errors[field.name]);
    } else {
        clearFieldError(field);
    }
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    field.style.borderColor = 'var(--error-color)';
}

function clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    field.style.borderColor = 'var(--gray-200)';
}

function displayFormErrors(errors) {
    Object.keys(errors).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            showFieldError(field, errors[fieldName]);
        }
    });
}

// Reset contact form
function resetForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm && formSuccess) {
        contactForm.style.display = 'block';
        formSuccess.classList.remove('show');
        contactForm.reset();
        
        // Clear all errors
        const errorElements = contactForm.querySelectorAll('.form-error');
        errorElements.forEach(error => error.classList.remove('show'));
        
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.style.borderColor = 'var(--gray-200)';
        });
    }
}

// Back to top functionality
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1)';
                });
                
                img.style.opacity = '0';
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'all 0.6s ease-out';
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Portfolio modal functionality
function openModal(id) {
    const modal = document.getElementById('portfolio-modal');
    const modalBody = document.getElementById('modal-body');
    
    const portfolioData = {
        1: {
            title: 'E-commerce Platform',
            description: 'A modern, responsive e-commerce platform built with cutting-edge technology.',
            image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            features: ['Responsive Design', 'Payment Integration', 'Inventory Management', 'Admin Dashboard'],
            liveUrl: '#',
            githubUrl: '#'
        },
        2: {
            title: 'Social Media App',
            description: 'A feature-rich social media application for connecting and sharing moments.',
            image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800',
            technologies: ['React Native', 'Firebase', 'Redux', 'Socket.io'],
            features: ['Real-time Chat', 'Photo Sharing', 'Push Notifications', 'User Profiles'],
            liveUrl: '#',
            githubUrl: '#'
        },
        3: {
            title: 'Brand Identity Design',
            description: 'Complete visual identity package including logo, brand guidelines, and marketing materials.',
            image: 'https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg?auto=compress&cs=tinysrgb&w=800',
            technologies: ['Adobe Creative Suite', 'Figma', 'Brand Strategy'],
            features: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Digital Assets'],
            liveUrl: '#',
            githubUrl: '#'
        },
        4: {
            title: 'Corporate Website',
            description: 'Professional business website with modern design and advanced functionality.',
            image: 'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=800',
            technologies: ['Vue.js', 'Nuxt.js', 'Headless CMS', 'GSAP'],
            features: ['CMS Integration', 'SEO Optimized', 'Multi-language', 'Analytics'],
            liveUrl: '#',
            githubUrl: '#'
        },
        5: {
            title: 'Fitness Tracker App',
            description: 'Comprehensive fitness tracking application for health and wellness monitoring.',
            image: 'https://images.pexels.com/photos/4050290/pexels-photo-4050290.jpeg?auto=compress&cs=tinysrgb&w=800',
            technologies: ['Flutter', 'Firebase', 'HealthKit', 'Charts.js'],
            features: ['Workout Tracking', 'Progress Analytics', 'Social Features', 'Wearable Integration'],
            liveUrl: '#',
            githubUrl: '#'
        },
        6: {
            title: 'Restaurant Website',
            description: 'Elegant restaurant website with online ordering and reservation system.',
            image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
            technologies: ['WordPress', 'WooCommerce', 'Custom PHP', 'MySQL'],
            features: ['Online Ordering', 'Reservation System', 'Menu Management', 'Payment Gateway'],
            liveUrl: '#',
            githubUrl: '#'
        }
    };
    
    const project = portfolioData[id];
    
    if (project && modal && modalBody) {
        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-bottom: 24px;">
            <h2 style="font-size: 2rem; font-weight: 700; color: var(--gray-900); margin-bottom: 16px;">${project.title}</h2>
            <p style="color: var(--gray-600); margin-bottom: 24px; line-height: 1.7;">${project.description}</p>
            
            <div style="margin-bottom: 24px;">
                <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--gray-900); margin-bottom: 12px;">Technologies Used</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${project.technologies.map(tech => `<span style="background-color: var(--primary-color); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.875rem;">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 24px;">
                <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--gray-900); margin-bottom: 12px;">Key Features</h3>
                <ul style="list-style-position: inside; color: var(--gray-600);">
                    ${project.features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div style="display: flex; gap: 16px; margin-top: 24px;">
                <a href="${project.liveUrl}" style="background: linear-gradient(135deg, var(--primary-color), var(--primary-light)); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; transition: transform 0.2s;" 
                   onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    View Live Site
                </a>
                <a href="${project.githubUrl}" style="background-color: var(--gray-800); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; transition: transform 0.2s;"
                   onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    View Code
                </a>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal functionality
document.addEventListener('click', function(e) {
    const modal = document.getElementById('portfolio-modal');
    
    if (e.target.classList.contains('close-modal') || e.target.classList.contains('modal')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Video functionality
function playIntroVideo() {
    showNotification('Video player would open here', 'info');
}

function playAboutVideo() {
    showNotification('About video would play here', 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--primary-color)'};
        color: white;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization
window.addEventListener('scroll', throttle(function() {
    // Throttled scroll events for better performance
}, 16));

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Focus management for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Initialize focus trapping for modals
document.addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show', () => trapFocus(modal));
    });
});