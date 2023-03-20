FROM node:14-alpine
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
RUN npm install
RUN npm install react-scripts@5.0.1 -g
COPY . .

EXPOSE 3000

CMD ["npm", "start"]