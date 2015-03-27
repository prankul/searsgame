<?
    session_start();
    error_reporting(1);
    include_once("util.php");

    require_once('../includes/init_vars.php');
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;

    $collectionName = "group_game";

    $groupId = $_GET['groupId'];

    $collection = $db->$collectionName; 
    
    $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));
    $userId =  $userObject->id;

    // cross check in db that user is valid for group;
    $userGroupcollectionName = "user_group";
    $userGroupCollection = $db->$userGroupcollectionName; 
    $userGroupResult =  $userGroupCollection->findOne(array("groupId"=>$groupId,"userId"=>$userId));
                
    if(!empty($groupId) && sizeof($userGroupResult)>1 ){


        $result = $collection->find(array("groupId"=>$groupId));

        $myarray = array();

        while($result->hasNext())
        {
            $record = $result->getNext();
            $record["_id"] = (string)$record["_id"];
            array_push($myarray,$record);
        }

    }

    echo json_encode($myarray);

?>