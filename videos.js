document.addEventListener("DOMContentLoaded", function() {
    const tarjetasVideo = document.querySelectorAll('.video-card');
    const lightbox = document.getElementById('video-lightbox');
    const lightboxIframe = document.getElementById('lightbox-iframe');
    const botonCerrar = document.getElementById('lightbox-close');

    // 1. Al dar clic en cualquier tarjeta, abrir lightbox con su respectivo video
    tarjetasVideo.forEach(tarjeta => {
        tarjeta.addEventListener('click', () => {
            const urlBase = tarjeta.getAttribute('data-video-url');
            
            // Añadimos la bandera para que el video empiece de inmediato al abrirse
            lightboxIframe.setAttribute('src', `${urlBase}?autoplay=1`);
            
            lightbox.classList.add('open');
        });
    });

    // 2. Función dedicada para cerrar el lightbox y apagar el video
    function cerrarReproductor() {
        lightbox.classList.remove('open');
        // Solución de ingeniería: vaciar el src cancela la descarga y detiene el sonido
        lightboxIframe.setAttribute('src', '');
    }

    // Cerrar al dar clic en la equis (X)
    botonCerrar.addEventListener('click', cerrarReproductor);

    // Cerrar si el usuario da clic sobre el fondo oscuro exterior
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            cerrarReproductor();
        }
    });

    // Cerrar de forma accesible presionando la tecla Escape (Esc)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            cerrarReproductor();
        }
    });
});