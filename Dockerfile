FROM node:7.2.0

# Create a new user to our new container and avoid the root user
RUN useradd --user-group --create-home --shell /bin/bash nupp && \
    apt-get clean
ENV HOME=/home/nupp
COPY package.json $HOME/app/
COPY index.js $HOME/app/
RUN touch $HOME/app/transaction.txt
RUN chown -R nupp:nupp $HOME/* /usr/local/
WORKDIR $HOME/app
RUN npm cache clean && \
    npm install --silent --progress=false --production
RUN chown -R nupp:nupp $HOME/*
USER nupp
EXPOSE 3000
CMD ["npm", "start"]
