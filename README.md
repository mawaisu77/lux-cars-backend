# 🚗 Lux Cars Backend API

A robust and scalable backend API for the Lux Cars automotive auction platform, built with Node.js, Express.js, and PostgreSQL. This API provides comprehensive functionality for real-time bidding, user management, payment processing, and auction management.

## 🌟 Features

### 🔥 Real-time Auction System
- **Live Bidding**: Real-time bidding with sub-second latency using Pusher
- **Auction Management**: Create, update, and manage auctions with complex rules
- **Bid Validation**: Automatic bid validation and conflict resolution
- **Countdown Timers**: Real-time auction countdown with automatic closure

### 👥 User Management
- **Authentication**: JWT-based authentication with refresh tokens
- **Authorization**: Role-based access control (Admin/User)
- **User Profiles**: Comprehensive user profile management
- **Password Security**: bcrypt hashing with secure password policies

### 💰 Payment & Financial
- **Payment Processing**: Multiple payment gateway integration
- **Fund Management**: User wallet and transaction history
- **Invoice Generation**: Automatic PDF invoice generation
- **Financial Reports**: Comprehensive financial analytics

### 🚗 Vehicle Management
- **Vehicle Catalog**: Complete vehicle database with specifications
- **Image Management**: Cloudinary integration for image storage
- **Document Handling**: PDF processing and management
- **Search & Filter**: Advanced search with multiple criteria

### 📊 Analytics & Reporting
- **Real-time Analytics**: Live auction statistics and metrics
- **Admin Dashboard**: Comprehensive admin panel with insights
- **Performance Monitoring**: Sentry integration for error tracking
- **Logging**: Winston-based comprehensive logging system

### 🌍 Internationalization
- **Multi-language Support**: API support for multiple languages
- **Timezone Handling**: Proper timezone management for global users
- **Currency Support**: Multi-currency transaction handling

## 🛠️ Tech Stack

### Core Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Primary database
- **Sequelize** - ORM for database management

### Authentication & Security
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Real-time Communication
- **Pusher** - Real-time messaging and notifications
- **Socket.io** - WebSocket support for live features

### File & Media Management
- **Cloudinary** - Cloud image and file storage
- **Multer** - File upload handling
- **Sharp** - Image processing and optimization
- **PDF Processing** - Document generation and handling

### Monitoring & Logging
- **Sentry** - Error monitoring and performance tracking
- **Winston** - Comprehensive logging system
- **Morgan** - HTTP request logging

### Utilities
- **Nodemailer** - Email service integration
- **Node-schedule** - Task scheduling and automation
- **UUID** - Unique identifier generation
- **Async-lock** - Concurrency control

## 📁 Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── db/             # Database models and migrations
├── middlewares/    # Custom middleware functions
├── repositories/   # Data access layer
├── routes/         # API route definitions
├── services/       # Business logic layer
├── utils/          # Utility functions
├── app.js          # Express app configuration
└── index.js        # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mawaisu77/lux-cars-backend.git
   cd lux-cars-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=lux_cars_db
   DB_USER=your_username
   DB_PASSWORD=your_password

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_refresh_secret_key

   # Pusher Configuration
   PUSHER_APP_ID=your_pusher_app_id
   PUSHER_KEY=your_pusher_key
   PUSHER_SECRET=your_pusher_secret
   PUSHER_CLUSTER=your_pusher_cluster

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password

   # Sentry Configuration
   SENTRY_DSN=your_sentry_dsn

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

4. **Database Setup**
   ```bash
   # Run database migrations
   npm run migrate
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### POST `/api/auth/login`
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Auction Endpoints

#### GET `/api/auctions`
Get all auctions with pagination and filtering.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Auction status filter
- `category` - Vehicle category filter

#### POST `/api/auctions`
Create a new auction (Admin only).

**Request Body:**
```json
{
  "title": "2020 BMW M3",
  "description": "Excellent condition BMW M3",
  "startingPrice": 50000,
  "reservePrice": 55000,
  "startDate": "2024-01-15T10:00:00Z",
  "endDate": "2024-01-20T18:00:00Z",
  "vehicleId": "uuid-here"
}
```

#### POST `/api/auctions/:id/bid`
Place a bid on an auction.

**Request Body:**
```json
{
  "amount": 52000
}
```

### Vehicle Endpoints

#### GET `/api/vehicles`
Get all vehicles with search and filtering.

#### POST `/api/vehicles`
Add a new vehicle (Admin only).

#### GET `/api/vehicles/:id`
Get vehicle details by ID.

### User Endpoints

#### GET `/api/users/profile`
Get current user profile.

#### PUT `/api/users/profile`
Update user profile.

#### GET `/api/users/wallet`
Get user wallet and transaction history.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run migrate` - Run database migrations
- `npm test` - Run tests (placeholder)

### Code Style

The project follows standard JavaScript/Node.js conventions:
- Use ES6+ features
- Follow RESTful API design principles
- Implement proper error handling
- Use async/await for asynchronous operations

## 🚀 Deployment

### Production Setup

1. **Environment Variables**
   Ensure all production environment variables are properly configured.

2. **Database Migration**
   ```bash
   npm run migrate
   ```

3. **Build and Start**
   ```bash
   npm start
   ```

### Docker Deployment (Optional)

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 Performance & Monitoring

- **Sentry Integration**: Real-time error tracking and performance monitoring
- **Winston Logging**: Comprehensive application logging
- **Database Optimization**: Indexed queries and connection pooling
- **Caching**: Redis integration for improved performance (planned)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Awais** - [GitHub Profile](https://github.com/mawaisu77)

## 🙏 Acknowledgments

- Pusher for real-time communication
- Cloudinary for media management
- Sentry for monitoring and error tracking
- The open-source community for various packages and tools

---

<div align="center">
  <sub>⭐ Star this repository if you found it helpful!</sub>
</div>
