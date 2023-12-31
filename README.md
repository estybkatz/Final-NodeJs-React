# Worker Management System

Welcome to the Worker Management System project! This project is a full-stack application with a Node.js server handling three MongoDB databases for workers, tasks, and customers. The React frontend provides CRUD operations for workers and a management interface for admins.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with the Worker Management System, follow these instructions.

## Prerequisites

Make sure you have the following software installed:

1. Node.js
2. npm (Node Package Manager)

## Installation

1. Clone the repository:

git clone https://github.com/estybkatz/Final-NodeJs-React.git

cd Final-NodeJs-React

# Install dependencies for the frontend and server:

npm install

# Install server dependencies

cd ../server
npm install

## Usage

To use the Worker Management System, you need to run both the server and the client.

# Start MongoDB:

Make sure your MongoDB server is running.

# Start the server:

## From the root directory

cd server
npm start

The server should be running at http://localhost:8181.

# Start the React frontend:

npm start

The React frontend should be accessible at http://localhost:3000.

Now, you have both the server and the client running, and you can interact with the Worker Management System.

## Project Structure

The project is structured as follows:

### Worker Management System :

React Frontend
Node.js Server
Business logic for CRUD operations
MongoDB models for workers, tasks, and customers
Express.js routes for API endpoints
gitignore
package.json
README.md

## Technologies Used

React
Node.js
MongoDB (with Mongoose)
Express.js
JWT (JSON Web Tokens) for authentication
CSS
JavaScript

## Future Roadmap

We have exciting plans for the future development of the Worker Management System. Here's a list of some planned enhancements and features:

1. **Notification System**: Add a notification system to inform workers and managers of new tasks, updates, and important announcements.

2. **Reporting and Analytics**: Integrate reporting and analytics features to provide insights into worker performance, task completion rates, and other key metrics.

3. **User Roles and Permissions**: Enhance the authentication system to support different user roles and permissions, allowing for more granular control over system access.

4. **Mobile Responsiveness**: Optimize the React frontend for better mobile responsiveness, enabling users to access and manage tasks from mobile devices.

## Contributing

If you'd like to contribute to the project, follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your fork.
5.  Create a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
