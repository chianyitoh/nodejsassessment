# NodeJS API (Dockerized)

## Requirements
- Docker installed

## Setup

1. Clone or extract project
2. Run:

docker compose up --build

## API Base URL
http://localhost:5000/api

## Available APIs

- POST /api/register
- POST /api/session/login
- POST /api/session/logout
- GET /api/getmyprofile
- POST /api/updatemyprofile
- GET /api/carlist

## Notes
- MongoDB Atlas is used as database
- Ensure internet connection is available

## Stop container

docker compose down
