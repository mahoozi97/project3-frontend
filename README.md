# KhalijiGo — Frontend

A React.js single-page application for booking one-way car trips from Bahrain to GCC countries. Features a user-facing booking flow, blog section, and a protected admin panel for managing bookings.

> 🔗 **Backend API Repository:** [View the Node.js Backend Here](https://github.com/mahoozi97/KhalijiGo-backend)

---

## Tech Stack

- **Framework:** React.js
- **Routing:** React Router
- **Styling:** Tailwind CSS

---

## UI Theme

Inspired by the Windows XP desktop experience — the app opens with an XP-style loading screen that transitions into a desktop environment, reflecting the overall retro UI design of the platform. It's not just a gimmick; the entire interface is themed around the Windows XP aesthetic, making it a unique and memorable user experience.

---

## Getting Started

### Installation & Running

```bash
# Install dependencies
npm install

# Development
npm run dev
```

### Environment Variables

Create a `.env` file in the root of the frontend directory:

```env
VITE_BACKEND_URL=http://localhost:3000
```

---

## Pages & Routes

### Public Routes

| Path | Page | Description |
|------|------|-------------|
| `/homepage` | Homepage | Main landing page |
| `/blogs` | Blogs | Browse all blog posts |
| `/blog/:id` | Blog Detail | View a single blog post and its comments |
| `/sign-up` | Sign Up | Register a new account — redirects to dashboard if already logged in |
| `/sign-in` | Sign In | Login — redirects to dashboard if already logged in |

### Protected User Routes

| Path | Page | Description |
|------|------|-------------|
| `/dashboard` | Dashboard | View bookings list |
| `/book-now` | Booking Form | Submit a new trip booking |

### Protected Admin Routes

| Path | Page | Description |
|------|------|-------------|
| `/admin-dashboard` | Admin Dashboard | View all bookings and accept/cancel them |
| `/admin/blogs/create` | Blog Form | Create a new blog post |
| `/admin/blogs/edit/:id` | Blog Form | Edit an existing blog post |

---

## Route Protection

- **ProtectedRoute** — requires a logged-in user, otherwise redirects to `/sign-in`
- **AdminRoute** — requires admin privileges, wraps all admin-only pages
- **Auth redirects** — `/sign-in` and `/sign-up` redirect to `/dashboard` if the user is already authenticated

---

## Key Features

- **Booking conflict prevention** — if a driver is already booked on the selected day, the request is rejected and the user is prompted to choose a different date or driver.
- **dashboard** — users can track the status of their trips in one place
- **Admin panel** — admins can accept or cancel bookings without risk of double-booking a driver
- **Blog system** — admins can create and edit posts; authenticated users can comment

---