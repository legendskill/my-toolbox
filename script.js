// ================================
// Theme Toggle
// ================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}

// ================================
// Category Filter
// ================================
const tabs = document.querySelectorAll('.tab-btn');
const cards = document.querySelectorAll('.tool-card');
const emptyState = document.getElementById('emptyState');
let currentCategory = 'all';

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Update active tab
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    currentCategory = tab.dataset.category;
    filterTools();
  });
});

function filterTools() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
  let visibleCount = 0;

  cards.forEach(card => {
    const category = card.dataset.category;
    const name = card.querySelector('.tool-name').textContent.toLowerCase();
    const desc = card.querySelector('.tool-desc').textContent.toLowerCase();
    const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase()).join(' ');

    const matchCategory = currentCategory === 'all' || category === currentCategory;
    const matchSearch = !searchTerm || 
      name.includes(searchTerm) || 
      desc.includes(searchTerm) || 
      tags.includes(searchTerm);

    if (matchCategory && matchSearch) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  emptyState.style.display = visibleCount === 0 ? '' : 'none';
}

// ================================
// Search
// ================================
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  filterTools();
});

// Ctrl+K shortcut
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
  }
  // Escape to clear search
  if (e.key === 'Escape') {
    searchInput.value = '';
    searchInput.blur();
    filterTools();
  }
});

// ================================
// Smooth scroll for card hover
// ================================
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.2s ease';
  });
});
