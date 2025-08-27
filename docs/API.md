# API Documentation

## Base URL
- Development: `http://localhost:3000/api`
- Production: `https://zalpay-premium.vercel.app/api`

## Authentication

All admin endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": {
    // Response data
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Endpoints

### Authentication

#### POST `/auth/login`
Admin login

**Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@zalpay.com",
      "role": "admin"
    },
    "token": "jwt_token_here"
  }
}
```

#### GET `/auth/profile`
Get current user profile (Protected)

#### PUT `/auth/change-password`
Change password (Protected)

**Body:**
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

### Applications

#### GET `/apps`
Get all applications

**Response:**
```json
{
  "success": true,
  "data": {
    "apps": [
      {
        "id": 1,
        "name": "Spotify Premium",
        "slug": "spotify-premium",
        "price": 18000,
        "variants": ["Individual", "Duo", "Family"],
        "available": true,
        "image_path": "/images/apps/spotify-premium.png",
        "description": "Streaming musik tanpa iklan"
      }
    ]
  }
}
```

#### GET `/apps/slug/:slug`
Get application by slug

#### POST `/apps`
Create new application (Admin only)

**Body (multipart/form-data):**
```
name: "App Name"
slug: "app-slug"
price: 25000
variants: ["Variant 1", "Variant 2"]
description: "App description"
image: file
```

#### PUT `/apps/:id`
Update application (Admin only)

#### DELETE `/apps/:id`
Delete application (Admin only)

#### PATCH `/apps/:id/availability`
Toggle application availability (Admin only)

**Body:**
```json
{
  "available": true
}
```

### Orders

#### POST `/orders`
Create new order

**Body:**
```json
{
  "app_id": 1,
  "variant": "Individual",
  "quantity": 1,
  "customer_info": {
    "name": "John Doe",
    "email": "john@email.com",
    "phone": "08123456789"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order berhasil dibuat",
  "data": {
    "order": {
      "id": 1,
      "order_id": "ZP1234567890",
      "app_name": "Spotify Premium",
      "variant": "Individual",
      "quantity": 1,
      "total_price": 18000,
      "status": "pending",
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### GET `/orders`
Get all orders (Admin only)

#### GET `/orders/order-id/:orderId`
Get order by order ID

#### GET `/orders/stats`
Get order statistics (Admin only)

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total_orders": 150,
      "completed_orders": 120,
      "pending_orders": 25,
      "total_revenue": 3500000
    }
  }
}
```

#### PUT `/orders/:id/status`
Update order status (Admin only)

**Body:**
```json
{
  "status": "completed"
}
```

**Valid status values:**
- `pending`
- `processing`
- `completed`
- `cancelled`

#### DELETE `/orders/:id`
Delete order (Admin only)

## Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

- No rate limiting implemented currently
- Consider implementing rate limiting for production use

## File Upload

- Maximum file size: 5MB
- Allowed image types: JPEG, PNG, WebP
- Files uploaded to Vercel Blob storage
- Returns public URL in response
