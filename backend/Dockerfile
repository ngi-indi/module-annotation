# Use Ubuntu as the base image
FROM ubuntu:latest

# Set the working directory
WORKDIR /srv/app

# Install curl and other dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    build-essential \
    mysql-client \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install yarn globally after Node.js is installed
RUN npm install -g yarn

# Copy the Strapi application files to the container
COPY ./ /srv/app

# Install project dependencies
RUN yarn install

# Expose the port on which the Strapi app runs (default is 1337)
EXPOSE 1337

# Set environment variables for connecting to the MySQL database
ENV DATABASE_CLIENT="mysql"
ENV DATABASE_HOST="reviewdb"
ENV DATABASE_PORT="3306"
ENV DATABASE_NAME="sentiment_setter"
ENV DATABASE_USERNAME="indi"
ENV DATABASE_PASSWORD="123456"

# Set environment variables for Strapi application security
ENV APP_KEYS='+N68aBfYj2YGnNsSj7gjc3hrABYArak83QnSf+5dwyo='
ENV API_TOKEN_SALT='WRn4NJgosWiyI15OVvAv0Q=='
ENV ADMIN_JWT_SECRET='xjz7NGJAG/qXudd0/BacQg=='
ENV JWT_SECRET='rF0Tc7x8AbqjqOZMJMJS+Q=='

# Run the Strapi application
CMD ["yarn", "develop"]
