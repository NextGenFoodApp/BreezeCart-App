# 🌬️ BreezeCart

**Smart, Seamless, Sustainable E-Commerce for Micro and Small Vendors**

BreezeCart is a lightweight, intelligent e-commerce platform designed using a Design Science approach. It empowers local and small-scale vendors to effortlessly create and manage their digital storefronts, offer products to customers, and handle payments and orders—without the overhead and complexity of traditional platforms.

---

## 📌 Table of Contents

- [🚀 Features](#-features)
- [📸 UI Preview](#-ui-preview)
- [🧠 Design Science Background](#-design-science-background)
- [🛠 Tech Stack](#-tech-stack)
- [🏗️ Architecture](#-architecture)
- [🧪 Setup & Installation](#-setup--installation)
- [✅ Testing](#-testing)
- [📈 Future Enhancements](#-future-enhancements)

---

## 🚀 Features

- 🧾 Vendor onboarding with secure authentication
- 🛍️ Smart product management dashboard
- 🔍 Customer-facing product feed with category-based filtering
- 💳 Payment integration via Stripe (sandbox)
- 📦 Order placement & tracking (basic version)
- 📱 Mobile-first responsive UI
- 🔒 Firebase-backed authentication and real-time database

---

## 📸 UI Preview

*(Add screenshots or GIFs here showing the landing page, vendor dashboard, and product listing UI)*

---

## 🧠 Design Science Background

This project was developed under a university module focusing on **Design Science**. BreezeCart was designed by:

- Discovering and defining a real-world problem affecting small vendors
- Surveying existing literature and platforms
- Conducting socio-economic and feasibility analysis
- Planning and iteratively developing a working solution
- Validating the solution through real-user testing

---

## 🛠 Tech Stack

**Frontend**:
- React.js
- Tailwind CSS
- Firebase Auth (for authentication)

**Backend**:
- Node.js + Express
- Firebase Firestore (NoSQL database)
- Stripe API (mock payments)
- Google Maps API (delivery support, optional)

**Deployment**:
- Firebase Hosting
- GitHub Actions (CI/CD optional)

---

## 🏗️ Architecture

Frontend (React)
↕
Express.js API (Node)
↕
Firebase Firestore ←→ Stripe API (Payments)
←→ Firebase Auth

- Modular design with RESTful APIs
- Realtime updates powered by Firebase
- Secure, scalable, and cost-effective for small-scale use

---

## 🧪 Setup & Installation

### Prerequisites
- Node.js ≥ 16.x
- Firebase CLI
- Git

### Installation Steps

bash
# Clone the repository
git clone https://github.com/NextGenFoodApp/BreezeCart-App

# Go to client
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# back
cd ..

# Go to server
cd server

# Install dependencies
npm install

# Start development server
npm run dev

## ✅ Testing

* Manual testing across vendor and customer flows
* Performance tested using Google Lighthouse
* Feedback collected through pilot testing with 3 vendors

---

## 📈 Future Enhancements

* 🧠 AI-based product recommendations
* 🌍 Multi-language support
* 🚚 Integration with local courier APIs
* 📲 Convert to Progressive Web App (PWA)
* 📊 Admin analytics dashboard

---
