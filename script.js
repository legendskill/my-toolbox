// ================================
// Theme Toggle
// ================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

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
// Tab Switching
// ================================
const tabs = document.querySelectorAll('.tab-btn');
const categorySections = document.getElementById('categorySections');
const toolsGrid = document.getElementById('toolsGrid');
const emptyState = document.getElementById('emptyState');

let currentCategory = 'all';

// Collect all tool cards from sections for flat view
function getAllCards() {
  return document.querySelectorAll('.category-section .tool-card');
}

// Build flat grid from section cards (for category filter view)
function buildFlatGrid(category) {
  const allCards = getAllCards();
  toolsGrid.innerHTML = '';
  let count = 0;

  allCards.forEach(card => {
    if (card.dataset.category === category) {
      const clone = card.cloneNode(true);
      toolsGrid.appendChild(clone);
      count++;
    }
  });

  return count;
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    currentCategory = tab.dataset.category;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    if (currentCategory === 'all' && !searchTerm) {
      // Show sectioned view
      categorySections.style.display = '';
      toolsGrid.style.display = 'none';
      emptyState.style.display = 'none';
      showAllSections();
    } else {
      // Show flat filtered view
      categorySections.style.display = 'none';
      toolsGrid.style.display = '';
      toolsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
      toolsGrid.style.gap = '16px';
      toolsGrid.style.padding = '0';
      filterFlatView(searchTerm);
    }
  });
});

function showAllSections() {
  const sections = document.querySelectorAll('.category-section');
  sections.forEach(s => s.style.display = '');
}

function filterFlatView(searchTerm) {
  const allCards = getAllCards();
  toolsGrid.innerHTML = '';
  let count = 0;

  allCards.forEach(card => {
    const matchCategory = currentCategory === 'all' || card.dataset.category === currentCategory;
    const name = card.querySelector('.tool-name')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('.tool-desc')?.textContent.toLowerCase() || '';
    const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase()).join(' ');
    const matchSearch = !searchTerm || name.includes(searchTerm) || desc.includes(searchTerm) || tags.includes(searchTerm);

    if (matchCategory && matchSearch) {
      const clone = card.cloneNode(true);
      toolsGrid.appendChild(clone);
      count++;
    }
  });

  emptyState.style.display = count === 0 ? '' : 'none';
}

// ================================
// Search
// ================================
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (currentCategory === 'all' && !searchTerm) {
    // Back to sectioned view
    categorySections.style.display = '';
    toolsGrid.style.display = 'none';
    emptyState.style.display = 'none';
    showAllSections();
  } else if (currentCategory === 'all' && searchTerm) {
    // Search within all categories, flat view
    categorySections.style.display = 'none';
    toolsGrid.style.display = '';
    toolsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
    toolsGrid.style.gap = '16px';
    toolsGrid.style.padding = '0';
    filterFlatView(searchTerm);
  } else {
    // Filter within specific category
    filterFlatView(searchTerm);
  }
});

// Ctrl+K shortcut
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
  }
  if (e.key === 'Escape') {
    searchInput.value = '';
    searchInput.blur();
    // Reset to all sections view
    tabs.forEach(t => t.classList.remove('active'));
    tabs[0].classList.add('active');
    currentCategory = 'all';
    categorySections.style.display = '';
    toolsGrid.style.display = 'none';
    emptyState.style.display = 'none';
    showAllSections();
  }
});
