describe('Edge Case Testing', () => {

  it("should display the UI correctly on iPhone 6 viewport", () => {

    cy.viewport('iphone-6');

    // Sidebar should be hidden by default:
    cy.get('[data-testid="sidebar"]').should("not.exist");

    // Assert that key UI elements are visible and correctly displayed:
    cy.get('[data-testid="chat-input"]').should('be.visible');
    cy.get('[data-testid="quick-settings"]').should('be.visible');
    cy.get('[data-testid="chat-settings"]').should('be.visible');
    
    // Sidebar button should be visible:
    cy.get("[data-testid='sidebar-btn']").should("be.visible").click();

    // After clicking on the button, the sidebar should slide in:
    cy.get("[data-testid='sidebar']", { timeout: 5000 }).should("be.visible").within(() => {
        cy.contains("New Chat").should("be.visible");
    });

    // Click on the sidebar button to hide it again:
    cy.get("[data-testid='sidebar-btn']").click();

    // Sidebar should be hidden again:
    cy.get("[data-testid='sidebar']").should("not.exist");
  });

  it("displays an error banner when the API returns 500", () => {

    // Intercept /api/chat and force a 500 response:
    cy.intercept("POST", "/api/chat", {
      statusCode: 500,
      body: { message: "Internal Server Error" },
    }).as("chatError");

    // Type a question and click Send:
    cy.get('[data-testid="chat-input"]').type("Error test");
    cy.get('[data-testid="send-btn"]').click();

    // Wait for the stubbed “500” to come back:
    cy.wait("@chatError");

    // The app should show a visible error banner:
    cy.contains("Internal Server Error").should("be.visible");

    // The send button should re‐enable (so user can retry):
    cy.get('[data-testid="send-btn"]').should('not.have.class', 'cursor-not-allowed').and('not.have.class', 'opacity-50');
  });

  it("prevents sending an empty message", () => {

    // Ensure the chat input is empty:
    cy.get('[data-testid="chat-input"]').clear().should("have.value", "");

    // Send button should be disabled when input is empty:
    cy.get('[data-testid="send-btn"]').should('have.class', 'cursor-not-allowed').and('have.class', 'opacity-50')

    // If we try to .click() it anyway, nothing new should appear in the chat log:
    cy.get('[data-testid="send-btn"]').click({ force: true });

    // Confirm that no new message was created:
    cy.get('[data-testid="chat-messages"]').should('not.exist')
  });

  it('should maintain chat history when switching between conversations', () => {

      const testMessage = 'Test message for conversation persistence'
      
      // Send a message in current chat:
      cy.get('[data-testid="chat-input"]').type(testMessage)
      cy.get('[data-testid="send-btn"]').click()
      cy.get('[data-testid="chat-messages"]').should('contain', testMessage)

      // Open the sidebar and click on "New Chat" button to create new chat:
      cy.get("[data-testid='sidebar-btn']").should("be.visible").click();
      cy.get("[data-testid='sidebar']").should("be.visible").within(() => {
          cy.contains("New Chat").should("be.visible").click();
      });
      
      // Verify new chat is empty:
      cy.get('[data-testid="chat-messages"]').should('not.exist')
      
      // Go back to previous chat (if chat history exists)
      cy.get('[data-testid="sidebar"]').then(($sidebar) => {
        if ($sidebar.find('[data-testid="chat-item"]').length > 0) {
          cy.get('[data-testid="chat-item"]').first().click()
          
          // Verify original message is still there
          cy.get('[data-testid="chat-messages"]').should('contain', testMessage)
        }
      })
  })

  it('should delete chat from sidebar and redirect to new chat', () => {

    const testMessage = 'Test message for chat to be deleted'
  
    // Send a message in current chat to ensure it has content:
    cy.get('[data-testid="chat-input"]').type(testMessage)
    cy.get('[data-testid="send-btn"]').click()
    cy.get('[data-testid="chat-messages"]').should('contain', testMessage)
    
    // Open the sidebar:
    cy.get("[data-testid='sidebar-btn']").should("be.visible").click()
    cy.get("[data-testid='sidebar']").should("be.visible")
    
    // Verify the chat exists in sidebar before deletion:
    cy.get('[data-testid="chat-item"]').should('have.length.at.least', 1)
    
    // Get the initial count of chat items:
    cy.get('[data-testid="chat-item"]').then(($items) => {
      const initialCount = $items.length
      
      // Click on the delete button for the first chat item:
      cy.get('[data-testid="chat-item"]').first().within(() => {
        // Hover over the chat item to make delete button visible:
        cy.root().trigger('mouseover')
        
        // Click the delete button:
        cy.get('svg').last().click()
      })
      
      // Verify delete confirmation dialog appears:
      cy.get('[role="dialog"]').should('be.visible')
      cy.contains('Delete').should('be.visible')
      cy.contains('Are you sure you want to delete this chat?').should('be.visible')
      
      // Click the delete button in the dialog:
      cy.get('button').contains('Delete').click()
      
      // Verify dialog closes:
      cy.get('[role="dialog"]').should('not.exist')
      
      // Verify chat is removed from sidebar:
      if (initialCount > 1) {
        cy.get('[data-testid="chat-item"]').should('have.length', initialCount - 1)
      } else {
        // If it was the only chat, sidebar might be empty or show no chat items:
        cy.get('[data-testid="chat-item"]').should('have.length', 0)
      }
      
      // Verify we're redirected to a new empty chat:
      cy.get('[data-testid="chat-messages"]').should('not.exist')
    })
  })

  it('should allow canceling chat deletion', () => {

    const testMessage = 'Test message that should not be deleted'
    
    // Send a message in current chat:
    cy.get('[data-testid="chat-input"]').type(testMessage)
    cy.get('[data-testid="send-btn"]').click()
    cy.get('[data-testid="chat-messages"]').should('contain', testMessage)
    
    // Open the sidebar:
    cy.get("[data-testid='sidebar-btn']").should("be.visible").click()
    cy.get("[data-testid='sidebar']").should("be.visible")
    
    // Get the initial count of chat items:
    cy.get('[data-testid="chat-item"]').then(($items) => {
      const initialCount = $items.length
      
      // Click on the delete button for the first chat item:
      cy.get('[data-testid="chat-item"]').first().within(() => {
        cy.root().trigger('mouseover')
        cy.get('svg').last().click()
      })
      
      // Verify delete confirmation dialog appears:
      cy.get('[role="dialog"]').should('be.visible')
      
      // Click Cancel instead of Delete:
      cy.get('button').contains('Cancel').click()
      
      // Verify dialog closes:
      cy.get('[role="dialog"]').should('not.exist')
      
      // Verify chat is NOT removed from sidebar:
      cy.get('[data-testid="chat-item"]').should('have.length', initialCount)
      
      // Verify we can still access the original chat and its content:
      cy.get('[data-testid="chat-item"]').first().click()
      cy.get('[data-testid="chat-messages"]').should('contain', testMessage)
    })
  })

  it('should handle special characters and Unicode in chat input', () => {

    const specialMessages = [
      '🚀 Testing emojis! 🎉✨',
      '数学公式: ∑(x²) = π × ∫f(x)dx',
      'Code: <script>alert("xss")</script>',
      'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
      'RTL text: مرحبا بالعالم',
      'Mixed: Hello 世界 🌍 ¡Hola!'
    ];
    
    cy.get('[data-testid="chat-input"]').as('messageInput');
    
    specialMessages.forEach((message, index) => {
      cy.get('@messageInput')
        .clear()
        .type(message, { parseSpecialCharSequences: false })
        .should('contain.value', message)
              
      // Try sending the message:
      cy.get('[data-testid="send-btn"]').click()
      
      // Verify the app doesn't crash:
      cy.get('@messageInput').should('exist');
      cy.get('[data-testid="chat-messages"]').should('contain', message)
    })
  })

  it('should handle rapid consecutive message sending', () => {
    const messages = ['Quick 1', 'Quick 2', 'Quick 3'];
  
    messages.forEach(msg => {
      cy.get('[data-testid="chat-input"]').type(msg);
      cy.get('[data-testid="send-btn"]').click();
    });

    messages.forEach(msg => {
      cy.get('[data-testid="chat-messages"]').should('contain', msg);
    });
  });
});