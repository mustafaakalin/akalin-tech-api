# Use Node.js base image
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
# PNPM setup
RUN npm install -g pnpm
# project dependencies installation
RUN pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production image
FROM node:latest

# Set working directory
WORKDIR /app

# Install production dependencies
COPY --from=builder /app/package*.json ./
# PNPM setup
RUN npm install -g pnpm
RUN pnpm install --only=production

# Copy build files
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]