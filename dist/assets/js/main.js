// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Search Functionality
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm.length < 2) {
                searchResults.innerHTML = '<p>Please enter at least 2 characters to search.</p>';
                return;
            }
            
            // Call the search API
            fetchSearchResults(searchTerm);
        });
    }
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animation || 'fade-in';
                    element.classList.add(animation);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Championship tabs
    const championshipTabs = document.querySelectorAll('.championship-tab');
    const championshipContents = document.querySelectorAll('.championship-content');
    
    if (championshipTabs.length > 0) {
        championshipTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const target = this.dataset.target;
                
                // Remove active class from all tabs and contents
                championshipTabs.forEach(tab => tab.classList.remove('active'));
                championshipContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                document.querySelector(`.championship-content[data-id="${target}"]`).classList.add('active');
            });
        });
    }
});

// Fetch search results from API
async function fetchSearchResults(searchTerm) {
    const searchResults = document.querySelector('.search-results');
    
    try {
        searchResults.innerHTML = '<p>Searching...</p>';
        
        // In a real implementation, this would be an API call
        // For now, we'll simulate a delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - in real implementation, this would come from the API
        const results = superstarData.filter(superstar => 
            superstar.name.toLowerCase().includes(searchTerm) || 
            superstar.nickname.toLowerCase().includes(searchTerm) ||
            superstar.brand.toLowerCase().includes(searchTerm)
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found. Try a different search term.</p>';
            return;
        }
        
        // Display results
        let resultsHTML = '<h3>Search Results</h3><div class="superstars-grid">';
        
        results.forEach(superstar => {
            resultsHTML += `
                <div class="superstar-card">
                    <img src="${superstar.image}" alt="${superstar.name}" class="superstar-image">
                    <div class="superstar-info">
                        <h3 class="superstar-name">${superstar.name}</h3>
                        <p class="superstar-brand">${superstar.brand}</p>
                        <a href="pages/superstar.html?id=${superstar.id}" class="btn">View Profile</a>
                    </div>
                </div>
            `;
        });
        
        resultsHTML += '</div>';
        searchResults.innerHTML = resultsHTML;
        
    } catch (error) {
        console.error('Error fetching search results:', error);
        searchResults.innerHTML = '<p>An error occurred while searching. Please try again later.</p>';
    }
}

// Mock data for search functionality
// In a real implementation, this would come from the API
const superstarData = [
    {
        id: 1,
        name: "Cody Rhodes",
        nickname: "The American Nightmare",
        brand: "SmackDown",
        image: "../assets/images/logo.svg"
    },
    {
        id: 2,
        name: "Seth Rollins",
        nickname: "The Visionary",
        brand: "Raw",
        image: "../assets/images/logo.svg"
    },
    {
        id: 3,
        name: "Becky Lynch",
        nickname: "The Man",
        brand: "Raw",
        image: "../assets/images/logo.svg"
    },
    {
        id: 4,
        name: "Tiffany Stratton",
        nickname: "The Center of the Universe",
        brand: "SmackDown",
        image: "../assets/images/logo.svg"
    }
];

// Function to load superstar profile data - no longer needed as we're using static HTML pages
// This is kept for reference but not used in the current implementation
function loadSuperstarProfile() {
    // Each superstar now has their own dedicated HTML page with accurate information
    console.log("Individual superstar profiles are now handled by dedicated HTML pages");
}