<?php
$arr=array(
    "11837249"=>28.50,
    "37999364"=>28.50,
    "41273080"=>28.50,
    "eventRate"=>35.5,
    "tkRate"=>10.50,
);


$key=array_search(max($arr),$arr); 
print_r($key);
