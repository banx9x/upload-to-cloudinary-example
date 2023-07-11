FROM node:alpine
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY src .
COPY tsconfig.json .
RUN npm run build
COPY src/views ./dist/views
EXPOSE 8080
ENTRYPOINT [ "node", "dist/server.js" ]