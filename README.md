# Visitor Counter App – Node.js + Redis on Docker

---

## Overview

This project demonstrates a basic **two-tier web application** using Docker.
It consists of a **Node.js Express web server** and a **Redis database**. Every page refresh increments and displays the visitor count, stored in Redis.
The aim is to practice containerization, Docker networking, and multi-container orchestration (the manual way).

---
## Architecture

![ChatGPT Image Jun 23, 2025, 04_06_52 AM](https://github.com/user-attachments/assets/019362f1-30ee-432c-9f43-b967b206413c)


## Features

* Real-time visitor counter web page
* Persistent count using Redis database
* Fully containerized, manual multi-container deployment with Docker

---

## Step-by-Step Guide

### 1. Project Setup

* Make a project directory:

  ```bash
  mkdir visitor-app
  cd visitor-app
  ```
* Add `package.json` and install dependencies:

  ```bash
  npm init -y
  npm install express redis
  ```
* Add your `index.js` with the Express+Redis code.

---

### 2. Dockerize the Node.js App

* Create a `Dockerfile` with these contents:

  ```Dockerfile
  FROM node:14-alpine
  WORKDIR /usr/app
  COPY package.json .
  RUN npm install
  COPY . .
  CMD ["npm", "start"]
  ```

---

### 3. Manual Multi-Container Deployment

1. **Create Docker Network**

   ```bash
   docker network create visitor-app-net
   ```
2. **Run Redis Container**

   ```bash
   docker run -d --name redis-server --network visitor-app-net redis
   ```
3. **Build Node.js App Image**

   ```bash
   docker build -t my-visitor-app .
   ```
4. **Run Node.js App Container**

   ```bash
   docker run -d --name web-app --network visitor-app-net -p 4000:8081 my-visitor-app
   ```

---

### 4. Test the Application

* Open your browser at [http://localhost:4000](http://localhost:4000)
* You should see:

  ```
  Number of visits is 0
  ```
* Refresh the page; the number should increment with every refresh.

---

### 5. Cleanup

To remove all containers, network, and image:

```bash
docker stop web-app redis-server
docker rm web-app redis-server
docker network rm visitor-app-net
docker image rm my-visitor-app
```

---

## Screenshots
![Screenshot 2025-06-22 014459](https://github.com/user-attachments/assets/584838a2-70d8-480b-857f-ad79ac8518b0)
![Screenshot 2025-06-22 014446](https://github.com/user-attachments/assets/19a4b413-a94c-48bf-99e6-03eb848ce7cc)
![Screenshot 2025-06-22 014322](https://github.com/user-attachments/assets/edc3ff84-71e2-4d68-8bd0-39f3f4afbe1f)
![Screenshot 2025-06-22 014307](https://github.com/user-attachments/assets/0a073eae-a4c4-44b5-902e-bef9824f987d)
![Screenshot 2025-06-22 014257](https://github.com/user-attachments/assets/11463877-ba93-4bed-aa08-e2c97f2af4f6)
![Screenshot 2025-06-22 014238](https://github.com/user-attachments/assets/2f42c1f8-f907-468b-9335-c434d2a0eb02)

---

## Deliverables

* Source code (`index.js`, `package.json`, `Dockerfile`)
* Working deployment instructions
* Screenshot of your running application

---

## Key Learnings

* Learned to connect multiple containers using Docker networking
* Understood manual orchestration before moving to Docker Compose
* Gained confidence in debugging container and network issues

---

**Author:**
*Sanskar Goyal*
