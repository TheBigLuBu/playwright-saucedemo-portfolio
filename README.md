# Playwright SauceDemo Portfolio

🇬🇧 [English](#english) | 🇫🇷 [Français](#français)

---

## English

Automated end-to-end test suite for [SauceDemo](https://www.saucedemo.com), a demo e-commerce site, built with [Playwright](https://playwright.dev/). With over 20 years of experience as a QA Manager/Lead QA in the video game industry, I'm expanding my skill set to include test automation. This project demonstrates my ability to design, write, and organize automated tests from scratch, along with a working CI/CD pipeline.

### Tech stack

- [Playwright](https://playwright.dev/) (TypeScript)
- Node.js
- GitHub Actions (CI/CD)

### Test coverage (93 UI tests across 3 browsers + a dedicated API suite)

- **Login** — successful login and locked-out user error handling
- **Cart badge** — adding a single product, adding multiple products, removing a product
- **Checkout** — full purchase flow, validation of each required field (first name, last name, postal code), cancelling an in-progress checkout, and a numeric consistency check (item total + tax = total)
- **Continue Shopping** — returning to the product list from the cart
- **Sorting** — all 4 sort options (price low-to-high, high-to-low, name A-Z, Z-A), verified with a loop over every item
- **Hamburger menu** — logout, reset app state, About link, and All Items navigation
- **Item detail page** — navigating to a product's detail page and back to the product list
- **Problem_user bugs** — 9 tests documenting known defects on the `problem_user` account (broken sort, inconsistent add-to-cart behaviour across products, cart badge not reflecting actual cart contents, duplicated field IDs on checkout causing First/Last Name to overwrite each other, broken "About" link, mismatched product detail pages, and more). Each test uses Playwright's `test.fail()` with an explanatory comment, so it reports green while the bug is present and would flag red the day it gets fixed — acting as living regression documentation rather than a one-off manual check. Lives in its own file (`tests/problem-user.spec.ts`); the original copy is kept, skipped, in `example.spec.ts` as a historical reference
- **API tests** (`tests/api/`) — see dedicated section below

### API tests

A separate suite covers API-level testing against the public [restful-booker](https://restful-booker.herokuapp.com) API, using Playwright's built-in `APIRequestContext` (the `request` fixture) — no browser involved.

| File | Coverage |
|---|---|
| `booking.spec.ts` | `GET` (read), `POST` (create), `PUT` (full update), `PATCH` (partial update), `DELETE` — each with response validation |
| `auth.spec.ts` | `POST /auth` — token retrieval for authenticated requests |

Key design points:
- Each test is **self-contained**: rather than relying on hardcoded booking IDs that may or may not exist on the shared public API, tests create their own booking on the fly and operate on the ID returned by the API. This keeps the suite reliable and repeatable regardless of what other users have done on the API.
- Setup is centralized in a `test.beforeEach`: a fresh booking is created and an auth token retrieved before every test, with `bookingId`/`token` shared via file-level variables. Individual tests only contain the logic specific to what they're verifying (GET, PUT, PATCH, DELETE), instead of repeating the create + auth steps each time.
- Protected operations (`PUT`, `PATCH`, `DELETE`) authenticate by sending the token retrieved from `/auth` as a `Cookie` header.
- Response bodies are validated with `toEqual()` for full deep-equality checks (not just spot-checking a single field), in addition to status checks (`toBeTruthy()` / `toBeOK()`).

**Error-case coverage:**
- Protected operations (`DELETE`) correctly reject requests with no token or an invalid token (`403`)
- Fetching a non-existent booking ID returns `404` as expected
- A documented API quirk: sending a non-numeric `totalprice` on creation is **silently accepted** (`200`) with the field nulled out server-side, instead of being rejected with a `400`. This is captured as a `test.fail()` test — living regression documentation that reports green while the quirk exists and would flag red if the API's validation is tightened

API tests run in their own Playwright project (`api`), configured without browser emulation, since there's nothing to render. The `chromium`/`firefox`/`webkit` projects explicitly `testIgnore` the `tests/api/` folder, so API tests execute exactly once instead of being triplicated across browsers.

```bash
# Run only the API suite
npx playwright test tests/api
```

### Faster runs with storageState

`tests/auth.setup.ts` logs in once per account (`standard_user`, `problem_user`) and saves the authenticated session to `playwright/.auth/*.json`. Spec files that don't need to test the login form itself reuse that saved session via `test.use({ storageState: '...' })`, skipping the login flow on every single test. This is configured as its own Playwright project (`setup`) that the browser projects depend on, so it re-runs automatically before every test run — no manual step needed. Session files are git-ignored, since they contain live authentication cookies.

### Ongoing refactor: Page Object Model (POM)

The suite is being progressively migrated from a single monolithic spec file to a **Page Object Model** architecture, where each page of the site has its own dedicated class (locators + reusable actions), and each test file focuses on a single feature. This mirrors real-world test framework maintenance: making a suite more scalable and easier to update as the app evolves.

Migrated so far:
- `LoginPage` → `tests/login.spec.ts`
- `InventoryPage` (cart badge logic) → `tests/badge.spec.ts`
- `CheckoutPage` → `tests/checkout.spec.ts`

Not yet migrated (still in `tests/example.spec.ts`): Sorting, Hamburger menu, Item detail page.

### CI/CD

Tests run automatically via GitHub Actions on every push, on every pull request, and once a day. Failed runs trigger an email notification. See `.github/workflows/playwright.yml`.

### Running the tests

npm install
npx playwright install
npx playwright test

To view the HTML report after a run:

npx playwright show-report

### Project structure

pages/
  LoginPage.ts       # locators & actions for the login page
  InventoryPage.ts   # locators & actions for the product list / cart badge
  CheckoutPage.ts     # locators & actions for the checkout flow
tests/
  auth.setup.ts       # logs in once per account, saves session state for reuse
  login.spec.ts      # login tests (uses LoginPage)
  badge.spec.ts       # cart badge tests (uses InventoryPage, reuses standard_user session)
  checkout.spec.ts    # checkout tests (uses InventoryPage + CheckoutPage, reuses standard_user session)
  problem-user.spec.ts # problem_user bug suite (reuses problem_user session)
  example.spec.ts     # remaining test suites not yet migrated to POM; also keeps the original problem_user tests, skipped, as a historical reference
  api/
    booking.spec.ts   # CRUD suite against restful-booker (GET/POST/PUT/PATCH/DELETE)
    auth.spec.ts       # restful-booker authentication (token retrieval)
playwright/.auth/     # generated session files (git-ignored)
playwright.config.ts   # includes a dedicated "api" project (no browser), with testIgnore on chromium/firefox/webkit for tests/api/
.github/workflows/playwright.yml   # CI/CD pipeline configuration

---

## Français

Suite de tests automatisés de bout en bout pour [SauceDemo](https://www.saucedemo.com), un site e-commerce de démonstration, réalisée avec [Playwright](https://playwright.dev/). Fort de plus de 20 ans d'expérience en tant que QA Manager/Lead QA dans l'industrie du jeu vidéo, j'élargis mes compétences à l'automatisation de tests. Ce projet illustre ma capacité à concevoir, écrire et organiser des tests automatisés à partir de zéro, avec un pipeline CI/CD fonctionnel.

### Stack technique

- [Playwright](https://playwright.dev/) (TypeScript)
- Node.js
- GitHub Actions (CI/CD)

### Couverture des tests (93 tests UI sur 3 navigateurs + une suite API dédiée)

- **Login** — connexion réussie et gestion de l'erreur pour un utilisateur bloqué
- **Badge panier** — ajout d'un produit, ajout de plusieurs produits, retrait d'un produit
- **Checkout** — parcours d'achat complet, validation de chaque champ obligatoire (prénom, nom, code postal), annulation d'un checkout en cours, et vérification de cohérence numérique (sous-total + taxes = total)
- **Continue Shopping** — retour à la liste des produits depuis le panier
- **Tri des produits** — les 4 options de tri (prix croissant/décroissant, nom A-Z/Z-A), vérifiées via une boucle sur tous les articles
- **Menu hamburger** — déconnexion, réinitialisation de l'état, lien About, et navigation All Items
- **Page détail produit** — navigation vers la fiche d'un produit et retour à la liste
- **Bugs problem_user** — 9 tests documentant des anomalies connues sur le compte `problem_user` (tri cassé, comportement incohérent de l'ajout au panier selon les produits, badge panier ne reflétant pas le contenu réel du panier, IDs de champs dupliqués au checkout faisant que Prénom/Nom s'écrasent mutuellement, lien "About" cassé, fiches produit incohérentes, et plus). Chaque test utilise `test.fail()` de Playwright avec un commentaire explicatif, ce qui l'affiche en vert tant que le bug est présent et le ferait passer au rouge le jour où il est corrigé — une forme de documentation vivante plutôt qu'une simple vérification manuelle ponctuelle. Vit dans son propre fichier (`tests/problem-user.spec.ts`) ; la copie d'origine est conservée, skippée, dans `example.spec.ts` à titre de référence historique
- **Tests API** (`tests/api/`) — voir section dédiée ci-dessous

### Tests API

Une suite distincte couvre les tests au niveau API contre l'API publique [restful-booker](https://restful-booker.herokuapp.com), en utilisant l'`APIRequestContext` natif de Playwright (fixture `request`) — aucun navigateur impliqué.

| Fichier | Contenu |
|---|---|
| `booking.spec.ts` | `GET` (lecture), `POST` (création), `PUT` (modification complète), `PATCH` (modification partielle), `DELETE` — chacun avec vérification de la réponse |
| `auth.spec.ts` | `POST /auth` — récupération du token pour les requêtes authentifiées |

Points clés de conception :
- Chaque test est **autonome** : plutôt que de dépendre d'identifiants de réservation codés en dur (qui peuvent exister ou non sur une API publique partagée), les tests créent leur propre réservation à la volée et opèrent sur l'ID renvoyé par l'API. La suite reste ainsi fiable et répétable, indépendamment de ce que d'autres utilisateurs ont pu faire sur l'API.
- La préparation est centralisée dans un `test.beforeEach` : une nouvelle réservation est créée et un token d'authentification récupéré avant chaque test, `bookingId`/`token` étant partagés via des variables déclarées au niveau du fichier. Chaque test ne contient plus que la logique spécifique à ce qu'il vérifie (GET, PUT, PATCH, DELETE), au lieu de répéter à chaque fois les étapes de création et d'authentification.
- Les opérations protégées (`PUT`, `PATCH`, `DELETE`) s'authentifient en transmettant le token récupéré via `/auth` dans un header `Cookie`.
- Les corps de réponse sont vérifiés avec `toEqual()` pour une comparaison complète en profondeur (et pas seulement un champ isolé), en complément des vérifications de statut (`toBeTruthy()` / `toBeOK()`).

**Couverture des cas d'erreur :**
- Les opérations protégées (`DELETE`) rejettent correctement les requêtes sans token ou avec un token invalide (`403`)
- La récupération d'un id de réservation inexistant renvoie bien `404`
- Une particularité de l'API documentée : envoyer un `totalprice` non numérique à la création est **accepté silencieusement** (`200`), le champ étant remis à `null` côté serveur au lieu d'être rejeté avec un `400`. Ce comportement est capturé via un test `test.fail()` — une documentation vivante qui s'affiche en vert tant que la particularité existe, et passerait au rouge si la validation de l'API venait à être renforcée

Les tests API tournent dans leur propre projet Playwright (`api`), configuré sans émulation de navigateur puisqu'il n'y a rien à afficher. Les projets `chromium`/`firefox`/`webkit` excluent explicitement le dossier `tests/api/` via `testIgnore`, afin que les tests API s'exécutent une seule fois plutôt que d'être triplés sur les 3 navigateurs.

```bash
# Lancer uniquement la suite API
npx playwright test tests/api
```

### Exécution plus rapide grâce à storageState

`tests/auth.setup.ts` se connecte une fois par compte (`standard_user`, `problem_user`) et sauvegarde la session authentifiée dans `playwright/.auth/*.json`. Les fichiers de test qui n'ont pas besoin de tester le formulaire de login lui-même réutilisent cette session sauvegardée via `test.use({ storageState: '...' })`, ce qui évite de repasser par le login à chaque test. Ceci est configuré comme un projet Playwright à part entière (`setup`) dont dépendent les projets navigateurs, donc il se relance automatiquement avant chaque exécution — aucune étape manuelle nécessaire. Les fichiers de session sont exclus de Git, car ils contiennent des cookies d'authentification actifs.

### Refactorisation en cours : Page Object Model (POM)

La suite est progressivement migrée d'un unique fichier de tests monolithique vers une architecture **Page Object Model** : chaque page du site possède sa propre classe (sélecteurs + actions réutilisables), et chaque fichier de test se concentre sur une seule fonctionnalité. Cette approche reflète la maintenance réelle d'un framework de tests : elle rend la suite plus évolutive et plus facile à mettre à jour à mesure que l'application change.

Déjà migré :
- `LoginPage` → `tests/login.spec.ts`
- `InventoryPage` (logique du badge panier) → `tests/badge.spec.ts`
- `CheckoutPage` → `tests/checkout.spec.ts`

Pas encore migré (toujours dans `tests/example.spec.ts`) : Tri, Menu hamburger, Page détail produit.

### CI/CD

Les tests s'exécutent automatiquement via GitHub Actions à chaque push, à chaque pull request, et une fois par jour. Un échec déclenche une notification par email. Voir `.github/workflows/playwright.yml`.

### Lancer les tests

npm install
npx playwright install
npx playwright test

Pour consulter le rapport HTML après une exécution :

npx playwright show-report

### Structure du projet

pages/
  LoginPage.ts       # sélecteurs & actions de la page de login
  InventoryPage.ts   # sélecteurs & actions de la liste produits / badge panier
  CheckoutPage.ts     # sélecteurs & actions du parcours de checkout
tests/
  auth.setup.ts       # connexion unique par compte, sauvegarde la session pour réutilisation
  login.spec.ts      # tests de login (utilise LoginPage)
  badge.spec.ts       # tests du badge panier (utilise InventoryPage, réutilise la session standard_user)
  checkout.spec.ts    # tests de checkout (utilise InventoryPage + CheckoutPage, réutilise la session standard_user)
  problem-user.spec.ts # suite de bugs problem_user (réutilise la session problem_user)
  example.spec.ts     # groupes de tests restants pas encore migrés vers le POM ; conserve aussi les tests problem_user originaux, skippés, à titre de référence historique
  api/
    booking.spec.ts   # suite CRUD contre restful-booker (GET/POST/PUT/PATCH/DELETE)
    auth.spec.ts       # authentification restful-booker (récupération de token)
playwright/.auth/     # fichiers de session générés (exclus de Git)
playwright.config.ts   # inclut un projet "api" dédié (sans navigateur), avec testIgnore sur chromium/firefox/webkit pour tests/api/
.github/workflows/playwright.yml   # configuration du pipeline CI/CD
