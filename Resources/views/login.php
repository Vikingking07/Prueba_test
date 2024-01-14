<div class="d-flex justify-content-center align-items-center">
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="card">
                    <div class="card-body p-5">
                        <img src="Resources/img/logo.png" class="img-fluid rounded mx-auto d-block" style="height: 200px; width: 200px;" alt="">
                        <form class="needs-validation mb-3 mt-md-4" method="post">
                            <input type="hidden" name="accion" value="1">
                            <p class="text-center">¡Por favor, Inicie Sesión para Continuar!</p>
                            <hr>
                            <div class="row g-3 mb-3 text-center">
                                <div class="col-6 form-check">
                                    <input class="form-check-input" type="radio" name="loginType" id="chkUser1" value="1">
                                    <label class="form-check-label" for="chkUser1">
                                        Doctor
                                    </label>
                                </div>
                                <div class="col-6 form-check">
                                    <input class="form-check-input" type="radio" name="loginType" id="chkUser2" value="2" checked>
                                    <label class="form-check-label" for="chkUser2">
                                        Paciente
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="loginUser" class="form-label ">Correo Electrónico</label>
                                <input type="email" class="form-control" id="loginUser" name="loginUser" placeholder="name@example.com" required>
                            </div>
                            <label for="loginPassword" class="form-label ">Contraseña</label>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" id="loginPassword" name="loginPassword" placeholder="*******" required>
                                <span class="toggle-password input-group-text" style="cursor: pointer;"><i class="fas fa-eye"></i></span>
                            </div>
                            <div class="d-grid">
                                <span class="text-center text-red mb-3"><?php
                                        $login = new UserController();
                                        $login->login();
                                        ?></span>
                                <button class="btn btn-outline-dark" type="submit">Iniciar Sesión</button>
                            </div>
                        </form>
                        <div>
                            <p class="mb-0 text-center">¿No tienes una cuenta? <a class="text-primary fw-bold" onclick="loadContent('Resources/views/register.php','content-wrap')" style="cursor: pointer;">Registrate</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>