(function(){
  // Топ-навигация "Контакты" как секция на index.html
  const contactsLink = document.querySelector('a[data-link="contacts"]');
  const contactsSection = document.getElementById('contacts');
  const projectsGrid = document.querySelector('.grid.projects');

  if (contactsLink && contactsSection && projectsGrid){
    contactsLink.addEventListener('click', function(e){
      e.preventDefault();
      const isHidden = contactsSection.hasAttribute('hidden');
      if (isHidden){
        contactsSection.removeAttribute('hidden');
        projectsGrid.style.display = 'none';
        setActive(this);
        contactsSection.scrollIntoView({behavior: 'smooth', block: 'start'});
      }else{
        contactsSection.setAttribute('hidden', '');
        projectsGrid.style.display = 'grid';
        setActive(document.querySelector('.top-nav a[href="index.html"]'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  function setActive(link){
    document.querySelectorAll('.top-link').forEach(a => a.classList.remove('active'));
    if (link) link.classList.add('active');
  }

  // Страница проекта: динамика + лайтбокс
  if (location.pathname.endsWith('project.html')){
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || 'project-1';

    const titles = {
      'project-1': 'Матрасы в разрезе',
      'project-2': 'Интерьер',
      'project-3': 'Матрасы',
      'project-4': 'Кровати      '
    };
    const descs = {
      'project-1': 'Софт: Blender, Substance Designer, Photoshop',
      'project-2': 'Софт: Blender, Photoshop',
      'project-3': 'Софт: Blender, Substance Designer, Photoshop',
      'project-4': 'Софт: Blender'
    };

    const titleEl = document.getElementById('projectTitle');
    const descEl = document.getElementById('projectDesc');
    if (titleEl) titleEl.textContent = titles[id] || 'Проект';
    if (descEl) descEl.textContent = descs[id] || 'Описание проекта.';

    const gallery = document.querySelector('.grid.gallery');
    if (gallery){
      gallery.innerHTML = '';
      const counts = {
        'project-1': 7,  // Матрасы в разрезе
        'project-2': 11,  // Интерьер
        'project-3': 8, // Матрасы
        'project-4': 7   // Кровати
    };
    const count = counts[id] || 6;
      for (let i=1; i<=count; i++){
        const fig = document.createElement('figure');
        fig.className = 'gallery-item flat';
        const img = document.createElement('img');
        img.src = `assets/img/projects/${id}/${i}.jpg`;
        img.alt = `${titles[id] || 'Проект'} — изображение ${i}`;
        img.loading = 'lazy';
        fig.appendChild(img);
        gallery.appendChild(fig);
      }
    }

    // Лайтбокс
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