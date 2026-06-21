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
});