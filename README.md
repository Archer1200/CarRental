
# Car Rental Web App

A full-stack Car Rental web application that allows users to browse available cars and book them easily. Built with modern web technologies to provide a smooth and user-friendly experience.

📁 Folder Structure

```

┣ CarRental
┃ ┣ public
┃ ┃ ┣ favicon.svg
┃ ┃ ┗ icons.svg
┃ ┣ src
┃ ┃ ┣ assets
┃ ┃ ┣ components
┃ ┃ ┃ ┣ owner
┃ ┃ ┃ ┃ ┣ NavbarOwner.jsx
┃ ┃ ┃ ┃ ┣ Sidebar.jsx
┃ ┃ ┃ ┃ ┗ Title.jsx
┃ ┃ ┃ ┣ Banner.jsx
┃ ┃ ┃ ┣ CarCard.jsx
┃ ┃ ┃ ┣ FeaturesSection.jsx
┃ ┃ ┃ ┣ Footer.jsx
┃ ┃ ┃ ┣ Hero.jsx
┃ ┃ ┃ ┣ Login.jsx
┃ ┃ ┃ ┣ Navbar.jsx
┃ ┃ ┃ ┣ Newsletter.jsx
┃ ┃ ┃ ┣ Testimonial.jsx
┃ ┃ ┃ ┗ Title.jsx
┃ ┃ ┣ context
┃ ┃ ┃ ┗ AppContext.jsx
┃ ┃ ┣ pages
┃ ┃ ┃ ┣ owner
┃ ┃ ┃ ┃ ┣ Addcar.jsx
┃ ┃ ┃ ┃ ┣ Dashboard.jsx
┃ ┃ ┃ ┃ ┣ Layout.jsx
┃ ┃ ┃ ┃ ┣ Managebooking.jsx
┃ ┃ ┃ ┃ ┗ Managecars.jsx
┃ ┃ ┃ ┣ CarDetail.jsx
┃ ┃ ┃ ┣ Cars.jsx
┃ ┃ ┃ ┣ Home.jsx
┃ ┃ ┃ ┣ Loader.jsx
┃ ┃ ┃ ┗ MyBooking.jsx
┃ ┃ ┣ App.jsx
┃ ┃ ┣ index.css
┃ ┃ ┗ main.jsx
┃ ┣ .env
┃ ┣ eslint.config.js
┃ ┣ index.html
┃ ┣ package.json
┃ ┣ README.md
┃ ┗ vite.config.js
┣ server
┃ ┣ config
┃ ┃ ┣ db.js
┃ ┃ ┗ imageKit.js
┃ ┣ controller
┃ ┃ ┣ bookingController.js
┃ ┃ ┣ ownerController.js
┃ ┃ ┗ userController.js
┃ ┣ middleware
┃ ┃ ┣ auth.js
┃ ┃ ┗ multer.js
┃ ┣ models
┃ ┃ ┣ Booking.js
┃ ┃ ┣ cars.js
┃ ┃ ┗ User.js
┃ ┣ routes
┃ ┃ ┣ bookingRoutes.js
┃ ┃ ┣ ownerRoutes.js
┃ ┃ ┗ userRoutes.js
┃ ┣ uploads
┃ ┃ ┗ 8b9bd62c135cf379ba8647eaf534ab67
┃ ┣ .env
┃ ┣ package.json
┃ ┗ server.js
┣ .gitignore
┗ README.md

---

🚀 Features
  - Browse available cars with details
  - Book cars for specific dates
  - User authentication (Login/Signup)
  - Add and manage car listings (Admin)
  - Pricing per day calculation
  - Responsive UI for all devices

---

🛠️ Tech Stack
   -Frontend: React.js, HTML, CSS, Tailwind
   -Backend: Node.js, Express.js
   -Database: MongoDB

```

⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/Archer1200/CarRental.git
cd carrental
```

2. **Install dependencies**
```bash
# Frontend
  cd client
  npm install

# Backend
  cd ../server
  npm install
```

3.**Setup Environment Variables**
  Create a .env file in the server folder and add:
  MONGO_URI,PORT

4.**Run the project**
```bash
# Run backend
npm start

# Run frontend
cd client
npm run dev

```

Live Demo https://car-rental-bj31.vercel.app/













