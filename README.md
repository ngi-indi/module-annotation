<div align="center">
  <img src="./assets/logo.png" alt="Logo" width="150"/>

  # Annotation Platform

  ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
  ![Version 0.1](https://img.shields.io/badge/version-0.1-green.svg)
  ![Status: Stable](https://img.shields.io/badge/status-stable-brightgreen.svg)
    
  <p>
    <strong>Review Platform</strong> is an interactive and intuitive system that allows <strong>reviewers</strong> to log in and examine <strong>sentences</strong> to identify and label the presence of <strong>biases</strong>. Reviewers can assess various forms of bias, such as <strong>gender bias</strong>, <strong>racial bias</strong>, and <strong>hate speech</strong>, using a straightforward and efficient interface. 
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

## Installation

This project is built with Strapi. Follow these instructions to set it up locally and use the same data.

### Prerequisites

Before starting, ensure you have Docker and Git installed on your system.

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ngi-indi/module-annotation.git
    cd module-annotation
    ```

2. **Build the Review Frontend Docker image**:

```bash
docker build -t reviewfrontend .
```

3. **Run the Review Frontend container**:

```bash
docker run -d --name reviewfrontend --network indi_network -p 3000:3000 reviewfrontend
```

4. **Build the MySQL Docker image**:

```bash
cd ../db
docker build -t reviewdb .
```

5. **Run the Review Database container**:

```bash
docker run -d --name reviewdb --network indi_network -p 3306:3306 reviewdb
```

6. **Build the Review Backend Docker image**:

```bash
cd ../backend
docker build -t reviewbackend .
```

7. **Run the Review Backend container**:

```bash
docker run -d --name reviewbackend --network indi_network -p 1337:1337 reviewbackend
```

8. **Access the Strapi admin panel:**

    Open [http://localhost:1337/admin](http://localhost:1337/admin).

8. **Access the Frontend interface:**

    Open [http://localhost:1337/admin](http://localhost:3000).

## Usage

### Backend admin credentials:
- **Username**: `admin@test.com`
- **Password**: `123456Ab`

### Frontend credentials:
- **Administrator**:
  - **Username**: `s@d.vom`
  - **Password**: `123456`
  
- **Reviewer**:
  - **Username**: `utente1@prova.com`
  - **Password**: `123456`

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
This project is licensed under the GNU General Public License v3.0 License - see the [LICENSE](https://github.com/ngi-indi/module-annotation/blob/main/LICENSE) file for details.

## Contact
For any questions or support, please reach out to:
- University of Cagliari: bart@unica.it, diego.reforgiato@unica.it, ludovico.boratto@unica.it, mirko.marras@unica.it
- R2M Solution: giuseppe.scarpi@r2msolution.com
- Website: Coming soon!

