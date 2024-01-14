<?php

require "conexion.php";

class ContextModel
{
    static public function loadPatologia()
    {
        $value = Conexion::conectar()->prepare("SELECT * FROM patologia ORDER BY 2");
        $value->execute();
        return $value->fetchAll(PDO::FETCH_OBJ);
    }

    static public function loadEspecialidad()
    {
        $value = Conexion::conectar()->prepare("SELECT * FROM especialidades ORDER BY 2");
        $value->execute();
        return $value->fetchAll(PDO::FETCH_OBJ);
    }

    static public function loadProcedimiento($id_esp)
    {
        $value = Conexion::conectar()->prepare("SELECT id, descripcion FROM procedimiento where id_especialidad = :id ORDER BY 2");
        $value->bindParam(":id", $id_esp, PDO::PARAM_INT);
        $value->execute();
        return $value->fetchAll(PDO::FETCH_OBJ);
    }

    static public function loadCitas($id_usuario)
    {
        $value = Conexion::conectar()->prepare("SELECT a.estado as options, A.id, B.descripcion as desc_esp, c.descripcion as desc_proc, A.fecha, a.estado FROM cita A
                                                INNER JOIN especialidades B on A.id_especialidad = B.id
                                                INNER JOIN procedimiento C on A.id_procedimiento = C.id
                                                INNER JOIN paciente D on A.id_paciente = D.id
                                                WHERE A.id_paciente = :id
                                                ORDER BY A.fecha_creacion");
        $value->bindParam(":id", $id_usuario, PDO::PARAM_INT);
        $value->execute();
        return $value->fetchAll();
    }

    static public function registerDate($id_especialidad, $id_procedimiento, $id_paciente, $fecha)
    {
        try {
            $value = Conexion::conectar()->prepare("INSERT INTO cita (id_especialidad, id_procedimiento, id_paciente, fecha, estado)
                                                VALUES (:id_especialidad, :id_procedimiento, :id_paciente, :fecha, 1);");
            $value->bindParam(":id_especialidad", $id_especialidad, PDO::PARAM_INT);
            $value->bindParam(":id_procedimiento", $id_procedimiento, PDO::PARAM_INT);
            $value->bindParam(":id_paciente", $id_paciente, PDO::PARAM_INT);
            $value->bindParam(":fecha", $fecha, PDO::PARAM_STR);
            $value->execute();
            return true;
        } catch (Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }

    static public function deleteDate($id)
    {
        try {
            $value = Conexion::conectar()->prepare("DELETE FROM cita WHERE id = :id;");
            $value->bindParam(":id", $id, PDO::PARAM_INT);
            $value->execute();
            return true;
        } catch (Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }

    static public function loadUsers()
    {
        $value = Conexion::conectar()->prepare("SELECT tipo as options, id_usuario as id, nombre_usuario, apellido_usuario, estado, tipo FROM usuarios ORDER BY 1");
        $value->execute();
        return $value->fetchAll();
    }

    static public function deleteUser($id, $type)
    {
        try {
            $value = Conexion::conectar()->prepare("DELETE FROM usuarios WHERE id_usuario = :id;    
                                                    DELETE FROM doctor WHERE id = :id;
                                                    DELETE FROM paciente WHERE id = :id;
                                                    DELETE FROM citas WHERE id_paciente = :id;");
            $value->bindParam(":id", $id, PDO::PARAM_INT);
            $value->bindParam(":tipo", $type, PDO::PARAM_INT);
            $value->execute();
            return true;
        } catch (Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }

    static public function loadDateDoctor($id_especialidad, $id_procedimiento, $fecha_ini, $fecha_fin)
    {
        $value = Conexion::conectar()->prepare("SELECT null as options, A.id, B.nombre, B.apellido, C.descripcion, A.fecha, A.estado FROM cita A, paciente B, procedimiento c
                                                WHERE A.id_paciente = B.id
                                                and A.id_procedimiento = C.id
                                                AND A.id_especialidad = :id_especialidad
                                                AND A.id_procedimiento = :id_procedimiento
                                                AND A.fecha BETWEEN :fecha_ini AND :fecha_fin
                                                ORDER BY A.fecha ASC;");
        $value->bindParam(":id_especialidad", $id_especialidad, PDO::PARAM_INT);
        $value->bindParam(":id_procedimiento", $id_procedimiento, PDO::PARAM_INT);
        $value->bindParam(":fecha_ini", $fecha_ini, PDO::PARAM_STR);
        $value->bindParam(":fecha_fin", $fecha_fin, PDO::PARAM_STR);
        $value->execute();
        return $value->fetchAll();
    }
}
