<?php
session_start();

$routesArray = explode("/", $_SERVER['REQUEST_URI']);
$routesArray = array_filter($routesArray);

if (count(array_filter($routesArray)) > 1) {
    echo '<script> window.location = "http://localhost/project/" </script>';
}

if (isset($_GET["cerrar_sesion"]) && $_GET["cerrar_sesion"] == 1) {
    session_destroy();
    echo '<script> window.location = "http://localhost/project/" </script>';
}

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Centro Medico Moya</title>
    <link rel="shortcut icon" href="Resources/img/logoS.png" type="image/x-icon">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <link rel="stylesheet" href="Resources/plugins/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="Resources/css/adminlte.min.css">
    <link rel="stylesheet" href="Resources/plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="Resources/plugins/sweetalert2/sweetalert2.min.css">
    <link rel="stylesheet" href="Resources/plugins/datatables/datatables.min.css">
    <link rel="stylesheet" href="Resources/plugins/jstree/themes/default/style.min.css">
    <link rel="stylesheet" href="Resources/plugins/jquery-ui/jquery-ui.css">
    <!-- REQUIRED SCRIPTS -->
    <script src="Resources/plugins/jquery/jquery.min.js"></script>
    <script src="Resources/plugins/jquery-ui/jquery-ui.js"></script>
    <script src="Resources/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="Resources/js/adminlte.min.js"></script>
    <script src="Resources/plugins/sweetalert2/sweetalert2.all.min.js"></script>
    <script src="Resources/plugins/datatables/datatables.min.js"></script>
    <script src="Resources/plugins/jstree/jstree.min.js"></script>

    <style>
        #sign-in {
            background-image: url('Resources/img/fondo.jpg');
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
            color: #ffffff;
        }
    </style>
</head>

<?php if (isset($_SESSION["usuario"])) : ?>

    <body class="hold-transition sidebar-mini layout-fixed" id="body">
        <div class="wrapper">
            <?php include "navbar.php" ?>

            <?php include "aside.php" ?>

            <div class="content-wrapper">
                <?php include "Resources/views/" . $_SESSION['usuario']->vista ?>
            </div>

            <?php include "footer.php" ?>
        </div>
        <script>
            $(document).ready(function() {
                $("#init-dark").on('click', function() {
                    $("#body").addClass('dark-mode');
                    $("#navbar").removeClass('navbar-white').removeClass('navbar-light').addClass('navbar-dark');
                    $("#init-dark").css('display', 'none');
                    $("#init-light").css('display', 'block');
                });

                $("#init-light").on('click', function() {
                    $("#body").removeClass('dark-mode');
                    $("#navbar").removeClass('navbar-dark').addClass('navbar-white').addClass('navbar-light');
                    $("#init-dark").css('display', 'block');
                    $("#init-light").css('display', 'none');
                });
            });

            function loadContent(pagina_php, contenedor, id_perfil, id_modulo) {
                $("." + contenedor).load(pagina_php);
            }
        </script>
    </body>
<?php else : ?>

    <body id="sign-in">
        <br>
        <div class="content-wrap">
            <?php include "Resources/views/login.php" ?>
        </div>

        <script>
            function loadContent(pagina_php, contenedor) {
                $("." + contenedor).load(pagina_php);
            }
        </script>
    </body>
<?php endif; ?>

</html>