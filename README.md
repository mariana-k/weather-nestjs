# Weather Subscription Service

A NestJS application that allows users to subscribe to weather updates for their city.

## Features

- Get current weather for any city
- Subscribe to weather updates (hourly or daily)
- Email confirmation system
- Easy unsubscribe option
- Docker support

## Prerequisites

- Node.js 18 or later
- Docker and Docker Compose (for containerized setup)
- WeatherAPI.com API key
- SMTP server for sending emails

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your configuration:
   ```bash
   cp .env.example .env
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
- `GET /api/confirm/{token}` - Confirm subscription
- `GET /api/unsubscribe/{token}` - Unsubscribe from updates

## Web Interface

A simple web interface is available at `http://localhost:3000` for subscribing to weather updates.

## Environment Variables

- `DB_*` - Database configuration
- `WEATHER_API_KEY` - WeatherAPI.com API key
- `SMTP_*` - SMTP server configuration
- `APP_URL` - Application URL for email links

## License

MIT
