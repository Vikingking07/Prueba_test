var tblPerfil, tblModule;
var select_modulos = [], idProfile = 0;
var modulos_usuario, modulos_sistema;

$(document).ready(function () {
    loadDataTables();
    treeModule();
    fnTreeModule();

    $('#tblProfile tbody').on('click', '.btnSeleccionarPerfil', function () {
        var data = tblProfile.row($(this).parents('tr')).data();
        if ($(this).parents('tr').hasClass('selected')) {
            $(this).parents('tr').removeClass('selected');
            $('#modulos').jstree("deselect_all", false);
            $("#select_modulos option").remove();
            idProfile = 0;
        } else {
            tblProfile.$('tr.selected').removeClass('selected');
            $(this).parents('tr').addClass('selected');
            idProfile = data[0];
            $("#card-modulos").css("display", "block");
            $.ajax({
                async: false,
                url: "Controllers/ModuleController.php",
                method: 'POST',
                data: {
                    accion: 2,
                    id_perfil: idProfile
                },
                dataType: 'json',
                success: function (result) {
                    modulos_usuario = result;
                    selectModulesProfile(idProfile);
                }
            });
        }
    });

    $('#modulos').on("changed.jstree", function (evt, data) {
        $("#select_modulos option").remove();
        var selectedElms = $('#modulos').jstree("get_selected", true);
        $.each(selectedElms, function () {
            for (let i = 0; i < modulos_sistema.length; i++) {
                if (modulos_sistema[i]["id"] == this.id && modulos_sistema[i]["vista"]) {
                    $('#select_modulos').append($('<option>', {
                        value: this.id,
                        text: this.text
                    }));
                }
            }
        });

        if ($("#select_modulos").has('option').length <= 0) {
            $('#select_modulos').append($('<option>', {
                value: 0,
                text: "--No hay medulos seleccionados--"
            }));
        }
    });

    $('#marcar_modulos').on('click', function () {
        $('#modulos').jstree('select_all');
    });

    $('#desmarcar_modulos').on('click', function () {
        $('#modulos').jstree('deselect_all', false);
        $("#select_modulos option").remove();
        $('#select_modulos').append($('<option>', {
            value: 0,
            text: "--No hay medulos seleccionados--"
        }));

    });

    $('#asignar_modulos').on('click', function () {
        selectedElmsIds = [];
        var selectedElms = $('#modulos').jstree("get_selected", true);
        $.each(selectedElms, function () {
            selectedElmsIds.push(this.id);
            if (this.parent != "#") {
                selectedElmsIds.push(this.parent);
            }
        });
        let modulosSeleccionados = [...new Set(selectedElmsIds)];
        let modulo_inicio = $("#select_modulos").val();
        if (idProfile != 0 && modulosSeleccionados.length > 0) {
            toRegisterProfileModule(modulosSeleccionados, idProfile, modulo_inicio);
        } else {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Debe selecionar el perfil y modulos a registrar',
                showConfirmButton: false,
                timer: 3000
            });
        };
    });

    $("#btnReordenarModulos").on('click', function () {
        organizeModules();
    });

    $("#btnReiniciar").on('click', function () {
        updateTreeModule();
    });

    $("#iptIconoModulo").change(function () {
        $("#spn_icono_modulo").html($("#iptIconoModulo").val());
        if ($("#iptIconoModulo").val().length === 0) {
            $("#spn_icono_modulo").html("<i class='far fa-circle fs-6 text-white'></i>")
        }
    });

    document.getElementById("btnRegistrarModulo").addEventListener("click", function () {
        toRegisterModule();
    });

});

