# Server Connection Guide

This guide explains how to connect your React frontend to your friend's server.

## Configuration

### 1. Update Server URL

The main configuration is in `src/config/api.ts`. Update the `BASE_URL` to match your friend's server:

```typescript
export const API_CONFIG = {
  BASE_URL: "http://localhost:5000/api", // Change this to your friend's server URL
  // ...
};
```

### 2. Environment Variables (Optional)

For production, you can use environment variables. Create a `.env` file in the root directory:

```env
VITE_API_URL=http://your-friends-server-url/api
```

## API Endpoints

The following endpoints are configured to work with your friend's server:

### Authentication

- **POST** `/api/User/login` - User login
- **POST** `/api/User/register` - User registration

### User Management

- **PUT** `/api/User/update/{id}` - Update user
- **DELETE** `/api/User/delete?id={id}` - Delete user
- **GET** `/api/User/GetAll` - Get all users

## Data Structure

The frontend has been updated to match your friend's server data structure:

### User Model

```typescript
interface User {
  id: number;
  name: string; // Required
  password: string; // Required
  email?: string; // Optional
  phone?: string; // Optional
}
```

### Login Request

```typescript
{
  name: string; // User's name
  password: string; // User's password
}
```

### Register Request

```typescript
{
  name: string;        // User's full name
  password: string;    // User's password
  email?: string;      // User's email (optional)
  phone?: string;      // User's phone (optional)
}
```

## Changes Made

1. **Created API Service** (`src/services/api.ts`)

   - Handles HTTP requests to the server
   - Includes error handling and response formatting

2. **Updated Auth Hook** (`src/hooks/useAuth.ts`)

   - Now uses real API calls instead of mock data
   - Matches server's data structure

3. **Updated Login Component** (`src/pages/Login.tsx`)

   - Changed from ID number to name field
   - Updated validation schema

4. **Updated Register Component** (`src/pages/Register.tsx`)

   - Simplified form to match server requirements
   - Removed ID number field

5. **Updated Auth Slice** (`src/store/slices/authSlice.ts`)
   - Updated User interface to match server model

## Testing

1. Start your friend's server
2. Update the `BASE_URL` in `src/config/api.ts`
3. Run your React application: `npm run dev`
4. Test login and registration functionality

## Troubleshooting

### CORS Issues

If you encounter CORS errors, make sure your friend's server has CORS enabled:

```csharp
[EnableCors]
public class UserController : ControllerBase
{
    // Your controller code
}
```

### Network Errors

- Check if the server URL is correct
- Ensure the server is running
- Verify the API endpoints match exactly

### Data Validation Errors

- Make sure all required fields are provided
- Check that the data types match the server's expectations

## Notes

- The server expects `name` and `password` for login
- The server validates that `name` and `password` are not null/empty
- The server checks for existing users during registration
- All API responses are wrapped in a standard format with success/error indicators
