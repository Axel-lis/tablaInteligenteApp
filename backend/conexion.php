<?php
$server= 'localhost';
$user='root';
$pass='';
$db='tablainteligenteapp';
//establezco la conexión con la librería de PHP PDO.
try{
$conexion= new PDO(
//donde esta el server/ driver/ db
"mysql:host=$server;dbname=$db",$user,$pass );
}
catch(PDOException $error){
var_dump($error->getMessage());
}
?>