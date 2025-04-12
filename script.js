// Configuration initiale
const config = {
    brandName: 'MonLogo',
    slogan: '',
    primaryColor: '#3498db',
    secondaryColor: '#2ecc71',
    fontFamily: 'Roboto',
    icon: null,
    preset: 'modern'
};

// Éléments DOM
const elements = {
    brandNameInput: null,
    sloganInput: null,
    primaryColorInput: null,
    secondaryColorInput: null,
    fontSelect: null,
    iconSelect: null,
    presetSelect: null,
    generateRandomBtn: null,
    saveBtn: null,
    historyBtn: null,
    exportPngBtn: null,
    exportSvgBtn: null,
    logoPreview: null,
    logoName: null,
    logoIcon: null,
    logoSlogan: null
};

// Polices disponibles (Google Fonts)
const availableFonts = [
    { name: 'Roboto', value: 'Roboto' },
    { name: 'Open Sans', value: 'Open Sans' },
    { name: 'Montserrat', value: 'Montserrat' },
    { name: 'Poppins', value: 'Poppins' },
    { name: 'Lato', value: 'Lato' }
];

// Icônes disponibles (sera rempli dynamiquement)
const availableIcons = [];

// Préréglages de style
const stylePresets = {
    modern: {
        primaryColor: '#3498db',
        secondaryColor: '#2ecc71',
        fontFamily: 'Roboto'
    },
    minimalist: {
        primaryColor: '#333333',
        secondaryColor: '#999999',
        fontFamily: 'Open Sans'
    },
    fun: {
        primaryColor: '#e74c3c',
        secondaryColor: '#f39c12',
        fontFamily: 'Poppins'
    },
    pro: {
        primaryColor: '#2c3e50',
        secondaryColor: '#7f8c8d',
        fontFamily: 'Montserrat'
    }
};

// Initialisation de l'application
function init() {
    // Récupération des éléments DOM
    elements.brandNameInput = document.getElementById('brand-name');
    elements.sloganInput = document.getElementById('slogan');
    elements.primaryColorInput = document.getElementById('primary-color');
    elements.secondaryColorInput = document.getElementById('secondary-color');
    elements.fontSelect = document.getElementById('font-select');
    elements.iconSelect = document.getElementById('icon-select');
    elements.presetSelect = document.getElementById('preset-select');
    elements.generateRandomBtn = document.getElementById('generate-random');
    elements.saveBtn = document.getElementById('save-logo');
    elements.historyBtn = document.getElementById('history');
    elements.exportPngBtn = document.getElementById('export-png');
    elements.exportSvgBtn = document.getElementById('export-svg');
    elements.logoPreview = document.querySelector('.logo-container');
    elements.logoName = document.querySelector('.logo-name');
    elements.logoIcon = document.querySelector('.logo-icon');
    elements.logoSlogan = document.querySelector('.logo-slogan');

    // Initialisation des écouteurs d'événements
    setupEventListeners();

    // Initialisation des sélecteurs
    initSelectors();

    // Mise à jour initiale du logo
    updateLogoPreview();
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    elements.brandNameInput.addEventListener('input', updateLogoPreview);
    elements.sloganInput.addEventListener('input', updateLogoPreview);
    elements.primaryColorInput.addEventListener('input', updateLogoPreview);
    elements.secondaryColorInput.addEventListener('input', updateLogoPreview);
    elements.fontSelect.addEventListener('change', updateLogoPreview);
    elements.iconSelect.addEventListener('change', updateLogoPreview);
    elements.presetSelect.addEventListener('change', applyPreset);
    elements.generateRandomBtn.addEventListener('click', generateRandomLogo);
    elements.saveBtn.addEventListener('click', saveLogo);
    elements.historyBtn.addEventListener('click', showHistory);
    elements.exportPngBtn.addEventListener('click', exportAsPng);
    elements.exportSvgBtn.addEventListener('click', exportAsSvg);
}

// Initialisation des sélecteurs
function initSelectors() {
    // Remplissage du sélecteur de polices
    availableFonts.forEach(font => {
        const option = document.createElement('option');
        option.value = font.value;
        option.textContent = font.name;
        elements.fontSelect.appendChild(option);
    });

    // Remplissage du sélecteur de préréglages
    Object.keys(stylePresets).forEach(preset => {
        const option = document.createElement('option');
        option.value = preset;
        option.textContent = preset.charAt(0).toUpperCase() + preset.slice(1);
        elements.presetSelect.appendChild(option);
    });

    // Charger les icônes SVG disponibles
    availableIcons.push(
        { name: 'Cercle', value: 'icon1' },
        { name: 'Carré arrondi', value: 'icon2' },
        { name: 'Triangle', value: 'icon3' }
    );

    // Remplir le sélecteur d'icônes
    availableIcons.forEach(icon => {
        const option = document.createElement('option');
        option.value = icon.value;
        option.textContent = icon.name;
        elements.iconSelect.appendChild(option);
    });

    // Mettre à jour l'affichage de l'icône sélectionnée
    elements.iconSelect.addEventListener('change', () => {
        const selectedIcon = elements.iconSelect.value;
        if (selectedIcon) {
            elements.logoIcon.innerHTML = `<img src="assets/${selectedIcon}.svg" alt="${selectedIcon}">`;
        } else {
            elements.logoIcon.innerHTML = '';
        }
    });
}

