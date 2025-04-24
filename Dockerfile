# Use the official Node.js image from the DockerHub
FROM node:20-slim AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

FROM node:20-slim AS runner

WORKDIR /app

# Copy build output from builder stage
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./

RUN npm install

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
