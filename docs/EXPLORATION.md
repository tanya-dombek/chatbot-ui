# Chatbot UI - Application Exploration

## Main User Flows Identified

### 1. Chat Conversation Flow
- User enters message in input field
- Sends message via Enter key or Send button
- AI responds with generated content
- Conversation history is maintained

### 2. Settings & Configuration Flow
- Access settings panel
- Configure API keys (OpenAI, Anthropic, etc.)
- Adjust model parameters (temperature, max tokens)
- Save configuration changes

### 3. Conversation Management Flow
- Create new conversations
- Delete existing conversations
- Rename conversations
- Switch between multiple conversations

### 4. Import/Export Flow
- Export conversation data
- Import previous conversations
- Clear all data

## Key UI Components for Testing

### 1. Message Input Component
- **Location**: Main chat interface
- **Functionality**: Text input with send button
- **Interactions**: 
  - Text entry
  - Enter key submission
  - Send button click
  - Handles empty messages
  - Character limits

### 2. Settings Panel Component
- **Location**: Accessible via settings icon/menu
- **Functionality**: Configuration management
- **Interactions**:
  - API key input fields
  - Model selection dropdowns
  - Parameter sliders/inputs
  - Save/reset buttons

### 3. Conversation Sidebar Component
- **Location**: Left sidebar (desktop) or collapsible menu (mobile)
- **Functionality**: Conversation list management
- **Interactions**:
  - New conversation creation
  - Conversation selection
  - Delete/rename operations
  - Search/filter conversations

### 4. Message Display Component
- **Location**: Main chat area
- **Functionality**: Renders conversation messages
- **Interactions**:
  - Message rendering (user vs AI)
  - Copy message content
  - Message formatting (markdown, code blocks)
  - Scroll behavior