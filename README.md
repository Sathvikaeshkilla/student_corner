# Student Corner

A centralized platform designed to help college students exchange resources, access academic materials, and connect with fellow students within their campus community.

---

# Problem Statement

College students frequently face challenges in accessing resources that already exist within their campus community.

Many buy/sell requests are scattered across WhatsApp groups:

* Bicycle for sale, DM me
* Calculator available, DM me
* Looking for a lab coat
* Anyone selling a monitor?

These messages quickly get buried in crowded group chats, making it difficult for both buyers and sellers to connect efficiently.

Similarly, students often need academic resources such as notes, previous year question papers (PYQs), books, novels, calculators, or reference materials. Finding the right person to ask can be time-consuming and often depends on personal networks.

Examples:

* A student needs DBMS notes before an exam but does not know whom to contact.
* A student is searching for PYQs from a particular year or exam type.
* A student wants to borrow a novel that is unavailable in the college library but may already be owned by another student.
* A student wants to buy a second-hand calculator but has no convenient way to find sellers.

As a result, valuable resources remain underutilized while students spend unnecessary time searching for them.

---

# Solution

Student Corner provides a centralized platform where students can:

* Buy, sell, or lend items
* Share and access academic notes
* Upload and browse previous year question papers
* Directly communicate with resource owners through chat

The platform eliminates information fragmentation and makes academic as well as non-academic resources more accessible within the student community.

---

# Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

## Marketplace

* Create Marketplace Listings
* Upload Item Images
* Buy / Sell / Lend Resources
* Mark Items as Sold
* Delete Listings
* Search Items by Title or Description
* Filter by Type (Sell / Lend)
* Filter by Condition

## Notes Repository

* Upload PDF Notes
* View Notes
* Delete Notes
* Search by Title or Subject
* Filter by Branch

## Previous Year Question Papers (PYQs)

* Upload PYQs
* View PDFs
* Delete PYQs
* Search by Title or Subject
* Filter by Branch
* Filter by Year
* Filter by Exam Type

## Student Chat

* Contact Resource Owners
* One-to-One Messaging
* Direct Communication Between Students

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JWT (JSON Web Tokens)
* bcrypt

## Cloud Storage

* Cloudinary

## File Uploads

* Multer

---

---

# How To Run Locally

## Clone Repository

```bash
git clone <repository-url>
cd student_corner
```

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start Backend:

```bash
npm start
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# How To Use

### Marketplace

* Browse available items
* Search and filter listings
* Upload items for sale or lending
* Contact owners through chat

### Notes Repository

* Upload notes in PDF format
* Search by title or subject
* Filter notes by branch
* View and manage uploaded notes

### PYQ Repository

* Upload previous year question papers
* Search by title or subject
* Filter by branch, year, and exam type
* View and manage uploaded PYQs

### Chat

* Contact resource owners directly
* Discuss transactions and resource sharing

---

# Screenshots


* Home Page
* Marketplace
* Notes Repository
* PYQ Repository
* Chat Interface
* Item Details Page
* Upload Pages

---

# Future Enhancements

* NIT Warangal Email Verification
* OTP-Based Account Verification
* PDF Preview Thumbnails
* Real-Time Notifications
* Admin Moderation Panel
* Advanced Search & Recommendations
* College-Specific Communities

---

# Feedback

Suggestions, ideas, and feature recommendations are always welcome.

If you discover a bug or have an improvement idea, feel free to open an issue and share your feedback.

Future versions of Student Corner may include additional features based on user feedback and project requirements.

---

# Note

The current version allows registration using any email address for testing and evaluation purposes.

Institutional email verification and OTP-based authentication are planned future enhancements.

---

# Author

**Sathvika Eshkilla **

B.Tech Computer Science and Engineering

National Institute of Technology Warangal
