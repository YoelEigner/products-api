const express = require('express');
const { getProds, getProdsById, insertNewProduct, updateProduct, deleteProduct } = require('../SQLFunctions/queries');
const { middleware } = require('../middleware');
const router = express.Router();

const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const sanitizer = DOMPurify(window);

router.use(middleware)

router.get('/products', middleware, async (req, res) => {
    let products = await getProds()
    res.json(products);
});

router.get('/products/:id', middleware, async (req, res) => {
    const { id } = req.params;
    const safeID = sanitizer.sanitize(id);
    let products = await getProdsById(safeID)
    res.json(products);
});

router.post('/products/', middleware, async (req, res) => {
    const { name, description, price, quantity } = req.body;
    const safeName = sanitizer.sanitize(name);
    const safeDescription = sanitizer.sanitize(description);
    const safePrice = sanitizer.sanitize(price);
    const safeQuantity = sanitizer.sanitize(quantity);
    let item = await insertNewProduct(safeName, safeDescription, safePrice, safeQuantity);
    res.json(item);
});
router.put('/products/:id', middleware, async (req, res) => {
    const { name, description, price, quantity } = req.body
    const { id } = req.params;
    const safeID = sanitizer.sanitize(id);
    const safeName = sanitizer.sanitize(name);
    const safeDescription = sanitizer.sanitize(description);
    const safePrice = sanitizer.sanitize(price);
    const safeQuantity = sanitizer.sanitize(quantity);
    let updatedItem = await updateProduct(safeID, safeName, safeDescription, safePrice, safeQuantity)
    res.json(updatedItem);
});

router.delete('/products/:id', middleware, async (req, res) => {
    const { id } = req.params;
    const safeID = sanitizer.sanitize(id);
    let deleteItem = await deleteProduct(safeID)
    res.json(deleteItem);
});


module.exports = router;

