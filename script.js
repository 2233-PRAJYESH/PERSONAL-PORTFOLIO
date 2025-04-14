const body = document.body;
const themeToggles = document.querySelectorAll('.theme-toggle');
const stars = document.querySelector('.stars');

// Check local storage for theme or set dark theme as default
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'dark' || !savedTheme) {
    body.classList.add('dark-theme');
    themeToggles.forEach(toggle => {
        const icon = toggle.querySelector('i');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    });
    createStars();
}

// Initialize theme if this is the first visit
if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
}

// Theme toggle event listeners
themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        
        const isDark = body.classList.contains('dark-theme');
        
        // Update theme icons
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (isDark) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                createStars();
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});

// Create stars for dark theme
function createStars() {
    stars.innerHTML = '';
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        stars.appendChild(star);
    }
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const closeNav = document.querySelector('.close-nav');
const overlay = document.querySelector('.overlay');
const mobileLinks = document.querySelectorAll('.mobile-links li a');

hamburger.addEventListener('click', () => {
    mobileNav.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function closeNavMenu() {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

closeNav.addEventListener('click', closeNavMenu);
overlay.addEventListener('click', closeNavMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!link.parentElement.querySelector('.theme-toggle')) {
            closeNavMenu();
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Floating icons animation
const icons = document.querySelectorAll('.floating-icons .icon');

icons.forEach(icon => {
    // Random animation duration and delay
    const duration = Math.random() * 3 + 3; // 3-6 seconds
    const delay = Math.random() * 2; // 0-2 seconds
    
    icon.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
});

// Sparkle effect on click
document.addEventListener('click', (e) => {
    if (e.target.closest('.theme-toggle, .hamburger, .close-nav, a, button')) return;
    
    createSparkles(e.clientX, e.clientY);
});

function createSparkles(x, y) {
    const numberOfSparkles = 8;
    
    for (let i = 0; i < numberOfSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Position around the click point
        const angle = (i / numberOfSparkles) * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        
        sparkle.style.left = `${x + Math.cos(angle) * distance}px`;
        sparkle.style.top = `${y + Math.sin(angle) * distance}px`;
        
        // Random colors for sparkles
        const colors = ['#FFD700', '#E056FD', '#8A2BE2', '#4A0080', '#FF6B6B'];
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation completes
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        gsap.to(bar, {
            width: `${width}%`,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: bar,
                start: "top 80%",
                once: true
            }
        });
    });
    
    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                once: true
            }
        });
    });
    
    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true
            }
        });
    });
    
    // Animate contact items
    gsap.utils.toArray('.contact-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            x: -50,
            duration: 0.5,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true
            }
        });
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-text').forEach((text, index) => {
        text.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(text);
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
const thanksModal = document.getElementById('thanksModal');
const modalBtn = document.querySelector('.modal-btn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here we would normally submit the form data to a server
    // For this prototype, we're just showing the thank you modal
    
    thanksModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset form
    contactForm.reset();
    
    // Create success sparkles
    const rect = thanksModal.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createSparkles(centerX, centerY);
        }, i * 300);
    }
});

modalBtn.addEventListener('click', () => {
    thanksModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});