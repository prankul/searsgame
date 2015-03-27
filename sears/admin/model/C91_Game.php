<?php


    include_once("model/C91_Parent.php");   

    class C91_Game extends C91_Parent {      //change class name



        public $_id=NULL;
        public $name="";
        public $description="";
        public $face;
        public $interval;
        public $is_publish;

        public static $my_collection = 'game'; // specify collection name

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
        
        public function getId($id){

            return $this->_id;
        }
        
        public function setInterval($interval){

            $this->interval = $interval;
        }   
        
        public function getInterval($interval){

            return $this->interval;
        } 
        
        
         
        
        public function  saveDocumentArray($criteria,$array){

            parent::saveDocumentArray(self::$my_collection,$criteria,$array);

        }         

        
         public function setIsPublish($is_publish){ 

            $this->is_publish = $is_publish;
        }    

        public function getIsPublish(){

            return $this->is_publish;
        }     
            
        
         public function setFace($no_of_face){ 

            $this->face = $no_of_face;
        }    

        public function getFace(){

            return $this->face;
        }    

        public function setDescription($description){ 

            $this->description = $description;
        }    

        public function getDescription(){

            return $this->description;
        }

        public function setName($name){ 

            $this->name = $name;
        }    

        public function getName(){

            return $this->name;
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