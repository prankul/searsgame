
<?php
    include_once("view/admin.php");


    global $cursor;


    $object = new C91_Admin(NULL);   // change your object name


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

