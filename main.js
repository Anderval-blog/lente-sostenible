document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. LÓGICA DEL HERO (Mantenla tal como está en tu archivo original) ---
    const slides = document.querySelectorAll('.slide');
    let indiceActual = 0;
    function cambiarFondo() {
        slides[indiceActual].classList.remove('active');
        indiceActual = (indiceActual + 1) % slides.length;
        slides[indiceActual].classList.add('active');
    }
    setInterval(cambiarFondo, 6000);

    // --- 2. BASE DE DATOS REAL ONU (17 OBJETIVOS + TARJETA 18) ---
    const objetivosSostenibles = [
        { num: 1, titulo: "Fin de la Pobreza", PG: "Erradicar la pobreza en todas sus formas y en todo el mundo, garantizando el acceso a recursos básicos y sistemas de protección social para los más vulnerables.", Contribucion: "Donar ropa, libros o alimentos en buen estado a organizaciones benéficas, apoyar el comercio justo y participar en voluntariados locales." },
        { num: 2, titulo: "Hambre Cero", PG: "Poner fin al hambre, lograr la seguridad alimentaria, mejorar la nutrición y promover prácticas agrícolas sostenibles que protejan los ecosistemas.", Contribucion: "Evitar el desperdicio de comida en el hogar planificando tus comidas, consumir productos agrícolas locales de temporada y apoyar bancos de alimentos." },
        { num: 3, titulo: "Salud y Bienestar", PG: "Garantizar una vida sana y promover el bienestar de todas las personas en todas las edades como pilar del desarrollo humano.", Contribucion: "Mantener una rutina de ejercicio físico, cuidar activamente tu salud mental, vacunarte a tiempo y promover hábitos de vida saludables en tu familia." },
        { num: 4, titulo: "Educación de Calidad", PG: "Garantizar una educación inclusiva, equitativa y de calidad, promoviendo oportunidades de aprendizaje continuo y permanente para todos.", Contribucion: "Compartir tus conocimientos académicos con compañeros, donar materiales escolares que ya no utilices y apoyar proyectos educativos digitales." },
        { num: 5, titulo: "Igualdad de Género", PG: "Lograr la igualdad entre los géneros y empoderar a todas las mujeres y las niñas, eliminando barreras de discriminación y violencia.", Contribucion: "Fomentar el respeto equitativo en debates escolares, denunciar comentarios o conductas machistas y promover el liderazgo femenino en equipos de trabajo." },
        { num: 6, titulo: "Agua Limpia y Saneamiento", PG: "Garantizar la disponibilidad de agua potable, su gestión sostenible y el acceso a servicios de saneamiento e higiene adecuados para toda la población.", Contribucion: "Reducir el tiempo en la ducha a un máximo de 5 minutos, cerrar el grifo al cepillarte los dientes y reparar inmediatamente fugas de agua en casa." },
        { num: 7, titulo: "Energía Asequible y No Contaminante", PG: "Garantizar el acceso a una energía limpia, asequible, segura, sostenible y moderna, optimizando la eficiencia energética global.", Contribucion: "Apagar luces en habitaciones vacías, utilizar focos LED de bajo consumo y desconectar electrodomésticos o cargadores que no estés utilizando." },
        { num: 8, titulo: "Trabajo Decente y Crecimiento", PG: "Promover el crecimiento económico sostenido, inclusivo y sostenible, el empleo pleno y productivo, y un trabajo digno con salarios justos.", Contribucion: "Consumir y comprar en emprendimientos locales, respetar los derechos de tus colaboradores y capacitarte constantemente en competencias digitales." },
        { num: 9, titulo: "Industria, Innovación e Infraestructura", PG: "Desarrollar infraestructuras resilientes y sostenibles, promover la industrialización inclusiva y fomentar la investigación y la innovación tecnológica.", Contribucion: "Prolongar la vida útil de tus dispositivos electrónicos antes de cambiarlos, apoyar proyectos de software libre e idear soluciones técnicas eficientes." },
        { num: 10, titulo: "Reducción de las Desigualdades", PG: "Reducir la desigualdad en los países y entre ellos, garantizando que los sectores sociales marginados tengan voz y oportunidades equitativas.", Contribucion: "Fomentar la empatía en tu entorno virtual y presencial, apoyar a grupos vulnerables y rechazar activamente cualquier acto de discriminación o racismo." },
        { num: 11, titulo: "Ciudades y Comunidades Sostenibles", PG: "Lograr que las ciudades y los asentamientos humanos sean inclusivos, seguros, resilientes y sostenibles frente al crecimiento demográfico.", Contribucion: "Priorizar las caminatas, el uso de bicicletas o el transporte público para ir a clases, y cuidar los parques o espacios verdes urbanos." },
        { num: 12, titulo: "Producción y Consumo Responsables", PG: "Garantizar modalidades de consumo y producción sostenibles que reduzcan la huella ecológica mediante el uso eficiente de recursos naturales.", Contribucion: "Aplicar estrictamente la regla de las 3R (Reducir, Reutilizar, Reciclar), evitar plásticos de un solo uso y elegir productos con empaques biodegradables." },
        { num: 13, titulo: "Acción por el Clima", PG: "Adoptar medidas urgentes y colectivas para combatir el cambio climático, mitigar las emisiones de gases de efecto invernadero y adaptarse a sus impactos.", Contribucion: "Plantar árboles o vegetación nativa en tu jardín, disminuir tu huella de carbono digital y educar a tus amigos sobre las causas del calentamiento global." },
        { num: 14, titulo: "Vida Submarina", PG: "Conservar y utilizar de manera sostenible los océanos, los mares y los recursos marinos para garantizar la biodiversidad y el equilibrio del planeta.", Contribucion: "Evitar tirar residuos en playas o ríos, erradicar la compra de productos plásticos desechables y consumir pescados de fuentes sustentables." },
        { num: 15, titulo: "Vida de Ecosistemas Terrestres", PG: "Proteger, restablecer y promover el uso sostenible de los ecosistemas terrestres, combatir la desertificación y detener la pérdida de biodiversidad.", Contribucion: "Reciclar papel y cartón al máximo, priorizar el uso de apuntes digitales y no adquirir productos elaborados a partir de especies de flora o fauna protegidas." },
        { num: 16, titulo: "Paz, Justicia e Instituciones Sólidas", PG: "Promover sociedades pacíficas e inclusivas para el desarrollo sostenible, facilitar el acceso a la justicia y construir instituciones transparentes.", Contribucion: "Resolver conflictos interpersonales mediante el diálogo pacífico, informarte críticamente antes de votar y exigir transparencia en tu entorno estudiantil." },
        { num: 17, titulo: "Alianzas para lograr los Objetivos", PG: "Fortalecer los medios de implementación y revitalizar la Alianza Mundial para el Desarrollo Sostenible uniendo a gobiernos, empresas y ciudadanos.", Contribucion: "Colaborar de forma activa en proyectos comunitarios o ambientales escolares y difundir las metas de la Agenda 2030 en tus redes sociales." },
        { num: 18, titulo: "Agenda 2030 • Marco Global", PG: "El plan de acción global unificado e histórico adoptado por los 193 Estados Miembros de la ONU para proteger el planeta y asegurar la prosperidad humana.", Contribucion: "Adoptar un estilo de vida consciente, integrar pequeños hábitos sostenibles diariamente y ser un agente de cambio proactivo en tu localidad." }
    ];

    // --- 3. GENERACIÓN DINÁMICA DE LAS 18 CUADRÍCULAS ---
    const contenedorGrid = document.getElementById('ods-grid');

    objetivosSostenibles.forEach(ods => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('ods-card');
        tarjeta.style.cursor = 'pointer';
        
        // Inyección de nuevos atributos basados en tu solicitud
        tarjeta.setAttribute('data-num', ods.num);
        tarjeta.setAttribute('data-titulo', ods.titulo);
        tarjeta.setAttribute('data-pg', ods.PG);
        tarjeta.setAttribute('data-contribucion', ods.Contribucion);
        
        const rutaImagen = ods.num === 18 ? `assets/ods-logo.jpg` : `assets/ods-${ods.num}.jpg`;
        tarjeta.setAttribute('data-img', rutaImagen);

        tarjeta.innerHTML = `
            <img 
                src="${rutaImagen}" 
                alt="${ods.titulo}" 
                class="ods-icono"
                onerror="this.src='https://via.placeholder.com/400x400?text=${encodeURIComponent(ods.titulo)}'"
            >
        `;
        contenedorGrid.appendChild(tarjeta);
    });

    // --- 4. CONTROL INTERACTIVO DINÁMICO DEL MODAL ---
    const lightbox = document.getElementById('ods-lightbox');
    const botonCerrar = document.getElementById('ods-close');

    const mImg = document.getElementById('modal-ods-img');
    const mBadge = document.getElementById('modal-ods-badge');
    const mTitulo = document.getElementById('modal-ods-titulo');
    const mPG = document.getElementById('modal-ods-pg');
    const mContribucion = document.getElementById('modal-ods-contribucion');
    const mMediaContainer = document.querySelector('.ods-modal-media');

    const coloresODS = {
    1: "#e81f2d", // Fin de la Pobreza
    2: "#d09f2d", // Hambre Cero
    3: "#2b9b4a", // Salud y Bienestar
    4: "#c42738", // Educación de Calidad
    5: "#ed422b", // Igualdad de Género
    6: "#00acd8", // Agua Limpia y Saneamiento
    7: "#fbb617", // Energía Asequible y No Contaminante
    8: "#972e47", // Trabajo Decente y Crecimiento
    9: "#f16e25", // Industria, Innovación e Infraestructura
    10: "#de1c84", // Reducción de las Desigualdades
    11: "#f79c26", // Ciudades y Comunidades Sostenibles
    12: "#cd8c2e", // Producción y Consumo Responsables
    13: "#4e7a47", // Acción por el Clima
    14: "#007cbb", // Vida Submarina
    15: "#3dae4a", // Vida de Ecosistemas Terrestres
    16: "#00578b", // Paz, Justicia e Instituciones Sólidas
    17: "#183668", // Alianzas para los Objetivos
    18: "#ffffff"  // Agenda 2030 (Logo General - Fondo blanco para mayor limpieza)
};

    contenedorGrid.addEventListener('click', function(e) {
        const tarjetaClicada = e.target.closest('.ods-card');
        if (!tarjetaClicada) return;

        const num = parseInt(tarjetaClicada.getAttribute('data-num'));
        const titulo = tarjetaClicada.getAttribute('data-titulo');
        const pg = tarjetaClicada.getAttribute('data-pg');
        const contribucion = tarjetaClicada.getAttribute('data-contribucion');
        const rutaImg = tarjetaClicada.getAttribute('data-img');

        mImg.setAttribute('src', rutaImg);
        mImg.setAttribute('alt', titulo);
        
        mBadge.innerText = num === 18 ? "Naciones Unidas" : `Objetivo ${String(num).padStart(2, '0')}`;
        mTitulo.innerText = titulo;
        
        // Mapeo exacto a las nuevas variables
        mPG.innerText = pg;
        mContribucion.innerText = contribucion;

        // --- NUEVO: APLICAR COLOR DE FONDO DINÁMICO ---
        const colorFondo = coloresODS[num] || "#FFFFFF"; // Blanco por defecto si no se encuentra
        mMediaContainer.style.backgroundColor = colorFondo;

        lightbox.classList.add('open');
    });

    function cerrarModal() {
        lightbox.classList.remove('open');
    }

    botonCerrar.addEventListener('click', cerrarModal);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) cerrarModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) cerrarModal();
    });
  
    
    
});