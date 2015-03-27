<?php

    include_once("model/C91_Parent.php");


    class C91_Game_User extends C91_Parent {



        public $_id;
        public $timeStamp;
        public $userId; // userId reference to newuser collection
        public $groupId; // if playing in group
        public $game; // many(game_session) to one(game) relationship 
        public $result;
        public $requestUserId; // request given By 
        public $expectation;  // serialized
        public $goal;   // int value or face value;
        public $status=1; // pending = 1,played = 2,denied = 3 

        public static $my_collection = 'result'; // specify collection game

        function __construct($id=NULL){


            if(empty($id) || $id==NULL){

                $this->_id=NULL; 
                //$this->_id = new MongoId();
            }
            else{ 

                $this->_id = new MongoId($id);
            }    
        }
        
        //Goal
        public function setGoal($goal){
            
             $this->goal = $goal;
            
        }
       
        public function getGoal(){
            
            return $this->goal;
        }
       
       
       // expectation
        
         public function setExpectation($expectation){
            
             $this->expectation = $expectation;
            
        }
       
        public function getExpectation(){
            
            return $this->expectation;
        } 
          
        
       //status
         public function setStatus($status){
            
             $this->status = $status;
            
        }
       
        public function getStatus(){
            
            return $this->status;
        }
        
       // UserId 
        public function setUserId($userId){
            
             $this->userId = $userId;
            
        }
       
        public function getUserId(){
            
            return $this->userId;
        }
        
       // GroupId 
        public function setGroupId($groupId){
            
            $this->groupId = $groupId;
        }
        
        public function getGroupId(){
            
            return $this->groupId;
        }
        
        //RequestUserId
        public function setRequestUserId($requestUserId){
            
            $this->requestUserId = $requestUserId;
        }
        
        public function getRequestUserId(){
            
             return $this->requestUserId;
        }
        
         
        //Id 
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

        //TimeStamp
        public function setTimeStamp($timestamp){ 

            $this->timeStamp = $timestamp;
        }    

        public function getTimeStamp(){

            return $this->timeStamp;
        }

        //Result
         public function setResult($result){ 

            $this->result = $result;
        }    

        public function getResult(){

            return $this->result;
        }

        //game
        public function setGame($game=array()){ 

             array_push($this->game,$g); 
        
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

        public function removeDocument($criteria=null){ 

            // default criteria
            
            return parent::removeDocument(self::$my_collection,$criteria);

            // here criterial is id

        }

        public function getAllObject($criteria=array(),$projection=array()){

            $map_array = parent::getAll(self::$my_collection,$criteria,$projection); 
            return $map_array;
        } 
 


    }

?>