<?php

    require_once('../../includes/init_vars.php');
    error_reporting(1);
    session_start();
       
       
       
       

    if(isset($_SESSION['user']) && !empty($_SESSION['user'])){

        $nameOfDatabase = DB_NAME;
        $connection = new MongoClient(CONN_STR);
        $db = $connection->$nameOfDatabase;

        

        $sessionVal = unserialize($_SESSION['user']);



        $object_array = array("user"=>$sessionVal);

        /** code for invitation of group  */

       /* $uri = $_SERVER("REQUEST_URI");
        echo $uri;*/
        /*
        if(substr_count($uri,"invitationId")==1)
        {
            $uriOne = explode($uri,'?',1);

            if(!empty($uriOne[1]) && isset($uriOne[1]) ){


                $uriTwo = explode($uriOne[1],'=',1);


                $invitationId = $uriTwo[1];

                $collectionName1 = "user_group";
                $collectionName2 = "invitation";               
                $collection1 = $db->$collectionName1; 
                $collection2 = $db->$collectionName2; 
                $gid = new MongoId($invitationId);

                $return = $collection2->findOne(array("_id"=>$gid,"emailId"=>$_SESSION['username']),array("groupId"=>true));    

                if(!empty($return)){

                    $collection1->save(array("userId"=>$obj->id,"groupId"=>$return["groupId"],"visible"=>true));         
                    $collection2->remove(array("_id"=>$gid));   

                } 

            }

        }  

*/
        echo json_encode($object_array);



    }
    else{
     
        
        
        echo "please get login";
    }




?>