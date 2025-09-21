# 📖 Pokédex Pro

> A modern, responsive Pokédex application built with React, Vite, and Tailwind CSS, featuring an intelligent search with typo correction.

This project is a beautifully designed Pokédex that allows users to search for any Pokémon and view their detailed stats and information. It's built with a modern tech stack and focuses on a clean user interface, smooth animations, and a great user experience, including a "Did you mean...?" feature for misspelled searches.

---

## ✨ Features

- **Sleek, Responsive UI**: A mobile-first design that looks great on any device.
- **Comprehensive Pokémon Data**: Displays sprites, types, base stats, abilities, physical attributes, Pokédex entries, and more.
- **Dynamic Theming**: The Pokémon card's color theme changes based on its primary type.
- **Intelligent Search**: If you misspell a Pokémon's name, the app suggests the closest match.
- **Smooth Loading State**: A loading animation provides a seamless user experience while fetching data.
- **Built with Modern Tools**: Fast and efficient, powered by React, Vite, and Tailwind CSS.

---

## 🛠️ Technologies Used

- **React**: For building the user interface.
- **Vite**: As the blazing-fast frontend build tool.
- **Tailwind CSS**: For utility-first styling and responsive design.
- **PokéAPI**: The source for all Pokémon data.
- **React Icons**: For clean and simple icons.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### **Prerequisites**

Make sure you have Node.js and npm installed on your machine.

- npm
  ```sh
  npm install npm@latest -g
  ```

### **Installation**

1.  **Clone the repo**
    ```sh
    git clone [https://github.com/your-username/pokedex-pro.git](https://github.com/your-username/pokedex-pro.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd pokedex-pro
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Run the development server**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

---

## 📁 Project Structure

The project follows a standard Vite + React structure, with components organized for clarity.

pokedex-pro/
├── public/
├── src/
│ ├── assets/ # Static assets like GIFs
│ ├── components/ # Reusable React components
│ │ ├── PokemonCard.jsx
│ │ └── SearchBar.jsx
│ ├── utils/ # Utility functions
│ │ └── stringSimilarity.js
│ ├── App.jsx # Main application component
│ ├── index.css # Global styles and Tailwind directives
│ └── main.jsx # React entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
