<?php

     
    include_once("../api/util.php");
       
    require_once('../includes/init_vars.php');    
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;

      $collectionName = "result";
    $collection = $db->$collectionName; 
                                            
    $result = $collection->find(array(),array("result"=>true,"goal"=>true,"userId"=>true,"expectaion"=>true,"game"=>true,"face"=>true));
    //$result->sort(array('date' => 1, 'age' => -1));  
     
    $response_array = array();

     $i = 0;   
     
     
     class UserGroupGraph{
         
         var $name,$email,$gameName,$gameType,$expectation,$face;
         
     }
     
               
    while($result->hasNext())
    {
        $groupGraph = $result->getNext();
            
        $userCollectionName = "newuser";
        $usercollection = $db->$userCollectionName; 
        $userIdMongo = new MongoId($groupGraph['userId']);
        $userResult = $usercollection->findOne(array("_id"=>$userIdMongo),array("name"=>true,"emailId"=>true));
        
        $obj = new UserGroupGraph();
        
        $obj->email = $userResult["emailId"];   
        $obj->name = $userResult["name"]; 
        $obj->gameName = ""; 
        $obj->gameType = ""; 
        $obj->expectation = unserialize($groupGraph["expectaion"]); 
        $obj->face =  $groupGraph['face'];
                     
        
      
            array_push($response_array,$obj);
         // print_r($response_array);   
        $i++;
         
    }     
               $rows = array();    
               
                  
             foreach($response_array as $responseObject){
                  
                   $temp = array();
                 
                     $k = 0;
                    
                    $temp[$k++] =  1;
                    $temp[$k++] =  $responseObject->email;
                    $temp[$k++] =  $responseObject->name;
                    $temp[$k++] =  $responseObject->game;
                    $temp[$k++] =  "";
                    $temp[$k++] =  $responseObject->face;
                    $temp[$k++] =  $responseObject->expectation;
                   
                    
                    
                     
                   array_push($rows,$temp); 
             }      
                  
              
       

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=data.csv');

    // create a file pointer connected to the output stream
    $output = fopen('php://output', 'w');

    // output the column headings
    fputcsv($output, array('Id','Email','Name','Game-Name','Game-Type','Face','Expectation','Result','TimeStamp'));
   

    // loop over the rows, outputting them
    foreach($rows as $row) fputcsv($output, $row,'*');

       

?>