// 1. NAVEGACIÓN
let deporteActualFiltro = 'todos';

function cambiarSeccion(idSeccion, elementoBoton = null) {
    document.querySelectorAll('.app-seccion').forEach(sec => sec.classList.remove('activa'));
    document.getElementById('sec-' + idSeccion).classList.add('activa');
    
    document.querySelectorAll('.nav-link-sidebar').forEach(nav => nav.classList.remove('active'));
    if (elementoBoton) elementoBoton.classList.add('active');

    $('#sidebarMenu').removeClass('show');
    $('#overlay').fadeOut(200);
}

// 2. DATA DE DEPORTES
const deportesData = {
    'futbol': { titulo: 'FÚTBOL', icono: '<i class="fas fa-futbol"></i>', desc: 'Nuestras canchas cuentan con césped sintético de última generación, ideal para Fútbol 5, 7 y 11. Iluminación LED y vestuarios.' },
    'futsal': { titulo: 'FUTSAL', icono: '<i class="fas fa-futbol"></i>', desc: 'Canchas techadas con piso de parquet profesional para futsal. Ideal para torneos rápidos y partidos 5v5 sin preocuparse por el clima.' },
    'padel': { titulo: 'PÁDEL', icono: '<i class="fas fa-table-tennis-paddle-ball"></i>', desc: 'Canchas techadas con cristal panorámico. Perfectas para jugar sin importar el clima. Contamos con iluminación profesional.' },
    'basquet': { titulo: 'BÁSQUET', icono: '<i class="fas fa-basketball-ball"></i>', desc: 'Cancha con piso de parquet profesional, aros reglamentarios y graderías. El lugar ideal para torneos 3x3 o 5v5.' },
    'tenis': { titulo: 'TENIS', icono: '<i class="fas fa-baseball-ball"></i>', desc: 'Canchas de arcilla y superficie dura. Mantenimiento diario para un bote perfecto de la pelota.' },
    'voley': { titulo: 'VÓLEY', icono: '<i class="fas fa-volleyball-ball"></i>', desc: 'Canchas de arena fina para vóley playa y canchas techadas para vóley indoor. Redes oficiales.' }
};

function verDeporte(deporte) {
    let data = deportesData[deporte];
    $('#deporteTitulo').text(data.titulo);
    $('#deporteIcono').html(data.icono);
    $('#deporteDesc').text(data.desc);
    deporteActualFiltro = deporte;
    $('#panelDeporte').addClass('show');
    $('#overlay').fadeIn(200);
}

function filtrarYCambiarSeccion() {
    $('#panelDeporte').removeClass('show');
    $('#overlay').fadeOut(200);
    cambiarSeccion('canchas');
    filtrarCanchas(deporteActualFiltro);
}

