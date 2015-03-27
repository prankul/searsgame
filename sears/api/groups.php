<?
    error_reporting(1);
     include_once("util.php");
    require_once('../includes/init_vars.php');
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;

    $collectionName = "group";
    $collection = $db->$collectionName; 

    $data = json_decode(file_get_contents('php://input'), true);

    session_start();
    $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));
    $userId =  $userObject->id;

    $collectionName1 = "user_group";
    $collection2 = $db->$collectionName1;
    $groupIdArrayResult = $collection2->find(array("userId"=>$userId));
    $groupIdArray = array();

    while(($groupIdArrayResult->hasNext())){

        $array = $groupIdArrayResult->getNext();
               $id = new MongoId($array["groupId"]);
        array_push($groupIdArray,$id);
    }
    
   


    if(!empty($groupIdArray))
    {
        $result = $collection->find(array("_id"=>array('$in'=>$groupIdArray)));

        class Group{

            var $_id;
            var $name;
            var $is_group_admin;

        }  

        $object_array = array();

        $i = 0;

        include_once("util.php");
        session_start();
        $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));


        while(($result->hasNext())){

            $r = $result->getNext();
            $groupObj[$i] = new Group();    
            $groupObj[$i]->_id = (string)$r["_id"];
            $groupObj[$i]->name = $r["name"];

            if($userObject->id==$r["group_admin"])     
                $groupObj[$i]->is_group_admin = true;


            array_push($object_array,$groupObj[$i]);
        }

    }
    echo json_encode($object_array);   


?>