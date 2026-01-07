<?php
/**
 * API d'authentification - Gestion inscription/connexion
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

define('USERS_FILE', __DIR__ . '/../data/users.json');

// === Fonctions utilitaires ===

function jsonResponse(bool $success, string $message, array $data = []): void
{
    echo json_encode(
        array_merge(['success' => $success, 'message' => $message], $data),
        JSON_UNESCAPED_UNICODE
    );
    exit();
}

function getUsers(): array
{
    if (!file_exists(USERS_FILE)) {
        return [];
    }
    return json_decode(file_get_contents(USERS_FILE), true) ?? [];
}

function saveUsers(array $users): bool
{
    return file_put_contents(
        USERS_FILE,
        json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    ) !== false;
}

function validateEmail(string $email): bool
{
    return preg_match('/^[a-zA-Z0-9._%+-]+@laplateforme\.io$/i', $email) === 1;
}

function findUserByEmail(string $email): ?array
{
    foreach (getUsers() as $user) {
        if (strcasecmp($user['email'], $email) === 0) {
            return $user;
        }
    }
    return null;
}

function generateUserId(): int
{
    $ids = array_column(getUsers(), 'id');
    return empty($ids) ? 1 : max($ids) + 1;
}

// === Actions ===

function register(array $data): void
{
    $fields = ['nom', 'prenom', 'adresse', 'email', 'password'];

    foreach ($fields as $field) {
        if (empty($data[$field])) {
            jsonResponse(false, "Le champ '{$field}' est requis.");
        }
    }

    $email = strtolower(trim($data['email']));

    if (!validateEmail($email)) {
        jsonResponse(false, 'Seuls les emails @laplateforme.io sont autorisés.');
    }

    if (findUserByEmail($email)) {
        jsonResponse(false, 'Un compte existe déjà avec cette adresse email.');
    }

    if (strlen($data['password']) < 4) {
        jsonResponse(false, 'Le mot de passe doit contenir au moins 4 caractères.');
    }

    $users = getUsers();
    $users[] = [
        'id' => generateUserId(),
        'email' => $email,
        'nom' => trim($data['nom']),
        'prenom' => trim($data['prenom']),
        'adresse' => trim($data['adresse']),
        'password' => $data['password'],
        'role' => 'user'
    ];

    if (!saveUsers($users)) {
        jsonResponse(false, "Erreur lors de l'enregistrement.");
    }

    jsonResponse(true, 'Inscription réussie.');
}

function login(array $data): void
{
    if (empty($data['email']) || empty($data['password'])) {
        jsonResponse(false, 'Email et mot de passe sont requis.');
    }

    $email = strtolower(trim($data['email']));

    if (!validateEmail($email)) {
        jsonResponse(false, 'Seuls les emails @laplateforme.io sont autorisés.');
    }

    $user = findUserByEmail($email);

    if (!$user || $user['password'] !== $data['password']) {
        jsonResponse(false, 'Email ou mot de passe incorrect.');
    }

    jsonResponse(true, 'Connexion réussie.', [
        'user' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'nom' => $user['nom'],
            'prenom' => $user['prenom'],
            'role' => $user['role'] ?? 'user'
        ]
    ]);
}

// === Routeur ===

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Méthode non autorisée.');
}

$data = json_decode(file_get_contents('php://input'), true);

if ($data === null) {
    jsonResponse(false, 'Données JSON invalides.');
}

match ($data['action'] ?? '') {
    'register' => register($data),
    'login' => login($data),
    default => jsonResponse(false, 'Action non reconnue.')
};
