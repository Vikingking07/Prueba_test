var tblCustomer;
var state, municp, parish, city;
var id_customer;

$(document).ready(function () {
    loadContext();
    loadDataTables();

    $("#tblCustomer tbody").on('click', '#editCustomer', function () {
        var data = tblCustomer.row($(this).parents('tr')).data();
        id_customer = data['ID'];
        $.ajax({
            url: 'Controllers/CustomerController.php',
            method: 'POST',
            data: { 'accion': 2, "id_customer": id_customer },
            async: false,
            dataType: 'json',
            success: function (result) {
                let [selSSN, ssn] = result[0]['SSN'].split('-');
                $("#customerCode").val(result[0]['CUSTOMER_CODE']);
                $("#legalName").val(result[0]['LEGAL_NAME']);
                $("#selSSN").val(selSSN);
                ssnSelect();
                $("#ssn").val(ssn);
                $("#phone").val(result[0]['PHONE']);
                $("#cellPhone").val(result[0]['CELL_PHONE']);
                $("#email").val(result[0]['EMAIL']);
                $("#status").val(result[0]['ID_STATUS']);
                $("#specialTaxpayer").val(result[0]['SPECIAL_TAXPAYER']);
                specialSelect();
                $("#taxPercentage").val(result[0]['TAX_PERCENTAGE']);
                $("#taxWithholding").val(result[0]['TAX_WITHHOLDING']);
                $("#collectionCode").val(result[0]['COLLECTION_CODE']);
                $("#monthylGoal").val(result[0]['MONTHLY_GOAL']);
                $("#state").val(result[0]['ID_STATE']);
                structuredDirection(1);
                $("#municp").val(result[0]['ID_MUNICP']);
                structuredDirection(2);
                $("#parish").val(result[0]['ID_PRRQ']);
                structuredDirection(3);
                $("#city").val(result[0]['ID_CITY']);
                $("#address").val(result[0]['ADDRESS']);
                $("#modalCustomer").modal('show');
            }
        });
    });
});

function ssnSelect() {
    var ssn = document.getElementById("selSSN").value;
    if (ssn == 'V' || ssn == 'E') {
        document.getElementById("ssn").setAttribute("maxlength", "8");
    } else {
        document.getElementById("ssn").setAttribute("maxlength", "9");
    }
}

function specialSelect() {
    var specialTaxpayer = document.getElementById("specialTaxpayer").value;
    if (specialTaxpayer == 'Y') {
        $("#taxWithholding").attr('disabled', false).attr('required', true).val(100);
    } else {
        $("#taxWithholding").attr('disabled', true).attr('required', false).val(0);
    }
}

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
        data: { 'accion': 5, 'elemento': 'PUNTO_VENTA' },
        async: false,
        dataType: 'json',
        success: function (result) {
            var options = ''
            for (var i = 0; i < result.length; i++) {
                options = options + '<option value="' + result[i]['ID'] + '">' + result[i]['STATUS_VALUE'] + '</option>'
            }
            $("#status").html(options);
        }
    });
};

function loadDataTables() {
    tblCustomer = $("#tblCustomer").DataTable({
        dom: 'Bfrtip',
        buttons: ['excel', 'print', 'pageLength'],
        ajax: {
            async: false,
            url: "Controllers/CustomerController.php",
            type: "POST",
            dataSrc: '',
            data: {
                'accion': 1
            }
        },
        columnDefs: [
            {
                targets: 0,
                sortable: false,
                render: function (data, type, full, meta) {
                    return "<center>" +
                        "<button class='btn btn-outline-warning px-1 mx-1' type='button' id='editCustomer' name='editCustomer'>" +
                        "<i class='fa-regular fa-pen-to-square fs-5'></i>" +
                        "</button>" +
                        "<button class='btn btn-outline-primary px-1 mx-1' type='button' id='' name=''>" +
                        "<i class='fa-regular fa-eye'></i>" +
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

function structuredDirection(value) {
    if (value == 1) {
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
    } else if (value == 2) {
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
        var var_parish = document.getElementById("parish").value;
        var options = '<option selected>Open this select menu</option>'
        for (var i = 0; i < city.length; i++) {
            if (city[i]['ID_PARISH'] == var_parish) {
                options = options + '<option value="' + city[i]['ID'] + '">' + city[i]['CITY_NAME'] + '</option>'
            }
        }
        $("#city").html(options);
    }
};

document.getElementById('save').addEventListener('click', function() {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            var datos = new FormData();
            datos.append("accion", 3);
            datos.append("IN_ID_CUSTOMER", id_customer);
            datos.append("IN_CUSTOMER_CODE", $("#customerCode").val());
            datos.append("IN_LEGAL_NAME", $("#legalName").val());
            datos.append("IN_SSN", $("#selSSN").val() + '-' + $("#ssn").val());
            datos.append("IN_PHONE", $("#phone").val());
            datos.append("IN_CELL_PHONE", $("#cellPhone").val());
            datos.append("IN_EMAIL", $("#email").val());
            datos.append("IN_ID_STATUS", $("#status").val());
            datos.append("IN_SPECIAL_TAXPAYER", $("#specialTaxpayer").val());
            datos.append("IN_TAX_PERCENTAGE", $("#taxPercentage").val());
            datos.append("IN_TAX_WITHHOLDING", $("#taxWithholding").val());
            datos.append("IN_COLLECTION_CODE", $("#collectionCode").val());
            datos.append("IN_MONTHLY_GOAL", $("#monthylGoal").val());
            datos.append("IN_ID_STATE", $("#state").val());
            datos.append("IN_ID_MUNICP", $("#municp").val());
            datos.append("IN_ID_PRRQ", $("#parish").val());
            datos.append("IN_ID_CITY", $("#city").val());
            datos.append("IN_ADDRESS", $("#address").val());
            $.ajax({
                url: "Controllers/CustomerController.php",
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
                            title: 'Customer Updated Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $("#modalCustomer").modal('hide');
                        tblCustomer.ajax.reload();
                        form.classList.remove('was-validated');
                    }
                }
            });
        } else {
            form.classList.add('was-validated');
        }
    });
});