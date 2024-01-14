<?php

require "../Models/RegisterModel.php";

class RegisterController
{
    static public function register_paciente($firtsName, $lastName, $phone, $address, $patologia, $condicion, $fech_nac, $email, $password)
    {
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $value = RegisterModel::register_paciente($firtsName, $lastName, $phone, $address, $patologia, $condicion, $fech_nac, $email, $password_hash);
        if ($value) {
            echo '<script> window.location = "http://localhost/project/" </script>';
        } else {
            echo '<script> window.location = "http://localhost/project/" </script>';  
        }
    }

    static public function register_doctor($firtsName, $lastName, $cedula, $phone, $address, $fech_nac, $email, $especialidad, $procedimiento)
    {
        $value = RegisterModel::register_doctor($firtsName, $lastName, $cedula, $phone, $address, $fech_nac, $email, $especialidad, $procedimiento);
        echo json_encode($value);
    }
}

if (isset($_POST['accion']) && $_POST['accion'] == 1) {
    $value = new RegisterController;
    $value->register_paciente($_POST['firtsName'], $_POST['lastName'], $_POST['phone'], $_POST['address'], $_POST['patologia'], $_POST['condicion'], $_POST['fech_nac'], $_POST['email'], $_POST['password']);
} elseif (isset($_POST['accion']) && $_POST['accion'] == 2) {
    $value = new RegisterController;
    $value->register_doctor($_POST['firtsName'], $_POST['lastName'], $_POST['cedula'], $_POST['phone'], $_POST['address'], $_POST['fech_nac'], $_POST['email'], $_POST['especialidad'], $_POST['procedimiento']);
}
