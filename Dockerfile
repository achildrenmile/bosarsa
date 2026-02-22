FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
RUN npx @11ty/eleventy

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/bosarsa.conf
COPY --from=build /app/_site/ /usr/share/nginx/html/
EXPOSE 80