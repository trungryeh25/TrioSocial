# 📘 API Documentation - Community Platform Backend

This document provides an overview of the API endpoints, authentication methods, and request/response formats for the Community Platform backend.

---

## 🌐 Base URL

```
http://localhost:3000/api
```

Replace with the actual domain in production.

---

## 🔐 Authentication

All protected routes require a **Bearer Token** (JWT) in the `Authorization` header.

**Example:**

```
Authorization: Bearer <your_token>
```

---

## 🧑‍💻 Auth Module

### `POST /auth/register`

Register a new user.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "strongpassword",
  "username": "user123"
}
```

**Response:**

```json
{
  "accessToken": "jwt-token",
  "user": {
    "id": 1,
    "username": "user123",
    "email": "user@example.com"
  }
}
```

---

### `POST /auth/login`

Log in an existing user.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "strongpassword"
}
```

**Response:**

```json
{
  "accessToken": "jwt-token",
  "user": {
    "id": 1,
    "username": "user123",
    "email": "user@example.com"
  }
}
```

---

## 👤 Profile Module

### `GET /profile/me`

> Requires JWT.

Get the authenticated user's profile.

**Response:**

```json
{
  "id": 1,
  "username": "user123",
  "bio": "Hi there!",
  "avatarUrl": "https://..."
}
```

---

### `PATCH /profile`

Update user profile.

**Request:**

```json
{
  "bio": "Developer",
  "avatarUrl": "https://..."
}
```

---

## 📝 Post Module

### `GET /posts`

List posts (pagination supported).

**Query params (optional):**

- `page`: number (default: 1)
- `limit`: number (default: 10)

---

### `POST /posts`

> Requires JWT.

Create a new post.

**Request:**

```json
{
  "title": "Hello World",
  "content": "My first post!",
  "tags": ["intro", "hello"]
}
```

---

## 💬 Comment Module

### `POST /comments`

> Requires JWT.

Add a comment to a post.

**Request:**

```json
{
  "postId": 1,
  "content": "This is great!"
}
```

---

## 🔔 Notification Module

### `GET /notifications`

> Requires JWT.

Retrieve all notifications for the logged-in user.

**Response:**

```json
[
  {
    "id": 1,
    "type": "COMMENT",
    "message": "UserA commented on your post.",
    "isRead": false,
    "createdAt": "2025-06-17T10:00:00.000Z"
  }
]
```

---

## 🏷 Tag Module

### `GET /tags`

Retrieve all tags (or trending tags if implemented).

**Response:**

```json
["intro", "news", "devlog"]
```

---

## ❌ Error Response Format

All error responses follow this structure:

```json
{
  "statusCode": 400,
  "message": "Invalid credentials",
  "error": "Bad Request"
}
```

---

## 📚 Swagger UI

You can browse the full API documentation at:

```
http://localhost:3000/api/docs
```

Swagger is auto-generated using `@nestjs/swagger`.

---

## 🧪 Example curl (JWT)

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/profile/me
```

---

## 🗂 Changelog

- `v1.0` - Initial version (Auth, Profile, Posts, Comments, Notifications)
