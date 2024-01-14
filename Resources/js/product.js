var store, init = false;
var tblProduct, tblInventory;
var id_product = 0, id_inventory;

$(document).ready(function () {
    loadContext();
    loadDataTables(true);
    loadDataTables(false);

    $("#nameCriteria, #itemCriteria").keyup(function () {
        tblProduct.column($(this).data('index')).search(this.value).draw();
    });

    $("#statusCriteria").change(function () {
        tblProduct.column($(this).data('index')).search(this.value).draw();
    });

    $("#cleanCriteria").on('click', function () {
        $("#nameCriteria").val('');
        $("#itemCriteria").val('');
        $("#statusCriteria").val('');
    })

    $("#newProduct").on('click', function () {
        $("#status").val(55).attr('disabled', true);
        $("#brand").val('');
        $("#classification").val('');
        $("#item").val('');
        $("#tradeName").val('');
        $("#shortDescription").val('');
        $("#longDescription").val('');
        $("#serial").val('Y');
        tabsProduct(true);
        $("#registerProduct").css('display', 'block');
        $("#saveProduct").css('display', 'none');
        $("#cardInventory").css('display', 'none');
    });

    $("#tblProduct tbody").on('click', '#editProduct', function () {
        var data = tblProduct.row($(this).parents('tr')).data();
        id_product = data['ID'];
        $.ajax({
            url: 'Controllers/ProductController.php',
            method: 'POST',
            data: { 'accion': 4, 'id_product': id_product },
            async: false,
            dataType: 'json',
            success: function (result) {
                tblInventory.destroy();
                loadDataTables(false);
                $("#status").val(result[0]['ID_STATUS']).attr('disabled', false);
                $("#brand").val(result[0]['ID_BRAND']);
                $("#classification").val(result[0]['ID_CLASSIFICATION']);
                $("#item").val(result[0]['ITEM_ID']).attr('disabled', true);
                $("#tradeName").val(result[0]['TRADENAME']);
                $("#shortDescription").val(result[0]['SHORT_DESCRIPTION']);
                $("#longDescription").val(result[0]['LONG_DESCRIPTION']);
                $("#serial").val(result[0]['SERIAL']);
                $("#registerProduct").css('display', 'none');
                $("#cardInventory").css('display', 'block');
                tabsProduct(true);
            }
        });
    });

    $("#tblProduct tbody").on('click', '#trashProduct', function () {
        var data = tblProduct.row($(this).parents('tr')).data();
        id_product = data['ID'];
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
                    url: 'Controllers/ProductController.php',
                    method: 'POST',
                    data: { 'accion': 3, 'id_product': id_product },
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
                            tblProduct.ajax.reload();
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

    $("#tblInventory tbody").on('click', '#editInventory', function () {
        var data = tblInventory.row($(this).parents('tr')).data();
        id_inventory = data['ID'];
        $.ajax({
            url: 'Controllers/ProductController.php',
            method: 'POST',
            data: { 'accion': 8, 'id_inventory': id_inventory },
            async: false,
            dataType: 'json',
            success: function (result) {
                $("#invProvider").val(result[0]['ID_PROVIDER']).attr('disabled', true);
                changeSelect();
                $("#invStore").val(result[0]['ID_STORE']).attr('disabled', true);
                $("#invStock").val(result[0]['STOCK']);
                $("#saveInventory").css('display', 'block');
                $("#regInventory").css('display', 'none');
                $("#modalInventory").modal('show');
            }
        });
    });

    $("#tblInventory tbody").on('click', '#trashInventory', function () {
        var data = tblInventory.row($(this).parents('tr')).data();
        id_inventory = data['ID'];
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
                    url: 'Controllers/ProductController.php',
                    method: 'POST',
                    data: { 'accion': 10, 'id_product': id_product, 'id_inventory': id_inventory },
                    async: false,
                    dataType: 'json',
                    success: function (result) {
                        if (result[0]['@OUT_COD_MESS'] == 'AJ001') {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your file has been deleted.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            if (result[0]['@OUT_RESD'] == 0) { $("#status").val(55); };
                            tblInventory.ajax.reload();
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
            }
        });
    })
});

function tabsProduct(value) {
    if (value) {
        $("#newProduct").css('display', 'none');
        $("#back").css('display', 'block');
        $("#tableProduct").removeClass("show").removeClass("active");
        $("#product-disabled").addClass("show").addClass("active");
    } else {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info');
                $("#newProduct").css('display', 'block');
                $("#back").css('display', 'none');
                $("#tableProduct").addClass("show").addClass("active");
                $("#product-disabled").removeClass("show").removeClass("active");
            }
        })
    }
}

