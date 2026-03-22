# Bistro-Nord Backend

## Project Overview
The Bistro-Nord Backend is a serverless application designed to manage restaurant functionalities including reservations, menu management, and customer interactions. It leverages various AWS services to create a scalable and efficient backend.

## Architecture
The architecture of the Bistro-Nord Backend consists of AWS Lambda functions, API Gateway, DynamoDB for the database, and S3 for static file hosting. The following diagram illustrates the components:

```
[API Gateway] --> [AWS Lambda Functions] --> [DynamoDB]
```

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/srinivas-pradhan/bistro-nord-backend.git
   ```
2. Navigate to the project folder:
   ```bash
   cd bistro-nord-backend
   ```
3. Install the necessary dependencies.

## API Endpoints
- **GET /api/menu**: Retrieve the restaurant menu.
- **POST /api/reservations**: Create a new reservation.
- **GET /api/reservations/{id}**: Retrieve reservation details.

## Deployment
To deploy the Bistro-Nord Backend:
1. Ensure you have the AWS CLI configured.
2. Use the serverless framework:
   ```bash
   serverless deploy
   ```

## Development Guide
- For local development, you can use the Serverless Offline plugin to simulate AWS services:
   ```bash
   serverless offline
   ```
- Test the functions locally before deployment.

## License
This project is licensed under the MIT License.

