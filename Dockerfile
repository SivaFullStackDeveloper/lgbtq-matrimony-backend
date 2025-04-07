# Use Node.js LTS version
FROM node:18

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files first (for better caching)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the application port (adjust if needed)
EXPOSE 5000

# Run the server (use nodemon in dev)
CMD ["npm", "run", "dev"]
