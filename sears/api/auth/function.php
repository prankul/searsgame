<?php 

    include_once("C91_Parent.php");   

    class C91_FrontendFunction extends C91_Parent {  
        
        function __construct($id=NULL){
            $this->_id = new MongoId($id);
        }

        function getUser(){
            
        }
        public function getSingleUser($field_array){
            $collection = $db->'newuser';

            $map_array = $collection->findOne(array('_id' => new MongoId($id)));('newuser',$field_array); 
            var_dump($map_array);exit;
             
            foreach($map_array as $key=>$value){
                $this->$key = $value;
            }
        } 
    }
    
    
    $objFrontEndFunction = new C91_FrontendFunction();
    $objFrontEndFunction->getSingleUser(array("username"=>"connect91@gmail.com"));
?>