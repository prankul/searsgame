<?php


    include_once("model/C91_Parent.php");   

    class C91_Admin extends C91_Parent {      //change class name



        public $_id=NULL;
        public $name="";
        //public $address="";
        public $emailId;

        public $userName;
        public $password;


        public static $my_collection = 'admin'; // specify collection name

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


        public function setName($name){ 

            $this->name = $name;
        }    

        public function getName(){

            return $this->name;
        }

        public function setEmailId($emailId){ 

            $this->emailId = $emailId;
        }    

        public function getEmailId(){

            return $this->emailId;
        }




        public function setUserName($userName){ 

            $this->userName = $userName;
        }    

        public function getUserName(){

            return $this->userName;
        }

        public function setPassword($password){ 

            $this->password = password_hash($password,PASSWORD_DEFAULT);
        }    

        public function getPassword(){

            return $this->password;
        }


        public function  saveDocumentArray($criteria,$array){

            parent::saveDocumentArray(self::$my_collection,$criteria,$array);

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