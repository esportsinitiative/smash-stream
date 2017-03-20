FROM node:7

# Go to app base
WORKDIR /usr/src/app

# Install nodecg prerequisites (circumvent bower issues on docker)
RUN npm install -g bower
RUN echo '{ "allow_root": true }' > /root/.bowerrc

# Install nodecg-cli (https://github.com/nodecg/nodecg-cli)
RUN npm install -g nodecg-cli

# Install nodecg (https://github.com/nodecg/nodecg)
RUN git clone https://github.com/nodecg/nodecg.git
WORKDIR nodecg/
RUN npm install --production
RUN bower install

# The command to run
EXPOSE 9090
CMD ["nodecg", "start"]
