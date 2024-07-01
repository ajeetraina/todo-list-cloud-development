# A todo-List App using Docker 

This full-stack Todo application was built with React, Node.js, Express, and MongoDB. The application allows users to register, log in, create, update, delete, and filter their to-do tasks. It also supports image and file uploads to AWS S3.

![image](https://github.com/ajeetraina/todo-list-local-cloud/assets/313480/16d21a98-bc64-4333-91bc-8c6ab247fe66)


## Table of Contents

- [Architecture](#architecture)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [MongoDB Setup](#mongodb-setup)
- [AWS Setup](#aws-setup)


## Architecture

The application is divided into two main parts:

- **Client**: Built with React, Material UI, and React Router.
- **Server**: Built with Node.js, Express, MongoDB, and AWS.

## Features

- User authentication (register and login)
- Create, update, delete, and view todos
- Filter todos by tags
- Upload images and files to AWS S3
- Download the attachment of todos
- Protected routes for authenticated users

## Prerequisites

- Node.js
- npm or yarn
- MongoDB
- AWS S3 account (for file uploads)

## AWS Setup

### IAM and S3 Configuration

For AWS usage, IAM and S3 services are utilized:

- **IAM**:

  - Created a group called `admin1` and added a user called `developer`.
  - Generated access key and secret key for the `developer` user to enhance security.
  - This setup prevents direct usage of the root user account, ensuring a hierarchical and secure structure.

- **S3**:
  - Used for general storage options for files and images.
  - All files and images uploaded by users are stored in an S3 bucket named `mytestcasebucket`
 
If you're new to S3, then [follow these steps in detail](https://github.com/ajeetraina/todo-list-cloud-development/blob/mern/s3.md).

## Installation

1. **Clone the repository:**

```sh
git clone https://github.com/ajeetraina/todo-list-local-cloud/
cd todo-list-local-cloud
```

2. **Using docker init:**

Go to `server/` and `client/` folder and use `docker init` to build Dockerfile and compose file respectively.


2. **Setup Docker Compose File:**


Open `compose.yml` and enter AWS credentials as per your environment. Assuming that you have S3 already configured, enter the bucket name.


```
   environment:
      - MONGODB_URI=mongodb://mongodb:27017/todo-app
      - JWT_SECRET=your-jwt-secret-key
      - AWS_ACCESS_KEY_ID=XXXX
      - AWS_SECRET_ACCESS_KEY=XXX
      - AWS_REGION=us-east-1
      - S3_BUCKET_NAME=localbuck
```

Running `npm install` in each directory will set up all necessary dependencies specified in the `package.json` files.

## Libraries and Tools Used

### Server-Side Libraries

- **@aws-sdk/client-s3**: AWS SDK for JavaScript for S3.
- **bcryptjs**: Library to hash passwords.
- **cors**: Middleware to enable CORS.
- **dotenv**: Library to load environment variables from a .env file.
- **express**: Web framework for Node.js.
- **jsonwebtoken**: Library to sign and verify JSON Web Tokens.
- **mongoose**: MongoDB object modeling tool.
- **multer**: Middleware for handling file uploads.
- **multer-s3**: Streaming multer storage engine for AWS S3.

### Client-Side Libraries

- **@mui/icons-material**: Material UI icons.
- **@mui/material**: Material UI components.
- **@testing-library/jest-dom**: Custom jest matchers for DOM nodes.
- **@testing-library/react**: Simple and complete React DOM testing utilities.
- **@testing-library/user-event**: Fire events to interact with the UI.
- **axios**: Promise-based HTTP client.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: Entry point to the DOM and server renderers for React.
- **react-router-dom**: Declarative routing for React.
- **react-scripts**: Scripts and configuration used by Create React App.
- **web-vitals**: Library for measuring web performance metrics.

## Environment Variables

Create a `.env` file in the `server` directory and add the following environment variables:

```env
# MongoDB URI
MONGODB_URI=<your-mongodb-uri>

# JWT Secret
JWT_SECRET=<your-jwt-secret>

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
AWS_REGION=<your-aws-region>
S3_BUCKET_NAME=<your-s3-bucket-name>

# Server Port
PORT=5000
```




## API Endpoints

### Auth Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get a JWT token

### Todo Routes

- `GET /api/todos` - Get all todos for the authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Database Structure

The application uses MongoDB as its NoSQL database. Below is the structure of the MongoDB collections:

- **Users Collection (`test.users`)**:

  - `_id`: ObjectId
  - `username`: String
  - `password`: String (hashed)

- **Todos Collection (`test.todos`)**:
  - `_id`: ObjectId
  - `userId`: ObjectId (reference to the user)
  - `title`: String
  - `description`: String
  - `tags`: Array of Strings
  - `image`: String (URL to the image in S3)
  - `files`: Array of Strings (URLs to the files in S3)
  - `createdAt`: Date
  - `updatedAt`: Date



### Security Measures

- The `developer` IAM user has limited permissions as compared to the root user, ensuring that the root account details remain secure.
- Using IAM roles and policies, access to the S3 bucket is managed securely.
