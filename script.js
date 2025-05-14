// Traducciones
const translations = {
    es: {
        'hero.title': 'Intercambia, Reutiliza, Sostenibilidad',
        'search.placeholder': '¿Qué estás buscando?',
        'search.title': 'Resultados de Búsqueda',
        'profile.name': 'Nombre de Usuario',
        'profile.exchanges': 'Intercambios',
        'profile.rating': 'Valoración',
        'modal.createAd': 'Crear Nuevo Anuncio',
        'modal.title': 'Título del anuncio',
        'modal.description': 'Descripción',
        'modal.category': 'Categoría',
        'modal.submit': 'Publicar Anuncio',
        'nav.home': 'Inicio',
        'nav.search': 'Búsqueda',
        'nav.profile': 'Perfil',
        'nav.create': 'Crear Anuncio',
        'categories.sports': 'Deportes',
        'categories.books': 'Libros',
        'categories.furniture': 'Muebles'
    },
    en: {
        'hero.title': 'Exchange, Reuse, Sustainability',
        'search.placeholder': 'What are you looking for?',
        'search.title': 'Search Results',
        'profile.name': 'Username',
        'profile.exchanges': 'Exchanges',
        'profile.rating': 'Rating',
        'modal.createAd': 'Create New Ad',
        'modal.title': 'Ad Title',
        'modal.description': 'Description',
        'modal.category': 'Category',
        'modal.submit': 'Publish Ad',
        'nav.home': 'Home',
        'nav.search': 'Search',
        'nav.profile': 'Profile',
        'nav.create': 'Create Ad',
        'categories.sports': 'Sports',
        'categories.books': 'Books',
        'categories.furniture': 'Furniture'
    },
    eu: {
        'hero.title': 'Trukatu, Berrerabili, Jasangarritasuna',
        'search.placeholder': 'Zer bilatzen ari zara?',
        'search.title': 'Bilaketa Emaitzak',
        'profile.name': 'Erabiltzaile Izena',
        'profile.exchanges': 'Trukaketak',
        'profile.rating': 'Balorazioa',
        'modal.createAd': 'Iragarki Berria Sortu',
        'modal.title': 'Iragarkiaren Izenburua',
        'modal.description': 'Deskribapena',
        'modal.category': 'Kategoria',
        'modal.submit': 'Iragarkia Argitaratu',
        'nav.home': 'Hasiera',
        'nav.search': 'Bilaketa',
        'nav.profile': 'Profila',
        'nav.create': 'Iragarkia Sortu',
        'categories.sports': 'Kirolak',
        'categories.books': 'Liburuak',
        'categories.furniture': 'Altzariak'
    }
};

// Datos de ejemplo para los anuncios
const mockAds = [
    {
        id: 1,
        title: {
            es: "Bicicleta de Montaña",
            en: "Mountain Bike",
            eu: "Mendiko Bizikleta"
        },
        description: {
            es: "Bicicleta en excelente estado, solo 2 años de uso",
            en: "Bike in excellent condition, only 2 years of use",
            eu: "Bizikleta egoera bikainean, 2 urteko erabilera soilik"
        },
        category: "sports",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        title: {
            es: "Libros de Programación",
            en: "Programming Books",
            eu: "Programazio Liburuak"
        },
        description: {
            es: "Colección de libros sobre JavaScript y Python",
            en: "Collection of books about JavaScript and Python",
            eu: "JavaScript eta Python liburuen bilduma"
        },
        category: "books",
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        title: {
            es: "Mesa de Oficina",
            en: "Office Desk",
            eu: "Bulego Mahaia"
        },
        description: {
            es: "Mesa de madera en perfecto estado",
            en: "Wooden desk in perfect condition",
            eu: "Egurrezko mahai egoera perfektuan"
        },
        category: "furniture",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
];

// Elementos del DOM
const adsGrid = document.querySelector('.ads-grid');
const createAdButton = document.getElementById('createAdButton');
const createAdModal = document.getElementById('createAdModal');
const closeModal = document.querySelector('.close');
const createAdForm = document.getElementById('createAdForm');
const languageSelect = document.getElementById('languageSelect');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main > section');
const searchInput = document.querySelector('.search-container input');
const searchButton = document.querySelector('.search-container button');
const homeButton = document.querySelector('[data-section="home"]');

// Función para cambiar el idioma
function changeLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // Actualizar textos de navegación
    navLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        const span = link.querySelector('span');
        if (span && translations[lang][`nav.${section}`]) {
            span.textContent = translations[lang][`nav.${section}`];
        }
    });

    // Recargar anuncios con el nuevo idioma
    loadAds(mockAds, lang);
}

