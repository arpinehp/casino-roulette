FROM node:20-alpine as builder

# Use latest npm version
RUN npm install -g npm

WORKDIR /app

#copy the whole project
COPY . .

#build requires dev dependencies for typescript
WORKDIR /app/backend

RUN npm install && npm run build
# #install only production packages
RUN npm install --omit=dev --ignore-scripts

WORKDIR /app/frontend
RUN npm install && npm run build
#install only production packages
RUN npm install --omit=dev --ignore-scripts

FROM node:20-alpine

RUN npm install -g npm

# Copy common web-backend files
WORKDIR /usr/src/app/backend

COPY --from=builder /app/backend/build ./build
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/backend/package.json .

# Copy common web-frontend files
WORKDIR /usr/src/app/frontend

COPY --from=builder /app/frontend/package.json .
COPY --from=builder /app/frontend/build ./build

EXPOSE 8000

WORKDIR /usr/src/app/backend

ENV NODE_PATH /usr/src/app/backend/build/

CMD ["node", "build/server.js"]
