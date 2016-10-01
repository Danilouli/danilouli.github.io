<?php 
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin:*");
include_once("FUNC_connect.php");

$writerMail = $_POST["mail"];
$writerPassword = $_POST["password"];
$content = $_POST["content"];
$subject = $_POST["subject"];
$name = $_POST["name"];

$PDOCon = connectDB();
	$unJSONisedProps = selectAllFromTable($PDOCon,"Props");
	array_reverse($unJSONisedProps);
	echo json_encode($unJSONisedProps);
$PDOCon = null
	
?>