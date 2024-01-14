<?php

require "../Models/ChangeModel.php";

class ChangeController
{
    static public function changePassword($id_usuario, $password_old, $password_new)
    {
        $value = ChangeModel::changePassword($id_usuario, $password_old, $password_new);
        echo json_encode($value);
    }

    static public function updateDate($id)
    {
        $value = ChangeModel::updateDate($id);
        echo json_encode($value);
    }
}

if (isset($_POST['accion']) && $_POST['accion'] == 1) {
    $value = new ChangeController;
    $value->changePassword($_POST['id_usuario'], $_POST['passwordOld'], $_POST['passwordNew']);
} elseif (isset($_POST['accion']) && $_POST['accion'] == 2) {
    $value = new ChangeController;
    $value->updateDate($_POST['id']);
}