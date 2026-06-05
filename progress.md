Project: Student Corner

Tech Stack:
- MongoDB
- Express
- React (not started)
- Node.js
- JWT
- bcrypt

Completed Backend Features:
✅ Signup
✅ Login
✅ JWT Authentication
✅ Auth Middleware

Marketplace:
✅ Create Item
✅ Get All Available Items
✅ Get Item By Id
✅ Get My Items
✅ Edit Item
✅ Delete Item
✅ Mark Sold

Filters:
✅ type
✅ condition

Item Schema:
- title
- description
- type (sell/lend)
- condition
- price
- status (available/sold/reserved)
- owner
- createdAt

Important Decisions:
- Guests can browse items
- Login required for create/edit/delete/sold
- My Listings shows sold items
- Marketplace shows only available items
- Seller marks reserved/sold
- Only title, description, price, condition are editable

Next Tasks:
1. Title search
2. Notes module
3. PYQ module
4. Frontend integration
5. Deployment