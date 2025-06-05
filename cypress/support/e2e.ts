// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-real-events/support';

Cypress.on("uncaught:exception", (err) => {
  // Suppress Next.js redirect errors
  if (err.message.includes("NEXT_REDIRECT")) {
    return false;
  }
  // Let other errors bubble up
  return true;
});

beforeEach(() => {
  //Visit the application
    cy.loginWithMockAuth();
    cy.visit('/');
    cy.navigateToChat();
    cy.switchToOllama();
});