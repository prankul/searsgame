<?php



    session_start();

    include_once("auth/C91_Parent.php");
    error_reporting(-1);
    $obj = new C91_Parent();


    if($_SERVER['REQUEST_METHOD']=="DELETE" && isset($_SESSION["user"])){


        $id = $_GET['id']; 

        $groupMongoId = new MongoId($id);

        $obj->removeDocument("group",array("_id"=>$groupMongoId));              
        $obj->removeDocument("group_game",array("groupId"=>$id));
        $obj->removeDocument("result",array("groupId"=>$id));

        echo 1;

    }else{


        if(empty($data))
            $data = json_decode(file_get_contents('php://input'), true);

        $group_name = $data['name'];

        class Group{

            var $_id = null;
            var $name = "";
            var $group_admin = "";

        }

        $object = new Group();
        $object->name = $group_name;

        function casttoclass($class, $object)
        {
            return unserialize(preg_replace('/^O:\d+:"[^"]++"/', 'O:' . strlen($class) . ':"' . $class . '"', serialize($object)));
        }

        session_start();
        $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));
        $object->group_admin = $userObject->id;

        if($_SERVER['REQUEST_METHOD']==="POST")	
        {

            $return = $obj->saveDocument("group",$object);
            $object->_id = (string)$return["upserted"];

           

            $obj->saveDocument("user_group",array("userId"=>$object->group_admin,"groupId"=>$object->_id,"visible"=>true));

            echo json_encode($object);

        }

    }


?>