// Mise à jour de l'aperçu du logo
function updateLogoPreview() {
    // Mise à jour de la configuration
    config.brandName = elements.brandNameInput.value || 'MonLogo';
    config.slogan = elements.sloganInput.value;
    config.primaryColor = elements.primaryColorInput.value;
    config.secondaryColor = elements.secondaryColorInput.value;
    config.fontFamily = elements.fontSelect.value;
    config.icon = elements.iconSelect.value;

    // Application des styles
    elements.logoName.textContent = config.brandName;
    elements.logoName.style.color = config.primaryColor;
    elements.logoName.style.fontFamily = config.fontFamily;
    
    elements.logoSlogan.textContent = config.slogan;
    elements.logoSlogan.style.color = config.secondaryColor;
    elements.logoSlogan.style.fontFamily = config.fontFamily;

    // Mettre à jour l'icône du logo
    if (config.icon) {
        elements.logoIcon.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 100 100" fill="${config.primaryColor}">
                <use href="assets/${config.icon}.svg#icon" />
            </svg>
        `;
    } else {
        elements.logoIcon.innerHTML = '';
    }
}

// Application d'un préréglage de style
function applyPreset() {
    const preset = stylePresets[elements.presetSelect.value];
    if (!preset) return;

    elements.primaryColorInput.value = preset.primaryColor;
    elements.secondaryColorInput.value = preset.secondaryColor;
    elements.fontSelect.value = preset.fontFamily;
    
    updateLogoPreview();
}

// Génération aléatoire d'un logo
function generateRandomLogo() {
    // TODO: Implémenter la génération aléatoire
    alert('Fonctionnalité de génération aléatoire à implémenter');
}

// Sauvegarde du logo
function saveLogo() {
    // Créer un objet représentant le logo actuel
    const logoData = {
        brandName: config.brandName,
        slogan: config.slogan,
        primaryColor: config.primaryColor,
        secondaryColor: config.secondaryColor,
        fontFamily: config.fontFamily,
        icon: config.icon,
        timestamp: new Date().getTime()
    };

    // Récupérer l'historique existant ou initialiser un tableau vide
    const history = JSON.parse(localStorage.getItem('logoHistory') || '[]');
    
    // Ajouter le nouveau logo à l'historique
    history.push(logoData);
    
    // Limiter l'historique aux 10 derniers logos
    if (history.length > 10) {
        history.shift(); // Supprimer le plus ancien
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('logoHistory', JSON.stringify(history));
    
    // Confirmation à l'utilisateur
    alert('Logo sauvegardé avec succès !');
}

// Affichage de l'historique
function showHistory() {
    // Récupérer l'historique depuis localStorage
    const history = JSON.parse(localStorage.getItem('logoHistory') || '[]');
    
    if (history.length === 0) {
        alert('Aucun logo sauvegardé dans l\'historique.');
        return;
    }
    
    // Créer une boîte de dialogue pour afficher l'historique
    const historyDialog = document.createElement('div');
    historyDialog.className = 'history-dialog';
    historyDialog.innerHTML = `
        <div class="history-header">
            <h3>Historique des logos</h3>
            <button class="close-history">&times;</button>
        </div>
        <div class="history-items"></div>
    `;
    
    // Remplir avec les logos sauvegardés
    const historyItems = historyDialog.querySelector('.history-items');
    history.reverse().forEach((logo, index) => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
            <div class="history-preview" style="color:${logo.primaryColor}; font-family:${logo.fontFamily}">
                ${logo.brandName}
            </div>
            <div class="history-details">
                <span>${new Date(logo.timestamp).toLocaleString()}</span>
                <div class="history-actions">
                    <button class="load-logo" data-index="${history.length - 1 - index}">Charger</button>
                    <button class="delete-logo" data-index="${history.length - 1 - index}">Supprimer</button>
                </div>
            </div>
        `;
        historyItems.appendChild(item);
    });
    
    // Ajouter au DOM
    document.body.appendChild(historyDialog);
    
    // Gestion des événements
    historyDialog.querySelector('.close-history').addEventListener('click', () => {
        document.body.removeChild(historyDialog);
    });
    
    // Charger un logo depuis l'historique
    historyDialog.querySelectorAll('.load-logo').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const logo = history[index];
            
            // Appliquer les paramètres du logo
            elements.brandNameInput.value = logo.brandName;
            elements.sloganInput.value = logo.slogan;
            elements.primaryColorInput.value = logo.primaryColor;
            elements.secondaryColorInput.value = logo.secondaryColor;
            elements.fontSelect.value = logo.fontFamily;
            elements.iconSelect.value = logo.icon;
            
            // Mettre à jour l'affichage
            updateLogoPreview();
            
            // Fermer la boîte de dialogue
            document.body.removeChild(historyDialog);
        });
    });

    // Gestion de la suppression des logos
    historyDialog.querySelectorAll('.delete-logo').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            history.splice(index, 1);
            localStorage.setItem('logoHistory', JSON.stringify(history));
            document.body.removeChild(historyDialog);
            showHistory(); // Rafraîchir l'affichage
        });
    });
}

// Export en PNG
function exportAsPng() {
    // TODO: Implémenter l'export PNG
    alert('Fonctionnalité d\'export PNG à implémenter');
}

// Export en SVG
function exportAsSvg() {
    // TODO: Implémenter l'export SVG
    alert('Fonctionnalité d\'export SVG à implémenter');
}

// Lancement de l'application lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', init);
