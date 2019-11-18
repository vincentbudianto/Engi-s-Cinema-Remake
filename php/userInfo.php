<?php

// Connecting to database engi_cinema
require_once("config.php");


if ($_GET) {
    //Get user ID
    $userID = $_GET["id"];

    $query = "SELECT * FROM users WHERE (userID = :userID)";
    $stmt = $db->prepare($query);

    $params = array(
        ":userID" => $userID
    );

    $stmt->execute($params);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($user, JSON_INVALID_UTF8_IGNORE);
    exit();
}
?>