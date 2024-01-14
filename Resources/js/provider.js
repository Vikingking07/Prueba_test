var tblStore, tblAccount, tblContact;
var state, municp, parsi, city;
var system_pay, store_pay;
var id_provider = 0, id_store = 0, id_account = 0, id_contact = 0;
var valor = false;

$(document).ready(function () {

    loadContext();
    loadTree();

    $("#refresh").on('click', function () {
        $.ajax({
            url: 'Controllers/ProviderController.php',
            method: 'POST',
            data: { 'accion': 1 },
            async: false,
            dataType: 'json',
            success: function (result) {
                var options = '<option selected>Open this select menu</option>'
                for (var i = 0; i < result.length; i++) {
                    options = options + '<option value="' + result[i]['id'] + '">' + result[i]['tradename'] + '</option>'
                }
                $("#provider").html(options);
            }
        });
    });

    $('#mark_all').on('click', function () {
        $('#pay').jstree('select_all');
    });

    $('#uncheck_all').on('click', function () {
        $('#pay').jstree('deselect_all', false);
    });

    $("#transport").click(function () {
        if ($('#transport').is(':checked')) {
            $("#transport").val(1);
        } else {
            $("#transport").val(0);
        }
    });

    $("#tblStore tbody").on('click', '#editStore', function () {
        var data = tblStore.row($(this).parents('tr')).data();
        id_store = data['ID'];
        $.ajax({
            url: 'Controllers/StoreController.php',
            method: 'POST',
            data: { 'accion': 4, "id_store": id_store },
            async: false,
            dataType: 'json',
            success: function (result) {
                $('#pay').jstree('deselect_all');
                for (let i = 0; i < result.length; i++) {
                    $("#pay").jstree("select_node", result[i]["ID"]);
                };
            }
        })
        $.ajax({
            url: 'Controllers/StoreController.php',
            method: 'POST',
            data: { 'accion': 3, "id_store": id_store },
            async: false,
            dataType: 'json',
            success: function (result) {
                $("#registerStore").css('display', 'none');
                $("#saveStore").css('display', 'block');
                $("#tradeNameStore").val(result[0]['TRADENAME']);
                $("#postalCode").val(result[0]['POSTAL_CODE']);
                $("#phoneStore").val(result[0]['PHONE']);
                $("#stateStore").val(result[0]['ID_STATE']);
                structuredDirection(1, false);
                $("#municpStore").val(result[0]['ID_MUNICP']);
                structuredDirection(2, false);
                $("#parishStore").val(result[0]['ID_PRRQ']);
                structuredDirection(3, false);
                $("#cityStore").val(result[0]['ID_CITY']);
                $("#addressStore").val(result[0]['ADDRESS']);
                $("#pay_day").val(result[0]['PAY_DAY']);
                $("#transport").val(result[0]['TRANSPORT']);
                $("#transport_in").val(result[0]['TRANSPORT_IN']);
                $("#transport_out").val(result[0]['TRANSPORT_OUT']);
                $("#modalStore").modal('show');
            }
        });
    });

    $("#tblStore tbody").on('click', '#trashStore', function () {
        var data = tblStore.row($(this).parents('tr')).data();
        id_store = data['ID'];
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'Controllers/StoreController.php',
                    method: 'POST',
                    data: { 'accion': 6, "id_store": id_store },
                    async: false,
                    dataType: 'json',
                    success: function (result) {
                        if (result = 'AJ001') {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            tblStore.ajax.reload();
                        }
                    }
                });
            }
        });
    });

    $("#tblAccount tbody").on('click', '#editAccount', function () {
        var data = tblAccount.row($(this).parents('tr')).data();
        id_account = data['ID'];
        $.ajax({
            url: 'Controllers/AccountController.php',
            method: 'POST',
            data: { 'accion': 3, "id_account": id_account },
            async: false,
            dataType: 'json',
            success: function (result) {
                let [selSSN, ssn] = result[0]['SSN'].split('-');
                $("#registerAccount").css('display', 'none');
                $("#saveAccount").css('display', 'block');
                $("#bank").val(result[0]['ID_BANK']);
                $("#accountType").val(result[0]['ID_ACCOUNT_TYPE']).attr('disabled', true);
                $("#selSSN").val(selSSN);
                $("#ssnAccount").val(ssn);
                $("#account").val(result[0]['ACCOUNT']);
                accountMax();
                $("#modalAccount").modal('show');
            }
        });
    });

    $("#tblAccount tbody").on('click', '#trashAccount', function () {
        var data = tblAccount.row($(this).parents('tr')).data();
        id_account = data['ID'];
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'Controllers/AccountController.php',
                    method: 'POST',
                    data: { 'accion': 5, "id_account": id_account },
                    async: false,
                    dataType: 'json',
                    success: function (result) {
                        if (result = 'AJ001') {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            tblAccount.ajax.reload();
                        }
                    }
                });
            }
        });
    });

    $("#tblContact tbody").on('click', '#editContact', function () {
        var data = tblContact.row($(this).parents('tr')).data();
        id_contact = data['ID'];
        $.ajax({
            url: 'Controllers/ContactController.php',
            method: 'POST',
            data: { 'accion': 3, "id_contact": id_contact },
            async: false,
            dataType: 'json',
            success: function (result) {
                $("#registerContact").css('display', 'none');
                $("#saveContact").css('display', 'block');
                $("#contactType").val(result[0]['ID_CONTACT_TYPE']);
                $("#contactName").val(result[0]['CONTACT_NAME']);
                $("#phoneContact").val(result[0]['PHONE']);
                $("#emailContact").val(result[0]['EMAIL']);
                $("#modalContact").modal('show');
            }
        });
    });

    $("#tblContact tbody").on('click', '#trashContact', function () {
        var data = tblContact.row($(this).parents('tr')).data();
        id_contact = data['ID'];
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: 'Controllers/ContactController.php',
                    method: 'POST',
                    data: { 'accion': 5, "id_contact": id_contact },
                    async: false,
                    dataType: 'json',
                    success: function (result) {
                        if (result = 'AJ001') {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            tblContact.ajax.reload();
                        }
                    }
                });
            }
        });
    });

});

