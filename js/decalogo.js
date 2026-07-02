document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. LÓGICA DE FILTRADO POR PESTAÑAS (TABS) ---
    const botonesFiltro = document.querySelectorAll('.tab-btn');
    const tarjetas = document.querySelectorAll('.decalogo-card');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Cambiar clase activa en botones
            botonesFiltro.forEach(btn => btn.classList.remove('active'));
            boton.classList.add('active');

            const filtro = boton.getAttribute('data-filter');

            // Mostrar/Ocultar tarjetas con una transición limpia
            tarjetas.forEach(tarjeta => {
                const categoria = tarjeta.getAttribute('data-category');
                
                if (filtro === 'todos' || categoria === filtro) {
                    tarjeta.style.display = 'flex';
                    setTimeout(() => tarjeta.style.opacity = '1', 10);
                } else {
                    tarjeta.style.opacity = '0';
                    tarjeta.style.display = 'none';
                }
            });
        });
    });

    // --- 2. LÓGICA DEL MODAL DE DETALLES ---
    const modal = document.getElementById('decalogo-modal');
    const botonCerrar = document.querySelector('.modal-cerrar');
    
    const modalNumero = document.getElementById('modal-numero');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalCuerpo = document.getElementById('modal-cuerpo');
    const modalBadge = document.getElementById('modal-badge');

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('click', () => {
            // Extraer datos desde la tarjeta html estructurada
            const numero = tarjeta.querySelector('.card-numero').innerText;
            const titulo = tarjeta.querySelector('h3').innerText;
            const detalleHtml = tarjeta.querySelector('.detalle-oculto').innerHTML;
            const badgeTexto = tarjeta.querySelector('.modal-badge, .badge')?.innerText || "Compromiso";

            // Inyectar los datos en el modal
            modalNumero.innerText = numero;
            modalTitulo.innerText = titulo;
            modalCuerpo.innerHTML = detalleHtml;
            modalBadge.innerText = badgeTexto;

            // Abrir modal de forma fluida
            modal.classList.add('open');
        });
    });

    // Cerrar al dar clic en la 'X'
    botonCerrar.addEventListener('click', () => {
        modal.classList.remove('open');
    });

    // Cerrar al hacer clic fuera del cuadro blanco
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });

// ================= LÓGICA DEL LIGHTBOX (AMPLIAR PLANOS/RENDERS) =================
    const zoomableImages = document.querySelectorAll('.zoomable-img');
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxTarget = document.getElementById('lightbox-target');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    if (lightboxOverlay && lightboxTarget && closeLightboxBtn) {
        // Abrir Modal al hacer click en cualquier imagen con la clase zoomable-img
        zoomableImages.forEach(img => {
            img.addEventListener('click', function() {
                lightboxTarget.src = this.src; // Copia la ruta de la imagen clickeada
                lightboxOverlay.classList.remove('hidden'); // Muestra el modal
            });
        });

        // Cerrar Modal con la 'X'
        closeLightboxBtn.addEventListener('click', () => {
            lightboxOverlay.classList.add('hidden');
        });

        // Cerrar Modal haciendo click en el espacio oscuro exterior
        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                lightboxOverlay.classList.add('hidden');
            }
        });
    }

    // ================= CONTROL DEL CARRUSEL MINIMALISTA =================
    const carousel = document.getElementById('project-carousel');
    const btnPrev = document.querySelector('.prev-btn');
    const btnNext = document.querySelector('.next-btn');

    if (carousel && btnPrev && btnNext) {
        btnNext.addEventListener('click', () => {
            carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            carousel.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
        });
    }

});