<?php 
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin:*");
include_once("FUNC_connect.php");

$writerMail = $_POST["mail"];
$writerPassword = $_POST["password"];
$content = $_POST["content"];
$subject = $_POST["subject"];
$name = $_POST["name"];

if(isset($writerMail,$writerPassword,$content,$subject,$name)) {
	$PDOCon = connectDB();
		$writerID = insertInUsers($PDOCon,$writerMail,$writerPassword);
		$propID = insertInProps($PDOCon,$content,$writerID,$subject,$name);
		$unJSONisedProps = selectAllFromTable($PDOCon,"Props");
		array_reverse($unJSONisedProps);
		echo json_encode($unJSONisedProps);
	$PDOCon = null;
}
else {
 	echo "";
}
?>