function accountMax() {
    var account_type = document.getElementById("accountType").value;
    if (account_type == 1 || account_type == 3) {
        document.getElementById("account").setAttribute("maxlength", "10");
    } else {
        document.getElementById("account").setAttribute("maxlength", "20");
    }
};

function loadDataTables() {
    if (valor) {
        tblStore.destroy(); tblAccount.destroy(); tblContact.destroy();
    };

    valor = true;

    tblStore = $("#tblStore").DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Create Store',
                action: function (e, dt, node, config) {
                    $("#registerStore").css('display', 'block');
                    $("#saveStore").css('display', 'none');
                    $('#pay').jstree('deselect_all', false);
                    $("#tradeNameStore").val('');
                    $("#postalCode").val('');
                    $("#phoneStore").val('');
                    $("#stateStore").val('');
                    structuredDirection(1, false);
                    $("#addressStore").val('');
                    $("#pay_day").val(1);
                    $("#transport").val(false);
                    $("#transport_in").val('0.00');
                    $("#transport_out").val('0.00');
                    $("#modalStore").modal('show');
                }
            }
        ],
        ajax: {
            async: false,
            url: "Controllers/StoreController.php",
            type: "POST",
            dataSrc: '',
            data: {
                'accion': 1,
                'id_provider': id_provider
            }
        },
        columnDefs: [
            {
                targets: 0,
                sortable: false,
                render: function (data, type, full, meta) {
                    return "<center>" +
                        "<button class='btn btn-outline-warning px-1 mx-1' type='button' id='editStore' name='editStore'>" +
                        "<i class='fa-regular fa-pen-to-square fs-5'></i>" +
                        "</button>" +
                        "<button class='btn btn-outline-danger px-1 mx-1' type='button' id='trashStore' name='trashStore'>" +
                        "<i class='fa-regular fa-trash-can fs-5'></i>" +
                        "</button>" +
                        "</center>"
                }
            }
        ],
        responsive: { details: { type: 'column' }, },
        language: {
            "url": "Resources/plugins/datatables/Spanish.json"
        }
    });

    tblAccount = $("#tblAccount").DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Create Account',
                action: function (e, dt, node, config) {
                    $("#registerAccount").css("display", "block");
                    $("#saveAccount").css("display", "none");
                    $("#accountType").val('').attr('disabled', false);
                    $("#bank").val('');
                    $("#selSSN").val('J');
                    $("#ssnAccount").val('');
                    $("#account").val('');
                    $("#modalAccount").modal('show');
                }
            }
        ],
        ajax: {
            async: false,
            url: "Controllers/AccountController.php",
            type: "POST",
            dataSrc: '',
            data: {
                'accion': 1,
                'id_provider': id_provider
            }
        },
        columnDefs: [
            {
                targets: 0,
                sortable: false,
                render: function (data, type, full, meta) {
                    return "<center>" +
                        "<button class='btn btn-outline-warning px-1 mx-1' type='button' id='editAccount' name='editAccount'>" +
                        "<i class='fa-regular fa-pen-to-square fs-5'></i>" +
                        "</button>" +
                        "<button class='btn btn-outline-danger px-1 mx-1' type='button' id='trashAccount' name='trashAccount'>" +
                        "<i class='fa-regular fa-trash-can fs-5'></i>" +
                        "</button>" +
                        "</center>"
                }
            }
        ],
        responsive: { details: { type: 'column' }, },
        language: {
            "url": "Resources/plugins/datatables/Spanish.json"
        }
    });

    tblContact = $("#tblContact").DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Create Contact',
                action: function (e, dt, node, config) {
                    $("#registerContact").css('display', 'block');
                    $("#saveContact").css('display', 'none');
                    $("#contactType").val('');
                    $("#contactName").val('');
                    $("#phoneContact").val('');
                    $("#emailContact").val('');
                    $("#modalContact").modal('show');
                }
            }
        ],
        ajax: {
            async: false,
            url: "Controllers/ContactController.php",
            type: "POST",
            dataSrc: '',
            data: {
                'accion': 1,
                'id_provider': id_provider
            }
        },
        columnDefs: [
            {
                targets: 0,
                sortable: false,
                render: function (data, type, full, meta) {
                    return "<center>" +
                        "<button class='btn btn-outline-warning px-1 mx-1' type='button' id='editContact' name='editContact'>" +
                        "<i class='fa-regular fa-pen-to-square fs-5'></i>" +
                        "</button>" +
                        "<button class='btn btn-outline-danger px-1 mx-1' type='button' id='trashContact' name='trashContact'>" +
                        "<i class='fa-regular fa-trash-can fs-5'></i>" +
                        "</button>" +
                        "</center>"
                }
            }
        ],
        responsive: { details: { type: 'column' }, },
        language: {
            "url": "Resources/plugins/datatables/Spanish.json"
        }
    });
};

