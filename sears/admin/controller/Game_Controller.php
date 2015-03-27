
<?php
    include_once("model/C91_Game.php");  // include your object class file
    include_once("view/game.php");


    global $cursor;
    $object = new C91_Game(NULL);   // change your object name

    if($action=="add" || $action=="update" ){  // for add new and update existing record

        if(isset($_GET['update']) && !empty($_GET['update'])) 
            $object->setId($_GET['update']);

        //change post value and varible
        $name = (string)escapeshellcmd(htmlspecialchars(addslashes($_POST["name"])));
        $description = (string)escapeshellcmd(htmlspecialchars(addslashes($_POST["description"])));
        $no_of_face = (string)escapeshellcmd(htmlspecialchars(addslashes($_POST["no_of_face"])));
        $interval = (string)escapeshellcmd(htmlspecialchars(addslashes($_POST["interval"])));
        if(isset($_POST['is_publish']))
            $is_publish = 1;
        else
            $is_publish = 0;

        //change setter 
        $object->setName($name); 
        $object->setDescription($description);
        $object->setFace($no_of_face);
        $object->setIsPublish($is_publish);
        $object->setInterval(new MongoInt64($interval));
        

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

            gameForm($object); // change function name according to your form view


    }else
        if(isset($_GET["delete"])){  // delete document

           
            $object->setId($_GET['delete']);
            $object->removeDocument();
            header("Location:".base_path."?page=$page&action=all");

        }
        else
        {  
            $cursor = $object->getAllObject();     
            gameList();  // change function name according to your view

            //  var_dump(iterator_to_array($cursor));  // this is just for curiosity
    }           

    rightMenu();   // this is optional funtion in parent view to add and listall

?>

