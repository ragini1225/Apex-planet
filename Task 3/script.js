// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// CTA Button scroll to carousel
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#carousel').scrollIntoView({
        behavior: 'smooth'
    });
});

// Image Carousel
class ImageCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        this.init();
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Auto-play carousel
        setInterval(() => this.nextSlide(), 5000);
        
        // Touch support
        this.addTouchSupport();
    }
    
    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.showSlide(this.currentSlide);
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        const carousel = document.querySelector('.carousel-wrapper');
        
        carousel.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', e => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
    }
    
    handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
}

// Interactive Quiz
class InteractiveQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.questions = [
            {
                question: "What does HTML stand for?",
                options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
                correct: 0
            },
            {
                question: "Which CSS property is used to change the text color?",
                options: ["font-color", "text-color", "color", "foreground-color"],
                correct: 2
            },
            {
                question: "What is the purpose of JavaScript?",
                options: ["Styling web pages", "Creating databases", "Adding interactivity to websites", "Managing server operations"],
                correct: 2
            },
            {
                question: "Which HTML tag is used to create a hyperlink?",
                options: ["<link>", "<href>", "<a>", "<url>"],
                correct: 2
            },
            {
                question: "What does API stand for?",
                options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Program Interaction", "Application Process Integration"],
                correct: 0
            }
        ];
        
        this.init();
    }
    
    init() {
        this.loadQuestion();
        
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartQuiz());
    }
    
    loadQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('quiz-options');
        const counterElement = document.getElementById('question-counter');
        const progressElement = document.getElementById('progress');
        
        questionElement.textContent = question.question;
        counterElement.textContent = `${this.currentQuestion + 1} / ${this.questions.length}`;
        
        const progressPercent = ((this.currentQuestion + 1) / this.questions.length) * 100;
        progressElement.style.width = `${progressPercent}%`;
        
        optionsElement.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.addEventListener('click', () => this.selectOption(index, button));
            optionsElement.appendChild(button);
        });
        
        document.getElementById('next-btn').disabled = true;
    }
    
    selectOption(selectedIndex, selectedButton) {
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.option-btn');
        
        // Disable all options
        options.forEach(option => option.disabled = true);
        
        // Show correct/incorrect
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex) {
                option.classList.add('incorrect');
            }
        });
        
        if (selectedIndex === question.correct) {
            this.score++;
        }
        
        this.updateScore();
        document.getElementById('next-btn').disabled = false;
    }
    
    updateScore() {
        document.getElementById('score').textContent = `Score: ${this.score}`;
    }
    
    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion < this.questions.length) {
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }
    
    showResults() {
        const quizContent = document.querySelector('.quiz-content');
        const quizControls = document.querySelector('.quiz-controls');
        const quizResults = document.getElementById('quiz-results');
        const finalScore = document.getElementById('final-score');
        const scoreBadge = document.getElementById('score-badge');
        
        quizContent.style.display = 'none';
        quizControls.style.display = 'none';
        quizResults.style.display = 'block';
        
        const percentage = (this.score / this.questions.length) * 100;
        finalScore.textContent = `You scored ${this.score} out of ${this.questions.length} questions (${percentage.toFixed(0)}%)`;
        
        scoreBadge.textContent = `${percentage.toFixed(0)}%`;
        
        if (percentage >= 80) {
            scoreBadge.className = 'score-badge excellent';
        } else if (percentage >= 60) {
            scoreBadge.className = 'score-badge good';
        } else if (percentage >= 40) {
            scoreBadge.className = 'score-badge average';
        } else {
            scoreBadge.className = 'score-badge poor';
        }
        
        document.getElementById('restart-btn').style.display = 'inline-block';
    }
    
    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        
        const quizContent = document.querySelector('.quiz-content');
        const quizControls = document.querySelector('.quiz-controls');
        const quizResults = document.getElementById('quiz-results');
        
        quizContent.style.display = 'block';
        quizControls.style.display = 'flex';
        quizResults.style.display = 'none';
        document.getElementById('restart-btn').style.display = 'none';
        
        this.updateScore();
        this.loadQuestion();
    }
}

// API Integration
class APIManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.loadWeather();
        this.loadJoke();
        this.loadQuote();
        
        document.getElementById('refresh-weather').addEventListener('click', () => this.loadWeather());
        document.getElementById('new-joke').addEventListener('click', () => this.loadJoke());
        document.getElementById('new-quote').addEventListener('click', () => this.loadQuote());
    }
    
    async loadWeather() {
        const weatherContent = document.getElementById('weather-content');
        weatherContent.innerHTML = '<div class="loading">Loading weather data...</div>';
        
        try {
            // Using a mock weather API response for demo
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
            
            const mockWeatherData = {
                location: "New York",
                temperature: Math.floor(Math.random() * 30) + 5,
                description: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][Math.floor(Math.random() * 4)],
                humidity: Math.floor(Math.random() * 40) + 40,
                windSpeed: Math.floor(Math.random() * 20) + 5
            };
            
            weatherContent.innerHTML = `
                <div class="weather-info">
                    <div class="weather-temp">${mockWeatherData.temperature}°C</div>
                    <div class="weather-details">
                        <h4>${mockWeatherData.location}</h4>
                        <p>${mockWeatherData.description}</p>
                        <div class="weather-meta">
                            <p>Humidity: ${mockWeatherData.humidity}%</p>
                            <p>Wind: ${mockWeatherData.windSpeed} km/h</p>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            weatherContent.innerHTML = '<div class="error">Failed to load weather data</div>';
        }
    }
    
    async loadJoke() {
        const jokeContent = document.getElementById('joke-content');
        jokeContent.innerHTML = '<div class="loading">Loading a joke...</div>';
        
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const joke = await response.json();
            
            jokeContent.innerHTML = `
                <p><strong>${joke.setup}</strong></p>
                <p><em>${joke.punchline}</em></p>
            `;
        } catch (error) {
            // Fallback jokes
            const fallbackJokes = [
                { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
                { setup: "Why did the developer go broke?", punchline: "Because he used up all his cache!" },
                { setup: "How do you comfort a JavaScript bug?", punchline: "You console it!" }
            ];
            
            const randomJoke = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
            jokeContent.innerHTML = `
                <p><strong>${randomJoke.setup}</strong></p>
                <p><em>${randomJoke.punchline}</em></p>
            `;
        }
    }
    
    async loadQuote() {
        const quoteContent = document.getElementById('quote-content');
        quoteContent.innerHTML = '<div class="loading">Loading quote...</div>';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
            
            const quotes = [
                { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
                { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
                { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
                { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
                { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" }
            ];
            
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            
            quoteContent.innerHTML = `
                <blockquote>
                    <p>"${randomQuote.text}"</p>
                    <footer>— ${randomQuote.author}</footer>
                </blockquote>
            `;
        } catch (error) {
            quoteContent.innerHTML = '<div class="error">Failed to load quote</div>';
        }
    }
}

// Media Gallery
class MediaGallery {
    constructor() {
        this.init();
    }
    
    init() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update active tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === targetTab) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.api-card, .photo-item, .video-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-on-scroll');
        }
    });
}

// Navigation background on scroll
function updateNavOnScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageCarousel();
    new InteractiveQuiz();
    new APIManager();
    new MediaGallery();
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        animateOnScroll();
        updateNavOnScroll();
    });
    
    // Initial call for elements already in view
    animateOnScroll();
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});