function loadContext() {
    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 1 },
        async: false,
        dataType: 'json',
        success: function (result) {
            var options = '<option selected value="">Open this select menu</option>'
            for (var i = 0; i < result.length; i++) {
                options = options + '<option value="' + result[i]['ID'] + '">' + result[i]['STATE_NAME'] + '</option>'
            }
            $("#state").html(options);
            $("#stateStore").html(options);
        }
    });

    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 2 },
        async: false,
        dataType: 'json',
        success: function (result) {
            municp = result;
        }
    });

    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 3 },
        async: false,
        dataType: 'json',
        success: function (result) {
            parish = result;
        }
    });

    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 4 },
        async: false,
        dataType: 'json',
        success: function (result) {
            city = result;
        }
    });

    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 5, 'elemento': 'DISTRIBUIDOR' },
        async: false,
        dataType: 'json',
        success: function (result) {
            var options = ''
            for (var i = 0; i < result.length; i++) {
                if (result[i]['ID'] == 24) {
                    options = options + '<option selected value="' + result[i]['ID'] + '">' + result[i]['STATUS_VALUE'] + '</option>'
                } else {
                    options = options + '<option value="' + result[i]['ID'] + '">' + result[i]['STATUS_VALUE'] + '</option>'
                }
            }
            $("#status").html(options);
        }
    });

    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 7 },
        async: false,
        dataType: 'json',
        success: function (result) {
            var options = '<option selected value="">Open this select menu</option>'
            for (var i = 0; i < result.length; i++) {
                options = options + '<option value="' + result[i]['ID'] + '">' + result[i]['ACCOUNT_TYPE'] + '</option>'
            }
            $("#accountType").html(options);
        }
    });

    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 8 },
        async: false,
        dataType: 'json',
        success: function (result) {
            var options = '<option selected value="">Open this select menu</option>'
            for (var i = 0; i < result.length; i++) {
                options = options + '<option value="' + result[i]['id'] + '">' + result[i]['bank_name'] + '</option>'
            }
            $("#bank").html(options);
        }
    });

    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 9 },
        async: false,
        dataType: 'json',
        success: function (result) {
            var options = '<option selected value="">Open this select menu</option>'
            for (var i = 0; i < result.length; i++) {
                options = options + '<option value="' + result[i]['ID'] + '">' + result[i]['CONTACT_TYPE'] + '</option>'
            }
            $("#contactType").html(options);
        }
    });

    $.ajax({
        url: 'Controllers/ProviderController.php',
        method: 'POST',
        data: { 'accion': 1 },
        async: false,
        dataType: 'json',
        success: function (result) {
            var options = '<option selected value="">Open this select menu</option>'
            for (var i = 0; i < result.length; i++) {
                options = options + '<option value="' + result[i]['id'] + '">' + result[i]['tradename'] + '</option>'
            }
            $("#provider").html(options);
        }
    });
};

