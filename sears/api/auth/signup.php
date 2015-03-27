
<?php
 require_once('../../includes/init_vars.php');
    error_reporting(1);
   
   $nameOfDatabase = DB_NAME;
   $connection = new MongoClient(CONN_STR);
   $db = $connection->$nameOfDatabase;
   $collectionName = "newuser";
   $collection = $db->$collectionName; 
   
   $data = json_decode(file_get_contents('php://input'), true);

    $id = new MongoId();
    $name = $data['name'];
    $emailId = $data['emailid'];
    $userName = $data['emailid'];
    $password = $data['password'];
    $groupId = $data['groupId'];
    $invitationId  = $data['invitationId'];
    
    $array = array("_id"=>$id,"name"=>$name,"emailId"=>$emailId,"userName"=>$userName,"password"=>hash('sha256',$password));
     
    $collection->save($array);
    
    $headers = 'From: noreply@sears.com' . "\r\n" .
    'Reply-To: connect91insaurabh@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    $header.= "X-Priority: 1\r\n"; 
     
    mail($emailId,"Sears Activate Your Account","please click to following link http://searsgame.91webagency.com/activation.php?id=$id",$header);
        
                  //check for invitaion   
                 if(isset($invitationId) && !empty($invitationId))
                {
                    
                   
                $collectionName1 = "user_group";
                $collectionName2 = "invitation";               
                $collection1 = $db->$collectionName1; 
                $collection2 = $db->$collectionName2; 
                $gid = new MongoId($invitationId);

                $return = $collection2->findOne(array("_id"=>$gid,"emailId"=>$userName),array("groupId"=>true));    
               
                if(!empty($return)){
                
                   
                  $stringId = (string)$id;  
                    
                $collection1->save(array("userId"=>$stringId,"groupId"=>$return["groupId"],"visible"=>true));         
                  $collection2->remove(array("_id"=>$gid));   


                } 


                }

   // echo json_encode($array);

    //echo json_encode($Object);  		
 
    echo 1;

?>