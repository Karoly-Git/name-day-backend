# Name Day Backend API

A RESTful API that provides international name-day data by month, date, and country (Poland and Hungary only). Designed for fast read access, clean routing, and simple deployment.

🔗 Live frontend demo: https://karoly-git.github.io/name-day-frontend/  
🔗 Backend API: https://name-day-backend-0d74dcea0ed2.herokuapp.com/  
🔗 Swagger / OpenAPI: https://name-day-backend-0d74dcea0ed2.herokuapp.com/api-docs

---

## Tech Stack

- Node.js
- Express.js
- In-memory JSON data
- GitHub (source control)
- Heroku (deployment)

---

## API Endpoints

### Base URL
GET /
Response:
```json
{
"message": "Name Days API",
"docs": "/api-docs",
"version": "v1",
"basePath": "/api/v1"
}
```

### Health check
GET /health
Response:
```json
{
  "status": "ok"
}
```

### Get all name days
GET /api/v1/namedays

### Get name days for a month
GET /api/v1/namedays/:month  
Example: /api/v1/namedays/january

### Get name days for a specific date
GET /api/v1/namedays/:month/:date  
Example: /api/v1/namedays/january/1

### Get name days for a specific country
GET /api/v1/namedays/:month/:date/:country  
Example: /api/v1/namedays/january/1/pl

---

## Design Decisions

This API uses explicit routes instead of optional wildcard parameters to avoid ambiguity and improve maintainability. Input normalization is applied to ensure consistent API behavior regardless of casing. The application relies on in-memory data for simplicity and fast read access; in a production environment, this could be replaced with a database or cache layer such as PostgreSQL or Redis. A health endpoint is included to support deployment monitoring and uptime checks.

---

## Testing (Planned)

Planned tests using Jest and Supertest include:
- Endpoint availability
- Valid data responses
- Invalid month/date/country handling
- Health check endpoint verification

---

## Project Structure

```text
.
├─ server.js
├─ app.js
├─ swagger.js
├─ package.json
├─ .env
├─ .gitignore
└─ src
   ├─ data
   │  └─ namedays.data.js
   ├─ routes
   │  └─ v1
   │     └─ namedays.routes.js
   ├─ controllers
   │  └─ namedays.controller.js
   ├─ middleware
   │  ├─ cache.middleware.js
   │  └─ rateLimit.middleware.js
   └─ utils
      └─ cache.js
```

---

## Local Development

Install dependencies:
```bash
npm install
```

Run the development local server:
```bash
nodemon index.js
```

The API will be available at:
```
http://localhost:8000/
```

You can override the port using a `.env` file:
```
PORT=3000
```

---

## Deployment

This project uses GitHub-based continuous deployment. Every push to the `master` branch triggers an automatic deployment on Heroku. Environment variables are managed via Heroku config vars.

---

## Future Improvements

- Full test coverage

---

## Author

**Karoly Hornyak**  
Full-Stack Web Developer  
karoly.webdev@gmail.com  
https://karolyhornyak.co.uk/
