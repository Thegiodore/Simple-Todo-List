
Simple-Todo-List

Simple To-Do List Application (Containerized Full-Stack)
This is a three-tier, containerized web application that serves as a robust demonstration of modern full-stack development and deployment using Docker Compose.

🚀 Key Features

-Full CRUD Functionality: Supports Create, Read, Update, and Delete operations for managing tasks.

-Decoupled Architecture: Frontend (React) and Backend (Node/Express API) run as completely independent services.

-Containerized Deployment: The entire stack is orchestrated using Docker Compose, ensuring consistent, one-command deployment across any environment.

-Retro UI/UX: Features a distinctive, engaging retro-style design utilizing the "Press Start 2P" font for a unique user experience.

-Responsive Networking: Correctly configured to handle inter-container communication using internal Docker DNS (http://backend:3001).

⚙️ Technology Stack

The application is built using a decoupled architecture with the following core technologies:

-Frontend: React (Vite) / Nginx

Role: User Interface and Client-side Logic (served by a lightweight Nginx container).

-Backend: Node.js / Express

Role: RESTful API for all task data management.

-Data: In-memory Array

Role: Simple server-side data persistence for demonstration.

-Orchestration: Docker & Docker Compose

Role: Containerization and networking management.

🛠️ Deployment Summary

The deployment strategy utilizes a two-stage Docker build for the frontend to create highly optimized, small image sizes. Environment variables (VITE_BACKEND_URL) are correctly injected via docker-compose.yml to ensure successful communication between the containers on the internal Docker network.

To Run Locally:

-Ensure Docker is running.

-Navigate to the FE/my-react-app directory (containing docker-compose.yml).

-Run the command: docker compose up --build

-Access the application in your browser at: http://localhost

