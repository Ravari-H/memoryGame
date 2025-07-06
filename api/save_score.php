<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['name']) || !isset($data['score'])) {
    echo json_encode(['status' => 'error']);
    exit;
}

$scoresFile = __DIR__ . '/../data/scores.json';
$scores = file_exists($scoresFile) ? json_decode(file_get_contents($scoresFile), true) : [];

$scores[] = [
    'name' => htmlspecialchars($data['name']),
    'score' => intval($data['score']),
    'timestamp' => date('Y-m-d H:i')
];

usort($scores, fn($a, $b) => $a['score'] <=> $b['score']);
$scores = array_slice($scores, 0, 10);
file_put_contents($scoresFile, json_encode($scores, JSON_PRETTY_PRINT));

echo json_encode(['status' => 'success']);
?>
