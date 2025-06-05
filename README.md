## Local Quickstart

Follow these steps to get your own Chatbot UI instance running locally.

You can watch the full video tutorial [here](https://www.youtube.com/watch?v=9Qq3-7-HNgw).

My screen recording showing my tests running  [here](https://www.loom.com/share/d577b75e2a0d408d82ce2ece41460264?sid=87e67569-fd70-4960-bd6a-673a67c28880).

All the documents are in the root/docs folder

### 1. Clone and Fork Repository

Clone the original repository

```bash
git clone https://github.com/mckaywrigley/chatbot-ui.git
cd chatbot-ui
```
Fork on GitHub
Then add my fork as origin

```bash
git remote add origin https://github.com/tanya-dombek/chatbot-ui.git
git remote add upstream https://github.com/mckaywrigley/chatbot-ui.git
```
or clone my repository

```bash
git clone https://github.com/tanya-dombek/chatbot-ui.git
```

### 2. Install Dependencies

Open a terminal in the root directory of your local Chatbot UI repository and run:

```bash
npm install
npm install --save-dev cypress @cypress/real-events
```

### 3. Install Supabase & Run Locally

#### 1. Install Docker

You will need to install Docker to run Supabase locally. You can download it [here](https://docs.docker.com/get-docker) for free.

#### 2. Install Supabase CLI

**MacOS/Linux**

```bash
brew install supabase/tap/supabase
```

**Windows**

```bash
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

#### 3. Start Supabase

In your terminal at the root of your local Chatbot UI repository, run:

```bash
supabase start
```

### 4. Fill in Secrets

#### 1. Environment Variables

In your terminal at the root of your local Chatbot UI repository, run:

```bash
cp .env.local.example .env.local
```

Get the required values by running:

```bash
supabase status
```

Note: Use `API URL` from `supabase status` for `NEXT_PUBLIC_SUPABASE_URL`

Now go to your `.env.local` file and fill in the values.

If the environment variable is set, it will disable the input in the user settings.

#### 2. SQL Setup

In the 1st migration file `supabase/migrations/20240108234540_setup.sql` you will need to replace 2 values with the values you got above:

- `project_url` (line 53): `http://supabase_kong_chatbotui:8000` (default) can remain unchanged if you don't change your `project_id` in the `config.toml` file
- `service_role_key` (line 54): You got this value from running `supabase status`

This prevents issues with storage files not being deleted properly.

### 5. Install Ollama (optional for local models)

Follow the instructions [here](https://github.com/jmorganca/ollama#macos).

### 6. Run app locally

In your terminal at the root of your local Chatbot UI repository, run:

```bash
npm run chat
```

Your local instance of Chatbot UI should now be running at [http://localhost:3000](http://localhost:3000). Be sure to use a compatible node version (i.e. v18).

## Test Setup
1. Cypress Configuration
Create cypress.config.js in the project root:
javascriptconst { defineConfig } = require('cypress')

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});

2. In `commands.ts`, replace `REPLACE_WITH_YOUR_ACTUAL_COOKIE` with your actual cookie value

3. Run Cypress

```bash
npx cypress open
```
Select E2E Testing
Choose browser (Chrome recommended)
Click on edge-case-testing.cy.ts to run tests