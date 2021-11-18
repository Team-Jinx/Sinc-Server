FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
VOLUME [ "/var/log/nginx/log" ]
EXPOSE 8080
CMD [ "nginx", "-g", "daemon off;" ]