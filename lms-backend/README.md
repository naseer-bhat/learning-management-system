# 🧠 LearnHub Backend - Learning Management System (LMS)

This is the backend API for the LearnHub Learning Management System (LMS). It is designed to support an educational platform with functionality for authentication, course creation, enrollment, lesson delivery, assignment submission, and user role management.

## 📌 Features

- JWT-based authentication  
- Role-based access control (`admin`, `instructor`, `student`)  
- Secure password hashing with Argon2  
- RESTful APIs for course, lesson, and assignment management  
- Enrollment and student submission tracking  
- Email support via Nodemailer  
- Modular MVC architecture  

## 🧩 Technologies Used

| Layer       | Technology            |
|-------------|------------------------|
| Server      | Node.js + Express      |
| Database    | MongoDB + Mongoose     |
| Auth        | JWT + Argon2           |
| Middleware  | Auth, Role Guards      |
| Utilities   | Nodemailer, dotenv, cors |

## 📁 Folder Structure

backend/  
├── controllers/  
│   ├── assignmentController.js  
│   ├── authController.js  
│   ├── courseController.js  
│   ├── enrollmentController.js  
│   ├── lessonController.js  
│   └── submissionController.js  
├── models/  
│   ├── Assignment.js  
│   ├── Course.js  
│   ├── Enrollment.js  
│   ├── Lesson.js  
│   ├── Submission.js  
│   └── User.js  
├── routes/  
│   ├── adminRoutes.js  
│   ├── authRoutes.js  
│   ├── courseRoutes.js  
│   ├── instructorRoutes.js  
│   └── studentRoutes.js  
├── middlewares/  
│   ├── authMiddleware.js  
│   └── roleMiddleware.js  
├── utils/  
│   └── sendEmail.js  
├── config/  
│   └── db.js  
├── .env  
├── server.js  
└── package.json  

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

PORT=8000  
MONGO_URI=your_mongodb_connection_uri  
JWT_SECRET=your_jwt_secret  
EMAIL_USER=your_email@example.com  
EMAIL_PASS=your_email_password  

## ⚙️ Installation & Setup

cd backend  
npm install  
npm run dev  

## 🔗 API Routes Overview

### Auth (/api/auth)

POST /register – Register new user  
POST /login – Login and get token  

### Student Routes (/api/student)

GET /courses – Get all available courses  
POST /enroll/:courseId – Enroll in a course  
GET /enrollments – View student’s enrollments  
GET /course/:courseId/lessons – View lessons in a course  
GET /lesson/:lessonId/assignments – View assignments in a lesson  
POST /assignment/:id/submit – Submit an assignment  

### Instructor Routes (/api/instructor)

POST /create-course – Create a new course  
POST /course/:id/add-lesson – Add a lesson to a course  
GET /course/:id/lessons – Get lessons in a course  
POST /lesson/:id/add-assignment – Add assignment to a lesson  
GET /lesson/:id/assignments – View assignments in a lesson  
GET /assignment/:id/submissions – View submissions for assignment  
POST /assignment/:id/evaluate/:submissionId – Evaluate a student’s submission  

### Admin Routes (/api/admin)

GET /dashboard – View admin dashboard  
GET /users – List all registered users  

## 🧪 Middleware

authMiddleware.js – Verifies JWT and attaches req.user  
roleMiddleware.js – Restricts routes based on user role  

## 🧪 Testing the API

Use Postman or Thunder Client:  
1. Register or log in to get a token  
2. Add header: Authorization: Bearer <token>  
3. Access routes based on role  

## 🚀 Future Enhancements

- AI-powered course recommendations  
- File uploads for assignments  
- Realtime notifications via WebSocket  
- Instructor analytics dashboard  
- Docker support and CI/CD pipeline  

## 👨‍💻 Author

Naseer Ahmad Bhat  
Backend Developer | Node.js | MongoDB | Express  

## 🪪 License

This project is open-source and available under the MIT License.
