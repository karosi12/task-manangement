FROM node:15
WORKDIR /app
COPY package.json .
RUN npm install -f
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi
COPY . ./
EXPOSE 3001
CMD ["node", "nodemon --watch src --delay 250ms --exec babel-node src/bin/www.js --ignore tests/"]