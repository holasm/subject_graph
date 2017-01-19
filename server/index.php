<?php 

$user = 'root';
$pass = '123';
$query = 'SELECT courses_details.course_name as name, courses_details.course_code as code, courses.id_courses as id
          FROM courses_details
         JOIN courses
         ON courses_details.id_courses_details = courses.id_courses';
try {
    $arr = array();
    $dbh = new PDO('mysql:host=localhost;dbname=graph', $user, $pass);
    foreach($dbh->query($query) as $row) {
      unset($row[0]);
      unset($row[1]);
      unset($row[2]);
      $query_pre_req = 'SELECT * from courses_prereq
                        WHERE courses_prereq.courses_details_id_courses_details = ' . $row['id'];

      $pre_req = array();
      $row['pre_req'] = array();

      foreach($dbh->query($query_pre_req) as $pre_requisite) {
        array_push($row['pre_req'], $pre_requisite['id_prereq']);
      }

      array_push($arr, $row);
    }
    print(json_encode($arr));
    $dbh = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

?>