
<?php

    include_once("view/result.php");


    global $cursor;



    $object = new C91_Game_User(NULL);   // change your object name


    if($action=="add" || $action=="update" ){  // for add new and update existing record



        /* As Result Can not be add or edit from Backend

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
        /*   $object->setName($name); 
        $object->setEmailId($emailId);
        $object->setCompany($company);
        $object->setUserName($userName);
        $object->setPassword($password);               

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
        */
    }else
        if(isset($_GET["edit"])){  

            // display for for new document or edit document record 

            $parentObject = new C91_Parent();
            $otherInfo = Array();

            if(isset($_GET['edit'])){

                $object->setId($_GET['edit']);
                $object->getSingleObject();

              // get USer detail who played  
              
                if($object->getUserId()!="" || $object->getUserId()!=null){

                    $userObject = new C91_User();
                    $userObject->setId($object->getUserId());
                    $userObject->getSingleObject(array("name"));
                    $otherInfo['userName'] = $userObject->getName();
                }
                
                
              
              // end user detail who played 
              
              // get Group detail 
              
                if($object->getRequestUserId()!="" || $object->getRequestUserId()!=null){

                    $userObject = new C91_User();
                    $userObject->setId($object->getRequestUserId());
                    $userObject->getSingleObject(array("name"));
                    $otherInfo['groupName'] = $userObject->getName();    
                }
                
                
                
              // end 
              
              
              // get USer who arranged game  
              
                if($object->getGroupId()!="" || $object->getGroupId()!=null){

                    $groupObject = new C91_Group();
                    $groupObject->setId($object->getGroupId());
                    $groupObject->getSingleObject(array("name"));
                    $otherInfo['arrange_by'] = $groupObject->getName();
                }
                
                
                
              // end 
              
                
        }    

        resultDetail($object,$otherInfo); // change function name according to your form view*/

        echo "Operation Not Defined";


    }else
        if(isset($_GET["delete"])){  // delete document

            $object->setId($_GET['delete']);
            $object->removeDocument();
            header("Location:".base_path."?page=$page&action=all");

        }
        else
        {  
            $cursor = $object->getAllObject(array(),array("_id"=>1,"timeStamp;"=>1));  // you can assign crieria to fetch limited colum   
            
            
            resultList();  // change function name according to your view

            //  var_dump(iterator_to_array($cursor));  // this is just for curiosity
    }           

   // rightMenu();   // this is optional funtion in parent view to add and listall
    
    
   
    
    
?>
   