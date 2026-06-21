document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. FILTRADO CON ANIMACIÓN DE TRANSICIÓN ---
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    const itemsGaleria = document.querySelectorAll('.galeria-item');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            botonesFiltro.forEach(b => b.classList.remove('active'));
            boton.classList.add('active');

            const categoriaObjetivo = boton.getAttribute('data-target');

            itemsGaleria.forEach(item => {
                const categoriaItem = item.getAttribute('data-category');

                if (categoriaObjetivo === 'todas' || categoriaItem === categoriaObjetivo) {
                    item.style.display = 'block';
                    // Pequeño desfase para activar la opacidad con CSS de forma fluida
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 20);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    // Esperar a que acabe la animación para quitar del flujo espacial
                    setTimeout(() => item.style.display = 'none', 400);
                }
            });
        });
    });

    // --- 2. APERTURA Y CARGA DINÁMICA DEL VISOR (LIGHTBOX) ---
    const lightbox = document.getElementById('galeria-lightbox');
    const bCerrar = document.getElementById('galeria-close');
    
    const lImg = document.getElementById('lightbox-img');
    const lCat = document.getElementById('lightbox-cat');
    const lTitulo = document.getElementById('lightbox-titulo');
    const lDesc = document.getElementById('lightbox-desc');
    const lFecha = document.getElementById('lightbox-fecha');

    itemsGaleria.forEach(item => {
        item.addEventListener('click', () => {
            // Extraer metadatos de la tarjeta clicada
            const rutaImagen = item.querySelector('img').getAttribute('src');
            const altTexto = item.querySelector('img').getAttribute('alt');
            const catTexto = item.querySelector('.item-cat').innerText;
            const tituloTexto = item.querySelector('h3').innerText;
            const fechaTexto = item.querySelector('.item-fecha').innerText;

            // Inyectar datos en la ficha técnica del visor
            lImg.setAttribute('src', rutaImagen);
            lImg.setAttribute('alt', altTexto);
            lCat.innerText = catTexto;
            lTitulo.innerText = tituloTexto;
            lDesc.innerText = altTexto; // Usamos el atributo alt como descripción detallada corporativa
            lFecha.innerText = fechaTexto;

            // Lanzar pantalla completa
            lightbox.classList.add('open');
        });
    });

    // Funciones de cierre seguro
    function apagarLightbox() {
        lightbox.classList.remove('open');
    }

    bCerrar.addEventListener('click', apagarLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) apagarLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) apagarLightbox();
    });
});