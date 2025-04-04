document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const nav = document.getElementById('chamber-nav');

  // Better performance with throttled event handler
  let isTransitioning = false;

  // Función para verificar el ancho de la ventana
  function checkWindowSize() {
    if (window.innerWidth > 960) {
      // En pantallas grandes, asegurarse que el menú esté visible y sin clase 'open'
      nav.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.innerHTML = '☰';
    } else {
      // En pantallas pequeñas, asegurarse que el menú esté oculto inicialmente
      if (!nav.classList.contains('open')) {
        nav.style.display = 'none';
      }
    }
  }

  // Revisar tamaño de pantalla al cargar
  checkWindowSize();

  // Escuchar cambios de tamaño de ventana
  window.addEventListener('resize', () => {
    checkWindowSize();
  });

  hamburgerBtn.addEventListener('click', () => {
    if (isTransitioning) return;

    isTransitioning = true;
    nav.classList.toggle('open');

    const isExpanded = nav.classList.contains('open');
    hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    hamburgerBtn.innerHTML = isExpanded ? '✕' : '☰';

    // En pantallas pequeñas, mostrar/ocultar el menú
    if (window.innerWidth <= 960) {
      if (isExpanded) {
        nav.style.display = 'block';
      } else {
        // Retrasar la ocultación para permitir la animación
        setTimeout(() => {
          if (!nav.classList.contains('open')) {
            nav.style.display = 'none';
          }
        }, 300);
      }
    }

    // Allow transitions to complete before accepting new clicks
    setTimeout(() => {
      isTransitioning = false;
    }, 300); // Match with the CSS transition duration
  });

  // Close menu when clicking outside - with performance optimization
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) &&
      !hamburgerBtn.contains(e.target) &&
      nav.classList.contains('open') &&
      !isTransitioning) {

      isTransitioning = true;
      nav.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.innerHTML = '☰';

      // Retrasar la ocultación para permitir la animación
      setTimeout(() => {
        if (!nav.classList.contains('open') && window.innerWidth <= 960) {
          nav.style.display = 'none';
        }
      }, 300);

      setTimeout(() => {
        isTransitioning = false;
      }, 300);
    }
  });
});