function loadContext() {
    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 5, 'elemento': 'PRODUCTO' },
        async: false,
        dataType: 'json',
        success: function (result) {
            var options = ''
            for (var i = 0; i < result.length; i++) {
                if (result[i]['ID'] == 55) {
                    options = options + '<option selected value="' + result[i]['ID'] + '">' + result[i]['STATUS_VALUE'] + '</option>'
                } else {
                    options = options + '<option value="' + result[i]['ID'] + '">' + result[i]['STATUS_VALUE'] + '</option>'
                }
            }
            $("#status").html(options);
            var optionss = '<option selected value="">Open this select menu</option>'
            for (var i = 0; i < result.length; i++) {
                optionss = optionss + '<option value="' + result[i]['ID'] + '">' + result[i]['STATUS_VALUE'] + '</option>'
            }
            $("#statusCriteria").html(optionss);
        }
    });

    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 10 },
        async: false,
        dataType: 'json',
        success: function (result) {
            var options = '<option selected value="">Open this select menu</option>'
            for (var i = 0; i < result.length; i++) {
                options = options + '<option value="' + result[i]['ID'] + '">' + result[i]['CLASSIFICATION_NAME'] + '</option>'
            }
            $("#classification").html(options);
        }
    });

    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 11 },
        async: false,
        dataType: 'json',
        success: function (result) {
            var options = '<option selected value="">Open this select menu</option>'
            for (var i = 0; i < result.length; i++) {
                options = options + '<option value="' + result[i]['ID'] + '">' + result[i]['BRAND_NAME'] + '</option>'
            }
            $("#brand").html(options);
        }
    });

    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 12 },
        async: false,
        dataType: 'json',
        success: function (result) {
            var options = '<option selected value="">Open this select menu</option>'
            for (var i = 0; i < result.length; i++) {
                options = options + '<option value="' + result[i]['ID'] + '">' + result[i]['TRADENAME'] + '</option>'
            }
            $("#invProvider").html(options);
        }
    });

    $.ajax({
        url: 'Controllers/ContextController.php',
        method: 'POST',
        data: { 'accion': 13 },
        async: false,
        dataType: 'json',
        success: function (result) {
            store = result;
        }
    });
};