function loadTree() {
    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 6 },
        async: false,
        dataType: 'json',
        success: function (result) {
            system_pay = result;
            $('#pay').jstree({
                'core': {
                    "check_callback": true,
                    'data': result
                },
                "checkbox": {
                    "keep_selected_style": false
                },
                "types": {
                    "default": {
                        "icon": "fa-solid fa-coins"
                    }
                },
                "plugins": ["wholerow", "checkbox", "types", "changed"]
            }).bind("loaded.jstree", function (event, data) {
                $(this).jstree("open_all");
            });
        }
    });
};

function structuredDirection(value, option) {
    if (value == 1) {
        if (option) {
            var var_state = document.getElementById("state").value;
            var options = '<option selected>Open this select menu</option>'
            for (var i = 0; i < municp.length; i++) {
                if (municp[i]['ID_STATE'] == var_state) {
                    options = options + '<option value="' + municp[i]['ID'] + '">' + municp[i]['MUNICP_NAME'] + '</option>'
                }
            }
            $("#municp").html(options);
            $("#parish").html('<option selected>Open this select menu</option>')
            $("#city").html('<option selected>Open this select menu</option>');
        } else {
            var var_state = document.getElementById("stateStore").value;
            var options = '<option selected>Open this select menu</option>'
            for (var i = 0; i < municp.length; i++) {
                if (municp[i]['ID_STATE'] == var_state) {
                    options = options + '<option value="' + municp[i]['ID'] + '">' + municp[i]['MUNICP_NAME'] + '</option>'
                }
            }
            $("#municpStore").html(options);
            $("#parishStore").html('<option selected>Open this select menu</option>')
            $("#cityStore").html('<option selected>Open this select menu</option>');
        }
    } else if (value == 2) {
        if (option) {
            var var_municp = document.getElementById("municp").value;
            var options = '<option selected>Open this select menu</option>'
            for (var i = 0; i < parish.length; i++) {
                if (parish[i]['ID_MUNICP'] == var_municp) {
                    options = options + '<option value="' + parish[i]['ID'] + '">' + parish[i]['PARISH_NAME'] + '</option>'
                }
            }
            $("#parish").html(options);
            $("#city").html('<option selected>Open this select menu</option>');
        } else {
            var var_municp = document.getElementById("municpStore").value;
            var options = '<option selected>Open this select menu</option>'
            for (var i = 0; i < parish.length; i++) {
                if (parish[i]['ID_MUNICP'] == var_municp) {
                    options = options + '<option value="' + parish[i]['ID'] + '">' + parish[i]['PARISH_NAME'] + '</option>'
                }
            }
            $("#parishStore").html(options);
            $("#cityStore").html('<option selected>Open this select menu</option>');
        }
    } else {
        if (option) {
            var var_parish = document.getElementById("parish").value;
            var options = '<option selected>Open this select menu</option>'
            for (var i = 0; i < city.length; i++) {
                if (city[i]['ID_PARISH'] == var_parish) {
                    options = options + '<option value="' + city[i]['ID'] + '">' + city[i]['CITY_NAME'] + '</option>'
                }
            }
            $("#city").html(options);
        } else {
            var var_parish = document.getElementById("parishStore").value;
            var options = '<option selected>Open this select menu</option>'
            for (var i = 0; i < city.length; i++) {
                if (city[i]['ID_PARISH'] == var_parish) {
                    options = options + '<option value="' + city[i]['ID'] + '">' + city[i]['CITY_NAME'] + '</option>'
                }
            }
            $("#cityStore").html(options);
        }
    }
};

