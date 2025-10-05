# Microservices Architecture - Email Notification with RabbitMQ

A modern, scalable microservices application built with NestJS, featuring asynchronous communication via RabbitMQ and comprehensive user management with automated email notifications.

## 🏗️ Architecture Overview

This project demonstrates a **distributed microservices architecture** with two independent services communicating through message queues:

- **API Service**: Handles user registration, data persistence, and business logic
- **Mail Service**: Processes email notifications asynchronously

### System Flow
```
Client Request → API Service → Database (PostgreSQL) → RabbitMQ → Mail Service → Email Delivery
```

## 🚀 Key Features

### API Service
- **User Registration**: Complete user creation with validation
- **Password Security**: Bcrypt hashing for secure password storage
- **Database Integration**: PostgreSQL with TypeORM for robust data persistence
- **Message Queue Integration**: RabbitMQ for asynchronous communication
- **Input Validation**: Class-validator for request validation
- **Error Handling**: Comprehensive exception management

### Mail Service
- **Asynchronous Processing**: Message queue consumer for email notifications
- **Email Delivery**: Nodemailer integration with SMTP support
- **Event-Driven Architecture**: Responds to user creation events
- **Scalable Design**: Independent service for horizontal scaling

## 🛠️ Technology Stack

### Backend Framework
- **NestJS**: Modern Node.js framework with TypeScript
- **TypeScript**: Type-safe development
- **Class-validator**: Input validation and sanitization

### Database & ORM
- **PostgreSQL**: Relational database for data persistence
- **TypeORM**: Object-Relational Mapping with decorators

### Message Queue & Communication
- **RabbitMQ**: Message broker for inter-service communication
- **AMQP**: Advanced Message Queuing Protocol
- **CloudAMQP**: Managed RabbitMQ service

### Email Service
- **Nodemailer**: Email delivery library
- **SMTP**: Email protocol support
- **Ethereal Email**: Testing email service

### Security & Validation
- **Bcrypt**: Password hashing and security
- **Class-validator**: Request validation
- **Class-transformer**: Data transformation

## 📁 Project Structure

```
microsservices/
├── api_service/                 # User management microservice
│   ├── src/
│   │   ├── user/               # User module
│   │   │   ├── entities/       # Database entities
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.module.ts
│   │   ├── dto/                # Data Transfer Objects
│   │   │   ├── http/           # HTTP request/response DTOs
│   │   │   └── data/           # Internal data DTOs
│   │   ├── db/                 # Database configuration
│   │   ├── rabbitMq/           # Message queue service
│   │   └── main.ts
│   └── package.json
│
└── mail_service/               # Email notification microservice
    ├── src/
    │   ├── consumer/           # Message consumer module
    │   │   ├── consumer.controller.ts
    │   │   ├── consumer.service.ts
    │   │   └── consumer.module.ts
    │   ├── dto/                # Message DTOs
    │   └── main.ts
    └── package.json
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- RabbitMQ (or CloudAMQP account)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd microsservices
```

### 2. Install Dependencies
```bash
# Install API Service dependencies
cd api_service
npm install

# Install Mail Service dependencies
cd ../mail_service
npm install
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb db_nest

# Update database credentials in api_service/src/db/db.config.ts
```

### 4. RabbitMQ Configuration
Update RabbitMQ connection string in `api_service/src/rabbitMq/rabbitmq.service.ts`:
```typescript
urls: ['amqps://your-credentials@your-instance.rmq.cloudamqp.com/your-vhost']
```
You can use my url in cloudmqp!

### 5. Environment Variables
Create `.env` files for each service with appropriate configuration.

## 🚀 Running the Application

### Development Mode

#### Start API Service
```bash
cd api_service
npm nest start
```
Service will be available at `http://localhost:3000`

#### Start Mail Service
```bash
cd mail_service
npm nest start
```

### Production Mode
```bash
# Build services
npm run build

# Start in production
npm run start:prod
```

## 📡 API Endpoints

### User Management (API Service)

#### Create User
```http
POST /createUser
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "Message": "Create user with success"
}
```

## 🔄 Message Flow

1. **User Registration**: Client sends POST request to API Service
2. **Data Validation**: Input validation using class-validator
3. **Password Hashing**: Secure password hashing with bcrypt
4. **Database Persistence**: User data saved to PostgreSQL
5. **Message Publishing**: Email notification message sent to RabbitMQ
6. **Email Processing**: Mail Service consumes message from queue
7. **Email Delivery**: Welcome email sent to user's email address

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Built with ❤️ using NestJS, TypeScript, PostgreSQL, and RabbitMQ**
