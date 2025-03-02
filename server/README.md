# LinkSight Preview API

LinkSight is an API service that generates rich previews for URLs, extracting metadata such as title, description, favicon, and OG images. Perfect for applications that need to display link previews in their UI.

## Features

- Extract metadata from any valid URL
- Return formatted data for creating rich link previews
- User authentication with JWT
- API key authentication for preview requests
- Rate limiting (60 requests per minute per API key)
- User registration and API key management

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Create a `.env` file with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/linkPreviewDB
API_KEY_SECRET=your_secret_key_for_signing_api_keys
JWT_SECRET=your_jwt_secret
```
4. Start the server
```bash
npm run dev
```

## API Documentation

### Register a new user

```
POST /api/register
```

Request body:
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "your_password"
}
```

Response:
```json
{
  "message": "User registered successfully",
  "userId": "60d21b4667d0d8992e610c85",
  "apiKey": "f8e7d6c5b4a3210987654321fedcba9876543210"
}
```

### User Login

```
POST /api/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

### Generate a new API key

```
POST /api/generate-key
```

Headers:
```
Authorization: Bearer your_jwt_token
```

Request body:
```json
{
  "userId": "60d21b4667d0d8992e610c85"
}
```

Response:
```json
{
  "message": "New API key generated successfully",
  "apiKey": "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t"
}
```

### Get Link Preview

```
POST /api/preview
```

Headers:
```
x-api-key: your-api-key
```

Request body:
```json
{
  "url": "https://example.com"
}
```

Response:
```json
{
  "title": "Example Domain",
  "description": "This domain is for use in illustrative examples in documents.",
  "favicon": "https://example.com/favicon.ico",
  "ogImage": "https://example.com/og-image.jpg",
  "url": "https://example.com",
  "siteName": "Example",
  "type": "website"
}
```

## Rate Limiting

Each API key is limited to 60 requests per minute. If you exceed this limit, you'll receive a 429 response with information about when the limit resets.

## Error Handling

The API returns appropriate status codes and error messages:

- 400: Bad request (invalid URL, missing parameters)
- 401: Unauthorized (missing or invalid API key)
- 404: URL not found or unreachable
- 429: Rate limit exceeded
- 500: Server error

## Suggested Improvements

- Add user authentication with JWT
- Implement caching for frequently accessed URLs
- Add analytics for API usage
- Create a dashboard for users to manage their API keys
