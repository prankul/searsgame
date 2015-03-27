<?php


    include_once("auth/C91_Parent.php");

    $obj = new C91_Parent();

    session_start(); 

    if(isset($_SESSION['user'])){


        parse_str(file_get_contents("php://input"),$post_vars);
        $id = $post_vars["id"];
        $name = $post_vars["group_name"];
        $groupMongoId = new MongoId($id);
        $obj->update("group",array('_id'=>$groupMongoId),array("name"=>$name));


    }



?>