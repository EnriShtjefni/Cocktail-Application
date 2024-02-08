# Cocktail Application

Welcome to the Cocktail Application! This application allows users to explore and mark their favorite cocktails.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Getting Started

Follow these steps to run the Cocktail Application locally.

1. Open your terminal and navigate to the main directory of your project.

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the application:

    ```bash
    npm run dev
    ```

   This command will execute scripts to start both the backend and frontend concurrently.

4. Once the scripts have executed, you can access your Cocktail Application in your web browser at [http://localhost:5173](http://localhost:5173) (or the specified port).

## Features

- **User Selection Page:**
  - Initial page displaying a list of available users. Upon selecting a name, the user gets redirected to the homepage.

- **Homepage:**
  - Search for cocktails by name.
  - Results displayed in a paginated way or through endless scroll.
  - Mark cocktails as favorites.
  - Section with random cocktails.

- **User Profile Page:**
  - Displays user information and favorite cocktails.

- **404 Page and General Error Page:**
  - Custom pages for handling errors.

## Notes

- The application will be available at the specified port, such as `http://localhost:5173`.
