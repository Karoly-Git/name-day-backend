# Name Day API

The **Name Day API** provides name day information for the entire year, with filtering options by **month**, **date**, and **country**.  
It currently supports **Hungary (`hu`)** and **Poland (`pl`)**.

The API is versioned, rate-limited, cached, and documented using **OpenAPI (Swagger)**.

---

## 🌍 Base URL

### Production
```
https://name-day-backend-0d74dcea0ed2.herokuapp.com
```

### API Base Path
```
/api/v1
```

---

## 📘 API Documentation (OpenAPI)

Interactive API documentation is available via Swagger UI:

```
GET /api-docs
```

---

## 🚀 Endpoints

### Get name day data for the entire year
```
GET /api/v1/namedays
```

### Get name day data by month
```
GET /api/v1/namedays/{month}
```

### Get name day data by month and date
```
GET /api/v1/namedays/{month}/{date}
```

### Get name day data by month, date, and country
```
GET /api/v1/namedays/{month}/{date}/{country}
```

---

## ⚙️ API Behavior

### Rate Limiting
- 300 requests per IP
- 15-minute window

### Caching
- Server-side caching
- TTL: 60 seconds
- Cache key: full request URL

---

## 📜 Terms of Service

By using this API, you agree to the Terms of Service:

https://karoly-git.github.io/name-day-frontend/

---

## 👤 Contact

**Karoly Hornyak**  
📧 karoly.webdev@gmail.com  
🌐 https://karolyhornyak.com