function loadDataTables(value) {
    if (value) {
        tblProduct = $("#tblProduct").DataTable({
            dom: 'Bfrtip',
            buttons: ['excel', 'print', 'pageLength'],
            ajax: {
                async: false,
                url: "Controllers/ProductController.php",
                type: "POST",
                dataSrc: '',
                data: {
                    'accion': 1
                }
            },
            columnDefs: [{
                targets: 2,
                visible: false,
            },
            {
                targets: 0,
                sortable: false,
                render: function (data, type, full, meta) {
                    return "<center>" +
                        "<button class='btn btn-outline-primary px-1 mx-1' type='button' id='showProduct' name='showProduct'>" +
                        "<i class='fa-regular fa-eye'></i>" +
                        "</button>" +
                        "<button class='btn btn-outline-warning px-1 mx-1' type='button' id='editProduct' name='editProduct'>" +
                        "<i class='fa-regular fa-pen-to-square'></i>" +
                        "</button>" +
                        "<button class='btn btn-outline-danger px-1 mx-1' type='button' id='trashProduct' name='trashProduct'>" +
                        "<i class='fa-regular fa-trash-can'></i>" +
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
    } else {
        tblInventory = $("#tblInventory").DataTable({
            dom: 'Bfrtip',
            buttons: [{
                text: 'Add',
                action: function (e, dt, node, config) {
                    $("#invProvider").attr('disabled', false).val('');
                    $("#invStore").attr('disabled', false).val('');
                    $("#invStock").val('');
                    $("#saveInventory").css('display', 'none');
                    $("#regInventory").css('display', 'block');
                    $("#modalInventory").modal('show');
                }
            }, 'excel', 'print', 'pageLength'],
            ajax: {
                async: false,
                url: "Controllers/ProductController.php",
                type: "POST",
                dataSrc: '',
                data: {
                    'accion': 6, 'id_product': id_product
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    sortable: false,
                    render: function (data, type, full, meta) {
                        return "<center>" +
                            "<button class='btn btn-outline-warning px-1 mx-1' type='button' id='editInventory' name='editInventory'>" +
                            "<i class='fa-regular fa-pen-to-square fs-5'></i>" +
                            "</button>" +
                            "<button class='btn btn-outline-danger px-1 mx-1' type='button' id='trashInventory' name='trashInventory'>" +
                            "<i class='fa-regular fa-trash-can'></i>" +
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
    }
};

function changeSelect() {
    var options = '<option selected value="">Open this select menu</option>'
    for (var i = 0; i < store.length; i++) {
        if (document.getElementById("invProvider").value == store[i]['ID_PROVIDER']) {
            options = options + '<option value="' + store[i]['ID'] + '">' + store[i]['TRADENAME'] + '</option>'
        }
    }
    $("#invStore").html(options);
}

document.getElementById("registerProduct").addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            var datos = new FormData();
            datos.append("accion", 2);
            datos.append("IN_ID_STATUS", $("#status").val());
            datos.append("IN_ID_BRAND", $("#brand").val());
            datos.append("IN_ID_CLASSIFICATION", $("#classification").val());
            datos.append("IN_ITEM_ID", $("#item").val());
            datos.append("IN_TRADENAME", $("#tradeName").val());
            datos.append("IN_SHORT_DESCRIPTION", $("#shortDescription").val());
            datos.append("IN_LONG_DESCRIPTION", $("#longDescription").val());
            datos.append("IN_SERIAL", $("#serial").val());
            $.ajax({
                url: "Controllers/ProductController.php",
                type: "POST",
                data: datos,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                success: function (result) {
                    console.log(result[0]['@OUT_COD_MESS']);
                    if (result[0]['@OUT_COD_MESS'] == 'AJ001') {
                        id_product = result[0]['@OUT_ID_PRODUCT'];
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Successfully Registered Product',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        form.classList.remove('was-validated');
                        tblProduct.ajax.reload();
                        tblInventory.destroy();
                        loadDataTables(false);
                        $("#status").attr('disabled', false);
                        $("#registerProduct").css('display', 'none');
                        $("#saveProduct").css('display', 'block');
                        $("#cardInventory").css('display', 'block');
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

document.getElementById("saveProduct").addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            var datos = new FormData();
            datos.append("accion", 5);
            datos.append("IN_ID_PRODUCT", id_product);
            datos.append("IN_ID_STATUS", $("#status").val());
            datos.append("IN_ID_BRAND", $("#brand").val());
            datos.append("IN_ID_CLASSIFICATION", $("#classification").val());
            datos.append("IN_TRADENAME", $("#tradeName").val());
            datos.append("IN_SHORT_DESCRIPTION", $("#shortDescription").val());
            datos.append("IN_LONG_DESCRIPTION", $("#longDescription").val());
            datos.append("IN_SERIAL", $("#serial").val());
            $.ajax({
                url: "Controllers/ProductController.php",
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
                            title: 'Product upgraded successfully',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        form.classList.remove('was-validated');
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

document.getElementById("regInventory").addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation-inv');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            var datos = new FormData();
            datos.append("accion", 7);
            datos.append("IN_ID_PRODUCT", id_product);
            datos.append("IN_ID_PROVIDER", $("#invProvider").val());
            datos.append("IN_ID_STORE", $("#invStore").val());
            datos.append("IN_STOCK", $("#invStock").val());
            $.ajax({
                url: "Controllers/ProductController.php",
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
                        tblInventory.ajax.reload();
                        $("#modalInventory").modal('hide');
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

document.getElementById("saveInventory").addEventListener('click', function () {
    var forms = document.getElementsByClassName('needs-validation-inv');
    var validation = Array.prototype.filter.call(forms, function (form) {
        if (form.checkValidity() === true) {
            var datos = new FormData();
            datos.append("accion", 9);
            datos.append("IN_ID_INVENTORY", id_inventory);
            datos.append("IN_STOCK", $("#invStock").val());
            $.ajax({
                url: "Controllers/ProductController.php",
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
                        tblInventory.ajax.reload();
                        $("#modalInventory").modal('hide');
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