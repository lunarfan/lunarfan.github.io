FROM node:22.23.4-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:22.23.4-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:1.31.8-alpine AS runner
# The base image lags Alpine's own security fixes (Tsuki-278: brotli-libs CVE-2026-111497
# was fixed in Alpine before nginx's image was rebuilt) — take them at build time.
RUN apk upgrade --no-cache
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