function loadDataTables() {
    tblProfile = $('#tblProfile').DataTable({
        ajax: {
            async: false,
            url: 'Controllers/ProfileController.php',
            type: 'POST',
            dataType: 'json',
            dataSrc: "",
            data: {
                'accion': 1
            }
        },
        columnDefs: [{
            targets: 2,
            sortable: false,
            createdCell: function (td, cellData, rowData, row, col) {
                if (parseInt(rowData[2]) == 1) {
                    $(td).html("Activo")
                } else {
                    $(td).html("Inactivo")
                }
            }
        },
        {
            targets: 5,
            sortable: false,
            render: function (data, type, full, meta) {
                return "<center>" +
                    "<span class='btnSeleccionarPerfil text-primary px-1' style='cursor:pointer;' data-bs-toggle='tooltip' data-bs-placement='top' title='Seleccionar Categoria'> " +
                    "<i class='fas fa-check fs-5'></i> " +
                    "</span>" +
                    "</center>"
            }
        }
        ],
        scrollX: true,
        language: {
            "url": "Resources/plugins/datatables/Spanish.json"
        }
    });

    tblModule = $('#tblModule').DataTable({
        ajax: {
            async: false,
            url: 'Controllers/ModuleController.php',
            type: 'POST',
            dataType: 'json',
            dataSrc: "",
            data: {
                'accion': 3
            }
        },
        columnDefs: [{
            targets: 7,
            visible: false
        },
        {
            targets: 8,
            visible: false
        },
        {
            targets: 0,
            sortable: false,
            render: function (data, type, full, meta) {
                return "<center>" +
                    "<span class='fas fa-edit fs-6 btnSeleccionarModulo text-primary px-1' style='cursor:pointer;' data-bs-toggle='tooltip' data-bs-placement='top' title='Seleccionar Modulo'>" +
                    "</span>" +
                    "<span class='fas fa-trash fs-6 btnEliminarModulo text-danger px-1' style='cursor:pointer;' data-bs-toggle='tooltip' data-bs-placement='top' title='Eliminar Modulo'>" +
                    "</span>" +
                    "</center>";
            }
        }
        ],
        scrollX: true,
        order: [
            [0, 'asc']
        ],
        lengthMenu: [0, 5, 10, 15, 20, 50],
        pageLength: 20,
        language: {
            "url": "Resources/plugins/datatables/Spanish.json"
        }
    });
};

function treeModule() {
    $.ajax({
        async: false,
        url: 'Controllers/ModuleController.php',
        method: 'POST',
        data: {
            'accion': 1
        },
        dataType: 'json',
        success: function (result) {
            modulos_sistema = result;
            $('#modulos').jstree({
                'core': {
                    "check_callback": true,
                    'data': result
                },
                "checkbox": {
                    "keep_selected_style": false
                },
                "types": {
                    "default": {
                        "icon": "fas fa-laptop text-warning"
                    }
                },
                "plugins": ["wholerow", "checkbox", "types", "changed"]
            }).bind("loaded.jstree", function (event, data) {
                $(this).jstree("open_all");
            });
        }
    });
};

function selectModulesProfile(pin_idProfile) {
    $('#modulos').jstree('deselect_all');
    for (let i = 0; i < modulos_sistema.length; i++) {
        if (modulos_sistema[i]["id"] == modulos_usuario[i]["id"] && modulos_usuario[i]["sel"] == 1) {
            $("#modulos").jstree("select_node", modulos_sistema[i]["id"]);
        }
    }

    if (pin_idProfile == 1) { // SOLO PERFIL ADMINISTRADOR
        $("#modulos").jstree(true).hide_node(13);
    } else {
        $("#modulos").jstree(true).show_all();
    }
};

function toRegisterProfileModule(modulosSeleccionados, idProfile, idModulo_inicio) {
    $.ajax({
        async: false,
        url: "Controllers/ProfileModuleController.php",
        method: 'POST',
        data: {
            accion: 1,
            id_modulosSeleccionados: modulosSeleccionados,
            id_Perfil: idProfile,
            id_modulo_inicio: idModulo_inicio
        },
        dataType: 'json',
        success: function (respuesta) {
            if (respuesta > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se registro correctamente',
                    showConfirmButton: false,
                    timer: 2000
                });
                $("#select_modulos option").remove();
                $('#modulos').jstree("deselect_all", false);
                tblProfile.ajax.reload();
                $("#card-modulo").css("display", "none");
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al registrar',
                    showConfirmButton: false,
                    timer: 3000
                });
            };
        }
    });
};

