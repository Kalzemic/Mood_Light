# Stage 1: Build the React app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Stage 2: Serve app with NGINX
FROM nginx:stable-alpine

# Copy the custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port and start NGINX
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

