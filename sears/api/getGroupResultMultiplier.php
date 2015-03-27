
 <?php
     
     
    include_once("util.php");

    require_once('../includes/init_vars.php');
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;

    /*$groupId = $_REQUEST["groupId"];

    $face = $_REQUEST['face'];   */

    $group_game_id = $_REQUEST["group_game_id"];
   
    $collectionName = "result";
    $collection = $db->$collectionName; 

    $criteria = array("group_game_id"=>$group_game_id);
    
    $result = $collection->find($criteria,array("result"=>true,"goal"=>true,"userId"=>true,"expectaion"=>true,"timeStamp"=>1))->sort(array('timeStamp' => -1));
    //$result->sort(array('date' => 1, 'age' => -1));
   
    $groupOverAllTrueResult = 0;
    $groupOverAllCount = 0;
    
     while($result->hasNext())
    {
        $groupGraph = $result->getNext();
      
      /*  $obj->goalString = $groupGraph["goal"];
        $obj->resultString = $groupGraph["result"];
        $obj->name = $userResult["name"];  
        $obj->expectation = unserialize($groupGraph["expectaion"]);
        $obj->time = date(' d M Y H:i:s',$groupGraph["timeStamp"]);  */
        
       
      
        
         for($z=0;$z<sizeof($groupGraph["goal"]);$z++)
          {
                 if($groupGraph["result"][$z]==$groupGraph["goal"][$z])
                 {
                     $groupOverAllTrueResult ++;
                 }
    
                $groupOverAllCount++;
          }
        
        
        

        
    } 
    
      
        
        $result = ($groupOverAllTrueResult*100)/$groupOverAllCount;                
     
        echo $result;
     
     
     
     
     
 ?>  