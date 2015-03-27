<?php




    class C91_Game extends C91_Parent {



        public $_id=NULL;
        public $name="";
        public $description="";
        
        public static $my_collection = 'game'; // specify collection name
        
        function __construct($id=NULL){


            if(empty($id) || $id==NULL){

               // $this->_id = new MongoId();
            }
            else{ 

                $this->_id = new MongoId($id);
            }    
        }    
          
         public function setId($id){
            
            $this->_id = new MongoId($id);
        } 
        
        public function getId($id){

            return $this->_id;
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

            parent::saveDocument(C91_Game::$my_collection,$this);

        }

        public function getSingleObject($field_array){

            $map_array = parent::getSingleObject(C91_Game::$my_collection,$this->_id,$field_array); 

          
                foreach($map_array as $key=>$value){

                    $this->$key = $value;
                }
              
        }   
        
        public function removeDocument(){ 
        
           return parent::removeDocument(C91_Game::$my_collection,array('_id' => $this->_id));
        
             // here criterial is id
          
        }
        



    }

?>