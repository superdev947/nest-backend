# NestJS Backend API

A robust and scalable backend API built with NestJS, featuring user authentication, authorization, and user management capabilities.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Local strategy with email/password
  - Passport.js integration
  - Bearer token authentication
  - Secure password hashing with bcrypt

- **User Management**
  - User registration and login
  - CRUD operations for users
  - Protected routes with JWT guards

- **Database**
  - MongoDB integration with Mongoose
  - Robust schema validation

- **API Documentation**
  - Swagger/OpenAPI documentation
  - Interactive API explorer at `/api` endpoint

- **Error Handling**
  - Custom exception filters
  - Validation exception handling
  - Conflict exception handling
  - HTTP exception handling

- **Code Quality**
  - TypeScript for type safety
  - Class validation and transformation
  - Comprehensive unit and e2e tests
  - ESLint and Prettier configuration

## 📋 Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- MongoDB database

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nest-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGO_URL=mongodb://localhost:27017/your-database-name
JWT_SECRET_KEY=your-secret-key-here
PORT=3000
```

## 🚀 Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## 📚 API Documentation

Once the application is running, visit `http://localhost:3000/api` to access the Swagger API documentation.

### Available Endpoints

#### Authentication (`/auth`)
- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Login with email and password

#### User Management (`/user`)
All user endpoints require JWT authentication (Bearer token).

- **GET** `/user` - Get all users
- **GET** `/user/:userID` - Get user by ID
- **PUT** `/user/:userID` - Update user by ID
- **DELETE** `/user/:userID` - Delete user by ID

## 🧪 Testing

### Run Unit Tests
```bash
npm run test
```

### Run E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

### Watch Mode
```bash
npm run test:watch
```

## 🏗️ Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── local.strategy.ts
│   └── guards/
├── user/                 # User module
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.schema.ts
│   └── user.interface.ts
├── config/               # Configuration
│   └── index.ts
├── filter/               # Exception filters
│   ├── http-exception.filter.ts
│   ├── validation-exception.filter.ts
│   └── conflict-exception.filter.ts
├── shared/               # Shared resources
│   ├── logging.interceptor.ts
│   └── ERROR_MESSAGES.ts
├── utils/                # Utility functions
│   └── file-uploading.utils.ts
├── app.module.ts         # Root module
└── main.ts               # Application entry point
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build the application |
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode with hot-reload |
| `npm run start:debug` | Start in debug mode |
| `npm run start:prod` | Start in production mode |
| `npm run lint` | Lint and fix files |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Generate test coverage report |
| `npm run test:e2e` | Run end-to-end tests |

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token expiration (7 days)
- Protected routes with authentication guards
- CORS enabled for cross-origin requests
- Environment variable management for sensitive data

## 🛡️ Error Handling

The application includes custom exception filters for:
- Validation errors
- Conflict errors (e.g., duplicate user registration)
- HTTP exceptions
- Global error handling

## 📦 Key Dependencies

- **@nestjs/core** - NestJS framework
- **@nestjs/mongoose** - MongoDB integration
- **@nestjs/jwt** - JWT authentication
- **@nestjs/passport** - Authentication strategies
- **@nestjs/swagger** - API documentation
- **bcrypt** - Password hashing
- **class-validator** - DTO validation
- **class-transformer** - Object transformation
