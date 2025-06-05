/// <reference types="cypress" />
/// <reference path="./commands.d.ts" />

Cypress.Commands.add('navigateToChat', () => {
    cy.get('[data-testid="start-chat-btn"]').click();
    cy.get("svg.animate-spin").should("be.visible");
    cy.url().should("include", "/chat");
    cy.get("svg.animate-spin").should("not.exist");
    cy.contains("GPT-4 Turbo").should("be.visible");
    cy.get('[data-testid="chat-input"]').should("be.visible");
});

Cypress.Commands.add("loginWithMockAuth", () => {
  const token = "REPLACE_WITH_YOUR_ACTUAL_COOKIE";
  cy.setCookie("sb-127-auth-token", token, { 
    domain: "localhost",
    path: "/",                 
  });
});

Cypress.Commands.add('switchToOllama', () => {
    cy.get('[data-testid="chat-settings"]').should('exist').realClick();
    cy.get('[data-testid="model-options"]').should('be.visible').realClick();
    cy.get('[data-testid="tab-local"]').should('be.visible').realClick();
    cy.contains('llama3.2:latest')
      .should('be.visible')
      .as('llamaItem');
    cy.get('@llamaItem').realClick();
    cy.get('[data-testid="tab-local"]').should('not.exist');
    cy.get('[data-testid="model-options"]').should('not.exist');
    cy.get('[data-testid="chat-settings"]').should('be.visible').within(() => {
        cy.contains("llama3.2:latest").should("be.visible");
    });
});