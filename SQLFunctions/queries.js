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

const favorateProduct = (id, favorate) => {
    return new Promise((resolve, reject) => {
        sql.connect(config, function (err) {
            if (err) {
                reject(err);
            } else {
                const query = `UPDATE products SET 
                        favorate = @favorate
                        WHERE ID = @id;`;
                const request = new sql.Request();
                request.input('favorate', sql.Int, favorate);
                request.input('id', sql.Int, id);
                request.query(query, function (error, results) {
                    console.log(id, favorate)

                    if (error) {
                        console.error('Error executing query:', error);
                        reject(error);
                    } else {
                        resolve(`Favorted ${id} successfully`);
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

const getUser = (username, password) => {
    return new Promise((resolve, reject) => {
        sql.connect(config, function (err) {
            if (err) {
                reject(err);
            } else {
                const query = "SELECT * FROM auth WHERE username = @username and password = @password";
                new sql.Request()
                    .input("username", sql.VarChar, username)
                    .input("password", sql.VarChar, password)
                    .query(query, function (error, results) {
                        if (error) {
                            console.error('Error executing query:', error);
                            reject(error);
                        } else {
                            resolve(results.recordset[0]);
                        }
                    });
            }
        });
    });
}
const deleteUser = (username, password) => {
    return new Promise((resolve, reject) => {
        sql.connect(config, function (err) {
            if (err) {
                reject(err);
            } else {
                const query = "DELETE FROM auth WHERE username = @username and password = @password";
                new sql.Request()
                    .input("username", sql.VarChar, username)
                    .input("password", sql.VarChar, password)
                    .query(query, function (error, results) {
                        if (error) {
                            console.error('Error executing query:', error);
                            reject(error);
                        } else {
                            resolve(results.rowsAffected[0]);
                        }
                    });
            }
        });
    });
}



module.exports = { getProds, getProdsById, insertNewProduct, updateProduct, deleteProduct, favorateProduct, getUser, deleteUser };
