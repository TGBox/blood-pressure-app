# This file will specify all relevant settings for docker to create the docker image of our app.

# Will specify the base layer image on which docker will layer the rest of the images.
# Will use node version 18.2.0 and will use the lightweight alpine linux distribution to save on file size.
FROM node:18.2.0-alpine3.14

# Sets the relative path of our app working directory. Is needed for Docker can see the "package.json" file when executing RUN.
WORKDIR /blood-pressure-app

# Tells docker which root directory will be copied and where the copy will be placed, relative to the WORKDIR. 
# Will result in "./blood-pressure-app" as our root directory in this case.
COPY . .

# Specifies the port that will be made accessible for our application inside of the container.
# This is needed to access the running image inside of the browser.
EXPOSE 3000

# Specifies which command needs to be used to install all dependencies that are specified in the "package.json" file.
# Will be used during build time only!
RUN npm install

# Specifies the command that will be executed at runtime to start the app.
# Special syntax with the array of double quoted Strings. Will get separated with spaces when executed.
CMD ["npm", "start"]