// 3. LAS CANCHAS CON RUTAS LOCALES A LA CARPETA IMG
const canchasData = [
    // --- FÚTBOL (5) ---
    { id: 'f1', deporte: 'futbol', nombre: 'Fútbol 5 - Cancha 1', tipo: 'SINTÉTICO', precio: 80, img: 'img/futbol1.jpg' },
    { id: 'f2', deporte: 'futbol', nombre: 'Fútbol 5 - Cancha 2', tipo: 'SINTÉTICO', precio: 80, img: 'img/futbol2.jpg' },
    { id: 'f3', deporte: 'futbol', nombre: 'Fútbol 7 - Central', tipo: 'SINTÉTICO', precio: 120, img: 'img/futbol3.jpg' },
    { id: 'f4', deporte: 'futbol', nombre: 'Fútbol 11 - Estadio', tipo: 'CÉSPED', precio: 200, img: 'img/futbol4.jpg' },
    { id: 'f5', deporte: 'futbol', nombre: 'Fútbol 8 - Norte', tipo: 'SINTÉTICO', precio: 150, img: 'img/futbol5.jpg' },
    
    // --- FUTSAL (5) ---
    { id: 'fs1', deporte: 'futsal', nombre: 'Futsal - Parquet 1', tipo: 'PARQUET', precio: 90, img: 'img/futsal1.jpg' },
    { id: 'fs2', deporte: 'futsal', nombre: 'Futsal - Parquet 2', tipo: 'PARQUET', precio: 90, img: 'img/futsal2.jpg' },
    { id: 'fs3', deporte: 'futsal', nombre: 'Futsal - Techada', tipo: 'TECHADA', precio: 100, img: 'img/futsal3.jpg' },
    { id: 'fs4', deporte: 'futsal', nombre: 'Futsal - Central', tipo: 'PARQUET', precio: 110, img: 'img/futsal4.jpg' },
    { id: 'fs5', deporte: 'futsal', nombre: 'Futsal - Sur', tipo: 'SINTÉTICO', precio: 80, img: 'img/futsal5.jpg' },
    
    // --- PÁDEL (4) ---
    { id: 'p1', deporte: 'padel', nombre: 'Pádel - Cristal 1', tipo: 'TECHADA', precio: 90, img: 'img/padel1.jpg' },
    { id: 'p2', deporte: 'padel', nombre: 'Pádel - Cristal 2', tipo: 'TECHADA', precio: 90, img: 'img/padel2.jpg' },
    { id: 'p3', deporte: 'padel', nombre: 'Pádel - Exterior', tipo: 'AIRE LIBRE', precio: 70, img: 'img/padel3.jpg' },
    { id: 'p4', deporte: 'padel', nombre: 'Pádel - VIP', tipo: 'TECHADA VIP', precio: 110, img: 'img/padel4.jpg' },
    
    // --- TENIS (4) ---
    { id: 't1', deporte: 'tenis', nombre: 'Tenis - Arcilla 1', tipo: 'ARCILLA', precio: 80, img: 'img/tenis1.jpg' },
    { id: 't2', deporte: 'tenis', nombre: 'Tenis - Arcilla 2', tipo: 'ARCILLA', precio: 80, img: 'img/tenis2.jpg' },
    { id: 't3', deporte: 'tenis', nombre: 'Tenis - Dura', tipo: 'DURA', precio: 70, img: 'img/tenis3.jpg' },
    { id: 't4', deporte: 'tenis', nombre: 'Tenis - Indoor', tipo: 'TECHADA', precio: 100, img: 'img/tenis4.jpg' },
    
    // --- BÁSQUET (4) ---
    { id: 'b1', deporte: 'basquet', nombre: 'Básquet - Principal', tipo: 'PARQUET', precio: 100, img: 'img/basquet1.jpg' },
    { id: 'b2', deporte: 'basquet', nombre: 'Básquet - Exterior', tipo: 'ASFALTO', precio: 50, img: 'img/basquet2.jpg' },
    { id: 'b3', deporte: 'basquet', nombre: 'Básquet - 3x3', tipo: 'MEDIA CANCHA', precio: 60, img: 'img/basquet3.jpg' },
    { id: 'b4', deporte: 'basquet', nombre: 'Básquet - VIP', tipo: 'TECHADA', precio: 120, img: 'img/basquet4.jpg' },
    
    // --- VÓLEY (4) ---
    { id: 'v1', deporte: 'voley', nombre: 'Vóley - Playa 1', tipo: 'ARENA', precio: 60, img: 'img/voley1.jpg' },
    { id: 'v2', deporte: 'voley', nombre: 'Vóley - Playa 2', tipo: 'ARENA', precio: 60, img: 'img/voley2.jpg' },
    { id: 'v3', deporte: 'voley', nombre: 'Vóley - Indoor', tipo: 'TECHADA', precio: 80, img: 'img/voley3.jpg' },
    { id: 'v4', deporte: 'voley', nombre: 'Vóley - Mixto', tipo: 'TECHADA', precio: 70, img: 'img/voley4.jpg' }
];

