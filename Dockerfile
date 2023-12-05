FROM node:18
WORKDIR /app
COPY . .
RUN npm install 

WORKDIR /app/frontend
RUN npm install

WORKDIR /app
EXPOSE 3000
CMD ["npm", "run", "all"]

