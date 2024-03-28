# Build nginx image for website content -> build is successful
FROM nginx
COPY ./website/ /usr/share/nginx/html
# RUN
# EXPOSE
# CMD

# Build apache2 image for website content -> build is successful
# FROM httpd:2.4
# COPY ./website/ /usr/local/apache2/htdocs/
# RUN
# EXPOSE
# CMD
