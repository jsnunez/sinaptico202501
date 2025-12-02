tipoSolicitud = "";
clasificadoIdSelect = "";

// API para gestionar los servicios
const API = {
  // Clave para almacenar los datos en localStorage




  // Obtener todos los clasificados desde un servidor
  async getAllClassifieds() {
    try {
      const response = await fetch(`/api/clasificados`);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }

      const data = await response.json();
      // console.log(data);
      // Convertir strings de fecha en objetos Date
      return data.map(item => ({
        ...item,
        createdAt: new Date(item.createdAt)
      }));
    } catch (error) {
      console.error("Fallo al obtener los clasificados:", error);
      return [];
    }
  },


  

  // Obtener clasificados filtrados
  async getFilteredClassifieds(type, filter) {
    let classifieds = await this.getAllClassifieds();

    // Filtrar por tipo de servicio
    if (type) {
      classifieds = classifieds.filter(classified => classified.type === type);
    }

    // Aplicar filtros adicionales
    if (filter === "recent") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      console.log(classifieds);
      classifieds = classifieds.filter(classified => classified.createdAt >= oneWeekAgo);
    } else if (filter === "popular") {
      classifieds = classifieds.filter(classified => classified.rating >= 4.7);
    } else if (filter === "featured") {
      classifieds = classifieds.filter(classified => classified.featured);
    } else if (filter && filter !== "all") {
      // Filtrar por categoría
      classifieds = classifieds.filter(classified =>
        classified.category.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Ordenar: primero anclados, luego nuevos, luego por fecha
    return classifieds.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      const aIsNew = a.isNew || (new Date() - a.createdAt) < 3 * 24 * 60 * 60 * 1000;
      const bIsNew = b.isNew || (new Date() - b.createdAt) < 3 * 24 * 60 * 60 * 1000;

      if (aIsNew && !bIsNew) return -1;
      if (!aIsNew && bIsNew) return 1;

      return b.createdAt - a.createdAt;
    });
  },

  // Buscar clasificados por texto
  searchClassifieds(query, type) {
    if (!query) return this.getFilteredClassifieds(type);

    const classifieds = this.getFilteredClassifieds(type);
    const searchQuery = query.toLowerCase();

    return classifieds.filter(classified =>
      classified.title.toLowerCase().includes(searchQuery) ||
      classified.description.toLowerCase().includes(searchQuery) ||
      classified.category.toLowerCase().includes(searchQuery) ||
      classified.location.toLowerCase().includes(searchQuery)
    );
  },

  // Obtener un clasificado por ID
  async getClassifiedById(id) {
    const classifieds = await this.getAllClassifieds();
    return classifieds.find(classified => classified.id === id);
  },

  // Crear un nuevo clasificado
  async createClassified(classifiedData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clasificados`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classifiedData)
      });
      if (!response.ok) throw new Error('Error al crear el clasificado');
      return await response.json();
    } catch (error) {
      console.error("Error al crear clasificado:", error);
      throw error;
    }
  },
  

  async updateClassified(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clasificados/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Error al actualizar clasificado');
      return await response.json();
    } catch (error) {
      console.error("Error al actualizar clasificado:", error);
      return null;
    }
  },

  // Eliminar un clasificado
  async deleteClassified(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clasificados/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar clasificado');
      return true;
    } catch (error) {
      console.error("Error al eliminar clasificado:", error);
      return false;
    }
  },

  // Anclar/desanclar un clasificado
  togglePinClassified(id) {
    const classified = this.getClassifiedById(id);

    if (classified) {
      return this.updateClassified(id, { pinned: !classified.pinned });
    }

    return null;
  }
};
// Controlador de la aplicación
const App = {
  // Estado de la aplicación
  state: {
    currentServiceType: "offer",
    currentFilter: "all",
    searchQuery: ""
  },

  // Inicializar la aplicación
  init() {
    this.renderClassifieds();
    this.setupEventListeners();

    // // Mostrar iniciales del usuario actual en el avatar
    // const currentUserAvatar = document.getElementById('current-user-avatar');
    // currentUserAvatar.textContent = this.getInitials(API.currentUser.name);
  },

  // Obtener iniciales de un nombre
  getInitials(name) {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  },

  // Formatear fecha
  formatDate(date) {
    const now = new Date();

    // Resetear horas a 00:00:00 para comparar solo fechas
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const givenDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const diffTime = today - givenDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Hoy";
    } else if (diffDays === 1) {
      return "Ayer";
    } else if (diffDays > 1 && diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else {
      return date.toLocaleDateString();
    }
  },

  // Renderizar clasificados
  async renderClassifieds() {
    const classifiedWall = document.getElementById('classified-wall');
    classifiedWall.innerHTML = '';

    let filteredClassifieds;

    if (this.state.searchQuery) {
      filteredClassifieds = await API.searchClassifieds(
        this.state.searchQuery,
        this.state.currentServiceType
      );
    } else {
      filteredClassifieds = await API.getFilteredClassifieds(
        this.state.currentServiceType,
        this.state.currentFilter
      );
    }
    // Añadir botón para crear clasificado
    const addClassifiedBtn = document.createElement('div');
    addClassifiedBtn.className = 'add-classified-btn';
    addClassifiedBtn.innerHTML = `
        <i class="fas fa-plus-circle"></i>
        <span>Publicar nuevo clasificado</span>
      `;
    addClassifiedBtn.addEventListener('click', () => this.showCreateClassifiedModal());
    classifiedWall.appendChild(addClassifiedBtn);

    // Renderizar clasificados
    filteredClassifieds.forEach(classified => {
      const cardEl = this.createClassifiedCard(classified);
      classifiedWall.appendChild(cardEl);
    });

    // Mensaje si no hay clasificados
    if (filteredClassifieds.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'empty-message';
      emptyMessage.textContent = 'No hay clasificados disponibles con los filtros actuales.';
      emptyMessage.style.gridColumn = '1 / -1';
      emptyMessage.style.textAlign = 'center';
      emptyMessage.style.padding = '2rem';
      emptyMessage.style.color = '#666';
      classifiedWall.appendChild(emptyMessage);
    }
  },

  // Crear tarjeta de clasificado
  createClassifiedCard(classified) {
    const cardEl = document.createElement('div');
    cardEl.className = `classified-card ${classified.type}`;
    cardEl.dataset.classifiedId = classified.id;
    cardEl.style.animationDelay = `${Math.random() * 0.3}s`;
    // Verificar si el clasificado es del usuario actual
    const isOwner = classified.providerId == userid;
    // Contenido principal de la tarjeta
    let cardHTML = `
        <div class="card-content">
          <div class="card-header">
        <div class="card-type ${classified.type}">
          ${classified.type === 'offer' ? 'Oferta' : 'Solicitud'}
        </div>
        <div class="card-price">$${classified.price}</div>
          </div>
          <h3 class="card-title">${classified.title}</h3>
          <div class="card-category">
        <i class="fas fa-tag"></i>
        <span>${classified.category}</span>
          </div>
          <div class="card-des">
          <p class="card-description">${classified.description}</p>
          </div>
          <div class="card-meta">
        <div class="card-meta-item">
          <i class="fas fa-clock"></i>
          <span>${classified.deliveryTime}</span>
        </div>
        <div class="card-meta-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>${classified.location}</span>
        </div>
        <div class="card-meta-item">
          <i class="fas fa-star"></i>
          <span>${classified.rating} (${classified.reviews})</span>
        </div>
          </div>
          <div class="card-footer">
        <div class="card-provider">
          <div class="provider-avatar">${this.getInitials(classified.provider.name)}</div>
          <div class="provider-info">
            <span class="provider-name">${classified.provider.name} ${isOwner ? '(Mío)' : ''}</span>
            <span class="provider-date">${this.formatDate(classified.createdAt)}</span>
          </div>
        </div>
  
        
      `;

    // Añadir botón de anclar/desanclar
    // cardHTML += `
    //   <button class="pin-btn ${classified.pinned ? 'pinned' : ''}" data-classified-id="${classified.id}">
    //     <i class="fas fa-thumbtack"></i>
    //   </button>
    // `;
    if (!isOwner) {
      cardHTML += `
        <div class="card-actions">
          <button class="card-action-btn contact-btn" data-classified-id="${classified.id}" id="anuncio${classified.id}">
            <i class="fas fa-${classified.type === 'offer' ? 'shopping-cart' : 'hand-holding-usd'}"></i>
          </button>
        </div>
          </div>
        </div>
      `;
    }

    // Añadir botón de eliminar solo si es el propietario
    if (isOwner) {
      cardHTML += `
             </div>
        </div>
          <button class="delete-btn" data-classified-id="${classified.id}">
            <i class="fas fa-trash-alt"></i>
          </button>
        `;

      cardEl.style.backgroundColor = '#2c3e50'; // Fondo oscuro
      cardEl.style.color = '#ecf0f1'; // Texto claro

    }

    // Añadir etiqueta de "Nuevo" si es reciente (menos de 3 días)
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    if (classified.isNew || classified.createdAt > threeDaysAgo) {
      cardHTML += `<div class="new-badge">Nuevo</div>`;
    }

    // Añadir etiqueta de "Destacado" si corresponde
    if (classified.featured) {
      cardHTML += `<div class="featured-badge">Destacado</div>`;
    }

    cardEl.innerHTML = cardHTML;

    // Configurar evento para contactar
    const contactBtn = cardEl.querySelector('.contact-btn');
    if (contactBtn) {
      contactBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showContactClassifiedModal(classified);
      });
    }
    

    // Configurar evento para anclar/desanclar
    const pinBtn = cardEl.querySelector('.pin-btn');
    if (pinBtn) {
      pinBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePinClassified(classified.id);
      });
    }

    // Configurar evento para eliminar (solo si es el propietario)
    const deleteBtn = cardEl.querySelector('.delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteClassified(classified.id);
      });
    }

    // Añadir evento de clic a toda la tarjeta para expandir/contraer en móviles
    cardEl.addEventListener('click', function () {
      // En dispositivos móviles, podríamos añadir una clase para expandir
      if (window.innerWidth <= 768) {
        this.classList.toggle('expanded');
      }
    });

    return cardEl;
  },

  // Anclar/desanclar clasificado
  togglePinClassified(id) {
    API.togglePinClassified(id);
    this.renderClassifieds();
  },

  // Eliminar clasificado
  deleteClassified(id) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/clasificados/${id}`, {
          method: 'DELETE'
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al eliminar el clasificado');
            }
            return response.json();
          })
          .then(() => {
            Swal.fire(
              'Eliminado',
              'El clasificado ha sido eliminado con éxito.',
              'success'
            );
            this.renderClassifieds();
          })
          .catch(error => {
            console.error('Error al eliminar el clasificado:', error);
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el clasificado.',
              'error'
            );
          });
      }
    });
    this.renderClassifieds();

  },

  // Mostrar modal para crear clasificado
  showCreateClassifiedModal() {
    const createClassifiedModal = document.getElementById('create-classified-modal');
    createClassifiedModal.classList.add('active');

    // Actualizar título según el tipo de servicio
    const modalTitle = createClassifiedModal.querySelector('.modal-title');
    const modalDescription = createClassifiedModal.querySelector('.modal-description');
    const submitButton = document.getElementById('submit-classified-btn');

    if (this.state.currentServiceType === 'offer') {
      tipoSolicitud = "offer";
      modalTitle.textContent = 'Publicar una oferta de servicio';
      modalDescription.textContent = 'Completa el formulario para ofrecer tus servicios a potenciales clientes.';
      submitButton.textContent = 'Publicar oferta';
    } else {
      tipoSolicitud = "request";

      modalTitle.textContent = 'Publicar una solicitud de servicio';
      modalDescription.textContent = 'Completa el formulario para publicar tu solicitud de servicio.';
      submitButton.textContent = 'Publicar solicitud';
    }

    // Limpiar formulario
    document.getElementById('create-classified-form').reset();
  },

  // Ocultar modal para crear clasificado
  hideCreateClassifiedModal() {
    const createClassifiedModal = document.getElementById('create-classified-modal');
    createClassifiedModal.classList.remove('active');
  },

 

  // Mostrar modal para contactar por clasificado
  showContactClassifiedModal(classified) {
    const contactClassifiedModal = document.getElementById('contact-classified-modal');
    const contactClassifiedTitle = document.getElementById('contact-classified-title');

    contactClassifiedModal.classList.add('active');
    contactClassifiedTitle.textContent = classified.title;
    contactClassifiedModal.dataset.classifiedId = classified.id;
    clasificadoIdSelect = classified.id;
    // Actualizar título según el tipo de servicio
    const modalTitle = contactClassifiedModal.querySelector('.modal-title');
    const submitButton = document.getElementById('submit-contact-btn');

    if (classified.type === 'offer') {
      modalTitle.textContent = 'Contratar este servicio';
      submitButton.textContent = 'Contratar servicio';
    } else {
      modalTitle.textContent = 'Aplicar a esta solicitud';
      submitButton.textContent = 'Enviar propuesta';
    }

    // Limpiar formulario
    document.getElementById('contact-classified-form').reset();
  },

  // Ocultar modal para contactar
  hideContactClassifiedModal() {
    const contactClassifiedModal = document.getElementById('contact-classified-modal');
    contactClassifiedModal.classList.remove('active');
  },



  // Cambiar tipo de servicio
  changeServiceType(type) {
    this.state.currentServiceType = type;

    // Actualizar botones
    const serviceTypeButtons = document.querySelectorAll('.service-type-btn');
    serviceTypeButtons.forEach(btn => {
      if (btn.dataset.type === type) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    this.renderClassifieds();
  },

  // Cambiar filtro
  changeFilter(filter) {
    this.state.currentFilter = filter;

    // Actualizar botones de filtro
    const filterTags = document.querySelectorAll('.tag');
    filterTags.forEach(tag => {
      if (tag.dataset.filter === filter) {
        tag.classList.add('active');
      } else {
        tag.classList.remove('active');
      }
    });

    this.renderClassifieds();
  },

  // Buscar clasificados
  searchClassifieds(query) {
    this.state.searchQuery = query;
    this.renderClassifieds();
  },

  // Configurar eventos
  setupEventListeners() {
    // Cambiar entre tipos de servicio
    const serviceTypeButtons = document.querySelectorAll('.service-type-btn');
    serviceTypeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.changeServiceType(btn.dataset.type));
    });

    // Filtros
    const filterTags = document.querySelectorAll('.tag');
    filterTags.forEach(tag => {
      tag.addEventListener('click', () => this.changeFilter(tag.dataset.filter));
    });

    // // Búsqueda
    // const searchInput = document.getElementById('search-input');
    // searchInput.addEventListener('input', (e) => {
    //   this.searchClassifieds(e.target.value);
    // });

    // // Menú móvil
    // const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    // const mobileMenu = document.getElementById('mobile-menu');
    // mobileMenuToggle.addEventListener('click', () => {
    //   mobileMenu.classList.toggle('active');
    // });

    // Modal de crear clasificado
    // const createClassifiedBtn = document.getElementById('create-classified-btn');
    const cancelClassifiedBtn = document.getElementById('cancel-classified-btn');
    const submitClassifiedBtn = document.getElementById('submit-classified-btn');

    // createClassifiedBtn.addEventListener('click', () => this.showCreateClassifiedModal());
    cancelClassifiedBtn.addEventListener('click', () => this.hideCreateClassifiedModal());

    // Modal de contactar
    const cancelContactBtn = document.getElementById('cancel-contact-btn');
    const submitContactBtn = document.getElementById('submit-contact-btn');

    cancelContactBtn.addEventListener('click', () => this.hideContactClassifiedModal());
    // submitContactBtn.addEventListener('click', () => this.submitContact());

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', e => {
      if (e.target.classList.contains('modal-backdrop')) {
        this.hideCreateClassifiedModal();
        this.hideContactClassifiedModal();
      }
    });
  }
};
document.addEventListener('DOMContentLoaded', () => App.init());


document.getElementById('submit-classified-btn').addEventListener('click', async (event) => {
  event.preventDefault();

  const title = document.getElementById('classified-title').value;
  const category = document.getElementById('classified-category').value;
  const price = document.getElementById('classified-price').value;
  const description = document.getElementById('classified-description').value;
  const deliveryTime = document.getElementById('classified-delivery').value;
  const location = document.getElementById('classified-location').value;

  const classifiedData = {
    title,
    category,
    price,
    description,
    deliveryTime,
    location,
    type: tipoSolicitud,
    providerId: userid
  };

  if (title && category && price && description && deliveryTime && location) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Quieres publicar este clasificado?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, publicar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await API.createClassified(classifiedData);
          Swal.fire('Éxito', 'Clasificado publicado correctamente', 'success');
          document.getElementById('create-classified-form').reset();
          App.hideCreateClassifiedModal(); // Oculta el modal después de publicar
          App.renderClassifieds(); // Recarga la lista
        } catch (error) {
          Swal.fire('Error', 'No se pudo publicar el clasificado', 'error');
        }
      }
    });
  } else {
    Swal.fire('Error', 'Por favor completa todos los campos requeridos.', 'error');
  }
});
