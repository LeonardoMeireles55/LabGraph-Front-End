# syntax=docker.io/docker/dockerfile:1

FROM node:21-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
RUN apk add --update npm

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit-dev

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./_next
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# USER nextjs
