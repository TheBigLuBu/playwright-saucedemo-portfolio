# Playwright SauceDemo Portfolio

🇬🇧 [English](#english) | 🇫🇷 [Français](#français)

---

## English

Automated end-to-end test suite for [SauceDemo](https://www.saucedemo.com), a demo e-commerce site, built with [Playwright](https://playwright.dev/). With over 20 years of experience as a QA Manager/Lead QA in the video game industry, I'm expanding my skill set to include test automation. This project demonstrates my ability to design, write, and organize automated tests from scratch, along with a working CI/CD pipeline.

### Tech stack

- [Playwright](https://playwright.dev/) (TypeScript)
- Node.js
- GitHub Actions (CI/CD)

### Test coverage (66 tests across 3 browsers)

- **Login** — successful login and locked-out user error handling
- **Cart badge** — adding a single product, adding multiple products, removing a product
- **Checkout** — full purchase flow, validation of each required field (first name, last name, postal code), cancelling an in-progress checkout, and a numeric consistency check (item total + tax = total)
- **Continue Shopping** — returning to the product list from the cart
- **Sorting** — all 4 sort options (price low-to-high, high-to-low, name A-Z, Z-A), verified with a loop over every item
- **Hamburger menu** — logout, reset app state, About link, and All Items navigation
- **Item detail page** — navigating to a product's detail page and back to the product list

### CI/CD

Tests run automatically via GitHub Actions on every push, on every pull request, and once a day. Failed runs trigger an email notification. See `.github/workflows/playwright.yml`.

### Running the tests

npm install
npx playwright install
npx playwright test

To view the HTML report after a run:

npx playwright show-report

### Project structure

tests/
  example.spec.ts   # all test suites, organized with test.describe()
playwright.config.ts
.github/workflows/playwright.yml   # CI/CD pipeline configuration

---

## Français

Suite de tests automatisés de bout en bout pour [SauceDemo](https://www.saucedemo.com), un site e-commerce de démonstration, réalisée avec [Playwright](https://playwright.dev/). Fort de plus de 20 ans d'expérience en tant que QA Manager/Lead QA dans l'industrie du jeu vidéo, j'élargis mes compétences à l'automatisation de tests. Ce projet illustre ma capacité à concevoir, écrire et organiser des tests automatisés à partir de zéro, avec un pipeline CI/CD fonctionnel.

### Stack technique

- [Playwright](https://playwright.dev/) (TypeScript)
- Node.js
- GitHub Actions (CI/CD)

### Couverture des tests (66 tests sur 3 navigateurs)

- **Login** — connexion réussie et gestion de l'erreur pour un utilisateur bloqué
- **Badge panier** — ajout d'un produit, ajout de plusieurs produits, retrait d'un produit
- **Checkout** — parcours d'achat complet, validation de chaque champ obligatoire (prénom, nom, code postal), annulation d'un checkout en cours, et vérification de cohérence numérique (sous-total + taxes = total)
- **Continue Shopping** — retour à la liste des produits depuis le panier
- **Tri des produits** — les 4 options de tri (prix croissant/décroissant, nom A-Z/Z-A), vérifiées via une boucle sur tous les articles
- **Menu hamburger** — déconnexion, réinitialisation de l'état, lien About, et navigation All Items
- **Page détail produit** — navigation vers la fiche d'un produit et retour à la liste

### CI/CD

Les tests s'exécutent automatiquement via GitHub Actions à chaque push, à chaque pull request, et une fois par jour. Un échec déclenche une notification par email. Voir `.github/workflows/playwright.yml`.

### Lancer les tests

npm install
npx playwright install
npx playwright test

Pour consulter le rapport HTML après une exécution :

npx playwright show-report

### Structure du projet

tests/
  example.spec.ts   # tous les groupes de tests, organisés avec test.describe()
playwright.config.ts
.github/workflows/playwright.yml   # configuration du pipeline CI/CD
