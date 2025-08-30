# Stage 1: Build the React app
FROM node:18 as builder

# Set working directory
WORKDIR /usr/src/app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source and build it
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# Stage 2: Serve the built app using 'serve'
FROM node:18-slim

# Install 'serve' to serve static files
RUN npm install -g serve

# Copy built files from previous stage
COPY --from=builder /usr/src/app/build /app

# Set working directory
WORKDIR /app

# Expose the port the app will run on
EXPOSE 5000

# Start the static file server
CMD ["serve", "-s", ".", "-l", "5000"]
