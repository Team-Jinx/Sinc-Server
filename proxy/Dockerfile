FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
VOLUME [ "/var/log/nginx/log" ]
EXPOSE 80
EXPOSE 443
CMD [ "nginx", "-g", "daemon off;" ]