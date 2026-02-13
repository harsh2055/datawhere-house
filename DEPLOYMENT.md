# Deployment Guide

This guide covers deploying DataWhere House to production environments.

## Table of Contents
1. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
2. [Backend Deployment (Render)](#backend-deployment-render)
3. [Database Setup](#database-setup)
4. [Environment Variables](#environment-variables)
5. [Docker Deployment](#docker-deployment)
6. [CI/CD Setup](#cicd-setup)

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository

### Steps

1. **Install Vercel CLI** (optional)
```bash
npm install -g vercel
```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

3. **Set Environment Variables**
   - Add in Vercel Dashboard → Settings → Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.com
   VITE_APP_NAME=DataWhere House
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main branch

### Custom Domain

1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## Backend Deployment (Render)

### Prerequisites
- Render account
- PostgreSQL database
- Redis instance

### Steps

1. **Create New Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   ```
   Name: datawhere-api
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

3. **Set Environment Variables**
   ```
   SECRET_KEY=<generate-secure-key>
   DATABASE_URL=<postgres-connection-string>
   REDIS_URL=<redis-connection-string>
   CORS_ORIGINS=https://your-frontend-url.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy

### Health Check
- Set health check path to `/api/health`
- This endpoint returns service status

## Database Setup

### PostgreSQL on Render

1. **Create PostgreSQL Database**
   - In Render Dashboard → New + → PostgreSQL
   - Choose region and plan
   - Note the connection string

2. **Run Migrations**
```bash
# Connect to database
psql <DATABASE_URL>

# Create tables
python -c "from models import Base; from sqlalchemy import create_engine; engine = create_engine('<DATABASE_URL>'); Base.metadata.create_all(engine)"
```

### Redis Setup

1. **Create Redis Instance**
   - Render Dashboard → New + → Redis
   - Choose region and plan
   - Note the connection string

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://api.datawherehouse.com
VITE_APP_NAME=DataWhere House
```

### Backend (.env)
```env
SECRET_KEY=<your-secure-secret-key>
DATABASE_URL=postgresql://user:password@host:5432/database
REDIS_URL=redis://host:6379
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=https://datawherehouse.com,https://www.datawherehouse.com
```

## Docker Deployment

### Build Images

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Backend Dockerfile:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/datawhere
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: datawhere
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

### Deploy with Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        env:
          RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
        run: |
          curl -X POST "https://api.render.com/v1/services/$RENDER_SERVICE_ID/deploys" \
            -H "Authorization: Bearer $RENDER_API_KEY"
```

## Performance Optimization

### Frontend
- Enable Vercel Edge Network
- Configure caching headers
- Enable compression
- Use CDN for static assets

### Backend
- Use Redis for caching
- Enable database connection pooling
- Configure rate limiting
- Use async operations

## Monitoring

### Set up monitoring tools:
- **Sentry** - Error tracking
- **New Relic** - Performance monitoring
- **Datadog** - Infrastructure monitoring
- **LogRocket** - Session replay

## Security Checklist

- [ ] Set strong SECRET_KEY
- [ ] Enable HTTPS only
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable database encryption
- [ ] Set up automated backups
- [ ] Configure firewall rules
- [ ] Enable DDoS protection
- [ ] Set up SSL certificates
- [ ] Implement API authentication

## Scaling

### Horizontal Scaling
- Use Render auto-scaling
- Configure Redis cluster
- Use PostgreSQL read replicas

### Vertical Scaling
- Upgrade Render instance size
- Optimize database queries
- Implement caching strategy

## Backup Strategy

### Database Backups
- Daily automated backups on Render
- Keep 7 days of backups
- Test restore process monthly

### File Storage Backups
- Use S3 versioning
- Cross-region replication
- Lifecycle policies for old data

## Support

For deployment issues:
- Check [Render Docs](https://render.com/docs)
- Check [Vercel Docs](https://vercel.com/docs)
- Contact: devops@datawherehouse.com