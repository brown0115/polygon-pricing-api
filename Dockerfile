FROM node:16-alpine

# Create app directory
WORKDIR /backend/services

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "start" ]