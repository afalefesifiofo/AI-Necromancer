# AI Necromancer - Kiro Integration Requirements

## Introduction

This spec defines how to integrate the AI Necromancer web app with Kiro's AI capabilities. Since the app runs in a browser and doesn't have direct access to `window.kiro`, we need an alternative integration approach.

## Glossary

- **AI Necromancer**: The browser-based React application for modernizing legacy code
- **Kiro Agent**: An AI agent that can be invoked from within Kiro IDE
- **Backend Service**: A local server that bridges the React app with Kiro's AI
- **Agent Hook**: A Kiro feature that triggers agent execution on events

## Requirements

### Requirement 1: Backend Bridge Service

**User Story:** As a developer, I want the React app to communicate with Kiro's AI through a local backend service, so that I can use real AI without browser limitations.

#### Acceptance Criteria

1. THE Backend Service SHALL expose a REST API endpoint at `http://localhost:3001/api/modernize`
2. WHEN the React app sends a POST request with code and parameters, THE Backend Service SHALL forward the request to Kiro's agent system
3. THE Backend Service SHALL return the AI-generated response to the React app
4. THE Backend Service SHALL handle errors gracefully and return appropriate error messages

### Requirement 2: Kiro Agent Implementation

**User Story:** As a developer, I want a Kiro agent that can analyze and modernize code, so that the AI Necromancer can use real AI capabilities.

#### Acceptance Criteria

1. THE Kiro Agent SHALL accept code, language, and target language as input parameters
2. THE Kiro Agent SHALL use Kiro's chat API to analyze the code
3. THE Kiro Agent SHALL use Kiro's chat API to modernize or translate the code
4. THE Kiro Agent SHALL return structured JSON responses
5. THE Kiro Agent SHALL respect the selected vibe (necromancer/mentor/engineer) using steering documents

### Requirement 3: React App Integration

**User Story:** As a user, I want the React app to seamlessly use Kiro's AI, so that I get intelligent code transformations.

#### Acceptance Criteria

1. WHEN the backend service is running, THE React App SHALL detect it automatically
2. WHEN the backend service is not available, THE React App SHALL show a clear error message with setup instructions
3. THE React App SHALL send requests to the backend service instead of trying to access `window.kiro`
4. THE React App SHALL display loading states while waiting for AI responses

### Requirement 4: Development Experience

**User Story:** As a developer, I want easy setup instructions, so that I can quickly start using the AI Necromancer with real AI.

#### Acceptance Criteria

1. THE Project SHALL include a README section explaining how to start the backend service
2. THE Project SHALL include a simple command to start both frontend and backend
3. THE Backend Service SHALL start automatically when running `npm run dev:full`
4. THE Project SHALL include example requests for testing the integration
