// Minimal JavaScript for smooth functionality

document.addEventListener('DOMContentLoaded', function() {

    // Open external links in a new tab
    function markExternalLinks(root) {
        root.querySelectorAll('a[href^="http"]').forEach(link => {
            if (!link.getAttribute('target')) {
                link.setAttribute('target', '_blank');
            }
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }
    markExternalLinks(document);

    // Mobile menu (☰) toggle
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.nav-toggle');
    if (navbar && toggle) {
        const setOpen = open => {
            navbar.classList.toggle('nav-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            toggle.textContent = open ? '✕' : '☰';
        };
        toggle.addEventListener('click', () => setOpen(!navbar.classList.contains('nav-open')));
        // Close after choosing a link, on Escape, or when tapping outside the menu
        navbar.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setOpen(false)));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
        document.addEventListener('click', e => { if (!navbar.contains(e.target)) setOpen(false); });
    }

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

    // Footer: current year and automatic "last updated" date
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
    const updatedEl = document.getElementById('last-updated');
    if (updatedEl) {
        // On GitHub Pages this is the date the site was last published
        const modified = new Date(document.lastModified);
        if (!isNaN(modified)) {
            updatedEl.textContent = modified.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }
    }

    // Home page: show the latest 4 items from news.html, so news only needs editing in one place.
    // The items already written in index.html are the fallback if this can't load.
    const recentList = document.getElementById('recent-news-list');
    if (recentList && location.protocol !== 'file:') {
        fetch('news.html')
            .then(response => response.ok ? response.text() : Promise.reject())
            .then(html => {
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const items = Array.from(doc.querySelectorAll('#news .news-list > li')).slice(0, 4);
                if (items.length) {
                    recentList.replaceChildren(...items.map(li => document.importNode(li, true)));
                    markExternalLinks(recentList);
                }
            })
            .catch(() => {});
    }

});
