<?php

    include_once("model/C91_Parent.php");


    class C91_Game_Session extends C91_Parent {



        public $_id;
        public $timeStamp;
        public $game=array(); // one to many relationship 

        public static $my_collection = 'game_session'; // specify collection game

        function __construct($id=NULL){


            if(empty($id) || $id==NULL){

                $this->_id=NULL; 
                //$this->_id = new MongoId();
            }
            else{ 

                $this->_id = new MongoId($id);
            }    
        }

        public function setId($id){
            try{
                $this->_id = new MongoId($id);
            }catch(Exception $e){

                echo $e->getMessage(); 
            }
        }    
        
        public function getId($id){

            return $this->_id;
        }     

        public function setTimeStamp($timestamp){ 

            $this->timeStamp = $timestamp;
        }    

        public function getTimeStamp(){

            return $this->timeStamp;
        }



        public function setGame($game){ 

            if(!empty($game)){  
                foreach($game as $g)
                {
                    array_push($this->game,$g); 
                } 
            } 

        }    

        public function getGame(){

            return $this->game;
        }


        public function  saveDocument(){



            parent::saveDocument(self::$my_collection,$this);

        }

        public function getSingleObject($field_array=null){

            global $db;

            $map_array = parent::getSingleObject(self::$my_collection,$this->_id,$field_array); 


            if(!empty($map_array)){

                foreach($map_array as $key=>$value){


                    $this->$key = $value;
                }

            }else{

                echo "matching document not found!!";
            }



        }   

        public function removeDocument(){ 

            return parent::removeDocument(self::$my_collection,array('_id' => $this->_id));

            // here criterial is id

        }




    }

?>