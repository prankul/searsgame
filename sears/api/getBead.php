<?php


    include_once("util.php");

    require_once('../includes/init_vars.php');
    $nameOfDatabase = DB_NAME;
    $connection = new MongoClient(CONN_STR);
    $db = $connection->$nameOfDatabase;

    session_start();


    $userObject = casttoclass('stdClass',unserialize($_SESSION["user"]));
    $userId =  $userObject->id;


    //$criteria = array("userId"=>$userId,'groupId'=>NULL);
    $criteria = array("userId"=>$userId);

    $collectionName = "result";
    $collection = $db->$collectionName; 
    $result = $collection->find($criteria)->sort(array('face'=>1))   ;
    $response_array = array();
    $i = 0;   


    class UserGroupGraph{

        var $resultString,$goalString,$expectation,$face,$name;

    }
    $obj = null;
    $first = true; 

    while($result->hasNext())
    {
        $groupGraph = $result->getNext();
     
        try{
                   
            if($first || $obj->face != $groupGraph["face"]){

                 if($obj)
                  array_push($response_array,$obj);
                
                $obj = new UserGroupGraph();
                $obj->expectation = unserialize($groupGraph["expectaion"]);
                $obj->goalString = $groupGraph["goal"];
                $obj->resultString = $groupGraph["result"];
                $obj->face = $groupGraph["face"];
                
              /*   $gameCollectionName = "game";
                 $gameCollection = $db->$gameCollectionName; 
                 echo $groupGraph["face"];
                 $gameCriteria = array("face"=>$groupGraph["face"]);
                 $gameResult = $gameCollection->findOne($gameCriteria,array('name'));
                     var_dump($gameResult);
                    $obj->name = $gameResult['name'];  */
                
                $first = false; 
            }else{

                
               $obj->goalString =  array_merge($obj->goalString,$groupGraph["goal"]);
               $obj->resultString = array_merge($obj->resultString,$groupGraph["result"]);

            }

        }
        catch(Exception $e){

            echo $e->getMessage(); 
  
        }  
       
        // print_r($response_array);   
        $i++;

    } 
              array_push($response_array,$obj); // for last one



    if(!empty($response_array)) 
        echo json_encode($response_array);    
    else
        echo true;  

?>