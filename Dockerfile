FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY logo.png /usr/share/nginx/html/logo.png
COPY favicon/ /usr/share/nginx/html/
EXPOSE 80
