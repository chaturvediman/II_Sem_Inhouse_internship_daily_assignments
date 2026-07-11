
<html>
<body>
<?php

$name = "Divyansh Shah";
$cgpa ="9.4";
$bio ="I like to code and practice it daily";
$branch ="cse";
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