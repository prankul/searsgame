<?php


    include_once("model/C91_Parent.php");   

    class C91_Group extends C91_Parent {      //change class name



        public $_id=NULL;
        public $name="";
        //public $address="";
        public $groupAdmin; // user id
        public $company;
        public $is_publish;
       
        
        public static $my_collection = 'group'; // specify collection name

        function __construct($id=NULL){


            if(empty($id) || $id==NULL){
               
                // new object
            }
            else
            { 
                     $this->_id = new MongoId($id);
            }    
        }    
        
        
       public function setPublish($publish){

            $this->is_publish = $publish;
        }   
        
        public function getPublish(){

            return $this->is_publish;
        } 
       
        
        public function setId($id){

            $this->_id = new MongoId($id);
        }   
        
        public function getId(){

            return $this->_id;
        } 
      

        public function setName($name){ 

            $this->name = $name;
        }    

        public function getName(){

            return $this->name;
        }
        
          public function setGroupAdmin($groupAdmin){ 

            $this->groupAdmin = $groupAdmin;
        }    

        public function getGroupAdmin(){

            return $this->groupAdmin;
        }
        
        
         public function setCompany($company){ 

            $this->company = $company;
        }    

        public function getCompany(){

            return $this->company;
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

        public function removeDocument($criteria=null){ 

            // default criteria
            
            return parent::removeDocument(self::$my_collection,$criteria);

            // here criterial is id

        }
       
         public function getAllObject(){

            $map_array = parent::getAll(self::$my_collection); 
            return $map_array;
        } 
 


    }

?>