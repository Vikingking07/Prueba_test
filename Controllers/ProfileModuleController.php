<?php

require "../Models/ProfileModuleModel.php";

class ProfileModuleController
{
    static public function toRegisterProfileModule($array_idModulo, $idPerfil, $id_modulo_inicio)
    {
        $toRegisterProfileModule = ProfileModuleModel::toRegisterProfileModule($array_idModulo, $idPerfil, $id_modulo_inicio);
        echo json_encode($toRegisterProfileModule);
    }
}

if (isset($_POST['accion']) && $_POST['accion'] == 1) {
    $toRegisterProfileModule = new ProfileModuleController;
    $toRegisterProfileModule->toRegisterProfileModule($_POST['id_modulosSeleccionados'], $_POST['id_Perfil'], $_POST['id_modulo_inicio']);
}
