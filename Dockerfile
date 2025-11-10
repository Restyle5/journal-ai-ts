FROM node:25-alpine

# Set working directory
WORKDIR /app

# Install dependencies for building + bash + curl (required sometimes for tsx)
RUN apk add --no-cache bash curl

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install tsx globally so it's available in PATH
RUN npm install -g tsx

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Dev command (can be overridden in docker-compose)
CMD ["tsx", "watch", "src/server.ts"]
