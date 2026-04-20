# Symfony Backend Integration Guide

This document outlines how to integrate the Vue 3 learning platform with a Symfony backend.

## Setup

### Environment Variables

The API configuration uses environment variables defined in `.env.local`:

```env
VITE_API_URL=http://localhost:8000
```

For production, update this to your production API URL:
```env
VITE_API_URL=https://api.yourdomain.com
```

## API Client

The project includes a reusable API client in `src/config/api.ts`:

```typescript
import { apiClient } from '@/config/api'

// GET request
const data = await apiClient.get('/api/endpoint')

// POST request
const result = await apiClient.post('/api/endpoint', { key: 'value' })

// PUT request
const updated = await apiClient.put('/api/endpoint/123', { key: 'newValue' })

// DELETE request
await apiClient.delete('/api/endpoint/123')
```

## Store Integration

Each store has a `fetch` method that fetches data from the Symfony backend. Update the TODO comments with actual API calls:

### Messages Store

```typescript
const fetchMessages = async () => {
  const data = await apiClient.get('/api/messages')
  messages.value = data
}
```

### Downloads Store

```typescript
const fetchDownloads = async () => {
  const data = await apiClient.get('/api/downloads')
  downloads.value = data
}
```

### User Store (Authentication)

```typescript
const login = async (email: string, password: string) => {
  const data = await apiClient.post('/api/login', { email, password })
  if (data.token) {
    localStorage.setItem('token', data.token)
    currentUser.value = data.user
    isAuthenticated.value = true
    return true
  }
  return false
}
```

## Expected API Responses

### Messages Endpoint: `GET /api/messages`
```json
[
  {
    "id": 1,
    "from": "Admin",
    "subject": "Welcome!",
    "content": "Welcome to the platform.",
    "date": "2023-10-01"
  }
]
```

### Downloads Endpoint: `GET /api/downloads`
```json
[
  {
    "id": 1,
    "name": "Course Material 1",
    "size": "5MB",
    "date": "2023-10-01"
  }
]
```

### Login Endpoint: `POST /api/login`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

## CORS Configuration

Make sure your Symfony backend is configured to accept requests from your Vue app. Add the following to your Symfony `config/packages/nelmio_cors.yaml`:

```yaml
nelmio_cors:
  defaults:
    origin_regex: true
    allow_origin: ['localhost', '127.0.0.1', '%env(CORS_ALLOW_ORIGIN)%']
    allow_credentials: false
    allow_headers: ['Content-Type', 'Authorization']
    allow_methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    max_age: 3600
```

## Authentication with Tokens

For production, implement JWT token authentication:

1. Store the token in localStorage after login
2. Add token to all API requests:

```typescript
async get(endpoint: string) {
  const token = localStorage.getItem('token')
  const headers: any = { 'Content-Type': 'application/json' }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers,
  })
  // ... rest of implementation
}
```

## Testing the Integration

1. Start your Symfony backend: `symfony serve`
2. Start the Vue development server: `npm run dev`
3. Navigate to the application and test the API calls

## Common Issues

- **CORS errors**: Ensure CORS is properly configured on your Symfony backend
- **404 errors**: Check that your API endpoints match the store fetch calls
- **Authentication failures**: Verify that your authentication logic matches the API response format
