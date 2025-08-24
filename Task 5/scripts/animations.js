// Advanced Animation Controller

class AnimationController {
    constructor() {
        this.observers = [];
        this.animatedElements = new Set();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }

    init() {
        if (this.isReducedMotion) {
            this.disableAnimations();
            return;
        }

        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupParallaxEffects();
        this.setupTextAnimations();
        this.setupCounterAnimations();
        this.setupProgressBars();
        this.setupParticleSystem();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0.1, 0.25, 0.5, 0.75],
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.triggerAnimation(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const elements = document.querySelectorAll('[data-aos], .animate-on-scroll');
        elements.forEach(el => observer.observe(el));

        this.observers.push(observer);
    }

    triggerAnimation(element) {
        const animationType = element.getAttribute('data-aos') || element.classList.value;
        const delay = parseInt(element.getAttribute('data-delay')) || 0;
        const duration = parseInt(element.getAttribute('data-duration')) || 600;

        setTimeout(() => {
            element.classList.add('aos-animate');
            this.addCustomAnimation(element, animationType);
        }, delay);
    }

    addCustomAnimation(element, type) {
        switch(type) {
            case 'fade-up-scale':
                this.animateFadeUpScale(element);
                break;
            case 'slide-rotate':
                this.animateSlideRotate(element);
                break;
            case 'bounce-in':
                this.animateBounceIn(element);
                break;
            case 'elastic-scale':
                this.animateElasticScale(element);
                break;
            default:
                // Standard AOS animation
                break;
        }
    }

    animateFadeUpScale(element) {
        element.style.animation = 'fadeUpScale 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
    }

    animateSlideRotate(element) {
        element.style.animation = 'slideRotate 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
    }

    animateBounceIn(element) {
        element.style.animation = 'bounceIn 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
    }

    animateElasticScale(element) {
        element.style.animation = 'elasticScale 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
    }