function renderizarCanchas(filtro) {
    let html = '';
    canchasData.forEach(c => {
        if (filtro === 'todos' || c.deporte === filtro) {
            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="stadium-card h-100 d-flex flex-column">
                        <div class="img-wrapper">
                            <!-- Aquí se carga la imagen local -->
                            <img src="${c.img}" alt="${c.nombre}" loading="lazy">
                            <span class="tag">${c.tipo}</span>
                        </div>
                        <div class="p-3 d-flex flex-column flex-grow-1">
                            <h5 class="fw-bold mb-2" style="font-family: 'Teko', sans-serif; font-size: 1.4rem;">${c.nombre}</h5>
                            <div class="mt-auto d-flex justify-content-between align-items-center border-top border-secondary pt-3">
                                <span class="text-neon fw-bold">Bs. ${c.precio}/hr</span>
                                <button class="btn btn-neon rounded-0 btn-sm btn-reservar btn-tactil" 
                                        data-nombre="${c.nombre}" 
                                        data-foto="${c.img}">RESERVAR</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    $('#contenedorCanchas').html(html);
}

function filtrarCanchas(deporte) {
    cambiarSeccion('canchas');
    renderizarCanchas(deporte);
}

$(document).ready(function() {
    // 4. ABRIR / CERRAR MENÚS
    $('#btnAbrirMenu').on('click', function() {
        $('#sidebarMenu').addClass('show');
        $('#overlay').fadeIn(200);
    });
    $('#btnCerrarMenu, #btnCerrarDeporte, #overlay').on('click', function() {
        $('#sidebarMenu').removeClass('show');
        $('#panelDeporte').removeClass('show');
        $('#overlay').fadeOut(200);
    });

    // 5. HIDRATACIÓN
    $('#btnHidratar').on('click', function() {
        let $txt = $('#txtHidratacion');
        let $icon = $(this).find('i');
        $txt.text('Sincronizando...');
        $icon.addClass('fa-spin');
        setTimeout(() => {
            $txt.text('✅ Hidratado');
            $icon.removeClass('fa-spin');
            mostrarToast('Datos sincronizados correctamente', 'success');
        }, 1000);
    });

    // 6. MODO CLARO / OSCURO
    let modoGuardado = localStorage.getItem('stadiumModoClaro');
    if (modoGuardado === 'true') {
        document.body.classList.remove('modo-oscuro');
        document.body.classList.add('modo-claro');
        $('#themeBtn').html('<i class="fas fa-moon"></i>');
    }
    $('#themeBtn').off('click').on('click', function() {
        document.body.classList.toggle('modo-claro');
        document.body.classList.toggle('modo-oscuro');
        let esClaro = document.body.classList.contains('modo-claro');
        $(this).html(esClaro ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>');
        localStorage.setItem('stadiumModoClaro', esClaro);
    });

    // 7. INICIALIZAR CANCHAS
    renderizarCanchas('todos');

    // 8. LÓGICA DE RESERVA
    let canchaActual = {};
    let reservaTimerInterval;
    let segundosRestantes = 0;

    $(document).off('click', '.btn-reservar').on('click', '.btn-reservar', function() {
        canchaActual = {
            nombre: $(this).data('nombre'),
            foto: $(this).data('foto')
        };
        $('#modalNombreCancha').text(canchaActual.nombre);
        $('#modalImgCancha').attr('src', canchaActual.foto);
        const modal = new bootstrap.Modal(document.getElementById('modalReserva'));
        modal.show();
    });

    $('#formReserva').off('submit').on('submit', function(e) {
        e.preventDefault();
        let nombreCliente = $('#inputNombre').val().trim();
        if (nombreCliente.length < 3) { $('#errorNombre').text('Nombre inválido').show(); return; }
        $('#errorNombre').hide();

        bootstrap.Modal.getInstance(document.getElementById('modalReserva')).hide();
        $('#formReserva')[0].reset();
        
        cambiarSeccion('mis-reservas');

        $('#reservaNombre').text(canchaActual.nombre);
        $('#reservaCliente').text(nombreCliente);
        $('#reservaFecha').text(`Hoy - ${$('#selectHora').val()}`);
        $('#reservaFoto').attr('src', canchaActual.foto);
        
        $('#vacioReserva').hide();
        $('#detalleReserva').fadeIn(400);

        iniciarTemporizador(3600 * $('#selectHoras').val());
        mostrarToast('Reserva confirmada', 'success');
    });

    function iniciarTemporizador(segundos) {
        if (reservaTimerInterval) clearInterval(reservaTimerInterval);
        segundosRestantes = segundos;
        actualizarReloj();
        reservaTimerInterval = setInterval(() => {
            segundosRestantes--;
            actualizarReloj();
            if (segundosRestantes <= 0) { clearInterval(reservaTimerInterval); finalizarReserva(); }
        }, 1000);
    }

    function actualizarReloj() {
        let h = Math.floor(segundosRestantes / 3600);
        let m = Math.floor((segundosRestantes % 3600) / 60);
        let s = segundosRestantes % 60;
        $('#reservaTimer').text(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    }

    $('#btnCancelarReserva').off('click').on('click', function() {
        if (confirm('¿Cancelar reserva?')) { finalizarReserva(); mostrarToast('Reserva cancelada', 'warning'); }
    });

    function finalizarReserva() {
        if (reservaTimerInterval) clearInterval(reservaTimerInterval);
        $('#detalleReserva').fadeOut(300, function() { $('#vacioReserva').fadeIn(300); });
    }

    function mostrarToast(msg, tipo) {
        let $icon = $('#toastIcon');
        if (tipo === 'success') $icon.attr('class', 'fas fa-check-circle text-neon fs-4');
        else if (tipo === 'warning') $icon.attr('class', 'fas fa-exclamation-triangle text-warning fs-4');
        $('#toastMsg').text(msg);
        $('#toastBox').addClass('show');
        setTimeout(() => { $('#toastBox').removeClass('show'); }, 3000);
    }

    // 9. SERVICE WORKER
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(err => console.log(err)));
    }
});