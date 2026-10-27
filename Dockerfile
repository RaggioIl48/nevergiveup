FROM node:24-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev
ENV NODE_ENV=production PORT=3000 DB_FILE=/data/upword.db
VOLUME /data
EXPOSE 3000
CMD ["node", "server/index.js"]
