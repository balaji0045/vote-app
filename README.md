Vote App

Description

Vote App is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to manage a voter list. Users can view, add, and delete voters using a Material UI Data Grid interface.

Features

Display a list of voters with details

Add new voters

Delete voters

User-friendly interface with Material UI

Backend deployed on Render


Technologies Used

Frontend:

React.js

Material UI (Data Grid for voter management)


Backend:

Node.js

Express.js

MongoDB (Database)

Mongoose (ODM)


Deployment:

Backend: Render


Installation

Prerequisites

Make sure you have the following installed:

Node.js

MongoDB


Steps to Run the Project

Clone the Repository

git clone https://github.com/balaji0045/vote-app.git
cd vote-app

Install Dependencies

Backend

cd backend
npm install

Frontend

cd frontend
npm install

Setup Environment Variables

Create a .env file in the backend folder and add the following:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Start the Application

Start Backend

cd backend
npm start

Start Frontend

cd frontend
npm start

API Endpoints

Voter Routes

GET /api/voters - Get all voters

POST /api/voters - Add a new voter

DELETE /api/voters/:id - Delete a voter


Contribution

If you’d like to contribute, feel free to fork the repository and submit a pull request.

Contact

For any queries, reach out to Balaji via GitHub: balaji0045.

