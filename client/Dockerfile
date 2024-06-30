# Use Node.js 18 as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client files to the container
COPY . .

# Build the client
RUN npm run build

# Expose the client port
EXPOSE 3000

# Start the client
CMD ["npm", "start"]
