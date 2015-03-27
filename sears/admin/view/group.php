<?php
    include_once("view/view.php"); // parent view 


    // List all function

    function groupList(){ 

        listAll(array("Id","Name"),array("_id","name"));   /*  *(first parameter page-name),*(second is title for column),(third parameter is for column to show)*/
    }



    // edit and add new form function   

    function groupForm($object=null){
    ?>
    <!--  action is global -->
    <fieldset>
        <legend><?php if($object->getId()!=null) echo "EDIT"; else echo "ADD";?> Group</legend>
        <form action="<?=base_path?>?page=group&update=<?=$object->getId()?>" method=post >

            <!-- 

            use updateArray in url(action) by replacing update to update only specific fields

            eg: action="<?=base_path?>?page=user&updateArray=<?=$object->getId()?>"

            -->

            Name:    
            &nbsp;&nbsp;&nbsp;<input type="text" name="name" value="<?=$object->getName()?>" >
            <br><br>    


            <?php  if($object->getId()!=null){

                        echo $object->getGroupAdmin();
                        
                }else{?>  
                Group Admin:&nbsp;&nbsp;&nbsp;<input type="text" name="emailId" value="<?=$object->getGroupAdmin()?>" >
                <br><br>
                <?php
                }  
            ?>

            Company:
            &nbsp;&nbsp;&nbsp;<input type="text" name="company" value="<?=$object->getCompany()?>" >
            <br><br> 

            publish:
            &nbsp;&nbsp;&nbsp;<input type="checkbox" name="is_publish"  <?php if($object->getPublish()==1){ echo "checked"; } ?> >
            <br><br>     



            <input type=submit name="addORupdate" value="<?php if($object->getId()==null){ echo "add"; }else{ echo "update"; }  ?>">

        </form></fieldset>




    <?php   }  


