<?php

require "conexion.php";

class ModuleModel
{

    static public function obtainModules()
    {
        $value = Conexion::conectar()->prepare("SELECT id as id,
                                                       (CASE WHEN padre_id IS NULL OR padre_id = 0 THEN '#' ELSE padre_id END) as parent,
                                                       modulo as text,
                                                       vista
                                                  FROM modulos A ORDER BY A.orden");
        $value->execute();
        return $value->fetchAll(PDO::FETCH_OBJ);
    }

    static public function obtainModulesProfiles($id_perfil)
    {
        $value = Conexion::conectar()->prepare("SELECT id,
                                                       modulo,
                                                       IFNULL(CASE WHEN (A.vista IS NULL OR A.vista = '') THEN '0' ELSE (SELECT '1' FROM perfil_modulo B WHERE B.id_modulo = A.id AND B.id_perfil = :id_perfil) END, 0) AS sel
                                                FROM modulos A ORDER BY A.orden");
        $value->bindParam("id_perfil", $id_perfil, PDO::PARAM_INT);
        $value->execute();
        return $value->fetchAll(PDO::FETCH_OBJ);
    }

    static public function obtainModuleSystem()
    {
        $value = Conexion::conectar()->prepare("SELECT '' AS opciones, A.id, A.orden, A.modulo,
                                                      (SELECT B.modulo FROM modulos B WHERE B.id = A.padre_id) AS modulo_padre,
                                                      vista, icon_menu,
                                                      DATE(A.fecha_creacion) AS fecha_creacion,
                                                      DATE(A.fecha_actualizacion) AS fecha_actualizacion
                                                      FROM modulos A ORDER BY A.orden");
        $value->execute();
        return $value->fetchAll();
    }

    static public function reorganizeModules($modulesOrganized)
    {
        $total_registros = 0;
        foreach ($modulesOrganized as $modulo) {
            $array_item_modulo = explode(";", $modulo);
            $value = Conexion::conectar()->prepare("UPDATE modulos
                                                      SET padre_id = REPLACE(:p_padre_id,'#',0),
                                                          orden = :p_orden
                                                    WHERE id = :p_id");
            $value->bindParam(":p_id", $array_item_modulo[0], PDO::PARAM_INT);
            $value->bindParam(":p_padre_id", $array_item_modulo[1], PDO::PARAM_INT);
            $value->bindParam(":p_orden", $array_item_modulo[2], PDO::PARAM_INT);
            if ($value->execute()) {
                $total_registros = $total_registros + 1;
            } else {
                $total_registros = 0;
            }
        }
        return $total_registros;
    }

    static public function registerModule($data_module)
    {
        $date = date("Y-m-d H:i:s");

        $value = Conexion::conectar()->prepare("SELECT MAX(A.orden) FROM modulos A");
        $value->execute();

        $orden = $value->fetch();
        $orden = $orden[0] + 1;
        $value = Conexion::conectar()->prepare("INSERT INTO modulos (modulo, padre_id,vista,icon_menu,fecha_creacion,orden)
                                                VALUES (:modulo,0,:vista,:icon_menu,:fecha_creacion,:orden)");
        $value->bindParam(":modulo", $data_module["iptModulo"], PDO::PARAM_STR);
        $value->bindParam(":vista", $data_module["iptVistaModulo"], PDO::PARAM_STR);
        $value->bindParam(":icon_menu", $data_module["iptIconoModulo"], PDO::PARAM_STR);
        $value->bindParam(":fecha_creacion", $date, PDO::PARAM_STR);
        $value->bindParam(":orden", $orden, PDO::PARAM_STR);
        if ($value->execute()) {
            return "Se registro correctamente";
        } else {
            return "Error al registrar";
        }
    }
}
