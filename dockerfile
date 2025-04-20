# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código de la API
COPY . .

# Expone el puerto en el que corre la API (ajústalo según tu configuración)
EXPOSE 3000

# Comando para ejecutar la API
CMD ["node", "server.js"]
