<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Gestionar Citas</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a>Inicio</a></li>
                    <li class="breadcrumb-item active">Gestionar Citas</li>
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
                    <div class="card-header bg-dark">
                        Criterios de Búsqueda
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool text-secondary" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-12 d-lg-flex">
                                <div style="width: 20%;" class="form-floating mx-1">
                                    <input type="text" class="form-control" id="critName" name="critName" data-index="2">
                                    <label for="critName">Nombre</label>
                                </div>
                                <div style="width: 20%;" class="form-floating mx-1">
                                    <input type="text" class="form-control" id="critLast" name="critLast" data-index="3">
                                    <label for="critLast">Apellido</label>
                                </div>
                                <div style="width: 20%;" class="form-floating mx-1">
                                    <input type="date" class="form-control" id="critDateI" name="critDateI" data-index="4">
                                    <label for="critDateI">Fecha Inicio</label>
                                </div>
                                <div style="width: 20%;" class="form-floating mx-1">
                                    <input type="date" class="form-control" id="critDateF" name="critDateF">
                                    <label for="critDateF">Fecha Fin</label>
                                </div>
                                <div class="text-center" style="width: 10%;">
                                    <button type="button" class="btn btn-success mx-2 w-auto" id="search">Buscar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <table id="tblCitas" class="table nowrap table-striped w-100 rounded">
                            <thead class="table-dark text-left">
                                <th class="text-center">Opciones</th>
                                <th>id</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Procedimiento</th>
                                <th>Fecha</th>
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

<script>
    var tblCitas;

    $(document).ready(function() {

        document.getElementById('critDateI').value = obtenerFechaActual();
        document.getElementById('critDateF').value = obtenerFechaActual();

        $("#critName, #critLast, #critDateI, #critDateF").keyup(function() {
            tblCitas.column($(this).data('index')).search(this.value).draw();
        });

        $("#search").on('click', function() {
            loadDataTable();
        });

        loadDataTable();

        $("#tblCitas tbody").on('click', '.update', function() {
            var data = tblCitas.row($(this).parents('tr')).data();
            $.ajax({
                url: 'Controllers/ChangeController.php',
                type: 'POST',
                data: {
                    'accion': 2,
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
                            title: 'Informacion actualizada!',
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
    });

    function obtenerFechaActual() {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    function loadDataTable() {
        if ($.fn.DataTable.isDataTable('#tblCitas')) {
            tblCitas.destroy();
        };

        tblCitas = $("#tblCitas").DataTable({
            ajax: {
                async: false,
                url: "Controllers/ContextController.php",
                type: "POST",
                dataSrc: '',
                data: {
                    'accion': 9,
                    'id_especialidad': $("#id_especialidad").val(),
                    'id_procedimiento': $("#id_procedimiento").val(),
                    'fecha_ini': $("#critDateI").val(),
                    'fecha_fin': $("#critDateF").val(),
                }
            },
            columnDefs: [{
                    targets: 0,
                    sortable: false,
                    render: function(data, type, full, meta) {
                        return "<center>" +
                            "<button class='update btn btn-outline-warning px-1 mx-1' type='button'>" +
                            "<i class='fa-regular fa-pen-to-square fs-5'></i>" +
                            "</button>" +
                            "</center>"
                    }
                },
                {
                    targets: 1,
                    visible: false
                },
                {
                    targets: 6,
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
    };
</script>