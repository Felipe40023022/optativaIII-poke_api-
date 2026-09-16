const API_URL = '/api/pokemon';

const grid = document.getElementById('pokemon-grid');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('modal');
const detailModal = document.getElementById('detail-modal');
const form = document.getElementById('pokemon-form');
const btnOpenModal = document.getElementById('btn-open-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCloseDetail = document.getElementById('btn-close-detail');

let allPokemons = [];

// Cargar Pokémon desde la API
async function loadPokemons() {
    try {
        const res = await fetch(API_URL);
        allPokemons = await res.json();
        renderPokemons(allPokemons);
    } catch (err) {
        console.error("Error al cargar Pokémon:", err);
    }
}

// Renderizar tarjetas en el DOM
function renderPokemons(list) {
    grid.innerHTML = '';
    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${p.foto}" alt="${p.nombre}" class="card-img" onclick="openDetailModal(${p.id})" onerror="this.src='https://via.placeholder.com/120?text=No+Image'">
            <div class="card-id">#${String(p.id).padStart(3, '0')}</div>
            <h3 class="card-title">${p.nombre}</h3>
            
            <div class="stats-container">
                <div class="stat-item">PS <strong>${p.estadisticas.ps}</strong></div>
                <div class="stat-item">Ataque <strong>${p.estadisticas.ataque}</strong></div>
                <div class="stat-item">Defensa <strong>${p.estadisticas.defensa}</strong></div>
                <div class="stat-item">At. Esp. <strong>${p.estadisticas.ataque_especial}</strong></div>
                <div class="stat-item">Def. Esp. <strong>${p.estadisticas.defensa_especial}</strong></div>
                <div class="stat-item">Velocidad <strong>${p.estadisticas.velocidad}</strong></div>
            </div>

            <div class="card-actions">
                <button class="btn btn-primary" onclick="openDetailModal(${p.id})" style="flex: 1;">Ver Carta</button>
                <button class="btn btn-secondary" onclick="openEditModal(${p.id})">Editar</button>
                <button class="btn btn-danger" onclick="deletePokemon(${p.id})">Eliminar</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Abrir Carta Ampliada con los poderes
window.openDetailModal = (id) => {
    const p = allPokemons.find(item => item.id === id);
    if (!p) return;

    document.getElementById('detail-id').innerText = `#${String(p.id).padStart(3, '0')}`;
    document.getElementById('detail-nombre').innerText = p.nombre;
    document.getElementById('detail-foto').src = p.foto;

    const powersContainer = document.getElementById('detail-powers');
    
    // Mapeo de estadísticas con colores para las barras de poder
    const statsConfig = [
        { label: 'Salud (PS)', val: p.estadisticas.ps, color: 'linear-gradient(90deg, #ef4444, #f87171)' },
        { label: 'Ataque', val: p.estadisticas.ataque, color: 'linear-gradient(90deg, #f97316, #fb923c)' },
        { label: 'Defensa', val: p.estadisticas.defensa, color: 'linear-gradient(90deg, #eab308, #fde047)' },
        { label: 'Ataque Especial', val: p.estadisticas.ataque_especial, color: 'linear-gradient(90deg, #3b82f6, #60a5fa)' },
        { label: 'Defensa Especial', val: p.estadisticas.defensa_especial, color: 'linear-gradient(90deg, #10b981, #34d399)' },
        { label: 'Velocidad', val: p.estadisticas.velocidad, color: 'linear-gradient(90deg, #ec4899, #f472b6)' }
    ];

    powersContainer.innerHTML = statsConfig.map(stat => {
        // Porcentaje calculado relativo a una base de 180
        const percentage = Math.min(100, Math.round((stat.val / 180) * 100));
        return `
            <div class="power-bar-container">
                <div class="power-label">
                    <span>${stat.label}</span>
                    <strong>${stat.val} Puntos</strong>
                </div>
                <div class="power-bar">
                    <div class="power-fill" style="width: ${percentage}%; background: ${stat.color};"></div>
                </div>
            </div>
        `;
    }).join('');

    detailModal.classList.remove('hidden');
};

// Búsqueda en tiempo real
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allPokemons.filter(p => 
        p.nombre.toLowerCase().includes(query) || p.id.toString().includes(query)
    );
    renderPokemons(filtered);
});

// Guardar o Actualizar
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mode = document.getElementById('form-mode').value;
    const id = parseInt(document.getElementById('id').value);

    const payload = {
        id: id,
        nombre: document.getElementById('nombre').value,
        foto: document.getElementById('foto').value,
        estadisticas: {
            ps: parseInt(document.getElementById('ps').value),
            ataque: parseInt(document.getElementById('ataque').value),
            defensa: parseInt(document.getElementById('defensa').value),
            ataque_especial: parseInt(document.getElementById('ataque_especial').value),
            defensa_especial: parseInt(document.getElementById('defensa_especial').value),
            velocidad: parseInt(document.getElementById('velocidad').value)
        }
    };

    try {
        let res;
        if (mode === 'create') {
            res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        if (!res.ok) {
            const errData = await res.json();
            alert(errData.mensaje || 'Error al procesar la solicitud');
            return;
        }

        closeModal();
        loadPokemons();
    } catch (err) {
        console.error("Error al guardar:", err);
    }
});

// Abrir modal para Editar
window.openEditModal = (id) => {
    const p = allPokemons.find(item => item.id === id);
    if (!p) return;

    document.getElementById('modal-title').innerText = 'Editar Pokémon';
    document.getElementById('form-mode').value = 'edit';
    
    const idInput = document.getElementById('id');
    idInput.value = p.id;
    idInput.disabled = true;

    document.getElementById('nombre').value = p.nombre;
    document.getElementById('foto').value = p.foto;
    document.getElementById('ps').value = p.estadisticas.ps;
    document.getElementById('ataque').value = p.estadisticas.ataque;
    document.getElementById('defensa').value = p.estadisticas.defensa;
    document.getElementById('ataque_especial').value = p.estadisticas.ataque_especial;
    document.getElementById('defensa_especial').value = p.estadisticas.defensa_especial;
    document.getElementById('velocidad').value = p.estadisticas.velocidad;

    modal.classList.remove('hidden');
};

// Eliminar Pokémon
window.deletePokemon = async (id) => {
    if (!confirm(`¿Eliminar al Pokémon con ID ${id}?`)) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
            loadPokemons();
        } else {
            const errData = await res.json();
            alert(errData.mensaje);
        }
    } catch (err) {
        console.error("Error al eliminar:", err);
    }
};

// Control de Modales
btnOpenModal.onclick = () => {
    form.reset();
    document.getElementById('form-mode').value = 'create';
    document.getElementById('id').disabled = false;
    document.getElementById('modal-title').innerText = 'Registrar Pokémon';
    modal.classList.remove('hidden');
};

const closeModal = () => modal.classList.add('hidden');
const closeDetailModal = () => detailModal.classList.add('hidden');

btnCloseModal.onclick = closeModal;
btnCloseDetail.onclick = closeDetailModal;

modal.querySelector('.modal-content').addEventListener('click', (event) => {
    event.stopPropagation();
});

window.onclick = (e) => { 
    if (e.target === modal) closeModal(); 
    if (e.target === detailModal) closeDetailModal();
};

// Inicio
loadPokemons();