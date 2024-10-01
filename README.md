# MealMatrix

The Meal Matrix application is a dynamic visual interface designed for exploring meal categories, meals, and their ingredients. Built with React and React Flow, it provides users with an intuitive way to interact with a food database by navigating through nodes representing categories, meals, and ingredients. Each node type offers specific functionalities and interconnections, enabling users to view detailed information about meals and their associated ingredients.

## Core Features

- **Node-Based Navigation:**
  - The application utilizes a node-based architecture where each type of node represents different elements in the meal exploration process.

- **Dynamic Node Creation:**
  - Nodes are created dynamically based on user interactions. For instance, when a user clicks on a category node, the application fetches and displays meal nodes related to that category

- **Expandable Nodes:**
  - Categories can be expanded to show their associated meals, and meals can provide options for further exploration (like viewing ingredients or tags).

- **Custom Edges:**
  - The edges connecting the nodes are customizable, employing a smooth step style for visually appealing transitions between nodes.
    
- **Responsive Design:**
  - Fully responsive interface ensuring a smooth experience across all devices.

## Installation

### Prerequisites

- Node.js and npm installed

### Steps

1 **Clone the repository:**

  ```bash
   git clone https://github.com/your-username/MealMatrix.git
   cd food-explorer
  ```
2 **Install Dependencies ( Client ):**

  ```bash
  cd food-explorer
  npm install
  ```

3 **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```bash
VITE_MEALDB_IMAGE_URL=https://www.themealdb.com/images/ingredients/

VITE_MEALDB_CATEGORIES=https://www.themealdb.com/api/json/v1/1/categories.php

VITE_MEALDB_DETAILS=https://www.themealdb.com/api/json/v1/1/

VITE_MEALDB_MEALS=https://www.themealdb.com/api/json/v1/1/

VITE_MEALDB_BYINGREDIENT=https://www.themealdb.com/api/json/v1/1/
  ```

4 **Run the Application:**

  Be sure you are in  `food-explorer` directory

  ```bash
  npm run dev
  ```



# Contributing

Contributions are welcome! Please open an issue or submit a pull request.


  





