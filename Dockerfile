FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/bosarsa.conf
COPY index.html /usr/share/nginx/html/index.html
COPY impressum.html /usr/share/nginx/html/impressum.html
COPY datenschutz.html /usr/share/nginx/html/datenschutz.html
COPY logo-web.png /usr/share/nginx/html/logo-web.png
COPY logo.webp /usr/share/nginx/html/logo.webp
COPY bosarsavideo.mp4 /usr/share/nginx/html/bosarsavideo.mp4
COPY kommunikationwennnichtsmehrgeht.mp4 /usr/share/nginx/html/kommunikationwennnichtsmehrgeht.mp4
COPY fonts/ /usr/share/nginx/html/fonts/
COPY favicon/ /usr/share/nginx/html/
EXPOSE 80
