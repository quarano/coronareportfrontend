FROM gmathieu/node-browsers:3.0.0 AS build

#npm install is done in cloud build steps

RUN npm run build-prod

FROM nginx:1.15.8-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY ./dev/nginx.conf /etc/nginx/nginx.conf
COPY  ./dist/coronareportfrontend /usr/share/nginx/html

RUN echo "nginx -g 'daemon off;'" > run.sh

ENTRYPOINT ["sh", "run.sh"]
