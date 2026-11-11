// Minimal JavaScript for smooth functionality

document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll for in-page anchor links (offset handled by CSS scroll-padding-top)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    history.replaceState(null, '', href);
                }
            }
        });
    });

    // Open external links in a new tab
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Dynamic year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

});