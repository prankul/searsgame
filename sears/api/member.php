<?php

        include_once("auth/C91_Parent.php");
        error_reporting(-1);
        $obj = new C91_Parent();
        
         $id = $_GET["id"];

         $groupId = $_GET["groupId"];
         
         $groupMongoId = new MongoId($groupId);         
        
        $obj->removeDocument("group",array("group_admin"=>$id,"_id"=>$groupMongoId));
        
        $obj->removeDocument("user_group",array("userId"=>$id,"groupId"=>$groupId));
        
        
     

?>