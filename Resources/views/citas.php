<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Gestionar Citas</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a>Inicio</a></li>
                    <li class="breadcrumb-item active">Solicitar Cita</li>
                </ol>
            </div>
        </div>
    </div>
</div>

<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="mb-3">
                            <button type="button" class="btn btn-primary w-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Nueva Cita
                            </button>
                        </div>
                        <table id="tblCitas" class="table nowrap table-striped w-100 rounded">
                            <thead class="table-dark text-left">
                                <th class="text-center">Opciones</th>
                                <th>id</th>
                                <th>Especialidad</th>
                                <th>Procedimiento</th>
                                <th>Fecha de la Cita</th>
                                <th>Estatus</th>
                            </thead>
                            <tbody class="small text-light left"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Nueva Cita</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="needs-validation row g-3" method="post" novalidate>
                    <input type="hidden" name="id_usuario" id="id_usuario" value="">
                    <div class="col-lg-4">
                        <label for="especialidad" class="form-label">Especialidad</label>
                        <select class="form-select form-select-sm" id="especialidad" name="especialidad" required>
                            <option selected disabled value="">Seleccione una opcion</option>
                        </select>
                    </div>
                    <div class="col-lg-4">
                        <label for="procedimiento" class="form-label">Procedimiento</label>
                        <select class="form-select form-select-sm" id="procedimiento" name="procedimiento" required>
                            <option selected disabled value="">Seleccione una opcion</option>
                        </select>
                    </div>
                    <div class="col-lg-4">
                        <label for="fecha" class="form-label">Fecha</label>
                        <input type="date" class="form-control form-control-sm" id="fecha" name="fecha" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" id="saveDate" name="saveDate">Guardar</button>
            </div>
        </div>
    </div>
</div>

<script>
    var tblCitas;

    tblCitas = $("#tblCitas").DataTable({
        ajax: {
            async: false,
            url: "Controllers/ContextController.php",
            type: "POST",
            dataSrc: '',
            data: {
                'accion': 4,
                'id_usuario': $("#id_usuario").val(),
            }
        },
        columnDefs: [{
                targets: 0,
                sortable: false,
                render: function(data, type, full, meta) {
                    if (data == 1) {
                        return "<center>" +
                        "<button class='delete btn btn-outline-danger px-1 mx-1' type='button'>" +
                        "<i class='fa-solid fa-trash-can fs-5'></i>" +
                        "</button>" +
                        "</center>"
                    } else {
                        return '';
                    }
                }
            }, {
                targets: 1,
                visible: false
            },
            {
                targets: 5,
                sortable: false,
                render: function(data, type, full, meta) {
                    if (data == 1) {
                        return '<td> Pendiente </td>'
                    } else {
                        return '<td> Atendido </td>'
                    }
                }
            },
        ],
        responsive: {
            details: {
                type: 'column'
            },
        },
        language: {
            "url": "Resources/plugins/datatables/Spanish.json"
        }
    });

    $.ajax({
        url: 'Controllers/ContextController.php',
        type: 'POST',
        data: {
            'accion': 2,
        },
        async: false,
        dataType: 'json',
        success: function(result) {
            var options = '<option selected disabled value="">Seleccione una opcion</option>'
            for (let i = 0; i < result.length; i++) {
                options = options + '<option value="' + result[i]['id'] + '">' + result[i]['descripcion'] + '</option>'
            }
            $("#especialidad").html(options);
        }
    });

    $("#tblCitas tbody").on('click', '.delete', function() {
        var data = tblCitas.row($(this).parents('tr')).data();
        $.ajax({
            url: 'Controllers/ContextController.php',
            type: 'POST',
            data: {
                'accion': 6,
                'id': data['id']
            },
            async: false,
            dataType: 'json',
            success: function(result) {
                if (result == true) {
                    tblCitas.ajax.reload();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Cita eliminada!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: result,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    });

    function obtenerFechaActual() {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate() + 1).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    // Evento para negar fecha inferiores
    var campoFecha = document.getElementById('fecha');
    campoFecha.addEventListener('input', function() {
        const fechaActual = obtenerFechaActual();
        const valorFecha = campoFecha.value;
        if (valorFecha < fechaActual) {
            alert('No se permiten fechas pasadas. Por favor, selecciona una fecha válida.');
            campoFecha.value = fechaActual;
        }
    });

    // Ajustar limites de la fecha
    document.getElementById('fecha').min = obtenerFechaActual();
    document.getElementById('fecha').value = obtenerFechaActual();

    // Evento para ajustar procedimientos de acuerdo a la especialidad
    document.getElementById('especialidad').addEventListener('change', function() {
        $.ajax({
            url: 'Controllers/ContextController.php',
            type: 'POST',
            data: {
                'accion': 3,
                'especialidad': $("#especialidad").val()
            },
            async: false,
            dataType: 'json',
            success: function(result) {
                var options = '<option selected disabled value="">Seleccione una opcion</option>'
                for (let i = 0; i < result.length; i++) {
                    options = options + '<option value="' + result[i]['id'] + '">' + result[i]['descripcion'] + '</option>'
                }
                $("#procedimiento").html(options);
            }
        });
    });

    // Evento para validar formulario y guardar cita
    document.getElementById("saveDate").addEventListener('click', function() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
            if (form.checkValidity() === true) {
                $.ajax({
                    url: "Controllers/ContextController.php",
                    type: "POST",
                    data: {
                        'accion': 5,
                        'id_usuario': $("#id_usuario").val(),
                        'especialidad': $("#especialidad").val(),
                        'procedimiento': $("#procedimiento").val(),
                        'fecha': $("#fecha").val(),
                    },
                    dataType: 'json',
                    success: function(result) {
                        if (result == true) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Cita agendada',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            form.classList.remove('was-validated');
                            tblCitas.ajax.reload();
                            $("#exampleModal").modal('hide');
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: result,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                });
            } else {
                form.classList.add('was-validated');
            }
        });
    });
</script>