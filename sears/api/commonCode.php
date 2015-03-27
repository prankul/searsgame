

<?php

    function getPercentageOfResult($string){

        //percentage calculation

        $number_in_words    = array("one","two","three","four","five","six","seven","eight","nine","eleven");


        $size = count($string);
        $count_array = array_count_values($string);

        $perc = array();



        for($i=1;$i<=$size;$i++)
        {

            if(!empty($count_array[$i]))
            {
                $perc[$i] = ($count_array[$i]*100)/$size;
            }


        }

        return $perc;
    }


?>