// Función para crear una tarjeta de anuncio
function createAdCard(ad, lang) {
    return `
        <div class="ad-card">
            <img src="${ad.image}" alt="${ad.title[lang]}">
            <div class="ad-content">
                <h3>${ad.title[lang]}</h3>
                <p>${ad.description[lang]}</p>
                <span class="category">${translations[lang][`categories.${ad.category}`]}</span>
            </div>
        </div>
    `;
}

// Función para cargar los anuncios
function loadAds(ads, lang = 'eu') {
    const currentLang = lang || languageSelect.value;
    adsGrid.innerHTML = ads.map(ad => createAdCard(ad, currentLang)).join('');
}

// Función para buscar anuncios
function searchAds(query) {
    const currentLang = languageSelect.value;
    const filteredAds = mockAds.filter(ad => 
        ad.title[currentLang].toLowerCase().includes(query.toLowerCase()) ||
        ad.description[currentLang].toLowerCase().includes(query.toLowerCase()) ||
        translations[currentLang][`categories.${ad.category}`].toLowerCase().includes(query.toLowerCase())
    );
    
    const searchResultsGrid = document.querySelector('.search-section .ads-grid');
    if (searchResultsGrid) {
        searchResultsGrid.innerHTML = filteredAds.map(ad => createAdCard(ad, currentLang)).join('');
    }
    
    showSection('search');
}

// Función para mostrar/ocultar secciones
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    const targetSection = document.querySelector(`.${sectionId}-section`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Función para inicializar la navegación
function initializeNavigation() {
    // Mostrar la sección de inicio por defecto
    showSection('home');
    
    // Añadir evento click a los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            
            // Actualizar clase activa
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Mostrar sección correspondiente
            showSection(section);
        });
    });
}

// Función para abrir el modal de creación de anuncio
function openCreateAdModal() {
    createAdModal.style.display = 'block';
    setTimeout(() => {
        createAdModal.classList.add('show');
    }, 10);
}

// Event Listeners
homeButton.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('home');
    navLinks.forEach(link => link.classList.remove('active'));
    homeButton.classList.add('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        if (section === 'create') {
            openCreateAdModal();
        } else {
            showSection(section);
        }
    });
});

languageSelect.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
});

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchAds(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            searchAds(query);
        }
    }
});

createAdButton.addEventListener('click', openCreateAdModal);

closeModal.addEventListener('click', () => {
    createAdModal.classList.remove('show');
    setTimeout(() => {
        createAdModal.style.display = 'none';
    }, 300);
});

window.addEventListener('click', (e) => {
    if (e.target === createAdModal) {
        createAdModal.classList.remove('show');
        setTimeout(() => {
            createAdModal.style.display = 'none';
        }, 300);
    }
});

createAdForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(createAdForm);
    const currentLang = languageSelect.value;
    
    // Crear el nuevo anuncio con soporte para múltiples idiomas
    const newAd = {
        id: mockAds.length + 1,
        title: {
            es: formData.get('title'),
            en: formData.get('title'),
            eu: formData.get('title')
        },
        description: {
            es: formData.get('description'),
            en: formData.get('description'),
            eu: formData.get('description')
        },
        category: formData.get('category').toLowerCase().replace(/\s+/g, ''),
        image: URL.createObjectURL(formData.get('image'))
    };

    // Añadir el nuevo anuncio al principio del array
    mockAds.unshift(newAd);
    
    // Recargar los anuncios con el idioma actual
    loadAds(mockAds, currentLang);
    
    // Cerrar el modal
    createAdModal.classList.remove('show');
    setTimeout(() => {
        createAdModal.style.display = 'none';
    }, 300);
    
    // Limpiar el formulario
    createAdForm.reset();
    
    // Mostrar la sección de inicio
    showSection('home');
    navLinks.forEach(link => link.classList.remove('active'));
    homeButton.classList.add('active');
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadAds(mockAds, 'eu');
    changeLanguage('eu');
    languageSelect.value = 'eu';
    showSection('home');
});

// Animación suave al hacer scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 