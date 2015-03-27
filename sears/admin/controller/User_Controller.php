
<?php
     include_once("model/C91_User.php");  // include your object class file
     include_once("model/C91_User_Group.php");
     include_once("model/C91_Parent.php");
     include_once("view/user.php");


    global $cursor;
   


    $object = new C91_User(NULL);   // change your object name
    
   
    if($action=="add" || $action=="update" ){  // for add new and update existing record

    
        if(isset($_GET['update']) && !empty($_GET['update'])) 
          $object->setId($_GET['update']);
        
        //change post value and varible
        $name = (string)escapeshellcmd(htmlspecialchars(addslashes($_POST["name"])));
        $emailId = (string)escapeshellcmd(htmlspecialchars(addslashes($_POST["emailId"])));
        $company = (string)escapeshellcmd(htmlspecialchars(addslashes($_POST["company"])));
        $userName = (string)escapeshellcmd(htmlspecialchars(addslashes($_POST["userName"])));
        $password = (string)escapeshellcmd(htmlspecialchars(addslashes($_POST["password"])));
       /* if(isset($_POST['is_publish']))
         $is_publish = 1;
        else
         $is_publish = 0;*/
        
        //change setter 
        $object->setName($name); 
        $object->setEmailId($emailId);
        $object->setCompany($company);
        $object->setUserName($userName);
        $object->setPassword(hash('sha256',$password));               
        
        // update for specific values only
        if(isset($_GET['updateArray'])){
            
        
            $criteria["_id"] = new MongoId($_GET['updateArray']); // define criteria to change
            $array['name'] = $object->getName(); // define parameter to change,here name
            $object->saveDocumentArray($criteria,$array);
            
        }else 
        {
          $object->saveDocument();
        } 
        
        // for M-M relationship
        
        $selectedGroupList = $_POST['group'];
        $user_group = new C91_User_Group(); 
        
        echo $object->getId();
        
        if($object->getId() != null) // only for update
           $user_group->removeDocument(array("userId"=>$object->getId()));    
     
        foreach($selectedGroupList as $group){
           
            echo $group;
            
            $user_group = new C91_User_Group();    
            
            $user_group->setUserId($object->getId());
            $user_group->setGroupId($group);
            $user_group->saveDocument();    
           
        }
        
        // M-M end
        
        header("Location:".base_path."?page=$page&action=all");

    }else
        if(isset($_GET["edit"]) || $action=="form"){  
            // display for for new document or edit document record 

            $parentObject = new C91_Parent();
            $allGroupList = $parentObject->getAll("group");
            
            
            $userCurrentGroup = array();
         
            if(isset($_GET['edit'])){
             
              $object->setId($_GET['edit']);
              $object->getSingleObject();
                
              $userCurrentGroup = $parentObject->getAll("user_group",array("userId"=>$_GET['edit']), array('groupId' => true));
            }
            
            userForm($object,$allGroupList,$userCurrentGroup); // change function name according to your form view


        }else
            if(isset($_GET["delete"])){  // delete document
            
                $object->setId($_GET['delete']);
                $object->removeDocument();
                header("Location:".base_path."?page=$page&action=all");

            }
            else
            {  
                $cursor = $object->getAllObject();     
                userList();  // change function name according to your view

                //  var_dump(iterator_to_array($cursor));  // this is just for curiosity
           }           

    rightMenu();   // this is optional funtion in parent view to add and listall

?>

