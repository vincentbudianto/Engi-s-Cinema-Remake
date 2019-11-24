<?php

$cookieName = "user";

if (empty($_COOKIE[$cookieName])) {
     header("Location: http://3.83.91.13/engi-s-cinema/login.html");
} else {
     header("Location: http://3.83.91.13/engi-s-cinema/homepage.html");
}
