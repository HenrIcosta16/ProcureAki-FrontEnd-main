# Etapa 1: Construção da aplicação
FROM node:18-alpine AS builder

# Instalar dependências do sistema para o 'crypto'
RUN apk update && apk add --no-cache openssl-dev build-base

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de dependências para dentro do container
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install --legacy-peer-deps

# Copiar o restante dos arquivos da aplicação
COPY . .

# Rodar o build da aplicação
RUN npm run build

# Etapa 2: Servir os arquivos com Nginx
FROM nginx:alpine

# Remover conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar os arquivos gerados para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
