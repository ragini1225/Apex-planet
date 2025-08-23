// JavaScript Fundamentals for Web Development Learning

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Web Development Learning Project Initialized!');
    
    // Initialize all interactive elements
    initializeButtons();
    initializeProgressTracker();
    initializeAnimations();
    initializeUIUXFeatures();
});

// Button Event Handlers
function initializeButtons() {
    // Welcome button - demonstrates basic event handling
    const welcomeBtn = document.getElementById('welcomeBtn');
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', function() {
            showToast('🎉 Welcome to your enhanced UI/UX Web Development journey! You\'ll master HTML, CSS, JavaScript, and modern design principles over the next 9 days!');
        });
    }
    
    // HTML Structure button
    const htmlBtn = document.getElementById('htmlBtn');
    if (htmlBtn) {
        htmlBtn.addEventListener('click', function() {
            showHTMLStructure();
        });
    }
    
    // CSS Magic button
    const cssBtn = document.getElementById('cssBtn');
    if (cssBtn) {
        cssBtn.addEventListener('click', function() {
            demonstrateCSSMagic();
        });
    }
    
    // Alert button - basic JavaScript alert
    const alertBtn = document.getElementById('alertBtn');
    if (alertBtn) {
        alertBtn.addEventListener('click', function() {
            showToast('🎯 Great! You triggered a user-friendly notification instead of a disruptive alert. This demonstrates better UX practices!');
        });
    }
    
    // Background color changer
    const changeColorBtn = document.getElementById('changeColorBtn');
    if (changeColorBtn) {
        changeColorBtn.addEventListener('click', function() {
            changeBackgroundColor();
        });
    }
    
    // Counter button - demonstrates variables and DOM manipulation
    const counterBtn = document.getElementById('counterBtn');
    let count = 0;
    if (counterBtn) {
        counterBtn.addEventListener('click', function() {
            count++;
            const counterSpan = document.getElementById('counter');
            if (counterSpan) {
                counterSpan.textContent = count;
                
                // Add visual feedback
                counterSpan.style.transform = 'scale(1.2)';
                counterSpan.style.color = '#059669';
                
                setTimeout(() => {
                    counterSpan.style.transform = 'scale(1)';
                    counterSpan.style.color = 'inherit';
                }, 200);
            }
            
            // Show achievement messages
            if (count === 5) {
                showToast('🌟 Great job! You\'ve clicked 5 times. Notice the smooth animations and visual feedback!');
            } else if (count === 10) {
                showToast('🏆 Amazing! 10 clicks completed. You\'re mastering JavaScript interactions with great UX!');
            }
        });
    }
    
    // Feedback button - demonstrates user feedback patterns
    const feedbackBtn = document.getElementById('feedbackBtn');
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', function() {
            showFeedbackDemo();
        });
    }
    
    // Progress update button
    const progressBtn = document.getElementById('progressBtn');
    if (progressBtn) {
        progressBtn.addEventListener('click', function() {
            updateProgress();
        });
    }
}

// HTML Structure demonstration
function showHTMLStructure() {
    const message = `
📋 HTML Structure Elements in this page:

• <header> - Contains the hero section
• <main> - Wraps the main content
• <section> - Groups related content
• <h1>, <h2>, <h3> - Heading hierarchy
• <p> - Paragraphs of text
• <img> - Images with alt attributes
• <a> - Links to external resources
• <button> - Interactive elements
• <ul>, <li> - Lists for organized content
• <footer> - Bottom page information

Each element has a specific semantic meaning that helps browsers, search engines, and assistive technologies understand your content!
    `;
    
    showToast('📋 HTML structure information displayed in console! Check the browser console for detailed breakdown.');
    console.log(message);
}

// CSS Magic demonstration
function demonstrateCSSMagic() {
    const cards = document.querySelectorAll('.content-card');
    const colors = ['#2563eb', '#7c3aed', '#059669', '#f59e0b', '#ef4444'];
    
    cards.forEach((card, index) => {
        // Create rainbow effect
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.borderColor = colors[index % colors.length];
            card.style.boxShadow = `0 10px 25px ${colors[index % colors.length]}20`;
            
            // Reset after animation
            setTimeout(() => {
                card.style.borderColor = '#e5e7eb';
                card.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            }, 1000);
        }, index * 200);
    });
    
    showToast('✨ CSS Magic activated! Notice the smooth transitions, color changes, and shadow effects - this is modern UI/UX design in action!');
}

