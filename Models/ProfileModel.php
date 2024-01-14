<?php

require "conexion.php";

class ProfileModule
{

    static public function obtainProfiles()
    {
        $value = Conexion::conectar()->prepare("SELECT A.id_perfil, A.descripcion, A.estado, DATE(A.fecha_creacion) as fecha_creacion, A.fecha_actualizacion, '' as opciones
                                                FROM perfiles a ORDER BY a.id_perfil");
        $value->execute();
        return $value->fetchAll();
    }

    static public function regsiterProfile($name)
    {
        try {
            $value = Conexion::conectar()->prepare("INSERT INTO perfiles (descripcion, estado) 
                                                VALUES (:descripcion, 1);");
            $value->bindParam(":descripcion", $name, PDO::PARAM_STR);
            $value->execute();
            return true;
        } catch (Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }
}
