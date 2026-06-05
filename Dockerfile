FROM node:24.11.0-alpine AS base
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S user
RUN chown -R user /opt/app
COPY package*.json ./

# Install specific version of Yarn
# directly from Alpine package manager
# RUN corepack enable && corepack prepare yarn@1.22.22 --activate

# DEVELOPMENT APP PROFILE
FROM base AS development
RUN npm ci
COPY . ./
EXPOSE 3000
CMD ["npm", "run", "dev:docker"]

# BUILD TARGET
FROM base AS build
COPY . ./
USER user

# PRODUCTION CLIENT PROFILE
FROM nginx:1.31.1-alpine AS production
COPY --from=build /opt/app/public /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
