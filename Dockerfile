FROM node:20

# Set working directory
WORKDIR /app

# Copy only backend dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend/. .

# Set default port environment variable
ENV PORT=8080
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
