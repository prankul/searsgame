<?php


    include_once("model/C91_Parent.php");   

    class C91_User_Group extends C91_Parent {      //change class name



        public $_id=NULL;
        public $userId;
        public $groupId;
       
        
        public static $my_collection = 'user_group'; // specify collection name

        function __construct($id=NULL){


            if(empty($id) || $id==NULL){
               
                // new object
            }
            else
            { 
                     $this->_id = new MongoId($id);
            }    
        }    
        
        public function setId($id){

            $this->_id = new MongoId($id);
        }   
        
        public function getId(){

            return $this->_id;
        } 
      
         public function setUserId($userId){

            $this->userId = new MongoId($userId);
        }   
        public function getUserId(){

            return $this->userId;
        } 
        
        
         public function setGroupId($groupId){

            $this->groupId = new MongoId($groupId);
        }   
        public function getGroupId(){

            return $this->groupId;
        } 
        

        public function  saveDocument(){

            parent::saveDocument(self::$my_collection,$this);

        }

        public function getSingleObject($field_array){

            $map_array = parent::getSingleObject(self::$my_collection,$this->_id,$field_array); 


            foreach($map_array as $key=>$value){

                $this->$key = $value;
            }

        }   

        public function removeDocument($criteria){ 
            
            if(empty($criteria)) 
              $criteria=array('_id' => $this->_id);
            
            print_r($criteria);
            
            return parent::removeDocument(self::$my_collection,$criteria);

            // here criterial is id

        }
       
         public function getAllObject(){

            $map_array = parent::getAll(self::$my_collection); 
            return $map_array;
        } 
 


    }

?>