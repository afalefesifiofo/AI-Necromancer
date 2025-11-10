<?php
// Legacy PHP 5 code example for testing

mysql_connect("localhost", "user", "pass");
mysql_select_db("mydb");

$id = $_GET['id'];
$query = "SELECT * FROM users WHERE id = " . $id;
$result = mysql_query($query);

while($row = mysql_fetch_array($result)) {
  echo $row['name'];
}

mysql_close();
?>
