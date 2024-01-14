<?php

require "../Models/ModuleModel.php";

class ModuleController
{

    static public function obtainModules()
    {
        $modules = ModuleModel::obtainModules();
        echo json_encode($modules);
    }

    static public function obtainModulesProfiles($id_perfil)
    {
        $moduleProfile = ModuleModel::obtainModulesProfiles($id_perfil);
        echo json_encode($moduleProfile);
    }

    static public function obtainModuleSystem()
    {
        $moduleSystem = ModuleModel::obtainModuleSystem();
        echo json_encode($moduleSystem);
    }

    static public function reorganizeModules($modulesOrganized)
    {
        $organizeModule = ModuleModel::reorganizeModules($modulesOrganized);
        echo json_encode($organizeModule);
    }

    static public function registerModule($data_module)
    {
        $registerModule = ModuleModel::registerModule($data_module);
        echo json_encode($registerModule);
    }
}

if (isset($_POST['accion']) && $_POST['accion'] == 1) {
    $modules = new ModuleController;
    $modules->obtainModules();
} else if (isset($_POST['accion']) && $_POST['accion'] == 2) {
    $moduleProfile = new ModuleController;
    $moduleProfile->obtainModulesProfiles($_POST['id_perfil']);
} else if (isset($_POST['accion']) && $_POST['accion'] == 3) {
    $moduleSystem = new ModuleController;
    $moduleSystem->obtainModuleSystem();
} else if (isset($_POST['accion']) && $_POST['accion'] == 4) {
    $organizeModule = new ModuleController;
    $organizeModule->reorganizeModules($_POST['modulos']);
} else if (isset($_POST['accion']) && $_POST['accion'] == 5) {
    $array_datos = [];
    parse_str($_POST['datos'], $array_datos);
    $registerModule = new ModuleController;
    $registerModule->registerModule($array_datos);
}
