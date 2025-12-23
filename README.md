# Name Day Backend API

A RESTful API that provides international name-day data by month, date, and country (Polish and Hungarian). Designed for fast read access, clean routing, and simple deployment.

Live backend demo: https://name-day-backend-0d74dcea0ed2.herokuapp.com
Live frontend demo: https://karoly-git.github.io/name-day-frontend/

---

## Tech Stack

- Node.js
- Express.js
- In-memory JSON data
- GitHub (source control)
- Heroku (deployment)

---

## API Endpoints

### Get all name days
GET /

### Get name days for a month
GET /:month  
Example: /january

### Get name days for a specific date
GET /:month/:date  
Example: /january/1

### Get name days for a specific country
GET /:month/:date/:country  
Example: /january/1/us

### Health check
GET /health

Response:
```json
{
  "status": "ok"
}

Design Decisions

This API uses explicit routes instead of optional wildcard parameters to avoid ambiguity and improve maintainability. Input normalization is applied to ensure consistent API behavior regardless of casing. The application relies on in-memory data for simplicity and fast read access; in a production environment, this could be replaced with a database or cache layer such as PostgreSQL or Redis. A health endpoint is included to support deployment monitoring and uptime checks.

Testing (Planned)

Planned tests using Jest and Supertest include endpoint availability, valid data responses, invalid month/date/country handling, and verification of the health check endpoint.

Project Structure

.
├── src
│ └── data.js
├── index.js
├── package.json
└── README.md

Local Development

Install dependencies:
npm install

Run the server:
npm start

The API will be available at:
http://localhost:8000

You can override the port using a .env file:
PORT=3000

Deployment

This project uses GitHub-based continuous deployment. Every push to the master branch triggers an automatic deployment on Heroku. Environment variables are managed via Heroku config vars.

Future Improvements

API versioning (/api/v1)

Caching headers

Rate limiting

Full test coverage

OpenAPI / Swagger documentation

Author

Karoly
Backend-focused JavaScript developer


---

This version is **clean, continuous, and portfolio-safe** — no broken sections, no confusing splits.

If you want next, I can:
- convert this to **OpenAPI / Swagger**
- add **badges** (deploy status, Node version)
- rewrite it in a slightly more “recruiter-facing” tone

You’re doing great — this is the polish phase now.

