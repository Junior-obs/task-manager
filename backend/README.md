# TaskFlow API 🚀

API REST sécurisée de gestion de tâches construite avec **NestJS**, **TypeORM** et **SQLite/MySQL**.

## Stack technique

- **Framework** : [NestJS](https://nestjs.com/) v11
- **ORM** : [TypeORM](https://typeorm.io/) avec SQLite (dev) / MySQL (prod)
- **Auth** : JWT + Passport + bcrypt
- **Docs** : Swagger / OpenAPI
- **Tests** : Jest + Supertest

## Fonctionnalités

- CRUD complet des tâches avec filtres et pagination
- Authentification JWT (register / login)
- Contrôle d'accès par rôles (RBAC — admin / user)
- Protection des ressources par propriétaire
- Dashboard avec météo, pays, taux de change (APIs externes)
- Documentation Swagger interactive

## Prérequis

- Node.js >= 18
- npm

## Installation

```bash
npm install
```

## Configuration

Copier `.env.example` en `.env` (déjà présent) :

```env
PORT=3000
DB_TYPE=sqlite              # sqlite (par défaut) ou mysql
JWT_SECRET=votre_secret
JWT_EXPIRES_IN=1d
WEATHER_API_KEY=votre_cle   # optionnel, pour la météo
```

## Lancer le projet

```bash
# Développement
npm run start:dev

# Production
npm run build
npm run start:prod
```

API disponible sur `http://localhost:3000/api/v1`

## Documentation Swagger

`http://localhost:3000/api/docs`

## Endpoints principaux

### Auth
| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/v1/auth/register` | Inscription |
| POST | `/api/v1/auth/login` | Connexion → JWT |

### Tâches (authentification requise)
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/v1/tasks` | Lister ses tâches (paginé) |
| POST | `/api/v1/tasks` | Créer une tâche |
| GET | `/api/v1/tasks/stats` | Statistiques |
| GET | `/api/v1/tasks/:id` | Détail d'une tâche |
| PATCH | `/api/v1/tasks/:id` | Modifier |
| DELETE | `/api/v1/tasks/:id` | Supprimer |
| GET | `/api/v1/tasks/all` | **Admin** — toutes les tâches |

### Utilisateurs
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/v1/users/profile` | Profil connecté |
| GET | `/api/v1/users` | **Admin** — liste des utilisateurs |

### Dashboard (authentification requise)
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/v1/dashboard/weather?city=Dakar` | Météo |
| GET | `/api/v1/dashboard/country?name=Senegal` | Infos pays |
| GET | `/api/v1/dashboard/exchange?base=USD` | Taux de change |
| GET | `/api/v1/dashboard/convert?amount=100&from=USD&to=EUR` | Conversion |

### Produits & Catégories (admin requis pour create/update/delete)
| Méthode | Route | Description |
|---------|-------|-------------|
| GET/POST | `/api/v1/products` | Lister / Créer |
| GET/PATCH/DELETE | `/api/v1/products/:id` | Détail / Modifier / Supprimer |
| GET/POST | `/api/v1/categories` | Lister / Créer |
| GET/PATCH/DELETE | `/api/v1/categories/:id` | Détail / Modifier / Supprimer |

## Tests

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Couverture
npm run test:cov
```

## Base de données

Par défaut, SQLite est utilisé (fichier `task_manager.sqlite`). Pour MySQL, changer `DB_TYPE=mysql` dans `.env` et créer la base `task_manager_db`.

Les entités sont synchronisées automatiquement (`synchronize: true`).

## Architecture

```
src/
├── auth/          # Authentification (JWT, guards, strategies)
├── users/         # Gestion des utilisateurs
├── tasks/         # CRUD tâches + statistiques
├── products/      # Gestion des produits
├── categories/    # Gestion des catégories
├── dashboard/     # Dashboard (APIs externes)
├── external-api/  # Services météo, pays, change
├── common/        # Pipes, filtres globaux
├── config/        # Configuration
└── docs/          # Swagger
```

## Déploiement

### Docker

```bash
docker compose up --build
```

### CI/CD

GitHub Actions est configuré : tests unitaires + e2e à chaque push.
