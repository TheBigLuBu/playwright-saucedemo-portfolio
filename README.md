# Playwright SauceDemo Portfolio

🇬🇧 English | 🇫🇷 Français


English

Automated end-to-end test suite for SauceDemo, a demo e-commerce site, built with Playwright. With over 20 years of experience as a QA Manager/Lead QA in the video game industry, I'm expanding my skill set to include test automation. This project demonstrates my ability to design, write, and organize automated tests from scratch.

Tech stack


Playwright (TypeScript)
Node.js


Test coverage (51 tests across 3 browsers)


Login — successful login and locked-out user error handling
Cart badge — adding a single product, adding multiple products, removing a product
Checkout — full purchase flow, empty-form validation, and cancelling an in-progress checkout
Continue Shopping — returning to the product list from the cart
Sorting — all 4 sort options (price low-to-high, high-to-low, name A-Z, Z-A), verified with a loop over every item
Hamburger menu — logout, and resetting the app state
Item detail page — navigating to a product's detail page and back to the product list


Running the tests

npm install
npx playwright install
npx playwright test

To view the HTML report after a run:

npx playwright show-report

Project structure

tests/
example.spec.ts   # all test suites, organized with test.describe()
playwright.config.ts


Français

Suite de tests automatisés de bout en bout pour SauceDemo, un site e-commerce de démonstration, réalisée avec Playwright. Fort de plus de 20 ans d'expérience en tant que QA Manager/Lead QA dans l'industrie du jeu vidéo, j'élargis mes compétences à l'automatisation de tests. Ce projet illustre ma capacité à concevoir, écrire et organiser des tests automatisés à partir de zéro.

Stack technique


Playwright (TypeScript)
Node.js


Couverture des tests (51 tests sur 3 navigateurs)


Login — connexion réussie et gestion de l'erreur pour un utilisateur bloqué
Badge panier — ajout d'un produit, ajout de plusieurs produits, retrait d'un produit
Checkout — parcours d'achat complet, validation d'un formulaire vide, et annulation d'un checkout en cours
Continue Shopping — retour à la liste des produits depuis le panier
Tri des produits — les 4 options de tri (prix croissant/décroissant, nom A-Z/Z-A), vérifiées via une boucle sur tous les articles
Menu hamburger — déconnexion, et réinitialisation de l'état de l'application
Page détail produit — navigation vers la fiche d'un produit et retour à la liste


Lancer les tests

npm install
npx playwright install
npx playwright test

Pour consulter le rapport HTML après une exécution :

npx playwright show-report

Structure du projet

tests/
example.spec.ts   # tous les groupes de tests, organisés avec test.describe()
playwright.config.ts
