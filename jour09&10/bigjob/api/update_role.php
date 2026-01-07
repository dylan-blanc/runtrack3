<?php
/**
 * API pour mettre à jour le rôle d'un utilisateur
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Gérer les requêtes OPTIONS (preflight CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Vérifier la méthode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Récupérer les données JSON
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['userId']) || !isset($input['newRole'])) {
    echo json_encode(['success' => false, 'message' => 'Données manquantes']);
    exit;
}

$userId = (int) $input['userId'];
$newRole = strtolower(trim($input['newRole']));

// Vérifier que le rôle est valide
$validRoles = ['admin', 'moderator', 'user'];
if (!in_array($newRole, $validRoles)) {
    echo json_encode(['success' => false, 'message' => 'Rôle invalide']);
    exit;
}

// Chemin vers le fichier users.json
$usersFile = __DIR__ . '/../data/users.json';

// Lire les utilisateurs
if (!file_exists($usersFile)) {
    echo json_encode(['success' => false, 'message' => 'Fichier utilisateurs non trouvé']);
    exit;
}

$users = json_decode(file_get_contents($usersFile), true);

if ($users === null) {
    echo json_encode(['success' => false, 'message' => 'Erreur de lecture du fichier utilisateurs']);
    exit;
}

// Trouver et mettre à jour l'utilisateur
$userFound = false;
foreach ($users as &$user) {
    if ($user['id'] === $userId) {
        $user['role'] = $newRole;
        $userFound = true;
        break;
    }
}

if (!$userFound) {
    echo json_encode(['success' => false, 'message' => 'Utilisateur non trouvé']);
    exit;
}

// Sauvegarder les modifications
$result = file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($result === false) {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la sauvegarde']);
    exit;
}

echo json_encode(['success' => true, 'message' => 'Rôle mis à jour avec succès']);
