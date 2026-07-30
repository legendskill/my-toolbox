// ================================
// Layout Definitions
// ================================
const LAYOUTS = {
  '左右拼接': {
    slots: 2,
    grid: { cols: 2, rows: 1 },
    cells: [
      { col: 0, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 1, colSpan: 1, row: 0, rowSpan: 1 },
    ],
  },
  '上下拼接': {
    slots: 2,
    grid: { cols: 1, rows: 2 },
    cells: [
      { col: 0, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 0, colSpan: 1, row: 1, rowSpan: 1 },
    ],
  },
  '上一下二': {
    slots: 3,
    grid: { cols: 2, rows: 2 },
    cells: [
      { col: 0, colSpan: 2, row: 0, rowSpan: 1 },
      { col: 0, colSpan: 1, row: 1, rowSpan: 1 },
      { col: 1, colSpan: 1, row: 1, rowSpan: 1 },
    ],
  },
  '上二下一': {
    slots: 3,
    grid: { cols: 2, rows: 2 },
    cells: [
      { col: 0, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 1, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 0, colSpan: 2, row: 1, rowSpan: 1 },
    ],
  },
  '左一右二': {
    slots: 3,
    grid: { cols: 2, rows: 2 },
    cells: [
      { col: 0, colSpan: 1, row: 0, rowSpan: 2 },
      { col: 1, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 1, colSpan: 1, row: 1, rowSpan: 1 },
    ],
  },
  '左二右一': {
    slots: 3,
    grid: { cols: 2, rows: 2 },
    cells: [
      { col: 0, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 0, colSpan: 1, row: 1, rowSpan: 1 },
      { col: 1, colSpan: 1, row: 0, rowSpan: 2 },
    ],
  },
  '三连': {
    slots: 3,
    grid: { cols: 3, rows: 1 },
    cells: [
      { col: 0, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 1, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 2, colSpan: 1, row: 0, rowSpan: 1 },
    ],
  },
  '三列': {
    slots: 3,
    grid: { cols: 1, rows: 3 },
    cells: [
      { col: 0, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 0, colSpan: 1, row: 1, rowSpan: 1 },
      { col: 0, colSpan: 1, row: 2, rowSpan: 1 },
    ],
  },
  '田字格': {
    slots: 4,
    grid: { cols: 2, rows: 2 },
    cells: [
      { col: 0, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 1, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 0, colSpan: 1, row: 1, rowSpan: 1 },
      { col: 1, colSpan: 1, row: 1, rowSpan: 1 },
    ],
  },
  '品字格': {
    slots: 4,
    grid: { cols: 3, rows: 3 },
    cells: [
      { col: 0, colSpan: 3, row: 0, rowSpan: 1 },
      { col: 0, colSpan: 1, row: 1, rowSpan: 2 },
      { col: 1, colSpan: 1, row: 1, rowSpan: 2 },
      { col: 2, colSpan: 1, row: 1, rowSpan: 2 },
    ],
  },
  '四连': {
    slots: 4,
    grid: { cols: 4, rows: 1 },
    cells: [
      { col: 0, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 1, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 2, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 3, colSpan: 1, row: 0, rowSpan: 1 },
    ],
  },
  '四列': {
    slots: 4,
    grid: { cols: 1, rows: 4 },
    cells: [
      { col: 0, colSpan: 1, row: 0, rowSpan: 1 },
      { col: 0, colSpan: 1, row: 1, rowSpan: 1 },
      { col: 0, colSpan: 1, row: 2, rowSpan: 1 },
      { col: 0, colSpan: 1, row: 3, rowSpan: 1 },
    ],
  },
};

// ================================
// State
// ================================
let currentLayout = '左右拼接';
let images = []; // Array of HTMLImageElement | null
let resultCanvas = null;

// ================================
// DOM References
// ================================
const layoutGrid = document.getElementById('layoutGrid');
const slotsContainer = document.getElementById('slotsContainer');
const previewCanvas = document.getElementById('previewCanvas');
const previewPlaceholder = document.getElementById('previewPlaceholder');
const spacingSlider = document.getElementById('spacing');
const spacingValue = document.getElementById('spacingValue');
const cornerSlider = document.getElementById('cornerRadius');
const cornerValue = document.getElementById('cornerRadiusValue');
const btnDownload = document.getElementById('btnDownload');
const btnLoadAll = document.getElementById('btnLoadAll');
const btnClearAll = document.getElementById('btnClearAll');
const btnRefresh = document.getElementById('btnRefresh');
const fileInput = document.getElementById('fileInput');

