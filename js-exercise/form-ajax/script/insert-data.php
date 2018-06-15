<?php
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$email = $_REQUEST["email"];
$dob = $_REQUEST["dob"];

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "form-ajax";

$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

function validateUsername($username)
{
    if ($username == "") {
        return false;
    }
    if (!preg_match("/^[a-zA-Z0-9]{8,}$/",$username)) {
        return false;
    }
    return true;
}

function validatePassword($password)
{
    if (!preg_match("/^[a-zA-Z0-9]{8,}$/",$password)) {
        return false;
    }
    return true;
}

function validateEmail($email)
{
    if (!preg_match("/^[a-zA-Z0-9.]+[@]{1,1}[a-z0-9]+[.]{1,1}[a-z]+$/",$email)) {
        return false;
    }
    return true;
}

function validateDOB($dob)
{
    $currentDate = date("m/d/Y") . "";
    $dob = strtotime($dob);
    $currentDate = strtotime($currentDate);
    
    if ($dob > $currentDate) {
        return false;
    }
    return true;
}

function isExistUsername($username)
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $dbname = "form-ajax";
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    $sql = "SELECT * FROM user";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            if ($row["username"] == $username) {
                return true;
            }
        }
    }
    return false;

}

function inserUser($username, $password, $email, $dob)
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $dbname = "form-ajax";
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    $sql = "INSERT INTO user (username, password, email, birthday) VALUES ('$username', '$password', '$email', '$dob')";
    mysqli_query($conn, $sql);

}


if (validateDOB($dob) && validateEmail($email) && validatePassword($password) && validateUsername($username)) {
    if (isExistUsername($username)) {
        echo "Username is already exist";
    } else {
        inserUser($username, $password, $email, $dob);
        echo "Insert data successfully";
    }
}

?>