# 🏠 Real Estate Platform

A feature-rich online platform to buy, sell, and manage real estate properties with role-based access for users, agents, and admins. Built using the MERN stack, this responsive platform ensures seamless user experience, secure authentication, and efficient property management.

---

## 🔗 Live Site URL

[👉 Visit Real Estate Platform](#) (https://real-estate-platform-70c5d.web.app/)

---

## 🔑 Admin Login Credentials

- Email (aminul254237@gmail.com)
- _Password:_ Aminul12@#

## 🔑 Agent Login Credentials

- Email (businessbyaminul@gmail.com )
- _Password:_ Aminul12@#

---

## 🌟 Key Features

1. _Role-Based Access:_

   - _Users_: Wishlist and purchase properties, leave reviews, and track purchased properties.
   - _Agents_: Add, update, and manage their properties; view sold and requested properties.
   - _Admins_: Comprehensive management of properties, users, and reviews with fraud detection for agents.

2. _Modern Authentication System:_

   - Email/Password-based login and registration with Firebase authentication.
   - Social login integration.
   - JWT-based protected routes to ensure security after login.

3. _Responsive Design:_

   - Fully responsive across mobile, tablet, and desktop devices, including the dashboard UI.

4. _Home Page:_

   - Eye-catching navbar, banner/slider, and footer.
   - Advertisement section showcasing admin-verified properties.
   - Latest user reviews section with real-time updates.

5. _Dynamic Property Management:_

   - _All Properties Page:_ Displays all verified properties with search and sort functionalities.
   - _Property Details Page:_ Detailed view of a property, wishlist option, and user review section.

6. _Interactive Dashboards:_

   - _User Dashboard:_ Wishlist, property purchases, personal reviews, and profile management.
   - _Agent Dashboard:_ Add/manage properties, view sold properties, and handle user offers.
   - _Admin Dashboard:_ Manage properties, users, and reviews, with options to advertise verified properties.

7. _CRUD Operations with Alerts:_

   - SweetAlert2 and Toastify notifications for all create, update, delete, and authentication actions.

8. _Secure Data Handling:_

   - Environment variables used to hide Firebase config keys and MongoDB credentials.

9. _Payment Integration:_

   - Secure payment system using Stripe for property purchases.

10. _Additional Features:_

- 404 Not Found page for invalid routes.
- Fraud detection system for agents flagged by admins.

---

## 🛠️ Tech Stack

- _Frontend:_ React, Tailwind CSS, DaisyUI, SweetAlert2, Toastify, TanStack Query, Firebase Authentication.
- _Backend:_ Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT).
- _Payment:_ Stripe.

---

## 🔑 Environment Variables

Create the following .env files in the appropriate directories:

### Client (client/.env):

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

### Server (server/.env):

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

---

## 👩‍💻 Commit Guidelines

- A minimum of _20 notable commits_ for the client-side code.
- A minimum of _12 notable commits_ for the server-side code.
- Follow semantic commit messages, e.g., feat: add user wishlist page or fix: resolve dashboard responsiveness issues.

---

## 📄 License

This project is licensed under the MIT License.
