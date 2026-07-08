# Playwright SauceDemo Portfolio

🇬🇧 [English](#english) | 🇫🇷 [Français](#français)

---

## English

Automated end-to-end test suite for [SauceDemo](https://www.saucedemo.com), a demo e-commerce site, built with [Playwright](https://playwright.dev/). With over 20 years of experience as a QA Manager/Lead QA in the video game industry, I'm expanding my skill set to include test automation. This project demonstrates my ability to design, write, and organize automated tests from scratch.

### Tech stack

- [Playwright](https://playwright.dev/) (TypeScript)
- Node.js

### Test coverage

- **Login** — successful login and locked-out user error handling
- **Cart** — adding a single product, adding multiple products, removing a product
- **Checkout** — full purchase flow from cart to order confirmation
- **Continue Shopping** — returning to the product list from the cart

### Running the tests

npm install
npx playwright install
npx playwright test

To view the HTML report after a run:

npx playwright show-report

### Project structure

tests/
  example.spec.ts   # all test suites (Login, Cart, Checkout, Continue Shopping)
playwright.config.ts

---

## Français

Suite de tests automatisés de bout en bout pour [SauceDemo](https://www.saucedemo.com), un site e-commerce de démonstration, réalisée avec [Playwright](https://playwright.dev/). Fort de plus de 20 ans d'expérience en tant que QA Manager/Lead QA dans l'industrie du jeu vidéo, j'élargis mes compétences à l'automatisation de tests. Ce projet illustre ma capacité à concevoir, écrire et organiser des tests automatisés à partir de zéro.

### Stack technique

- [Playwright](https://playwright.dev/) (TypeScript)
- Node.js

### Couverture des tests

- **Login** — connexion réussie et gestion de l'erreur pour un utilisateur bloqué
- **Panier** — ajout d'un produit, ajout de plusieurs produits, retrait d'un produit
- **Checkout** — parcours d'achat complet, du panier jusqu'à la confirmation de commande
- **Continue Shopping** — retour à la liste des produits depuis le panier

### Lancer les tests

npm install
npx playwright install
npx playwright test

Pour consulter le rapport HTML après une exécution :

npx playwright show-report

### Structure du projet

tests/
  example.spec.ts   # tous les groupes de tests (Login, Panier, Checkout, Continue Shopping)
playwright.config.ts