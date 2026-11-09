$(document).ready(function () {

    // 1. RELOJ
    function actualizarReloj() {
        const ahora = new Date();
        const horas = String(ahora.getHours()).padStart(2, '0');
        const minutos = String(ahora.getMinutes()).padStart(2, '0');
        $('#liveTime').text(`${horas}:${minutos}`);
        const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        $('#liveDate').text(`${dias[ahora.getDay()]}, ${ahora.getDate()} ${meses[ahora.getMonth()]} ${ahora.getFullYear()}`);
    }
    actualizarReloj(); setInterval(actualizarReloj, 1000);

    // 2. CARRUSEL
    const $slides = $('.carousel-slide');
    const $dots = $('.carousel-indicators .dot');
    let slideActual = 0;
    let carouselInterval;

    function mostrarSlide(indice) {
        if (indice < 0) slideActual = $slides.length - 1;
        else if (indice >= $slides.length) slideActual = 0;
        else slideActual = indice;
        $slides.removeClass('active').eq(slideActual).addClass('active');
        $dots.removeClass('active').eq(slideActual).addClass('active');
    }

    $('#nextSlide').on('click', function () { mostrarSlide(slideActual + 1); iniciarAutoplay(); });
    $('#prevSlide').on('click', function () { mostrarSlide(slideActual - 1); iniciarAutoplay(); });
    $dots.on('click', function () { mostrarSlide(parseInt($(this).data('index'))); iniciarAutoplay(); });

    function iniciarAutoplay() { detenerAutoplay(); carouselInterval = setInterval(() => mostrarSlide(slideActual + 1), 5000); }
    function detenerAutoplay() { if (carouselInterval) clearInterval(carouselInterval); }

    $('.carousel-container').hover(detenerAutoplay, iniciarAutoplay);
    iniciarAutoplay();

    // 3. CATEGORÍAS Y FONDOS
    $('.cat-btn').on('click', function () {
        const categoria = $(this).data('category');
        $('.cat-btn').removeClass('active');
        $(this).addClass('active');
        $('body').removeClass('theme-futbol theme-basquet theme-voley theme-snacks').addClass('theme-' + categoria);
        $('.bg-layer').removeClass('active');
        $('.bg-' + categoria).addClass('active');
        $('.category-panel').removeClass('active').hide();
        $('#panel-' + categoria).fadeIn(350).addClass('active');
        $(this).find('.cat-arrow').css('transform', 'rotate(180deg)');
        setTimeout(() => $('.cat-arrow').css('transform', 'rotate(0deg)'), 300);
    });

    // 4. COLAPSAR PANEL
    $('.panel-toggle-btn').on('click', function () {
        const $panel = $(this).closest('.category-panel');
        const $grid = $panel.find('.cards-grid');
        $grid.slideToggle(300, function () {
            $(this).closest('.panel-header').find('.toggle-chevron').toggleClass('collapsed', !$grid.is(':visible'));
        });
    });

    // 5. MODAL
    let equipoSeleccionado = '';
    let tarifaPorHora = 80;
    let horasSeleccionadas = 1;
    let modalTimerInterval, tiempoModalRestante = 1798;
    let $tarjetaSeleccionada = null;

    $(document).on('click', '.btn-reservar:not(.btn-disabled):not(.btn-snack)', function () {
        $tarjetaSeleccionada = $(this).closest('.equipment-card');
        equipoSeleccionado = $(this).data('equipo');
        tarifaPorHora = parseInt($(this).data('tarifa')) || 80;
        $('#modalEquipoNombre').text(equipoSeleccionado);
        $('#hourPrice1').text(`Bs. ${tarifaPorHora * 1}`);
        $('#hourPrice2').text(`Bs. ${tarifaPorHora * 2}`);
        $('#hourPrice3').text(`Bs. ${tarifaPorHora * 3}`);
        horasSeleccionadas = 1;
        $('.hour-btn').removeClass('active'); $('.hour-btn[data-hours="1"]').addClass('active');
        $('#inputNombre, #inputCI, #inputUsuario').val('');
        iniciarContadorModal();
        $('#modalOverlay').css('display', 'flex').hide().fadeIn(250).addClass('open');
    });

    $('.hour-btn').on('click', function () {
        $('.hour-btn').removeClass('active'); $(this).addClass('active');
        horasSeleccionadas = parseInt($(this).data('hours'));
    });

    function cerrarModal() { detenerContadorModal(); $('#modalOverlay').fadeOut(200, function () { $(this).removeClass('open'); }); }
    $('#btnCerrarModal, #btnModalCancelar').on('click', cerrarModal);
    $('#modalOverlay').on('click', function (e) { if ($(e.target).is('#modalOverlay')) cerrarModal(); });

    function iniciarContadorModal() {
        detenerContadorModal(); tiempoModalRestante = 1798; actualizarTextoContador();
        modalTimerInterval = setInterval(() => {
            tiempoModalRestante--; actualizarTextoContador();
            if (tiempoModalRestante <= 0) { detenerContadorModal(); cerrarModal(); mostrarToast('Tiempo de pago expirado.', 'error'); }
        }, 1000);
    }
    function actualizarTextoContador() {
        $('#modalCountdown').text(`${String(Math.floor(tiempoModalRestante / 60)).padStart(2, '0')}:${String(tiempoModalRestante % 60).padStart(2, '0')}`);
    }
    function detenerContadorModal() { if (modalTimerInterval) clearInterval(modalTimerInterval); }

    // 6. CONFIRMAR PAGO
    let sesionTimer, tiempoSesion = 0;

    $('#btnModalConfirmar').on('click', function () {
        const nombre = $('#inputNombre').val().trim(), ci = $('#inputCI').val().trim();
        let usuario = $('#inputUsuario').val().trim();
        if (!nombre || !ci || !usuario) { mostrarToast('Completa todos tus datos.', 'warning'); return; }
        if (!usuario.startsWith('@')) usuario = '@' + usuario;

        cerrarModal();
        if ($tarjetaSeleccionada) {
            $tarjetaSeleccionada.find('.card-status').removeClass('status-available').addClass('status-occupied').html('<span class="status-dot"></span><span>Ocupado por ti</span>');
            $tarjetaSeleccionada.find('.btn-reservar').addClass('btn-disabled').prop('disabled', true).text('En Uso');
        }
        $('#equipoReservado').text(equipoSeleccionado);
        $('#usuarioReservado').text(usuario);
        $('#reservaActiva').slideDown();
        tiempoSesion = horasSeleccionadas * 3600;
        iniciarSesionTimer();
        $('.step-item').removeClass('active'); $('.step-item.step-3, .step-item.step-4').addClass('active');
        mostrarToast(`¡Reserva confirmada! ${equipoSeleccionado} por ${horasSeleccionadas}h (Bs. ${tarifaPorHora * horasSeleccionadas}).`, 'success');
    });

    function iniciarSesionTimer() {
        if (sesionTimer) clearInterval(sesionTimer);
        actualizarTextoSesion();
        sesionTimer = setInterval(() => {
            tiempoSesion--; actualizarTextoSesion();
            if (tiempoSesion <= 0) { clearInterval(sesionTimer); $('#reservaActiva').slideUp(); mostrarToast('Tiempo de juego finalizado.', 'warning'); }
        }, 1000);
    }
    function actualizarTextoSesion() {
        $('#tiempoReserva').text(`${String(Math.floor(tiempoSesion / 3600)).padStart(2, '0')}:${String(Math.floor((tiempoSesion % 3600) / 60)).padStart(2, '0')}:${String(tiempoSesion % 60).padStart(2, '0')}`);
    }

    $('#btnFinalizarReserva').on('click', function () {
        if (confirm('¿Liberar cancha?')) {
            if (sesionTimer) clearInterval(sesionTimer);
            $('#reservaActiva').slideUp();
            if ($tarjetaSeleccionada) {
                $tarjetaSeleccionada.find('.card-status').removeClass('status-occupied').addClass('status-available').html('<span class="status-dot"></span><span>Disponible</span>');
                $tarjetaSeleccionada.find('.btn-reservar').removeClass('btn-disabled').prop('disabled', false).text('Reservar');
            }
            mostrarToast('Cancha liberada.', 'info');
        }
    });

    // 7. SNACKS
    $(document).on('click', '.btn-snack', function () {
        const item = $(this).data('item'), precio = $(this).data('precio');
        $(this).css('transform', 'scale(0.95)');
        setTimeout(() => $(this).css('transform', ''), 150);
        mostrarToast(`Orden recibida: ${item} (Bs. ${precio}).`, 'success');
    });

    // 8. TOAST
    let toastTimeout;
    function mostrarToast(msg, tipo = 'success') {
        const $toast = $('#toastNotification'), $icon = $toast.find('.toast-icon');
        if (tipo === 'success') { $icon.html('<i class="fa-solid fa-circle-check" style="color: #22c55e;"></i>'); $toast.css('border-left-color', '#22c55e'); }
        else if (tipo === 'warning') { $icon.html('<i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b;"></i>'); $toast.css('border-left-color', '#f59e0b'); }
        else if (tipo === 'error') { $icon.html('<i class="fa-solid fa-circle-xmark" style="color: #ef4444;"></i>'); $toast.css('border-left-color', '#ef4444'); }
        else { $icon.html('<i class="fa-solid fa-circle-info" style="color: #38bdf8;"></i>'); $toast.css('border-left-color', '#38bdf8'); }
        $('#toastMessage').text(msg); clearTimeout(toastTimeout); $toast.stop(true, true).fadeIn(300);
        toastTimeout = setTimeout(() => $toast.fadeOut(400), 4000);
    }

    // 9. NAVEGACIÓN SUAVE
    $('.header-nav a').on('click', function (e) {
        $('.header-nav a').removeClass('active'); $(this).addClass('active');
        const href = $(this).attr('href');
        if (href.startsWith('#')) {
            const $target = $(href);
            if ($target.length) {
                e.preventDefault();
                $('html, body').animate({ scrollTop: $target.offset().top - 80 }, 500);
                if (href === '#snacks') $('.cat-btn[data-category="snacks"]').trigger('click');
                else if (href === '#equipos') $('.cat-btn[data-category="futbol"]').trigger('click');
            }
        }
    });

});