function fnTreeModule() {
    var dataSources;
    $.ajax({
        async: false,
        url: "Controllers/ModuleController.php",
        method: 'POST',
        data: {
            accion: 1
        },
        dataType: 'json',
        success: function (respuesta) {
            dataSources = respuesta;
        }
    });

    $('#arbolModulos').jstree({
        "core": {
            "check_callback": true,
            "data": dataSources
        },
        "types": {
            "default": {
                "icon": "fas fa-laptop"
            },
            "file": {
                "icon": "fas fa-laptop"
            }
        },
        "plugins": ["types", "dnd"]
    }).bind('ready.jstree', function (e, data) {
        $('#arbolModulos').jstree('open_all');
    });
};

function updateTreeModule() {
    $.ajax({
        async: false,
        url: "Controllers/ModuleController.php",
        method: 'POST',
        data: {
            accion: 1
        },
        dataType: 'json',
        success: function (respuesta) {
            $('#arbolModulos').jstree(true).settings.core.data = respuesta;
            $('#arbolModulos').jstree(true).refresh();
        }
    });

};

function organizeModules() {
    var array_modulos = [];
    var reg_id, reg_padre_id, reg_orden;
    var v = $("#arbolModulos").jstree(true).get_json('#', { 'flat': true });
    for (i = 0; i < v.length; i++) {
        var z = v[i];
        reg_id = z["id"];
        reg_padre_id = z["parent"];
        reg_orden = i;
        array_modulos[i] = reg_id + ';' + reg_padre_id + ';' + reg_orden;
    };

    $.ajax({
        async: false,
        url: "Controllers/ModuleController.php",
        method: 'POST',
        data: {
            accion: 4,
            modulos: array_modulos
        },
        dataType: 'json',
        success: function (respuesta) {
            if (respuesta > 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se registro correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                tblModule.ajax.reload();
                updateTreeModuleProfile();
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al registrar',
                    showConfirmButton: false,
                    timer: 1200
                });
            };
        }
    });
};

function updateTreeModuleProfile() {
    $.ajax({
        async: false,
        url: "Controllers/ModuleController.php",
        method: 'POST',
        data: {
            accion: 1
        },
        dataType: 'json',
        success: function (respuesta) {
            modulos_sistema = respuesta;
            $('#modulos').jstree(true).settings.core.data = respuesta;
            $('#modulos').jstree(true).refresh();

        }
    })
};

function toRegisterModule() {
    var forms = document.getElementsByClassName('needs-validation-registro-modulo');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            Swal.fire({
                title: 'Esta seguro de registrar el modulo?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, deseo registrarlo!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    $("#iptIconoModulo").val($('#spn_icono_modulo i').attr('class'));
                    $.ajax({
                        async: false,
                        url: "Controllers/ModuleController.php",
                        method: 'POST',
                        data: {
                            accion: 5,
                            datos: $('#frm_registro_modulo').serialize()
                        },
                        dataType: 'json',
                        success: function (respuesta) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: respuesta,
                                showConfirmButton: false,
                                time: 1500
                            });
                            tblModule.ajax.reload();
                            updateTreeModule();
                            updateTreeModuleProfile();
                            $("#iptModulo").val("");
                            $("#iptVistaModulo").val("");
                            $("#iptIconoModulo").val("");
                            $(".needs-validation-registro-modulo").removeClass("was-validated");
                        }
                    })
                }
            })
        }
        form.classList.add('was-validated');
    })
};

document.getElementById('savePerfil').addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            $.ajax({
                url: "Controllers/ProfileController.php",
                type: "POST",
                data: {
                    'accion': 2,
                    'nombre': $("#perfil").val(),
                },
                dataType: 'json',
                success: function (result) {
                    if (result == true) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Perfil creado con exito!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        form.classList.remove('was-validated');
                        tblProfile.ajax.reload();
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