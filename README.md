# TLS Checker API

A RESTful API service that checks TLS/SSL certificates for domains. Built with Express.js, this service provides endpoints to verify TLS configurations for single or multiple domains simultaneously.

## Features

- Health check endpoint
- Single domain TLS verification
- Bulk domain TLS verification
- Input validation
- CORS enabled
- Error handling
- Configurable timeout and concurrency

## API Endpoints

### Health Check

```sh
GET /health
```

Returns the service status and current timestamp.

### Check Single Domain

```sh
GET /check?domain=example.com
```

Checks TLS configuration for a single domain.

### Check Multiple Domains

```sh
POST /check-multiple
Content-Type: application/json

{
    "domains": ["example.com", "google.com"]
}
```

Performs bulk TLS checks for multiple domains.

## Installation

1. Install dependencies:

    ```bash
    npm install
    ```

2. Start the server:

    ```bash
    npm start
    ```

The server will start on port 3000 by default. You can override this by setting the `PORT` environment variable.

## Environment Variables

- `PORT`: Server port (default: 3000)

## Dependencies

- express
- cors
- express-validator
- @BAYRYO/tls-checker

## Error Handling

The API includes validation for:

- Valid domain formats
- Array input for bulk checking
- TLS verification errors

Errors are returned with appropriate HTTP status codes and error messages.

## Example Response

```json
{
    "status": "ok",
    "timestamp": "2023-11-14T12:00:00.000Z"
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
