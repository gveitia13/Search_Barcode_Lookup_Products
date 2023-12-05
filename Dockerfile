#FROM node:18.18.0 as node
#LABEL authors="Gilbert"
#
#WORKDIR /app
#COPY . .
#
#RUN npm install
#RUN npm run build
#EXPOSE 4200
#CMD npm run start
# Stage 1
FROM node:18.18.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/search-products /usr/share/nginx/html
