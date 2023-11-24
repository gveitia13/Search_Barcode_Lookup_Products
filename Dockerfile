FROM node:18.18.0 as node
LABEL authors="Gilbert"

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
EXPOSE 4200
CMD npm run start
