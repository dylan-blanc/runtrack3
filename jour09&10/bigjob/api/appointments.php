<?php
/**
 * API d'appointments - Gestion CRUD des rendez-vous
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

define('APPOINTMENTS_FILE', __DIR__ . '/../data/appointments.json');

// === Fonctions utilitaires ===

function jsonResponse(bool $success, string $message, array $data = []): void
{
    echo json_encode(
        array_merge(['success' => $success, 'message' => $message], $data),
        JSON_UNESCAPED_UNICODE
    );
    exit();
}

function getAppointments(): array
{
    if (!file_exists(APPOINTMENTS_FILE)) {
        return [];
    }
    return json_decode(file_get_contents(APPOINTMENTS_FILE), true) ?? [];
}

function saveAppointments(array $appointments): bool
{
    return file_put_contents(
        APPOINTMENTS_FILE,
        json_encode($appointments, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    ) !== false;
}

function generateAppointmentId(): int
{
    $ids = array_column(getAppointments(), 'id');
    return empty($ids) ? 1 : max($ids) + 1;
}

function findAppointmentById(int $id): ?array
{
    foreach (getAppointments() as $index => $appointment) {
        if ($appointment['id'] === $id) {
            return ['index' => $index, 'appointment' => $appointment];
        }
    }
    return null;
}

// === Actions ===

function listAppointments(array $data): void
{
    $appointments = getAppointments();

    // Filtrage optionnel par date
    if (!empty($data['fromDate']) && !empty($data['toDate'])) {
        $fromDate = new DateTime($data['fromDate']);
        $toDate = new DateTime($data['toDate'] . ' 23:59:59');

        $appointments = array_filter($appointments, function ($apt) use ($fromDate, $toDate) {
            $aptStart = new DateTime($apt['start']);
            $aptEnd = new DateTime($apt['end']);
            return $aptStart >= $fromDate && $aptEnd <= $toDate;
        });

        $appointments = array_values($appointments);
    }

    // Filtrage par recherche
    if (!empty($data['search'])) {
        $search = strtolower($data['search']);
        $appointments = array_filter($appointments, function ($apt) use ($search) {
            return strpos(strtolower($apt['title'] ?? ''), $search) !== false;
        });
        $appointments = array_values($appointments);
    }

    jsonResponse(true, 'Liste des appointments récupérée.', ['appointments' => $appointments]);
}

function createAppointment(array $data): void
{
    if (empty($data['title'])) {
        jsonResponse(false, 'Le titre est requis.');
    }

    if (empty($data['start']) || empty($data['end'])) {
        jsonResponse(false, 'Les dates de début et fin sont requises.');
    }

    $appointments = getAppointments();

    $newAppointment = [
        'id' => generateAppointmentId(),
        'title' => trim($data['title']),
        'start' => $data['start'],
        'end' => $data['end'],
        'allDay' => $data['allDay'] ?? false,
        'description' => trim($data['description'] ?? ''),
        'color' => $data['color'] ?? '#3357FF',
        'link' => trim($data['link'] ?? '')
    ];

    $appointments[] = $newAppointment;

    if (!saveAppointments($appointments)) {
        jsonResponse(false, "Erreur lors de l'enregistrement.");
    }

    jsonResponse(true, 'Appointment créé avec succès.', ['appointment' => $newAppointment]);
}

function updateAppointment(array $data): void
{
    if (empty($data['id'])) {
        jsonResponse(false, "L'ID de l'appointment est requis.");
    }

    $result = findAppointmentById((int) $data['id']);

    if (!$result) {
        jsonResponse(false, 'Appointment non trouvé.');
    }

    $appointments = getAppointments();
    $index = $result['index'];

    // Mise à jour des champs
    if (isset($data['title']))
        $appointments[$index]['title'] = trim($data['title']);
    if (isset($data['start']))
        $appointments[$index]['start'] = $data['start'];
    if (isset($data['end']))
        $appointments[$index]['end'] = $data['end'];
    if (isset($data['allDay']))
        $appointments[$index]['allDay'] = $data['allDay'];
    if (isset($data['description']))
        $appointments[$index]['description'] = trim($data['description']);
    if (isset($data['color']))
        $appointments[$index]['color'] = $data['color'];
    if (isset($data['link']))
        $appointments[$index]['link'] = trim($data['link']);

    if (!saveAppointments($appointments)) {
        jsonResponse(false, "Erreur lors de la mise à jour.");
    }

    jsonResponse(true, 'Appointment mis à jour avec succès.', ['appointment' => $appointments[$index]]);
}

function deleteAppointment(array $data): void
{
    if (empty($data['id'])) {
        jsonResponse(false, "L'ID de l'appointment est requis.");
    }

    $result = findAppointmentById((int) $data['id']);

    if (!$result) {
        jsonResponse(false, 'Appointment non trouvé.');
    }

    $appointments = getAppointments();
    array_splice($appointments, $result['index'], 1);

    if (!saveAppointments($appointments)) {
        jsonResponse(false, "Erreur lors de la suppression.");
    }

    jsonResponse(true, 'Appointment supprimé avec succès.');
}

// === Routeur ===

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Supporter les requêtes GET pour lister les appointments
    listAppointments($_GET);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Méthode non autorisée.');
}

$data = json_decode(file_get_contents('php://input'), true);

if ($data === null) {
    jsonResponse(false, 'Données JSON invalides.');
}

match ($data['action'] ?? '') {
    'list' => listAppointments($data),
    'create' => createAppointment($data),
    'update' => updateAppointment($data),
    'delete' => deleteAppointment($data),
    default => jsonResponse(false, 'Action non reconnue.')
};
