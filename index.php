<?php

$cookieName = "user";

if (empty($_COOKIE[$cookieName])) {
     header("Location: http://18.215.174.114/engi-s-cinema/login.html");
} else {
     header("Location: http://18.215.174.114/engi-s-cinema/homepage.html");
}
