FROM node:alpine

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

# Create app directory
WORKDIR "/app"

# Copy dependencies
COPY ./package.json ./

# Set ENV variables
ENV NODE_ENV development

# Copy dependencies
COPY ./ ./

# Install dependencies
RUN npm install
RUN npm install tsc -g
RUN npm install nodemon -g

# Expose a ports
EXPOSE 3000

# Unprivileged user as a security best practice
# USER node

# Set the default command to execute
CMD [ "npm", "start" ]