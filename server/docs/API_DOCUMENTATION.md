# LinkSight Preview API Documentation

This document provides comprehensive details about the LinkSight Preview API endpoints, implementation guidelines, and examples for frontend developers.

## Base URL

All API endpoints are relative to:

```
http://localhost:3000/api
```

## Endpoints

### Register a New User

**Endpoint:** `/register`  
**Method:** `POST`  
**Description:** Registers a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "userId": "user_id",
  "token": "jwt_token"
}
```

### Login User

**Endpoint:** `/login`  
**Method:** `POST`  
**Description:** Logs in an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "userId": "user_id",
  "token": "jwt_token"
}
```

### Generate a New API Key

**Endpoint:** `/generate-key`  
**Method:** `POST`  
**Description:** Generates a new API key for the authenticated user.

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Request Body:**
```json
{
  "title": "My API Key"
}
```

**Response:**
```json
{
  "message": "New API key generated successfully",
  "apiKey": "generated_api_key",
  "title": "My API Key"
}
```

### Delete an API Key

**Endpoint:** `/delete-key`  
**Method:** `DELETE`  
**Description:** Deletes an existing API key for the authenticated user.

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Request Body:**
```json
{
  "apiKey": "api_key_to_delete"
}
```

**Response:**
```json
{
  "message": "API key deleted successfully"
}
```

### Get User Information

**Endpoint:** `/user`  
**Method:** `GET`  
**Description:** Retrieves user information including API keys.

**Headers:**
```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Response:**
```json
{
  "userId": "user_id",
  "email": "user@example.com",
  "name": "John Doe",
  "apiKeys": [
    {
      "key": "api_key",
      "createdAt": "timestamp",
      "isActive": true
    }
  ],
  "createdAt": "timestamp"
}
```

### Get Link Preview

**Endpoint:** `/preview`  
**Method:** `POST`  
**Description:** Retrieves metadata for a given URL.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "title": "Example Title",
  "description": "Example description",
  "favicon": "https://example.com/favicon.ico",
  "ogImage": "https://example.com/og-image.jpg",
  "url": "https://example.com",
  "siteName": "Example Site",
  "type": "website"
}
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request. Common status codes include:

- `200 OK`: The request was successful.
- `400 Bad Request`: The request was invalid or cannot be served.
- `401 Unauthorized`: Authentication is required and has failed or has not been provided.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on the server.

## Authentication

All protected routes require a valid JWT token to be included in the `Authorization` header of the request. The token is obtained upon successful user registration or login.

Example:
```json
{
  "Authorization": "Bearer jwt_token"
}
```

## Rate Limiting

The `/preview` endpoint is rate-limited to prevent abuse. Ensure to handle rate limit responses appropriately in your frontend application.

## Conclusion

This documentation provides the necessary details to integrate the LinkSight Preview API into your frontend application. For any further assistance, please refer to the source code or contact the API maintainer.
