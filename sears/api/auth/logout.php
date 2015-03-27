<?php




    error_reporting(1);
    session_start();
    $object_array = unserialize($_SESSION['user']);
    
    

    session_destroy();	
    session_unset();
    echo json_encode(array("user"=>$object_array));

?>