function tabs(value) {
    if (value) {
        $("#nav-store-tab").attr('disabled', false);
        $("#nav-account-tab").attr('disabled', false);
        $("#nav-contact-tab").attr('disabled', false);
    } else {
        $("#nav-store-tab").attr('disabled', true).removeClass('active');
        $("#nav-store").removeClass('show').removeClass('active');
        $("#nav-account-tab").attr('disabled', true).removeClass('active');
        $("#nav-account").removeClass('show').removeClass('active');
        $("#nav-contact-tab").attr('disabled', true).removeClass('active');
        $("#nav-contact").removeClass('show').removeClass('active');
        $("#nav-provider-tab").addClass('active');
        $("#nav-provider").addClass('show').addClass('active');
    }
}

document.getElementById("search").addEventListener('click', function () {
    id_provider = document.getElementById("provider").value;
    $.ajax({
        url: 'Controllers/ProviderController.php',
        method: 'POST',
        data: { 'accion': 3, "id_provider": id_provider },
        async: false,
        dataType: 'json',
        success: function (result) {
            if (result) {
                loadDataTables();
                let [selSSN, ssn] = result[0]['SSN'].split('-');
                $("#tradeName").val(result[0]['TRADENAME']);
                $("#legalName").val(result[0]['LEGAL_NAME']);
                $("#selSSN").val(selSSN);
                $("#ssn").val(ssn);
                $("#phone").val(result[0]['PHONE']);
                $("#email").val(result[0]['EMAIL']);
                $("#site").val(result[0]['SITE']);
                $("#status").val(result[0]['ID_STATUS']).attr('disabled', false);
                $("#state").val(result[0]['ID_STATE']);
                structuredDirection(1, true);
                $("#municp").val(result[0]['ID_MUNICP']);
                structuredDirection(2, true);
                $("#parish").val(result[0]['ID_PRRQ']);
                structuredDirection(3, true);
                $("#city").val(result[0]['ID_CITY']);
                $("#address").val(result[0]['ADDRESS']);
                tabs(true);
                $("#registerProvider").css('display', 'none');
                $("#saveProvider").css('display', 'block');
            }
        }
    });
});

document.getElementById("newp").addEventListener('click', function () {
    Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to discard the changes made?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Don't save"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Changes are not saved', '', 'info');
            id_provider = 0;
            $("#provider").val('');
            $("#tradeName").val('');
            $("#legalName").val('');
            $("#selSSN").val('J');
            $("#ssn").val('');
            $("#phone").val('');
            $("#email").val('');
            $("#site").val('');
            $("#status").val(24).attr('disabled', true);
            $("#state").val('');
            structuredDirection(1, true);
            $("#address").val('');
            tabs(false);
            $("#registerProvider").css('display', 'block');
            $("#saveProvider").css('display', 'none');
        }
    })
});

document.getElementById("registerProvider").addEventListener("click", function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            var datos = new FormData();
            datos.append("accion", 2);
            datos.append("IN_TRADENAME", $("#tradeName").val());
            datos.append("IN_LEGAL_NAME", $("#legalName").val());
            datos.append("IN_SSN", $("#selSSN").val() + "-" + $("#ssn").val());
            datos.append("IN_PHONE", $("#phone").val());
            datos.append("IN_SITE", $("#email").val());
            datos.append("IN_EMAIL", $("#site").val());
            datos.append("IN_ID_STATUS", $("#status").val());
            datos.append("IN_ID_STATE", $("#state").val());
            datos.append("IN_ID_MUNICP", $("#municp").val());
            datos.append("IN_ID_PRRQ", $("#parish").val());
            datos.append("IN_ID_CITY", $("#city").val());
            datos.append("IN_ADDRESS", $("#address").val());
            $.ajax({
                url: "Controllers/ProviderController.php",
                type: "POST",
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (result) {
                    if (result == 'AJ001') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Successfully Registered Provider',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $("#tradeName").val('');
                        $("#legalName").val('');
                        $("#selSSN").val('J');
                        $("#ssn").val('');
                        $("#phone").val('');
                        $("#email").val('');
                        $("#site").val('');
                        $("#status").val(24);
                        $("#state").val('')
                        structuredDirection(1, true);
                        $("#address").val('');
                        form.classList.remove('was-validated');
                    }
                }
            });
        } else {
            form.classList.add('was-validated');
        }
    });
});

