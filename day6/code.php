<?php
$inputfile = fopen("input","r");
$input = fgets($inputfile);
$inarow = 0;
$prev = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
$index = 0;
foreach (str_split($input) as $char) {
    $prev[$index % 14] = $char;
    $index = $index+1;
    if ((count($prev) === count(array_unique($prev)) && ($index >= 4)))
    {
        echo $index;
        break;
    }
}
fclose($inputfile);
