(function(){
  const contactsLink = document.querySelector('a[data-link="contacts"]');
  const contactsSection = document.getElementById('contacts');
  const projectsGrid = document.querySelector('.grid.projects');

  // --- УЛУЧШЕННАЯ ЛОГИКА ДЛЯ КОНТАКТОВ ---

  function showContacts() {
    if (contactsSection && projectsGrid && contactsLink) {
      contactsSection.removeAttribute('hidden');
      projectsGrid.style.display = 'none';
      document.querySelectorAll('.top-link').forEach(a => a.classList.remove('active'));
      contactsLink.classList.add('active');
      contactsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function hideContacts() {
    if (contactsSection && projectsGrid) {
      contactsSection.setAttribute('hidden', '');
      projectsGrid.style.display = 'grid';
      document.querySelectorAll('.top-link').forEach(a => a.classList.remove('active'));
      const homeLink = document.querySelector('.top-nav a[href="index.html"]');
      if(homeLink) homeLink.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (contactsLink && contactsSection && projectsGrid){
    contactsLink.addEventListener('click', function(e){
      e.preventDefault();
      const isHidden = contactsSection.hasAttribute('hidden');
      if (isHidden){
        showContacts();
      } else {
        hideContacts();
      }
    });

    if (window.location.hash === '#contacts') {
      showContacts();
    }
  }

  // --- ЛОГИКА ДЛЯ СТРАНИЦЫ project.html ---
  if (location.pathname.endsWith('project.html')){
    
    // --- НОВОЕ ИСПРАВЛЕНИЕ: УМНАЯ КНОПКА "НАЗАД" ---
    const backLink = document.getElementById('projectBackLink');
    // Проверяем, что ссылка существует и что есть информация о предыдущей странице
    // Также убеждаемся, что предыдущая страница - это наш же сайт, а не гугл, например
    if (backLink && document.referrer && document.referrer.startsWith(window.location.origin)) {
        // Устанавливаем адрес кнопки "Назад" на адрес предыдущей страницы
        backLink.href = document.referrer;
    }
    // Если условия не выполняются, ссылка сохранит свой href="index.html" по умолчанию, что является хорошим запасным вариантом.


    // --- УМНАЯ ССЫЛКА "КОНТАКТЫ" ---
    const projectContactLink = document.getElementById('projectContactLink');
    if (projectContactLink) {
      projectContactLink.addEventListener('click', function(e) {
        e.preventDefault();
        if (document.referrer) {
          window.location.href = document.referrer.split('#')[0] + '#contacts';
        } else {
          window.location.href = 'index.html#contacts';
        }
      });
    }

    // --- ОСТАЛЬНАЯ ЛОГИКА ДЛЯ СТРАНИЦЫ ПРОЕКТА ---
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || 'project-1';

     const titles = {
      'project-1': 'Матрасы в разрезе', 'project-2': 'Интерьер',
      'project-3': 'Матрасы', 'project-4': 'Кровати',
      'g-1': 'Карточки товаров', 'g-2': 'Баннеры', 'g-3': 'Инструкции и схемы'
    };
     const descs = {
      'project-1': 'Софт: Blender, Substance Designer, Photoshop',
      'project-2': 'Софт: Blender, Photoshop',
      'project-3': 'Софт: Blender, Substance Designer, Photoshop',
      'project-4': 'Софт: Blender',
      'g-1': 'Инфографика: карточки, рендеры, композиции',
      'g-2': 'Инфографика: промо-баннеры, рекламные плоскости',
      'g-3': 'Инфографика: схемы устройств, инструкции'
    };
    
    const projectImages = {
      'project-1': [ { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' } ],
      'project-2': [ { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, ],
      'project-3': [ { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' } ],
      'project-4': [ { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' }, { type: 'standard' } ],
      'g-1': [ {type: 'standard'}, {type: 'standard'}, {type: 'standard'}, {type: 'standard'} ],
      'g-2': [ {type: 'standard'} ],
      'g-3': []
    };

    const titleEl = document.getElementById('projectTitle');
    const descEl = document.getElementById('projectDesc');
    if (titleEl) titleEl.textContent = titles[id] || 'Проект';
    if (descEl) descEl.textContent = descs[id] || 'Описание проекта.';

    const gallery = document.querySelector('.grid.gallery');
    if (gallery){
      gallery.innerHTML = '';
      const imagesData = projectImages[id] || [];
      imagesData.forEach((imageData, i) => {
        const fig = document.createElement('figure');
        fig.className = 'gallery-item flat';
        fig.dataset.type = imageData.type;
        const img = document.createElement('img');
        img.src = `assets/img/projects/${id}/${i + 1}.jpg`;
        img.alt = `${titles[id] || 'Проект'} — изображение ${i + 1}`;
        img.loading = 'lazy';
        fig.appendChild(img);
        gallery.appendChild(fig);
      });
    }

    // Лайтбокс... (остальной код без изменений)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const btnClose = document.querySelector('.lightbox-close');
    const btnPrev = document.querySelector('.lightbox-prev');
    const btnNext = document.querySelector('.lightbox-next');
    let current = 0;
    let images = [];

    function openLightbox(index){
      current = index;
      lightboxImg.src = images[current].src;
      lightbox.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox(){
      lightbox.setAttribute('hidden','');
      document.body.style.overflow = '';
    }
    function showNext(delta){
      current = (current + delta + images.length) % images.length;
      lightboxImg.src = images[current].src;
    }

    setTimeout(() => {
      images = Array.from(document.querySelectorAll('.gallery-item img'));
      images.forEach((im, idx) => {
        im.addEventListener('click', () => openLightbox(idx));
      });
    }, 0);

    btnClose && btnClose.addEventListener('click', closeLightbox);
    btnPrev && btnPrev.addEventListener('click', () => showNext(-1));
    btnNext && btnNext.addEventListener('click', () => showNext(1));
    lightbox && lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    window.addEventListener('keydown', (e) => {
      if (lightbox && !lightbox.hasAttribute('hidden')){
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext(1);
        if (e.key === 'ArrowLeft') showNext(-1);
      }
    });
  }
})();