<?
    
    error_reporting(1);
    include_once("util.php");

    require_once('../includes/init_vars.php');
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;

    $collectionName = "game";
 
    $face = new MongoInt64($_GET['face']); 
   
    $collection = $db->$collectionName; 

     
    
     if($face=="0") 
     {
       $result = $collection->find();
     }
     else 
       $result = $collection->find(array('face'=>$face));
    
    $myarray = array();
    
    while($result->hasNext())
     {
         $record = $result->getNext();
        
         array_push($myarray,$record);
     }
  
       
  
      
       echo json_encode($myarray);
      
?>