// ================================
// Init Layout Grid
// ================================
function initLayoutGrid() {
  layoutGrid.innerHTML = '';
  for (const [name, layout] of Object.entries(LAYOUTS)) {
    const item = document.createElement('div');
    item.className = `layout-item${name === currentLayout ? ' active' : ''}`;
    item.dataset.layout = name;

    // Create mini preview grid
    const preview = document.createElement('div');
    preview.className = 'layout-preview';
    preview.style.gridTemplateColumns = `repeat(${layout.grid.cols}, 1fr)`;
    preview.style.gridTemplateRows = `repeat(${layout.grid.rows}, 1fr)`;

    // Create colored cells
    const colors = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'];
    for (let i = 0; i < layout.slots; i++) {
      const cell = document.createElement('div');
      cell.style.background = colors[i % colors.length];
      cell.style.borderRadius = '2px';
      cell.style.opacity = '0.7';
      preview.appendChild(cell);
    }

    const label = document.createElement('div');
    label.className = 'layout-name';
    label.textContent = name;

    item.appendChild(preview);
    item.appendChild(label);

    item.addEventListener('click', () => {
      currentLayout = name;
      document.querySelectorAll('.layout-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      rebuildSlots();
      autoPreview();
    });

    layoutGrid.appendChild(item);
  }
}

// ================================
// Slots
// ================================
function rebuildSlots() {
  const layout = LAYOUTS[currentLayout];
  const numSlots = layout.slots;

  // Resize images array
  while (images.length < numSlots) images.push(null);
  images = images.slice(0, numSlots);

  slotsContainer.innerHTML = '';
  for (let i = 0; i < numSlots; i++) {
    const slot = createSlot(i);
    slotsContainer.appendChild(slot);
  }
}

function createSlot(index) {
  const slot = document.createElement('div');
  slot.className = `slot${images[index] ? ' filled' : ''}`;
  slot.dataset.index = index;

  if (images[index]) {
    // Show image
    const img = document.createElement('img');
    img.className = 'slot-image';
    img.src = images[index].src;
    slot.appendChild(img);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'slot-remove';
    removeBtn.innerHTML = '<i class="bi bi-x"></i>';
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      images[index] = null;
      rebuildSlots();
      autoPreview();
    });
    slot.appendChild(removeBtn);

    const label = document.createElement('div');
    label.className = 'slot-label';
    label.textContent = `#${index + 1}`;
    slot.appendChild(label);
  } else {
    // Empty slot
    const empty = document.createElement('div');
    empty.className = 'slot-empty';
    empty.innerHTML = '<i class="bi bi-plus-circle"></i><span>点击添加</span>';
    slot.appendChild(empty);
  }

  // Click to add image
  slot.addEventListener('click', () => {
    if (!images[index]) {
      fileInput.dataset.targetIndex = index;
      fileInput.click();
    }
  });

  // Drag & drop
  slot.addEventListener('dragover', (e) => {
    e.preventDefault();
    slot.classList.add('drag-over');
  });

  slot.addEventListener('dragleave', () => {
    slot.classList.remove('drag-over');
  });

  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    slot.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      loadImageFromFile(files[0], index);
    }
  });

  return slot;
}

// ================================
// Image Loading
// ================================
function loadImageFromFile(file, index) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      images[index] = img;
      rebuildSlots();
      autoPreview();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ================================
