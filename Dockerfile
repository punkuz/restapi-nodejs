# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /restapi-nestjs

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define environment variables (if needed)
# ENV NODE_ENV production

# Define the command to run your NestJS application
CMD [ "npm", "run", "start:dev" ]