# Strapi Project

This project is built with Strapi. Follow these instructions to set it up locally and use the same data.

## Prerequisites

- Node.js
- npm or yarn
- mysql 

## Setup

1. **Clone the repository:**

2. **Install dependencies:**
    it has to be done in the "sentiment_setter" folder and also in the "react-app" folder.
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up the database: (mysql)**

    - Create a database.
    - Import the provided database backup
    - The folder of the backup is called db_dati.zip


4. **Configure environment variables:**

    Create a `.env` file in the root of the project and configure your database connection settings:

    ```env
    DATABASE_CLIENT=mysql
    DATABASE_HOST=your_host
    DATABASE_PORT=your_port
    DATABASE_NAME=your_database
    DATABASE_USERNAME=your_username
    DATABASE_PASSWORD=your_password
    DATABASE_SSL=false
    ```

5. **Start the Strapi server :**
    *open a terminal in the sentiment_setter folder*
    ```bash
    npm run develop
    # or
    yarn develop
    ```
6. **Start the react app :**
    *open a terminal in the react-app folder*
    ```bash
    npm start
  
    ```
7. **Access the Strapi admin panel:**

    Open [http://localhost:1337/admin](http://localhost:1337/admin) in your browser and set up your admin user.
## Test Credetials

### Strapi admin credentials

 username:  admin

 password:  123456Ab 

### Site credentials

**ADMIN**

username : s@d.vom

password : 123456

**USER**

username : utente1@prova.com

password : 123456



