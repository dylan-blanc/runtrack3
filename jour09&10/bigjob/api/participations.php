<?php
/**
 * API des demandes de participation - Gestion des inscriptions aux événements
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

define('PARTICIPATIONS_FILE', __DIR__ . '/../data/participations.json');
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

function getParticipations(): array
{
    if (!file_exists(PARTICIPATIONS_FILE)) {
        return [];
    }
    return json_decode(file_get_contents(PARTICIPATIONS_FILE), true) ?? [];
}

function saveParticipations(array $participations): bool
{
    return file_put_contents(
        PARTICIPATIONS_FILE,
        json_encode($participations, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    ) !== false;
}

function generateParticipationId(): int
{
    $ids = array_column(getParticipations(), 'id');
    return empty($ids) ? 1 : max($ids) + 1;
}

function findParticipationById(int $id): ?array
{
    foreach (getParticipations() as $index => $participation) {
        if ($participation['id'] === $id) {
            return ['index' => $index, 'participation' => $participation];
        }
    }
    return null;
}

// === Actions ===

function requestParticipation(array $data): void
{
    // Vérifier que l'utilisateur est connecté
    if (empty($data['userId']) || empty($data['userEmail'])) {
        jsonResponse(false, 'Vous devez être connecté pour demander à participer.');
    }

    if (empty($data['appointmentId']) || empty($data['appointmentTitle'])) {
        jsonResponse(false, "Les informations de l'événement sont requises.");
    }

    $participations = getParticipations();

    // Vérifier si une demande existe déjà pour cet utilisateur et cet événement
    foreach ($participations as $p) {
        if ($p['appointmentId'] == $data['appointmentId'] && $p['userId'] == $data['userId']) {
            jsonResponse(false, 'Vous avez déjà demandé à participer à cet événement.');
        }
    }

    $newParticipation = [
        'id' => generateParticipationId(),
        'appointmentId' => (int) $data['appointmentId'],
        'appointmentTitle' => trim($data['appointmentTitle']),
        'userId' => (int) $data['userId'],
        'userEmail' => trim($data['userEmail']),
        'userName' => trim($data['userName'] ?? ''),
        'status' => 'pending',
        'createdAt' => date('Y-m-d H:i:s')
    ];

    $participations[] = $newParticipation;

    if (!saveParticipations($participations)) {
        jsonResponse(false, "Erreur lors de l'enregistrement de la demande.");
    }

    jsonResponse(true, 'Demande de participation envoyée avec succès.', ['participation' => $newParticipation]);
}

function listParticipations(array $data): void
{
    $participations = getParticipations();

    // Filtrer par statut si spécifié
    if (!empty($data['status'])) {
        $status = $data['status'];
        $participations = array_filter($participations, fn($p) => $p['status'] === $status);
        $participations = array_values($participations);
    }

    jsonResponse(true, 'Liste des demandes récupérée.', ['participations' => $participations]);
}

function updateParticipation(array $data): void
{
    // Vérifier les droits admin/moderator (via userRole envoyé)
    $allowedRoles = ['admin', 'moderator'];
    $userRole = $data['userRole'] ?? null;

    if (!$userRole || !in_array($userRole, $allowedRoles)) {
        jsonResponse(false, 'Accès refusé. Seuls les administrateurs peuvent gérer les demandes.');
    }

    if (empty($data['id'])) {
        jsonResponse(false, "L'ID de la demande est requis.");
    }

    if (empty($data['status']) || !in_array($data['status'], ['accepted', 'rejected'])) {
        jsonResponse(false, 'Le statut doit être "accepted" ou "rejected".');
    }

    $result = findParticipationById((int) $data['id']);

    if (!$result) {
        jsonResponse(false, 'Demande non trouvée.');
    }

    $participations = getParticipations();
    $participations[$result['index']]['status'] = $data['status'];

    if (!saveParticipations($participations)) {
        jsonResponse(false, "Erreur lors de la mise à jour.");
    }

    jsonResponse(true, 'Demande mise à jour avec succès.', ['participation' => $participations[$result['index']]]);
}

// === Routeur ===

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    listParticipations($_GET);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Méthode non autorisée.');
}

$data = json_decode(file_get_contents('php://input'), true);

if ($data === null) {
    jsonResponse(false, 'Données JSON invalides.');
}

match ($data['action'] ?? '') {
    'request' => requestParticipation($data),
    'list' => listParticipations($data),
    'update' => updateParticipation($data),
    default => jsonResponse(false, 'Action non reconnue.')
};
