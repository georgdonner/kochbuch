# Build stage
FROM node:18 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
# Using npm install instead of npm ci to allow dependency resolution
RUN npm ci

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Production stage
FROM node:18

WORKDIR /app

# Install production dependencies only
# Note: sharp has prebuilt binaries for Ubuntu, no additional system packages needed
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built frontend from builder stage
COPY --from=builder /app/build ./build

# Copy server files and other necessary files
COPY server.js ./
COPY routes ./routes
COPY models ./models
COPY static ./static
COPY fonts ./fonts

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the server
CMD ["node", "server.js"]

