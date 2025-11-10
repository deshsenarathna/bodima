FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (force Linux optional packages)
RUN npm install --force

# Copy the rest of the app
COPY . .

# Expose Vite default dev port
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev"]
