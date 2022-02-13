# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: '/products' [GET]
- Show: '/products/:id' [GET]
- Create: '/products' [POST] [token required]
- Products by category: '/products-by-category' [GET](args: product category)

#### Users

- Index: '/users' [GET] [token required]
- Show: '/users/:id' [GET] [token required]
- Create: '/users' [POST] [token required]

#### Orders

- Current Order by user: '/current-order' [GET] (args: user id)[token required]
- Completed Orders by user: '/orders' [GET] (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Structure

#### Product

- id: SERIAL PRIMARY KEY
- name: VARCHAR
- price: VARCHAR
- category: VARCHAR

#### User

- id: SERIAL PRIMARY KEY
- firstName: VARCHAR
- lastName: VARCHAR
- password: VARCHAR

#### Orders

- id: SERIAL PRIMARY KEY
- user_id: string [Foreign key to users table]
- status: ENUM(active or complete)

### Orders_products

- id: SERIAL PRIMARY KEY
- order_id: string [Foreign key to orders table]
- product_id: string [Foreign key to products table]
