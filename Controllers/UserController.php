<?php

require "./Models/UserModel.php";

class UserController
{

    static public function login()
    {
        if (isset($_POST["loginUser"])) {
            $usuario = $_POST['loginUser'];
            $password = $_POST['loginPassword'];
            $type = $_POST['loginType'];

            if ($usuario == 'admin@gmail.com') {
                $respuesta = UserModel::admin($usuario);
            } else {
                $respuesta = UserModel::singIn($usuario, $type);
            }

            if (count($respuesta) > 0) {
                if (password_verify($password, $respuesta[0]->clave)) {
                    $_SESSION["usuario"] = $respuesta[0];
                    echo '<script> window.location = "http://localhost/project/" </script>';
                } else {
                    echo "Usuario y/o Contraseña invalida";
                }
            } else {
                echo "Usuario no registrado";
            }
        }
    }

    static public function obtainMainUser($id_usuario)
    {
        $mainUser = UserModel::obtainMainUser($id_usuario);
        return $mainUser;
    }

    static public function obtainSubMainUser($idMenu)
    {
        $subMainUser = UserModel::obtainSubMainUser($idMenu);
        return $subMainUser;
    }
}
