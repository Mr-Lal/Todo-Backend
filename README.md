# User Authentication API Documentation

This project provides a simple user authentication system using Node.js, Express, and MongoDB. Below are the main backend files related to user registration, login, profile, and authentication middleware, along with usage examples.

---

## 1. `controllers/user.controller.js`

Handles user-related HTTP requests.

### Main Functions

- **registerUser**: Registers a new user.
- **login**: Authenticates a user and issues a JWT.
- **Logout**: Clears the authentication cookie.
- **Profile**: Returns the authenticated user's profile.

---

## 2. `services/user.service.js`

Contains business logic for user registration and login.

### Main Functions

- **registerService({ name, email, password })**: Creates a new user if the email is not already registered.
- **loginService({ email, password })**: Checks credentials and returns the user if valid.

---

## 3. `models/user.model.js`

Defines the User schema and methods.

### Main Features

- **Schema**: `name`, `email`, `password`
- **generateAuthToken**: Generates a JWT for the user.
- **comparePassword**: Compares a plain password with the hashed password.

---

## 4. `middlewares/user.middleware.js`

Middleware for protecting routes.

### Main Function

- **verifyUser**: Checks for a valid JWT in cookies and attaches the user to the request.

---

## 5. `routes/user.route.js`

Defines user-related API endpoints.

### Endpoints

- `POST /user/register` — Register a new user
- `POST /user/login` — Login and receive a JWT
- `GET /user/logout` — Logout user (clears cookie)
- `GET /user/profile` — Get current user's profile (protected)

---

## API Usage Examples

### Register User

**Request**
```http
POST /user/register
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}
```

**Success Response**
```json
{
  "msg": "User registered successfully",
  "user": {
    "_id": "60f7c2b5e1d3c2a1b8e4d123",
    "name": "Alice",
    "email": "alice@example.com",
    "createdAt": "2025-07-17T12:34:56.789Z",
    "updatedAt": "2025-07-17T12:34:56.789Z",
    "__v": 0
  },
  "token": "<JWT_TOKEN>"
}
```

---

### Login User

**Request**
```http
POST /user/login
Content-Type: application/json

{
  "email": "alice@example.com",
  "password": "password123"
}
```

**Success Response**
```json
{
  "msg": "User logged in successfully",
  "user": {
    "_id": "60f7c2b5e1d3c2a1b8e4d123",
    "name": "Alice",
    "email": "alice@example.com",
    "createdAt": "2025-07-17T12:34:56.789Z",
    "updatedAt": "2025-07-17T12:34:56.789Z",
    "__v": 0
  },
  "token": "<JWT_TOKEN>"
}
```

---

### Get User Profile (Protected)

**Request**
```http
GET /user/profile
Cookie: token=<JWT_TOKEN>
```

**Success Response**
```json
{
  "msg": "User profile fetched successfully",
  "user": {
    "_id": "60f7c2b5e1d3c2a1b8e4d123",
    "name": "Alice",
    "email": "alice@example.com",
    "createdAt": "2025-07-17T12:34:56.789Z",
    "updatedAt": "2025-07-17T12:34:56.789Z",
    "__v": 0
  }
}
```

---

### Logout

**Request**
```http
GET /user/logout
```

**Success Response**
```json
{
  "msg": "User logged out successfully"
}
```

---

## Validation Errors

**Example**
```json
{
  "errors": [
    {
      "msg": "Email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## Notes

- All passwords are hashed before storage.
- JWT tokens are sent as HTTP-only cookies.
- Protected routes require a valid token in cookies.
- Validation is handled using `express-validator`.

---

# POST /user/register

Registers a new user.

## Endpoint

```
POST /user/register
```

## Request Body

Send a JSON object with the following fields:

| Field    | Type   | Required | Description                  |
|----------|--------|----------|------------------------------|
| name     | String | Yes      | User's full name (min 3 chars) |
| email    | String | Yes      | User's email (must be valid) |
| password | String | Yes      | User's password (min 6 chars)|

### Example

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

## Responses

### Success (201 Created)

```json
{
  "msg": "User registered successfully",
  "user": {
    "_id": "60f7c2b5e1d3c2a1b8e4d123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-07-17T12:34:56.789Z",
    "updatedAt": "2025-07-17T12:34:56.789Z",
    "__v": 0
  },
  "token": "<JWT_TOKEN>"
}
```

- A `token` cookie is also set (HTTP-only).

### Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "Email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### User Already Exists (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "User already exists with this email"
    }
  ]
}
```

## Notes

- The `token` is a JWT for authentication.
- The password is securely hashed before storage.
- The endpoint expects `Content-Type: application/json`.