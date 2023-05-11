const request = require('supertest');
const express = require('express');
const router = require('./routes/router');
const { getProdsById, insertNewProduct } = require('./SQLFunctions/queries');

const app = express();
app.use(express.json());
app.use('/', router);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODM3MjM0NzUsImV4cCI6MTY4Mzc2NjY3NX0.nRckYHNh68Mu3YrTIAO3jByxIkjB9SIAv9mumdKlShk'

describe('GET /products', () => {
    it('should return an array of products', async () => {
        const response = await request(app).get('/products').set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('GET /products/:id', () => {
    test('should return a product with the specified id', async () => {
        const productId = 1; // Replace with a valid product ID in your database
        const expectedProduct = await getProdsById(productId);

        const response = await request(app).get(`/products/${productId}`).set('Authorization', `Bearer ${token}`);;

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedProduct);
    });
});

describe('POST /products', () => {
    it('should create a new product', async () => {
        const newProduct = { name: 'Watch', description: 'Clocks', price: 100, quantity: 5 };
        const response = await request(app).post('/products').send(newProduct).set('Authorization', `Bearer ${token}`);;
        expect(response.statusCode).toBe(200);
    });
});



describe('PUT /products/:id', () => {
    it('should update an existing product', async () => {
        const productId = 20;
        const updatedProduct = { name: 'Table', description: 'A green table', price: 20, quantity: 10 };
        const expectedResponse = `Updated ${productId} successfully`;

        const response = await request(app).put(`/products/${productId}`).send(updatedProduct).set('Authorization', `Bearer ${token}`);;

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });
});


describe('DELETE /products/:id', () => {
    it('should delete an existing product', async () => {
        const productId = 20;
        const expectedResponse = `Deleted ${productId} successfully`;

        const response = await request(app).delete(`/products/${productId}`).set('Authorization', `Bearer ${token}`);;
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });
});

