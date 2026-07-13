document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById('podcast-audio');
    const btnPlayPause = document.getElementById('btn-play-pause');
    const iconPlay = btnPlayPause.querySelector('.icon-play');
    const iconPause = btnPlayPause.querySelector('.icon-pause');
    const progresoContenedor = document.querySelector('.progreso-contenedor');
    const progresoActual = document.getElementById('progreso-actual');
    
    const tiempoActualTxt = document.getElementById('tiempo-actual');
    const tiempoTotalTxt = document.getElementById('tiempo-total');

    // Auxiliar para formatear segundos a formato MM:SS
    function formatearTiempo(segundos) {
        if (isNaN(segundos)) return "00:00";
        const min = Math.floor(segundos / 60);
        const seg = Math.floor(segundos % 60);
        return `${min < 10 ? '0' : ''}${min}:${seg < 10 ? '0' : ''}${seg}`;
    }

    // 1. Cargar duración total inicial cuando el archivo esté listo
    audio.addEventListener('loadedmetadata', () => {
        tiempoTotalTxt.innerText = formatearTiempo(audio.duration);
    });

    // Fallback en caso de que cargue antes del listener
    if (audio.readyState >= 1) {
        tiempoTotalTxt.innerText = formatearTiempo(audio.duration);
    }

    // 2. Alternar Play / Pause
    btnPlayPause.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            iconPlay.classList.add('hidden');
            iconPause.classList.remove('hidden');
        } else {
            audio.pause();
            iconPlay.classList.remove('hidden');
            iconPause.classList.add('hidden');
        }
    });

    // 3. Actualizar barra y marcador conforme avanza la reproducción
    audio.addEventListener('timeupdate', () => {
        const porcentaje = (audio.currentTime / audio.duration) * 100;
        progresoActual.style.width = `${porcentaje}%`;
        tiempoActualTxt.innerText = formatearTiempo(audio.currentTime);
    });

    // 4. Permitir al usuario saltar a cualquier parte haciendo clic en la barra
    progresoContenedor.addEventListener('click', (e) => {
        const anchoContenedor = progresoContenedor.clientWidth;
        const clickX = e.offsetX;
        const duracionTotal = audio.duration;

        if (duracionTotal) {
            audio.currentTime = (clickX / anchoContenedor) * duracionTotal;
        }
    });

    // 5. Restablecer interfaz cuando el audio termine
    audio.addEventListener('ended', () => {
        iconPlay.classList.remove('hidden');
        iconPause.classList.add('hidden');
        progresoActual.style.width = '0%';
        tiempoActualTxt.innerText = "00:00";
    });
});