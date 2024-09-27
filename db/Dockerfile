# Use the official MySQL 8.0 image as the base
FROM mysql:8.0

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=123456
ENV MYSQL_DATABASE=sentiment_setter
ENV MYSQL_USER=indi
ENV MYSQL_PASSWORD=123456

# Expose MySQL port
EXPOSE 3306

# Copy initialization SQL scripts into the container
COPY ./backup /docker-entrypoint-initdb.d/

# Set command to ensure compatibility with older MySQL clients
CMD ["mysqld", "--default-authentication-plugin=mysql_native_password"]