// Background color changer
function changeBackgroundColor() {
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        '' // Reset to original
    ];
    
    const currentBg = document.body.style.background;
    let nextColorIndex = 0;
    
    // Find current color and select next
    for (let i = 0; i < colors.length; i++) {
        if (currentBg.includes(colors[i].split(' ')[2])) {
            nextColorIndex = (i + 1) % colors.length;
            break;
        }
    }
    
    document.body.style.background = colors[nextColorIndex];
    document.body.style.transition = 'background 0.8s ease';
    
    if (colors[nextColorIndex] === '') {
        document.body.style.backgroundColor = '#f9fafb';
        showToast('🎨 Background reset! This demonstrates dynamic theming - a key UX feature for personalization.');
    } else {
        showToast('🌈 Theme changed! Dynamic styling enhances user experience by providing visual variety and personalization options.');
    }
}

// Show feedback demo
function showFeedbackDemo() {
    const button = document.getElementById('feedbackBtn');
    const originalText = button.innerHTML;
    
    // Loading state
    button.innerHTML = '<span class="button-icon">⏳</span>Loading...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        // Success state
        button.innerHTML = '<span class="button-icon">✅</span>Success!';
        button.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--success-color');
        
        setTimeout(() => {
            // Reset
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.opacity = '1';
            button.style.backgroundColor = '';
            
            showToast('💬 You just experienced loading states and user feedback - essential UX patterns for any interactive application!');
        }, 1500);
    }, 2000);
}

// Progress tracker functionality
function initializeProgressTracker() {
    // Animate progress bars on page load
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 1000);
}

// Update progress simulation
function updateProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    const skills = ['HTML Mastery', 'CSS Skills', 'JavaScript Knowledge'];
    
    progressBars.forEach((bar, index) => {
        const currentWidth = parseInt(bar.style.width);
        const newWidth = Math.min(currentWidth + 10, 100);
        
        bar.style.width = newWidth + '%';
        
        if (newWidth === 100) {
            setTimeout(() => {
                showToast(`🎉 Congratulations! You've completed ${skills[index]}! Time to move on to the next challenge.`);
            }, 500);
        }
    });
    
    // Check if all skills are completed
    setTimeout(() => {
        const allCompleted = Array.from(progressBars).every(bar => 
            parseInt(bar.style.width) >= 100
        );
        
        if (allCompleted) {
            setTimeout(() => {
                showToast('🏆 AMAZING! You\'ve mastered web development fundamentals with modern UI/UX principles! You\'re ready to build incredible user experiences!');
            }, 1000);
        }
    }, 1000);
}

// Initialize smooth animations
function initializeAnimations() {
    // Add smooth scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe content cards for animation
    document.querySelectorAll('.content-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize UI/UX specific features
function initializeUIUXFeatures() {
    // Add tilt effect to showcase cards
    const showcaseCards = document.querySelectorAll('[data-tilt]');
    showcaseCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
    
    // Initialize micro-interaction demo
    const microBtn = document.getElementById('microBtn');
    if (microBtn) {
        microBtn.addEventListener('click', function() {
            showToast('⚡ Micro-interactions like this button ripple effect make interfaces feel responsive and alive!');
        });
    }
    
    // Add scroll-triggered animations
    initializeScrollAnimations();
    
    // Initialize accessibility features
    initializeAccessibility();
}

// Tilt effect for cards
function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
}

// Toast notification system
function showToast(message, duration = 4000) {
    const toast = document.getElementById('toast');
    const messageElement = toast.querySelector('.toast-message');
    
    messageElement.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for grid items
                if (entry.target.classList.contains('content-card') || entry.target.classList.contains('showcase-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.content-card, .showcase-card, .learning-section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Accessibility features
function initializeAccessibility() {
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add ARIA labels for better screen reader support
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && button.textContent) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
}

// Utility function for logging learning progress
function logLearningProgress(skill, action) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`📚 [${timestamp}] Learning Progress: ${skill} - ${action}`);
}

// Fun Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showToast('🎮 Konami Code activated! You found the secret Easter egg. This demonstrates advanced event handling and user delight through hidden features!');
        konamiCode = [];
        
        // Add special effect
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Add rainbow animation for Easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log(`
🌟 Welcome to Web Development Basics with UI/UX!
=================================================

You're looking at the browser's developer console - a powerful tool for debugging and learning!

Try these commands:
• document.querySelector('.hero-title').textContent = 'Custom Title!'
• document.body.style.backgroundColor = 'lightblue'
• showToast('Hello from the console!')

UI/UX Features you can explore:
• Hover over cards to see tilt effects
• Try the Konami Code: ↑↑↓↓←→←→BA
• Notice the smooth animations and transitions
• Check out the responsive design on different screen sizes

Happy coding and designing! 🚀✨
`);