



<?php
    error_reporting(1);

    include_once("../init_var.php");

    $page = "result";
    $connection = new MongoClient(CONN_STR); 
    $db = $connection->$nameOfDatabase;

    $collectionName = "result";

    $collection  = $db->$collectionName;  



    // column array
    $column = array("_id","timeStamp","userId","groupId"); 



    $field = $column[$_GET[order][0][column]];

    if($_GET[order][0][dir]=="desc")
        $sortValue = -1;
    else     
        $sortValue = 1; 

    $sortArray[$field] =   $sortValue ;

    $cursor = $collection->find(array(),$column);  
    $cursor->skip($_GET["start"]);
    $cursor->limit($_GET["length"]);
    $cursor->sort($sortArray);

    $myarray = array() ;

    $myarray["draw"] = $_GET['draw'];   
    $myarray ["rcordsTotal"] = $collection->count();
    $myarray["recordsFiltered"] = $cursor->count();   

    $temparray = array();

    while($cursor->hasNext()){

        $temp = $cursor->getNext();    
        $mongo = new MongoId($temp["_id"]);

        $userCollectionName = "newuser";    
        $userCollection = $db->$userCollectionName;


        $userMongoId = new MongoId($temp["userId"]);
        $name = $userCollection->findOne(array("_id"=>$userMongoId),array("name"=>true));

        $groupName = "-";
        if($temp["groupId"]!=null && !empty($temp["groupId"])){
            
            $groupMongoId = new MongoId($temp["groupId"]);
            $groupName = $userCollection->findOne(array("_id"=>$groupMongoId),array("name"=>true));
        } 

        $value = array($mongo->__toString(),$temp["timeStamp"],$name["name"],$groupName['name'],"<td><span class=\"delete pointer deleteconfirm\" url=\"http://gwh/newmongo/index.php?page=$page&delete=".$mongo->__toString()."\">Delete</span></td>");
        array_push($temparray,$value);

    }

    $myarray["data"] = $temparray;

    echo json_encode($myarray);            

?>
  