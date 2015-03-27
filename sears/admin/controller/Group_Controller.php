
<?php
    // include your object class file
    include_once("view/group.php");


    global $cursor;



   $object = new C91_Group(NULL);   // change your object name



    if($action=="add" || $action=="update" ){  // for add new and update existing record

        if(isset($_GET['update']) && !empty($_GET['update'])) 
            $object->setId($_GET['update']);

        //change post value and varible
        $name = (string)escapeshellcmd(htmlspecialchars(addslashes($_POST["name"])));
        $company = (string)escapeshellcmd(htmlspecialchars(addslashes($_POST["company"])));
        $groupAdmin = (string)escapeshellcmd(htmlspecialchars(addslashes($_POST["groupAdmin"])));
        if(isset($_POST['is_publish'])) 
            $is_publish = 1;
        else
            $is_publish = 0;

           
            
        //change setter 
        $object->setName($name); 
        $object->setCompany($company);
        $object->setGroupAdmin($groupAdmin); 
        $object->setPublish($is_publish);
        
        

        // update for specific values only
        if(isset($_GET['updateArray'])){


            $criteria["_id"] = new MongoId($_GET['updateArray']);
            $array['name'] = $object->getName();
            $object->saveDocumentArray($criteria,$array);

        }else 
        {            
            $object->saveDocument();
        }
        
        
        
        header("Location:".base_path."?page=$page&action=all");

    }else
        if(isset($_GET["edit"]) || $action=="form"){  
            // display for for new document or edit document record 

            if(isset($_GET['edit'])){

                $object->setId($_GET['edit']);
                $object->getSingleObject();





            }

            groupForm($object); // change function name according to your form view


    }else
        if(isset($_GET["delete"])){  // delete document

             
            $object->setId($_GET['delete']);
            $object->removeDocument();
            header("Location:".base_path."?page=$page&action=all");

        }
        else
        {  
            $cursor = $object->getAllObject();     
            groupList();  // change function name according to your view

            //  var_dump(iterator_to_array($cursor));  // this is just for curiosity
    }           

    rightMenu();   // this is optional funtion in parent view to add and listall

?>

