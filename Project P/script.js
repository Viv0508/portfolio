// Wait for DOM to fully load before running script
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Toggle Menu Functions ==========
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    
    // Toggle navbar when menu icon is clicked
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            menuIcon.classList.toggle('fa-xmark'); // Toggle between bars and X icon
            navbar.classList.toggle('active');
        });
    }
    
    // ========== Active Navigation Link Highlighting ==========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    
    // Function to update active link and handle sticky header
    function updateNavigation() {
        // Get current scroll position
        const scrollY = window.scrollY;
        
        // Make header sticky when scrolling down
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('sticky', scrollY > 100);
        }
        
        // Highlight active section in navigation
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's link
                const activeLink = document.querySelector(`header nav a[href*='${sectionId}']`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        updateNavigation();
        
        // Close mobile menu when scrolling
        if (navbar.classList.contains('active')) {
            menuIcon.classList.remove('fa-xmark');
            navbar.classList.remove('active');
        }
    });
    
    // ========== Initialize ScrollReveal Animation ==========
    const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        delay: 200,
        reset: false // Only animate elements once
    });
    
    // Custom animations for different sections
    sr.reveal('.home-content, .heading', { origin: 'top' });
    sr.reveal('.home-img, .services-container, .portfolio-box, .contact-container', { origin: 'bottom' });
    sr.reveal('.home-content h1, .about-img', { origin: 'left' });
    sr.reveal('.home-content p, .about-content', { origin: 'right' });
    sr.reveal('.skills-box, .contact-form', { interval: 200 });
    
    // ========== Initialize Typed.js Animation ==========
    const typedElement = document.querySelector('.multiple-text');
    
    if (typedElement) {
        const typed = new Typed('.multiple-text', {
            strings: ['Frontend Developer', 'Web Designer', 'UI/UX Designer'],
            typeSpeed: 70,
            backSpeed: 70,
            backDelay: 1000,
            loop: true
        });
    }
    
    // ========== Smooth Scrolling for Navigation Links ==========
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                menuIcon.classList.remove('fa-xmark');
                navbar.classList.remove('active');
                
                // Smooth scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Form Submission Handler ==========
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would normally send the form data to your server
            console.log('Form submitted with data:', formObject);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // ========== Portfolio Item Hover Effect ==========
    const portfolioBoxes = document.querySelectorAll('.portfolio-box');
    
    portfolioBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.querySelector('.portfolio-layer').style.transform = 'translateY(0)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.querySelector('.portfolio-layer').style.transform = 'translateY(100%)';
        });
    });
});