# MERN Stack Chat Web-Based Application

**MERN Stack Chat Web-Application** is a real-time chat web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) along with Socket.IO for live messaging. The project focuses on implementing a CRUD system for users with authentication and authorization, emitting real-time events, and displaying chat history in a modern, responsive UI.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)


---

## About the Project

This project aims to build a simple yet functional real-time chat application where users can register, log in, and send/receive messages instantly. It's built using the MERN stack with a focus on real-time communication using Socket.IO, making it ideal for learning how to integrate backend and frontend technologies seamlessly.

---

## Project Overview

This repository contains the implementation of a real-time chat application. The main goals of the project are:

- Implement user CRUD operations with authentication and authorization
- Use Socket.IO to emit real-time events (such as message and user join events)
- Save chat history in MongoDB
- Display messages and chat stats (user count, chat count) live in the frontend

---

## Technology Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, TypeScript
- **Real-time Communication:** Socket.IO
- **Authentication:** JWT
- **Database:** MongoDB

---

## Features

- User registration and login with JWT authentication
- Real-time chat with message and user join events
- Live message updates in the UI
- Store chat history in MongoDB
- Display total users and chat counts
- Responsive layout with Tailwind CSS

---

## Setup and Installation

1. **Clone the repository**
- git clone https://github.com/your-username/mern-chat-app.git
- cd mern-chat-app
 ---
2. **Install dependencies**

 Backend:
  - cd server
  - npm install

 Frontend:
  - cd client
  - npm install
---

3. **Configure environment variables**

- Create a `.env.example` file in both the `/server` and `/client` directories with the following keys:
MONGODB_URI=
JWT_SECRET=
REACT_APP_API_URL=
---

4. **Run locally**

Backend:
- cd server
- npm run dev

Frontend:
- cd client
- npm start
---
5. Open your browser and go to `http://localhost:3000` to view the app.

---