document.getElementById("saveProvider").addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            var datos = new FormData();
            datos.append("accion", 4);
            datos.append("IN_ID_PROVIDER", id_provider);
            datos.append("IN_TRADENAME", $("#tradeName").val());
            datos.append("IN_LEGAL_NAME", $("#legalName").val());
            datos.append("IN_SSN", $("#selSSN").val() + "-" + $("#ssn").val());
            datos.append("IN_PHONE", $("#phone").val());
            datos.append("IN_SITE", $("#email").val());
            datos.append("IN_EMAIL", $("#site").val());
            datos.append("IN_ID_STATUS", $("#status").val());
            datos.append("IN_ID_STATE", $("#state").val());
            datos.append("IN_ID_MUNICP", $("#municp").val());
            datos.append("IN_ID_PRRQ", $("#parish").val());
            datos.append("IN_ID_CITY", $("#city").val());
            datos.append("IN_ADDRESS", $("#address").val());
            $.ajax({
                url: "Controllers/ProviderController.php",
                type: "POST",
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (result) {
                    if (result == 'AJ001') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Provider Updated Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        form.classList.remove('was-validated');
                    }
                }
            });
        } else {
            form.classList.add('was-validated');
        }
    });
});

document.getElementById("registerStore").addEventListener("click", function () {
    var forms = document.getElementsByClassName('needs-validation-store');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            selectedElmsIds = [];
            var selectedElms = $('#pay').jstree("get_selected", true);
            $.each(selectedElms, function () {
                selectedElmsIds.push(this.id);
            });
            let paySelect = [...new Set(selectedElmsIds)];
            var datos = new FormData();
            datos.append("accion", 2);
            datos.append("IN_ID_PROVIDER", id_provider);
            datos.append("IN_TRADENAME", $("#tradeNameStore").val());
            datos.append("IN_POSTAL_CODE", $("#postalCode").val());
            datos.append("IN_PHONE", $("#phoneStore").val());
            datos.append("IN_ID_STATE", $("#stateStore").val());
            datos.append("IN_ID_MUNICP", $("#municpStore").val());
            datos.append("IN_ID_PRRQ", $("#parishStore").val());
            datos.append("IN_ID_CITY", $("#cityStore").val());
            datos.append("IN_ADDRESS", $("#addressStore").val());
            datos.append("IN_PAY_DAY", $("#pay_day").val());
            datos.append("IN_TRANSPORT", $("#transport").val());
            datos.append("IN_TRANSPORT_IN", $("#transport_in").val());
            datos.append("IN_TRANSPORT_OUT", $("#transport_out").val());
            datos.append("PAY_TYPE", paySelect);
            $.ajax({
                url: "Controllers/StoreController.php",
                type: "POST",
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (result) {
                    if (result == 'AJ001') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Successfully Registered Provider',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $("#modalStore").modal('hide');
                        tblStore.ajax.reload();
                        form.classList.remove('was-validated');
                    }
                }
            });
        } else {
            form.classList.add('was-validated');
        }
    });
});

