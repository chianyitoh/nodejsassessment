# NodeJS API (Dockerized)

## Overview

This project is a Node.js REST API that implements user authentication and profile management using JWT, along with a car listing feature with pagination. The application is containerized using Docker and connected to a cloud database.

---

## Requirements

* Docker installed
* Internet connection (for MongoDB Atlas)

---

## Setup (Local with Docker)

1. Clone the repository:

```
git clone <your-repo-url>
cd <project-folder>
```

2. Run the application:

```
docker compose up --build
```

3. API will be available at:

```
http://localhost:5000/api
```

---

## Hosted API (Render)

Base URL:

```
https://nodejsassessment.onrender.com/api
```

---

## Available APIs

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| POST   | /api/register        | Register new user                  |
| POST   | /api/session/login   | Login user                         |
| POST   | /api/session/logout  | Logout user                        |
| GET    | /api/getmyprofile    | Get user profile                   |
| POST   | /api/updatemyprofile | Update user profile                |
| GET    | /api/carlist         | Get car list (pagination + search) |

---

## Authentication (JWT)

1. Call Login API:

```
POST /api/session/login
```

Response:

```
{
  "token": "your_jwt_token",
  "displayusername": "...",
  "userid": "..."
}
```

2. Use this token for protected APIs.

---

## Using Bearer Token (Postman)

For all protected endpoints (logout, get profile, update profile, car list), authentication is handled using a JWT Bearer token.

#### Step 1: Save token in Login request

In the **Login API → Tests tab**, add:

This will store the JWT token into a Postman environment variable named **token**.

```javascript
pm.environment.set("token", pm.response.json().token);
```

#### Step 2 : Use token in all protected requests

For all secured APIs:

Go to **Authorization** tab
Select **Bearer Token**
Set value to:
> {{token}}

Postman will automatically inject the latest token from the login response.

---

Alternative Method (Manual)

If needed, you can manually set the token:

Go to Authorization tab
Select Bearer Token
Paste the JWT token directly


#### Manual Header Method (Alternative)
```
Authorization: Bearer your_jwt_token
```

---

## API Flow

1. Register → get token
2. Login → get token
3. Use token for:

   * Logout
   * Get Profile
   * Update Profile
   * Get Car List

---

## Car List API

### Endpoint

```
GET /api/carlist
```

### Query Params

* `carname` (optional) → search keyword
* `pageindex` (required) → page number
* `pagesize` (required) → items per page
* `timestamp` (required)

### Example

```
/api/carlist?carname=mazda&pageindex=1&pagesize=10&timestamp=2026-01-01T00:00:00.000Z
```

---

## Database

* Cloud database: MongoDB Atlas
* Ensure valid connection string in environment variables

---

## Docker Notes

* Application runs inside container
* Uses environment variables:

  * `MONGO_URI`
  * `JWT_SECRET`

---

## Stop Application

```
docker compose down
```

---

## Submission Notes

This project includes:

* Full Node.js source code
* JWT authentication implementation
* Dockerized setup
* MongoDB Atlas integration
* REST API endpoints as per specification

---
