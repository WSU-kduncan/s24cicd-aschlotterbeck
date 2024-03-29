# Build nginx image for website content -> build is successful
FROM nginx
COPY ./website/ /usr/share/nginx/html
# RUN
EXPOSE 80
# CMD
