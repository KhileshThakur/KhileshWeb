
# Backend Developer Guide

**Project:** Khilesh Web  
**Version:** 1.0.0  
**Base URL:** `http://localhost:5000/api`

This document describes NPM scripts, authentication, and the REST API specification for the backend.

---

## 1. NPM Scripts

Defined in `package.json`:

| Script                 | Command                | Description                              |
|------------------------|------------------------|------------------------------------------|
| `npm run dev`          | `nodemon server.js`    | Start server in development (hot reload) |
| `npm start`            | `node server.js`       | Start server in production mode          |
| `npm test`             | `jest ...`             | Run test suite (test database)           |
| `npm run test:coverage`| `jest --coverage`      | Generate code coverage report            |
| `npm run data:push`    | `node seeder.js`       | Wipe DB and insert dummy data            |
| `npm run data:destroy` | `node seeder.js -d`    | Delete all data from database            |

---

## 2. Authentication

The backend uses JWT (JSON Web Token).

- All **GET** requests are public.
- All **POST, PUT, DELETE** requests require authentication.

### Login

**POST** `/api/auth/login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "your_secure_password"
}
```

**Response:**
```json
{
  "_id": "65a...",
  "username": "admin",
  "token": "eyJhbGciOiJIUzI1Ni..."
}
```

**Protected Route Header:**
```
Authorization: <jwt_token_string>
```

---

## 3. API Reference

All endpoints support: **GET**, **POST**, **PUT**, and **DELETE**.

### 3.1 Developer (`/api/developer`)

#### Skills (`/developer/skills`)
**Body:**
```json
{
  "category": "LANGUAGES",
  "name": "JavaScript",
  "level": 5,
  "xp": "5 Yrs",
  "icon": "Code2"
}
```

#### Projects (`/developer/projects`)
**Body:**
```json
{
  "title": "E-Commerce Platform",
  "desc": "Full stack app with Stripe integration.",
  "tech": ["MERN", "Redux"],
  "year": "2024",
  "image": "https://example.com/image.jpg"
}
```

#### Services (`/developer/services`)
**Body:**
```json
{
  "title": "API Development",
  "icon": "server",
  "desc": "Building robust REST APIs.",
  "tags": ["Node", "Express"]
}
```

### 3.2 Designer (`/api/designer`)

#### Gallery (`/designer/gallery`)
**Body:**
```json
{
  "title": "Neon Dashboard",
  "category": "UI Design",
  "image": "https://example.com/design.jpg",
  "tags": ["Figma", "Dark Mode"],
  "link": "https://dribbble.com/"
}
```

#### Tools (`/designer/tools`)
**Body:**
```json
{
  "name": "Figma",
  "icon": "figma-icon-url",
  "level": "Expert"
}
```

#### Services (`/designer/services`)
**Body:**
```json
{
  "title": "UI/UX Design",
  "icon": "pen-tool",
  "desc": "Creating intuitive interfaces.",
  "items": ["Wireframing", "Prototyping"]
}
```

### 3.3 Creator (`/api/creator`)

#### Sketches (`/creator/sketches`)
**Body:**
```json
{
  "title": "Urban Sketch",
  "date": "Jan 2024",
  "img": "https://example.com/sketch.jpg"
}
```

#### Books (`/creator/books`)
**Body:**
```json
{
  "title": "The Clean Coder",
  "author": "Robert Martin",
  "desc": "Professionalism in coding.",
  "cover": "https://example.com/book.jpg"
}
```

#### Thoughts (`/creator/thoughts`)
**Body:**
```json
{
  "date": "10 Oct",
  "text": "Consistency is key."
}
```

### 3.4 Blogger (`/api/blogger`)

#### Snippets (`/blogger/snippets`)
**Body:**
```json
{
  "cat": "JavaScript",
  "title": "Debounce",
  "code": "function debounce(...) { ... }"
}
```

#### Roadmaps (`/blogger/roadmaps`)
**Body:**
```json
{
  "title": "MERN Stack",
  "level": "Intermediate",
  "steps": [
    { "title": "Frontend", "desc": "Learn React" },
    { "title": "Backend", "desc": "Learn Node" }
  ]
}
```

#### Articles (`/blogger/articles`)
Supports dynamic content: paragraphs, lists, code blocks, headings.

**Body:**
```json
{
  "title": "Mastering React",
  "date": "OCT 2024",
  "tags": ["React", "Web"],
  "image": "https://example.com/banner.jpg",
  "desc": "Deep dive into React.",
  "content": [
    { "type": "p", "text": "Intro paragraph here." },
    { "type": "h2", "text": "Section Header" },
    { "type": "code", "lang": "js", "text": "console.log('Hello');" },
    { "type": "ul", "items": ["Point 1", "Point 2"] }
  ]
}
```

---

## 4. Testing Notes

- Tests use separate database: `khilesh-web-test`.
- Use `npm run test:coverage` for coverage reports.

---

## 5. Notes

- All mutating requests require JWT authorization.
- Seeder scripts reset all data — **do not run in production**.