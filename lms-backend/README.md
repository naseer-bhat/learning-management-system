# 📚 LMS Backend

This is a full-featured backend for a Learning Management System (LMS) built with Node.js, Express, and MongoDB using ES6 modules and the MVC architecture.

## 🚀 Features

- Authentication & RBAC (Admin, Instructor, Student)
- Course & lesson management
- Assignment submissions and evaluation
- Student progress tracking
- AI-powered quiz generation (OpenAI)
- Stripe payment integration (test mode)
- Local file uploads (videos/resources)

## 📦 Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT, Multer, Stripe, OpenAI
- Nodemailer for email
- ES6 Modules + MVC structure

## ⚙️ Setup

```bash
git clone https://github.com/your-repo/lms-backend.git
cd lms-backend
npm install
cp .env.example .env
npm run dev
