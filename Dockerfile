# This file will specify all relevant settings for docker to create the docker image of our app.
# Order of commands here does not affect the way that the application will function, but the order can affect the time of further changes.
# If we create another container, docker will check step by step if changes have been made up to that step.
# When no changes are recognized between the steps, docker will use the cached version of that step and use it further.
# Docker will still execute all steps in order, so if changing the order would mess something up, we can counter that with additional lines.
# For example; copying the "package.json" file manually after the WORKDIR command would allow us, to move the RUN command to the line after it.
# This would allow changes to the source code, without having to install the dependencies again, because they would have been cached already.

# Will specify the base layer image on which docker will layer the rest of the images.
# Will use node version 18.2.0 and will use the lightweight alpine linux distribution to save on file size.
FROM node:18.2.0-alpine3.14

# This would install nodemon inside the container. Needed to utilize volumes within our container.
# Nodemon will detect changes to working files and restart the server to include those changes in the container.
# This will not change the actual image so we avoid having to create new images for every change, as we would have to otherwise.
# RUN npm install -g nodemon
# Not really needed for us currently.

# Sets the relative path of our app working directory. Is needed for Docker can see the "package.json" file when executing RUN.
WORKDIR /blood-pressure-app

# Tells docker which root directory will be copied and where the copy will be placed, relative to the WORKDIR. 
# Will result in "./blood-pressure-app" as our root directory in this case.
COPY . .

# Specifies the port that will be made accessible for our application inside of the container.
# This is needed to access the running image inside of the browser. 
# NEEDS to be added also if the app would need to interact with ports in other ways.
EXPOSE 3000

# Specifies which command needs to be used to install all dependencies that are specified in the "package.json" file.
# Will be used during build time only!
RUN npm install

# Specifies the command that will be executed at runtime to start the app.
# Special syntax with the array of double quoted Strings. Will get separated with spaces when executed.
CMD ["npm", "start"]