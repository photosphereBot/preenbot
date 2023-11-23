# Utiliser une image de base Node.js officielle
FROM node:21

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source de l'application dans le conteneur
COPY . .

# Commande pour démarrer l'application
CMD ["node", "src/index.js"]
