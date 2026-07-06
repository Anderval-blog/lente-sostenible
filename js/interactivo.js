// js/interactivo.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ================= CREDENCIALES =================
const firebaseConfig = {
  apiKey: "AIzaSyB98XxJ9DvRP-bgejye7tLsG33uUeoCJnc",
  authDomain: "muralsostenible-ucv.firebaseapp.com",
  projectId: "muralsostenible-ucv",
  appId: "1:453117305652:web:08ba92f481772ef2bbbb61"
};

const IMGBB_API_KEY = "df19188813ac0c91aa55eb7a346aa58a";

// Inicialización
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === LÓGICA DIRECTA (Sin envoltorios que retrasen la ejecución) ===

// Referencias UI (Modales, Botones, etc)
const openFormBtn = document.getElementById('open-form-btn');
const closeFormBtn = document.getElementById('close-form-btn');
const uploadModal = document.getElementById('upload-modal-overlay');
const uploadForm = document.getElementById('mural-upload-form');
const fileInput = document.getElementById('action-img');
const fileUploadText = document.getElementById('file-upload-text');
const submitBtn = document.getElementById('submit-form-btn');
const galleryContainer = document.getElementById('mural-gallery-container');
const viewerModal = document.getElementById('viewer-modal-overlay');
const closeViewerBtn = document.getElementById('close-viewer-btn');

// Control de Modales
if(openFormBtn) openFormBtn.addEventListener('click', () => uploadModal.classList.remove('hidden'));
if(closeFormBtn) closeFormBtn.addEventListener('click', () => { uploadModal.classList.add('hidden'); uploadForm.reset(); fileUploadText.textContent = "📸 Seleccionar Fotografía"; });
if(closeViewerBtn) closeViewerBtn.addEventListener('click', () => viewerModal.classList.add('hidden'));

// Cerrar al hacer clic en el fondo oscuro
window.addEventListener('click', (e) => {
    if (e.target === uploadModal) closeFormBtn.click();
    if (e.target === viewerModal) viewerModal.classList.add('hidden');
});

// Cambiar texto al seleccionar foto
if(fileInput) {
    fileInput.addEventListener('change', function() {
        if(this.files && this.files[0]) fileUploadText.textContent = `✓ Archivo Cargado: ${this.files[0].name.substring(0, 20)}...`;
    });
}

// ================= LECTURA DE EVIDENCIAS =================
const q = query(collection(db, "mural"), orderBy("timestamp", "desc"));

onSnapshot(q, (snapshot) => {
    galleryContainer.innerHTML = ''; 
    
    if(snapshot.empty) {
        galleryContainer.innerHTML = `<div class="text-center" style="grid-column: 1/-1; padding: 40px; font-family: var(--font-textos); color: #888; font-style: italic;">El mural se encuentra vacío. Sé la primera persona en exponer su acción sostenible.</div>`;
        return;
    }

    snapshot.forEach((doc) => {
        const data = doc.data();
        const cardEl = document.createElement('div');
        cardEl.classList.add('art-card');
        
        cardEl.innerHTML = `
            <div class="art-card-frame">
                <img src="${data.imageUrl}" alt="${data.title}" loading="lazy">
            </div>
            <div class="art-card-details">
                <h4>${data.title}</h4>
                <span class="art-author-info">Autor: ${data.author}</span>
            </div>
        `;
        cardEl.addEventListener('click', () => abrirVisorHistoria(data));
        galleryContainer.appendChild(cardEl);
    });
});

function abrirVisorHistoria(data) {
    document.getElementById('view-modal-img').src = data.imageUrl;
    document.getElementById('view-modal-title').textContent = data.title;
    document.getElementById('view-modal-author').textContent = `Por: ${data.author}`;
    document.getElementById('view-modal-desc').textContent = data.description;
    
    if(data.timestamp) {
        const date = new Date(data.timestamp);
        document.getElementById('view-modal-date').textContent = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    viewerModal.classList.remove('hidden');
}

// ================= SUBIDA: IMGBB + FIRESTORE =================
if(uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const authorName = document.getElementById('user-name').value.trim();
        const actionTitle = document.getElementById('action-title').value.trim();
        const actionDescription = document.getElementById('action-desc').value.trim();
        const imageFile = fileInput.files[0];

        if(!imageFile) return;

        submitBtn.disabled = true;
        submitBtn.textContent = "Procesando y Subiendo Obra...";

        try {
            // 1. Subir imagen a ImgBB
            const formData = new FormData();
            formData.append('image', imageFile);
            
            const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const imgbbData = await imgbbResponse.json();
            
            if(!imgbbData.success) throw new Error("Fallo al subir a ImgBB");
            
            const imageUrl = imgbbData.data.url;

            // 2. Guardar el texto en Firebase
            await addDoc(collection(db, "mural"), {
                author: authorName,
                title: actionTitle,
                description: actionDescription,
                imageUrl: imageUrl,
                timestamp: Date.now() 
            });

            uploadForm.reset();
            fileUploadText.textContent = "📸 Seleccionar Fotografía de Evidencia";
            uploadModal.classList.add('hidden');
            alert("¡Tu acción sostenible ha sido grabada de forma permanente en la exposición comunitaria!");

        } catch (err) {
            console.error("Error: ", err);
            alert("Ocurrió un inconveniente al procesar tu publicación. Verifica tu conexión.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Publicar en el Mural";
        }
    });
}