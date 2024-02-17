FROM ubuntu:latest
LABEL authors="sumat"

FROM node:16-alpine
WORKDIR /pet
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "app.js"]

ENTRYPOINT ["top", "-b"]