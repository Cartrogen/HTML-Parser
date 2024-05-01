# HTML Parser Project

## Overview
This project is a demonstration of an HTML parser that fetches HTML content from a specified URL, parses it into a structured JSON format, and stores the result in MongoDB. It also logs various activities and outputs parsed data to a local file.

## Technology Stack
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database used to store parsed HTML data.
- **Docker**: A platform to develop, ship, and run applications inside containers.
- **log4js**: A flexible logging library for use in Node.js.
- **JSDOM**: A JavaScript implementation of the DOM and HTML standards to parse and interact with HTML content.

## Prerequisites
- **Node.js**: [Download & Install Node.js](https://nodejs.org/en/download/)
- **Docker**: [Download & Install Docker](https://www.docker.com/products/docker-desktop)
- **Postman**: [Download & Install Postman](https://www.postman.com/downloads/) for API testing.

## Project Setup

### Step 1: Clone the Repository
Clone the repository to your local machine using:
git clone [repositoryURL]

Navigate into the project directory and run the following command to install all dependencies:
`npm install`

### Step 2: Environment Configuration (already been configured)
Ensure that `.env` file is in the project root with the following contents:
APP_PORT=3000
MONGODB_PORT=27017

Note that this above step has already been done for a smoother experience as part of this project. 

### Step 3: Docker Setup
Before running the application, ensure your Docker environment is ready. Execute the following command to start MongoDB and the application in containers:
`docker-compose up --build`

This command builds the Docker images and starts the containers specified in `docker-compose.yml`.

### Step 4: Running the Application
To start the application, navigate to the project directory and run:
`npm start`

This will start the Express server on the port defined in your `.env` file (`3000` by default).

### Step 5: Log File Configuration
Create a file called `app.log` in the root directory of your project to capture logs:

## Using the Application
To use the application, send a POST request to the endpoint with a URL to parse HTML content. Use Postman or any other API testing tool to make this request.

### Making a Request
URL: `http://localhost:3000/api/parse`
Method: `POST`
Body (raw JSON):
{
"url": "https://www.example.com"
}

Replace `"https://www.example.com"` with the URL from which you want to parse HTML.

### Expected Response
The server will respond with the MongoDB document ID where the parsed data is stored, and the same data will be saved in `output.json` in the project root.

## Viewing Logs
Check the `app.log` file in the project directory to see the logs that have been generated by running the application.
