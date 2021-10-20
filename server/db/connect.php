<?php

$host = 'localhost';
$db = 'generator';
$username = 'root';
$password = '';


try {
    $connect = new PDO("mysql:host=$host;dbname=$db;", $username, $password);
} catch (PDOException $error) {
    echo $error -> getMessage();
}

?>