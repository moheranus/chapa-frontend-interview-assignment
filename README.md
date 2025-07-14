Chapa Frontend Interview Assignment
A role-based dashboard SPA built with React for a fictional Payment Service Provider platform.
Features

User Dashboard: Displays wallet balance, recent transactions, and a transaction form.
Admin Dashboard: Lists users with toggleable status and payment summaries.
Super Admin Dashboard: Includes admin features, system stats, and admin management.
Mock API: Simulates API calls with setTimeout.
State Management: Uses React Context API.
Styling: Tailwind CSS.

Setup

Clone the repository:git clone https://github.com/your-username/Chapa-frontend-interview-assignment.git


Install dependencies:cd Chapa-frontend-interview-assignment
npm install


Start the development server:npm start



Deployment

Push to GitHub:git add .
git commit -m "Initial commit"
git push origin main


Deploy to Vercel:
Connect the repository to Vercel via the Vercel dashboard.
Deploy as a static site or React app.



Usage

Login with usernames: user, admin, or superadmin to access role-specific dashboards.
Logout to return to the login screen.

Folder Structure

public/ - Static assets and index.html
src/components/ - Reusable UI components
src/context/ - Authentication context
src/services/ - Mock API functions
src/pages/ - Main app page
src/index.js - Entry point
src/index.css - Tailwind CSS styles
