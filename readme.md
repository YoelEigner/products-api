# Products API

The Products API is a RESTful API for managing product data. It provides endpoints for creating, reading, updating, and deleting product records. The API is built using Node.js and the Express.js framework, and it uses a SQL database to store product data.

## Getting Started

To get started with the Products API, you will need to have Node.js and MongoDB installed on your computer. You can download Node.js from the [official Node.js website](https://nodejs.org/en/download/) and SQL Express from the [official Microsoft website](https://www.microsoft.com/en-us/Download/details.aspx?id=101064).

Once you have Node.js and SQL Express installed, you can clone the Products API repository from GitHub:

```bash
git clone https://github.com/YoelEigner/products-api.git
```


Next, navigate to the repository directory and install the project's dependencies:


```bash
cd products-api
npm install
```


You will also need to create a `.env` file in the project directory with the following contents:

```bash
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_SERVER=your server address
DB_NAME="products"
DB_PORT="1433"
ACCESS_TOKEN_SECRET="your access token secret
```
Finally, start the API server:


The API should now be running on the port you specified in your `.env` file.

## API Endpoints

#### The Auth API provides the following endpoints:
### `POST /login`
Logs in a user and returns an access token and the user data.

### `GET /get-user`
Returns the details of the authenticated user.

### `DELETE /delete-user`
Deletes the authenticated user.

#### The Products API provides the following endpoints:
### `GET /products`

Retrieves a list of all products in the database.

### `GET /products/:id`

Retrieves a specific product by its ID.

### `POST /products`

Creates a new product record in the database.

### `PUT /products/:id`

Updates an existing product record in the database.

### `DELETE /products/:id`

Deletes a product record from the database.

## Contributing

If you would like to contribute to the Products API, you can do so by submitting a pull request on GitHub. Before submitting a pull request, please ensure that your code follows the project's coding standards and that all tests pass.

## License

The Products API is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as you see fit.

