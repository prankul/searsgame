
<?php



    require_once('../../includes/init_vars.php');


    //error_reporting(-1);

    if(isset($_POST)){	

        $nameOfDatabase = DB_NAME;
        $connection = new MongoClient(CONN_STR);
        $db = $connection->$nameOfDatabase;


        $collectionName = "newuser";


        $collection = $db->$collectionName; 


        $data = json_decode(file_get_contents('php://input'), true);

        $userName = $data['username']; // login-username-input login-password-input
        $password = $data['password'];;

        // check for group Url

        $invitationId = $data["groupId"];  



        $result = $collection->findOne(array("userName"=>$userName,"activation"=>1),array("password"=>true));



        class user{

            var $id,$username;

            function __construct($id,$username){



                $this->id = (string)$id;
                $this->name = null;
                $this->username = $username ;
            }


        }






        if(!empty($result)){  

          

            if($result['password'] === hash("sha256",$password) && !empty($password)) {
                
                  $obj  = new user($result["_id"],$userName);
                  session_start(); 
                    
                
                $_SESSION['user'] = serialize($obj);
                $object_array = array("user"=>$obj);     


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

                $collection1->save(array("userId"=>$obj->id,"groupId"=>$return["groupId"],"visible"=>true));         
                  $collection2->remove(array("_id"=>$gid));   


                } 


                }


               echo json_encode($object_array);
              
               
            }

        } 
    }
?>