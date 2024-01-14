<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Gestionar Usuarios</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a>Inicio</a></li>
                    <li class="breadcrumb-item active">Gestionar Usuarios</li>
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
                            <button type="button" class="mdlUser btn btn-primary w-auto">
                                Nueva Usuario
                            </button>
                        </div>
                        <table id="tblUsuarios" class="table nowrap table-striped w-100 rounded">
                            <thead class="table-dark text-left">
                                <th class="text-center">Opciones</th>
                                <th>id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Estatus</th>
                                <th>Tipo</th>
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
                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="needs-validation row g-3" method="post" novalidate>
                    <form class="needs-validation row g-3" method="post" action="Controllers/RegisterController.php" novalidate>
                        <div class="row g-3 mb-3 text-center">
                            <div class="col-6 form-check">
                                <input class="form-check-input" type="radio" name="loginType" id="chkUser1" value="1" checked>
                                <label class="form-check-label" for="chkUser1">
                                    Doctor
                                </label>
                            </div>
                            <div class="col-6 form-check">
                                <input class="form-check-input" type="radio" name="loginType" id="chkUser2" value="2" disabled>
                                <label class="form-check-label" for="chkUser2">
                                    Paciente
                                </label>
                            </div>
                        </div>
                        <div class="col-6">
                            <label for="firtsName" class="form-label">Nombre</label>
                            <input type="text" maxlength="15" class="form-control form-control-sm text-capitalize" id="firtsName" name="firtsName" placeholder="Nombre" required>
                        </div>
                        <div class="col-6">
                            <label for="lastName" class="form-label">Apellido</label>
                            <input type="text" maxlength="15" class="form-control form-control-sm text-capitalize" id="lastName" name="lastName" placeholder="Apellido" required>
                        </div>
                        <div class="col-6">
                            <label for="selDoc" class="form-label">Cédula</label>
                            <div class="row g-3 align-items-center">
                                <select class="form-select form-select-sm mx-2" aria-label=".form-select-sm example" style="width: 20%;" id="selDoc" name="selDoc">
                                    <option value="V">V</option>
                                    <option value="E">E</option>
                                    <option value="P">P</option>
                                </select>
                                <input type="text" minlength="6" maxlength="8" class="form-control form-control-sm" style="width: 70%;" id="cedula" name="cedula" required>
                            </div>
                        </div>
                        <div class="col-6">
                            <label for="phone" class="form-label">Teléfono</label>
                            <input type="tel" minlength="12" maxlength="14" class="form-control form-control-sm" id="phone" name="phone" placeholder="Telefono" pattern="[0-9\+]+" required>
                        </div>
                        <div class="col-6">
                            <label for="fech_nac" class="form-label">Fecha de Nacimiento</label>
                            <input type="date" class="form-control form-control-sm" id="fech_nac" name="fech_nac" placeholder="Telefono" required>
                        </div>
                        <div class="col-6">
                            <label for="email" class="form-label">Correo Electrónico</label>
                            <input type="email" maxlength="50" class="form-control form-control-sm" id="email" name="email" placeholder="name@example.com" required>
                        </div>
                        <div class="col-12">
                            <label for="address" class="form-label">Dirección</label>
                            <textarea class="form-control form-control-sm" maxlength="150" rows="3" id="address" name="address" placeholder="Direccion" required></textarea>
                        </div>
                        <div class="col-lg-6">
                            <label for="especialidad" class="form-label">Especialidad</label>
                            <select class="form-select form-select-sm" id="especialidad" name="especialidad" required>
                                <option selected disabled value="">Seleccione una opcion</option>
                            </select>
                        </div>
                        <div class="col-lg-6">
                            <label for="procedimiento" class="form-label">Procedimiento</label>
                            <select class="form-select form-select-sm" id="procedimiento" name="procedimiento" required>
                                <option selected disabled value="">Seleccione una opcion</option>
                            </select>
                        </div>
                    </form>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" id="saveUser" name="saveUser">Guardar</button>
            </div>
        </div>
    </div>
</div>

