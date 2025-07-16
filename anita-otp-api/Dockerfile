# Usa una imagen oficial de Node.js
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la app
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "dist/main.js"] 