<?php

require "conexion.php";

class ChangeModel
{
    static public function changePassword($id_usuario, $password_old, $password_new)
    {
        $value = Conexion::conectar()->prepare("SELECT clave FROM usuarios WHERE id_usuario = :id");
        $value->bindParam(":id", $id_usuario, PDO::PARAM_INT);
        $value->execute();
        $password = $value->fetchAll(PDO::FETCH_CLASS);

        if (password_verify($password_old, $password[0]->clave)) {
            $password_hash = password_hash($password_new, PASSWORD_DEFAULT);
            try {
                $value1 = Conexion::conectar()->prepare("UPDATE usuarios SET clave = :clave, fech_act = CURRENT_TIMESTAMP WHERE id_usuario = :id;");
                $value1->bindParam(":clave", $password_hash, PDO::PARAM_STR);
                $value1->bindParam(":id", $id_usuario, PDO::PARAM_INT);
                $value1->execute();
                return true;
            } catch (Exception $e) {
                return "Error: " . $e->getMessage();
            }
        } else {
            return "La contraseña introducida es invalida!";
        }
    }

    static public function updateDate($id)
    {
        try {
            $value = Conexion::conectar()->prepare("UPDATE cita SET estado = 2 WHERE id = :id;");
            $value->bindParam(":id", $id, PDO::PARAM_INT);
            $value->execute();
            return true;
        } catch (Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }
}