document.getElementById("saveStore").addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation-store');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            selectedElmsIds = [];
            var selectedElms = $('#pay').jstree("get_selected", true);
            $.each(selectedElms, function () {
                selectedElmsIds.push(this.id);
            });
            let paySelect = [...new Set(selectedElmsIds)];
            var datos = new FormData();
            datos.append("accion", 5);
            datos.append("IN_ID_STORE", id_store);
            datos.append("IN_TRADENAME", $("#tradeNameStore").val());
            datos.append("IN_POSTAL_CODE", $("#postalCode").val());
            datos.append("IN_PHONE", $("#phoneStore").val());
            datos.append("IN_ID_STATE", $("#stateStore").val());
            datos.append("IN_ID_MUNICP", $("#municpStore").val());
            datos.append("IN_ID_PRRQ", $("#parishStore").val());
            datos.append("IN_ID_CITY", $("#cityStore").val());
            datos.append("IN_ADDRESS", $("#addressStore").val());
            datos.append("IN_PAY_DAY", $("#pay_day").val());
            datos.append("IN_TRANSPORT", $("#transport").val());
            datos.append("IN_TRANSPORT_IN", $("#transport_in").val());
            datos.append("IN_TRANSPORT_OUT", $("#transport_out").val());
            datos.append("PAY_TYPE", paySelect);
            $.ajax({
                url: "Controllers/StoreController.php",
                type: "POST",
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (result) {
                    if (result == 'AJ001') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Store Upgraded successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $("#modalStore").modal('hide');
                        tblStore.ajax.reload();
                        form.classList.remove('was-validated');
                    }
                }
            });
        } else {
            form.classList.add('was-validated');
        }
    });
});

document.getElementById("registerAccount").addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation-account');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            var datos = new FormData;
            datos.append("accion", 2);
            datos.append("IN_ID_PROVIDER", id_provider);
            datos.append("IN_ID_BANK", $("#bank").val());
            datos.append("IN_ID_ACCOUNT_TYPE", $("#accountType").val());
            datos.append("IN_SSN", $("#selSSN").val() + "-" + $("#ssnAccount").val());
            datos.append("IN_ACCOUNT", $("#account").val());
            $.ajax({
                url: "Controllers/AccountController.php",
                type: "POST",
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (result) {
                    if (result == 'AJ001') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Successfully Registered Banking Information',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        tblAccount.ajax.reload();
                        $("#modalAccount").modal('hide');
                        form.classList.remove('was-validated');
                    }
                }
            });
        } else {
            form.classList.add('was-validated');
        }
    });
})

document.getElementById("saveAccount").addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation-account');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            var datos = new FormData;
            datos.append("accion", 4);
            datos.append("IN_ID_ACCOUNT", id_account);
            datos.append("IN_ID_BANK", $("#bank").val());
            datos.append("IN_ID_ACCOUNT_TYPE", $("#accountType").val());
            datos.append("IN_SSN", $("#selSSN").val() + "-" + $("#ssnAccount").val());
            datos.append("IN_ACCOUNT", $("#account").val());
            $.ajax({
                url: "Controllers/AccountController.php",
                type: "POST",
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (result) {
                    if (result == 'AJ001') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Successfully Upgraded Banking Information',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        tblAccount.ajax.reload();
                        $("#modalAccount").modal('hide');
                        form.classList.remove('was-validated');
                    }
                }
            });
        } else {
            form.classList.add('was-validated');
        }
    });
});

document.getElementById("registerContact").addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation-contact');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            var datos = new FormData;
            datos.append("accion", 2);
            datos.append("IN_ID_PROVIDER", id_provider);
            datos.append("IN_ID_CONTACT_TYPE", $("#contactType").val());
            datos.append("IN_CONTACT_NAME", $("#contactName").val());
            datos.append("IN_EMAIL", $("#emailContact").val());
            datos.append("IN_PHONE", $("#phoneContact").val());
            $.ajax({
                url: "Controllers/ContactController.php",
                type: "POST",
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (result) {
                    if (result == 'AJ001') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Successfully registered contact',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        tblContact.ajax.reload();
                        $("#modalContact").modal('hide');
                        form.classList.remove('was-validated');
                    }
                }
            });
        } else {
            form.classList.add('was-validated');
        }
    });
});

document.getElementById("saveContact").addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation-contact');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            var datos = new FormData;
            datos.append("accion", 4);
            datos.append("IN_ID_CONTACT", id_contact);
            datos.append("IN_ID_CONTACT_TYPE", $("#contactType").val());
            datos.append("IN_CONTACT_NAME", $("#contactName").val());
            datos.append("IN_EMAIL", $("#emailContact").val());
            datos.append("IN_PHONE", $("#phoneContact").val());
            $.ajax({
                url: "Controllers/ContactController.php",
                type: "POST",
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (result) {
                    if (result == 'AJ001') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Successfully Upgraded contact',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        tblContact.ajax.reload();
                        $("#modalContact").modal('hide');
                        form.classList.remove('was-validated');
                    }
                }
            });
        } else {
            form.classList.add('was-validated');
        }
    });
});