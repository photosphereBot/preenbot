declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'preproduction';
      DISCORD_APP_ID: string;
      DISCORD_CLIENT_SECRET: string;
      DISCORD_PUBLIC_KEY: string;
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