FROM node:22-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund \
  && npx playwright install --with-deps chromium \
  && rm -rf /var/lib/apt/lists/*

COPY src ./src

ENV NODE_ENV=production \
    DATA_DIR=/data \
    PORT=8791

EXPOSE 8791
CMD ["node", "src/server.js"]
