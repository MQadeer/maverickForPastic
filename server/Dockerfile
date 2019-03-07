FROM node:8

# working directory in docker 
WORKDIR /user/src/app

# copy package.json and package-lock-json
COPY package*.json ./

#  command for running dependicies in container
RUN npm install

# copy all the curren directories from local to container
COPY . .

# port of running our serevr
EXPOSE  3000

CMD [ "node", "index.js" ]