<script>
    var fechaActual = new Date();
    var fechaLimite = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() - 1);
    var fechaLimiteISO = fechaLimite.toISOString().split('T')[0];
    var inputFechaNacimiento = document.getElementById('fech_nac').max = fechaLimiteISO;

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

    var tblUsuarios = $("#tblUsuarios").DataTable({
        ajax: {
            async: false,
            url: "Controllers/ContextController.php",
            type: "POST",
            dataSrc: '',
            data: {
                'accion': 7,
            }
        },
        columnDefs: [{
                targets: 0,
                sortable: false,
                render: function(data, type, full, meta) {
                    return "<center>" +
                        "<button class='delete btn btn-outline-danger px-1 mx-1' type='button'>" +
                        "<i class='fa-solid fa-trash-can fs-5'></i>" +
                        "</button>" +
                        "</center>"
                }
            },
            {
                targets: 1,
                visible: false
            },
            {
                targets: 4,
                sortable: false,
                render: function(data, type, full, meta) {
                    if (data == 1) {
                        return 'Activo'
                    } else {
                        return 'Suspendido'
                    }
                }
            },
            {
                targets: 5,
                sortable: false,
                render: function(data, type, full, meta) {
                    if (data == 1) {
                        return 'Doctor'
                    } else if (data == 2) {
                        return 'Paciente'
                    } else {
                        return 'Admin'
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

    $(".mdlUser").on('click', function() {
        $("#firtsName").val('');
        $("#lastName").val('');
        $("#selDoc").val('V');
        $("#cedula").val('');
        $("#phone").val('');
        $("#fech_nac").val('');
        $("#email").val('');
        $("#address").val('');
        $("#especialidad").val('');
        $("#procedimiento").val('');
        $("#exampleModal").modal('show');
    });

    $("#tblUsuarios tbody").on('click', '.delete', function() {
        var data = tblUsuarios.row($(this).parents('tr')).data();
        $.ajax({
            url: 'Controllers/ContextController.php',
            type: 'POST',
            data: {
                'accion': 8,
                'id': data['id'],
                'tipo': data['tipo']
            },
            async: false,
            dataType: 'json',
            success: function(result) {
                if (result == true) {
                    tblUsuarios.ajax.reload();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario eliminado!',
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

    document.getElementById('selDoc').addEventListener('change', function() {
        if (document.getElementById('selDoc').value == 'P') {
            document.getElementById('cedula').value = '';
            document.getElementById('cedula').maxLength = 20;
        } else {
            document.getElementById('cedula').value = '';
            document.getElementById('cedula').maxLength = 8;
        }
    });

    document.getElementById('phone').addEventListener('input', function(event) {
        var inputValue = event.target.value;
        var numericValue = inputValue.replace(/[^0-9+]/g, '');
        event.target.value = numericValue;
    });

    document.getElementById('cedula').addEventListener('input', function(event) {
        var inputValue = event.target.value;
        var numericValue = inputValue.replace(/[^0-9]/g, '');
        event.target.value = numericValue;
    });

    document.getElementById('saveUser').addEventListener('click', function() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
            if (form.checkValidity() === true) {
                $.ajax({
                    url: "Controllers/RegisterController.php",
                    type: "POST",
                    data: {
                        'accion': 2,
                        'firtsName': $("#firtsName").val(),
                        'lastName': $("#lastName").val(),
                        'cedula': $("#selDoc").val() + '-' + $("#cedula").val(),
                        'phone': $("#phone").val(),
                        'fech_nac': $("#fech_nac").val(),
                        'email': $("#email").val(),
                        'address': $("#address").val(),
                        'especialidad': $("#especialidad").val(),
                        'procedimiento': $("#procedimiento").val()
                    },
                    dataType: 'json',
                    success: function(result) {
                        if (result['result'] == true) {
                            Swal.fire({
                                icon: 'success',
                                title: "Usuario creado con exito!",
                                text: "La contraseña es: " + result['password'],
                            });
                            form.classList.remove('was-validated');
                            tblUsuarios.ajax.reload();
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