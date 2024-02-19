declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'preproduction';
      DISCORD_API_URL: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
      DISCORD_REDIRECT_URI: string;
      HOST: string;
      VAULT_ADDRESS: string;
      VAULT_TOKEN: string;
      VAULT_PATH_JWT_SECRET: string;
      VAULT_PATH_SESSION_SECRET: string;
      SERVER_PORT: string;
    }
  }
  namespace Express {
    interface User {
      profile: {
        id: string;
        // Autres propriétés du profil
      };
      token?: string;
    }
  }
    
}
export {}