    setupScrollAnimations() {
        let ticking = false;

        const updateScrollAnimations = () => {
            const scrolled = window.pageYOffset;
            const vh = window.innerHeight;

            // Parallax backgrounds
            const parallaxElements = document.querySelectorAll('.parallax-bg');
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            // Floating elements
            const floatingElements = document.querySelectorAll('.float-on-scroll');
            floatingElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + window.pageYOffset;
                const elementHeight = rect.height;
                const windowHeight = window.innerHeight;

                if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
                    const progress = (scrolled + windowHeight - elementTop) / (windowHeight + elementHeight);
                    const moveY = Math.sin(progress * Math.PI * 2 + index) * 10;
                    element.style.transform = `translateY(${moveY}px)`;
                }
            });

            // Scale on scroll
            const scaleElements = document.querySelectorAll('.scale-on-scroll');
            scaleElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top;
                const elementHeight = rect.height;
                
                if (elementTop < vh && elementTop > -elementHeight) {
                    const progress = 1 - Math.abs(elementTop - vh / 2) / (vh / 2);
                    const scale = 0.8 + (progress * 0.2);
                    element.style.transform = `scale(${scale})`;
                    element.style.opacity = progress;
                }
            });

            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate);
    }

    setupHoverAnimations() {
        // Magnetic effect
        const magneticElements = document.querySelectorAll('.magnetic');
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const strength = 0.3;
                element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0px, 0px)';
            });
        });

        // Tilt effect
        const tiltElements = document.querySelectorAll('.tilt-effect');
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                
                const rotateX = (mouseY / rect.height) * 20;
                const rotateY = (mouseX / rect.width) * -20;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    setupParallaxEffects() {
        // Advanced parallax layers
        const parallaxContainers = document.querySelectorAll('.parallax-container');
        
        parallaxContainers.forEach(container => {
            const layers = container.querySelectorAll('.parallax-layer');
            
            const updateParallax = () => {
                const scrollTop = window.pageYOffset;
                const containerTop = container.offsetTop;
                const containerHeight = container.offsetHeight;
                const windowHeight = window.innerHeight;
                
                // Check if container is in viewport
                if (scrollTop + windowHeight > containerTop && scrollTop < containerTop + containerHeight) {
                    layers.forEach(layer => {
                        const speed = parseFloat(layer.getAttribute('data-speed')) || 1;
                        const yPos = (scrollTop - containerTop) * speed;
                        layer.style.transform = `translateY(${yPos}px)`;
                    });
                }
            };

            let ticking = false;
            const requestParallaxUpdate = () => {
                if (!ticking) {
                    requestAnimationFrame(updateParallax);
                    ticking = true;
                    setTimeout(() => ticking = false, 16);
                }
            };

            window.addEventListener('scroll', requestParallaxUpdate);
        });
    }

    setupTextAnimations() {
        // Typewriter effect
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        
        typewriterElements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.startTypewriter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(element);
        });

        // Scramble text effect
        const scrambleElements = document.querySelectorAll('.scramble-text');
        scrambleElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.scrambleText(element);
            });
        });

        // Split text animation
        this.setupSplitText();
    }

    startTypewriter(element) {
        const text = element.textContent;
        const speed = parseInt(element.getAttribute('data-speed')) || 50;
        element.textContent = '';
        element.style.borderRight = '2px solid';
        
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing is done
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        };
        type();
    }

    scrambleText(element) {
        const originalText = element.textContent;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let iteration = 0;
        
        const scramble = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join('');
                
            if (iteration >= originalText.length) {
                clearInterval(scramble);
            }
            
            iteration += 1 / 3;
        }, 30);
    }

    setupSplitText() {
        const splitTextElements = document.querySelectorAll('.split-text');
        
        splitTextElements.forEach(element => {
            const text = element.textContent;
            const words = text.split(' ');
            
            element.innerHTML = words.map((word, wordIndex) => {
                const letters = word.split('');
                return `<span class="word" style="display: inline-block; overflow: hidden;">
                    ${letters.map((letter, letterIndex) => 
                        `<span class="letter" style="display: inline-block; transform: translateY(100%); transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); transition-delay: ${(wordIndex * 0.1) + (letterIndex * 0.05)}s;">${letter}</span>`
                    ).join('')}
                    ${wordIndex < words.length - 1 ? '<span>&nbsp;</span>' : ''}
                </span>`;
            }).join('');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const letters = entry.target.querySelectorAll('.letter');
                        letters.forEach(letter => {
                            letter.style.transform = 'translateY(0%)';
                        });
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(element);
        });
    }

    setupCounterAnimations() {
        const counterElements = document.querySelectorAll('.animated-counter');
        
        counterElements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(element);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target')) || parseInt(element.textContent);
        const duration = parseInt(element.getAttribute('data-duration')) || 2000;
        const startTime = Date.now();
        const startValue = 0;
        
        const updateCounter = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutCubic);
            
            element.textContent = this.formatNumber(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = this.formatNumber(target);
            }
        };
        
        updateCounter();
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(progressBar => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const fill = entry.target.querySelector('.progress-fill');
                        const percentage = entry.target.getAttribute('data-percentage') || 100;
                        
                        if (fill) {
                            setTimeout(() => {
                                fill.style.width = percentage + '%';
                            }, 200);
                        }
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(progressBar);
        });
    }

    setupParticleSystem() {
        const particleContainers = document.querySelectorAll('.particles-container');
        
        particleContainers.forEach(container => {
            this.createParticles(container);
        });
    }

    createParticles(container) {
        const particleCount = parseInt(container.getAttribute('data-particle-count')) || 50;
        const particleColor = container.getAttribute('data-particle-color') || '#3B82F6';
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background-color: ${particleColor};
                border-radius: 50%;
                opacity: ${Math.random() * 0.8 + 0.2};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: floatParticle ${Math.random() * 10 + 10}s infinite linear;
                animation-delay: ${Math.random() * 10}s;
            `;
            container.appendChild(particle);
        }
    }

    disableAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
            
            [data-aos] {
                opacity: 1 !important;
                transform: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Public methods for manual control
    refreshAnimations() {
        this.animatedElements.clear();
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.setupIntersectionObserver();
    }

    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }

    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        this.animatedElements.clear();
    }
}

// Add custom keyframes
const customKeyframes = document.createElement('style');
customKeyframes.textContent = `
    @keyframes fadeUpScale {
        0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes slideRotate {
        0% {
            opacity: 0;
            transform: translateX(-50px) rotate(-10deg);
        }
        100% {
            opacity: 1;
            transform: translateX(0) rotate(0deg);
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes elasticScale {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.2);
        }
        75% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes morphShape {
        0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        }
        50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
        }
    }
    
    @keyframes gradientShift {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    
    @keyframes textGlow {
        0%, 100% {
            text-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color);
        }
        50% {
            text-shadow: 0 0 20px var(--primary-light), 0 0 30px var(--primary-light), 0 0 40px var(--primary-light);
        }
    }
    
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(customKeyframes);

// Initialize animation controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// Additional utility functions for animations
class AnimationUtils {
    static createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            animation: ripple 0.6s linear;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }
    
    static morphElement(element, fromShape, toShape, duration = 1000) {
        let start = null;
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            
            // Interpolate between shapes
            const current = this.interpolateShape(fromShape, toShape, progress);
            element.style.clipPath = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    static interpolateShape(from, to, progress) {
        // Simple shape interpolation - can be expanded for complex shapes
        return `polygon(${from.map((point, i) => {
            const toPoint = to[i];
            const x = point.x + (toPoint.x - point.x) * progress;
            const y = point.y + (toPoint.y - point.y) * progress;
            return `${x}% ${y}%`;
        }).join(', ')})`;
    }
    
    static staggerElements(elements, animation, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animation);
            }, index * delay);
        });
    }
    
    static createTrail(element, trailColor = '#3B82F6') {
        let trail = [];
        const maxTrailLength = 10;
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            trail.push({ x, y, age: 0 });
            
            if (trail.length > maxTrailLength) {
                trail.shift();
            }
            
            // Update trail
            trail.forEach((point, index) => {
                point.age++;
                const opacity = 1 - (point.age / maxTrailLength);
                
                const dot = document.createElement('div');
                dot.style.cssText = `
                    position: absolute;
                    left: ${point.x}px;
                    top: ${point.y}px;
                    width: 4px;
                    height: 4px;
                    background: ${trailColor};
                    border-radius: 50%;
                    opacity: ${opacity};
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                element.appendChild(dot);
                
                setTimeout(() => {
                    if (dot.parentNode) {
                        dot.parentNode.removeChild(dot);
                    }
                }, 300);
            });
        });
    }
}

// Expose utilities globally
window.AnimationUtils = AnimationUtils;