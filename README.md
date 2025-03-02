
---

# LinkPreviewAPI.js  

LinkPreviewAPI.js is a simple API that retrieves metadata (title, description, images, etc.) for any given URL. It also includes user authentication, API key management, and rate limiting for secure usage.  

## Features  

- **User Authentication**: Register and log in users with JWT-based authentication.  
- **API Key Management**: Generate and delete API keys for secure access.  
- **Link Previews**: Retrieve metadata for any URL, including title, description, favicon, and Open Graph images.  
- **Rate Limiting**: Prevent abuse by limiting requests to the `/preview` endpoint.  

## API Documentation  

### Base URL  

```
https://linkpreviewapi.amanraj.me/api
```

### Endpoints  

#### **User Authentication**  

- **Register:** `POST /register` – Create a new user account.  
- **Login:** `POST /login` – Authenticate an existing user.  

#### **API Key Management**  

- **Generate API Key:** `POST /generate-key` – Create a new API key.  
- **Delete API Key:** `DELETE /delete-key` – Remove an existing API key.  
- **Get User Info:** `GET /user` – Retrieve user details and API keys.  

#### **Link Preview**  

- **Get Link Metadata:** `POST /preview` – Retrieve metadata for a given URL.  

## Request & Response Examples  

### **Register a New User**  

**Request:**  
```json
POST https://linkpreviewapi.amanraj.me/api/register
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

### **Get Link Preview**  

**Request:**  
```json
POST https://linkpreviewapi.amanraj.me/api/preview
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

## Authentication  

All protected routes require a valid JWT token in the `Authorization` header:  
```json
{
  "Authorization": "Bearer jwt_token"
}
```  

## Error Handling  

- `200 OK` – Request was successful.  
- `400 Bad Request` – Invalid request format.  
- `401 Unauthorized` – Missing or invalid authentication.  
- `404 Not Found` – Requested resource does not exist.  
- `500 Internal Server Error` – Unexpected server error.  

## Installation  

1. Clone the repository:  
   ```sh
   git clone https://github.com/yourusername/linkpreviewapi.js.git
   ```  
2. Install dependencies:  
   ```sh
   cd linkpreviewapi.js  
   npm install  
   ```  
3. Start the server:  
   ```sh
   npm start  
   ```  

## License  

This project is open-source and available under the MIT License.