# Getting Started

To get your development environment up and running, follow these steps:

## Running the Development Server

1. **Install Dependencies**

   First, make sure you have installed all the necessary dependencies. Run:

   ```bash
   npm install
   ```

2. **Running the Mock API Server**

   ```bash
   npx json-server ./src/data/data.json
   ```

- By default, the mock API server runs on port 3000. And currently `VITE_APP_BACKEND_URL` .env variable is set to endpoint `http://localhost:3000/`. If you need it to run on some other port, you can specify the port using the --port option:

  ```bash
  npx json-server ./src/data/data.json --port 3001
  ```

- Also, dont forget to modify the VITE_APP_BACKEND_URL variable present in .env file
  to match the URL of your mock API server. For example, if your mock
  API server is running on port 3001, set it as follows: `VITE_APP_BACKEND_URL=http://localhost:3001/`

3. **Start the Development Server**

   ```bash
   npm run dev
   ```
