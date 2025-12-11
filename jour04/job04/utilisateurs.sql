CREATE DATABASE IF NOT EXISTS utilisateurs;

USE utilisateurs;

CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO utilisateurs (nom, prenom, email) VALUES
('Dupont', 'Jean', 'jean.dupont@example.com'),
('Martin', 'Claire', 'claire.martin@example.com'),
('Durand', 'Paul', 'paul.durand@example.com'),
('Lefevre', 'Sophie', 'sophie.lefevre@example.com'),
('Moreau', 'Luc', 'luc.moreau@example.com'),
('Girard', 'Emma', 'emma.girard@example.com'),
('Roux', 'Louis', 'louis.roux@example.com'),
('Blanc', 'Julie', 'julie.blanc@example.com'),
('Henry', 'Pierre', 'pierre.henry@example.com'),
('Garnier', 'Laura', 'laura.garnier@example.com');