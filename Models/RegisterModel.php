<?php

require "conexion.php";

class RegisterModel
{
    static public function register_paciente($firtsName, $lastName, $phone, $address, $patologia, $condicion, $fech_nac, $email, $password)
    {
        try {
            $value = Conexion::conectar()->prepare("
            INSERT INTO usuarios(nombre_usuario, apellido_usuario, usuario, clave, id_perfil_usuario, estado, tipo)
            VALUES (:nombre, :apellido, :usuario, :clave, 2, 1, 2);
            
            INSERT INTO paciente(id, nombre, apellido, email, telefono, direccion, fech_nac, id_patologia, condicion)
            VALUES (LAST_INSERT_ID(), :nombre, :apellido, :email, :telefono, :direccion, :fecha, :id_pat, :condicion);");
            $value->bindParam(':usuario', $email, PDO::PARAM_STR);
            $value->bindParam(':clave', $password, PDO::PARAM_STR);
            $value->bindParam(':nombre', $firtsName, PDO::PARAM_STR);
            $value->bindParam(':apellido', $lastName, PDO::PARAM_STR);
            $value->bindParam(':email', $email, PDO::PARAM_STR);
            $value->bindParam(':telefono', $phone, PDO::PARAM_STR);
            $value->bindParam(':direccion', $address, PDO::PARAM_STR);
            $value->bindParam(':fecha', $fech_nac, PDO::PARAM_STR);
            $value->bindParam(':id_pat', $patologia, PDO::PARAM_INT);
            $value->bindParam(':condicion', $condicion, PDO::PARAM_STR);
            if ($value->execute()) {
                return true;
            };
        } catch (Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }

    static public function register_doctor($firtsName, $lastName, $cedula, $phone, $address, $fech_nac, $email, $especialidad, $procedimiento)
    {
        $caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $clave = '';
        for ($i = 0; $i < 8; $i++) {
            $clave .= $caracteres[rand(0, strlen($caracteres) - 1)];
        }
        $password_hash = password_hash($clave, PASSWORD_DEFAULT);

        try {
            $value = Conexion::conectar()->prepare("
            INSERT INTO usuarios (nombre_usuario, apellido_usuario, usuario, clave, id_perfil_usuario, estado, tipo)
            VALUES (:nombre, :apellido, :usuario, :clave, 3, 1, 1);
            
            INSERT INTO doctor (id, nombre, apellido, cedula, email, telefono, direccion, fech_nac, id_especialidad, id_procedimiento)
            VALUES (LAST_INSERT_ID(), :nombre, :apellido, :cedula, :email, :telefono, :direccion, :fecha, :id_especialidad, :id_procedimiento);");
            $value->bindParam(':usuario', $email, PDO::PARAM_STR);
            $value->bindParam(':clave', $password_hash, PDO::PARAM_STR);
            $value->bindParam(':nombre', $firtsName, PDO::PARAM_STR);
            $value->bindParam(':apellido', $lastName, PDO::PARAM_STR);
            $value->bindParam(':cedula', $cedula, PDO::PARAM_STR);
            $value->bindParam(':email', $email, PDO::PARAM_STR);
            $value->bindParam(':telefono', $phone, PDO::PARAM_STR);
            $value->bindParam(':direccion', $address, PDO::PARAM_STR);
            $value->bindParam(':fecha', $fech_nac, PDO::PARAM_STR);
            $value->bindParam(':id_especialidad', $especialidad, PDO::PARAM_INT);
            $value->bindParam(':id_procedimiento', $procedimiento, PDO::PARAM_INT);
            $value->execute();
            return array(
                'result' => true,
                'password' => $clave
            );
        } catch (Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }
}
