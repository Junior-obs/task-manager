# TaskFlow - Gestionnaire de Tâches

Application full-stack de gestion de tâches avec React/Vite (frontend) et NestJS (backend).

## Architecture

```
task-manager/
├── src/                    # Frontend React/Vite
│   ├── components/         # Composants UI
│   ├── context/            # Contextes React (Auth, Tasks, Theme)
│   ├── hooks/              # Hooks personnalisés
│   ├── pages/              # Pages de l'application
│   ├── services/           # Services API (axios)
│   └── types/              # Types TypeScript partagés
├── backend/                # Backend NestJS
│   └── src/
│       ├── auth/           # Authentification (JWT)
│       ├── users/          # Gestion des utilisateurs
│       ├── tasks/          # CRUD tâches
│       ├── products/       # CRUD produits
│       ├── categories/     # CRUD catégories
│       ├── dashboard/      # Dashboard & API externe
│       ├── external-api/   # Services météo, pays, change
│       ├── common/         # Filtres, pipes globaux
│       ├── config/         # Configuration
│       └── docs/           # Documentation Swagger
├── public/                 # Assets statiques
├── dist/                   # Build frontend
└── vite.config.ts          # Configuration Vite
```

## Prérequis

- Node.js >= 18
- MySQL >= 8.0
- npm >= 9

## Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
npm install
```

## Configuration

### Variables d'environnement - Backend

Créer `backend/.env` :

```env
PORT=3000

# Base de données
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=task_manager_db

# JWT
JWT_SECRET=votre_cle_secrete
JWT_EXPIRES_IN=1d

# API externe (OpenWeatherMap)
WEATHER_API_KEY=votre_cle_api
```

### Variables d'environnement - Frontend

Créer `.env` à la racine :

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## Démarrage

### Backend

```bash
cd backend
npm run start:dev
```

Le serveur démarre sur http://localhost:3000.

### Frontend

```bash
npm run dev
```

L'application démarre sur http://localhost:5173.

Le proxy Vite redirige les appels `/api` vers le backend.

## Endpoints API

### Authentification

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| POST | `/api/v1/auth/register` | Inscription | Non |
| POST | `/api/v1/auth/login` | Connexion | Non |

### Utilisateurs

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/api/v1/users/profile` | Profil utilisateur | JWT |

### Tâches

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/api/v1/tasks` | Liste des tâches | JWT |
| GET | `/api/v1/tasks/stats` | Statistiques | JWT |
| GET | `/api/v1/tasks/:id` | Détail d'une tâche | JWT |
| POST | `/api/v1/tasks` | Créer une tâche | JWT |
| PATCH | `/api/v1/tasks/:id` | Modifier une tâche | JWT |
| DELETE | `/api/v1/tasks/:id` | Supprimer une tâche | JWT |

### Produits

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/api/v1/products` | Liste des produits | Non |
| POST | `/api/v1/products` | Créer un produit | Non |
| GET | `/api/v1/products/:id` | Détail d'un produit | Non |
| PATCH | `/api/v1/products/:id` | Modifier un produit | Non |
| DELETE | `/api/v1/products/:id` | Supprimer un produit | Non |

### Catégories

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/api/v1/categories` | Liste des catégories | Non |
| POST | `/api/v1/categories` | Créer une catégorie | Non |
| GET | `/api/v1/categories/:id` | Détail d'une catégorie | Non |
| PATCH | `/api/v1/categories/:id` | Modifier une catégorie | Non |
| DELETE | `/api/v1/categories/:id` | Supprimer une catégorie | Non |

### Dashboard (API externe)

| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| GET | `/api/v1/dashboard/summary` | Résumé complet | Non |
| GET | `/api/v1/dashboard/weather` | Météo par ville | Non |
| GET | `/api/v1/dashboard/country` | Infos pays | Non |
| GET | `/api/v1/dashboard/exchange` | Taux de change | Non |
| GET | `/api/v1/dashboard/convert` | Conversion devise | Non |

## Documentation Swagger

Après démarrage du backend :

```
http://localhost:3000/api/docs
```

## Tests

### Backend

```bash
cd backend

# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Couverture
npm run test:cov
```

### Frontend

```bash
npm run build
```

## Scripts disponibles

### Backend

| Commande | Description |
|----------|-------------|
| `npm run build` | Compilation TypeScript |
| `npm run start:dev` | Démarrage en mode développement |
| `npm run start:prod` | Démarrage en mode production |
| `npm run lint` | Vérification ESLint |
| `npm run test` | Tests unitaires |
| `npm run test:e2e` | Tests end-to-end |

### Frontend

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run lint` | Vérification ESLint |
| `npm run preview` | Preview du build |

## Technologies

### Frontend
- React 19
- TypeScript 5.9
- Vite 8
- Tailwind CSS 3.4
- React Router 7
- Recharts
- Lucide React (icônes)
- Axios

### Backend
- NestJS 11
- TypeScript 5.9
- TypeORM
- MySQL
- JWT (Passport)
- Swagger
- Axios
- bcrypt
- class-validator

## Fonctionnalités

- Authentification JWT (inscription / connexion)
- CRUD complet des tâches
- Filtres par statut, priorité, catégorie
- Statistiques et graphiques
- Mode sombre / clair
- Dashboard avec API externe (météo, pays, change)
- Gestion des produits et catégories
- Validation des données
- Gestion centralisée des erreurs
- Documentation Swagger interactive

## Structure des routes frontend

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Tableau de bord |
| `/login` | LoginPage | Connexion |
| `/register` | RegisterPage | Inscription |
| `/add` | TaskFormPage | Nouvelle tâche |
| `/edit/:id` | TaskFormPage | Modification tâche |
| `/stats` | StatsPage | Statistiques |
| `/about` | AboutPage | À propos |

## Équipe

- Mamadou Lamine - Authentification & sécurité
- Saliou - Dashboard & API externe
- BDC - Base de données & CRUD
- (Vous) - Configuration globale, Swagger, intégration, tests, documentation
