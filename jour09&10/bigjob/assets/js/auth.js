/**
 * Module d'authentification - Login & Register
 * Encodage Base64 pour les tests (pas pour la production!)
 */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@laplateforme\.io$/i;

// === Encodage/Décodage Base64 (pour tests uniquement) ===

function encodePassword(password) {
    return btoa(unescape(encodeURIComponent(password)));
}

function decodePassword(encoded) {
    try {
        return decodeURIComponent(escape(atob(encoded)));
    } catch {
        return null;
    }
}

// === Utilitaires ===

function showMessage(formId, message, isSuccess = false) {
    const form = document.getElementById(formId);
    if (!form) return;

    // Supprimer l'alerte précédente
    document.querySelector('.auth-alert')?.remove();

    // Créer la nouvelle alerte
    const alert = document.createElement('div');
    alert.className = `auth-alert alert ${isSuccess ? 'alert-success' : 'alert-danger'} mb-3`;
    alert.role = 'alert';
    alert.innerHTML = `
        <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2"></i>
        ${message}
    `;

    // Utiliser le conteneur dédié si disponible, sinon insérer au début du formulaire
    const containerId = formId.replace('-form', '-alert-container');
    const container = document.getElementById(containerId);

    if (container) {
        container.appendChild(alert);
    } else {
        form.prepend(alert);
    }

    // Auto-suppression après 5 secondes
    setTimeout(() => alert.remove(), 5000);
}

async function sendAuthRequest(action, data, formId) {
    try {
        const response = await fetch('api/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, ...data })
        });
        return await response.json();
    } catch (error) {
        console.error(`Erreur ${action}:`, error);
        showMessage(formId, 'Erreur de connexion au serveur.');
        return null;
    }
}

// === Handlers ===

async function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const formId = 'register-form';

    const rawPassword = form.password?.value;

    const data = {
        nom: form.nom?.value.trim(),
        prenom: form.prenom?.value.trim(),
        adresse: form.adresse?.value.trim(),
        email: form.email?.value.trim().toLowerCase(),
        password: rawPassword ? encodePassword(rawPassword) : ''
    };

    // Validations
    if (!data.nom || !data.prenom || !data.adresse || !data.email || !rawPassword) {
        return showMessage(formId, 'Tous les champs sont obligatoires.');
    }
    if (!EMAIL_REGEX.test(data.email)) {
        return showMessage(formId, 'Seuls les emails @laplateforme.io sont autorisés.');
    }
    if (rawPassword.length < 4) {
        return showMessage(formId, 'Le mot de passe doit contenir au moins 4 caractères.');
    }

    const result = await sendAuthRequest('register', data, formId);
    if (!result) return;

    if (result.success) {
        showMessage(formId, 'Inscription réussie ! Redirection...', true);
        form.reset();
        setTimeout(() => window.location.hash = '#login', 2000);
    } else {
        showMessage(formId, result.message);
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formId = 'login-form';

    const email = form.email?.value.trim().toLowerCase();
    const rawPassword = form.password?.value;

    // Validations
    if (!email || !rawPassword) {
        return showMessage(formId, 'Email et mot de passe sont obligatoires.');
    }
    if (!EMAIL_REGEX.test(email)) {
        return showMessage(formId, 'Seuls les emails @laplateforme.io sont autorisés.');
    }

    // Encoder le mot de passe avant envoi
    const result = await sendAuthRequest('login', {
        email,
        password: encodePassword(rawPassword)
    }, formId);

    if (!result) return;

    if (result.success) {
        sessionStorage.setItem('user', JSON.stringify(result.user));
        showMessage(formId, 'Connexion réussie !', true);
        setTimeout(() => {
            window.location.hash = result.user.role === 'admin' ? '#backoffice' : '#calendar';
        }, 1000);
    } else {
        showMessage(formId, result.message);
    }
}

// === Session ===

function getCurrentUser() {
    try {
        return JSON.parse(sessionStorage.getItem('user'));
    } catch {
        return null;
    }
}

function logout() {
    sessionStorage.removeItem('user');
    // Afficher l'accueil
    const exclure = document.getElementById('exclure');
    const viewContainer = document.getElementById('view-container');
    if (exclure) exclure.style.display = '';
    if (viewContainer) viewContainer.innerHTML = '';
    // Mettre à jour la navigation (masquer Admin et bouton Déconnexion)
    if (typeof updateAdminLinkVisibility === 'function') {
        updateAdminLinkVisibility();
    }
}

// === Initialisation ===

function initAuthForms() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // Éviter d'attacher plusieurs fois les événements
    if (registerForm && !registerForm.dataset.authInitialized) {
        registerForm.dataset.authInitialized = 'true';
        registerForm.addEventListener('submit', handleRegister);
        console.log('Register form initialized');
    }

    if (loginForm && !loginForm.dataset.authInitialized) {
        loginForm.dataset.authInitialized = 'true';
        loginForm.addEventListener('submit', handleLogin);
        console.log('Login form initialized');
    }
}

// Auto-init
document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', initAuthForms)
    : initAuthForms();

// Exports
window.authModule = { getCurrentUser, logout, initAuthForms, encodePassword, decodePassword };
window.initLogin = initAuthForms;
window.initRegister = initAuthForms;
