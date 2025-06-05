declare namespace Cypress {
  interface Chainable {
    loginWithMockAuth(): Chainable;
    navigateToChat(): Chainable;
    switchToOllama(): Chainable;
    realClick(options?: { position?: 'topLeft' | 'top' | 'topRight' | 'left' | 'center' | 'right' | 'bottomLeft' | 'bottom' | 'bottomRight' }): Chainable<JQuery<HTMLElement>>;
  }
}