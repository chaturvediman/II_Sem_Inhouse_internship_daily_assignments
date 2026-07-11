<html>
<body>
<?php

$name = "Manasvi Chaturvedi";
$cgpa ="8.8;
$bio ="I like to code and practice it daily and my hobby is listening music.";
$branch ="AI";
$date=date("Y-M-D-d , 'h-i-s'");
$IP= $_SERVER['REMOTE_ADDR'];
if($date < 12){
    echo ""
}

?>

<center>
<h1>Hello World </h1>
<p><?=$name?></p>
<p><?=$cgpa?></p>
<p><?=$bio?></p>
<p><?=$branch?></p>
<p><?=$date?></p>
<p><?=$IP?></p>
</center>
</body>
    </html>
