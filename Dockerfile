FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY logo-web.png /usr/share/nginx/html/logo-web.png
COPY logo.webp /usr/share/nginx/html/logo.webp
COPY bosarsavideo.mp4 /usr/share/nginx/html/bosarsavideo.mp4
COPY favicon/ /usr/share/nginx/html/
EXPOSE 80
