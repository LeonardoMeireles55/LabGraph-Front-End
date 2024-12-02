# Etapa 1: Build
FROM node:20 AS builder

WORKDIR /app

# Copie apenas os arquivos necessários para instalar dependências
COPY package*.json ./

# Instale dependências apenas uma vez e use cache do Docker
RUN npm ci

# Copie os arquivos do projeto
COPY . .

# Execute o build da aplicação
RUN npm run build

# Etapa 2: Produção
FROM node:20-slim AS runner

WORKDIR /app

# Copie apenas os arquivos necessários da etapa de build
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/package*.json /app/

# Instale apenas dependências de produção
RUN npm ci --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
