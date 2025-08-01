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
      'project-1': 'Проект 1',
      'project-2': 'Проект 2',
      'project-3': 'Проект 3',
      'project-4': 'Проект 4'
    };
    const descs = {
      'project-1': 'Описание проекта 1. Софт: Blender, Photoshop. 2024.',
      'project-2': 'Описание проекта 2. Софт: Maya, Substance 3D. 2024.',
      'project-3': 'Описание проекта 3. Софт: 3ds Max, V-Ray. 2023.',
      'project-4': 'Описание проекта 4. Софт: Houdini, Nuke. 2023.'
    };

    const titleEl = document.getElementById('projectTitle');
    const descEl = document.getElementById('projectDesc');
    if (titleEl) titleEl.textContent = titles[id] || 'Проект';
    if (descEl) descEl.textContent = descs[id] || 'Описание проекта.';

    const gallery = document.querySelector('.grid.gallery');
    if (gallery){
      gallery.innerHTML = '';
      const count = 6;
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