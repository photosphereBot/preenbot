const dotenv = require('dotenv');

export const NODE_ENV = process.env.NODE_ENV;

function configureEnvironment() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  if (process.env.NODE_ENV === 'development') {
    const result = dotenv.config({ path: `config/env/.env.development` });
    if (result.error) {
      throw new Error(`Failed to load .env file: ${result.error}`);
    }
  }
}

function validateEnvVariables() {
  const requiredVariables = [];

  requiredVariables.forEach(variable => {
    if (!process.env[variable]) {
      throw new Error(`Environment variable ${variable} is not set. Please check your .env.${NODE_ENV} file.`);
    }
  });
}

configureEnvironment();
validateEnvVariables();



export const DISCORD_API_URL = process.env.DISCORD_API_URL;
export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
export const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;
export const HOST = process.env.HOST;

export const VAULT_ADDR = process.env.VAULT_ADDR;
export const VAULT_TOKEN = process.env.VAULT_TOKEN;
export const VAULT_PATH_SESSION_SECRET = process.env.VAULT_PATH_SESSION_SECRET;
export const VAULT_PATH_JWT_SECRET = process.env.VAULT_PATH_JWT_SECRET;

export const SERVER_PORT = process.env.SERVER_PORT;

export const GRAPHQL_URL = process.env.GRAPHQL_URL;

