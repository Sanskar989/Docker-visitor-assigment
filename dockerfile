# 1. Use a small Node image
FROM node:14-alpine

# 2. Create app dir
WORKDIR /usr/src/app

# 3. Copy and install dependencies
COPY package.json .
RUN npm install --production

# 4. Bundle app source
COPY . .

# 5. Default command
CMD ["npm", "start"]
