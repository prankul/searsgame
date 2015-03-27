<?php
    include_once("view/view.php"); // parent view 


    // List all function

    function gameList(){ 


        listAll(array("Id","Game Title","Face"),array("_id","name","description","face"));   /*  *(first parameter page-name),*(second is title for column),(third parameter is for column to show)*/

    }



    // edit and add new form function   

    function gameForm($object=null){
        global $action; 
        ?>

        
        <!--  action is global -->
     <fieldset>
            <legend><?php if($object->getId()!=null) echo "EDIT"; else echo "ADD";?> Group</legend>
    <form action="<?=base_path?>?page=game&update=<?=$object->getId()?>" method=post >

        Name:&nbsp;&nbsp;&nbsp;<input type="text" name="name" value="<?=$object->getName()?>" >
           <br>  <br>
        Description:&nbsp;&nbsp;&nbsp;<textarea cols="" rows=""><?=$object->getDescription()?></textarea>
          <br>  <br>
       Face:&nbsp;&nbsp;&nbsp;<input type="text" name="no_of_face" value="<?=$object->getFace()?>" >
           <br><br>
       Interval:&nbsp;&nbsp;&nbsp;<input type="text" name="interval" value="<?=$object->getInterval()?>" >
           <br><br>
        Publish: <input type="checkbox" name="is_publish"  <? if($object->getIsPublish()==1){echo "checked";} ?>>
           <br><br>
        
        <input type=submit name="addORupdate" value="<?php if($object->getId()==null){ echo "add"; }else{ echo "update"; }  ?>">

    </form>
    </fieldset>
    <?php }  


?>


 



  
