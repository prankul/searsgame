 
    

<?php

  function loadDiv(){
       
       ?>
         <div class="constructionMask" style="height: 767px; display: none;"> </div>

    <div class="livePopupBlock" id="adminDelJQ" style="display: none; background-color: white;"> 
        <span class="closePopupJQ" style="padding-right: 10px; padding-top: 5px; float: right;">
            <strong>X</strong>
        </span>
        <h3>Are you sure you want to delete ?</h3>
        <span class="ok">OK</span>
        <span class="cancel closePopupJQ">Cancel</span>
    </div>       
     

       <?
       
   }     


   function rightMenu(){
    global $page;
  ?> 
     <div id="secondary">
    <div class="rightSideBar">
        <h4>Functionality</h4>   
     <a href="<?=base_path?>?page=<?=$page?>&action=all" >List All</a>
     <a href="<?=base_path?>?page=<?=$page?>&action=form">Add New</a>
    </div>
</div>
 
 <?php }    
    

    function listAll($title_array=array(),$showColumn_array=array()){
         
       loadDiv(); 
     global $page;   
        
    global $cursor;
    
    
    if($cursor!=null && $cursor->count() > 0){
        
        echo "<legend>List ".ucwords($page)."</legend><table align=\"center\" title=\"Overview\" border=\"1\" style=\"width: 100%;\" id=\"tblAll\" class=\"display dataTableJQ\">";
        /* title to display */ 
        if(!empty($title_array))
        {
            echo "<thead>";   
            foreach($title_array as $title) 
            {
                echo "<th>$title</th>";

            } 
            echo "<th>Delete</td>";  
            echo "<th>Edit</td>";
            echo "</thead>";  
        }


        /*record to display */      
                
        while($cursor->hasNext())
        {
             echo "<tr>"; 
            $array = $cursor->getNext();


            foreach($array as $key=>$value){       

                if(empty($showColumn_array))
                {

                    echo "<td>$value</td>";
                     
                }else
                    if(in_array($key,$showColumn_array))
                    {
                        echo "<td>$value</td>";
                    } 


                       $titleColCounter++;


            }
               
                  
            echo "<td><span class=\"delete pointer deleteconfirm\" url=\"".base_path."?page=$page&delete=$array[_id]\">Delete</span></td>";
            echo "<td><a href=".base_path."?page=$page&edit=$array[_id]>edit</a></td>";
            echo "</tr>";
       
        }
       echo "</table>"; 
        
    }else
     {
         echo "No Document Found";
     }

        
    }
?>