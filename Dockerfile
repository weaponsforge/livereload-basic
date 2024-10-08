FROM node:20.15.0-alpine AS base
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S user
RUN chown -R user /opt/app
COPY package*.json ./
COPY yarn.lock ./

# Install specific version of Yarn
# directly from Alpine package manager
RUN apk add --no-cache yarn=1.22.22-r0

# DEVELOPMENT APP PROFILE
FROM base AS development
RUN yarn install
COPY . ./
EXPOSE 3000
CMD ["yarn", "dev:docker"]

# BUILD TARGET
FROM base AS build
COPY . ./
USER user

# PRODUCTION CLIENT PROFILE
FROM nginx:1.22.0-alpine AS production
COPY --from=build /opt/app/public /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
