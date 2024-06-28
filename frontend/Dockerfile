FROM node:22-alpine

WORKDIR /app/frontend

COPY public public
COPY src src

RUN yarn install 

EXPOSE 3000

CMD ["yarn", "dev", "--port", "3000"]