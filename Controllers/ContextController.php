<?php

require "../Models/ContextModel.php";

class ContextController
{
    static public function loadPatologia()
    {
        $value = ContextModel::loadPatologia();
        echo json_encode($value);
    }

    static public function loadEspecialidad()
    {
        $value = ContextModel::loadEspecialidad();
        echo json_encode($value);
    }

    static public function loadProcedimiento($id_esp)
    {
        $value = ContextModel::loadProcedimiento($id_esp);
        echo json_encode($value);
    }

    static public function loadCitas($id_usuario)
    {
        $value = ContextModel::loadCitas($id_usuario);
        echo json_encode($value);
    }

    static public function registerDate($id_especialidad, $id_procedimiento, $id_paciente, $fecha)
    {
        $value = ContextModel::registerDate($id_especialidad, $id_procedimiento, $id_paciente, $fecha);
        echo json_encode($value);
    }

    static public function deleteDate($id)
    {
        $value = ContextModel::deleteDate($id);
        echo json_encode($value);
    }

    static public function loadUsers() {
        $value = ContextModel::loadUsers();
        echo json_encode($value);
    }

    static public function deleteUser($id, $type)
    {
        $value = ContextModel::deleteUser($id, $type);
        echo json_encode($value);
    }

    static public function loadDateDoctor($id_especialidad, $id_procedimiento, $fecha_ini, $fecha_fin)
    {
        $value = ContextModel::loadDateDoctor($id_especialidad, $id_procedimiento, $fecha_ini, $fecha_fin);
        echo json_encode($value);
    }
}

if (isset($_POST['accion']) && $_POST['accion'] == 1) {
    $value = new ContextController;
    $value->loadPatologia();
} elseif (isset($_POST['accion']) && $_POST['accion'] == 2) {
    $value = new ContextController;
    $value->loadEspecialidad();
} elseif (isset($_POST['accion']) && $_POST['accion'] == 3) {
    $value = new ContextController;
    $value->loadProcedimiento($_POST['especialidad']);
} elseif (isset($_POST['accion']) && $_POST['accion'] == 4) {
    $value = new ContextController;
    $value->loadCitas($_POST['id_usuario']);
} elseif (isset($_POST['accion']) && $_POST['accion'] == 5) {
    $value = new ContextController;
    $value->registerDate($_POST['especialidad'], $_POST['procedimiento'], $_POST['id_usuario'], $_POST['fecha']);
} elseif (isset($_POST['accion']) && $_POST['accion'] == 6) {
    $value = new ContextController;
    $value->deleteDate($_POST['id']);
} elseif (isset($_POST['accion']) && $_POST['accion'] == 7) {
    $value = new ContextController;
    $value->loadUsers();
} elseif (isset($_POST['accion']) && $_POST['accion'] == 8) {
    $value = new ContextController;
    $value->deleteUser($_POST['id'], $_POST['tipo']);
} elseif (isset($_POST['accion']) && $_POST['accion'] == 9) {
    $value = new ContextController;
    $value->loadDateDoctor($_POST['id_especialidad'], $_POST['id_procedimiento'], $_POST['fecha_ini'], $_POST['fecha_fin']);
}
