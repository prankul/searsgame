<?php
    class C91_Parent{

        public function getAll($collectionName,$criteria=array(),$projection=array()){
        
            global $db;
            $collection = $db->$collectionName; 
            $array = $collection->find($criteria,$projection);
            //var_dump(iterator_to_array($array));
            return $array;
        }
        
        
        // update or insert document collection with specific field
        
        public function saveDocumentArray($collectionName,$criteria,$change_array){
            
            global $db;
            $collection = $db->$collectionName;
            
            $change_array = array('$set'=>$change_array);     // set varible is imp to update only require field         
            $collection->update($criteria,$change_array);
            
        }
        
        public function saveDocument($collectionName,$object){  // this function to add and delete

           
            global $db;
            $collection = $db->$collectionName;

            
            try {

                /* if id is not set to object then generate it here */
                if($object->_id==NULL || $object->_id=="")
                {   
                     
                    $object->_id = new MongoId(); 
                } 


                $collection->save($object);
            }catch(Exception $e){

                echo $e->getMessage();
            }
        }

        
       public function findOne($collectionName,$criteria,$field_array){
            
             global $db;
            $collection = $db->$collectionName; 
            
             if(sizeof($field_array) <= 0)
                $array = $collection->findOne($criteria);  // for all fields and value
            else
                $array = $collection->findOne($criteria,$field_array);  // for specific fields array 



            return $array; 
           
           
        } 
        
        // to fetch single Document with specific id
        public function getSingleObject($collectionName,$id,$field_array = NULL ){


            global $db;
            $collection = $db->$collectionName;

            if(sizeof($field_array) <= 0)
                $array = $collection->findOne(array('_id' => new MongoId($id)));  // for all fields and value
            else
                $array = $collection->findOne(array('_id' => new MongoId($id)),$field_array);  // for specific fields array 



            return $array;







        }

        public function removeDocument($collectionName,$criteria){ 

                         if(empty($criteria) || $criteria==null)
                            $criteria = array('_id' => $this->_id);        // default criteria 
            
            global $db;
            $collection = $db->$collectionName;
            try{
                return $collection->remove($criteria);  // return boolean
            }catch(Exception $e){

                echo $e->getMessage();

            }
        }

}?>