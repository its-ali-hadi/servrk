# Build stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install build dependencies for sqlite3 (if needed, but usually we try to avoid)
# Note: sqlite3 might still need build tools on alpine if binaries aren't compatible
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source
COPY . .

# Expose port
EXPOSE 3031

# Run the server
CMD ["node", "index.js"]
