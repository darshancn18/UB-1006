<?php

$start_time = strtotime("10:00 AM");  // convert to timestamp

for ($i = 0; $i < 10; $i++) {

    $slot_time = date("h:i A", $start_time + ($i * 10 * 60));

    echo "Member " . ($i + 1) . " Time: " . $slot_time . "<br>";
}

?>
