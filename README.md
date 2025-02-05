# E-commerce Product Dashboard

This project is a simple e-commerce product dashboard where users can browse products, view product details, add products to a shopping cart, and simulate the checkout process. The application has been built using React and utilizes features like routing, state management, and responsive design.

## Features

- **Home Page**: Displays a grid of products with details like name, price, and thumbnail. Users can filter products by name and sort them by price or rating.
- **Product Details Page**: Displays detailed information for a selected product (name, price, description, images, ratings) and allows users to add the product to their cart or add to the wishlist.
- **Shopping Cart Page**: Displays items in the cart with the option to update quantities, move to wishlist, remove items, and view the total price. A checkout button simulates the checkout process.
- **Responsive Design**: The application is fully responsive.

Optional Features:

- Wishlist feature to save favorite products.
- The product is either in the cart or on the wishlist.
- Animations for page transitions using Framer Motion.

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ArpitGorasiya/e-commerce.git
   ```

2. Navigate to the project directory:

   ```bash
   cd e-commerce
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. The application should now be running at `http://localhost:3000`.

### Key Components:

- **HomePage** (`/`): Displays the list of products and includes a search bar and filter options.
- **ProductDetailsPage** (`/product/:id`): Shows detailed information about a product.
- **CartPage** (`/cart`): Displays items in the shopping cart with options to update or remove them.
- **WishlistPage** (`/wishlist`): Displays items in the wishlist with options to move it to wishlist.

## Technologies Used

- **React**: For building the UI and managing state.
- **React Router**: For handling routing between pages.
- **TailwindCSS**: For styling the application with utility-first CSS.
- **React Context API**: For managing the global shopping cart state.
- **Fake Store API**: For fetching mock product data.

## Live Preview Link

- https://ecommerce-dashboard-demo.netlify.app/

