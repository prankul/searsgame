<?php

    include_once("auth/C91_Parent.php");

    $obj = new C91_Parent();




    

    if($_SERVER['REQUEST_METHOD']=="DELETE")
    {
             $group_game_id = $_GET["id"];    
             
         $groupGameMongoId = new MongoId($group_game_id);
                  
        
        $obj->removeDocument("group_game",array("_id"=>$groupGameMongoId));
        $obj->removeDocument("result",array("group_game_id"=>$group_game_id));
        
             
            

    }else{

        $data = json_decode(file_get_contents('php://input'), true);
        $gameName = $data['gameName'];
        $gameFace = $data['gameFace'];
        $groupId = $data['groupId'];


        class GroupGame{

            var $_id = null;
            var $gameName = "";
            var $gameFace,$groupId,$picks;
            var $endDate;


        }

        $object = new GroupGame();
        $object->_id = new MongoId();
        $object->gameName = $data['gameName'];
        $object->gameFace = $data['gameFace'];
        $object->groupId = $data['groupId'];
        $object->picks = $data['picks'];
        $object->endDate = strtotime($data['endDate']);
        





        $obj->saveDocument("group_game",$object);
        echo  json_encode((string)$object->_id);




    }  




?>