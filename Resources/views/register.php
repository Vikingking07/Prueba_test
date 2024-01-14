<div class="d-flex justify-content-center align-items-center">
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="card">
                    <div class="card-body p-4">
                        <img src="Resources/img/logo.png" class="rounded mx-auto d-block" style="height: 200px; width: 200px;" alt="">
                        <hr>
                        <form class="needs-validation row g-3" method="post" action="Controllers/RegisterController.php" novalidate>
                            <input type="hidden" name="accion" value="1">
                            <div class="col-6">
                                <label for="firtsName" class="form-label">Nombre</label>
                                <input type="text" maxlength="15" class="form-control form-control-sm text-capitalize" id="firtsName" name="firtsName" placeholder="Nombre" required>
                            </div>
                            <div class="col-6">
                                <label for="lastName" class="form-label">Apellido</label>
                                <input type="text" maxlength="15" class="form-control form-control-sm text-capitalize" id="lastName" name="lastName" placeholder="Apellido" required>
                            </div>
                            <div class="col-6">
                                <label for="phone" class="form-label">Teléfono</label>
                                <input type="tel" maxlength="14" class="form-control form-control-sm" id="phone" name="phone" placeholder="Telefono" pattern="[0-9\+]+" required>
                            </div>
                            <div class="col-6">
                                <label for="fech_nac" class="form-label">Fecha de Nacimiento</label>
                                <input type="date" class="form-control form-control-sm" id="fech_nac" name="fech_nac" placeholder="Telefono" required>
                            </div>
                            <div class="col-12">
                                <label for="address" class="form-label">Dirección</label>
                                <textarea class="form-control form-control-sm" maxlength="150" rows="3" id="address" name="address" placeholder="Direccion" required></textarea>
                            </div>
                            <div class="col-12">
                                <label for="patologia" class="form-label">Padeces de alguna enfermedad?</label>
                                <select class="form-select form-select-sm" id="patologia" name="patologia" required>
                                    <option selected disabled value="">Seleccione un opcion</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="condicion" class="form-label">En qué condición se encuentra tu enfermedad?</label>
                                <select class="form-select form-select-sm" id="condicion" name="condicion" required>
                                    <option selected disabled value="">Seleccione un opcion</option>
                                    <option value="1">Activa</option>
                                    <option value="2">Controlada</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label for="email" class="form-label">Correo Electrónico</label>
                                <input type="email" maxlength="50" class="form-control form-control-sm" id="email" name="email" placeholder="name@example.com" required>
                            </div>
                            <div class="col-6 mb-3">
                                <label for="password" class="form-label">Contraseña</label>
                                <div class="input-group">
                                    <input type="password" class="form-control form-control-sm" id="password" name="password" placeholder="password" required>
                                    <span class="input-group-text"><i class="toggle-password fas fa-eye-slash" style="cursor: pointer;" onclick="togglePassword()"></i></span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <button class="btn btn-secondary w-100" type="reset">Borrar</button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-primary w-100" type="button" id="save" name="save">Registrar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    $.ajax({
        url: 'Controllers/ContextController.php',
        type: 'POST',
        data: {
            'accion': 1,
        },
        async: false,
        dataType: 'json',
        success: function(result) {
            console.log(result);
            var options = '<option selected disabled value="">Seleccione un opcion</option>'
            for (let i = 0; i < result.length; i++) {
                options = options + '<option value="' + result[i]['id'] + '">' + result[i]['descripcion'] + '</option>'
            }
            $("#patologia").html(options);
        }
    });

    var inputFechaNacimiento = document.getElementById('fech_nac').max = obtenerFechaActual();

    var campoFecha = document.getElementById('fech_nac');
    campoFecha.addEventListener('input', function() {
        const fechaActual = obtenerFechaActual();
        const valorFecha = campoFecha.value;
        if (valorFecha > fechaActual) {
            alert('No se permiten fechas pasadas. Por favor, selecciona una fecha válida.');
            campoFecha.value = fechaActual;
        }
    });

    function obtenerFechaActual() {
        const hoy = new Date();
        const yyyy = hoy.getFullYear();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        const dd = String(hoy.getDate() - 1).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    function togglePassword() {
        const passwordInput = document.getElementById('password');
        const toggleIcon = document.querySelector('.toggle-password');
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

    document.getElementById('phone').addEventListener('input', function(event) {
        var inputValue = event.target.value;
        var numericValue = inputValue.replace(/[^0-9+]/g, '');
        event.target.value = numericValue;
    });

    document.getElementById("save").addEventListener('click', function() {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function(form) {
            if (form.checkValidity() === true) {
                form.classList.remove('was-validated');
                $(".needs-validation").submit();
            } else {
                form.classList.add('was-validated');
            }
        });
    });
</script>