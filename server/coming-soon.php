<?php

    include 'db/connect.php';

    $name = $_POST['name'];
    $email = $_POST['email'];

    $insertQuery = 'INSERT INTO `emails` VALUES (NULL, ?, ?)';
    $insertResult = $connect -> prepare($insertQuery);
    $insertResult -> bindValue(1, $name);
    $insertResult -> bindValue(2, $email);
    $insertFinish = $insertResult -> execute();

    if ($insertFinish) {
        header('location: ../comming-soon.php?result=1');
    } else {
        header('location: ../comming-soon.php?result=0');

    }
?>