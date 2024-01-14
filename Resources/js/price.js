var system_product;
var tblPrice;
var id_price;

$(document).ready(function () {
    loadContext();
    loadTree();
    loadDataTables();

    $('#mark_all').on('click', function () {
        $('#product').jstree('select_all');
    });

    $('#uncheck_all').on('click', function () {
        $('#product').jstree('deselect_all', false);
    });

    $("#tblPrice tbody").on('click', '#editPrice', function () {
        var data = tblPrice.row($(this).parents('tr')).data();
        id_price = data['ID'];
        let_products = data['PRODUCTS'];
        $("#priceName").val(data['PRICE_NAME']);
        $("#priceType").attr('disabled', true).val(data['ID_PRICE_TYPE']);
        $("#price").val(data['PRICE']);
        $('#product').jstree('deselect_all');
        for (let i = 0; i < let_products.length; i++) {
            $("#product").jstree("select_node", let_products[i]);
        };
        $("#asignar").css('display','none');
        $("#save").css('display','block');
    });

    $("#tblPrice tbody").on('click', '#trashPrice', function () {
        var data = tblPrice.row($(this).parents('tr')).data();
        id_price = data['ID'];
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
                    url: 'Controllers/PriceController.php',
                    method: 'POST',
                    data: { 'accion': 5, 'IN_ID_PRICE': id_price },
                    async: false,
                    dataType: 'json',
                    success: function (result) {
                        if (result == 'AJ001') {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your file has been deleted.',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            tblPrice.ajax.reload();
                        } else {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: result,
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    }
                });
            }
        });
    });
});

function loadContext() {
    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 14 },
        async: false,
        dataType: 'json',
        success: function (result) {
            var options = '<option selected value="">Open this select menu</option>'
            for (var i = 0; i < result.length; i++) {
                options = options + '<option value="' + result[i]['ID'] + '">' + result[i]['PRICE_TYPE'] + '</option>'
            }
            $("#priceType").html(options);
        }
    });
};

function loadDataTables() {
    tblPrice = $("#tblPrice").DataTable({
        ajax: {
            async: false,
            url: "Controllers/PriceController.php",
            type: "POST",
            dataSrc: '',
            data: {
                'accion': 2
            }
        },
        columnDefs: [
            {
                targets: 0,
                sortable: false,
                render: function (data, type, full, meta) {
                    return "<center>" +
                        "<button class='btn btn-outline-warning px-1 mx-1' type='button' id='editPrice' name='editPrice'>" +
                        "<i class='fa-regular fa-pen-to-square fs-5'></i>" +
                        "</button>" +
                        "<button class='btn btn-outline-danger px-1 mx-1' type='button' id='trashPrice' name='trashPrice'>" +
                        "<i class='fa-regular fa-trash-can fs-5'></i>" +
                        "</button>" +
                        "</center>"
                }
            },
            { targets: 2, visible: false },
            { targets: 7, visible: false },],
        scrollX: true,
        responsive: { details: { type: 'column' }, },
        language: {
            "url": "Resources/plugins/datatables/Spanish.json"
        }
    })
}

function loadTree() {
    $.ajax({
        url: 'Controllers/PriceController.php',
        method: 'POST',
        data: { 'accion': 1 },
        async: false,
        dataType: 'json',
        success: function (result) {
            system_product = result;
            $('#product').jstree({
                'core': {
                    "check_callback": true,
                    'data': result
                },
                "checkbox": {
                    "keep_selected_style": false
                },
                "types": {
                    "default": {
                        "icon": "fa-solid fa-box text-warning"
                    }
                },
                "plugins": ["wholerow", "checkbox", "types", "changed"]
            }).bind("loaded.jstree", function (event, data) {
                $(this).jstree("open_all");
            });
        }
    });
};

document.getElementById("asignar").addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            selectedElmsIds = [];
            var selectedElms = $('#product').jstree("get_selected", true);
            $.each(selectedElms, function () {
                selectedElmsIds.push(this.id);
            });
            let paySelect = [...new Set(selectedElmsIds)];
            var datos = new FormData();
            datos.append("accion", 3);
            datos.append("IN_PRICE_NAME", $("#priceName").val());
            datos.append("IN_ID_PRICE_TYPE", $("#priceType").val());
            datos.append("IN_PRICE", $("#price").val());
            datos.append("IN_LET_PRODUCT", selectedElmsIds);
            $.ajax({
                url: "Controllers/PriceController.php",
                type: "POST",
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    if (result == 'AJ001') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Stock in Loaded Inventory',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        form.classList.remove('was-validated');
                        $('#product').jstree('deselect_all', false);
                        $("#priceName").val('');
                        $("#priceType").val('');
                        $("#price").val('');
                        tblPrice.ajax.reload();
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
})

document.getElementById("save").addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            selectedElmsIds = [];
            var selectedElms = $('#product').jstree("get_selected", true);
            $.each(selectedElms, function () {
                selectedElmsIds.push(this.id);
            });
            let paySelect = [...new Set(selectedElmsIds)];
            var datos = new FormData();
            datos.append("accion", 4);
            datos.append("IN_ID_PRICE", id_price);
            datos.append("IN_PRICE_NAME", $("#priceName").val());
            datos.append("IN_PRICE", $("#price").val());
            datos.append("IN_LET_PRODUCT", selectedElmsIds);
            $.ajax({
                url: "Controllers/PriceController.php",
                type: "POST",
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    if (result == 'AJ001') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Stock in Loaded Inventory',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        form.classList.remove('was-validated');
                        $('#product').jstree('deselect_all', false);
                        $("#priceName").val('');
                        $("#priceType").val('');
                        $("#price").val('');
                        $("#asignar").css('display','block');
                        $("#save").css('display','none');
                        tblPrice.ajax.reload();
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
})