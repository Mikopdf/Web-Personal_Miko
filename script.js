document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (localStorage.getItem("darkMode") === "true" || (localStorage.getItem("darkMode") === null && prefersDarkMode)) {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️";
    }
    
    darkModeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        darkModeToggle.textContent = isDarkMode ? "☀️" : "🌙";
        localStorage.setItem("darkMode", isDarkMode);
    });
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });
    
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-link");
    
    function updateActiveNav() {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });
    }
    
    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav(); 
    
    document.querySelectorAll('.game-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const gameCard = this.closest('.game-card');
            const gameLink = gameCard.getAttribute('data-game-link');
            if (gameLink) {
                window.open(gameLink, '_blank');
            }
        });
    });
    
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
                  
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
               
            console.log("Form submitted:", data);
            
            alert("Terima kasih atas pesannya! Saya akan segera membalas.");
            this.reset();
        });
    }
    
    const logo = document.querySelector(".logo img");
    if (logo) {
        logo.addEventListener("mouseover", function() {
            this.style.transform = "rotate(15deg)";
        });
        
        logo.addEventListener("mouseout", function() {
            this.style.transform = "rotate(0)";
        });
    }
    
    document.getElementById('download-btn').addEventListener('click', function() {
        const cvPath = 'img/jerry.pdf';
        
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'jerry.pdf'; 
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});