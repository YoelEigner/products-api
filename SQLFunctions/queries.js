const sql = require('mssql');
const { config } = require('../SQLConfig');


const getProds = () => {
    return new Promise((resolve, reject) => {
        sql.connect(config, function (err) {
            if (err) {
                reject(err);
            } else {
                const query = 'SELECT * FROM products';
                new sql.Request().query(query, function (error, results) {
                    if (error) {
                        console.error('Error executing query:', error);
                        reject(error);
                    } else {
                        resolve(results.recordset);
                    }
                });
            }
        });
    });
}
const getProdsById = (id) => {
    return new Promise((resolve, reject) => {
        sql.connect(config, function (err) {
            if (err) {
                reject(err);
            } else {
                const query = `SELECT * FROM products where id = @id`;
                const request = new sql.Request();
                request.input('id', sql.Int, id);
                request.query(query, function (error, results) {
                    if (error) {
                        console.error('Error executing query:', error);
                        reject(error);
                    } else {
                        resolve(results.recordset);
                    }
                });
            }
        });
    });
}

const insertNewProduct = (name, description, price, quantity) => {
    return new Promise((resolve, reject) => {
        sql.connect(config, function (err) {
            if (err) {
                reject(err);
            } else {
                const query = `INSERT INTO products (Name, Description, Price, Quantity) 
          VALUES (@name, @description, @price, @quantity);
          SELECT SCOPE_IDENTITY() AS ProductId;`;
                const request = new sql.Request();
                request.input('name', sql.NVarChar(255), name);
                request.input('description', sql.NVarChar(1000), description);
                request.input('price', sql.Decimal(18, 2), price);
                request.input('quantity', sql.Int, quantity);
                request.query(query, function (error, results) {
                    if (error) {
                        console.error('Error executing query:', error);
                        reject(error);
                    } else {
                        console.log(results.recordset[0].ProductId)
                        resolve(results.recordset[0]);
                    }
                });
            }
        });
    });
}
const updateProduct = (id, name, description, price, quantity) => {
    return new Promise((resolve, reject) => {
        sql.connect(config, function (err) {
            if (err) {
                reject(err);
            } else {
                const query = `UPDATE products SET 
                        Name = @name,
                        Description = @description,
                        Price = @price,
                        Quantity = @quantity
                        WHERE ID = @id;`;
                const request = new sql.Request();
                request.input('name', sql.NVarChar, name);
                request.input('description', sql.NVarChar, description);
                request.input('price', sql.Decimal, price);
                request.input('quantity', sql.Int, quantity);
                request.input('id', sql.Int, id);
                request.query(query, function (error, results) {
                    if (error) {
                        console.error('Error executing query:', error);
                        reject(error);
                    } else {
                        resolve(`Updated ${id} successfully`);
                    }
                });
            }
        });
    });
}


const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        sql.connect(config, function (err) {
            if (err) {
                reject(err);
            } else {
                const query = "DELETE FROM products WHERE ID = @id";
                new sql.Request()
                    .input("id", sql.Int, id)
                    .query(query, function (error, results) {
                        if (error) {
                            console.error('Error executing query:', error);
                            reject(error);
                        } else {
                            resolve(`Deleted ${id} successfully`);
                        }
                    });
            }
        });
    });
};



module.exports = { getProds, getProdsById, insertNewProduct, updateProduct, deleteProduct };
