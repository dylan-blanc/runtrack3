/**
 * Module Admin - Gestion des utilisateurs
 * Affiche la liste des utilisateurs et permet de modifier leur rôle
 */

// === Vérification d'accès ===

function checkAdminAccess() {
    const user = getCurrentUserFromSession();
    if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
        // Afficher un message d'erreur dans le conteneur
        const viewContainer = document.getElementById('view-container');
        if (viewContainer) {
            viewContainer.innerHTML = `
                <div class="container mt-5">
                    <div class="alert alert-danger text-center" role="alert">
                        <h4 class="alert-heading">Accès Refusé</h4>
                        <p>Seuls les administrateurs et modérateurs peuvent accéder à cette page.</p>
                        <hr>
                        <p class="mb-0">Veuillez vous <a href="#" data-view="login" onclick="loadView('login'); return false;">connecter</a> avec un compte autorisé.</p>
                    </div>
                </div>
            `;
        }
        return false;
    }
    return true;
}

function getCurrentUserFromSession() {
    try {
        return JSON.parse(sessionStorage.getItem('user'));
    } catch {
        return null;
    }
}

// === Chargement des participations ===

let allParticipations = [];

async function loadParticipations() {
    try {
        const user = getCurrentUserFromSession();
        const response = await fetch('api/participations.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'list', userRole: user?.role })
        });
        const data = await response.json();
        if (data.success) {
            allParticipations = data.participations || [];
            displayParticipations(allParticipations);
        }
    } catch (error) {
        console.error('Erreur:', error);
        const tbody = document.getElementById('participations-tbody');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Erreur lors du chargement des demandes</td></tr>';
        }
    }
}

function displayParticipations(participations) {
    const tbody = document.getElementById('participations-tbody');
    if (!tbody) {
        console.error('tbody participations-tbody non trouvé');
        return;
    }

    if (participations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Aucune demande de participation</td></tr>';
        return;
    }

    tbody.innerHTML = participations.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${escapeHtml(p.appointmentTitle)}</td>
            <td>${escapeHtml(p.userName)}</td>
            <td>${escapeHtml(p.userEmail)}</td>
            <td><span class="badge ${getStatusBadge(p.status)}">${formatStatus(p.status)}</span></td>
            <td>${p.createdAt}</td>
            <td>
                ${p.status === 'pending' ? `
                    <button class="btn btn-sm btn-success me-1" onclick="handleParticipationAction(${p.id}, 'accepted')">
                        <i class="bi bi-check"></i> Accepter
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="handleParticipationAction(${p.id}, 'rejected')">
                        <i class="bi bi-x"></i> Refuser
                    </button>
                ` : '-'}
            </td>
        </tr>
    `).join('');
}

function getStatusBadge(status) {
    switch (status) {
        case 'pending': return 'bg-warning text-dark';
        case 'accepted': return 'bg-success';
        case 'rejected': return 'bg-danger';
        default: return 'bg-secondary';
    }
}

function formatStatus(status) {
    switch (status) {
        case 'pending': return 'En attente';
        case 'accepted': return 'Acceptée';
        case 'rejected': return 'Refusée';
        default: return status;
    }
}

async function handleParticipationAction(id, status) {
    try {
        const user = getCurrentUserFromSession();
        const response = await fetch('api/participations.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'update',
                id: id,
                status: status,
                userRole: user?.role
            })
        });
        const result = await response.json();

        if (result.success) {
            showNotification(`Demande ${status === 'accepted' ? 'acceptée' : 'refusée'} !`, 'success');
            loadParticipations();
        } else {
            showNotification(result.message || 'Erreur lors de la mise à jour', 'danger');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showNotification('Erreur de connexion', 'danger');
    }
}

// === Navigation entre sections ===

function switchSection(section) {
    const participationsSection = document.getElementById('participations-section');
    const usersSection = document.getElementById('users-section');
    const mainTitle = document.getElementById('main-title');

    // Mise à jour des liens actifs dans la sidebar
    document.querySelectorAll('[data-section]').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === section) {
            link.classList.add('active');
        }
    });

    if (section === 'users') {
        participationsSection.style.display = 'none';
        usersSection.style.display = 'block';
        mainTitle.textContent = 'Gestion des Utilisateurs';
        loadUsers();
    } else {
        participationsSection.style.display = 'block';
        usersSection.style.display = 'none';
        mainTitle.textContent = 'Dashboard';
        loadParticipations();
    }
}

// === Chargement des utilisateurs ===

let allUsers = [];
let selectedUserId = null;

async function loadUsers() {
    try {
        // Ajouter un timestamp pour éviter le cache
        const response = await fetch('data/users.json?t=' + Date.now());
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des utilisateurs');
        }
        allUsers = await response.json();
        displayUsers(allUsers);
    } catch (error) {
        console.error('Erreur:', error);
        const tbody = document.getElementById('users-tbody');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Erreur lors du chargement des utilisateurs</td></tr>';
        }
    }
}

function displayUsers(users) {
    const tbody = document.getElementById('users-tbody');
    if (!tbody) {
        console.error('tbody users-tbody non trouvé');
        return;
    }

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Aucun utilisateur trouvé</td></tr>';
        return;
    }

    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${escapeHtml(user.email)}</td>
            <td>${escapeHtml(user.nom)}</td>
            <td>${escapeHtml(user.prenom)}</td>
            <td>${escapeHtml(user.adresse)}</td>
            <td><span class="badge ${getRoleBadgeClass(user.role)}">${formatRoleName(user.role)}</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" 
                        onclick="openRoleModal(${user.id}, '${escapeHtml(user.email)}', '${user.role}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    Modifier
                </button>
            </td>
        </tr>
    `).join('');
}

