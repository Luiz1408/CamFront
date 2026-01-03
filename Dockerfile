# Etapa de build con Node
FROM node:18 AS build
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar la aplicación React
RUN npm run build

# Etapa final con Nginx
FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html

# Copiar los archivos compilados al contenedor
COPY --from=build /app/build .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]