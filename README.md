# Daily World News -Next.js, React, TypeScript, GNews API, TailwindCSS, Shadcn, Axios Fundamental Project 6

News App is a React-Vite Random Current World Related Live News project, using GNews API, Axios for the HTTP Client Request, display the News in different Category in Navbar, display the details in a Popup page, Read more as Source Link and deploy on Vercel.

- **Live Demo:** [https://daily-world-news.vercel.app/](https://daily-world-news.vercel.app/)

## Project Summary

A modern news web application built with React and Vite, providing live, real-time world news powered by the GNews API. Designed for rapid development and learning, this project demonstrates best practices in React, state management, API integration, and frontend tooling. The application features categorized news, a responsive layout, and showcases integration with third-party APIs using Axios.

- **Live-Demo:** <https://news-arnob.vercel.app/>

---

## Table of Contents

1. [Project Details](#project-details)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Technology Stack](#technology-stack)
5. [Installation & Setup](#installation--setup)
6. [API Integration](#api-integration)
7. [Usage Instructions](#usage-instructions)
8. [Key Concepts & Learning Points](#key-concepts--learning-points)
9. [Example Code Snippets](#example-code-snippets)
10. [Conclusion](#conclusion)

---

## Project Details

- **Live Demo:** [News-ReactVite Webpage](https://news-arnob.vercel.app/)
- **Purpose:** Deliver the latest world news in a fast, organized, and visually engaging way.
- **API Source:** [GNews API](https://gnews.io/docs/v4#authentication)
- **Frontend:** Built with React & Vite for blazing fast development and HMR (Hot Module Replacement).
- **HTTP Requests:** Managed through Axios.

---

## Features

- Live news fetched from GNews API.
- Categorized news navigation via Navbar (e.g., World, Sports, Technology, etc.).
- Detailed news view for each article.
- Responsive design for desktop and mobile.
- Secure API key management using `.env`.
- Clean code structure and reusable components.
- Easily extensible for more features or categories.

---

## Project Structure

```
News--ReactVite/
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── src/
    ├── components/
    │   ├── Navbar.jsx
    │   ├── NewsList.jsx
    │   ├── NewsItem.jsx
    │   └── ...otherComponents
    ├── App.jsx
    ├── main.jsx
    └── assets/
        └── ...images, styles
```

> _Note: The `src` folder contains all source code, while `components` hold reusable UI elements._

---

## Technology Stack

- **React**: Core UI library.
- **Vite**: Fast build tool and dev server.
- **Axios**: For HTTP requests.
- **JavaScript (ES6+)**
- **CSS / SCSS**: For styling.
- **GNews API**: News data provider.
- **Node.js & npm**: Dependency and build management.
- **ESLint**: Linting and code quality.
- **Vercel**: (optional) for deployment.

---

## Installation & Setup

1. **Install Node.js**  
   Download and install Node.js from [nodejs.org](https://nodejs.org/en/).

2. **Clone the Repository**

   ```bash
   git clone https://github.com/arnobt78/News--ReactVite.git
   cd News--ReactVite
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Setup .env File**  
   Create a `.env` file in the root, and add your GNews API key:

   ```
   VITE_NEWS_API_KEY=your_gnews_api_key_here
   ```

5. **Install Axios**  
   If not already installed:

   ```bash
   npm install axios
   ```

6. **Run the Application Locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## API Integration

- **GNews API**:
  - Sign up at [gnews.io](https://gnews.io/docs/v4#authentication) to get your API key.
  - Store the API key in your `.env` file as shown above.
  - Axios is used to fetch news data from the API endpoints.

---

## Usage Instructions

1. **Start the app** (`npm run dev`)
2. **Browse categories** using the top navigation bar
3. **Click on articles** to view detailed news content
4. **Stay up to date** with the latest world news, refreshed live from the GNews API

---

## Key Concepts & Learning Points

- **React Functional Components**: All UI built from modular, reusable JS functions.
- **State Management**: Use of React Hooks (useState, useEffect) for local state and effects.
- **API Requests with Axios**: Fetch and handle data asynchronously.
- **Environment Variables**: Secure API keys with `.env` and Vite’s environment system.
- **Component-Based Architecture**: Separation of concerns, reusability, and scalability.
- **Routing (if implemented)**: Page navigation and dynamic rendering.
- **Responsive Design**: Mobile-first, adaptive layout.

---

## Example Code Snippets

**Fetching News with Axios:**

```javascript
import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const url = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en`;

const fetchNews = async () => {
  try {
    const response = await axios.get(url);
    // set state with response.data.articles
  } catch (error) {
    console.error("Failed to fetch news:", error);
  }
};
```

---

**Sample Navbar Component:**

```jsx
export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>World</li>
        <li>Technology</li>
        <li>Sports</li>
        {/* Add more categories */}
      </ul>
    </nav>
  );
}
```

---

## Conclusion

This project is a practical example for learning full-stack JavaScript with React and Vite, API integration, and modern web development best practices. It is easily extendable for more features, categories, or different APIs.  
Contributions, suggestions, and feedback are welcome!

---

## Keywords

React, Vite, GNews API, Axios, News App, JavaScript, .env, Environment Variables, API Integration, Responsive Design, Components, Frontend, Web Development, Learning Project

---

## Happy Coding! 🚀

Thank you for exploring and using News-ReactVite.  
_Feel free to fork, star, and contribute!_

---
