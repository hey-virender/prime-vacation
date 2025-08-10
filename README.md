text
# 📢 Complaint Redressal Platform (with Admin Panel)

A full-stack complaint redressal platform built with **Next.js**, **MongoDB**, **Auth.js**, and **Nodemailer**.  
Supports **user sign-up/sign-in**, complaint submission, and an **admin dashboard** for managing complaints.

📌 Project Completion Status
This repository contains the complete implementation of a full-stack complaint redressal platform adhering to the outlined objectives and requirements:

The frontend provides a responsive React user interface with forms for complaint submission and an admin dashboard featuring complaint management with filtering options.

The backend integrates with MongoDB for full CRUD operations on complaint data through a RESTful API.

The email notification system is implemented using Nodemailer with Gmail SMTP, sending alerts on new complaint submissions and status updates to the admin.

Role-based access control and authentication are enforced via Auth.js.

The application is thoroughly tested and ready for local development as well as production deployment.

All key functionalities including user complaint submission, admin complaint viewing, updating, deleting, and filtering have been implemented in accordance with the project brief. Comprehensive setup instructions, environment configuration details, and deployment guidance are provided in this README.

---

## 🚀 Features

- 🔐 **Authentication** with Auth.js
- 🗄 **MongoDB** data storage
- ✉ **Email notifications** via Gmail SMTP
- 📋 **Complaint management** with priority & status tracking
- 🛠 **Admin panel** with role-based access

---

## ⚙️ Installation

### 1️⃣ Clone the repository
git clone https://github.com/hey-virender/prime-vacation.git
cd prime-vacation

text

### 2️⃣ Install dependencies
npm install

text

---

## 🛠 Environment Variables

Create a `.env.local` file in the root of the project and add:

MONGODB_URI=your_mongodb_connection_string

AUTH_SECRET=your_auth_secret_key # Generated using npx auth from Auth.js

Gmail SMTP for Nodemailer
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-16-character-app-password

Admin email
ADMIN_EMAIL=admin@example.com

text

---

## ✉ Gmail SMTP Setup for Nodemailer

Google no longer allows "less secure apps", so you **must** use an **App Password** to send mail with Nodemailer.

### **Step 1: Enable 2-Step Verification**
1. Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2. Under **"Signing in to Google"**, enable **2-Step Verification**.

### **Step 2: Generate an App Password**
1. Visit [Google App Passwords](https://myaccount.google.com/apppasswords) (you may need to sign in again).
2. Under **"Select app"**, choose **Mail**.
3. Under **"Select device"**, choose **Other** and type a name like `Nodemailer`.
4. Click **Generate** — copy the **16-character password** shown.

> ⚠ **Important:** This is your `GMAIL_PASS` in `.env.local`. Do **not** share or commit it.

---

## 📬 Nodemailer Configuration (Already Set Up in This Repo)

We use a preconfigured mailer utility:

// lib/mailer.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
user: process.env.GMAIL_USER,
pass: process.env.GMAIL_PASS,
},
});

export async function sendEmail({ to, subject, text, html }) {
return transporter.sendMail({
from: process.env.GMAIL_USER,
to,
subject,
text,
html,
});
}

text

---

## ▶ Running the App

### Development
npm run dev

text
Runs on [http://localhost:3000](http://localhost:3000)

### Production Build
npm run build
npm start

text

---

## 🛡 Security Notes
- Never commit `.env.local` to GitHub.
- Always use App Passwords for Gmail, never your real password.
- Monitor your `MONGODB_URI` and `AUTH_SECRET` closely for leaks.

---

## 📄 License
This project is licensed under the MIT License.
