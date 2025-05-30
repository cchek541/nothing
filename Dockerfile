FROM node:16

WORKDIR /app

# Copy server package files
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy server source code
COPY server/ ./

# Build TypeScript files
RUN npm run build

# Expose the port your app runs on
EXPOSE 9090

# Start the application
CMD ["npm", "start"] 