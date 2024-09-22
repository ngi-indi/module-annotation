<div align="center">
  <img src="./assets/logo.jpg" alt="Logo" width="150"/>

  # Annotation Platform

  ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
  ![Version 0.1](https://img.shields.io/badge/version-0.1-green.svg)
  ![Status: Stable](https://img.shields.io/badge/status-stable-brightgreen.svg)
    
  <p>
    <strong>Review Platform</strong> is an interactive and intuitive system that allows <strong>reviewers</strong> to log in and examine <strong>sentences</strong> to identify and label the presence of <strong>biases</strong>. Reviewers can assess various forms of bias, such as <strong>gender bias</strong>, <strong>racial bias</strong>, and <strong>hate speech</strong>, using a straightforward and efficient interface. The platform facilitates manual bias detection by providing reviewers with sentences from diverse textual datasets and enabling them to mark sentences.
  </p>
</div>

## Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Installation

This project is built with Strapi. Follow these instructions to set it up locally and use the same data.

### Prerequisites

- **Node.js**
- **npm** or **yarn**
- **MySQL**

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ngi-indi/module-bias-manager.git
    cd module-bias-manager
    ```

2. **Install dependencies:**
    This step must be performed in both the `sentiment_setter` and `react-app` folders.

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up the database (MySQL):**

    - Create a new database.
    - Import the provided database backup (`db_dati.zip`).
  
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

5. **Start the Strapi server:**

    Open a terminal in the `sentiment_setter` folder and run:

    ```bash
    npm run develop
    # or
    yarn develop
    ```

6. **Start the React app:**

    Open a terminal in the `react-app` folder and run:

    ```bash
    npm start
    ```

7. **Access the Strapi admin panel:**

    Open [http://localhost:1337/admin](http://localhost:1337/admin) in your browser and set up your admin user.

---

## Usage

### Test Credentials

#### Strapi admin credentials:
- **Username**: `admin@test.com`
- **Password**: `123456Ab`

#### Site credentials:
- **Administrator**:
  - **Username**: `s@d.vom`
  - **Password**: `123456`
  
- **Reviewer**:
  - **Username**: `utente1@prova.com`
  - **Password**: `123456`

---

## Contributing

### Reporting bugs and requesting features
- If you find a bug, please open an issue.
- To request a feature, feel free to open an issue as well.

### Developing a new feature

1. **Fork the repository** by clicking the "Fork" button at the top right of this page.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/ngi-indi/module-bias-manager.git
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature-branch
   ```
4. **Make your changes.** Please follow the existing code style and conventions.
5. **Commit your changes** with a descriptive commit message:
   ```bash
   git commit -m "Add new feature: explanation of bias model predictions"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature-branch
   ```
7. **Open a pull request** from your fork’s branch to the main branch of this repository.
- Describe the changes you’ve made in the PR description.
- Ensure that your PR references any relevant issues.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any questions or support, please reach out to:
- Email: support@ngi-indi.com
- Website: NGI Search INDI

