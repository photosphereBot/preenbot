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
  const requiredVariables = ["DISCORD_PUBLIC_KEY", "DISCORD_CLIENT_SECRET", "DISCORD_APP_ID"];

  requiredVariables.forEach(variable => {
    if (!process.env[variable]) {
      throw new Error(`Environment variable ${variable} is not set. Please check your .env.${NODE_ENV} file.`);
    }
  });
}

configureEnvironment();
validateEnvVariables();



export const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
export const DISCORD_APP_ID = process.env.DISCORD_APP_ID;

