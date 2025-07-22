
# 🌟 Admin Dashboard 🌟

Welcome to the **Admin Dashboard **! 
A responsive admin dashboard for managing users, monitoring content, and analyzing platform activities. This dashboard allows administrators to track user engagement, moderate content, and gain insights into platform performance through interactive analytics.
The Layout is friendly for Mobile UI as well. The dimensions for the mobile UI specifically being 320 X 586 pixels.

---

## 📝 Table of Content
 1. Set up instructions
 2. Project Overview
 3. Key Features
 4. Tech Stack
 5. Project structure

---
## 🛠️ Set up instruction

 1. Create next js app: npx create-next-app@latest my-nextjs-app
 2. Move into folder of your next js: cd my-nextjs-app
 3. Run the code: npm run dev
 4. Click on the link shown in the terminal : http://localhost:3000
 5. When the link starts in the server add /dashboard next to it to access: http://localhost:3000/dashboard
 6. You can move around different features with the help of the navbar present

---
## 📝 Project Overview

This project is a modern admin dashboard built using Next.js that allows social media administrators to:
 1. Manage users by tracking their activities, referrals, and engagement.
 2. Moderate content by monitoring daily interactions such as views, shares, and comments.
 3. Visualize analytics with responsive charts to track user activity and content performance.
 4. The dashboard integrates with the Socialverse Admin Dashboard API to fetch and display user and post data.

---
## 🌟 Key Features

1. 👤 User Management: Easily view & track activity, referrals, and identify active users or creators.

2. 📝 Content Moderation: Monitor daily views, shares, comments, and post exits.

3. 📊 Analytics: Visualize user activity and engagement metrics daily/monthly with charts; analyze views, likes, shares, and private messages.

5. 📈 Data Visualization: Responsive charts (Chart.js/Recharts) provide insights into user engagement and content performance.

6. 🌟 Responsive Design: Fully responsive UI, ensuring usability on both desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js
- **Styling**: Tailwind CSS 
- **Analytics Visualization**: Chart.js and Recharts
- **Data Fetching**: SWR for API requests

---

## ✅ Structure


PROJECT STRUCTURE:
Dashboard/
│
├── .next/                   
├── app/                       # Main application directory (Next.js App Router)
│   ├── analytics/             # Folder for analytics feature
│   ├── components/            # Reusable React components
│   ├── content/               # Folder for content moderation feature
│   ├── dashboard/             # Folder for Dashboard
│   ├── insights/              # Folder for Data visualization feature
│   ├── users/                 # Folder for User Management feature
│   ├── favicon.ico            # Favicon for the website
│   ├── globals.css            # Global CSS file for overall styling
│   ├── layout.js              # Root layout for the app, wraps all pages
│   ├── page.js                # Main page entry point (usually the home page)
│            
│
├── node_modules/              # Installed npm/yarn dependencies
│
├── public/                    # Static assets like images, fonts, etc.
│
├── .eslintc.json              # ESLint configuration file
├── .gitignore                 # Git ignore file specifying files/folders to exclude
├── jsconfig.json              # JavaScript project configuration for module resolution
├── next.config.js             # Next.js configuration file
├── package-lock.json          # Lock file for package dependencies (npm)
├── package.json               # Lists project dependencies and scripts
├── postcss.config.js          # Configuration for PostCSS (used with Tailwind CSS)
├── README.md                  # Documentation for the project
└── tailwind.config.js         # Tailwind CSS configuration file
