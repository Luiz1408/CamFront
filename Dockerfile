# =========================
# Etapa 1: Build React
# =========================
FROM node:18 AS build
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Compilar React
RUN npm run build

# =========================
# Etapa 2: Nginx
# =========================
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Limpiar html por defecto
RUN rm -rf ./*

# Copiar build de React
COPY --from=build /app/build .

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["ng]()
