# Edge Case Testing Documentation
## Test Summary

### 1. Mobile Responsiveness Test - iPhone 6 Viewport
Test: should display the UI correctly on iPhone 6 viewport
Rationale: Mobile devices have limited screen space, and responsive design is crucial for user experience. This test ensures the sidebar functionality works correctly on smaller screens, including proper show/hide behavior and UI element visibility.
Key Validations:

- Sidebar hidden by default on mobile
- Essential UI elements remain visible and accessible
- Sidebar toggle functionality works properly
- Smooth transition animations

### 2. API Error Handling Test
Test: displays an error banner when the API returns 500
Rationale: Network failures and server errors are common in real-world scenarios. Users need clear feedback when something goes wrong, and the UI should remain functional for retry attempts.
Key Validations:

- Error messages are displayed prominently
- Send button re-enables after error
- Application doesn't crash on server errors
- User can retry failed operations

### 3. Input Validation Test - Empty Messages
Test: prevents sending an empty message
Rationale: Prevents unnecessary API calls and maintains chat quality by ensuring users can't send empty or whitespace-only messages.
Key Validations:

- Send button is disabled when input is empty
- Visual feedback (opacity/cursor changes)
- No API calls made for empty inputs
- UI state remains consistent

### 4. Chat History Persistence Test
Test: should maintain chat history when switching between conversations
Rationale: Users expect their chat history to persist when navigating between different conversations. Data loss is a critical user experience issue.
Key Validations:

- Messages persist when switching chats
- New chats start empty
- Chat history is maintained across navigation
- Sidebar chat list updates correctly

### 5. Chat Deletion Functionality Test
Test: should delete chat from sidebar and redirect to new chat
Rationale: Users need the ability to manage their chat history, including deleting unwanted conversations. The deletion process should be intuitive and provide proper confirmation.
Key Validations:

- Confirmation dialog appears before deletion
- Chat is removed from sidebar after confirmation
- User is redirected to new empty chat
- Deletion is permanent and irreversible

### 6. Chat Deletion Cancellation Test
Test: should allow canceling chat deletion
Rationale: Accidental deletions are common, so users need the ability to cancel the deletion process before it's completed.
Key Validations:

- Cancel button works in confirmation dialog
- Chat remains in sidebar after cancellation
- Original chat content is preserved
- No unintended side effects from cancellation

### 7. Special Characters and Unicode Input Test
Test: should handle special characters and Unicode in chat input
Rationale: Modern applications must handle international characters, emojis, and special symbols. Poor handling can lead to crashes, data corruption, or security vulnerabilities.
Key Validations:

- Emojis render correctly
- Mathematical symbols and Unicode characters work
- HTML/script tags are handled safely (XSS prevention)
- Right-to-left text displays properly
- Mixed language content works correctly

### 8. Rapid Message Sending Test
Test: should handle rapid consecutive message sending
Rationale: Users might click send multiple times quickly, either accidentally or intentionally. The application should handle concurrent requests gracefully.
Key Validations:

- All messages are sent and displayed
- No race conditions in message ordering
- UI remains responsive during rapid interactions
- No duplicate messages are created

## Setup and Authentication
### Mock Authentication Strategy

The tests use a mock authentication token stored as a cookie to bypass the login flow, ensuring tests focus on core functionality rather than authentication mechanics.
Custom Commands:

- loginWithMockAuth(): Sets up authentication state
- navigateToChat(): Handles navigation to chat interface
- switchToOllama(): Configures local model for testing