function getRoleBadgeClass(role) {
    switch (role) {
        case 'admin': return 'bg-danger';
        case 'moderator': return 'bg-warning text-dark';
        case 'user': return 'bg-secondary';
        default: return 'bg-light text-dark';
    }
}

function formatRoleName(role) {
    switch (role) {
        case 'admin': return 'Admin';
        case 'moderator': return 'Modérateur';
        case 'user': return 'Utilisateur';
        default: return role;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text || '';
    return div.innerHTML;
}

// === Gestion du modal de modification de rôle ===

function openRoleModal(userId, email, currentRole) {
    selectedUserId = userId;
    document.getElementById('modal-user-email').textContent = email;
    document.getElementById('role-select').value = currentRole;

    // Ouvrir le modal manuellement
    const modalElement = document.getElementById('roleModal');
    if (modalElement && typeof bootstrap !== 'undefined') {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

async function saveRole() {
    if (!selectedUserId) return;

    const newRole = document.getElementById('role-select').value;

    try {
        const response = await fetch('api/update_role.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: selectedUserId,
                newRole: newRole
            })
        });

        const result = await response.json();

        if (result.success) {
            // Fermer le modal
            const modalElement = document.getElementById('roleModal');
            if (modalElement && typeof bootstrap !== 'undefined') {
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) modal.hide();
            }

            // Recharger les utilisateurs
            await loadUsers();

            // Afficher une notification de succès
            showNotification('Rôle mis à jour avec succès !', 'success');
        } else {
            showNotification(result.message || 'Erreur lors de la mise à jour', 'danger');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showNotification('Erreur de connexion au serveur', 'danger');
    }
}

function showNotification(message, type = 'info') {
    // Supprimer l'ancienne notification si elle existe
    document.querySelector('.admin-notification')?.remove();

    const notification = document.createElement('div');
    notification.className = `admin-notification alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 80px; right: 20px; z-index: 1060; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(notification);

    // Auto-suppression après 3 secondes
    setTimeout(() => notification.remove(), 3000);
}

// === Initialisation ===

function initBackoffice() {
    console.log('initBackoffice appelé');

    // Vérifier l'accès - si refusé, ne pas continuer
    if (!checkAdminAccess()) {
        console.log('Accès refusé au backoffice');
        return;
    }

    console.log('Accès autorisé, chargement des demandes de participation...');

    // Charger les participations par défaut (Dashboard)
    loadParticipations();

    // Attacher les événements de navigation sidebar
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            switchSection(this.dataset.section);
        });
    });

    // Attacher l'événement au bouton de sauvegarde de rôle
    const saveBtn = document.getElementById('save-role-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveRole);
    }
}

// Export pour le routeur
window.initBackoffice = initBackoffice;
window.openRoleModal = openRoleModal;
window.handleParticipationAction = handleParticipationAction;
window.switchSection = switchSection;
