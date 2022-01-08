# Installs the current application on a Node Image.
FROM node:11.9.0

# The qq is for silent output in the console
# You are welcome to modify this part as it
# RUN apt-get update -qq && apt-get install -y build-essential libpq-dev vim

# Sets the path where the app is going to be installed
ENV NODE_ROOT /usr/src/app/

# Creates the directory and all the parents (if they don’t exist)
RUN mkdir -p $NODE_ROOT

# Sets the /usr/app as the active directory
WORKDIR $NODE_ROOT

RUN npm cache clean --force

# Install angular cli globally
RUN npm install -g @angular/cli

COPY package*.json $NODE_ROOT
# Install all the packages
RUN npm install

# Copies all the content
COPY . $NODE_ROOT

# The default port from ng serve (4200)
# ad 49153 for Webpack Hot Module Reload
EXPOSE 4200 49153
CMD ng serve --host 0.0.0.0:4200
