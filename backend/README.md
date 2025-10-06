# Kids Painting Backend

Spring Boot REST API for the Kids Painting website.

## Setup

1. Ensure PostgreSQL is running
2. Update `application.yml` with your database credentials
3. Run `./mvnw spring-boot:run`

## Endpoints

See Swagger UI at: `http://localhost:8080/api/swagger-ui.html`

## Database Schema

```sql
CREATE TABLE paintings (
    id BIGSERIAL PRIMARY KEY,
    url_key VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    tags VARCHAR(1000),
    image_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) NOT NULL,
    difficulty INTEGER,
    color_palette TEXT,
    svg_path TEXT,
    featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

## Configuration

Edit `src/main/resources/application.yml`:

- Database connection
- Server port
- CORS settings
- File storage path
