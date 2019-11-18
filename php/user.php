<?php

// Connecting to database engi_cinema
require_once("config.php");

$cookieName = "userEngima";
$cookieValue = $_COOKIE[$cookieName];

$query = "SELECT * FROM users WHERE (token = :token)";
$stmt = $db->prepare($query);

$params = array(
    ":token" => $cookieValue
);

$stmt->execute($params);

$user = $stmt->fetch(PDO::FETCH_ASSOC);
echo json_encode($user, JSON_INVALID_UTF8_IGNORE);
exit();
?>