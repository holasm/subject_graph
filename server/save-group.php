<?php 
require('cors.php');
cors();
$create = 'INSERT INTO '
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if ( !empty($_POST) ) {
    if( isset($_POST['id']) ) {
      // save the data if not already exists

      // else update
    } else {
      print("No post");
    }
  } else {
    echo "Empty POST";
  }
} else {
  echo "No POST method ";
}

// $user = 'root';
// $pass = '123';
// $query = 'SELECT courses_details.course_name as name, courses_details.course_code as code, courses.id_courses as id
//           FROM courses_details
//          JOIN courses
//          ON courses_details.id_courses_details = courses.id_courses';
// try {
//     $dbh = new PDO('mysql:host=localhost;dbname=graph', $user, $pass);
//     $dbh = null;
// } catch (PDOException $e) {
//     print "Error!: " . $e->getMessage() . "<br/>";
//     die();
// }


?>