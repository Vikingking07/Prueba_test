<?php

require "Models/conexion.php";
require "Controllers/IndexController.php";
require "Controllers/UserController.php";

$index = new IndexController();
$index->loadTemplate();