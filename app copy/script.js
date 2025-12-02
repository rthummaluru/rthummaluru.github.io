// Smooth scroll behavior for anchor links
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

// Projects timeline interactivity
const projectsTimeline = document.getElementById('projectsTimeline');
const projectCards = document.querySelectorAll('.project-card');

// Add scroll event listener for parallax effect
let lastScrollLeft = 0;
projectsTimeline.parentElement.addEventListener('scroll', () => {
    const scrollLeft = projectsTimeline.parentElement.scrollLeft;
    const scrollDirection = scrollLeft > lastScrollLeft ? 'right' : 'left';
    lastScrollLeft = scrollLeft;
    
    // Add subtle parallax effect to cards
    projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.left < window.innerWidth && rect.right > 0;
        
        if (isVisible) {
            const offset = (rect.left - window.innerWidth / 2) / window.innerWidth;
            card.style.transform = `translateY(${offset * 10}px)`;
        }
    });
});

// Intersection Observer for fade-in animations
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

// Observe project cards for animation
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Add click interaction to project cards
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove active class from all cards
        projectCards.forEach(c => c.classList.remove('active'));
        // Add active class to clicked card
        this.classList.add('active');
        
        // Scroll card into view if needed
        this.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    });
});

// Keyboard navigation for projects timeline
document.addEventListener('keydown', (e) => {
    const container = projectsTimeline.parentElement;
    const scrollAmount = 400;
    
    if (e.key === 'ArrowLeft') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else if (e.key === 'ArrowRight') {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
});

// Hide scroll indicator after user starts scrolling
let hasScrolled = false;
projectsTimeline.parentElement.addEventListener('scroll', () => {
    if (!hasScrolled) {
        hasScrolled = true;
        const indicator = document.querySelector('.scroll-indicator');
        if (indicator) {
            indicator.style.opacity = '0';
            indicator.style.transition = 'opacity 0.5s ease';
        }
    }
});

// Add smooth fade-in on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effect to profile image
const profileImg = document.querySelector('.profile-section img');
if (profileImg) {
    profileImg.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    profileImg.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