// Stitch Logic
// ================================
function stitch() {
  const layout = LAYOUTS[currentLayout];
  const cells = layout.cells;
  const spacing = parseInt(spacingSlider.value);
  const cornerRadius = parseInt(cornerSlider.value);
  const bgColor = document.querySelector('input[name="bgColor"]:checked').value;

  // Check if any images loaded
  const hasImages = images.some(img => img !== null);
  if (!hasImages) return null;

  // Compute grid dimensions
  const maxColEnd = Math.max(...cells.map(c => c.col + c.colSpan));
  const maxRowEnd = Math.max(...cells.map(c => c.row + c.rowSpan));

  // Compute per-column width and per-row height
  const colWidth = {};
  const rowHeight = {};

  for (let i = 0; i < cells.length; i++) {
    const img = images[i];
    if (!img) continue;
    const { col, colSpan, row, rowSpan } = cells[i];
    const pw = img.width / Math.max(colSpan, 1);
    const ph = img.height / Math.max(rowSpan, 1);

    for (let dc = 0; dc < colSpan; dc++) {
      const c = col + dc;
      if (!colWidth[c] || pw > colWidth[c]) colWidth[c] = pw;
    }
    for (let dr = 0; dr < rowSpan; dr++) {
      const r = row + dr;
      if (!rowHeight[r] || ph > rowHeight[r]) rowHeight[r] = ph;
    }
  }

  // Fill missing
  for (let c = 0; c < maxColEnd; c++) colWidth[c] = colWidth[c] || 0;
  for (let r = 0; r < maxRowEnd; r++) rowHeight[r] = rowHeight[r] || 0;

  // Compute cumulative offsets
  const colX = {};
  let x = 0;
  for (let c = 0; c < maxColEnd; c++) {
    colX[c] = x;
    x += Math.round(colWidth[c]) + spacing;
  }

  const rowY = {};
  let y = 0;
  for (let r = 0; r < maxRowEnd; r++) {
    rowY[r] = y;
    y += Math.round(rowHeight[r]) + spacing;
  }

  const canvasW = x - spacing || 1;
  const canvasH = y - spacing || 1;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d');

  // Background
  if (bgColor === 'transparent') {
    ctx.clearRect(0, 0, canvasW, canvasH);
  } else {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasW, canvasH);
  }

  // Paste images
  for (let i = 0; i < cells.length; i++) {
    const img = images[i];
    if (!img) continue;
    const { col, colSpan, row, rowSpan } = cells[i];

    const cellX = colX[col];
    const cellY = rowY[row];
    const cellW = Array.from({ length: colSpan }, (_, dc) => Math.round(colWidth[col + dc]))
      .reduce((a, b) => a + b, 0) + spacing * (colSpan - 1);
    const cellH = Array.from({ length: rowSpan }, (_, dr) => Math.round(rowHeight[row + dr]))
      .reduce((a, b) => a + b, 0) + spacing * (rowSpan - 1);

    const pasteX = cellX + Math.max(Math.floor((cellW - img.width) / 2), 0);
    const pasteY = cellY + Math.max(Math.floor((cellH - img.height) / 2), 0);

    if (cornerRadius > 0) {
      // Draw with rounded corners
      ctx.save();
      roundRect(ctx, pasteX, pasteY, img.width, img.height, cornerRadius);
      ctx.clip();
      ctx.drawImage(img, pasteX, pasteY);
      ctx.restore();
    } else {
      ctx.drawImage(img, pasteX, pasteY);
    }
  }

  return canvas;
}

function roundRect(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ================================
// Preview
// ================================
function autoPreview() {
  const hasImages = images.some(img => img !== null);
  if (!hasImages) {
    previewCanvas.style.display = 'none';
    previewPlaceholder.classList.remove('hidden');
    btnDownload.disabled = true;
    return;
  }
  doPreview();
}

function doPreview() {
  const result = stitch();
  if (!result) return;

  resultCanvas = result;
  btnDownload.disabled = false;

  // Show preview
  previewPlaceholder.classList.add('hidden');
  previewCanvas.style.display = 'block';

  // Scale to fit preview area
  const area = document.getElementById('previewArea');
  const maxW = area.clientWidth - 32;
  const maxH = area.clientHeight - 32;
  const scale = Math.min(maxW / result.width, maxH / result.height, 1);

  previewCanvas.width = result.width;
  previewCanvas.height = result.height;
  previewCanvas.style.width = `${result.width * scale}px`;
  previewCanvas.style.height = `${result.height * scale}px`;

  const ctx = previewCanvas.getContext('2d');
  ctx.drawImage(result, 0, 0);
}

// ================================
// Download
// ================================
function download() {
  if (!resultCanvas) return;
  const link = document.createElement('a');
  link.download = 'stitched.png';
  link.href = resultCanvas.toDataURL('image/png');
  link.click();
}

// ================================
// Event Listeners
// ================================
fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  const targetIndex = parseInt(fileInput.dataset.targetIndex);

  if (!isNaN(targetIndex) && files.length === 1) {
    // Single file to specific slot
    loadImageFromFile(files[0], targetIndex);
  } else {
    // Multiple files to empty slots
    let fileIndex = 0;
    for (let i = 0; i < images.length && fileIndex < files.length; i++) {
      if (!images[i] && files[fileIndex].type.startsWith('image/')) {
        loadImageFromFile(files[fileIndex], i);
        fileIndex++;
      }
    }
  }
  fileInput.value = '';
});

btnLoadAll.addEventListener('click', () => {
  fileInput.dataset.targetIndex = 'all';
  fileInput.click();
});

btnClearAll.addEventListener('click', () => {
  images = images.map(() => null);
  rebuildSlots();
  autoPreview();
});

btnRefresh.addEventListener('click', doPreview);
btnDownload.addEventListener('click', download);

spacingSlider.addEventListener('input', (e) => {
  spacingValue.textContent = `${e.target.value}px`;
  autoPreview();
});

cornerSlider.addEventListener('input', (e) => {
  cornerValue.textContent = `${e.target.value}px`;
  autoPreview();
});

document.querySelectorAll('input[name="bgColor"]').forEach(radio => {
  radio.addEventListener('change', autoPreview);
});

// Keyboard shortcut
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    fileInput.value = '';
    fileInput.blur();
  }
});

// ================================
// Init
// ================================
initLayoutGrid();
rebuildSlots();
autoPreview();
