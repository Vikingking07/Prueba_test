<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Administrador</h1>
            </div>
            <!-- <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active">Administrador</li>
                </ol>
            </div> -->
        </div>
    </div>
</div>

<div class="content">
    <div class="container-fluid">
        <ul>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-roles-tab" data-bs-toggle="tab" data-bs-target="#nav-roles" type="button" role="tab" aria-controls="nav-roles" aria-selected="true">Perfiles</button>
                <button class="nav-link" id="nav-module-tab" data-bs-toggle="tab" data-bs-target="#nav-module" type="button" role="tab" aria-controls="nav-module" aria-selected="false">Modulos</button>
            </div>
        </ul>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-roles" role="tabpanel" aria-labelledby="nav-roles-tab" tabindex="0">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card card-dark shadow">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-list"></i>Listado de Perfiles</h3>
                            </div>
                            <div class="card-body">
                                <table id="tblProfile" class="table nowrap table-striped w-100 shadow rounded">
                                    <thead class="bg-secondary text-left">
                                        <th>Id Perfil</th>
                                        <th>Perfil</th>
                                        <th>Estado</th>
                                        <th>F. Creacion</th>
                                        <th>F. Actualizacion</th>
                                        <th class="text-center">Opciones</th>
                                    </thead>
                                    <tbody class="small text-light left"></tbody>
                                </table>
                            </div>
                            <div class="card-footer">
                                <div class="col-lg-4">
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Nuevo Perfil
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card card-info card-outline shadow" style="display: none;" id="card-modulos">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-laptop"></i>Modulos del Sistema</h3>
                            </div>
                            <div class="card-body" id="card-body-modulos">
                                <div class="row m-2">
                                    <div class="col-md-6">
                                        <button class="btn btn-success btn-small m-0 p-0 w-100" id="marcar_modulos">Marcar Todo</button>

                                    </div>
                                    <div class="col-md-6">
                                        <button class="btn btn-danger btn-small m-0 p-0 w-100" id="desmarcar_modulos">Desmarcar Todo</button>
                                    </div>
                                </div>
                                <div id="modulos" class="demo"></div>
                                <div class="row m-2">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Seleccione el modulo de inicio</label>
                                            <select id="select_modulos" name="select_modulos" class="custom-select"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-2">
                                    <div class="col-md-12">
                                        <button class="btn btn-success btn-small w-50 text-center" id="asignar_modulos" name="asignar_modulos">Asignar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="nav-module" role="tabpanel" aria-labelledby="nav-module-tab" tabindex="0">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card card-info card-outline shadow">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-list"></i> Listado de Módulos</h3>
                            </div>
                            <div class="card-body">
                                <table id="tblModule" class="table nowrap table-striped shadow rounded" style="width:100%">
                                    <thead class="bg-info text-left">
                                        <th class="text-center">Opciones</th>
                                        <th>id</th>
                                        <th>orden</th>
                                        <th>Módulo</th>
                                        <th>Módulo Padre</th>
                                        <th>Vista</th>
                                        <th>Icono</th>
                                        <th>F. Creación</th>
                                        <th>F. Actualización</th>
                                    </thead>
                                    <tbody class="small text left"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card card-info card-outline shadow">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-edit"></i> Registro de Módulos</h3>
                            </div>
                            <div class="card-body">
                                <form method="post" class="needs-validation-registro-modulo" novalidate id="frm_registro_modulo">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group mb-2">
                                                <label for="iptModulo" class="m-0 p-0 col-sm-12 col-form-label-sm" for="iptModulo">
                                                    <span class="small">Módulo</span><span class="text-danger">*</span></label>
                                                <div class="input-group m-0">
                                                    <input type="text" class="form-control form-control-sm" name="iptModulo" id="iptModulo" required>
                                                    <div class="input-group-append">
                                                        <span class="input-group-text bg-info"><i class="fas fa-laptop text-white fs-6"></i></span>
                                                    </div>
                                                </div>
                                                <div class="invalid-feedback">Debe ingresar el módulo</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group mb-2">
                                                <label for="iptVistaModulo" class="m-0 p-0 col-sm-12 col-form-label-sm"><span class="small">Vista PHP</span></label>
                                                <div class="input-group m-0">
                                                    <input type="text" class="form-control form-control-sm" name="iptVistaModulo" id="iptVistaModulo">
                                                    <div class="input-group-append">
                                                        <span class="input-group-text bg-info"><i class="fas fa-code text-white fs-6"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group mb-2">
                                                <label for="iptIconoModulo" class="m-0 p-0 col-sm-12 col-form-label-sm">
                                                    <span class="small">Icono</span><span class="text-danger">*</span></label>
                                                <div class="input-group m-0">
                                                    <input type="text" placeholder="<i class='far fa-circle'></i>" name="iptIconoModulo" class="form-control form-control-sm" id="iptIconoModulo" required>
                                                    <div class="input-group-append">
                                                        <span class="input-group-text bg-info" id="spn_icono_modulo"><i class="far fa-circle text-white fs-6"></i></span>
                                                    </div>
                                                    <div class="invalid-feedback">Debe ingresar el Icono del modulo</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group m-0 mt-2">
                                                <button type="button" class="btn btn-success w-100" id="btnRegistrarModulo">Guardar Módulo</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card card-info card-outline shadow">
                            <div class="card-header">
                                <h3 class="card-title"><i class="fas fa-edit"></i> Organizar Módulos</h3>
                            </div>
                            <div class="card-body">
                                <div class="">
                                    <div>Modulos del Sistema</div>
                                    <div class="arbolModulos" id="arbolModulos"></div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="text-center">
                                            <button id="btnReordenarModulos" class="btn btn-success mt-3 " style="width: 45%;">Organizar Módulos</button>
                                            <button id="btnReiniciar" class="btn btn-warning mt-3 " style="width: 45%;">Estado Inicial</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Nuevo Perfil</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form class="needs-validation row g-3" method="post" novalidate>
                    <div class="col-md-12">
                        <label for="perfil" class="form-label">Nombre del Perfil</label>
                        <input type="text" class="form-control form-control-sm" id="perfil" name="perfil" required>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="savePerfil" name="savePerfil">Save changes</button>
            </div>
        </div>
    </div>
</div>

<script src="Resources/js/roles.js"></script>