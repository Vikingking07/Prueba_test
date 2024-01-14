<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Editar Usuario</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a>Inicio</a></li>
                    <li class="breadcrumb-item active">Editar Usuario</li>
                </ol>
            </div>
        </div>
    </div>
</div>

<div class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Cambiar Contraseña</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <form class="needs-validation-pass row g-3" method="post" novalidate>
                            <div class="col-lg-12">
                                <label for="passwordOld" class="form-label">Contraseña Actual</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="passwordOld" name="passwordOld" placeholder="********">
                                    <span class="input-group-text"><i class="toggle-password-1 fas fa-eye-slash" style="cursor: pointer;" onclick="togglePassword(true)"></i></span>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <label for="passwordNew" class="form-label">Nueva Contraseña</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="passwordNew" name="passwordNew" placeholder="********">
                                    <span class="input-group-text"><i class="toggle-password-2 fas fa-eye-slash" style="cursor: pointer;" onclick="togglePassword(false)"></i></span>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <button type="reset" class="btn btn-secondary">Borrar</button>
                            </div>
                            <div class="col-lg-6">
                                <button type="button" class="btn btn-success" id="savePass">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    function togglePassword(value) {
        if (value) {
            var passwordInput = document.getElementById('passwordOld');
            var toggleIcon = document.querySelector('.toggle-password-1');
        } else {
            var passwordInput = document.getElementById('passwordNew');
            var toggleIcon = document.querySelector('.toggle-password-2');
        };

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        }
    };

    document.getElementById("savePass").addEventListener('click', function() {
        var forms = document.getElementsByClassName('needs-validation-pass');
        var validation = Array.prototype.filter.call(forms, function(form) {
            if (form.checkValidity() === true) {
                $.ajax({
                    url: "Controllers/ChangeController.php",
                    type: "POST",
                    data: {
                        'accion': 1,
                        'id_usuario': $("#id_usuario").val(),
                        'passwordOld': $("#passwordOld").val(),
                        'passwordNew': $("#passwordNew").val(),
                    },
                    dataType: 'json',
                    success: function(result) {
                        if (result == true) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Se cambio la clave con exito!',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            $("#passwordOld").val('')
                            $("#passwordNew").val('')
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