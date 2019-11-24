<?php

$cookieName = "user";

if (empty($_COOKIE[$cookieName])) {
     header("Location: http://3.85.125.42/engi-s-cinema/login.html");
} else {
     header("Location: http://3.85.125.42/engi-s-cinema/homepage.html");
}
