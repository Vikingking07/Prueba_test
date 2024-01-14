<?php

require "../Models/ProfileModel.php";

class ProfileController
{

    static public function obtainProfiles()
    {
        $profiles = ProfileModule::obtainProfiles();
        echo json_encode($profiles);
    }

    static public function regsiterProfile($name)
    {
        $profile = ProfileModule::regsiterProfile($name);
        echo json_encode($profile);
    }
}

if (isset($_POST['accion']) && $_POST['accion'] == 1) {
    $profiles = new ProfileController;
    $profiles->obtainProfiles();
} elseif (isset($_POST['accion']) && $_POST['accion'] == 2) {
    $profiles = new ProfileController;
    $profiles->regsiterProfile($_POST['nombre']);
}
