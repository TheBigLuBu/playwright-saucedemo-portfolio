# Playwright SauceDemo Portfolio

🇬🇧 [English](#english) | 🇫🇷 [Français](#français)

---

## English

Automated end-to-end test suite for [SauceDemo](https://www.saucedemo.com), a demo e-commerce site, built with [Playwright](https://playwright.dev/). With over 20 years of experience as a QA Manager/Lead QA in the video game industry, I'm expanding my skill set to include test automation. This project demonstrates my ability to design, write, and organize automated tests from scratch, along with a working CI/CD pipeline.

### Tech stack

- [Playwright](https://playwright.dev/) (TypeScript)
- Node.js
- GitHub Actions (CI/CD)

### Test coverage (93 tests across 3 browsers)

- **Login** — successful login and locked-out user error handling
- **Cart badge** — adding a single product, adding multiple products, removing a product
- **Checkout** — full purchase flow, validation of each required field (first name, last name, postal code), cancelling an in-progress checkout, and a numeric consistency check (item total + tax = total)
- **Continue Shopping** — returning to the product list from the cart
- **Sorting** — all 4 sort options (price low-to-high, high-to-low, name A-Z, Z-A), verified with a loop over every item
- **Hamburger menu** — logout, reset app state, About link, and All Items navigation
- **Item detail page** — navigating to a product's detail page and back to the product list
- **Problem_user bugs** — 9 tests documenting known defects on the `problem_user` account (broken sort, inconsistent add-to-cart behaviour across products, cart badge not reflecting actual cart contents, duplicated field IDs on checkout causing First/Last Name to overwrite each other, broken "About" link, mismatched product detail pages, and more). Each test uses Playwright's `test.fail()` with an explanatory comment, so it reports green while the bug is present and would flag red the day it gets fixed — acting as living regression documentation rather than a one-off manual check

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
  login.spec.ts      # login tests (uses LoginPage)
  badge.spec.ts       # cart badge tests (uses LoginPage + InventoryPage)
  checkout.spec.ts    # checkout tests (uses LoginPage + InventoryPage + CheckoutPage)
  example.spec.ts     # remaining test suites, not yet migrated to POM
playwright.config.ts
.github/workflows/playwright.yml   # CI/CD pipeline configuration

---

## Français

Suite de tests automatisés de bout en bout pour [SauceDemo](https://www.saucedemo.com), un site e-commerce de démonstration, réalisée avec [Playwright](https://playwright.dev/). Fort de plus de 20 ans d'expérience en tant que QA Manager/Lead QA dans l'industrie du jeu vidéo, j'élargis mes compétences à l'automatisation de tests. Ce projet illustre ma capacité à concevoir, écrire et organiser des tests automatisés à partir de zéro, avec un pipeline CI/CD fonctionnel.

### Stack technique

- [Playwright](https://playwright.dev/) (TypeScript)
- Node.js
- GitHub Actions (CI/CD)

### Couverture des tests (93 tests sur 3 navigateurs)

- **Login** — connexion réussie et gestion de l'erreur pour un utilisateur bloqué
- **Badge panier** — ajout d'un produit, ajout de plusieurs produits, retrait d'un produit
- **Checkout** — parcours d'achat complet, validation de chaque champ obligatoire (prénom, nom, code postal), annulation d'un checkout en cours, et vérification de cohérence numérique (sous-total + taxes = total)
- **Continue Shopping** — retour à la liste des produits depuis le panier
- **Tri des produits** — les 4 options de tri (prix croissant/décroissant, nom A-Z/Z-A), vérifiées via une boucle sur tous les articles
- **Menu hamburger** — déconnexion, réinitialisation de l'état, lien About, et navigation All Items
- **Page détail produit** — navigation vers la fiche d'un produit et retour à la liste
- **Bugs problem_user** — 9 tests documentant des anomalies connues sur le compte `problem_user` (tri cassé, comportement incohérent de l'ajout au panier selon les produits, badge panier ne reflétant pas le contenu réel du panier, IDs de champs dupliqués au checkout faisant que Prénom/Nom s'écrasent mutuellement, lien "About" cassé, fiches produit incohérentes, et plus). Chaque test utilise `test.fail()` de Playwright avec un commentaire explicatif, ce qui l'affiche en vert tant que le bug est présent et le ferait passer au rouge le jour où il est corrigé — une forme de documentation vivante plutôt qu'une simple vérification manuelle ponctuelle

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
  login.spec.ts      # tests de login (utilise LoginPage)
  badge.spec.ts       # tests du badge panier (utilise LoginPage + InventoryPage)
  checkout.spec.ts    # tests de checkout (utilise LoginPage + InventoryPage + CheckoutPage)
  example.spec.ts     # groupes de tests restants, pas encore migrés vers le POM
playwright.config.ts
.github/workflows/playwright.yml   # configuration du pipeline CI/CD
