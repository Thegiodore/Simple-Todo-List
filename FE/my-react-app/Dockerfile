# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY .env .

COPY . .
RUN npm run build

# Stage 2: Serve the compiled application using Nginx
FROM nginx:alpine

# *** ADD THESE TWO LINES ***
# 1. Remove the default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# 2. Copy your custom configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80