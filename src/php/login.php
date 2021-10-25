<?php
$link = mysqli_connect(
    '127.0.0.1',
    'root',
    'root',
    'groups',
    '3306'
);
mysqli_query($link, "SET NAMES 'utf8'");

function otherQuery($link, $query)
{
    $result = mysqli_query($link, $query) or die(mysqli_errno($link));
    for ($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);
    return $data;
}

if(isset($_POST['log']) AND isset($_POST['pass'])){
    echo json_encode(otherQuery($link, "SELECT * FROM login"), JSON_UNESCAPED_UNICODE);
}
