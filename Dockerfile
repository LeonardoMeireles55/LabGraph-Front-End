# Etapa 1: Build
FROM node:18 AS builder

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando o package.json e o package-lock.json
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando os arquivos do projeto
COPY . .

# Executando o build da aplicação Next.js
RUN npm run build

# Etapa 2: Produção
FROM node:18

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando as dependências e o build da etapa de build
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/package*.json /app/

# Instalando as dependências na produção
RUN npm install --production

# Expondo a porta que o Next.js vai rodar
EXPOSE 3000

# Definindo o comando para iniciar o Next.js em produção
CMD ["npm", "start"]
