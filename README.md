# Weather Subscription Service

A NestJS application that allows users to subscribe to weather updates for their city.

## Preview

http://weather-service-26292-alb-1151483928.us-east-2.elb.amazonaws.com/

## Features

- Get current weather for any city
- Subscribe to weather updates (hourly or daily)
- Email confirmation system
- Easy unsubscribe option
- PostgreSQL database
- Docker support

## Prerequisites

- Node.js 18 or later
- PostgreSQL database
- WeatherAPI.com API key
- SMTP server for sending emails

## Setup

1. Clone the repository
2. Create `.env` file with the following configuration:

```env
# Database
DB_HOST=your_db_host
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=postgres

# Weather API
WEATHER_API_KEY=your_weather_api_key

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com

# Application
APP_URL=http://localhost:3000
```

3. Install dependencies:

```bash
yarn install
```

## Running the Application

### Development

```bash
yarn start:dev
```

### Production with Docker

```bash
docker-compose up -d
```

## API Endpoints

- `GET /api/weather?city={city}` - Get current weather for a city
- `POST /api/subscribe` - Subscribe to weather updates
  - Body: `email`, `city`, `frequency` (hourly/daily)
  - Content-Type: application/json or application/x-www-form-urlencoded
- `GET /api/subscribe/confirm/{token}` - Confirm subscription
- `GET /api/subscribe/unsubscribe/{token}` - Unsubscribe from updates

## Web Interface

A simple web interface is available at `http://localhost:3000` for subscribing to weather updates.

## Environment Variables

- `DB_*` - PostgreSQL database configuration
- `WEATHER_API_KEY` - WeatherAPI.com API key
- `SMTP_*` - SMTP server configuration
- `APP_URL` - Application URL for email links

## License

MIT
