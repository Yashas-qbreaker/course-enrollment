// Premium Tech Internships - JavaScript Functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupIntersectionObserver();
    setupCardInteractions();
    setupSmoothScrolling();
});

// Smooth scroll to programs section
function scrollToPrograms() {
    const programsSection = document.getElementById('programs');
    if (programsSection) {
        programsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle internship card details view
function viewDetails(type) {
    // Create a detailed view or navigate to details page
    console.log(`Viewing details for ${type} internship`);
    
    // Example: Show a modal or navigate to a details page
    showInternshipDetails(type);
}

// Show internship details in a modal-like overlay
function showInternshipDetails(type) {
    // Define internship data
    const internshipData = {
        web: {
            title: 'Web Development Internship Program',
            icon: '🌐',
            description: 'Master modern web development with React, TypeScript, and cutting-edge frameworks. Build responsive, user-friendly applications that scale.',
            skills: ['React.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Git/GitHub'],
            requirements: ['Basic HTML/CSS knowledge', 'JavaScript fundamentals', 'Problem-solving skills'],
            benefits: ['Live project experience', 'Mentorship from industry experts', 'Certificate of completion', 'Job placement assistance']
        },
        app: {
            title: 'App Development Internship Program',
            icon: '📱',
            description: 'Create native and cross-platform mobile applications using React Native and Flutter. Learn to build apps that millions of users love.',
            skills: ['React Native', 'Flutter', 'Mobile UI/UX', 'API Integration', 'App Store Deployment'],
            requirements: ['Basic programming knowledge', 'Understanding of mobile platforms', 'Creative thinking'],
            benefits: ['Real app development', 'Portfolio projects', 'Industry networking', 'Career guidance']
        },
        python: {
            title: 'Python Programming Internship Program',
            icon: '🐍',
            description: 'Dive deep into Python programming for web development, data science, and automation. Master one of the most versatile programming languages.',
            skills: ['Python', 'Django/Flask', 'Data Analysis', 'API Development', 'Database Management'],
            requirements: ['Basic programming concepts', 'Logical thinking', 'Mathematics fundamentals'],
            benefits: ['Hands-on projects', 'Data science exposure', 'Automation skills', 'Open-source contributions']
        },
        java: {
            title: 'Java Programming Internship Program',
            icon: '☕',
            description: 'Build enterprise-grade applications with Java. Learn object-oriented programming, Spring framework, and scalable system design.',
            skills: ['Java', 'Spring Boot', 'Object-Oriented Programming', 'Database Design', 'System Architecture'],
            requirements: ['Programming basics', 'Object-oriented concepts', 'Problem-solving mindset'],
            benefits: ['Enterprise experience', 'System design skills', 'Technical interviews prep', 'Industry connections']
        }
    };

    const data = internshipData[type];
    if (!data) return;

    // Create modal overlay
    const modal = createModal(data);
    document.body.appendChild(modal);
    
    // Trigger modal animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Create modal element
function createModal(data) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-icon">${data.icon}</div>
                <h2 class="modal-title">${data.title}</h2>
                <button class="modal-close" onclick="closeModal(this)">✕</button>
            </div>
            
            <div class="modal-body">
                <p class="modal-description">${data.description}</p>
                
                <div class="modal-section">
                    <h3>Skills You'll Learn</h3>
                    <ul class="skills-list">
                        ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>Requirements</h3>
                    <ul class="requirements-list">
                        ${data.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>Program Benefits</h3>
                    <ul class="benefits-list">
                        ${data.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="applyNow('${data.title}')">
                        Apply Now
                    </button>
                    <button class="btn btn-secondary" onclick="closeModal(this)">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

// Close modal
function closeModal(element) {
    const modal = element.closest('.modal-overlay');
    modal.classList.add('closing');
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// Handle apply now action
function applyNow(programTitle) {
    alert(`Thanks for your interest in ${programTitle}! Redirecting to application form...`);
    // Here you would typically redirect to an application form or open a contact form
}

// Initialize card animations
function initializeAnimations() {
    const cards = document.querySelectorAll('.internship-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Setup intersection observer for scroll animations
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all cards and sections
    const elements = document.querySelectorAll('.internship-card, .section-title, .section-subtitle');
    elements.forEach(el => observer.observe(el));
}

// Setup card interactions
function setupCardInteractions() {
    const cards = document.querySelectorAll('.internship-card');
    
    cards.forEach(card => {
        // Add click handler
        card.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            viewDetails(type);
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const type = this.getAttribute('data-type');
                viewDetails(type);
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${card.querySelector('.card-title').textContent}`);
    });
}

// Setup smooth scrolling for all anchor links
function setupSmoothScrolling() {
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
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add modal styles dynamically
function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: hsla(240, 10%, 3.9%, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            padding: 1rem;
        }
        
        .modal-overlay.show {
            opacity: 1;
        }
        
        .modal-overlay.closing {
            opacity: 0;
        }
        
        .modal-content {
            background: var(--gradient-card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            transform: translateY(20px) scale(0.95);
            transition: transform 0.3s ease;
        }
        
        .modal-overlay.show .modal-content {
            transform: translateY(0) scale(1);
        }
        
        .modal-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.5rem;
            border-bottom: 1px solid var(--border);
        }
        
        .modal-icon {
            font-size: 2rem;
        }
        
        .modal-title {
            font-size: 1.5rem;
            font-weight: 700;
            flex: 1;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: var(--muted-foreground);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.375rem;
            transition: var(--transition-smooth);
        }
        
        .modal-close:hover {
            background: var(--muted);
            color: var(--foreground);
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .modal-description {
            color: var(--muted-foreground);
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .modal-section {
            margin-bottom: 2rem;
        }
        
        .modal-section h3 {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: var(--primary);
        }
        
        .modal-section ul {
            list-style: none;
            padding: 0;
        }
        
        .modal-section li {
            padding: 0.5rem 0;
            color: var(--muted-foreground);
            border-bottom: 1px solid var(--border);
        }
        
        .modal-section li:last-child {
            border-bottom: none;
        }
        
        .modal-section li::before {
            content: '✓';
            color: var(--primary);
            margin-right: 0.5rem;
            font-weight: bold;
        }
        
        .modal-footer {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }
        
        @media (max-width: 768px) {
            .modal-content {
                margin: 1rem;
                max-height: calc(100vh - 2rem);
            }
            
            .modal-footer {
                flex-direction: column;
            }
            
            .modal-footer .btn {
                width: 100%;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Add event listeners for enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
    addModalStyles();
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .card-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Create ripple effect on button click
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: hsla(0, 0%, 100%, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn, .card-btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyles);

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // ESC key to close modal
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            closeModal(modal.querySelector('.modal-close'));
        }
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('internship-card')) {
            focusedElement.style.outline = '2px solid var(--primary)';
            focusedElement.style.outlineOffset = '2px';
        }
    }
});

// Enhanced card animations on scroll
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for cards
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const elements = document.querySelectorAll('.internship-card, .section-title, .section-subtitle');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Setup card interactions and hover effects
function setupCardInteractions() {
    const cards = document.querySelectorAll('.internship-card');
    
    cards.forEach(card => {
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-card-hover)';
            
            // Animate card button
            const btn = this.querySelector('.card-btn');
            if (btn) {
                btn.style.animation = 'glow 1.5s ease-in-out infinite alternate';
            }
            
            // Animate decoration
            const decoration = this.querySelector('.card-decoration');
            if (decoration) {
                decoration.style.transform = 'scale(1.1)';
                decoration.style.opacity = '0.2';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            // Reset card button animation
            const btn = this.querySelector('.card-btn');
            if (btn) {
                btn.style.animation = '';
            }
            
            // Reset decoration
            const decoration = this.querySelector('.card-decoration');
            if (decoration) {
                decoration.style.transform = '';
                decoration.style.opacity = '';
            }
        });
        
        // Add focus effects
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary)';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Add loading animation for page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const hero = document.querySelector('.hero .container');
    if (hero) {
        hero.style.animation = 'fadeInUp 1s ease-out';
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Throttled scroll handler
const handleScroll = throttle(function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}, 16); // ~60fps

window.addEventListener('scroll', handleScroll);

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add cursor trail effect (optional enhancement)
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Create floating particles (subtle effect)
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.3;
            animation: float-particle 3s ease-out forwards;
            left: ${mouseX}px;
            top: ${mouseY}px;
            z-index: 1;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
    
    // Add particle animation CSS
    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        @keyframes float-particle {
            to {
                transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyles);
    
    // Create particles on card hover (sparingly)
    let particleInterval;
    const cards = document.querySelectorAll('.internship-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            particleInterval = setInterval(createParticle, 200);
        });
        
        card.addEventListener('mouseleave', function() {
            clearInterval(particleInterval);
        });
    });
});

// Export functions for global access
window.scrollToPrograms = scrollToPrograms;
window.viewDetails = viewDetails;
window.closeModal = closeModal;
window.applyNow = applyNow;