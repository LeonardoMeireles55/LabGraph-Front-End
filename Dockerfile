# Imagem base para dependências
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instala dependências
COPY package.json package-lock.json* ./
RUN npm ci

# Etapa de build
FROM node:20-alpine AS builder
WORKDIR /app

# Copia dependências e código
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Configura next.config.js para output standalone
RUN npm run build

# Imagem de produção
FROM node:20-alpine AS runner
WORKDIR /app

# Configurações de segurança e ambiente
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Muda para usuário não-root
USER nextjs

# Configurações de porta
EXPOSE 3000
ENV PORT 3000

# Comando de start
CMD ["node", "server.js"]