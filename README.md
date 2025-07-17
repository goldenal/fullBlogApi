<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


 

## Description
https://roadmap.sh/projects/blogging-platform-api
[Nest](https://github.com/nestjs/nest) framework TypeScript  Sample Blog API repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## API Documentation

### Base URL

```
http://localhost:3000/posts
```

### Endpoints

#### Create a New Blog Post

- **POST** `/posts`
- **Request Body:**
  ```json
  {
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"]
  }
  ```
- **Success Response:**
  - **Code:** 201 Created
  - **Body:**
    ```json
    {
      "_id": "<ObjectId>",
      "title": "My First Blog Post",
      "content": "This is the content of my first blog post.",
      "category": "Technology",
      "tags": ["Tech", "Programming"],
      "createdAt": "2021-09-01T12:00:00Z",
      "updatedAt": "2021-09-01T12:00:00Z",
      "__v": 0
    }
    ```
- **Error Response:**
  - **Code:** 400 Bad Request (validation errors)

---

#### Get All Blog Posts

- **GET** `/posts`
- **Query Parameters:**
  - `term` (optional): Filter posts by search term (matches title, content, category, or tags)
- **Success Response:**
  - **Code:** 200 OK
  - **Body:** Array of blog posts

---

#### Get a Single Blog Post

- **GET** `/posts/:id`
- **Success Response:**
  - **Code:** 200 OK
  - **Body:** Blog post object
- **Error Response:**
  - **Code:** 404 Not Found (if not found or invalid id)

---

#### Update a Blog Post

- **PUT** `/posts/:id`
- **Request Body:**
  ```json
  {
    "title": "My Updated Blog Post",
    "content": "This is the updated content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"]
  }
  ```
- **Success Response:**
  - **Code:** 200 OK
  - **Body:** Updated blog post object
- **Error Response:**
  - **Code:** 400 Bad Request (validation errors)
  - **Code:** 404 Not Found (if not found or invalid id)

---

#### Delete a Blog Post

- **DELETE** `/posts/:id`
- **Success Response:**
  - **Code:** 204 No Content
- **Error Response:**
  - **Code:** 404 Not Found (if not found or invalid id)

---

### Error Handling
- All validation errors return a 400 status with details.
- Not found or invalid IDs return a 404 status.

---

### Example cURL Requests

**Create:**
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"]
  }'
```

**Get All:**
```bash
curl http://localhost:3000/posts
```

**Get by ID:**
```bash
curl http://localhost:3000/posts/<id>
```

**Update:**
```bash
curl -X PUT http://localhost:3000/posts/<id> \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Updated Blog Post",
    "content": "This is the updated content of my first blog post.",
    "category": "Technology",
    "tags": ["Tech", "Programming"]
  }'
```

**Delete:**
```bash
curl -X DELETE http://localhost:3000/posts/<id>
```
