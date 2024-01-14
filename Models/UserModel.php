<?php

class UserModel
{

    static public function admin($user)
    {
        $value = Conexion::conectar()->prepare("SELECT A.id_usuario, A.nombre_usuario, A.apellido_usuario, A.usuario, A.clave, A.image, C.vista_inicio, D.vista, A.tipo FROM usuarios A
        INNER JOIN perfiles B ON B.id_perfil = A.id_perfil_usuario 
        INNER JOIN perfil_modulo C ON C.id_perfil = A.id_perfil_usuario
        INNER JOIN modulos D ON D.id = C.id_modulo
        WHERE A.usuario = :usuario
        AND A.tipo = 0
        AND C.vista_inicio = 1;");
        $value->bindParam(":usuario", $user, PDO::PARAM_STR);
        $value->execute();
        return $value->fetchAll(PDO::FETCH_CLASS);
    }

    static public function singIn($user, $type)
    {
        if ($type == 1) {
            $sql = "SELECT A.id_usuario, A.nombre_usuario, A.apellido_usuario, A.usuario, A.clave, A.image, C.vista_inicio, D.vista, E.id_especialidad, E.id_procedimiento, A.tipo FROM usuarios A
            INNER JOIN perfiles B ON B.id_perfil = A.id_perfil_usuario 
            INNER JOIN perfil_modulo C ON C.id_perfil = A.id_perfil_usuario
            INNER JOIN modulos D ON D.id = C.id_modulo
            INNER JOIN doctor E ON A.id_usuario = E.id
            WHERE A.usuario = :usuario
            AND A.tipo = :tipo
            AND C.vista_inicio = 1;";
        } else {
            $sql = "SELECT A.id_usuario, A.nombre_usuario, A.apellido_usuario, A.usuario, A.clave, A.image, C.vista_inicio, D.vista, A.tipo FROM usuarios A
            INNER JOIN perfiles B ON B.id_perfil = A.id_perfil_usuario 
            INNER JOIN perfil_modulo C ON C.id_perfil = A.id_perfil_usuario
            INNER JOIN modulos D ON D.id = C.id_modulo
            WHERE A.usuario = :usuario
            AND A.tipo = :tipo
            AND C.vista_inicio = 1;";
        }

        $value = Conexion::conectar()->prepare($sql);
        $value->bindParam(":usuario", $user, PDO::PARAM_STR);
        $value->bindParam(":tipo", $type, PDO::PARAM_INT);
        $value->execute();
        return $value->fetchAll(PDO::FETCH_CLASS);
    }

    static public function obtainMainUser($id_usuario)
    {
        $value = Conexion::conectar()->prepare("SELECT C.id, C.modulo, C.icon_menu, C.vista, B.vista_inicio FROM usuarios A
                                                INNER JOIN perfil_modulo B ON A.id_perfil_usuario = B.id_perfil
                                                INNER JOIN modulos C ON B.id_modulo = C.id
                                                WHERE A.id_usuario = :id_usuario
                                                AND (C.padre_id IS NULL OR C.padre_id = 0)
                                                ORDER BY C.orden");
        $value->bindParam(":id_usuario", $id_usuario, PDO::PARAM_STR);
        $value->execute();
        return $value->fetchAll(PDO::FETCH_CLASS);
    }

    static public function obtainSubMainUser($idMenu)
    {
        $value = Conexion::conectar()->prepare("SELECT A.id, A.modulo, A.icon_menu, A.vista FROM modulos A
                                                WHERE A.padre_id = :idMenu
                                                ORDER BY A.id");
        $value->bindParam(":idMenu", $idMenu, PDO::PARAM_STR);
        $value->execute();
        return $value->fetchAll(PDO::FETCH_CLASS);
    }
}
