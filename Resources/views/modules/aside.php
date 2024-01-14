<?php $mainUser = UserController::obtainMainUser($_SESSION['usuario']->id_usuario); ?>

<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="http://localhost/project_trst" class="brand-link">
        <img src="Resources/img/logoS.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
        <span class="brand-text font-weight-light">Centro Medico Moya</span>
    </a>

    <div class="sidebar">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="Resources/img/<?php echo $_SESSION['usuario']->image ?>" class="img-circle elevation-2" alt="User Image">
            </div>
            <div class="info">
                <p class="text-white d-block"><?php echo $_SESSION['usuario']->nombre_usuario . ' ' . $_SESSION['usuario']->apellido_usuario ?></p>
            </div>
            <input type="hidden" name="id_usuario" id="id_usuario" value="<?php echo $_SESSION['usuario']->id_usuario ?>">
            <?php if ($_SESSION['usuario']->tipo == 1) : ?>
                <input type="hidden" name="id_especialidad" id="id_especialidad" value="<?php echo $_SESSION['usuario']->id_especialidad ?>">
                <input type="hidden" name="id_procedimiento" id="id_procedimiento" value="<?php echo $_SESSION['usuario']->id_procedimiento ?>">
            <?php elseif ($_SESSION['usuario']->tipo == 0) : ?>
                <input type="hidden" name="id_especialidad" id="id_especialidad" value="0">
                <input type="hidden" name="id_procedimiento" id="id_procedimiento" value="0">
            <?php endif; ?>
        </div>

        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <?php foreach ($mainUser as $main) : ?>
                    <li class="nav-item">
                        <a class="nav-link <?php if ($main->vista_inicio == 1) : ?> <?php echo 'active'; ?> <?php endif; ?>" <?php if (!empty($main->vista)) : ?> onclick="loadContent('Resources/views/<?php echo $main->vista; ?>','content-wrapper')" <?php endif; ?> style="cursor: pointer;">
                            <i class="nav-icon <?php echo $main->icon_menu; ?>"></i>
                            <p>
                                <?php echo $main->modulo ?>
                                <?php if (empty($main->vista)) : ?>
                                    <i class="fas fa-angle-left right"></i>
                                <?php endif; ?>
                            </p>
                        </a>
                        <?php if (empty($main->vista)) : ?>
                            <?php $subMainUser = UserController::obtainSubMainUser($main->id); ?>
                            <ul class="nav nav-treeview">
                                <?php foreach ($subMainUser as $subMain) : ?>
                                    <li class="nav-item">
                                        <a class="nav-link" onclick="loadContent('Resources/views/<?php echo $subMain->vista ?>','content-wrapper')" style="cursor: pointer;">
                                            <i class="<?php echo $subMain->icon_menu; ?> nav-icon"></i>
                                            <p><?php echo $subMain->modulo; ?></p>
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </li>
                <?php endforeach; ?>
                <li class="nav-item">
                    <a class="nav-link" onclick="loadContent('Resources/views/profile.php','content-wrapper')">
                        <i class="fa-solid fa-user-gear"></i>
                        <p>Perfil</p>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</aside>

<script>
    $(".nav-link").on('click', function() {
        $(".nav-link").removeClass('active');
        $(this).addClass('active')
    })
</script>