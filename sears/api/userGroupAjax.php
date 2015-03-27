<?php
    require_once('../includes/init_vars.php');
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;

    $collectionName = "user_group";
    $collection = $db->$collectionName; 

    // $data = json_decode(file_get_contents('php://input'), true);
    //$data = array("group_id"=>1 , "email"=>'test@test.com' ,"status"=>1 );

    $id = $data['id'];
    $user_id = $data['user_id'];
    $group_id = $data['group_id'];




    if(isset($data['unsubscribe']) ){ //Unsubscribe from group
        $array = array("_id"=>$id,"user_id"=>$user_id ,"group_id"=>$group_id ,"status"=>$data['unsubscribe']);
        $result = $collection->save($array);
    }elseif($id == null || $id==0){
        $id = new MongoId();    
        $array = array("_id"=>$id,"user_id"=>$user_id ,"group_id"=>$group_id ,"status"=>0);
        $result = $collection->save($array);
    }





?>