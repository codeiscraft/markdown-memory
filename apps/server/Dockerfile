FROM node:20-alpine

WORKDIR /app
COPY package.json ../../package-lock.json ./
RUN npm ci --omit=dev
COPY apps/server/dist ./dist
EXPOSE 8100
ENV NODE_ENV=production
CMD ["node", "dist/start.cjs"]
